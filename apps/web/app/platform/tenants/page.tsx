"use client";

import { useState } from "react";
import Link from "next/link";

interface Branch {
  id: string;
  name: string;
  subcity: string;
  tablesCount: number;
  managerName: string;
  status: "active" | "maintenance";
}

interface RestaurantTenant {
  id: string;
  name: string;
  tin: string;
  code: string;
  status: "active" | "suspended" | "provisioning";
  palette: string;
  branches: Branch[];
}

export default function PlatformTenantsPage() {
  const [tenants, setTenants] = useState<RestaurantTenant[]>([
    {
      id: "01J8REST001",
      name: "MenuFlow Gourmet Lounge",
      tin: "0083921045",
      code: "menuflow-gourmet",
      status: "active",
      palette: "Deep Emerald",
      branches: [
        { id: "b1", name: "Bole Medhanialem Flagship", subcity: "Bole", tablesCount: 24, managerName: "Alemayehu K.", status: "active" },
        { id: "b2", name: "Kazanchis Executive Club", subcity: "Kirkos", tablesCount: 18, managerName: "Selamawit B.", status: "active" },
      ],
    },
    {
      id: "01J8REST002",
      name: "Lucy Addis Traditional Resto",
      tin: "0091823411",
      code: "lucy-traditional",
      status: "active",
      palette: "Roasted Buna",
      branches: [
        { id: "b3", name: "National Museum Branch", subcity: "Arada", tablesCount: 28, managerName: "Bereket T.", status: "active" },
      ],
    },
  ]);

  const [isNewTenantModalOpen, setIsNewTenantModalOpen] = useState(false);
  const [newTenantName, setNewTenantName] = useState("");
  const [newTenantTin, setNewTenantTin] = useState("");
  const [newTenantCode, setNewTenantCode] = useState("");

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName.trim()) return;

    const newT: RestaurantTenant = {
      id: `01J8REST${Date.now()}`,
      name: newTenantName,
      tin: newTenantTin || "0099887766",
      code: newTenantCode || newTenantName.toLowerCase().replace(/\\s+/g, "-"),
      status: "provisioning",
      palette: "Deep Emerald",
      branches: [
        {
          id: `b-${Date.now()}`,
          name: "Main Branch",
          subcity: "Addis Ababa",
          tablesCount: 12,
          managerName: "Pending Assignment",
          status: "active",
        },
      ],
    };

    setTenants([...tenants, newT]);
    setIsNewTenantModalOpen(false);
    setNewTenantName("");
    setNewTenantTin("");
    setNewTenantCode("");
  };

  const toggleTenantStatus = (id: string) => {
    setTenants((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "active" ? "suspended" : "active";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

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
            <span className="text-xs text-[#5C6460] font-semibold">Tenant Lifecycle & Branches (PA03–PA07)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123D32] mt-1">
            Restaurant Organizations & Branches
          </h1>
          <p className="text-xs text-[#5C6460] font-medium mt-0.5">
            Provision new restaurant clients, configure multi-branch hierarchies, and manage lifecycle states.
          </p>
        </div>

        <button
          onClick={() => setIsNewTenantModalOpen(true)}
          className="px-4 py-2 bg-[#123D32] hover:bg-[#1D765B] text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center space-x-1"
        >
          <span>+ Onboard Restaurant Tenant</span>
        </button>
      </div>

      {/* Tenant Organizations List */}
      <div className="space-y-6">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="bg-white rounded-3xl border border-[#E2DDD5] p-6 shadow-sm space-y-5"
          >
            {/* Tenant Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DDD5] pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-black text-[#123D32]">{tenant.name}</h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      tenant.status === "active"
                        ? "bg-[#1D765B]/10 text-[#1D765B]"
                        : tenant.status === "provisioning"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tenant.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C6460]">
                  <span>Code: <code className="font-mono font-bold text-[#252B28]">{tenant.code}</code></span>
                  <span>•</span>
                  <span>TIN: <strong className="font-mono text-[#252B28]">{tenant.tin}</strong></span>
                  <span>•</span>
                  <span>Brand Theme: <strong className="text-[#123D32]">{tenant.palette}</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-auto">
                <button
                  onClick={() => toggleTenantStatus(tenant.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    tenant.status === "active"
                      ? "border border-red-200 text-red-700 hover:bg-red-50"
                      : "bg-[#1D765B] text-white hover:bg-[#123D32]"
                  }`}
                >
                  {tenant.status === "active" ? "Suspend Tenant" : "Activate Tenant"}
                </button>
              </div>
            </div>

            {/* Branches Grid */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#5C6460] uppercase tracking-wider block">
                Provisioned Branches ({tenant.branches.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tenant.branches.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-[#252B28]">{b.name}</h3>
                        <span className="text-[10px] font-bold text-[#1D765B] bg-[#1D765B]/10 px-2 py-0.5 rounded-full">
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C6460] mt-0.5">{b.subcity} Subcity • {b.tablesCount} Tables</p>
                    </div>

                    <div className="pt-2 border-t border-[#E2DDD5]/70 flex justify-between items-center text-xs">
                      <span className="text-[#5C6460]">Manager:</span>
                      <strong className="text-[#123D32]">{b.managerName}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Onboard Tenant */}
      {isNewTenantModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2DDD5] p-6 max-w-md w-full shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#123D32]">Onboard Restaurant Tenant</h3>
              <p className="text-xs text-[#5C6460]">Initializes dedicated tenant schema with initial branch</p>
            </div>

            <form onSubmit={handleCreateTenant} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#252B28] mb-1">Restaurant Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Entoto Panoramic Bistro"
                  value={newTenantName}
                  onChange={(e) => setNewTenantName(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#E2DDD5] bg-[#FDFBF7] focus:outline-[#123D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#252B28] mb-1">TIN / Tax Identification Number</label>
                <input
                  type="text"
                  placeholder="e.g. 0089213450"
                  value={newTenantTin}
                  onChange={(e) => setNewTenantTin(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#E2DDD5] bg-[#FDFBF7] focus:outline-[#123D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#252B28] mb-1">Subdomain Slug / Code</label>
                <input
                  type="text"
                  placeholder="e.g. entoto-bistro"
                  value={newTenantCode}
                  onChange={(e) => setNewTenantCode(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#E2DDD5] bg-[#FDFBF7] focus:outline-[#123D32]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewTenantModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#5C6460] hover:text-[#252B28]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#123D32] hover:bg-[#1D765B] text-white text-xs font-bold rounded-xl shadow"
                >
                  Create & Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
