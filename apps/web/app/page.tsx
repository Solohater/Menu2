import Link from "next/link";

export default function RootHubPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#252B28] font-sans selection:bg-[#123D32] selection:text-white pb-16">
      {/* Top Navbar */}
      <header className="border-b border-[#E2DDD5] bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#123D32]/10 flex items-center justify-center text-[#123D32] shadow-sm font-black text-xl">
              🌿
            </div>
            <div>
              <span className="font-black text-xl tracking-wider text-[#123D32] block leading-none">MENUFLOW</span>
              <span className="text-[11px] text-[#5C6460] font-semibold">Ethiopian Hospitality Suite • Deep Emerald</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1D765B]/10 text-[#1D765B]">
              <span className="w-2 h-2 rounded-full bg-[#1D765B] animate-ping" />
              <span>System Live • 6 Roles Active</span>
            </span>
            <Link
              href="/admin"
              className="px-4 py-2 bg-[#123D32] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#1D765B] transition-all"
            >
              Manager Portal →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-10 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#123D32]/10 text-[#123D32] text-xs font-bold">
            <span>🇪🇹 Ethiopian Hospitality Operations Platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#252B28] tracking-tight leading-tight">
            One Cohesive Platform, <br />
            <span className="text-[#123D32]">Every Restaurant Surface.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5C6460] font-medium max-w-2xl mx-auto">
            Scan table QR, order via Telebirr or Chapa, bump tickets in high-contrast KDS, dispatch runners, reconcile cash drawer shifts, and govern multi-tenant organizations.
          </p>
        </div>

        {/* Featured Desktop Manager Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123D32] via-[#1D765B] to-[#123D32] text-white p-8 sm:p-10 shadow-lg border border-[#123D32]/20">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full">
                Featured Manager Experience
              </span>
              <h2 className="text-3xl font-black tracking-tight">
                Manager Operations & Visual Floor Plan
              </h2>
              <p className="text-sm text-white/90 leading-relaxed">
                Administrative command center with live <b>Confirmed Revenue (ETB 24,500)</b> spline charts, interactive <b>Visual Floor Map (M07)</b> by zone, <b>1-tap 86 stock availability</b>, and daily staff throughput analytics.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-black/20 text-xs px-2.5 py-1 rounded-lg font-medium">📈 Live Spline Chart</span>
                <span className="bg-black/20 text-xs px-2.5 py-1 rounded-lg font-medium">🟢 Zone A & B Floor Grid</span>
                <span className="bg-black/20 text-xs px-2.5 py-1 rounded-lg font-medium">⚡ 86 Stock Toggles</span>
                <span className="bg-black/20 text-xs px-2.5 py-1 rounded-lg font-medium">👥 Staff Activity</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/admin"
                className="px-6 py-4 rounded-2xl bg-white text-[#123D32] hover:bg-[#FDFBF7] transition-all font-black text-sm uppercase tracking-wider text-center shadow-md active:scale-95"
              >
                Open Manager Dashboard →
              </Link>
              <div className="flex justify-center gap-3 text-xs text-white/80 font-medium">
                <Link href="/admin/tables" className="hover:underline">Tables</Link>
                <span>•</span>
                <Link href="/admin/menu" className="hover:underline">Menu</Link>
                <span>•</span>
                <Link href="/admin/cashier" className="hover:underline">Cashier</Link>
                <span>•</span>
                <Link href="/platform" className="hover:underline">Platform</Link>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Multi-Surface Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Surface 1: Customer Mobile PWA */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#123D32]/10 text-[#123D32] flex items-center justify-center text-2xl shadow-sm">
                  📱
                </div>
                <span className="text-[11px] font-bold text-[#1D765B] bg-[#1D765B]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Customer PWA
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#252B28]">Bilingual Guest Ordering</h3>
              <p className="text-xs text-[#5C6460] mt-1.5 leading-relaxed">
                Mobile-first experience for guests. Scans table QR, switches between English and Amharic, customizes dishes, tracks live progress, and settles bill with 15% VAT included.
              </p>

              <div className="mt-5 space-y-2">
                <Link
                  href="/t/demo_token/menu"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] transition-colors text-xs font-bold text-[#252B28]"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#1D765B]" />
                    <span>Table 04 Menu (`/t/.../menu`)</span>
                  </span>
                  <span className="text-[#123D32] font-bold">Open →</span>
                </Link>

                <Link
                  href="/checkout"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] transition-colors text-xs font-bold text-[#252B28]"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#123D32]" />
                    <span>Tray & Checkout (`/checkout`)</span>
                  </span>
                  <span className="text-[#123D32] font-bold">Open →</span>
                </Link>

                <Link
                  href="/t/demo_token/bill"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] transition-colors text-xs font-bold text-[#252B28]"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#1D765B]" />
                    <span>Table Digital Bill & Receipt (`/t/.../bill`)</span>
                  </span>
                  <span className="text-[#123D32] font-bold">Open →</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs text-[#5C6460]">
              <span>Live Order Tracking</span>
              <Link href="/order/01J8ORD100" className="text-[#123D32] font-bold hover:underline">
                View Timeline →
              </Link>
            </div>
          </div>

          {/* Surface 2: Kitchen Display System (KDS) */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1e1b19] text-[#ffb598] flex items-center justify-center text-2xl shadow-sm">
                  🍳
                </div>
                <span className="text-[11px] font-bold text-[#252B28] bg-[#1e1b19]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Kitchen Tablet / TV
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#252B28]">Kitchen Display System</h3>
              <p className="text-xs text-[#5C6460] mt-1.5 leading-relaxed">
                Multi-station filtering (All, Grill & Tibs, Main Kitchen, Drinks) with live WebSocket bump transitions (Received $\rightarrow$ Cooking $\rightarrow$ Ready) and ticket age alerts.
              </p>

              <div className="mt-5 space-y-2">
                <Link
                  href="/kds"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#1e1b19] text-[#ffb598] hover:bg-[#26211e] transition-colors text-xs font-bold shadow-sm"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D765B] animate-pulse" />
                    <span>Launch Live KDS (`/kds`)</span>
                  </div>
                  <span className="text-white">Full Screen →</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[11px] font-semibold">
                <div className="bg-[#F4F0E8] p-2 rounded-xl text-[#1D765B]">
                  <span className="block font-bold">&lt; 8m</span>
                  <span className="text-[10px] text-[#5C6460]">Normal</span>
                </div>
                <div className="bg-[#F4F0E8] p-2 rounded-xl text-amber-600">
                  <span className="block font-bold">8–15m</span>
                  <span className="text-[10px] text-[#5C6460]">Warning</span>
                </div>
                <div className="bg-[#F4F0E8] p-2 rounded-xl text-red-600">
                  <span className="block font-bold">&gt; 15m</span>
                  <span className="text-[10px] text-[#5C6460]">Urgent</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs text-[#5C6460]">
              <span>Touchscreen Optimized</span>
              <span className="text-[#252B28] font-semibold">1-Tap Station Bump</span>
            </div>
          </div>

          {/* Surface 3: Waiter Runner View */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-2xl shadow-sm">
                  🏃
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Handheld Staff
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#252B28]">Waiter Delivery App</h3>
              <p className="text-xs text-[#5C6460] mt-1.5 leading-relaxed">
                Handheld queue for floor staff with zone assignments (Zone A, Zone B, Pickup Counter), instant customer call notifications, and ready dish dispatch.
              </p>

              <div className="mt-5 space-y-2">
                <Link
                  href="/waiter"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#123D32] hover:bg-[#1D765B] text-white transition-colors text-xs font-bold shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Open Waiter Handheld (`/waiter`)</span>
                  </div>
                  <span>Launch →</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs text-[#5C6460]">
              <span>Table calls & ready dishes</span>
              <span className="text-[#1D765B] font-bold">Instant Delivery ACK</span>
            </div>
          </div>

          {/* Surface 4: Cashier Counter Register */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1D765B]/10 text-[#1D765B] flex items-center justify-center text-2xl shadow-sm">
                  💵
                </div>
                <span className="text-[11px] font-bold text-[#1D765B] bg-[#1D765B]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  POS Register
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#252B28]">Cashier Counter Register</h3>
              <p className="text-xs text-[#5C6460] mt-1.5 leading-relaxed">
                POS station with shift status bar, tender change calculator, quick tender pills, and multi-rail settlement (Cash, Telebirr, CBE Birr, Chapa).
              </p>

              <div className="mt-5 space-y-2">
                <Link
                  href="/admin/cashier"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] text-[#123D32] transition-colors text-xs font-bold"
                >
                  <span>Open Cashier Register (`/admin/cashier`)</span>
                  <span>Launch →</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs text-[#5C6460]">
              <span>Drawer float & shift close</span>
              <span className="text-[#1D765B] font-bold">15% VAT Invoiced</span>
            </div>
          </div>

          {/* Surface 5: Branch Manager Operations */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#123D32]/10 text-[#123D32] flex items-center justify-center text-2xl shadow-sm">
                  ⚙️
                </div>
                <span className="text-[11px] font-bold text-[#123D32] bg-[#123D32]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Branch Ops
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#252B28]">Branch Manager Hub</h3>
              <p className="text-xs text-[#5C6460] mt-1.5 leading-relaxed">
                Visual floor layout by zone, 86 stock availability controls, HMAC-SHA256 signed QR print sheets, and store configuration.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-5">
                <Link
                  href="/admin/tables"
                  className="p-3 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] transition-colors text-xs font-bold text-[#123D32] block"
                >
                  <span>Tables & QRs</span>
                  <span className="text-[10px] text-[#5C6460] font-medium block">Signed HMAC print sheets</span>
                </Link>

                <Link
                  href="/admin/settings"
                  className="p-3 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] transition-colors text-xs font-bold text-[#123D32] block"
                >
                  <span>Settings</span>
                  <span className="text-[10px] text-[#5C6460] font-medium block">Tax & operating modes</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs text-[#5C6460]">
              <span>Branch Administration</span>
              <Link href="/admin" className="text-[#123D32] font-bold hover:underline">
                Open Admin Hub →
              </Link>
            </div>
          </div>

          {/* Surface 6: Platform Admin Multi-Tenant Governance */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2DDD5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#123D32] text-white flex items-center justify-center text-2xl shadow-sm">
                  🏢
                </div>
                <span className="text-[11px] font-bold text-white bg-[#123D32] px-3 py-1 rounded-full uppercase tracking-wider">
                  Platform Admin
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#252B28]">Multi-Tenant Governance</h3>
              <p className="text-xs text-[#5C6460] mt-1.5 leading-relaxed">
                Global platform administration: tenant organization onboarding, multi-branch hierarchies, brand theme palette switcher, and immutable audit logs.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-5">
                <Link
                  href="/platform/tenants"
                  className="p-3 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] transition-colors text-xs font-bold text-[#123D32] block"
                >
                  <span>Tenants</span>
                  <span className="text-[10px] text-[#5C6460] font-medium block">Onboard & branches</span>
                </Link>

                <Link
                  href="/platform/branding"
                  className="p-3 rounded-xl bg-[#F4F0E8] hover:bg-[#EAE4D9] transition-colors text-xs font-bold text-[#123D32] block"
                >
                  <span>Branding</span>
                  <span className="text-[10px] text-[#5C6460] font-medium block">Palettes & i18n</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs text-[#5C6460]">
              <Link href="/platform/audit" className="text-xs font-bold text-[#5C6460] hover:text-[#252B28]">
                📜 Audit Logs
              </Link>
              <Link href="/platform" className="text-[#123D32] font-bold hover:underline">
                Platform Center →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-6 border-t border-[#E2DDD5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C6460]">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#123D32]">MenuFlow</span>
            <span>•</span>
            <span>Tailored for Ethiopian Food & Beverage Industry • Deep Emerald Theme</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Next.js 14 + Chi Go API</span>
            <span>•</span>
            <span>PostgreSQL 16 + Redis 7</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
