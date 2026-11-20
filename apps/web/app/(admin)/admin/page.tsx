"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItemStock {
  id: string;
  name: string;
  nameAm: string;
  category: string;
  price: number;
  inStock: boolean;
  tag: string;
  imageBg: string;
  icon: string;
}

interface TableStatus {
  id: string;
  number: string;
  zone: "Zone A" | "Zone B" | "Counter";
  status: "occupied" | "attention" | "available";
  seatedTime?: string;
  guestCount?: number;
  currentBill?: number;
  assignedWaiter?: string;
}

export default function AdminDashboardPage() {
  const [salesTimeframe, setSalesTimeframe] = useState("Past month");
  const [activeZone, setActiveZone] = useState<string>("all");
  const [selectedTable, setSelectedTable] = useState<TableStatus | null>(null);

  // Quick Stock Items State
  const [menuItems, setMenuItems] = useState<MenuItemStock[]>([
    {
      id: "item-1",
      name: "Shekla Tibs",
      nameAm: "የሸክላ ጥብስ",
      category: "Traditional Mains",
      price: 480,
      inStock: true,
      tag: "In Stock",
      imageBg: "bg-amber-800",
      icon: "🥩",
    },
    {
      id: "item-2",
      name: "Doro Wat",
      nameAm: "የዶሮ ወጥ",
      category: "Specialties",
      price: 520,
      inStock: true,
      tag: "In Stock",
      imageBg: "bg-red-900",
      icon: "🍗",
    },
    {
      id: "item-3",
      name: "Gomen Be Siga",
      nameAm: "ጎመን በስጋ",
      category: "Sides & Mains",
      price: 240,
      inStock: false,
      tag: "Out of Stock",
      imageBg: "bg-[#123D32]",
      icon: "🥬",
    },
    {
      id: "item-4",
      name: "Special Kitfo",
      nameAm: "ልዩ ክትፎ",
      category: "Traditional Mains",
      price: 550,
      inStock: true,
      tag: "In Stock",
      imageBg: "bg-rose-950",
      icon: "🥩",
    },
  ]);

  // Live Tables State matching visual floor layout (M07)
  const [tables, setTables] = useState<TableStatus[]>([
    { id: "t1", number: "01", zone: "Zone A", status: "occupied", seatedTime: "24m ago", guestCount: 4, currentBill: 1420, assignedWaiter: "Abebe Tadesse" },
    { id: "t2", number: "02", zone: "Zone A", status: "occupied", seatedTime: "45m ago", guestCount: 2, currentBill: 890, assignedWaiter: "Abebe Tadesse" },
    { id: "t3", number: "03", zone: "Zone A", status: "attention", seatedTime: "1h 10m ago", guestCount: 6, currentBill: 3200, assignedWaiter: "Abebe Tadesse" },
    { id: "t4", number: "04", zone: "Zone A", status: "available" },
    { id: "t5", number: "05", zone: "Zone B", status: "attention", seatedTime: "15m ago", guestCount: 3, currentBill: 1100, assignedWaiter: "Tigist Haile" },
    { id: "t6", number: "06", zone: "Zone B", status: "occupied", seatedTime: "52m ago", guestCount: 2, currentBill: 760, assignedWaiter: "Tigist Haile" },
    { id: "t7", number: "07", zone: "Zone B", status: "available" },
    { id: "t8", number: "08", zone: "Zone B", status: "occupied", seatedTime: "30m ago", guestCount: 5, currentBill: 2100, assignedWaiter: "Tigist Haile" },
    { id: "t9", number: "P01", zone: "Counter", status: "occupied", seatedTime: "18m ago", guestCount: 1, currentBill: 380, assignedWaiter: "Dawit Kebede" },
    { id: "t10", number: "P02", zone: "Counter", status: "available" },
  ]);

  const toggleStock = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              inStock: !item.inStock,
              tag: !item.inStock ? "In Stock" : "Out of Stock",
            }
          : item
      )
    );
  };

  const filteredTables = activeZone === "all" ? tables : tables.filter((t) => t.zone === activeZone);

  // Staff Activity Analytics data (daily order throughput)
  const staffActivityData = [
    { label: "Mon", value: 76 },
    { label: "Tue", value: 124 },
    { label: "Wed", value: 98 },
    { label: "Thu", value: 126 },
    { label: "Fri", value: 148 },
    { label: "Sat", value: 160 },
    { label: "Sun", value: 118 },
  ];

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-7xl mx-auto min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2DDD5]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1D765B] animate-pulse" />
            <span className="text-xs font-bold text-[#1D765B] uppercase tracking-wider">Bole Medhanialem Branch</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123D32] mt-0.5">Manager Operations Portal</h1>
          <p className="text-xs text-[#5C6460] font-medium mt-0.5">
            Real-time branch control, visual floor management, 86 item toggles, and live revenue telemetry.
          </p>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <Link
            href="/admin/tables"
            className="px-3.5 py-2 bg-white border border-[#E2DDD5] text-xs font-bold text-[#123D32] rounded-xl hover:bg-[#F4F0E8] transition-colors shadow-sm"
          >
            Tables & QR Tokens →
          </Link>

          <Link
            href="/admin/cashier"
            className="px-3.5 py-2 bg-[#123D32] hover:bg-[#1D765B] text-xs font-bold text-white rounded-xl shadow transition-colors"
          >
            Cashier Register →
          </Link>

          {/* Profile Pill */}
          <div className="flex items-center space-x-2 pl-2 border-l border-[#E2DDD5]">
            <div className="w-10 h-10 rounded-full bg-[#123D32]/10 flex items-center justify-center text-[#123D32] font-black overflow-hidden border border-white shadow-sm ring-1 ring-[#123D32]/20">
              <span className="text-xs font-black">BM</span>
            </div>
            <div className="hidden lg:block text-left">
              <span className="block text-xs font-bold text-[#252B28] leading-none">Alemayehu K.</span>
              <span className="block text-[10px] text-[#5C6460] font-medium">Branch Manager</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2x2 Dashboard Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* CARD 1: WEEKLY SALES */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#123D32]">Confirmed Revenue</h2>
                <p className="text-xs text-[#5C6460]">Tax-inclusive settled receipts (excl. void/refunds)</p>
              </div>
              <select
                aria-label="Sales timeframe selector"
                value={salesTimeframe}
                onChange={(e) => setSalesTimeframe(e.target.value)}
                className="text-xs font-semibold text-[#5C6460] bg-[#F4F0E8] border border-[#E2DDD5] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#123D32]"
              >
                <option value="Past month">Past month</option>
                <option value="This week">This week</option>
                <option value="Today">Today</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#252B28] tracking-tight">
                ETB 24,500.00
              </div>
              <p className="text-xs text-[#1D765B] font-semibold flex items-center mt-1">
                <span className="inline-block mr-1">↑ 18.4%</span> vs previous cycle • 15% VAT included (ETB 3,195.65)
              </p>
            </div>
          </div>

          {/* Smooth SVG Area Spline Chart */}
          <div className="relative pt-3">
            {/* Peak Tooltip Callout */}
            <div className="absolute top-1 left-[63%] -translate-x-1/2 bg-white/95 border border-[#1D765B] text-[#123D32] text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm pointer-events-none flex items-center space-x-1 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#123D32]" />
              <span>ETB 24,500</span>
            </div>

            <svg viewBox="0 0 500 170" className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1D765B" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#1D765B" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#1D765B" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#E2DDD5" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#E2DDD5" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#E2DDD5" strokeDasharray="3 3" />

              {/* Gradient Area Fill */}
              <path
                d="M 10 140 
                   C 50 110, 80 85, 110 82 
                   C 145 80, 160 115, 195 110 
                   C 230 105, 270 32, 315 32 
                   C 360 32, 385 102, 420 85 
                   C 455 68, 475 40, 495 28 
                   L 495 150 L 10 150 Z"
                fill="url(#salesGradient)"
              />

              {/* Curved Line Stroke */}
              <path
                d="M 10 140 
                   C 50 110, 80 85, 110 82 
                   C 145 80, 160 115, 195 110 
                   C 230 105, 270 32, 315 32 
                   C 360 32, 385 102, 420 85 
                   C 455 68, 475 40, 495 28"
                fill="none"
                stroke="#123D32"
                strokeWidth="2.75"
                strokeLinecap="round"
              />

              {/* Peak Point Circle */}
              <circle cx="315" cy="32" r="5" fill="#123D32" />
              <circle cx="315" cy="32" r="8" fill="#1D765B" fillOpacity="0.35" />
            </svg>

            {/* X-Axis Day Markers */}
            <div className="flex justify-between text-[11px] font-semibold text-[#5C6460] pt-2 px-1">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </section>

        {/* CARD 2: ACTIVE TABLES (LIVE VISUAL FLOOR PLAN M07) */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h2 className="text-lg font-bold text-[#123D32]">Visual Floor Plan (M07)</h2>
              <div className="flex items-center space-x-1.5 bg-[#F4F0E8] p-1 rounded-xl text-xs font-semibold">
                {["all", "Zone A", "Zone B", "Counter"].map((z) => (
                  <button
                    key={z}
                    onClick={() => setActiveZone(z)}
                    className={`px-2.5 py-1 rounded-lg transition-colors capitalize ${
                      activeZone === z
                        ? "bg-[#123D32] text-white"
                        : "text-[#5C6460] hover:text-[#252B28]"
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-[#5C6460] mb-4">Click any table to view seated guests, bill total, or waiter assignment</p>
          </div>

          {/* Interactive Floor Plan Grid */}
          <div className="bg-[#F4F0E8] p-5 rounded-2xl border border-[#E2DDD5]">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3.5 justify-items-center items-center">
              {filteredTables.map((table, idx) => {
                let badgeClass = "";
                let labelText = "available";

                if (table.status === "occupied") {
                  badgeClass = "bg-[#1D765B] text-white shadow-sm hover:bg-[#123D32]";
                  labelText = "occupied";
                } else if (table.status === "attention") {
                  badgeClass = "bg-[#DC2626] text-white shadow-sm hover:bg-[#b91c1c] animate-pulse";
                  labelText = "bill req";
                } else {
                  badgeClass = "bg-white text-[#252B28] border-2 border-[#E2DDD5] hover:border-[#123D32]";
                  labelText = "vacant";
                }

                return (
                  <button
                    key={`${table.id}-${idx}`}
                    onClick={() => setSelectedTable(table)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center p-1 transition-all duration-150 transform hover:scale-105 ${badgeClass}`}
                    title={`Table ${table.number} (${table.zone}) - ${labelText}`}
                  >
                    <span className="text-xs sm:text-sm font-black leading-none">{table.number}</span>
                    <span className="text-[9px] font-semibold leading-tight mt-1 text-center truncate max-w-full opacity-90">
                      {labelText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Legend Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 pt-3 border-t border-[#E2DDD5] text-[11px] font-medium text-[#5C6460]">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-[#1D765B]" />
                <span>Occupied ({tables.filter((t) => t.status === "occupied").length})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-[#DC2626]" />
                <span>Bill Requested / Attention ({tables.filter((t) => t.status === "attention").length})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-white border border-[#E2DDD5]" />
                <span>Vacant ({tables.filter((t) => t.status === "available").length})</span>
              </div>
            </div>
          </div>

          {/* Active Table Details Modal / Drawer */}
          {selectedTable && (
            <div className="mt-4 p-3.5 bg-white rounded-xl border border-[#E2DDD5] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
              <div>
                <span className="font-bold text-[#123D32]">Table {selectedTable.number} ({selectedTable.zone}): </span>
                <span className="capitalize font-semibold text-[#252B28]">{selectedTable.status}</span>
                {selectedTable.assignedWaiter && (
                  <span className="ml-2 text-[#5C6460]">• Waiter: {selectedTable.assignedWaiter}</span>
                )}
                {selectedTable.currentBill && (
                  <span className="ml-2 font-bold text-[#1D765B]">• Tab: ETB {selectedTable.currentBill}</span>
                )}
              </div>
              <button
                onClick={() => setSelectedTable(null)}
                className="text-[11px] font-semibold text-[#123D32] hover:underline self-end sm:self-auto"
              >
                Close ✕
              </button>
            </div>
          )}
        </section>

        {/* CARD 3: MENU ITEMS (QUICK STOCK 86 MANAGER) */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-[#123D32]">Menu Availability (86 Controls)</h2>
              <span className="text-xs font-semibold text-[#5C6460] bg-[#F4F0E8] border border-[#E2DDD5] rounded-xl px-3 py-1.5">
                Branch Overrides Active
              </span>
            </div>
            <p className="text-xs text-[#5C6460] mb-4">Instant toggle reflects immediately on customer QR menus</p>

            {/* Table of items */}
            <div className="divide-y divide-[#E2DDD5]/60">
              <div className="grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider text-[#5C6460] pb-2 px-1">
                <div className="col-span-6 sm:col-span-7">Dish / Name</div>
                <div className="col-span-3 sm:col-span-3 text-center">Toggle</div>
                <div className="col-span-3 sm:col-span-2 text-right">Status</div>
              </div>

              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center py-3 px-1 hover:bg-[#F4F0E8]/50 rounded-xl transition-colors"
                >
                  {/* Dish Thumbnail & Name */}
                  <div className="col-span-6 sm:col-span-7 flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${item.imageBg} text-white flex items-center justify-center text-lg shadow-sm shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#252B28] truncate leading-snug">{item.name}</h3>
                      <p className="text-[11px] text-[#5C6460] truncate">
                        {item.nameAm} • {item.price} ETB
                      </p>
                    </div>
                  </div>

                  {/* Stock Toggle Switch */}
                  <div className="col-span-3 sm:col-span-3 flex justify-center">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={item.inStock}
                      aria-label={`Toggle availability for ${item.name}`}
                      onClick={() => toggleStock(item.id)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.inStock ? "bg-[#123D32]" : "bg-[#D8CFC3]"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                          item.inStock ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-3 sm:col-span-2 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.inStock
                          ? "bg-[#1D765B]/10 text-[#1D765B]"
                          : "bg-[#DC2626]/10 text-[#DC2626]"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "86 Out"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-[#E2DDD5] flex justify-between items-center text-xs">
            <span className="text-[#5C6460]">
              {menuItems.filter((m) => m.inStock).length} of {menuItems.length} active on guest menus
            </span>
            <Link
              href="/admin/menu"
              className="font-bold text-[#123D32] hover:text-[#1D765B] transition-colors"
            >
              Full Menu Catalog →
            </Link>
          </div>
        </section>

        {/* CARD 4: STAFF ACTIVITY ANALYTICS */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-[#123D32]">Staff Activity Throughput</h2>
              <span className="text-xs font-semibold text-[#5C6460] bg-[#F4F0E8] border border-[#E2DDD5] rounded-xl px-3 py-1.5">
                Orders Completed
              </span>
            </div>
            <p className="text-xs text-[#5C6460] mb-5">Daily kitchen bump & waiter turnaround throughput</p>
          </div>

          {/* Bar Chart Visualization */}
          <div className="relative pt-4">
            {/* Horizontal Guide Lines with Y-Axis Values */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-[#5C6460]/70 pr-2 pb-6">
              <div className="border-b border-[#E2DDD5]/40 w-full flex justify-between">
                <span>160</span>
              </div>
              <div className="border-b border-[#E2DDD5]/40 w-full flex justify-between">
                <span>120</span>
              </div>
              <div className="border-b border-[#E2DDD5]/40 w-full flex justify-between">
                <span>80</span>
              </div>
              <div className="border-b border-[#E2DDD5]/40 w-full flex justify-between">
                <span>40</span>
              </div>
              <div className="border-b border-[#E2DDD5] w-full flex justify-between">
                <span>0</span>
              </div>
            </div>

            {/* Bars Container */}
            <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-2 px-6 pt-4 pb-1 relative z-10">
              {staffActivityData.map((d, index) => {
                const heightPercent = Math.min(100, Math.round((d.value / 160) * 100));
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 bg-[#123D32] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none">
                      {d.value} orders
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[20px] bg-[#123D32] hover:bg-[#1D765B] rounded-t-md transition-all duration-200"
                    />
                    <span className="text-[10px] font-semibold text-[#5C6460] mt-2 truncate w-full text-center">
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 mt-1 flex justify-between items-center text-xs text-[#5C6460]">
            <span>Peak rush: Sat (160 orders handled)</span>
            <span className="text-[#1D765B] font-bold">98.4% on-time delivery</span>
          </div>
        </section>
      </div>
    </div>
  );
}
