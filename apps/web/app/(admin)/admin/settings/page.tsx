"use client";

import { useState } from "react";
import Link from "next/link";

interface RestaurantSettings {
  restaurant_name: string;
  establishment_mode: "table_service" | "counter_pickup";
  service_charge_pct: number;
  vat_pct: number;
  cash_fallback_enabled: boolean;
  pickup_alarm_enabled: boolean;
  telebirr_enabled: boolean;
  chapa_enabled: boolean;
  cbe_enabled: boolean;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<RestaurantSettings>({
    restaurant_name: "MenuFlow Gourmet Lounge (Bole Branch)",
    establishment_mode: "table_service",
    service_charge_pct: 0.0, // 0% initial release
    vat_pct: 15.0, // 15% tax-inclusive VAT
    cash_fallback_enabled: true,
    pickup_alarm_enabled: false,
    telebirr_enabled: true,
    chapa_enabled: true,
    cbe_enabled: true,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-5xl mx-auto min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2DDD5]">
        <div>
          <div className="flex items-center space-x-2">
            <Link href="/admin" className="text-xs font-bold text-[#123D32] hover:underline">
              ← Manager Dashboard
            </Link>
            <span className="text-xs text-[#E2DDD5]">•</span>
            <span className="text-xs text-[#5C6460] font-semibold">Store Configuration</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123D32] mt-1">
            Establishment Settings
          </h1>
          <p className="text-xs text-[#5C6460] font-medium mt-0.5">
            Configure restaurant service flow, statutory tax-inclusive pricing, and Ethiopian payment rails.
          </p>
        </div>

