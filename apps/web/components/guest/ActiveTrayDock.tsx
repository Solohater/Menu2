"use client";

interface ActiveTrayDockProps {
  itemCount: number;
  totalPriceETB: number;
  onOpenTray: () => void;
  onCheckout: () => void;
}

export default function ActiveTrayDock({
  itemCount,
  totalPriceETB,
  onOpenTray,
  onCheckout,
}: ActiveTrayDockProps) {
  if (itemCount <= 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 animate-in slide-in-from-bottom duration-300">
      <div className="bg-[#123D32] text-white backdrop-blur-md rounded-2xl border border-[#1D765B]/40 p-3 shadow-2xl flex items-center justify-between">
        {/* Tray Summary Pill */}
        <div
          onClick={onOpenTray}
          className="flex items-center space-x-3 cursor-pointer pl-1 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1D765B] flex items-center justify-center text-white text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
            🛒
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block">
              Active Tray
            </span>
            <span className="text-sm font-black text-amber-300">
              {itemCount} {itemCount === 1 ? "item" : "items"} • {totalPriceETB} ETB
            </span>
          </div>
        </div>

        {/* Checkout Action Button */}
        <button
          type="button"
          onClick={onCheckout}
          className="min-h-[44px] px-5 py-2 bg-[#1D765B] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#1D765B]/90 active:scale-95 transition-all flex items-center space-x-1.5"
        >
          <span>View Order</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
