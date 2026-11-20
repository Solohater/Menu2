"use client";

import { useState } from "react";
import Link from "next/link";

interface BrandPalette {
  id: string;
  name: string;
  primary: string;
  accent: string;
  bg: string;
  text: string;
  description: string;
}

export default function PlatformBrandingPage() {
  const [palettes] = useState<BrandPalette[]>([
    {
      id: "deep-emerald",
      name: "Deep Emerald (Official Platform Default)",
      primary: "#123D32",
      accent: "#1D765B",
      bg: "#FDFBF7",
      text: "#252B28",
      description: "Sophisticated Ethiopian highland botanical emerald and warm linen linen white",
    },
    {
      id: "roasted-buna",
      name: "Roasted Buna (Ethiopian Coffee Heritage)",
      primary: "#4E2E1E",
      accent: "#9D3E0F",
      bg: "#FFF8F5",
      text: "#2B1810",
      description: "Rich jebena coffee tones with warm terracotta and roast embers",
    },
    {
      id: "modern-slate",
      name: "Modern Bistro Slate",
      primary: "#1E293B",
      accent: "#0F766E",
      bg: "#F8FAFC",
      text: "#0F172A",
      description: "Minimalist metropolitan cafe aesthetic with clean slate and crisp borders",
    },
  ]);

  const [selectedPalette, setSelectedPalette] = useState("deep-emerald");
  const [defaultLanguage, setDefaultLanguage] = useState("am");
  const [allowGuestToggle, setAllowGuestToggle] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
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
            <Link href="/platform" className="text-xs font-bold text-[#123D32] hover:underline">
              ← Platform Command Center
            </Link>
            <span className="text-xs text-[#E2DDD5]">•</span>
            <span className="text-xs text-[#5C6460] font-semibold">Branding & Palettes (PA13–PA15)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#123D32] mt-1">
            System Palettes & Localization
          </h1>
          <p className="text-xs text-[#5C6460] font-medium mt-0.5">
            Configure tenant theme palettes, bilingual typography, and customer language defaults.
          </p>
        </div>

        {saveSuccess && (
          <span className="px-4 py-2 bg-[#1D765B]/15 text-[#1D765B] font-bold text-xs rounded-xl flex items-center space-x-1.5 animate-fadeIn">
            <span>✓</span>
            <span>Brand settings updated!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Theme Palettes Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm space-y-4">
          <div className="border-b border-[#E2DDD5] pb-3">
            <h2 className="text-lg font-bold text-[#123D32]">Design Token Palettes (PA13)</h2>
            <p className="text-xs text-[#5C6460]">
              Assign preset color tokens for customer menus, staff handhelds, and kitchen boards.
            </p>
          </div>

          <div className="space-y-3.5">
            {palettes.map((p) => (
              <label
                key={p.id}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  selectedPalette === p.id
                    ? "border-[#123D32] bg-[#123D32]/5 shadow-sm"
                    : "border-[#E2DDD5] hover:border-[#123D32]/40 bg-[#FDFBF7]"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="palette"
                      value={p.id}
                      checked={selectedPalette === p.id}
                      onChange={(e) => setSelectedPalette(e.target.value)}
                      className="w-4 h-4 text-[#123D32] focus:ring-[#123D32]"
                    />
                    <span className="text-sm font-bold text-[#252B28]">{p.name}</span>
                  </div>
                  <p className="text-xs text-[#5C6460] pl-6">{p.description}</p>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center space-x-2 pl-6 sm:pl-0">
                  <div className="text-center">
                    <div style={{ backgroundColor: p.primary }} className="w-8 h-8 rounded-lg shadow-sm border border-black/10 mx-auto" />
                    <span className="text-[9px] font-bold text-[#5C6460]">Primary</span>
                  </div>
                  <div className="text-center">
                    <div style={{ backgroundColor: p.accent }} className="w-8 h-8 rounded-lg shadow-sm border border-black/10 mx-auto" />
                    <span className="text-[9px] font-bold text-[#5C6460]">Accent</span>
                  </div>
                  <div className="text-center">
                    <div style={{ backgroundColor: p.bg }} className="w-8 h-8 rounded-lg shadow-sm border border-[#E2DDD5] mx-auto" />
                    <span className="text-[9px] font-bold text-[#5C6460]">Surface</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Localization & Typography Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2DDD5] shadow-sm space-y-4">
          <div className="border-b border-[#E2DDD5] pb-3">
            <h2 className="text-lg font-bold text-[#123D32]">Localization & Ge'ez Typography (PA14)</h2>
            <p className="text-xs text-[#5C6460]">
              Configure default guest language, font pairings (Inter + Noto Sans Ethiopic), and guest switchers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#252B28] uppercase tracking-wider mb-1.5">
                Default Menu Language
              </label>
              <select
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
                className="w-full text-xs font-bold p-3 rounded-xl border border-[#E2DDD5] bg-[#F4F0E8] focus:outline-[#123D32]"
              >
                <option value="en">English (Primary International)</option>
                <option value="am">አማርኛ (Amharic Standard)</option>
                <option value="om">Afaan Oromoo (Oromo Regional)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#252B28] uppercase tracking-wider mb-1.5">
                Typography Engine
              </label>
              <input
                type="text"
                disabled
                value="Inter (Latin) + Noto Sans Ethiopic (Ge'ez)"
                className="w-full text-xs font-semibold p-3 rounded-xl border border-[#E2DDD5] bg-[#E2DDD5]/40 text-[#5C6460] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F4F0E8] border border-[#E2DDD5] mt-2">
            <div>
              <span className="text-xs font-bold text-[#252B28] block">Allow Customer Language Switcher (EN / አማ)</span>
              <span className="text-[11px] text-[#5C6460]">
                Shows top-bar pill for guests to dynamically toggle between English and Amharic
              </span>
            </div>
            <input
              type="checkbox"
              checked={allowGuestToggle}
              onChange={(e) => setAllowGuestToggle(e.target.checked)}
              className="w-5 h-5 text-[#123D32] rounded-lg focus:ring-[#123D32]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#123D32] hover:bg-[#1D765B] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all"
          >
            Apply Branding & Localization
          </button>
        </div>
      </form>
    </div>
  );
}
