"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BestSeller {
  name_en: string;
  name_am: string;
  units_sold: number;
  total_etb: number;
  icon: string;
}

interface ProviderReconciliation {
  provider: string;
  provider_am: string;
  total_orders: number;
  total_amount: number;
  status: string;
  color: string;
  badgeBg: string;
}

interface SalesSummary {
  total_sales_etb: number;
  total_orders: number;
  average_order_value_etb: number;
  best_sellers: BestSeller[];
  provider_totals: ProviderReconciliation[];
}

export default function AdminOrdersPage() {
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [filterPeriod, setFilterPeriod] = useState("Past 30 Days");

  useEffect(() => {
    setSummary({
      total_sales_etb: 125400,
      total_orders: 142,
      average_order_value_etb: 883.1,
      best_sellers: [
        { name_en: "Special Sizzling Shekla Tibs", name_am: "የሸክላ ጥብስ", units_sold: 88, total_etb: 42240, icon: "🥩" },
        { name_en: "Royal Beyaynetu Platter", name_am: "የፍስክ በያይነቱ", units_sold: 64, total_etb: 41600, icon: "🍲" },
        { name_en: "Traditional Jebena Buna", name_am: "የጀበና ቡና ሥነ ሥርዓት", units_sold: 120, total_etb: 14400, icon: "☕" },
        { name_en: "Special Gored Gored", name_am: "ጎረድ ጎረድ", units_sold: 45, total_etb: 27160, icon: "🥩" },
      ],
      provider_totals: [
        { provider: "Telebirr", provider_am: "ቴሌብር", total_orders: 68, total_amount: 60112, status: "reconciled", color: "#1D765B", badgeBg: "bg-[#1D765B]/10 text-[#1D765B]" },
        { provider: "Chapa Gateway", provider_am: "ቻፓ", total_orders: 42, total_amount: 37086, status: "reconciled", color: "#123D32", badgeBg: "bg-[#123D32]/10 text-[#123D32]" },
        { provider: "CBE Direct", provider_am: "ንግድ ባንክ", total_orders: 18, total_amount: 15890, status: "reconciled", color: "#8b5cf6", badgeBg: "bg-[#8b5cf6]/10 text-[#7c3aed]" },
        { provider: "Cash at Register", provider_am: "በጥሬ ገንዘብ", total_orders: 14, total_amount: 12312, status: "reconciled", color: "#d97706", badgeBg: "bg-[#d97706]/10 text-[#b45309]" },
      ],
    });
  }, []);

  if (!summary) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center space-x-3 text-[#5C6460]">
          <div className="w-5 h-5 border-2 border-[#123D32] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold">Loading sales analytics...</span>
        </div>
      </div>
    );
  }

  const grandTotal = summary.provider_totals.reduce((acc, p) => acc + p.total_amount, 0);
  const vatIncluded = Math.round((summary.total_sales_etb - summary.total_sales_etb / 1.15) * 100) / 100;

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-7xl mx-auto min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2DDD5]">
        <div>
          <div className="flex items-center space-x-2">
            <Link href="/admin" className="text-xs font-bold text-[#123D32] hover:underline">
              ← Manager Dashboard
            </Link>
            <span className="text-xs text-[#E2DDD5]">•</span>
            <span className="text-xs text-[#5C6460] font-semibold">Financial Ledger & Orders (M24–M26)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123D32] mt-1">
            Sales Analytics & Financial Ledger
          </h1>
          <p className="text-xs text-[#5C6460] font-medium mt-0.5">
            Confirmed revenue reports, top selling Ethiopian dishes, and multi-rail payment reconciliations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            aria-label="Filter period selector"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="text-xs font-semibold text-[#5C6460] bg-white border border-[#E2DDD5] rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#123D32]"
          >
            <option value="Today">Today's Shift</option>
            <option value="This Week">This Week</option>
            <option value="Past 30 Days">Past 30 Days</option>
          </select>

          <button
            onClick={() => alert("Exporting reconciled ledger CSV report...")}
            className="px-4 py-2 bg-[#123D32] hover:bg-[#1D765B] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C6460] uppercase tracking-wider">Gross Settled Sales</span>
            <span className="w-8 h-8 rounded-xl bg-[#123D32]/10 text-[#123D32] flex items-center justify-center text-sm font-bold">
              💰
            </span>
          </div>
          <p className="text-3xl font-black text-[#252B28] tracking-tight mt-2">
            ETB {summary.total_sales_etb.toLocaleString()}
          </p>
          <div className="mt-2 text-xs text-[#1D765B] font-bold flex items-center space-x-1">
            <span>↑ 14.8% vs prev period</span>
            <span className="text-[#5C6460] font-normal">• 15% VAT incl: ETB {vatIncluded.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C6460] uppercase tracking-wider">Average Ticket (AOV)</span>
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-sm font-bold">
              🧾
            </span>
          </div>
          <p className="text-3xl font-black text-[#252B28] tracking-tight mt-2">
            ETB {summary.average_order_value_etb.toFixed(2)}
          </p>
          <div className="mt-2 text-xs text-[#5C6460] font-medium">
            Avg. 2.8 dishes per customer session
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5C6460] uppercase tracking-wider">Fulfilled Orders</span>
            <span className="w-8 h-8 rounded-xl bg-[#1D765B]/10 text-[#1D765B] flex items-center justify-center text-sm font-bold">
              ✨
            </span>
          </div>
          <p className="text-3xl font-black text-[#252B28] tracking-tight mt-2">
            {summary.total_orders}
          </p>
          <div className="mt-2 text-xs text-[#1D765B] font-bold">
            100% kitchen bump & delivery fulfillment
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Best Sellers vs Payment Reconciliation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Best-Selling Items */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#123D32]">Best-Selling Dishes</h2>
                <p className="text-xs text-[#5C6460]">Ranked by units sold & gross revenue</p>
              </div>
              <span className="text-xs font-bold text-[#123D32] bg-[#123D32]/10 px-3 py-1 rounded-full">
                Kitchen Stars
              </span>
            </div>

            <div className="divide-y divide-[#E2DDD5]/60">
              {summary.best_sellers.map((item, idx) => (
                <div key={item.name_en} className="py-3.5 flex items-center justify-between hover:bg-[#F4F0E8]/50 rounded-xl px-2 transition-colors">
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-[#F4F0E8] text-[#252B28] font-black text-xs flex items-center justify-center shrink-0 border border-[#E2DDD5]">
                      #{idx + 1}
                    </span>
                    <div className="text-lg shrink-0">{item.icon}</div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#252B28] truncate">{item.name_en}</h3>
                      <p className="text-[11px] text-[#5C6460] truncate">
                        {item.name_am} • <span className="text-[#123D32] font-semibold">{item.units_sold} ordered</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span className="text-sm font-bold text-[#252B28] block">
                      ETB {item.total_etb.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#5C6460] font-medium">
                      {(item.total_etb / summary.total_sales_etb * 100).toFixed(1)}% of total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-[#E2DDD5] flex justify-between items-center text-xs">
            <span className="text-[#5C6460]">Updated every shift cycle</span>
            <Link href="/admin/menu" className="font-bold text-[#123D32] hover:underline">
              Manage Dish Pricing →
            </Link>
          </div>
        </div>

        {/* Card 2: Payment Provider Reconciliation */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#123D32]">Payment Rail Settlement</h2>
                <p className="text-xs text-[#5C6460]">Telebirr, Chapa, CBE & Cash verification</p>
              </div>
              <span className="text-xs font-bold text-[#1D765B] bg-[#1D765B]/10 px-3 py-1 rounded-full">
                All Reconciled ✓
              </span>
            </div>

            {/* Proportion Bar */}
            <div className="h-3 w-full bg-[#F4F0E8] rounded-full overflow-hidden flex mb-5 border border-[#E2DDD5]">
              {summary.provider_totals.map((p) => {
                const pct = (p.total_amount / grandTotal) * 100;
                return (
                  <div
                    key={p.provider}
                    style={{ width: `${pct}%`, backgroundColor: p.color }}
                    title={`${p.provider}: ${pct.toFixed(1)}%`}
                    className="h-full transition-all duration-300"
                  />
                );
              })}
            </div>

            <div className="space-y-3">
              {summary.provider_totals.map((prov) => {
                const pct = (prov.total_amount / grandTotal) * 100;
                return (
                  <div
                    key={prov.provider}
                    className="p-3.5 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5] flex items-center justify-between hover:bg-[#EAE4D9] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: prov.color }}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-[#252B28]">{prov.provider}</span>
                          <span className="text-[10px] text-[#5C6460] font-semibold">({prov.provider_am})</span>
                        </div>
                        <span className="text-[11px] text-[#5C6460]">
                          {prov.total_orders} settled transactions • {pct.toFixed(1)}% share
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-[#252B28] block">
                        ETB {prov.total_amount.toLocaleString()}
                      </span>
                      <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${prov.badgeBg}`}>
                        ✓ Reconciled
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-[#E2DDD5] flex justify-between items-center text-xs">
            <span className="text-[#5C6460]">Automated idempotent webhook logs</span>
            <Link href="/admin/cashier" className="font-bold text-[#123D32] hover:underline">
              Open Cashier Register →
            </Link>
          </div>
        </div>
      </div>

      {/* 5-Year Quantified Economic Business Model */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD5] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DDD5] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📈</span>
              <h2 className="text-xl font-black text-[#123D32]">
                5-Year Quantified Economic Model & Operational Efficiency
              </h2>
            </div>
            <p className="text-xs text-[#5C6460] mt-0.5">
              Live measurement of labor minutes saved, kitchen prep latency, and capacity profit vs the 683,340 Birr economic benchmark.
            </p>
          </div>

          <span className="bg-[#1D765B]/15 text-[#1D765B] border border-[#1D765B]/30 px-3 py-1 rounded-full text-xs font-black self-start sm:self-auto">
            ✓ 683,340 ETB BENCHMARK ACTIVE
          </span>
        </div>

        {/* 4 Quantified Highlight Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#F4F0E8] p-4 rounded-2xl border border-[#E2DDD5]">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#5C6460] block">
              Total Economic Value (5-Yr)
            </span>
            <span className="text-2xl font-black text-[#123D32] block mt-1">ETB 683,340</span>
            <span className="text-[10px] text-[#1D765B] font-bold block mt-0.5">↑ Baseline Surpassed</span>
          </div>

          <div className="bg-[#F4F0E8] p-4 rounded-2xl border border-[#E2DDD5]">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#5C6460] block">
              Customer Waiting Returned
            </span>
            <span className="text-2xl font-black text-[#252B28] block mt-1">5,217 Hours</span>
            <span className="text-[10px] text-[#5C6460] font-medium block mt-0.5">-18 mins avg per party</span>
          </div>

          <div className="bg-[#F4F0E8] p-4 rounded-2xl border border-[#E2DDD5]">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#5C6460] block">
              Staff Labor Hours Saved
            </span>
            <span className="text-2xl font-black text-[#252B28] block mt-1">2,184 Hours</span>
            <span className="text-[10px] text-[#5C6460] font-medium block mt-0.5">42.6 mins/waiter/day</span>
          </div>

          <div className="bg-[#F4F0E8] p-4 rounded-2xl border border-[#E2DDD5]">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#5C6460] block">
              Extra Capacity Profit
            </span>
            <span className="text-2xl font-black text-[#1D765B] block mt-1">ETB 364,000</span>
            <span className="text-[10px] text-[#1D765B] font-bold block mt-0.5">+22% table turnover speed</span>
          </div>
        </div>

        {/* 2-Column Deep Breakdown: Labor Savings Ledger vs Peak Rush Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Left: 5-Year Quantified Savings Ledger */}
          <div className="bg-[#F4F0E8] p-5 rounded-2xl border border-[#E2DDD5] space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#123D32] block border-b border-[#E2DDD5] pb-2">
              Economic Model Breakdown (Per Specification)
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-[#252B28] block">1. Ordering Labor Hours Saved</strong>
                  <span className="text-[10px] text-[#5C6460]">Eliminates repeated table calls & notepad handwriting</span>
                </div>
                <span className="font-black text-[#123D32]">ETB 145,600</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-[#252B28] block">2. Payment Waiting Labor Saved</strong>
                  <span className="text-[10px] text-[#5C6460]">Post-delivery digital bill & instant mobile wallet settlement</span>
                </div>
                <span className="font-black text-[#123D32]">ETB 72,800</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-[#252B28] block">3. Real-Time 86'ing Stock Savings</strong>
                  <span className="text-[10px] text-[#5C6460]">Zero wasted kitchen trips for sold-out dishes</span>
                </div>
                <span className="font-black text-[#123D32]">ETB 21,840</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-[#252B28] block">4. Physical Menu Printing Avoided</strong>
                  <span className="text-[10px] text-[#5C6460]">Eliminates quarterly 300 ETB/menu laminated reprints</span>
                </div>
                <span className="font-black text-[#123D32]">ETB 60,000</span>
              </div>

              <div className="flex justify-between items-center border-t border-[#E2DDD5] pt-2">
                <div>
                  <strong className="text-[#252B28] block">5. Extra Dwell Time Capacity Profit</strong>
                  <span className="text-[10px] text-[#5C6460]">Tables turn 8–12 minutes faster during peak rushes</span>
                </div>
                <span className="font-black text-[#1D765B]">ETB 364,000</span>
              </div>
            </div>
          </div>

          {/* Right: Operational Latency & Rush Hour Heatmap */}
          <div className="bg-[#F4F0E8] p-5 rounded-2xl border border-[#E2DDD5] space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#123D32] block border-b border-[#E2DDD5] pb-2">
              Operational Latency & Peak Rush Analysis
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-[#E2DDD5]">
                <span className="text-[10px] text-[#5C6460] font-bold uppercase block">Avg Kitchen Prep</span>
                <span className="text-xl font-black text-[#123D32]">11.2 Mins</span>
                <span className="text-[10px] text-[#1D765B] font-bold block mt-0.5">↓ -4.6m vs manual</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#E2DDD5]">
                <span className="text-[10px] text-[#5C6460] font-bold uppercase block">Order Error Rework</span>
                <span className="text-xl font-black text-[#252B28]">0.3%</span>
                <span className="text-[10px] text-[#1D765B] font-bold block mt-0.5">Down from 8.2%</span>
              </div>
            </div>

            {/* Peak Rush Hour Heatmap */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#5C6460] block">
                24-Hour Dining Rush Distribution:
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200">
                  <span className="block">08:00–11:00</span>
                  <span className="font-black text-xs">Buna Rush</span>
                </div>
                <div className="p-2 bg-red-100 text-red-800 rounded-lg border border-red-300 animate-pulse">
                  <span className="block">12:00–14:30</span>
                  <span className="font-black text-xs">Peak Lunch</span>
                </div>
                <div className="p-2 bg-amber-100 text-amber-800 rounded-lg border border-amber-200">
                  <span className="block">15:00–17:30</span>
                  <span className="font-black text-xs">Cafe Break</span>
                </div>
                <div className="p-2 bg-red-100 text-red-800 rounded-lg border border-red-300 animate-pulse">
                  <span className="block">18:00–21:30</span>
                  <span className="font-black text-xs">Peak Dinner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