        {saveSuccess && (
          <span className="px-4 py-2 bg-[#1D765B]/15 text-[#1D765B] font-bold text-xs rounded-xl flex items-center space-x-1.5 animate-fadeIn">
            <span>✓</span>
            <span>Settings saved successfully!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Restaurant Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm space-y-4">
          <div className="border-b border-[#E2DDD5] pb-3">
            <h2 className="text-lg font-bold text-[#123D32]">Restaurant Profile</h2>
            <p className="text-xs text-[#5C6460]">Displayed on customer QR menus and digital invoices</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#252B28] uppercase tracking-wider mb-1.5">
                Restaurant & Branch Name
              </label>
              <input
                type="text"
                value={settings.restaurant_name}
                onChange={(e) => setSettings({ ...settings, restaurant_name: e.target.value })}
                className="w-full text-sm font-semibold text-[#252B28] bg-[#F4F0E8] border border-[#E2DDD5] rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#123D32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#252B28] uppercase tracking-wider mb-1.5">
                Statutory Currency
              </label>
              <input
                type="text"
                disabled
                value="ETB (Ethiopian Birr / ብር)"
                className="w-full text-sm font-semibold text-[#5C6460] bg-[#E2DDD5]/40 border border-[#E2DDD5] rounded-xl px-3.5 py-2.5 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Operational Mode Tile Selectors */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm space-y-4">
          <div className="border-b border-[#E2DDD5] pb-3">
            <h2 className="text-lg font-bold text-[#123D32]">Service Operating Mode</h2>
            <p className="text-xs text-[#5C6460]">Switches dispatch behavior between runner staff and customer pickup</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSettings({ ...settings, establishment_mode: "table_service" })}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                settings.establishment_mode === "table_service"
                  ? "border-[#123D32] bg-[#123D32]/5 shadow-sm"
                  : "border-[#E2DDD5] hover:border-[#123D32]/50 bg-[#FDFBF7]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🍽️</span>
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    settings.establishment_mode === "table_service"
                      ? "border-[#123D32] bg-[#123D32]"
                      : "border-[#E2DDD5]"
                  }`}
                >
                  {settings.establishment_mode === "table_service" && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#252B28]">Full Table Service</h3>
              <p className="text-xs text-[#5C6460] mt-1">
                Kitchen marks "Ready" → alerts floor waiters with table number → runner delivers dish to table.
              </p>
            </div>

            <div
              onClick={() => setSettings({ ...settings, establishment_mode: "counter_pickup" })}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                settings.establishment_mode === "counter_pickup"
                  ? "border-[#123D32] bg-[#123D32]/5 shadow-sm"
                  : "border-[#E2DDD5] hover:border-[#123D32]/50 bg-[#FDFBF7]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">🥡</span>
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    settings.establishment_mode === "counter_pickup"
                      ? "border-[#123D32] bg-[#123D32]"
                      : "border-[#E2DDD5]"
                  }`}
                >
                  {settings.establishment_mode === "counter_pickup" && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#252B28]">Counter Pickup / Fast Casual</h3>
              <p className="text-xs text-[#5C6460] mt-1">
                Kitchen bumps ticket → sends buzz notification to customer phone for takeaway counter pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Taxes & Charges (Tax-Inclusive Model) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm space-y-4">
          <div className="border-b border-[#E2DDD5] pb-3">
            <h2 className="text-lg font-bold text-[#123D32]">Tax & Statutory Compliance</h2>
            <p className="text-xs text-[#5C6460]">Menu prices are strictly tax-inclusive per Ethiopian F&B regulations</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#252B28] uppercase tracking-wider mb-1.5">
                Value Added Tax (15% Included VAT)
              </label>
              <input
                type="number"
                disabled
                value={settings.vat_pct}
                className="w-full text-sm font-semibold text-[#5C6460] bg-[#E2DDD5]/40 border border-[#E2DDD5] rounded-xl px-3.5 py-2.5 cursor-not-allowed"
              />
              <span className="text-[11px] text-[#1D765B] font-semibold mt-1 block">
                ✓ Included component: Tax = Total − (Total / 1.15)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#252B28] uppercase tracking-wider mb-1.5">
                Service Charge (Initial Release: 0%)
              </label>
              <input
                type="number"
                disabled
                value={settings.service_charge_pct}
                className="w-full text-sm font-semibold text-[#5C6460] bg-[#E2DDD5]/40 border border-[#E2DDD5] rounded-xl px-3.5 py-2.5 cursor-not-allowed"
              />
              <span className="text-[11px] text-[#5C6460] mt-1 block">
                0% service charge for initial release
              </span>
            </div>
          </div>
        </div>

        {/* Payment Rails */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm space-y-4">
          <div className="border-b border-[#E2DDD5] pb-3">
            <h2 className="text-lg font-bold text-[#123D32]">Payment Rails & Gateways</h2>
            <p className="text-xs text-[#5C6460]">Toggle active checkout methods available on customer and cashier screens</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5]">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📲</span>
                <div>
                  <span className="text-sm font-bold text-[#252B28] block">Telebirr (ቴሌብር) Integration</span>
                  <span className="text-xs text-[#5C6460]">Direct mobile wallet checkout & USSD push rails</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.telebirr_enabled}
                onChange={(e) => setSettings({ ...settings, telebirr_enabled: e.target.checked })}
                className="w-5 h-5 text-[#123D32] rounded-lg focus:ring-[#123D32]"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5]">
              <div className="flex items-center space-x-3">
                <span className="text-xl">💳</span>
                <div>
                  <span className="text-sm font-bold text-[#252B28] block">Chapa Payment Gateway (ቻፓ)</span>
                  <span className="text-xs text-[#5C6460]">Debit cards, Awash, Dashen, and international credit cards</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.chapa_enabled}
                onChange={(e) => setSettings({ ...settings, chapa_enabled: e.target.checked })}
                className="w-5 h-5 text-[#123D32] rounded-lg focus:ring-[#123D32]"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5]">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🏦</span>
                <div>
                  <span className="text-sm font-bold text-[#252B28] block">CBE Birr & CBE Direct (ንግድ ባንክ)</span>
                  <span className="text-xs text-[#5C6460]">Commercial Bank of Ethiopia direct mobile checkout</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.cbe_enabled}
                onChange={(e) => setSettings({ ...settings, cbe_enabled: e.target.checked })}
                className="w-5 h-5 text-[#123D32] rounded-lg focus:ring-[#123D32]"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5]">
              <div className="flex items-center space-x-3">
                <span className="text-xl">💵</span>
                <div>
                  <span className="text-sm font-bold text-[#252B28] block">Cash at Counter & Table Tab</span>
                  <span className="text-xs text-[#5C6460]">
                    Allows physical cash collection with cashier or floor waiter
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.cash_fallback_enabled}
                onChange={(e) => setSettings({ ...settings, cash_fallback_enabled: e.target.checked })}
                className="w-5 h-5 text-[#123D32] rounded-lg focus:ring-[#123D32]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#123D32] hover:bg-[#1D765B] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
