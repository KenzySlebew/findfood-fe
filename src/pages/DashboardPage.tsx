import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface DashboardPageProps {
  user: User | null;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onOpenAuth }) => {
  const navigate = useNavigate();

  // Role toggle for demo: Can view as CLIENT or as VENDOR
  const [activeRoleView, setActiveRoleView] = useState<'CLIENT' | 'VENDOR'>(
    user?.role === 'VENDOR' ? 'VENDOR' : 'CLIENT'
  );

  // Client Tab States
  const [clientTab, setClientTab] = useState<'orders' | 'tenders' | 'invoices'>('orders');
  const [otpCode] = useState('8921');
  const [orderVerified, setOrderVerified] = useState(false);

  // Vendor Tab States
  const [vendorTab, setVendorTab] = useState<'catalog' | 'inventory' | 'rfq' | 'escrow'>('catalog');
  const [showAiHelperModal, setShowAiHelperModal] = useState(false);
  const [aiMenuInput, setAiMenuInput] = useState('');
  const [aiMenuResult, setAiMenuResult] = useState<{
    name: string;
    description: string;
    suggestedPrice: number;
    estimatedCost: number;
    calories: number;
  } | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Vendor Catalog State
  const [vendorDishes, setVendorDishes] = useState([
    {
      id: 'v1',
      name: 'Beef Bulgogi Eco-Bento Premium',
      category: 'bento',
      price: 45000,
      stockStatus: 'Tersedia',
      rating: 4.9,
      salesCount: 340,
    },
    {
      id: 'v2',
      name: 'Nasi Kotak Nusantara Heritage',
      category: 'nusantara',
      price: 38000,
      stockStatus: 'Tersedia',
      rating: 4.8,
      salesCount: 520,
    },
    {
      id: 'v3',
      name: 'Prasmanan Liwet Komplit Premium',
      category: 'nusantara',
      price: 65000,
      stockStatus: 'Pre-Order',
      rating: 4.9,
      salesCount: 180,
    },
  ]);

  // Inventory State
  const [inventoryList, setInventoryList] = useState([
    { id: 'inv-1', item: 'Beras Pandan Wangi Organik', qty: 120, unit: 'kg', status: 'Aman' },
    { id: 'inv-2', item: 'Daging Sirloin Beef Australia', qty: 18, unit: 'kg', status: 'Menipis' },
    { id: 'inv-3', item: 'Ayam Fillet Paha Segar', qty: 85, unit: 'kg', status: 'Aman' },
    { id: 'inv-4', item: 'Buncis Baby Organik & Sayur', qty: 25, unit: 'kg', status: 'Aman' },
    { id: 'inv-5', item: 'Kemasan Biodegradable Eco-Kraft', qty: 450, unit: 'box', status: 'Aman' },
  ]);

  // Withdraw Escrow Simulation
  const [escrowBalance, setEscrowBalance] = useState(12800000);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleRunAiHelper = () => {
    if (!aiMenuInput.trim()) return;
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setAiMenuResult({
        name: aiMenuInput,
        description: `Hidangan istimewa ${aiMenuInput} dimasak dengan bumbu rempah pilihan, tekstur empuk meresap, disajikan bersama nasi pulen dan lalapan segar organik. Bebas pengawet sintetis.`,
        suggestedPrice: 42000,
        estimatedCost: 26000,
        calories: 610,
      });
    }, 1000);
  };

  const handleSaveAiMenu = () => {
    if (!aiMenuResult) return;
    setVendorDishes((prev) => [
      {
        id: `v-${Date.now()}`,
        name: aiMenuResult.name,
        category: 'nusantara',
        price: aiMenuResult.suggestedPrice,
        stockStatus: 'Tersedia',
        rating: 5.0,
        salesCount: 0,
      },
      ...prev,
    ]);
    setShowAiHelperModal(false);
    setAiMenuInput('');
    setAiMenuResult(null);
  };

  const handleWithdrawEscrow = () => {
    setWithdrawSuccess(true);
    setTimeout(() => {
      setEscrowBalance(0);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full bg-[#f7f9ff] text-[#171c21] min-h-screen pb-20">
      
      {/* ───────────────────────────────────────────────────────────
       *  1. Dashboard Top Header & Role Switcher Banner
       * ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white border-b border-[#eaeef5] py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center font-bold text-xl shadow-xs border border-[#82c46c]/30">
              <span className="material-symbols-outlined text-[30px]">
                {activeRoleView === 'CLIENT' ? 'domain' : 'soup_kitchen'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171c21] tracking-tight">
                  {activeRoleView === 'CLIENT'
                    ? 'Portal Korporat & Katering Acara'
                    : 'Dashboard Mitra Toko Dapur'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#82c46c] text-[#125104] text-[10px] font-extrabold uppercase">
                  {activeRoleView === 'CLIENT' ? 'Client PIC' : 'Verified Vendor'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5b5f63] mt-1">
                {activeRoleView === 'CLIENT'
                  ? 'Kelola pesanan katering kantor, pelacakan live SajiEscrow™, dan tender RFQ.'
                  : 'Kelola etalase menu, asisten AI katalog, inventaris stok, dan pencairan dana escrow.'}
              </p>
            </div>
          </div>

          {/* Right Action & Role Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Action using navigate */}
            {activeRoleView === 'CLIENT' ? (
              <button
                type="button"
                onClick={() => navigate('/ai-planner')}
                className="px-4 py-2.5 rounded-2xl bg-[#82c46c] text-[#125104] text-xs font-bold hover:opacity-95 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Buat Tender AI</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAiHelperModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-[#82c46c] text-[#125104] text-xs font-bold hover:opacity-95 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>AI Catalog Helper</span>
              </button>
            )}

            {/* Role Switcher Pill (Preview Feature) */}
            <div className="flex items-center gap-2 bg-[#f0f4fb] p-1.5 rounded-2xl border border-[#dee3ea]">
              <span className="text-[10px] font-bold text-[#5b5f63] px-2 uppercase tracking-wider">
                Peran:
              </span>
              <button
                type="button"
                onClick={() => setActiveRoleView('CLIENT')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeRoleView === 'CLIENT'
                    ? 'bg-[#82c46c] text-[#125104] shadow-xs'
                    : 'text-[#41493c] hover:text-[#171c21]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">business</span>
                <span>Client PIC</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveRoleView('VENDOR')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeRoleView === 'VENDOR'
                    ? 'bg-[#2c3136] text-white shadow-xs'
                    : 'text-[#41493c] hover:text-[#171c21]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">storefront</span>
                <span>Mitra Vendor</span>
              </button>
            </div>
          </div>

        </div>

        {/* Demo Mode Notice Banner if user not logged in */}
        {!user && (
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-4 w-full">
            <div className="bg-[#aff496]/30 border border-[#82c46c]/60 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#125104]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#2e6b1f]">info</span>
                <span>Anda sedang mengakses <strong>Mode Pratinjau Interaktif</strong>. Masuk atau Daftar untuk menyimpan riwayat pesanan ke database.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1 rounded-full bg-white text-[#125104] text-xs font-bold shadow-xs hover:bg-[#f0f4fb] transition-all"
                >
                  Masuk Akun
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('register')}
                  className="px-3 py-1 rounded-full bg-[#2e6b1f] text-white text-xs font-bold shadow-xs hover:bg-black transition-all"
                >
                  Daftar Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  2. VIEW A: CLIENT PORTAL (PIC Kantor & Acara)
       * ─────────────────────────────────────────────────────────── */}
      {activeRoleView === 'CLIENT' && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 flex flex-col gap-8 animate-in fade-in duration-300">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Pesanan Aktif', val: '1 Acara', icon: 'lunch_dining', color: 'text-[#2e6b1f]' },
              { label: 'Dana SajiEscrow™', val: 'Rp 7.659.000', icon: 'shield_lock', color: 'text-[#2e6b1f]' },
              { label: 'Poin Reward Saji', val: '850 Pts', icon: 'stars', color: 'text-amber-600' },
              { label: 'Ketepatan SLA', val: '100% On-Time', icon: 'schedule', color: 'text-[#2e6b1f]' },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-2xl p-5 shadow-xs border border-[#dee3ea] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f0f4fb] flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined text-[24px] ${m.color}`}>{m.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#171c21]">{m.val}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Client Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-[#dee3ea] pb-2">
            {[
              { id: 'orders', label: 'Pesanan Aktif & Escrow Tracker', icon: 'local_shipping' },
              { id: 'tenders', label: 'Riwayat Tender RFQ Kilat', icon: 'podcasts' },
              { id: 'invoices', label: 'Faktur Pajak & Tagihan', icon: 'receipt_long' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setClientTab(tab.id as any)}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                  clientTab === tab.id
                    ? 'border-[#2e6b1f] text-[#2e6b1f]'
                    : 'border-transparent text-[#5b5f63] hover:text-[#171c21]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: Live Orders & SajiEscrow™ Status */}
          {clientTab === 'orders' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea]">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#eaeef5]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold">
                        SEDANG BERLANGSUNG
                      </span>
                      <span className="text-xs text-[#5b5f63] font-mono">ID: #SJ-2026-0928-89B</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#171c21] mt-1">
                      150 Box Bento VIP Nusantara Harmoni
                    </h3>
                    <p className="text-xs text-[#5b5f63] mt-0.5">
                      Vendor: <strong>Kurnia Boga Mandiri</strong> &bull; Lokasi: Menara Sahid Sudirman Lt. 24
                    </p>
                  </div>

                  <Link
                    to="/tracking"
                    className="px-5 py-2.5 rounded-full bg-[#2c3136] text-white text-xs font-bold hover:bg-black transition-all flex items-center gap-2 w-fit shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#82c46c]">share_location</span>
                    <span>Buka Live GPS Tracker</span>
                  </Link>
                </div>

                {/* Progress Steps */}
                <div className="my-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { step: '01', title: 'Pembayaran Escrow', status: 'Selesai (Rp 7.659.000)', done: true },
                      { step: '02', title: 'Dapur Masak H-4', status: 'Higienis Terverifikasi', done: true },
                      { step: '03', title: 'Kurir Berpendingin', status: 'Sedang di Perjalanan (ETA 18m)', done: true },
                      { step: '04', title: 'Verifikasi PIC (OTP)', status: orderVerified ? 'Terverifikasi!' : 'Menunggu Kedatangan', done: orderVerified, active: !orderVerified },
                    ].map((st) => (
                      <div
                        key={st.step}
                        className={`p-4 rounded-2xl border transition-all ${
                          st.done
                            ? 'bg-[#82c46c]/15 border-[#82c46c]'
                            : st.active
                            ? 'bg-[#f0f4fb] border-[#2e6b1f] ring-2 ring-[#2e6b1f]/20'
                            : 'bg-white border-[#dee3ea] opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-[#5b5f63]">Langkah {st.step}</span>
                          <span className="material-symbols-outlined text-[18px] text-[#2e6b1f]">
                            {st.done ? 'check_circle' : 'pending'}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#171c21]">{st.title}</h4>
                        <span className="text-[11px] text-[#5b5f63] block mt-1">{st.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courier details & OTP Handover Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f0f4fb] p-6 rounded-2xl border border-[#dee3ea]">
                  
                  {/* Courier details */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#2e6b1f] shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[28px]">sports_motorsports</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block">
                        Kurir Armada Khusus Termal
                      </span>
                      <h4 className="text-sm font-bold text-[#171c21]">Bambang Irawan (Kurnia Express)</h4>
                      <div className="flex items-center gap-3 text-xs text-[#5b5f63] mt-1">
                        <span>Van Chiller: B 1928 SJI</span>
                        <span className="text-[#2e6b1f] font-semibold">&bull; Suhu Termal 64&deg;C</span>
                      </div>
                    </div>
                  </div>

                  {/* OTP Handover Verification Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#dee3ea]">
                    <div>
                      <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block">
                        Kode OTP Serah Terima PIC:
                      </span>
                      <span className="text-xl font-mono font-extrabold text-[#2e6b1f] tracking-widest">
                        {otpCode}
                      </span>
                    </div>

                    {orderVerified ? (
                      <span className="px-4 py-2 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold flex items-center gap-1.5 shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">done_all</span>
                        <span>Dana Escrow Dicairkan</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOrderVerified(true)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-[#125104] transition-all shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">task_alt</span>
                        <span>Verifikasi Makanan Diterima</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 2: Riwayat Tender RFQ */}
          {clientTab === 'tenders' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#171c21]">Permintaan Tender Terbuka (RFQ)</h3>
                  <p className="text-xs text-[#5b5f63]">Daftar tender katering yang pernah Anda siarkan lewat AI Planner.</p>
                </div>
                <Link
                  to="/ai-planner"
                  className="px-5 py-2.5 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Buat Tender RFQ Baru</span>
                </Link>
              </div>

              <div className="border border-[#dee3ea] rounded-2xl overflow-hidden divide-y divide-[#eaeef5]">
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#f0f4fb]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#171c21]">RFQ-2026-089X</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold">
                        3 Vendor Menawar
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#171c21] mt-1">
                      150 Pax &bull; Rapat Direksi &amp; Eksekutif (Pagu: Rp 45.000 / pax)
                    </h4>
                    <span className="text-xs text-[#5b5f63]">Tanggal Acara: Besok, 11:30 WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/ai-planner"
                      className="px-4 py-2 rounded-full bg-[#2c3136] text-white text-xs font-bold hover:bg-black transition-all"
                    >
                      Buka Ruang Tender
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Faktur Pajak & Invoices */}
          {clientTab === 'invoices' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#171c21]">Faktur Pajak &amp; Proforma Invoice</h3>
                  <p className="text-xs text-[#5b5f63]">Unduh dokumen kepatuhan pajak PPN 11% dan bukti transaksi escrow resmi.</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'INV-2026-0928-89B', title: 'Faktur Pajak PPN 11% (150 Box Bento VIP)', total: 'Rp 7.659.000', date: 'Hari ini' },
                  { id: 'INV-2026-0814-22A', title: 'Faktur Pengadaan Townhall Bulanan 300 Pax', total: 'Rp 14.850.000', date: '14 Agustus 2026' },
                ].map((inv) => (
                  <div key={inv.id} className="p-4 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2e6b1f] shadow-xs">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#5b5f63]">{inv.id}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#171c21]">{inv.title}</h4>
                        <span className="text-[11px] text-[#5b5f63]">{inv.date} &bull; Nilai: {inv.total}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Mengunduh dokumen resmi PDF untuk ${inv.id}...`)}
                      className="px-4 py-2 rounded-full bg-white text-[#171c21] text-xs font-bold hover:bg-[#dee3ea] border border-[#dee3ea] flex items-center gap-1.5 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Unduh PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  3. VIEW B: VENDOR PORTAL (Mitra Dapur Kurnia Boga Mandiri)
       * ─────────────────────────────────────────────────────────── */}
      {activeRoleView === 'VENDOR' && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 flex flex-col gap-8 animate-in fade-in duration-300">
          
          {/* Vendor Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Rating Dapur', val: '★ 4.95 / 5.0', icon: 'stars', color: 'text-amber-500' },
              { label: 'Pesanan Selesai', val: '340+ Event', icon: 'task_alt', color: 'text-[#2e6b1f]' },
              { label: 'Pendapatan Bulan Ini', val: 'Rp 48.500.000', icon: 'payments', color: 'text-[#2e6b1f]' },
              { label: 'Saldo Escrow Cair', val: `Rp ${escrowBalance.toLocaleString('id-ID')}`, icon: 'account_balance_wallet', color: 'text-[#2e6b1f]' },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-2xl p-5 shadow-xs border border-[#dee3ea] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f0f4fb] flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined text-[24px] ${m.color}`}>{m.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#171c21]">{m.val}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Vendor Tabs */}
          <div className="flex items-center gap-3 border-b border-[#dee3ea] pb-2">
            {[
              { id: 'catalog', label: 'Etalase Menu & AI Catalog Helper', icon: 'restaurant_menu' },
              { id: 'inventory', label: 'Manajemen Stok Bahan Baku', icon: 'inventory_2' },
              { id: 'rfq', label: 'Lelang Tender RFQ Masuk', icon: 'gavel' },
              { id: 'escrow', label: 'Pencairan Saldo Escrow', icon: 'account_balance' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setVendorTab(tab.id as any)}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                  vendorTab === tab.id
                    ? 'border-[#2e6b1f] text-[#2e6b1f]'
                    : 'border-transparent text-[#5b5f63] hover:text-[#171c21]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: Menu Showcase & AI Catalog Helper */}
          {vendorTab === 'catalog' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#171c21]">Katalog Menu Dapur Mitra</h3>
                  <p className="text-xs text-[#5b5f63]">Kelola hidangan yang tampil di katalog pencarian pembeli se-Jabodetabek.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAiHelperModal(true)}
                  className="px-5 py-2.5 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-all flex items-center gap-2 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  <span>+ Tambah Menu via AI Catalog Helper</span>
                </button>
              </div>

              {/* Menu List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vendorDishes.map((dish) => (
                  <div key={dish.id} className="p-5 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104]">
                          {dish.stockStatus}
                        </span>
                        <span className="text-xs font-bold text-amber-600">★ {dish.rating}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#171c21]">{dish.name}</h4>
                      <span className="text-base font-extrabold text-[#2e6b1f] block mt-2">
                        Rp {dish.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#5b5f63] pt-3 border-t border-[#dee3ea]">
                      <span>{dish.salesCount} Porsi Terjual</span>
                      <button className="text-[#2e6b1f] font-bold hover:underline">Edit Menu</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Inventory Management */}
          {vendorTab === 'inventory' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#171c21]">Inventaris Bahan Baku Terisolasi Dapur</h3>
                  <p className="text-xs text-[#5b5f63]">Perhitungan otomatis kebutuhan bahan porsi katering agar tidak terjadi overselling.</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Fitur penambahan stok baru dibuka.')}
                  className="px-4 py-2 rounded-full bg-[#2c3136] text-white text-xs font-bold hover:bg-black transition-all"
                >
                  + Tambah Stok Bahan
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#eaeef5] text-[#5b5f63]">
                      <th className="py-3 px-4 font-semibold">Nama Bahan Baku</th>
                      <th className="py-3 px-4 font-semibold">Stok Saat Ini</th>
                      <th className="py-3 px-4 font-semibold">Status Ketersediaan</th>
                      <th className="py-3 px-4 text-right font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eaeef5]">
                    {inventoryList.map((inv) => (
                      <tr key={inv.id}>
                        <td className="py-3 px-4 font-bold text-[#171c21]">{inv.item}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#171c21]">{inv.qty} {inv.unit}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              inv.status === 'Aman'
                                ? 'bg-[#82c46c]/20 text-[#125104]'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setInventoryList((prev) =>
                                prev.map((i) => (i.id === inv.id ? { ...i, qty: i.qty + 20 } : i))
                              );
                            }}
                            className="text-xs font-bold text-[#2e6b1f] hover:underline"
                          >
                            + Restock 20
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Tender RFQ Masuk */}
          {vendorTab === 'rfq' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#171c21]">Peluang Tender RFQ yang Cocok untuk Dapur Anda</h3>
                <p className="text-xs text-[#5b5f63]">Kirimkan penawaran terbaik dan raih pesanan korporat bernilai tinggi.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#171c21]">RFQ-2026-089X</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold">
                      Tender Aktif &bull; Sisa 22 Menit
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171c21] mt-1">
                    150 Box Bento Rapat Direksi PT Mega Capital
                  </h4>
                  <span className="text-xs text-[#5b5f63]">Pagu Klien: Rp 45.000 / pax &bull; Lokasi: SCBD Jakarta Selatan (4.2 km)</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Penawaran Bidding Rp 42.000/pax Anda telah terkirim ke klien!')}
                  className="px-5 py-2.5 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-all shadow-xs"
                >
                  Ajukan Bidding Rp 42.000/pax
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Pencairan Saldo Escrow */}
          {vendorTab === 'escrow' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#171c21]">Pencairan Saldo SajiEscrow™ Toko</h3>
                <p className="text-xs text-[#5b5f63]">Dana yang telah diverifikasi oleh PIC acara langsung dapat ditransfer ke rekening bank resmi vendor tanpa potongan biaya transfer.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#82c46c]/15 border border-[#82c46c]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold text-[#5b5f63]">Total Saldo Siap Dicairkan</span>
                  <div className="text-3xl font-extrabold text-[#171c21] mt-1">
                    Rp {escrowBalance.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-[#2e6b1f] font-semibold mt-1 block">
                    Rekening Terdaftar: BCA 892-102-9981 (a.n Kurnia Boga Mandiri)
                  </span>
                </div>

                {withdrawSuccess ? (
                  <div className="px-5 py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span>Pencairan Berhasil Diproses Real-time!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={escrowBalance === 0}
                    onClick={handleWithdrawEscrow}
                    className="px-6 py-3.5 rounded-full bg-[#2e6b1f] text-white text-xs sm:text-sm font-bold hover:bg-[#125104] transition-all shadow-md active:scale-95 disabled:opacity-40"
                  >
                    Tarik Saldo ke Rekening Bank
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  MODAL: AI Catalog Helper (Vendor Assistant)
       * ─────────────────────────────────────────────────────────── */}
      {showAiHelperModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#dee3ea] relative">
            <button
              type="button"
              onClick={() => setShowAiHelperModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-xs text-[#5b5f63] hover:text-black border border-[#dee3ea]"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#2e6b1f] text-[22px]">auto_awesome</span>
              <h3 className="text-lg font-bold text-[#171c21]">AI Catalog Helper</h3>
            </div>
            <p className="text-xs text-[#5b5f63] mb-4">
              Ketik nama hidangan masakan Anda, AI akan merumuskan deskripsi menarik, kalori, serta saran harga pasar yang kompetitif.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                value={aiMenuInput}
                onChange={(e) => setAiMenuInput(e.target.value)}
                placeholder="Contoh: Ayam Bakar Madu Daun Jeruk Solo..."
                className="w-full p-3 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] text-xs sm:text-sm outline-none"
              />

              <button
                type="button"
                onClick={handleRunAiHelper}
                disabled={isAiGenerating || !aiMenuInput.trim()}
                className="w-full py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isAiGenerating ? 'refresh' : 'bolt'}
                </span>
                <span>{isAiGenerating ? 'Membuat Deskripsi & Analisis...' : 'Generate Katalog dengan AI'}</span>
              </button>

              {aiMenuResult && (
                <div className="p-4 rounded-2xl bg-[#f0f4fb] border border-[#82c46c] space-y-3 animate-in fade-in">
                  <div>
                    <h4 className="text-sm font-bold text-[#171c21]">{aiMenuResult.name}</h4>
                    <p className="text-xs text-[#5b5f63] mt-1 leading-relaxed">{aiMenuResult.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-[#dee3ea]">
                    <div className="bg-white p-2 rounded-xl border border-[#dee3ea]">
                      <span className="text-[10px] text-[#5b5f63] block">Estimasi HPP</span>
                      <span className="font-bold text-[#171c21]">Rp {aiMenuResult.estimatedCost.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-[#dee3ea]">
                      <span className="text-[10px] text-[#5b5f63] block">Saran Harga</span>
                      <span className="font-extrabold text-[#2e6b1f]">Rp {aiMenuResult.suggestedPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-[#dee3ea]">
                      <span className="text-[10px] text-[#5b5f63] block">Kalori</span>
                      <span className="font-bold text-[#171c21]">{aiMenuResult.calories} Kcal</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveAiMenu}
                    className="w-full py-2.5 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-[#125104] transition-all shadow-xs"
                  >
                    + Simpan &amp; Pasang di Etalase Toko
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;
