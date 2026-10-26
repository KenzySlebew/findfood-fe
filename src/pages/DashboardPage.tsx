import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface DashboardPageProps {
  user: User | null;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
  onLoginDemo?: (role: 'CLIENT' | 'VENDOR') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onOpenAuth, onLoginDemo }) => {
  const navigate = useNavigate();

  // Strict Role Separation: View is strictly governed by user.role
  const isVendor = user?.role === 'VENDOR';
  const activeRoleView: 'CLIENT' | 'VENDOR' = isVendor ? 'VENDOR' : 'CLIENT';

  // Client Tab States
  const [clientTab, setClientTab] = useState<'orders' | 'tenders' | 'invoices'>('orders');
  const [otpCode] = useState('8921');
  const [orderVerified, setOrderVerified] = useState(false);

  // Client Tax Invoice Modal State
  const [activeTaxInvoice, setActiveTaxInvoice] = useState<{
    id: string;
    noFaktur: string;
    clientName: string;
    npwpClient: string;
    vendorName: string;
    npwpVendor: string;
    itemDesc: string;
    pax: number;
    pricePerPax: number;
    dpp: number;
    ppn: number;
    total: number;
    date: string;
  } | null>(null);

  // Vendor Tab States
  const [vendorTab, setVendorTab] = useState<'catalog' | 'inventory' | 'rfq' | 'escrow' | 'incoming_orders'>('incoming_orders');
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

  // Vendor Catalog State & Edit Menu Modal State
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

  const [editingDish, setEditingDish] = useState<{
    id: string;
    name: string;
    category: string;
    price: number;
    stockStatus: string;
  } | null>(null);

  // Vendor Inventory State (Synced with Active Order #SJ-2026-0928-89B)
  const [inventoryList, setInventoryList] = useState([
    { id: 'inv-1', item: 'Beras Pandan Wangi Organik', qty: 120, unit: 'kg', usedForOrder: 30, status: 'Aman' },
    { id: 'inv-2', item: 'Daging Sirloin Beef Australia', qty: 18, unit: 'kg', usedForOrder: 22.5, status: 'Menipis' },
    { id: 'inv-3', item: 'Ayam Fillet Paha Segar', qty: 85, unit: 'kg', usedForOrder: 0, status: 'Aman' },
    { id: 'inv-4', item: 'Buncis Baby Organik & Sayur', qty: 25, unit: 'kg', usedForOrder: 15, status: 'Aman' },
    { id: 'inv-5', item: 'Kemasan Biodegradable Eco-Kraft', qty: 450, unit: 'box', usedForOrder: 150, status: 'Aman' },
  ]);

  // Vendor RFQ Custom Bidding State
  const [customBidPrice, setCustomBidPrice] = useState(42000);
  const [customBidNote, setCustomBidNote] = useState('Termasuk free buah potong & air mineral botol kaca, armada van chiller H-3 jam');
  const [bidSubmitted, setBidSubmitted] = useState(false);

  // Vendor Bank Account State & Modal
  const [bankDetails, setBankDetails] = useState({
    bankName: 'BCA (Bank Central Asia)',
    accountNumber: '892-102-9981',
    accountHolder: 'Kurnia Boga Mandiri (Dapur Utama)',
  });
  const [showBankModal, setShowBankModal] = useState(false);
  const [tempBankDetails, setTempBankDetails] = useState(bankDetails);

  // Vendor Incoming Orders State
  const [kitchenStatus, setKitchenStatus] = useState<'cooking' | 'ready_for_pickup' | 'in_transit'>('cooking');
  const [kitchenStatusNotif, setKitchenStatusNotif] = useState(false);

  // Withdraw Escrow Simulation
  const [escrowBalance, setEscrowBalance] = useState(12800000);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  /* ───────────────────────────────────────────────────────────
   *  PORTAL TERKUNCI (IF USER IS NOT LOGGED IN)
   * ─────────────────────────────────────────────────────────── */
  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 bg-[#f7f9ff] text-[#171c21]">
        <div className="max-w-lg w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#dee3ea] shadow-xl text-center animate-in fade-in zoom-in-95 duration-200">
          
          <div className="w-18 h-18 rounded-3xl bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#82c46c]/40">
            <span className="material-symbols-outlined text-[38px]">lock</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-bold mb-3">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>Akses Terproteksi Saji.AI</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171c21] tracking-tight">
            Portal Saji.AI Terkunci
          </h1>

          <p className="text-xs sm:text-sm text-[#5b5f63] mt-2 leading-relaxed">
            Portal Terpadu untuk <strong>Client PIC Korporat</strong> dan <strong>Mitra Dapur Toko</strong> hanya dapat diakses oleh akun yang telah masuk.
          </p>

          {/* Quick Demo Section (1-Click) */}
          <div className="mt-8 p-5 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] text-left">
            <span className="text-[11px] font-bold text-[#5b5f63] uppercase tracking-wider block mb-3 text-center">
              Pilih Akses Cepat Quick Demo (1-Klik):
            </span>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onLoginDemo ? onLoginDemo('CLIENT') : onOpenAuth('login')}
                className="w-full py-3 px-4 rounded-xl bg-[#82c46c] text-[#125104] text-xs font-bold hover:shadow-md transition-all flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">business</span>
                  <span>Masuk sebagai Client PIC (Demo)</span>
                </div>
                <span className="text-[10px] bg-white/70 px-2 py-0.5 rounded-full font-extrabold">Instant</span>
              </button>

              <button
                type="button"
                onClick={() => onLoginDemo ? onLoginDemo('VENDOR') : onOpenAuth('login')}
                className="w-full py-3 px-4 rounded-xl bg-[#2c3136] text-white text-xs font-bold hover:bg-black transition-all flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#82c46c]">storefront</span>
                  <span>Masuk sebagai Mitra Toko (Demo)</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-extrabold">Instant</span>
              </button>
            </div>
          </div>

          {/* Real Login & Register Links */}
          <div className="mt-6 pt-5 border-t border-[#eaeef5] flex items-center justify-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="text-[#171c21] hover:text-[#2e6b1f] transition-colors"
            >
              Masuk dengan Email
            </button>
            <span className="text-[#dee3ea]">&bull;</span>
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="text-[#2e6b1f] hover:underline transition-colors font-bold"
            >
              Daftar Akun Baru
            </button>
          </div>

        </div>
      </div>
    );
  }

  /* ───────────────────────────────────────────────────────────
   *  VENDOR HANDLERS
   * ─────────────────────────────────────────────────────────── */
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
    }, 900);
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

  const handleSaveEditDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;
    setVendorDishes((prev) =>
      prev.map((d) => (d.id === editingDish.id ? { ...d, ...editingDish } : d))
    );
    setEditingDish(null);
  };

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setBankDetails(tempBankDetails);
    setShowBankModal(false);
  };

  const handleWithdrawEscrow = () => {
    setWithdrawSuccess(true);
    setTimeout(() => {
      setEscrowBalance(0);
    }, 1500);
  };

  const handleUpdateKitchenStatus = () => {
    setKitchenStatus('ready_for_pickup');
    setKitchenStatusNotif(true);
    setTimeout(() => setKitchenStatusNotif(false), 3000);
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
                  ? `Halo, ${user.name}. Kelola pesanan kantor, pelacakan live SajiEscrow™, dan faktur pajak.`
                  : `Halo, ${user.name}. Kelola etalase menu, pesanan masuk dapur, inventaris, dan pencairan saldo.`}
              </p>
            </div>
          </div>

          {/* Right Action & Role Switcher */}
          <div className="flex flex-wrap items-center gap-3">
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

            {/* Role Badge (Strict Role Separation: No Cross Viewing) */}
            <div className="flex items-center gap-2 bg-[#f0f4fb] px-4 py-2.5 rounded-2xl border border-[#dee3ea]">
              <span className="material-symbols-outlined text-[18px] text-[#2e6b1f]">
                {isVendor ? 'storefront' : 'business'}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider">
                  Hak Akses Terverifikasi:
                </span>
                <span className="text-xs font-extrabold text-[#171c21]">
                  {isVendor ? 'Mitra Toko Dapur (Vendor)' : 'Corporate Client PIC'}
                </span>
              </div>
            </div>
          </div>

        </div>
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

          {/* TAB 3: Faktur Pajak & Invoices (Issue 12: Generasi & Unduh Resmi) */}
          {clientTab === 'invoices' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#171c21]">Faktur Pajak Elektronik &amp; Bukti Escrow</h3>
                  <p className="text-xs text-[#5b5f63]">Dokumen perpajakan resmi PPN 11% berstandar DJP dan kuitansi pelunasan penampungan escrow.</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 'INV-2026-0928-89B',
                    noFaktur: '010.002-26.89201928',
                    title: 'Faktur Pajak PPN 11% (150 Box Bento VIP)',
                    clientName: 'PT Telkom Indonesia Tbk',
                    npwpClient: '01.000.013.1-093.000',
                    vendorName: 'PT Saji Boga Berjaya (Mitra Kurnia Boga)',
                    npwpVendor: '01.234.567.8-012.000',
                    itemDesc: 'Pengadaan Katering Rapat Direksi 150 Box Bento VIP',
                    pax: 150,
                    pricePerPax: 46000,
                    dpp: 6900000,
                    ppn: 759000,
                    total: 7659000,
                    date: 'Hari ini (28 Sept 2026)',
                  },
                  {
                    id: 'INV-2026-0814-22A',
                    noFaktur: '010.002-26.77291012',
                    title: 'Faktur Pengadaan Townhall Bulanan 300 Pax',
                    clientName: 'PT Telkom Indonesia Tbk',
                    npwpClient: '01.000.013.1-093.000',
                    vendorName: 'PT Saji Boga Berjaya (Dapur Kemang)',
                    npwpVendor: '01.234.567.8-012.000',
                    itemDesc: 'Paket Buffet Prasmanan Karyawan Townhall',
                    pax: 300,
                    pricePerPax: 45000,
                    dpp: 13500000,
                    ppn: 1350000,
                    total: 14850000,
                    date: '14 Agustus 2026',
                  },
                ].map((inv) => (
                  <div key={inv.id} className="p-5 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#2e6b1f] shadow-xs shrink-0">
                        <span className="material-symbols-outlined text-[24px]">receipt_long</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#171c21]">{inv.id}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold">
                            e-Faktur DJP Valid
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#171c21] mt-0.5">{inv.title}</h4>
                        <span className="text-xs text-[#5b5f63]">Tanggal: {inv.date} &bull; Total: <strong>Rp {inv.total.toLocaleString('id-ID')}</strong></span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTaxInvoice(inv)}
                      className="px-4 py-2.5 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:shadow transition-all flex items-center gap-1.5 shadow-xs w-full sm:w-auto justify-center"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Generate &amp; Unduh Faktur</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  3. VIEW B: VENDOR PORTAL (Mitra Dapur & Toko Katering)
       * ─────────────────────────────────────────────────────────── */}
      {activeRoleView === 'VENDOR' && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 flex flex-col gap-8 animate-in fade-in duration-300">
          
          {/* Vendor Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Rating Dapur', val: '★ 4.95 / 5.0', icon: 'stars', color: 'text-amber-500' },
              { label: 'Pesanan Selesai', val: '340+ Event', icon: 'task_alt', color: 'text-[#2e6b1f]' },
              { label: 'Pendapatan Bulan Ini', val: 'Rp 48.500.000', icon: 'payments', color: 'text-[#2e6b1f]' },
              { label: 'Saldo Escrow Siap Tarik', val: `Rp ${escrowBalance.toLocaleString('id-ID')}`, icon: 'account_balance_wallet', color: 'text-[#2e6b1f]' },
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

          {/* Vendor Tabs (Issue 11: Includes Pesanan Masuk, Etalase, Inventaris, Lelang, Escrow) */}
          <div className="flex items-center gap-3 border-b border-[#dee3ea] pb-2 overflow-x-auto">
            {[
              { id: 'incoming_orders', label: 'Pesanan Masuk (Dapur)', icon: 'soup_kitchen' },
              { id: 'catalog', label: 'Etalase Menu & Edit', icon: 'restaurant_menu' },
              { id: 'inventory', label: 'Inventaris & Auto-Sync', icon: 'inventory_2' },
              { id: 'rfq', label: 'Lelang Tender RFQ', icon: 'gavel' },
              { id: 'escrow', label: 'Pencairan Saldo & Rekening', icon: 'account_balance' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setVendorTab(tab.id as any)}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
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

          {/* TAB 1: Orderan Masuk Dapur (Issue 11 - Bagian 5) */}
          {vendorTab === 'incoming_orders' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eaeef5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold">
                      PESANAN AKTIF BERJALAN
                    </span>
                    <span className="font-mono text-xs text-[#5b5f63]">#SJ-2026-0928-89B</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#171c21] mt-1">
                    150 Box Bento VIP Nusantara Harmoni
                  </h3>
                  <p className="text-xs text-[#5b5f63] mt-0.5">
                    Pemesan: <strong>PT Telkom Indonesia Tbk</strong> &bull; PIC: Sarah Wijaya (+62 811-9288-7254)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#5b5f63] block">Nilai Pesanan SajiEscrow™</span>
                  <span className="text-lg font-extrabold text-[#2e6b1f]">Rp 7.659.000 (Terkunci)</span>
                </div>
              </div>

              {kitchenStatusNotif && (
                <div className="p-3 bg-[#aff496]/40 text-[#125104] text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Status berhasil diperbarui! Kurir Pak Bambang telah dinotifikasi untuk penjemputan.</span>
                </div>
              )}

              {/* Status Stepper */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#82c46c]/15 border border-[#82c46c]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#171c21]">Tahap 1: Pembayaran &amp; PO</span>
                    <span className="material-symbols-outlined text-[18px] text-[#2e6b1f]">check_circle</span>
                  </div>
                  <p className="text-[11px] text-[#5b5f63]">Dana Rp 7.659.000 diamankan di SajiEscrow™</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f0f4fb] border border-[#2e6b1f] ring-2 ring-[#2e6b1f]/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#171c21]">Tahap 2: Dapur Masak &amp; Packing</span>
                    <span className="material-symbols-outlined text-[18px] text-[#2e6b1f]">soup_kitchen</span>
                  </div>
                  <p className="text-[11px] text-[#5b5f63]">150 Box dikemas dalam eco-kraft, suhu dijaga &gt;64°C</p>
                </div>

                <div className={`p-4 rounded-2xl border transition-all ${kitchenStatus === 'ready_for_pickup' ? 'bg-[#82c46c]/15 border-[#82c46c]' : 'bg-white border-[#dee3ea]'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#171c21]">Tahap 3: Serah Terima Kurir</span>
                    <span className="material-symbols-outlined text-[18px] text-[#5b5f63]">
                      {kitchenStatus === 'ready_for_pickup' ? 'check_circle' : 'pending'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5b5f63]">
                    {kitchenStatus === 'ready_for_pickup' ? 'Siap Diambil Van Chiller B 1928 SJI' : 'Menunggu aba-aba dapur'}
                  </p>
                </div>
              </div>

              {/* Action and Address Briefing */}
              <div className="p-5 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block">
                    Alamat Pengantaran Klien:
                  </span>
                  <p className="font-bold text-xs text-[#171c21] mt-0.5">
                    Menara Sahid Sudirman Lt. 24, Jl. Jend. Sudirman Kav. 86, Jakarta Pusat
                  </p>
                  <span className="text-xs text-[#2e6b1f] font-semibold">Drop Kurir: Lobi Utama Resepsionis VIP</span>
                </div>

                {kitchenStatus === 'cooking' ? (
                  <button
                    type="button"
                    onClick={handleUpdateKitchenStatus}
                    className="px-6 py-3 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-[#125104] transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">soup_kitchen</span>
                    <span>Tandai Masakan Siap Diambil Kurir</span>
                  </button>
                ) : (
                  <div className="px-5 py-2.5 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold flex items-center gap-2 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Masakan Siap &bull; Kurir Segera Meluncur</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Menu Showcase & Edit Menu (Issue 11 - Bagian 1) */}
          {vendorTab === 'catalog' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#171c21]">Katalog Etalase Menu Dapur Mitra</h3>
                  <p className="text-xs text-[#5b5f63]">Klik &quot;Edit Menu&quot; untuk memperbarui nama, harga, atau status ketersediaan stok hidangan.</p>
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
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          dish.stockStatus === 'Tersedia'
                            ? 'bg-[#82c46c]/20 text-[#125104]'
                            : dish.stockStatus === 'Habis'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
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
                      <button
                        type="button"
                        onClick={() => setEditingDish({ ...dish })}
                        className="px-3 py-1 bg-white hover:bg-[#dee3ea] border border-[#dee3ea] rounded-full text-[#2e6b1f] font-bold transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        <span>Edit Menu</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Inventory Management & Auto-Sync (Issue 11 - Bagian 2) */}
          {vendorTab === 'inventory' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              
              {/* Auto-Sync Connected Order Banner */}
              <div className="p-4 rounded-2xl bg-[#82c46c]/15 border border-[#82c46c]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px] text-[#2e6b1f]">sync</span>
                  <div>
                    <span className="text-xs font-bold text-[#125104] block">
                      Auto-Sync Inventaris: Terhubung dengan Pesanan Aktif #SJ-2026-0928-89B
                    </span>
                    <p className="text-[11px] text-[#5b5f63]">
                      Stok bahan baku otomatis dipotong dan dialokasikan sesuai resep 150 Box Bento Nusantara Harmoni.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2e6b1f] text-white text-[10px] font-bold shrink-0">
                  Sinkronisasi Otomatis Aktif
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#171c21]">Stok Bahan Baku Dapur Terisolasi</h3>
                  <p className="text-xs text-[#5b5f63]">Perhitungan otomatis bahan makanan per porsi untuk mencegah pesanan bentrok (*overselling*).</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-[#dee3ea] rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f0f4fb] text-[#5b5f63] border-b border-[#dee3ea]">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Nama Bahan Baku</th>
                      <th className="py-3 px-4 font-semibold">Stok Tersedia</th>
                      <th className="py-3 px-4 font-semibold">Terpakai di Pesanan #SJ-2026</th>
                      <th className="py-3 px-4 font-semibold">Status Ketersediaan</th>
                      <th className="py-3 px-4 text-right font-semibold">Aksi Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eaeef5]">
                    {inventoryList.map((inv) => (
                      <tr key={inv.id}>
                        <td className="py-3 px-4 font-bold text-[#171c21]">{inv.item}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#171c21]">{inv.qty} {inv.unit}</td>
                        <td className="py-3 px-4 text-[#2e6b1f] font-semibold">
                          {inv.usedForOrder > 0 ? `-${inv.usedForOrder} ${inv.unit} (150 Box)` : 'Tidak Terpakai'}
                        </td>
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
                                prev.map((i) => (i.id === inv.id ? { ...i, qty: i.qty + 25, status: 'Aman' } : i))
                              );
                            }}
                            className="px-3 py-1 rounded-full bg-white hover:bg-[#dee3ea] border border-[#dee3ea] text-xs font-bold text-[#2e6b1f] transition-colors"
                          >
                            + Tambah 25
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Lelang Tender RFQ Custom Bidding (Issue 11 - Bagian 3) */}
          {vendorTab === 'rfq' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#171c21]">Peluang Tender RFQ &amp; Input Penawaran Custom</h3>
                <p className="text-xs text-[#5b5f63]">Masukkan nominal harga penawaran per porsi dan catatan proposal sesuai kalkulasi dapur Anda.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#dee3ea]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#171c21]">Tender RFQ-2026-089X</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold">
                        Tender Aktif &bull; Sisa 22 Menit
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#171c21] mt-1">
                      150 Box Bento Rapat Direksi PT Mega Capital
                    </h4>
                    <span className="text-xs text-[#5b5f63]">Pagu Anggaran Klien: Rp 45.000 / pax &bull; Lokasi: SCBD Jakarta Selatan (4.2 km)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#5b5f63] block">Estimasi Nilai Tender</span>
                    <span className="text-base font-extrabold text-[#2e6b1f]">Rp {(150 * customBidPrice).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {bidSubmitted ? (
                  <div className="p-4 bg-[#82c46c] text-[#125104] rounded-2xl text-xs font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">task_alt</span>
                      <span>Penawaran Bidding Rp {customBidPrice.toLocaleString('id-ID')} / pax Berhasil Terkirim ke PT Mega Capital!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBidSubmitted(false)}
                      className="text-xs underline font-bold"
                    >
                      Ubah Penawaran
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#171c21] block mb-1">
                        Nominal Harga Penawaran per Porsi (Rp):
                      </label>
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#dee3ea]">
                        <span className="text-xs font-bold text-[#5b5f63]">Rp</span>
                        <input
                          type="number"
                          step={1000}
                          min={25000}
                          max={60000}
                          value={customBidPrice}
                          onChange={(e) => setCustomBidPrice(Number(e.target.value))}
                          className="w-full bg-transparent text-sm font-bold text-[#171c21] outline-none"
                        />
                      </div>
                      <span className="text-[10px] text-[#5b5f63] mt-1 block">Bebas sesuaikan harga penawaran agar kompetitif.</span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#171c21] block mb-1">
                        Catatan &amp; Keunggulan Menu Dapur Anda:
                      </label>
                      <input
                        type="text"
                        value={customBidNote}
                        onChange={(e) => setCustomBidNote(e.target.value)}
                        className="w-full bg-white px-3 py-2 rounded-xl border border-[#dee3ea] text-xs text-[#171c21] outline-none"
                        placeholder="Misal: Termasuk dessert buah, packaging food grade..."
                      />
                    </div>

                    <div className="md:col-span-2 pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setBidSubmitted(true)}
                        className="px-6 py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-all shadow-md flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">gavel</span>
                        <span>Kirim Penawaran Bidding (Rp {customBidPrice.toLocaleString('id-ID')}/pax)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: Pencairan Saldo & Pengaturan Rekening Bank (Issue 11 - Bagian 4) */}
          {vendorTab === 'escrow' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#171c21]">Pencairan Saldo SajiEscrow™ &amp; Rekening Bank Toko</h3>
                <p className="text-xs text-[#5b5f63]">Uang ditransfer langsung ke rekening bank terdaftar setelah OTP serah terima dimasukkan oleh PIC acara.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#82c46c]/15 border border-[#82c46c]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold text-[#5b5f63]">Total Saldo Siap Dicairkan</span>
                  <div className="text-3xl font-extrabold text-[#171c21] mt-1">
                    Rp {escrowBalance.toLocaleString('id-ID')}
                  </div>
                  
                  {/* Rekening Terdaftar dengan Tombol Edit */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#2e6b1f] font-semibold">
                      Rekening Terdaftar: <strong>{bankDetails.bankName} - {bankDetails.accountNumber}</strong> (a.n {bankDetails.accountHolder})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTempBankDetails(bankDetails);
                        setShowBankModal(true);
                      }}
                      className="px-2.5 py-0.5 rounded-full bg-white text-[11px] font-bold text-[#2e6b1f] border border-[#82c46c] hover:bg-[#82c46c]/20 transition-colors shadow-2xs"
                    >
                      Ubah Rekening
                    </button>
                  </div>
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
       *  MODAL 1: Edit Menu Hidangan (Issue 11 - Bagian 1)
       * ─────────────────────────────────────────────────────────── */}
      {editingDish && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#dee3ea] relative">
            <button
              type="button"
              onClick={() => setEditingDish(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-xs text-[#5b5f63] hover:text-black border border-[#dee3ea]"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#2e6b1f] text-[22px]">edit_note</span>
              <h3 className="text-lg font-bold text-[#171c21]">Edit Hidangan Menu</h3>
            </div>
            <p className="text-xs text-[#5b5f63] mb-4">
              Perbarui rincian harga, kategori, dan ketersediaan stok menu untuk pembeli.
            </p>

            <form onSubmit={handleSaveEditDish} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">Nama Hidangan Menu:</label>
                <input
                  type="text"
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  className="w-full bg-[#f0f4fb] p-2.5 rounded-xl text-xs font-semibold text-[#171c21] border border-[#dee3ea] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">Kategori Hidangan:</label>
                <select
                  value={editingDish.category}
                  onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                  className="w-full bg-[#f0f4fb] p-2.5 rounded-xl text-xs font-semibold text-[#171c21] border border-[#dee3ea] outline-none"
                >
                  <option value="bento">Bento Rapat Kantor</option>
                  <option value="nusantara">Nusantara &amp; Prasmanan</option>
                  <option value="healthy">Healthy &amp; Diet Kalori</option>
                  <option value="snack">Snack Box &amp; Coffee Break</option>
                  <option value="live">Live Cooking Stall</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">Harga per Porsi (Rp):</label>
                <input
                  type="number"
                  step={1000}
                  value={editingDish.price}
                  onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                  className="w-full bg-[#f0f4fb] p-2.5 rounded-xl text-xs font-bold text-[#171c21] border border-[#dee3ea] outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">Status Ketersediaan:</label>
                <select
                  value={editingDish.stockStatus}
                  onChange={(e) => setEditingDish({ ...editingDish, stockStatus: e.target.value })}
                  className="w-full bg-[#f0f4fb] p-2.5 rounded-xl text-xs font-semibold text-[#171c21] border border-[#dee3ea] outline-none"
                >
                  <option value="Tersedia">Tersedia (Ready to Cook)</option>
                  <option value="Pre-Order">Pre-Order (H-1 Hari)</option>
                  <option value="Habis">Habis (Out of Stock)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-black transition-all shadow-sm"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={() => setEditingDish(null)}
                  className="px-5 py-3 rounded-full bg-[#f0f4fb] text-xs font-bold text-[#5b5f63]"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  MODAL 2: Kelola Rekening Bank Toko (Issue 11 - Bagian 4)
       * ─────────────────────────────────────────────────────────── */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#dee3ea] relative">
            <button
              type="button"
              onClick={() => setShowBankModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-xs text-[#5b5f63] hover:text-black border border-[#dee3ea]"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#2e6b1f] text-[22px]">account_balance</span>
              <h3 className="text-lg font-bold text-[#171c21]">Kelola Rekening Bank Mitra</h3>
            </div>
            <p className="text-xs text-[#5b5f63] mb-4">
              Isi data rekening bank resmi usaha Anda untuk pencairan dana escrow secara otomatis.
            </p>

            <form onSubmit={handleSaveBankDetails} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">Nama Bank:</label>
                <select
                  value={tempBankDetails.bankName}
                  onChange={(e) => setTempBankDetails({ ...tempBankDetails, bankName: e.target.value })}
                  className="w-full bg-[#f0f4fb] p-2.5 rounded-xl text-xs font-semibold text-[#171c21] border border-[#dee3ea] outline-none"
                >
                  <option value="BCA (Bank Central Asia)">BCA (Bank Central Asia)</option>
                  <option value="Mandiri (Bank Mandiri)">Mandiri (Bank Mandiri)</option>
                  <option value="BRI (Bank Rakyat Indonesia)">BRI (Bank Rakyat Indonesia)</option>
                  <option value="BNI (Bank Negara Indonesia)">BNI (Bank Negara Indonesia)</option>
                  <option value="CIMB Niaga">CIMB Niaga</option>
                  <option value="BSI (Bank Syariah Indonesia)">BSI (Bank Syariah Indonesia)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">Nomor Rekening:</label>
                <input
                  type="text"
                  value={tempBankDetails.accountNumber}
                  onChange={(e) => setTempBankDetails({ ...tempBankDetails, accountNumber: e.target.value })}
                  className="w-full bg-[#f0f4fb] p-2.5 rounded-xl text-xs font-mono font-bold text-[#171c21] border border-[#dee3ea] outline-none"
                  placeholder="Contoh: 892-102-9981"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">Nama Pemilik Rekening (Sesuai Buku Tabungan):</label>
                <input
                  type="text"
                  value={tempBankDetails.accountHolder}
                  onChange={(e) => setTempBankDetails({ ...tempBankDetails, accountHolder: e.target.value })}
                  className="w-full bg-[#f0f4fb] p-2.5 rounded-xl text-xs font-semibold text-[#171c21] border border-[#dee3ea] outline-none"
                  placeholder="Nama PT / Pemilik Usaha"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-black transition-all shadow-sm"
                >
                  Simpan Data Rekening
                </button>
                <button
                  type="button"
                  onClick={() => setShowBankModal(false)}
                  className="px-5 py-3 rounded-full bg-[#f0f4fb] text-xs font-bold text-[#5b5f63]"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  MODAL 3: Faktur Pajak Elektronik & Download (Issue 12)
       * ─────────────────────────────────────────────────────────── */}
      {activeTaxInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#dee3ea] relative my-8">
            <button
              type="button"
              onClick={() => setActiveTaxInvoice(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-xs text-[#5b5f63] hover:text-black border border-[#dee3ea]"
            >
              ✕
            </button>

            {/* Faktur Header */}
            <div className="text-center pb-4 border-b border-[#eaeef5]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>FAKTUR PAJAK ELEKTRONIK (e-Faktur DJP)</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#171c21]">
                Kode &amp; Nomor Seri Faktur: {activeTaxInvoice.noFaktur}
              </h3>
              <p className="text-xs text-[#5b5f63]">ID Transaksi Saji: {activeTaxInvoice.id} &bull; Tanggal: {activeTaxInvoice.date}</p>
            </div>

            {/* Identitas PKP Penjual & Pembeli */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 text-xs">
              <div className="p-4 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea]">
                <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block mb-1">
                  Pengusaha Kena Pajak (Penjual):
                </span>
                <span className="font-bold text-[#171c21] block">{activeTaxInvoice.vendorName}</span>
                <span className="text-[#5b5f63] font-mono mt-0.5 block">NPWP: {activeTaxInvoice.npwpVendor}</span>
                <span className="text-[#5b5f63] block mt-1">Gedung Saji Hub, Jl. Senopati No. 8, Jakarta Selatan</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea]">
                <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block mb-1">
                  Pembeli Barang Kena Pajak:
                </span>
                <span className="font-bold text-[#171c21] block">{activeTaxInvoice.clientName}</span>
                <span className="text-[#5b5f63] font-mono mt-0.5 block">NPWP: {activeTaxInvoice.npwpClient}</span>
                <span className="text-[#5b5f63] block mt-1">Menara Sahid Sudirman Lt. 24, Jakarta Pusat</span>
              </div>
            </div>

            {/* Rincian DPP dan Pajak */}
            <div className="border border-[#dee3ea] rounded-2xl p-4 text-xs space-y-2 mb-5">
              <div className="flex justify-between pb-2 border-b border-[#eaeef5]">
                <span className="font-semibold text-[#171c21]">Rincian Jasa Katering Acara</span>
                <span className="font-bold text-[#171c21]">{activeTaxInvoice.itemDesc}</span>
              </div>
              <div className="flex justify-between text-[#5b5f63]">
                <span>Dasar Pengenaan Pajak (DPP)</span>
                <span className="font-mono font-bold text-[#171c21]">Rp {activeTaxInvoice.dpp.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#5b5f63]">
                <span>Pajak Pertambahan Nilai (PPN 11%)</span>
                <span className="font-mono font-bold text-[#2e6b1f]">Rp {activeTaxInvoice.ppn.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#dee3ea] text-sm">
                <span className="font-bold text-[#171c21]">Total Pembayaran Tagihan</span>
                <span className="font-mono font-extrabold text-[#2e6b1f]">Rp {activeTaxInvoice.total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#eaeef5]">
              <div className="flex items-center gap-2 text-xs text-[#5b5f63]">
                <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">qr_code_2</span>
                <span>Tervalidasi Digital DJP Saji</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-[#f0f4fb] hover:bg-[#dee3ea] text-xs font-bold text-[#171c21] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Cetak</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Faktur Pajak ${activeTaxInvoice.noFaktur} berhasil diunduh sebagai PDF resmi.`);
                    setActiveTaxInvoice(null);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Unduh PDF e-Faktur</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  MODAL 4: AI Catalog Helper (Vendor Assistant)
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
              <div>
                <label className="text-xs font-bold text-[#171c21] block mb-1">
                  Nama Ide Masakan / Menu Baru:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiMenuInput}
                    onChange={(e) => setAiMenuInput(e.target.value)}
                    placeholder="Contoh: Ayam Geprek Sambal Matah Kecombrang"
                    className="flex-1 bg-[#f0f4fb] p-3 rounded-2xl text-xs text-[#171c21] border border-[#dee3ea] outline-none"
                  />
                  <button
                    type="button"
                    disabled={isAiGenerating}
                    onClick={handleRunAiHelper}
                    className="px-5 py-3 rounded-2xl bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-all shrink-0 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">magic_button</span>
                    <span>{isAiGenerating ? 'Memproses...' : 'Generate AI'}</span>
                  </button>
                </div>
              </div>

              {aiMenuResult && (
                <div className="p-4 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#171c21]">{aiMenuResult.name}</h4>
                    <span className="text-xs font-extrabold text-[#2e6b1f]">
                      Saran Harga: Rp {aiMenuResult.suggestedPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f63] leading-relaxed">{aiMenuResult.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-[#5b5f63] pt-2 border-t border-[#dee3ea]">
                    <span>Estimasi HPP: Rp {aiMenuResult.estimatedCost.toLocaleString('id-ID')}</span>
                    <span>Kalori: ~{aiMenuResult.calories} kkal</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveAiMenu}
                    className="w-full mt-2 py-2.5 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-black transition-all shadow-xs"
                  >
                    + Simpan ke Etalase Menu Dapur
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
