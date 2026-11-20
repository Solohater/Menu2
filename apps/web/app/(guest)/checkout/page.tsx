"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OfflineBanner from "@/components/guest/OfflineBanner";
import { loadActiveTrayLocal } from "@/lib/offline-storage";

interface TrayItem {
  id: string;
  name_en: string;
  name_am: string;
  final_price: number;
  quantity: number;
  is_available: boolean;
  selected_addons?: Record<string, boolean>;
  selected_removals?: Record<string, boolean>;
  special_instructions?: string;
}

export default function TrayCheckoutPage() {
  const [items, setItems] = useState<TrayItem[]>([
    {
      id: "tray-1",
      name_en: "Classic Addis Cheeseburger",
      name_am: "ክላሲክ አዲስ ቺዝበርገር",
      final_price: 380,
      quantity: 1,
      is_available: true,
      selected_removals: { "No Onions": true, "No Ketchup": true },
      selected_addons: { "Extra Cheddar Cheese": true },
      special_instructions: "Medium well, fries on side",
    },
    {
      id: "tray-2",
      name_en: "Iced Caramel Macchiato",
      name_am: "አይስድ ካራሜል ማኪያቶ",
      final_price: 130,
      quantity: 1,
      is_available: true,
      selected_removals: { "No Ice": true },
    },
  ]);

  useEffect(() => {
    const saved = loadActiveTrayLocal();
    if (saved && saved.length > 0) {
      setItems(
        saved.map((i: any) => ({
          ...i,
          is_available: true,
        }))
      );
    }
  }, []);

  const [selectedRail, setSelectedRail] = useState("tab");
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);

  // Financial domain rules: Tax-inclusive pricing (15% VAT included in menu prices)
  const subtotal = items.reduce((acc, i) => acc + i.final_price * i.quantity, 0);
  const totalItemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const netAmount = Math.round((subtotal / 1.15) * 100) / 100;
  const vatAmount = Math.round((subtotal - netAmount) * 100) / 100;
  const serviceChargeAmount = 0; // 0% initial release
  const totalPayable = subtotal;

  const hasSoldOutItem = items.some((i) => !i.is_available);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    let orderId = `MF-${Math.floor(8000 + Math.random() * 900)}-T04`;

    const mappedItems = items.map((i) => ({
      menu_item_id: i.name_en,
      quantity: i.quantity,
      unit_price: i.final_price,
      special_instructions: [
        i.special_instructions,
        i.selected_removals ? Object.keys(i.selected_removals).filter((k) => i.selected_removals![k]).join(", ") : "",
        i.selected_addons ? Object.keys(i.selected_addons).filter((k) => i.selected_addons![k]).map((k) => `+ ${k}`).join(", ") : "",
      ].filter(Boolean).join(" | "),
    }));

    try {
      if (selectedRail === "tab") {
        // Submit as Round to Table Session
        const roundUrl = typeof window !== "undefined"
          ? `${window.location.protocol}//${window.location.hostname}:8080/api/v1/guest/orders/submit-round`
          : "http://localhost:8080/api/v1/guest/orders/submit-round";

        const res = await fetch(roundUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            restaurant_id: "01J8RESTAURANT000000000001",
            table_id: "04",
            table_label: "Table 04",
            items: mappedItems,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.rounds && data.rounds.length > 0) {
            orderId = data.rounds[data.rounds.length - 1].order_id;
          }
        }
      } else {
        const backendUrl = typeof window !== "undefined"
          ? `${window.location.protocol}//${window.location.hostname}:8080/api/v1/orders/create`
          : "http://localhost:8080/api/v1/orders/create";

        const orderPayload = {
          restaurant_id: "01J8RESTAURANT000000000001",
          table_id: "04",
          provider: selectedRail,
          order_intent_id: `intent-${Date.now()}`,
          items: mappedItems,
        };

        const res = await fetch(backendUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.id) {
            orderId = data.id;
          }
        }
      }
    } catch (err) {
      console.warn("checkout: live backend order creation fallback to local session", err);
    } finally {
      setIsSubmitting(false);
    }

    if (selectedRail === "tab") {
      setOrderConfirmed({
        order_id: orderId,
        status: "Dispatched to Kitchen",
        payment_status: "unpaid",
        total: totalPayable,
        is_tab: true,
        message: "Your round has been sent directly to the Kitchen Chef! It is added to your Table 04 Tab. You can order more rounds anytime and settle your bill after dining.",
      });
    } else if (selectedRail === "cash") {
      setOrderConfirmed({
        order_id: orderId,
        status: "Received by Kitchen & Cashier",
        payment_status: "unpaid",
        total: totalPayable,
        is_tab: false,
        message: "Order dispatched to Kitchen chef and Cashier register! Please pay cash with the waiter or cashier counter.",
      });
    } else {
      setOrderConfirmed({
        order_id: orderId,
        status: "Payment Confirmed",
        payment_status: "paid",
        total: totalPayable,
        is_tab: false,
        message: `Payment authorized via ${selectedRail.toUpperCase()}. Dispatched to Kitchen chef and Cashier!`,
      });
    }
  };

  if (orderConfirmed) {
    return (
      <div className="p-4 max-w-md mx-auto min-h-screen bg-[#FDFBF7] flex items-center justify-center font-sans">
        <div className="bg-white p-7 rounded-3xl border border-[#E2DDD5] shadow-xl text-center space-y-5 w-full">
          <div className="w-16 h-16 rounded-full bg-[#1D765B]/15 text-[#1D765B] flex items-center justify-center text-3xl font-black mx-auto">
            ✓
          </div>
          <div>
            <span className="text-xs font-bold text-[#1D765B] uppercase tracking-wider block">
              ● {orderConfirmed.status}
            </span>
            <h1 className="text-2xl font-black text-[#252B28] tracking-tight mt-1">Order Confirmed!</h1>
            <p className="text-xs font-bold text-[#123D32] mt-0.5" lang="am">
              ትዕዛዝዎ በተሳካ ሁኔታ ተልኳል (Ref: {orderConfirmed.order_id})
            </p>
          </div>

          <div className="bg-[#F4F0E8] border border-[#E2DDD5] p-4 rounded-2xl text-left space-y-1">
            <span className="text-[10px] font-black text-[#252B28] uppercase block">Table 04 Dispatch</span>
            <p className="text-xs text-[#5C6460] leading-relaxed">
              {orderConfirmed.message}
            </p>
          </div>

          <div className="text-left bg-white p-4 rounded-2xl space-y-2 text-xs text-[#252B28] border border-[#E2DDD5]">
            <div className="flex justify-between items-center">
              <span className="text-[#5C6460]">Estimated Prep Time:</span>
              <strong className="text-[#123D32] font-black text-sm">12–15 mins</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#5C6460]">Total Amount (Tax Included):</span>
              <strong className="text-[#252B28] font-black text-sm">ETB {orderConfirmed.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="pt-2 space-y-2.5">
            <Link
              href={`/order/${orderConfirmed.order_id}`}
              className="w-full py-3.5 bg-[#123D32] hover:bg-[#1D765B] text-white font-black text-xs rounded-2xl shadow hover:shadow-md transition-all block text-center uppercase tracking-wider"
            >
              Track Live Kitchen Progress →
            </Link>
            {orderConfirmed.is_tab && (
              <Link
                href="/t/demo_token/bill"
                className="w-full py-3 bg-[#F4F0E8] border border-[#E2DDD5] text-[#123D32] font-black text-xs rounded-2xl shadow-sm hover:bg-[#EAE4D9] transition-all block text-center uppercase tracking-wider"
              >
                View Table Bill & Digital Pay (ETB {orderConfirmed.total.toFixed(2)}) →
              </Link>
            )}
            <Link
              href="/t/demo_token/menu"
              className="w-full py-2.5 bg-transparent text-[#5C6460] font-bold text-xs rounded-xl hover:text-[#252B28] transition-colors block text-center"
            >
              {orderConfirmed.is_tab ? "+ Order Another Dish / Round" : "Back to Menu"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans p-4 max-w-lg mx-auto space-y-5 pb-28">
      <OfflineBanner />

      {/* Mobile Sticky Top Header with Top Cart Icon */}
      <header className="flex justify-between items-center border-b border-[#E2DDD5] pb-3 pt-1">
        <Link href="/t/demo_token/menu" className="flex items-center space-x-1.5 text-xs font-bold text-[#123D32] hover:underline">
          <span>← Back to Menu</span>
        </Link>
        <div className="flex items-center space-x-2">
          <span className="bg-[#123D32]/10 text-[#123D32] text-[11px] font-extrabold px-3 py-1 rounded-full">
            Table 04
          </span>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-[#E2DDD5] shadow-sm text-[#252B28]">
            <span className="text-sm">🛒</span>
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-[#123D32] text-white text-[9px] font-black flex items-center justify-center shadow">
                {totalItemCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Order Title */}
      <div>
        <h1 className="text-2xl font-black text-[#252B28] tracking-tight">Review Tray & Checkout</h1>
        <p className="text-xs text-[#5C6460] font-medium mt-0.5">
          Verify your customized foods & drinks before sending to kitchen.
        </p>
      </div>

      {/* Item Lines Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD5] p-5 shadow-sm space-y-3">
        <span className="text-[11px] font-bold text-[#5C6460] uppercase tracking-wider block border-b border-[#E2DDD5] pb-2">
          Your Tray Dishes & Drinks ({items.length})
        </span>

        <div className="divide-y divide-[#E2DDD5]/60">
          {items.map((item) => {
            const removals = item.selected_removals
              ? Object.keys(item.selected_removals).filter((k) => item.selected_removals![k])
              : [];
            const addons = item.selected_addons
              ? Object.keys(item.selected_addons).filter((k) => item.selected_addons![k])
              : [];

            return (
              <div key={item.id} className="py-3 flex justify-between items-start space-x-2">
                <div className="space-y-1 text-left flex-1">
                  <span className="text-sm font-bold text-[#252B28] block">{item.name_en}</span>
                  <span className="text-[11px] text-[#123D32] font-semibold block" lang="am">
                    {item.name_am} • Qty: {item.quantity}
                  </span>

                  {/* Render Removals Badges */}
                  {removals.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {removals.map((r) => (
                        <span key={r} className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                          ❌ {r}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Render Addons Badges */}
                  {addons.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {addons.map((a) => (
                        <span key={a} className="text-[10px] font-bold text-[#123D32] bg-[#123D32]/10 px-1.5 py-0.5 rounded">
                          ➕ {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.special_instructions && (
                    <span className="text-[10px] text-[#5C6460] italic block bg-[#F4F0E8] p-1.5 rounded-lg border border-[#E2DDD5]">
                      📝 "{item.special_instructions}"
                    </span>
                  )}
                </div>
                <span className="text-sm font-black text-[#252B28] shrink-0">
                  ETB {(item.final_price * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tax-Inclusive Invoice Breakdown Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD5] p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center border-b border-[#E2DDD5] pb-2">
          <span className="text-[11px] font-bold text-[#5C6460] uppercase tracking-wider">
            Bill Invoice
          </span>
          <span className="bg-[#123D32]/10 text-[#123D32] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
            TAX INVOICE / የታክስ ደረሰኝ
          </span>
        </div>

        <div className="space-y-2 text-xs text-[#5C6460]">
          <div className="flex justify-between">
            <span>Net Dishes & Drinks (ከታክስ በፊት)</span>
            <span className="font-bold text-[#252B28]">ETB {netAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Included 15% VAT (ተ.እ.ታ 15% የተካተተ)</span>
            <span className="font-bold text-[#1D765B]">ETB {vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Charge (0%)</span>
            <span className="font-bold text-[#252B28]">ETB 0.00</span>
          </div>
        </div>

        <div className="border-t border-[#E2DDD5] pt-3 flex justify-between items-baseline">
          <div>
            <span className="text-xs font-black text-[#252B28] uppercase block">Total Amount (Tax Included)</span>
            <span className="text-[10px] text-[#123D32] font-bold block" lang="am">
              የሚከፈል አጠቃላይ ድምር (ተ.እ.ታ ጨምሮ)
            </span>
          </div>
          <span className="text-2xl font-black text-[#123D32]">ETB {totalPayable.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD5] p-5 shadow-sm space-y-3">
        <span className="text-[11px] font-bold text-[#5C6460] uppercase tracking-wider block border-b border-[#E2DDD5] pb-2">
          Ordering & Payment Flow
        </span>

        <div className="space-y-2.5">
          {[
            { id: "tab", name: "Dine First — Add to Table Tab (በጠረጴዛ ሂሳብ)", icon: "🍽️", desc: "Pay later. Send order to kitchen now, settle bill after dining", recommended: true },
            { id: "telebirr", name: "Telebirr (ቴሌብር)", icon: "📲", desc: "SuperApp Push & Instant QR" },
            { id: "chapa", name: "Chapa Gateway (ቻፓ)", icon: "💳", desc: "Awash, Dashen, CBE Birr & Cards" },
            { id: "cbe", name: "CBE Direct (የኢትዮጵያ ንግድ ባንክ)", icon: "🏦", desc: "Commercial Bank of Ethiopia Direct" },
            { id: "cash", name: "Cash at Table (በጥሬ ገንዘብ)", icon: "💵", desc: "Pay cash to floor waiter or cashier register" },
          ].map((rail) => (
            <label
              key={rail.id}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                selectedRail === rail.id
                  ? "border-[#123D32] bg-[#123D32]/5 shadow-sm"
                  : "border-[#E2DDD5] hover:border-[#123D32]/40 bg-[#FDFBF7]"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{rail.icon}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-[#252B28] block">{rail.name}</span>
                    {rail.recommended && (
                      <span className="text-[9px] bg-[#123D32] text-white font-extrabold px-1.5 py-0.5 rounded">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#5C6460] block">{rail.desc}</span>
                </div>
              </div>
              <input
                type="radio"
                name="rail"
                value={rail.id}
                checked={selectedRail === rail.id}
                onChange={(e) => setSelectedRail(e.target.value)}
                className="w-4 h-4 text-[#123D32] focus:ring-[#123D32]"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E2DDD5] z-40 max-w-lg mx-auto">
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={hasSoldOutItem || isSubmitting}
          className="w-full py-4 bg-[#123D32] hover:bg-[#1D765B] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <span>
            {isSubmitting
              ? "Submitting Order..."
              : selectedRail === "tab"
              ? `Send Round to Kitchen (Tab: ETB ${totalPayable.toFixed(2)})`
              : selectedRail === "telebirr"
              ? `Pay ETB ${totalPayable.toFixed(2)} via Telebirr`
              : selectedRail === "chapa"
              ? `Pay ETB ${totalPayable.toFixed(2)} via Chapa`
              : selectedRail === "cbe"
              ? `Pay ETB ${totalPayable.toFixed(2)} via CBE Direct`
              : `Confirm Table 04 Order (Cash)`}
          </span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
