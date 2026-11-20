"use client";

import { useState } from "react";
import Link from "next/link";

interface AuditLogEntry {
  id: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
  timestamp: string;
  status: "success" | "warning" | "denied";
  details: string;
}

export default function PlatformAuditLogPage() {
  const [logs] = useState<AuditLogEntry[]>([
    {
      id: "AUD-98241",
      actor: "Alemayehu K.",
      role: "Branch Manager",
      action: "86_ITEM_TOGGLE",
      resource: "Item #01J8ITEM3 (Gomen Be Siga)",
      ipAddress: "196.188.24.12",
      timestamp: "2026-11-16 09:42:15 EAT",
      status: "success",
      details: "Toggled item status from 'In Stock' to '86 Out of Stock'.",
    },
    {
      id: "AUD-98240",
      actor: "Abebe Tadesse",
      role: "Waiter Runner",
      action: "TABLE_ASSISTANCE_RESOLVE",
      resource: "Table 04",
      ipAddress: "196.188.24.89",
      timestamp: "2026-11-16 09:35:02 EAT",
      status: "success",
      details: "Acknowledged and resolved customer service request for Table 04.",
    },
    {
      id: "AUD-98239",
      actor: "Marta W.",
      role: "Cashier",
      action: "DRAWER_SHIFT_OPEN",
      resource: "Register #04 (Morning Shift)",
      ipAddress: "196.188.24.45",
      timestamp: "2026-11-16 08:00:10 EAT",
      status: "success",
      details: "Opening float verified: ETB 1,500.00 cash counted.",
    },
    {
      id: "AUD-98238",
      actor: "System Administrator",
      role: "Platform Admin",
      action: "HMAC_TOKEN_VERSION_BUMP",
      resource: "Tenant 01J8REST001 (All Physical QR codes)",
      ipAddress: "197.156.102.1",
      timestamp: "2026-11-15 22:15:00 EAT",
      status: "warning",
      details: "Revoked token version v1; generated HMAC signature key rotation for v2.",
    },
    {
      id: "AUD-98237",
      actor: "Chef Yohannes",
      role: "Kitchen Chef",
      action: "KDS_TICKET_BUMP",
      resource: "Order #MF-8942-T04",
      ipAddress: "196.188.24.33",
      timestamp: "2026-11-15 20:12:44 EAT",
      status: "success",
      details: "Transitioned dish #1 from Cooking to Ready; broadcasted floor runner dispatch.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === "all" || l.action === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-7xl mx-auto min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2DDD5]">
        <div>
          <div className="flex items-center space-x-2">
            <Link href="/platform" className="text-xs font-bold text-[#123D32] hover:underline">
              ← Platform Command Center
            </Link>
            <span className="text-xs text-[#E2DDD5]">•</span>
            <span className="text-xs text-[#5C6460] font-semibold">Security & Audit Trail (PA20–PA22)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123D32] mt-1">
            Immutable Platform Audit Logs
          </h1>
          <p className="text-xs text-[#5C6460] font-medium mt-0.5">
            Tamper-proof compliance log capturing all security events, bill settlements, 86 item toggles, and token rotations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3.5 py-1.5 bg-[#1D765B]/10 text-[#1D765B] rounded-xl text-xs font-bold flex items-center space-x-1.5">
            <span>🔒</span>
            <span>Append-Only Store</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 border border-[#E2DDD5] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by actor, table, or resource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#E2DDD5] bg-[#F4F0E8] focus:outline-[#123D32]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="w-full sm:w-auto text-xs font-bold px-3 py-2.5 rounded-xl border border-[#E2DDD5] bg-[#F4F0E8] text-[#252B28] focus:outline-[#123D32]"
          >
            <option value="all">All Action Types</option>
            <option value="86_ITEM_TOGGLE">86 Item Availability</option>
            <option value="TABLE_ASSISTANCE_RESOLVE">Table Assistance</option>
            <option value="DRAWER_SHIFT_OPEN">Drawer Shifts</option>
            <option value="HMAC_TOKEN_VERSION_BUMP">Token Version Bumps</option>
            <option value="KDS_TICKET_BUMP">Kitchen Ticket Bumps</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#252B28]">
            <thead className="text-xs uppercase text-[#5C6460] border-b border-[#E2DDD5] bg-[#F4F0E8]">
              <tr>
                <th className="p-4">Log ID & Time</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Action Event</th>
                <th className="p-4">Resource Target</th>
                <th className="p-4">Details</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD5]/60 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F4F0E8]/50 transition-colors">
                  <td className="p-4 font-mono">
                    <span className="font-bold text-[#123D32] block">{log.id}</span>
                    <span className="text-[10px] text-[#5C6460]">{log.timestamp}</span>
                  </td>
                  <td className="p-4">
                    <strong className="block text-[#252B28]">{log.actor}</strong>
                    <span className="text-[10px] text-[#5C6460]">{log.role} • {log.ipAddress}</span>
                  </td>
                  <td className="p-4">
                    <code className="px-2 py-0.5 rounded bg-[#123D32]/10 text-[#123D32] font-mono text-[11px] font-bold">
                      {log.action}
                    </code>
                  </td>
                  <td className="p-4 font-semibold text-[#252B28]">
                    {log.resource}
                  </td>
                  <td className="p-4 text-[#5C6460] max-w-xs">
                    {log.details}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        log.status === "success"
                          ? "bg-[#1D765B]/10 text-[#1D765B]"
                          : log.status === "warning"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
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
