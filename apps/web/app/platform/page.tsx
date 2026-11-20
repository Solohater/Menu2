"use client";

import { useState } from "react";
import Link from "next/link";

interface TenantSummary {
  id: string;
  name: string;
  code: string;
  branchesCount: number;
  tablesCount: number;
  status: "active" | "provisioning" | "suspended";
  plan: "Enterprise" | "Standard";
  currentMonthlyVolume: number;
  createdAt: string;
}

export default function PlatformAdminDashboardPage() {
  const [tenants] = useState<TenantSummary[]>([
    {
      id: "01J8REST001",
      name: "MenuFlow Gourmet Lounge",
      code: "MF-GOURMET",
      branchesCount: 3,
      tablesCount: 42,
      status: "active",
      plan: "Enterprise",
      currentMonthlyVolume: 342000,
      createdAt: "2026-08-10",
    },
    {
      id: "01J8REST002",
      name: "Lucy Addis Traditional Resto",
      code: "LUCY-ADDIS",
      branchesCount: 2,
      tablesCount: 28,
      status: "active",
      plan: "Enterprise",
      currentMonthlyVolume: 215000,
      createdAt: "2026-09-01",
    },
    {
      id: "01J8REST003",
      name: "Habesha Coffee & Pastry Roasters",
      code: "HABESHA-ROAST",
      branchesCount: 4,
      tablesCount: 36,
      status: "active",
      plan: "Standard",
      currentMonthlyVolume: 127200,
      createdAt: "2026-09-15",
    },
    {
      id: "01J8REST004",
      name: "Bole Burger Bistro",
      code: "BOLE-BISTRO",
      branchesCount: 1,
      tablesCount: 14,
      status: "provisioning",
      plan: "Standard",
      currentMonthlyVolume: 0,
      createdAt: "2026-11-12",
    },
  ]);

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-7xl mx-auto min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2DDD5]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1D765B] animate-ping" />
            <span className="text-xs font-bold text-[#1D765B] uppercase tracking-wider">Multi-Tenant Platform Governance (PA01)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123D32] mt-0.5">Platform Admin Command Center</h1>
          <p className="text-xs text-[#5C6460] font-medium mt-0.5">
            Global tenant provisioning, brand styling suites, real-time infrastructure telemetry, and immutable audit logs.
          </p>
        </div>

        {/* Global Navigation Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/platform/tenants"
            className="px-4 py-2 bg-[#123D32] hover:bg-[#1D765B] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center space-x-1"
          >
            <span>+ Provision Tenant</span>
          </Link>
          <Link
            href="/platform/branding"
            className="px-3.5 py-2 bg-white border border-[#E2DDD5] text-xs font-bold text-[#123D32] rounded-xl hover:bg-[#F4F0E8] transition-colors shadow-sm"
          >
            🎨 Brand Palettes →
          </Link>
          <Link
            href="/platform/audit"
            className="px-3.5 py-2 bg-white border border-[#E2DDD5] text-xs font-bold text-[#123D32] rounded-xl hover:bg-[#F4F0E8] transition-colors shadow-sm"
          >
            📜 Audit Logs →
          </Link>
        </div>
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-[#E2DDD5] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6460]">Active Restaurants</span>
          <p className="text-3xl font-black text-[#123D32] mt-1">{tenants.length} Tenants</p>
          <span className="text-[10px] text-[#1D765B] font-bold mt-1 block">100% Onboarded</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E2DDD5] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6460]">Live Branches</span>
          <p className="text-3xl font-black text-[#123D32] mt-1">10 Branches</p>
          <span className="text-[10px] text-[#5C6460] font-medium mt-1 block">120 Total Tables Scoped</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E2DDD5] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6460]">Platform 30D Volume</span>
          <p className="text-3xl font-black text-[#123D32] mt-1">ETB 684.2K</p>
          <span className="text-[10px] text-[#1D765B] font-bold mt-1 block">↑ 22.8% MoM Growth</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E2DDD5] shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6460]">System Telemetry</span>
          <p className="text-3xl font-black text-[#1D765B] mt-1">99.98%</p>
          <span className="text-[10px] text-[#1D765B] font-bold mt-1 block">All Clusters Operational</span>
        </div>
      </div>

      {/* Real-Time Infrastructure Telemetry Monitor (PA19) */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-[#E2DDD5] pb-3">
          <div>
            <h2 className="text-lg font-bold text-[#123D32]">Platform Infrastructure Health (PA19)</h2>
            <p className="text-xs text-[#5C6460]">Real telemetry from Go API runtime, PostgreSQL pool, Redis cache, and WebSockets</p>
          </div>
          <span className="px-3 py-1 bg-[#1D765B]/10 text-[#1D765B] text-xs font-bold rounded-full">
            ● All Services Green
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6460]">Golang API Service</span>
            <div className="text-lg font-black text-[#123D32]">Port 8080 • Chi v5</div>
            <p className="text-xs text-[#1D765B] font-bold">14ms avg response time</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6460]">PostgreSQL 16 Cluster</span>
            <div className="text-lg font-black text-[#123D32]">Ent ORM • 42 / 100</div>
            <p className="text-xs text-[#5C6460]">Tenant scoping enforced</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6460]">Redis 7 Pub/Sub Engine</span>
            <div className="text-lg font-black text-[#123D32]">0ms Lag • 24 Channels</div>
            <p className="text-xs text-[#5C6460]">Live KDS & Waiter dispatch</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6460]">WebSocket Gateway</span>
            <div className="text-lg font-black text-[#123D32]">184 Connected Clients</div>
            <p className="text-xs text-[#1D765B] font-bold">Auto-reconnect with dedupe</p>
          </div>
        </div>
      </div>

      {/* Tenant Directory Table (PA03) */}
      <div className="bg-white rounded-3xl border border-[#E2DDD5] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E2DDD5] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#123D32]">Managed Restaurant Tenants</h2>
            <p className="text-xs text-[#5C6460]">Active organizations with dedicated schemas and branch scoping</p>
          </div>
          <Link
            href="/platform/tenants"
            className="text-xs font-bold text-[#123D32] hover:underline"
          >
            Manage All Tenants →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#252B28]">
            <thead className="text-xs uppercase text-[#5C6460] border-b border-[#E2DDD5] bg-[#F4F0E8]">
              <tr>
                <th className="p-4">Tenant Name</th>
                <th className="p-4">Code</th>
                <th className="p-4">Branches</th>
                <th className="p-4">30D Volume</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4 text-right">Lifecycle Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD5]/60">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-[#F4F0E8]/50 transition-colors">
                  <td className="p-4 font-bold text-[#123D32]">
                    {t.name}
                  </td>
                  <td className="p-4 font-mono text-xs text-[#5C6460]">
                    {t.code}
                  </td>
                  <td className="p-4 font-semibold text-[#252B28]">
                    {t.branchesCount} Branches ({t.tablesCount} Tables)
                  </td>
                  <td className="p-4 font-bold text-[#252B28]">
                    ETB {t.currentMonthlyVolume.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#123D32]/10 text-[#123D32]">
                      {t.plan}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        t.status === "active"
                          ? "bg-[#1D765B]/10 text-[#1D765B]"
                          : t.status === "provisioning"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
