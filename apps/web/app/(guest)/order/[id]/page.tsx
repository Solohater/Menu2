"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PickupAlarmModal from "@/components/guest/PickupAlarmModal";
import ServiceRequestModal from "@/components/guest/ServiceRequestModal";
import { MenuFlowWebSocketClient } from "@/lib/websocket";

interface OrderStatusPageProps {
  params: { id: string };
}

export default function GuestOrderStatusPage({ params }: OrderStatusPageProps) {
  const [order, setOrder] = useState<any>({
    id: params.id || "01J8ORD100",
    orderRef: params.id ? `MF-${params.id.slice(-4)}-T04` : "MF-8942-T4",
    status: "Preparing",
    paymentStatus: "paid",
    totalAmount: 510,
    estimatedWaitMins: 12,
    tableLabel: "04",
    items: [
      { name_en: "Special Sizzling Shekla Tibs", name_am: "የሸክላ ጥብስ", quantity: 1, price: 450 },
      { name_en: "Traditional Jebena Buna", name_am: "የጀበና ቡና ሥነ ሥርዓት", quantity: 1, price: 60 },
    ],
  });

  const [isPickupAlarmOpen, setIsPickupAlarmOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceFeedback, setServiceFeedback] = useState<string | null>(null);

  // 1. Fetch real order from backend on mount
  useEffect(() => {
    async function loadOrder() {
      try {
        const backendUrl = typeof window !== "undefined"
          ? `${window.location.protocol}//${window.location.hostname}:8080/api/v1/orders/get?id=${params.id}`
          : `http://localhost:8080/api/v1/orders/get?id=${params.id}`;

        const res = await fetch(backendUrl);
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) {
            setOrder((prev: any) => ({
              ...prev,
              id: data.id,
              orderRef: `MF-${data.id.slice(-4)}-T${data.table_id || "04"}`,
              status: data.status || "Received",
              paymentStatus: data.payment_status || "paid",
              totalAmount: data.total_amount || prev.totalAmount,
              tableLabel: data.table_id || prev.tableLabel,
              items: data.items && data.items.length > 0 ? data.items.map((it: any) => ({
                name_en: it.menu_item_id || "Dish Item",
                name_am: it.menu_item_id || "ምግብ",
                quantity: it.quantity || 1,
                price: it.unit_price || 0,
              })) : prev.items,
            }));
          }
        }
      } catch (err) {
        console.warn("order_tracker: backend offline, using fallback state", err);
      }
    }

    if (params.id) {
      loadOrder();
    }
  }, [params.id]);

  // 2. Connect to real-time WebSocket for live status transitions
  useEffect(() => {
    const ws = new MenuFlowWebSocketClient(`order:${params.id}:status`);
    ws.connect((msg) => {
      if (msg && msg.payload) {
        const payload = msg.payload;
        if (payload.status) {
          setOrder((prev: any) => ({
            ...prev,
            status: payload.status,
          }));

          if (payload.status === "Ready") {
            setIsPickupAlarmOpen(true);
          } else if (payload.status === "Delivered" || payload.status === "Closed") {
            setIsPickupAlarmOpen(false);
          }
        }
      }
    });

    return () => {
      ws.disconnect();
    };
  }, [params.id]);

  const handleConfirmPickedUp = () => {
    setIsPickupAlarmOpen(false);
    setOrder((prev: any) => ({ ...prev, status: "Closed" }));
  };

  const steps = [
    { label: "Payment Confirmed", labelAm: "ክፍያ ተረጋግጧል", done: true },
    {
      label: "Kitchen Preparing",
      labelAm: "በማዘጋጀት ላይ",
      done: order.status === "Preparing" || order.status === "Cooking" || order.status === "Ready" || order.status === "Closed" || order.status === "Delivered",
      active: order.status === "Preparing" || order.status === "Cooking" || order.status === "Received",
    },
    {
      label: "Ready for Table",
      labelAm: "ተዘጋጅቷል",
      done: order.status === "Ready" || order.status === "Closed" || order.status === "Delivered",
      active: order.status === "Ready",
    },
    {
      label: "Delivered & Enjoy",
      labelAm: "ተደርሷል",
      done: order.status === "Closed" || order.status === "Delivered",
      active: order.status === "Closed" || order.status === "Delivered",
    },
  ];

  const total = Number(order.totalAmount || 0);
  const netSubtotal = Math.round((total / 1.15) * 100) / 100;
  const vatIncluded = Math.round((total - netSubtotal) * 100) / 100;

  return (
    <div className="p-4 max-w-lg mx-auto min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans space-y-5 pb-20">
      {/* Top Header */}
      <header className="flex justify-between items-center border-b border-[#E2DDD5] pb-3 pt-1">
        <Link href="/t/demo_token/menu" className="text-xs font-bold text-[#123D32] hover:underline">
          ← Back to Menu
        </Link>
        <span className="bg-[#123D32]/10 text-[#123D32] text-[11px] font-extrabold px-3 py-1 rounded-full">
          Table {order.tableLabel}
        </span>
      </header>

      {/* Main Status Hero Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full mx-auto bg-[#123D32]/10 text-[#123D32] flex items-center justify-center text-3xl font-black">
          {order.status === "Ready" ? "🔔" : order.status === "Closed" || order.status === "Delivered" ? "✨" : "🍳"}
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#5C6460] uppercase tracking-wider block">
            Order Ref: {order.orderRef}
          </span>
          <h1 className="text-2xl font-black text-[#252B28] tracking-tight mt-1">
            {(order.status === "Preparing" || order.status === "Cooking" || order.status === "Received") && "Chef is Preparing Your Food"}
            {order.status === "Ready" && "Your Food is Ready!"}
            {(order.status === "Closed" || order.status === "Delivered") && "Order Delivered — መልካም ምግብ!"}
          </h1>
          <p className="text-xs font-bold text-[#123D32] mt-0.5" lang="am">
            {(order.status === "Preparing" || order.status === "Cooking" || order.status === "Received") && "ትዕዛዝዎ በኩሽና እየተዘጋጀ ይገኛል"}
            {order.status === "Ready" && "ምግብዎ ዝግጁ ሆኗል — አስተናጋጁ እያመጣሎት ነው"}
            {(order.status === "Closed" || order.status === "Delivered") && "ትዕዛዝዎ ደርሷል"}
          </p>
        </div>

        {order.status !== "Closed" && order.status !== "Delivered" && (
          <div className="bg-[#F4F0E8] rounded-2xl p-4 border border-[#E2DDD5] flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-[#5C6460] font-bold uppercase block">Estimated Wait</span>
              <span className="text-lg font-black text-[#123D32]">~{order.estimatedWaitMins} Minutes</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-[#123D32] border-t-transparent animate-spin" />
          </div>
        )}

        {/* Step Progression Timeline */}
        <div className="pt-2 text-left space-y-3 border-t border-[#E2DDD5]/70">
          {steps.map((st, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  st.done
                    ? "bg-[#1D765B] text-white"
                    : st.active
                    ? "bg-[#123D32] text-white animate-pulse"
                    : "bg-[#E2DDD5] text-[#5C6460]"
                }`}
              >
                {st.done ? "✓" : idx + 1}
              </div>
              <div className="min-w-0">
                <span className={`text-xs font-bold block ${st.active ? "text-[#123D32]" : "text-[#252B28]"}`}>
                  {st.label}
                </span>
                <span className="text-[10px] text-[#5C6460] block" lang="am">
                  {st.labelAm}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Receipt Details */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2DDD5] shadow-sm space-y-3">
        <span className="text-[11px] font-bold text-[#5C6460] uppercase tracking-wider block border-b border-[#E2DDD5] pb-2">
          Receipt Items
        </span>

        <div className="divide-y divide-[#E2DDD5]/60">
          {order.items.map((it: any, idx: number) => (
            <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[#252B28] block">{it.name_en}</span>
                <span className="text-[10px] text-[#123D32] block" lang="am">
                  {it.name_am} × {it.quantity}
                </span>
              </div>
              <span className="font-bold text-[#252B28]">ETB {(it.price * it.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#E2DDD5] pt-3 space-y-1.5 text-xs">
          <div className="flex justify-between text-[#5C6460]">
            <span>Net F&B (ከታክስ በፊት):</span>
            <span>ETB {netSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#5C6460]">
            <span>Included 15% VAT (ተ.እ.ታ የተካተተ):</span>
            <span className="text-[#1D765B] font-semibold">ETB {vatIncluded.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-black pt-1 border-t border-[#E2DDD5]/60">
            <span>{order.paymentStatus === "paid" ? "Total Paid (VAT incl.)" : "Round Total (Pending Bill)"}</span>
            <span className="text-[#123D32]">ETB {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* View Table Bill & Digital Pay Action */}
      <Link
        href="/t/demo_token/bill"
        className="w-full py-4 bg-[#123D32] hover:bg-[#1D765B] active:scale-[0.99] rounded-2xl text-xs font-black text-white shadow-md transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
      >
        <span>💳 View Table Bill & Digital Pay →</span>
      </Link>

      {/* Waiter Assistance Action Button */}
      <button
        onClick={() => setIsServiceModalOpen(true)}
        className="w-full py-3.5 bg-white border border-[#E2DDD5] hover:bg-[#F4F0E8] active:scale-[0.99] rounded-2xl text-xs font-extrabold text-[#252B28] shadow-sm transition-all flex items-center justify-center space-x-2"
      >
        <span className="text-base">🛎️</span>
        <span>Need Table Assistance? Call Waiter</span>
      </button>

      {serviceFeedback && (
        <div className="p-3 bg-[#1D765B]/10 border border-[#1D765B]/30 rounded-xl text-center text-xs font-bold text-[#1D765B]">
          {serviceFeedback}
        </div>
      )}

      {/* Service Request Modal */}
      <ServiceRequestModal
        isOpen={isServiceModalOpen}
        tableLabel={order.tableLabel}
        onClose={() => setIsServiceModalOpen(false)}
        onSuccess={() => {
          setServiceFeedback("✓ Assistance requested! Waiter notified for Table " + order.tableLabel);
          setTimeout(() => setServiceFeedback(null), 4000);
        }}
      />

      <PickupAlarmModal
        isOpen={isPickupAlarmOpen}
        orderRef={order.orderRef}
        onPickedUp={handleConfirmPickedUp}
      />
    </div>
  );
}
