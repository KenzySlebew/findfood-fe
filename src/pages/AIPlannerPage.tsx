import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface AIPlannerPageProps {
  user?: User | null;
  onSelectPlan?: (plan: string, price: number) => void;
}

export const AIPlannerPage: React.FC<AIPlannerPageProps> = ({ user, onSelectPlan }) => {
  const navigate = useNavigate();
  const isVendor = user?.role === 'VENDOR';

  // Vendor-Specific AI Studio States
  const [vendorStudioTab, setVendorStudioTab] = useState<'food_cost' | 'rfq_review' | 'pic_chat'>('food_cost');
  const [vendorBatchPax, setVendorBatchPax] = useState<number>(150);
  const [vendorSellingPrice, setVendorSellingPrice] = useState<number>(45000);
  const [customBidPrice, setCustomBidPrice] = useState<number>(42000);
  const [bidMenuTitle, setBidMenuTitle] = useState('Executive Beef Bulgogi Eco-Bento + Buah Segar');
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [aiRecipeLoading, setAiRecipeLoading] = useState(false);
  const [aiRecipeAdvice, setAiRecipeAdvice] = useState<string | null>(null);

  // Vendor chat with PIC
  const [vendorPicChat, setVendorPicChat] = useState<Array<{ sender: 'vendor' | 'client'; text: string; time: string }>>([
    { sender: 'client', text: 'Halo Chef! Mohon pastikan makanan tiba di Menara Sahid Sudirman pukul 11:00 WIB ya, karena acara mulai 11:30.', time: '10:15' },
    { sender: 'vendor', text: 'Siap Bu Sarah! Armada berpendingin kami berangkat pukul 10:20 dengan box thermo-shield sehingga tetap hangat.', time: '10:18' },
  ]);
  const [vendorChatInput, setVendorChatInput] = useState('');

  // 1. Console Input States (Client View)
  const [eventType, setEventType] = useState('meeting');
  const [pax, setPax] = useState(150);
  const [budgetPerPax, setBudgetPerPax] = useState(45000);
  const [halalCertified, setHalalCertified] = useState(true);
  const [noSeafood, setNoSeafood] = useState(false);
  const [vegetarianOption, setVegetarianOption] = useState(true);
  const [includeFruitsAndDrinks, setIncludeFruitsAndDrinks] = useState(true);

  // 2. AI Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOptimized, setAiOptimized] = useState(true);
  const [isRfqBroadcasted, setIsRfqBroadcasted] = useState(false);

  // 3. Modals State
  const [activeChatVendor, setActiveChatVendor] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'vendor'; text: string; time: string }>>([
    {
      sender: 'vendor',
      text: 'Halo! Kami dari tim dapur siap melayani 150 porsi rapat Anda. Apakah ada catatan alergi atau preferensi saus khusus?',
      time: '11:02',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Calculations
  const totalBudget = pax * budgetPerPax;

  const eventTypes = [
    { id: 'meeting', label: 'Rapat Direksi / VIP', icon: 'meeting_room' },
    { id: 'townhall', label: 'Townhall 200+ Pax', icon: 'groups' },
    { id: 'seminar', label: 'Workshop & Seminar', icon: 'school' },
    { id: 'gathering', label: 'Gathering Outdoor', icon: 'celebration' },
  ];

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiOptimized(true);
    }, 1200);
  };

  const handleBroadcastRfq = () => {
    setIsRfqBroadcasted(true);
  };

  const handleSelectVendor = (vendorName: string, pricePerPax: number) => {
    if (onSelectPlan) {
      onSelectPlan(`Tender ${vendorName} (${pax} Pax)`, pricePerPax * pax);
    }
    navigate('/pricing');
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user' as const, text: chatInput, time: '11:05' };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const vendorReply = {
        sender: 'vendor' as const,
        text: 'Baik, permintaan Anda kami catat! Kami pastikan kemasan kedap udara dan tiba hangat di lokasi H-30 menit.',
        time: '11:06',
      };
      setChatMessages((prev) => [...prev, vendorReply]);
    }, 1000);
  };

  /* ───────────────────────────────────────────────────────────
   *  VIEW A: MITRA TOKO (VENDOR) DEDICATED AI STUDIO
   *  (Strict Role Separation: Mitra Toko Kitchen & Food Cost AI)
   * ─────────────────────────────────────────────────────────── */
  if (isVendor) {
    const rawCostPerPax = 28200;
    const totalBatchHpp = rawCostPerPax * vendorBatchPax;
    const totalBatchRevenue = vendorSellingPrice * vendorBatchPax;
    const grossProfitPerPax = vendorSellingPrice - rawCostPerPax;
    const totalBatchProfit = grossProfitPerPax * vendorBatchPax;
    const marginPercent = ((grossProfitPerPax / vendorSellingPrice) * 100).toFixed(1);
    const foodCostPercent = ((rawCostPerPax / vendorSellingPrice) * 100).toFixed(1);

    const handleRunAiRecipeAnalysis = () => {
      setAiRecipeLoading(true);
      setAiRecipeAdvice(null);
      setTimeout(() => {
        setAiRecipeLoading(false);
        setAiRecipeAdvice(
          'Hasil Rekomendasi Algoritma Saji.AI: Rasio Food Cost 62.7% tergolong prima untuk standar tender B2B korporat. Rekomendasi optimasi: Menggunakan substitusi potongan daging lokal bersertifikat Halal MUI dengan racikan saus wijen dapur berpotensi menghemat Rp 1.200/porsi tanpa mengurangi rating rasa 4.9★.'
        );
      }, 900);
    };

    const handleSendVendorChat = () => {
      if (!vendorChatInput.trim()) return;
      const newMsg = { sender: 'vendor' as const, text: vendorChatInput, time: '10:22' };
      setVendorPicChat((prev) => [...prev, newMsg]);
      setVendorChatInput('');

      setTimeout(() => {
        setVendorPicChat((prev) => [
          ...prev,
          {
            sender: 'client' as const,
            text: 'Terima kasih informasinya Chef! Kami sudah siapkan troli dan staf di Loading Dock Barat agar serah terima cepat.',
            time: '10:23',
          },
        ]);
      }, 1000);
    };

    return (
      <div className="flex flex-col w-full bg-[#f7f9ff] text-[#171c21] min-h-screen pb-20">
        {/* Top Header & Breadcrumb */}
        <section className="w-full bg-white shadow-xs py-4 px-6 lg:px-12 border-b border-[#eaeef5]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold shadow-xs">
                AI
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#171c21]">Studio Dapur &amp; Food Cost Optimizer</span>
                <span className="text-xs text-[#5b5f63]">
                  Tender Masuk: <span className="font-mono text-[#171c21] font-semibold">RFQ-2026-089X (PT Telkom)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#82c46c]/20 px-3.5 py-1.5 rounded-full border border-[#82c46c]/40">
                <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">storefront</span>
                <span className="text-[10px] font-extrabold text-[#125104] uppercase tracking-wider">
                  Hak Akses: Mitra Toko (Vendor Dapur Terverifikasi)
                </span>
              </div>
              <Link
                to="/dashboard"
                className="px-3.5 py-1.5 rounded-full bg-[#f0f4fb] hover:bg-[#eaeef5] text-xs font-bold text-[#171c21] border border-[#dee3ea] transition-colors"
              >
                Portal Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="w-full pt-8 pb-8 px-6 lg:px-12 bg-gradient-to-b from-white to-[#f7f9ff] border-b border-[#eaeef5]/60">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-bold mb-3 border border-[#82c46c]/30">
                <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">auto_awesome</span>
                <span>Saji.AI Kitchen Optimizer Engine 3.2</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171c21] tracking-tight">
                Studio AI Dapur &amp;{' '}
                <span className="text-[#2e6b1f]">Kalkulator Margin HPP</span>
              </h1>
              <p className="text-sm text-[#5b5f63] mt-2 leading-relaxed">
                Halo, <strong>{user?.namaToko || user?.name || 'Chef Mitra Toko'}</strong>. Bedah resep hidangan, kalkulasi HPP otomatis per porsi, amankan margin laba di atas 35%, dan ajukan penawaran tender katering B2B secara langsung.
              </p>
            </div>

            {/* Quick KPI Overview */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-[#dee3ea] shadow-xs text-center min-w-[120px]">
                <span className="text-[10px] font-bold text-[#5b5f63] uppercase block">HPP per Porsi</span>
                <span className="text-base font-extrabold text-[#171c21]">Rp {rawCostPerPax.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#dee3ea] shadow-xs text-center min-w-[120px]">
                <span className="text-[10px] font-bold text-[#5b5f63] uppercase block">Gross Margin</span>
                <span className="text-base font-extrabold text-[#2e6b1f]">{marginPercent}%</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#dee3ea] shadow-xs text-center min-w-[140px]">
                <span className="text-[10px] font-bold text-[#5b5f63] uppercase block">Proyeksi Laba Batch</span>
                <span className="text-base font-extrabold text-[#125104]">Rp {totalBatchProfit.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation for Vendor */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-6">
          <div className="flex border-b border-[#dee3ea] gap-2 overflow-x-auto">
            {[
              { id: 'food_cost', label: '1. Kalkulator HPP & Resep AI', icon: 'calculate' },
              { id: 'rfq_review', label: '2. Tender B2B Masuk (RFQ-2026-089X)', icon: 'gavel' },
              { id: 'pic_chat', label: '3. Chat Langsung PIC Acara', icon: 'forum' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setVendorStudioTab(tab.id as any)}
                className={`py-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  vendorStudioTab === tab.id
                    ? 'border-[#2e6b1f] text-[#2e6b1f] bg-white rounded-t-2xl shadow-xs'
                    : 'border-transparent text-[#5b5f63] hover:text-[#171c21]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8">
          {vendorStudioTab === 'food_cost' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Cost Parameters & Ingredients */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Batch Pax & Price Controls */}
                <div className="bg-white p-6 rounded-3xl border border-[#dee3ea] shadow-xs">
                  <h3 className="text-base font-bold text-[#171c21] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[20px]">tune</span>
                    <span>Parameter Produksi &amp; Skala Batch Dapur</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#171c21] block mb-1.5">
                        Target Jumlah Porsi (Pax):
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={vendorBatchPax}
                          min={10}
                          max={2000}
                          step={10}
                          onChange={(e) => setVendorBatchPax(Math.max(10, Number(e.target.value) || 10))}
                          className="w-32 bg-[#f0f4fb] px-3.5 py-2 rounded-xl text-sm font-bold text-[#171c21] border border-[#dee3ea] outline-none font-mono"
                        />
                        <span className="text-xs text-[#5b5f63] font-semibold">Porsi</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {[50, 100, 150, 250, 500].map((quickPax) => (
                          <button
                            key={quickPax}
                            type="button"
                            onClick={() => setVendorBatchPax(quickPax)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                              vendorBatchPax === quickPax
                                ? 'bg-[#82c46c] text-[#125104]'
                                : 'bg-[#f0f4fb] text-[#5b5f63] hover:bg-[#eaeef5]'
                            }`}
                          >
                            {quickPax} Pax {quickPax === 150 ? '★ Tender' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#171c21] block mb-1.5">
                        Target Harga Jual ke Klien:
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#5b5f63]">Rp</span>
                        <input
                          type="number"
                          value={vendorSellingPrice}
                          min={20000}
                          max={250000}
                          step={1000}
                          onChange={(e) => setVendorSellingPrice(Math.max(20000, Number(e.target.value) || 20000))}
                          className="w-40 bg-[#f0f4fb] px-3.5 py-2 rounded-xl text-sm font-bold text-[#171c21] border border-[#dee3ea] outline-none font-mono"
                        />
                        <span className="text-xs text-[#5b5f63] font-semibold">/ porsi</span>
                      </div>
                      <p className="text-[11px] text-[#5b5f63] mt-2">
                        Pagu maksimal tender RFQ-2026-089X adalah <strong>Rp 45.000 / pax</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recipe & Cost Table */}
                <div className="bg-white p-6 rounded-3xl border border-[#dee3ea] shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#171c21]">Komposisi Resep &amp; Rincian HPP</h3>
                      <p className="text-xs text-[#5b5f63]">Dihitung secara otomatis berdasarkan batch {vendorBatchPax} porsi</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-extrabold font-mono">
                      Total HPP: Rp {rawCostPerPax.toLocaleString('id-ID')} / pax
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#eaeef5] text-[#5b5f63] font-bold uppercase text-[10px]">
                          <th className="py-2.5">Bahan / Komponen</th>
                          <th className="py-2.5">Takaran ({vendorBatchPax} Pax)</th>
                          <th className="py-2.5">Biaya / Porsi</th>
                          <th className="py-2.5 text-right">Subtotal Batch</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#eaeef5]">
                        {[
                          { item: 'Daging Sapi Sirloin Aus (Halal)', qty: `${(vendorBatchPax * 0.15).toFixed(1)} kg`, perPax: 18000 },
                          { item: 'Beras Organik Pandan Wangi', qty: `${(vendorBatchPax * 0.2).toFixed(1)} kg`, perPax: 3000 },
                          { item: 'Sayur Buncis & Baby Corn', qty: `${(vendorBatchPax * 0.1).toFixed(1)} kg`, perPax: 1500 },
                          { item: 'Bumbu Bulgogi & Saus Gurih', qty: 'Racikan Dapur', perPax: 1200 },
                          { item: 'Kemasan Eco-Kraft Food Grade Sekat 5', qty: `${vendorBatchPax} pcs`, perPax: 2000 },
                          { item: 'Alokasi Biaya Masak & Gas Dapur', qty: 'Dapur Utama', perPax: 2500 },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#f7f9ff]">
                            <td className="py-3 font-semibold text-[#171c21]">{row.item}</td>
                            <td className="py-3 text-[#5b5f63] font-mono">{row.qty}</td>
                            <td className="py-3 font-mono text-[#171c21]">Rp {row.perPax.toLocaleString('id-ID')}</td>
                            <td className="py-3 text-right font-mono font-bold text-[#171c21]">
                              Rp {(row.perPax * vendorBatchPax).toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-[#dee3ea] font-bold text-sm text-[#171c21]">
                          <td colSpan={2} className="py-3">Total Biaya Pokok Produksi (HPP)</td>
                          <td className="py-3 font-mono text-[#2e6b1f]">Rp {rawCostPerPax.toLocaleString('id-ID')}</td>
                          <td className="py-3 text-right font-mono text-[#2e6b1f]">
                            Rp {totalBatchHpp.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Assistant & Profit Simulation */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Profit Simulation Card */}
                <div className="bg-gradient-to-br from-[#2c3136] to-[#171c21] text-white p-6 rounded-3xl shadow-lg border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#82c46c] uppercase tracking-wider">
                      Simulasi Laba Bersih
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#82c46c] text-[#125104] text-[10px] font-extrabold">
                      {marginPercent}% Margin
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-white/80 pb-2 border-b border-white/10">
                      <span>Total Penjualan ({vendorBatchPax} Pax)</span>
                      <span className="font-mono font-bold text-white">Rp {totalBatchRevenue.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-white/80 pb-2 border-b border-white/10">
                      <span>Total Modal Bahan (HPP)</span>
                      <span className="font-mono font-bold text-red-400">- Rp {totalBatchHpp.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold pt-1">
                      <span className="text-[#82c46c]">Proyeksi Laba Kotor</span>
                      <span className="font-mono text-lg text-[#82c46c]">Rp {totalBatchProfit.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="pt-2 text-[11px] text-white/60">
                      Laba per porsi: <strong className="text-white">Rp {grossProfitPerPax.toLocaleString('id-ID')}</strong> (Food Cost: <strong className="text-white">{foodCostPercent}%</strong>).
                    </div>
                  </div>
                </div>

                {/* AI Recipe Optimizer Card */}
                <div className="bg-white p-6 rounded-3xl border border-[#dee3ea] shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#171c21]">AI Recipe Optimizer</h4>
                  </div>
                  <p className="text-xs text-[#5b5f63] mb-4">
                    Tekan tombol di bawah untuk meminta AI memeriksa potensi penghematan bahan tanpa mengubah rasa menu.
                  </p>

                  <button
                    type="button"
                    onClick={handleRunAiRecipeAnalysis}
                    disabled={aiRecipeLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#82c46c] text-[#125104] text-xs font-bold hover:shadow transition-all flex items-center justify-center gap-2"
                  >
                    {aiRecipeLoading ? (
                      <>
                        <span className="animate-spin text-sm">⏳</span>
                        <span>Menganalisis Komposisi...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                        <span>Analisis Efisiensi Resep</span>
                      </>
                    )}
                  </button>

                  {aiRecipeAdvice && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-[#aff496]/30 border border-[#82c46c]/50 text-xs text-[#125104] leading-relaxed">
                      {aiRecipeAdvice}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {vendorStudioTab === 'rfq_review' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Tender Details from Client */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#dee3ea] shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#eaeef5]">
                  <div>
                    <span className="text-[10px] font-bold text-[#2e6b1f] uppercase tracking-wider block">
                      Tender B2B Terbuka
                    </span>
                    <h3 className="text-lg font-bold text-[#171c21]">RFQ-2026-089X</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-extrabold">
                    Status: Siap Bidding
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#eaeef5]">
                    <span className="text-[#5b5f63]">Perusahaan Klien</span>
                    <span className="font-bold text-[#171c21]">PT Telkom Indonesia</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#eaeef5]">
                    <span className="text-[#5b5f63]">Nama PIC Acara</span>
                    <span className="font-bold text-[#171c21]">Sarah Wijaya (Corporate PIC)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#eaeef5]">
                    <span className="text-[#5b5f63]">Kebutuhan Porsi</span>
                    <span className="font-bold text-[#171c21]">150 Pax (Bento Box Premium)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#eaeef5]">
                    <span className="text-[#5b5f63]">Batas Pagu Anggaran</span>
                    <span className="font-mono font-bold text-[#2e6b1f]">Maksimal Rp 45.000 / pax (Total Rp 6.750.000)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#eaeef5]">
                    <span className="text-[#5b5f63]">Jadwal Pengantaran</span>
                    <span className="font-bold text-[#171c21]">Pukul 11:00 WIB (Tiba H-30 Menit)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#5b5f63]">Alamat Drop-off</span>
                    <span className="font-semibold text-[#171c21] text-right">Menara Sahid Sudirman Lt. 24, Jakarta Pusat</span>
                  </div>
                </div>
              </div>

              {/* Vendor Bidding Proposal Form */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#dee3ea] shadow-xs">
                <h3 className="text-base font-bold text-[#171c21] mb-1">Form Pengajuan Penawaran Mitra</h3>
                <p className="text-xs text-[#5b5f63] mb-4">
                  Kirimkan penawaran harga kompetitif dan menu unggulan Anda langsung ke PIC Acara.
                </p>

                {bidSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#aff496]/40 border border-[#82c46c] text-center">
                    <div className="w-12 h-12 rounded-full bg-[#2e6b1f] text-white flex items-center justify-center mx-auto mb-3">
                      <span className="material-symbols-outlined text-[24px]">check</span>
                    </div>
                    <h4 className="text-base font-bold text-[#125104]">Penawaran Berhasil Dikirim!</h4>
                    <p className="text-xs text-[#125104] mt-1.5 leading-relaxed">
                      Proposal penawaran paket <strong>{bidMenuTitle}</strong> senilai <strong>Rp {(customBidPrice * 150).toLocaleString('id-ID')} (150 Pax @Rp {customBidPrice.toLocaleString('id-ID')})</strong> telah berhasil disampaikan ke PIC Sarah Wijaya.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBidSubmitted(false)}
                      className="mt-4 px-4 py-2 rounded-full bg-white text-xs font-bold text-[#2e6b1f] border border-[#2e6b1f]"
                    >
                      Ubah / Ajukan Ulang
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBidSubmitted(true);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="font-bold text-[#171c21] block mb-1">
                        Nama Paket Menu yang Ditawarkan:
                      </label>
                      <input
                        type="text"
                        value={bidMenuTitle}
                        onChange={(e) => setBidMenuTitle(e.target.value)}
                        className="w-full bg-[#f0f4fb] p-2.5 rounded-xl border border-[#dee3ea] outline-none font-semibold text-[#171c21]"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#171c21] block mb-1">
                        Harga Penawaran per Porsi (Rp):
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={customBidPrice}
                          onChange={(e) => setCustomBidPrice(Number(e.target.value) || 0)}
                          className="w-40 bg-[#f0f4fb] p-2.5 rounded-xl border border-[#dee3ea] outline-none font-mono font-bold text-[#171c21]"
                          required
                        />
                        <span className="text-[#5b5f63]">
                          Total: <strong className="text-[#2e6b1f] font-mono">Rp {(customBidPrice * 150).toLocaleString('id-ID')}</strong> (Hemat Rp {( (45000 - customBidPrice) * 150 ).toLocaleString('id-ID')} dari budget klien)
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#f7f9ff] p-3 rounded-xl border border-[#dee3ea] space-y-2">
                      <span className="font-bold text-[#171c21] block">Jaminan Layanan &amp; SLA Dapur:</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#2e6b1f]" />
                        <span>Gratis 2 Box Tester dikirim H-1 ke Kantor Klien</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#2e6b1f]" />
                        <span>Kemasan Food Grade Ramah Lingkungan Tahan Panas</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#2e6b1f]" />
                        <span>Garansi tiba di lokasi H-30 Menit sebelum acara</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#82c46c] text-[#125104] font-bold text-xs hover:bg-[#72b55c] transition-colors shadow-sm"
                    >
                      Kirim Penawaran Resmi ke Client PIC
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {vendorStudioTab === 'pic_chat' && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#dee3ea] shadow-xs overflow-hidden">
              <div className="p-4 bg-[#f0f4fb] border-b border-[#dee3ea] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2e6b1f] text-white flex items-center justify-center font-bold text-sm">
                    SW
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#171c21]">Sarah Wijaya</h4>
                    <span className="text-[11px] text-[#2e6b1f] font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2e6b1f]"></span> Online &bull; PIC PT Telkom Indonesia
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#5b5f63] font-mono">Tender: RFQ-2026-089X</span>
              </div>

              {/* Chat Body */}
              <div className="p-6 h-80 overflow-y-auto space-y-3 bg-[#f7f9ff]">
                {vendorPicChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'vendor' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[75%] p-3.5 rounded-2xl text-xs ${
                        msg.sender === 'vendor'
                          ? 'bg-[#2e6b1f] text-white rounded-tr-xs'
                          : 'bg-white text-[#171c21] border border-[#dee3ea] rounded-tl-xs shadow-xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'vendor' ? 'text-white/70' : 'text-[#5b5f63]'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendVendorChat();
                }}
                className="p-3 bg-white border-t border-[#dee3ea] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={vendorChatInput}
                  onChange={(e) => setVendorChatInput(e.target.value)}
                  placeholder="Ketik pesan atau koordinasi pengiriman ke PIC Sarah..."
                  className="flex-1 bg-[#f0f4fb] px-4 py-2.5 rounded-full text-xs text-[#171c21] outline-none border border-[#dee3ea]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#82c46c] text-[#125104] font-bold text-xs hover:bg-[#72b55c] transition-colors"
                >
                  Kirim
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    );
  }

  /* ───────────────────────────────────────────────────────────
   *  VIEW B: CLIENT EVENT PLANNER & RFQ BROADCASTER
   *  (Strict Role Separation: Corporate Client PIC View)
   * ─────────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col w-full bg-[#f7f9ff] text-[#171c21] min-h-screen">
      
      {/* ───────────────────────────────────────────────────────────
       *  1. Top Sub-navigation Bar & Workflow Progress
       * ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white shadow-xs py-4 px-6 lg:px-12 border-b border-[#eaeef5]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold shadow-xs">
              02
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#171c21]">Fitur Pengadaan Cerdas Terpadu</span>
              <span className="text-xs text-[#5b5f63]">
                Saji.AI Algorithmic Engine &bull; ID Tender: <span className="font-mono text-[#171c21] font-semibold">RFQ-2026-089X</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#82c46c]/20 px-3.5 py-1.5 rounded-full border border-[#82c46c]/40">
              <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">business</span>
              <span className="text-[10px] font-bold text-[#125104] uppercase tracking-wider">
                Mode Akses: Corporate Client PIC
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-[#f0f4fb] px-3 py-1.5 rounded-full text-[#41493c] text-xs font-bold border border-[#dee3ea]">
              <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">verified</span>
              <span>Sertifikasi Halal MUI 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  2. Main Hero & Assistant Header
       * ─────────────────────────────────────────────────────────── */}
      <section className="w-full pt-8 pb-10 px-6 lg:px-12 bg-gradient-to-b from-white to-[#f7f9ff] border-b border-[#eaeef5]/60">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-bold border border-[#82c46c]/30">
                <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">auto_awesome</span>
                <span>Generative AI Catering Engine 3.2</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f0f4fb] text-[#171c21] text-[10px] font-extrabold uppercase border border-[#dee3ea]">
                Mode: Corporate Client PIC (Penyelenggara)
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171c21] tracking-tight">
              AI Smart Planner &amp;{' '}
              <span className="relative inline-block text-[#171c21]">
                Tender RFQ Kilat
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#82c46c]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 20"
                >
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#41493c] leading-relaxed">
              Masukkan kebutuhan acara kantor atau hajatan Anda. AI merumuskan komposisi menu bergizi seimbang sesuai anggaran, lalu menyiarkan tender kilat ke jaringan dapur terakreditasi dalam sekejap.
            </p>
          </div>

          {/* Live Counter Cards */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#82c46c]/20 px-5 py-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-[#82c46c]/30">
              <span className="text-2xl font-extrabold text-[#125104]">&lt;28m</span>
              <span className="text-[10px] font-bold text-[#41493c] uppercase">Rata-rata Respon</span>
            </div>
            <div className="bg-white shadow-xs border border-[#dee3ea] px-5 py-3.5 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-[#2e6b1f]">-12.4%</span>
              <span className="text-[10px] font-bold text-[#41493c] uppercase">Efisiensi Biaya</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  3. Interactive Core Planner Console & Proposal Grid
       * ─────────────────────────────────────────────────────────── */}
      <section className="w-full py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANE: Formulation Console (Interactive Controls) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 shadow-sm border border-[#dee3ea] flex flex-col gap-6 sticky top-24">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaeef5]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#82c46c]/20 flex items-center justify-center text-[#2e6b1f]">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#171c21]">Parameter Acara</h2>
                  <span className="text-xs text-[#5b5f63]">Langkah 1: Tentukan Kriteria Dasar</span>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-[#82c46c]/20 text-[#125104] px-2.5 py-1 rounded-full">
                LIVE CALC
              </span>
            </div>

            {/* 1. Event Type Selector */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-[#171c21]">Tipe Acara Perusahaan</label>
              <div className="grid grid-cols-2 gap-2">
                {eventTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setEventType(t.id)}
                    className={`px-3.5 py-2.5 rounded-2xl text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                      eventType === t.id
                        ? 'bg-[#82c46c] text-[#125104] shadow-xs font-bold'
                        : 'bg-[#f0f4fb] text-[#41493c] hover:bg-[#eaeef5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Guest Count / Pax */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#171c21]">Jumlah Porsi / Tamu (Pax)</label>
                <span className="text-xs font-extrabold text-[#2e6b1f] bg-[#82c46c]/20 px-2.5 py-0.5 rounded-full">
                  {pax} Tamu
                </span>
              </div>
              <div className="flex items-center bg-[#f0f4fb] rounded-2xl p-1.5 gap-2 border border-[#dee3ea]">
                <button
                  type="button"
                  onClick={() => setPax((p) => Math.max(20, p - 10))}
                  className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#171c21] hover:text-[#2e6b1f] shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <input
                  type="number"
                  min={20}
                  max={1500}
                  step={10}
                  value={pax}
                  onChange={(e) => setPax(Math.max(20, Number(e.target.value)))}
                  className="w-full bg-transparent text-center text-sm font-bold text-[#171c21] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setPax((p) => p + 10)}
                  className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#171c21] hover:text-[#2e6b1f] shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
            </div>

            {/* 3. Budget Target per Pax + Total Calculation */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#171c21]">Pagu Anggaran Maksimal / Pax</label>
                <span className="text-xs font-mono font-bold text-[#2e6b1f]">
                  Rp {budgetPerPax.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                type="range"
                min={30000}
                max={120000}
                step={2500}
                value={budgetPerPax}
                onChange={(e) => setBudgetPerPax(Number(e.target.value))}
                className="w-full accent-[#2e6b1f] h-2 bg-[#eaeef5] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between items-center text-[#5b5f63] text-[10px] font-semibold">
                <span>Rp 30.000 (Ekonomis)</span>
                <span>Rp 75.000 (Reguler)</span>
                <span>Rp 120.000 (Premium)</span>
              </div>

              {/* Total Calculation Card */}
              <div className="p-4 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wide">
                    Estimasi Total Pagu Acara
                  </span>
                  <div className="text-lg font-extrabold text-[#171c21] font-mono">
                    Rp {totalBudget.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#82c46c] flex items-center justify-center text-[#125104] shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
                </div>
              </div>
            </div>

            {/* 4. Dietary & Logistical Preferences */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-[#171c21]">Ketentuan Khusus &amp; Diet Tim</label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-[#f0f4fb] hover:bg-[#eaeef5] transition-colors cursor-pointer border border-[#dee3ea]/60">
                  <span className="flex items-center gap-2.5 text-xs text-[#171c21] font-medium">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">verified</span>
                    Halal Mutlak &amp; Sertifikat BPJPH
                  </span>
                  <input
                    type="checkbox"
                    checked={halalCertified}
                    onChange={(e) => setHalalCertified(e.target.checked)}
                    className="w-4 h-4 accent-[#2e6b1f] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-[#f0f4fb] hover:bg-[#eaeef5] transition-colors cursor-pointer border border-[#dee3ea]/60">
                  <span className="flex items-center gap-2.5 text-xs text-[#171c21] font-medium">
                    <span className="material-symbols-outlined text-[#a83639] text-[18px]">pest_control</span>
                    No Seafood / Bebas Alergen Udang
                  </span>
                  <input
                    type="checkbox"
                    checked={noSeafood}
                    onChange={(e) => setNoSeafood(e.target.checked)}
                    className="w-4 h-4 accent-[#2e6b1f] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-[#f0f4fb] hover:bg-[#eaeef5] transition-colors cursor-pointer border border-[#dee3ea]/60">
                  <span className="flex items-center gap-2.5 text-xs text-[#171c21] font-medium">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">eco</span>
                    Sediakan Opsi Vegetarian 10%
                  </span>
                  <input
                    type="checkbox"
                    checked={vegetarianOption}
                    onChange={(e) => setVegetarianOption(e.target.checked)}
                    className="w-4 h-4 accent-[#2e6b1f] rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-[#f0f4fb] hover:bg-[#eaeef5] transition-colors cursor-pointer border border-[#dee3ea]/60">
                  <span className="flex items-center gap-2.5 text-xs text-[#171c21] font-medium">
                    <span className="material-symbols-outlined text-[#5b5f63] text-[18px]">local_cafe</span>
                    Termasuk Buah Potong Segar &amp; Air Mineral
                  </span>
                  <input
                    type="checkbox"
                    checked={includeFruitsAndDrinks}
                    onChange={(e) => setIncludeFruitsAndDrinks(e.target.checked)}
                    className="w-4 h-4 accent-[#2e6b1f] rounded"
                  />
                </label>
              </div>
            </div>

            {/* AI Action Button */}
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-4 px-6 rounded-full bg-[#82c46c] text-[#125104] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#94d87d] active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isGenerating ? 'refresh' : 'bolt'}
              </span>
              <span>{isGenerating ? 'Mengalkulasi Formulasi Menu...' : 'Rancang Menu Otomatis dengan AI'}</span>
            </button>
          </div>

          {/* RIGHT PANE: AI Generated Menu Proposal & Broadcast Action */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Proposal Card Container */}
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#dee3ea] flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eaeef5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold uppercase tracking-wide">
                      {aiOptimized ? '✓ Rekomendasi Teroptimasi #01' : 'Formulasi Algoritma #01'}
                    </span>
                    <span className="text-xs text-[#5b5f63]">&bull; Disesuaikan untuk {pax} Pax</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#171c21] mt-1">
                    Paket Nusantara Harmoni Executive
                  </h3>
                </div>

                {/* Health & Portions Audit Badge */}
                <div className="flex items-center gap-3 bg-[#f0f4fb] p-2.5 rounded-2xl shrink-0 border border-[#dee3ea]">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#dee3ea]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      ></path>
                      <path
                        className="text-[#2e6b1f]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="98, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      ></path>
                    </svg>
                    <span className="absolute text-xs font-bold text-[#2e6b1f]">98</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#171c21]">Skor Nutrisi &amp; AKG</span>
                    <span className="text-[10px] text-[#5b5f63]">720 kcal &bull; Standar Kemenkes</span>
                  </div>
                </div>
              </div>

              {/* Hero Dish Visual + Overview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-[#f0f4fb] rounded-2xl p-4 border border-[#dee3ea]">
                <div className="md:col-span-5 h-44 rounded-xl overflow-hidden relative shadow-sm bg-white">
                  <img
                    className="w-full h-full object-cover"
                    src="/images/planner-img-1.jpg"
                    alt="Corporate Bento Box"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/katalog-nasikotak.jpg';
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-[#171c21]/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Bento Tray Biodegradable
                  </span>
                </div>
                <div className="md:col-span-7 flex flex-col justify-between h-full gap-3">
                  <div>
                    <span className="text-[10px] text-[#2e6b1f] uppercase font-bold">
                      Analisis Kecukupan Gizi Pertemuan
                    </span>
                    <p className="text-xs text-[#5b5f63] mt-1 leading-relaxed">
                      Komposisi ini dirancang menekan kantuk pasca-rapat dengan rasio protein 32%, serat 28%, dan karbohidrat kompleks berindeks glikemik seimbang.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white text-[#171c21] text-[10px] font-bold border border-[#dee3ea]">
                      🔥 720 Kkal
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-[#171c21] text-[10px] font-bold border border-[#dee3ea]">
                      🥩 38g Protein
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-[#171c21] text-[10px] font-bold border border-[#dee3ea]">
                      🥗 12g Serat Alami
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-[#171c21] text-[10px] font-bold border border-[#dee3ea]">
                      🌾 Rendah Natrium
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Detailed Recipe Breakdown */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#171c21]">Rincian Gramasi &amp; Komposisi Porsi</span>
                  <span className="text-[10px] text-[#5b5f63]">Toleransi Porsi: &plusmn;5g</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { name: 'Nasi Aromatik Pandan Daun Jeruk', gram: '180g', icon: 'rice_bowl' },
                    { name: 'Ayam Panggang Madu Ketumbar', gram: '120g', icon: 'lunch_dining' },
                    { name: 'Tumis Buncis Daging Cincang', gram: '80g', icon: 'psychiatry' },
                    { name: 'Bakwan Jagung Renyah Pipil', gram: '50g', icon: 'cookie' },
                    { name: 'Sambal Bajak & Kerupuk Udang', gram: '35g', icon: 'local_fire_department' },
                    { name: 'Semangka & Melon Segar', gram: '100g', icon: 'nutrition' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea]/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">
                          {item.icon}
                        </span>
                        <span className="text-xs text-[#171c21] font-semibold">{item.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#5b5f63]">{item.gram}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#171c21] text-xs">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">water_drop</span>
                    <span>Minuman Termasuk: Air Mineral Pristine 330ml + Teh Botol Kotak Dingin</span>
                  </div>
                  <span className="text-[10px] text-[#2e6b1f] font-extrabold bg-[#82c46c]/20 px-2 py-0.5 rounded-full">
                    KOMPLIT
                  </span>
                </div>
              </div>

              {/* Broadcast RFQ Action Banner */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#eaeef5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#82c46c]/20 flex items-center justify-center text-[#2e6b1f]">
                    <span className="material-symbols-outlined text-[22px]">timer</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#171c21]">SLA Respon Kilat Dapur</span>
                    <span className="text-[11px] text-[#5b5f63]">Vendor tender wajib merespons &lt; 30 menit</span>
                  </div>
                </div>

                {isRfqBroadcasted ? (
                  <div className="px-5 py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold flex items-center gap-2 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span>Tender Telah Disiarkan ke 48 Dapur!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleBroadcastRfq}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#2c3136] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#82c46c]">podcasts</span>
                    <span>Siarkan Tender Terbuka (RFQ)</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  4. LIVE VENDOR BIDDING BOARD (Tender Response)
       * ─────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 px-6 lg:px-12 bg-[#f0f4fb] border-t border-[#eaeef5]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          
          {/* Section Title & Status Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#2e6b1f] text-xs font-bold uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[18px]">gavel</span>
                <span>Live Tender Room</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171c21]">
                Penawaran Masuk dari Vendor Terverifikasi
              </h2>
              <p className="text-xs text-[#5b5f63] mt-1">
                3 katering terakreditasi telah mengajukan proposal berbasis formulasi AI di atas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCompareModal(true)}
                className="px-4 py-2 rounded-full bg-white text-[#171c21] text-xs font-bold shadow-xs flex items-center gap-2 border border-[#dee3ea] hover:bg-[#eaeef5] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">compare_arrows</span>
                <span>Bandingkan Menu</span>
              </button>
            </div>
          </div>

          {/* Competing Vendor Proposal Cards (3 Vendor Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* VENDOR CARD 1: Kurnia Boga Mandiri (Best Price) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden group hover:shadow-xl transition-all border border-[#dee3ea]">
              <div className="absolute top-0 right-0 bg-[#82c46c] text-[#125104] px-3.5 py-1 rounded-bl-2xl text-[10px] font-extrabold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">savings</span>
                <span>Hemat 6% vs Budget</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#82c46c]/30 flex items-center justify-center font-bold text-[#125104] text-base">
                    KB
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#171c21]">Kurnia Boga Mandiri</h4>
                    <div className="flex items-center gap-1 text-[#5b5f63] text-xs">
                      <span className="text-amber-500 font-bold">★ 4.9</span>
                      <span>(340+ Event)</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-3.5 rounded-2xl bg-[#f0f4fb] flex flex-col gap-1 border border-[#dee3ea]/60">
                  <span className="text-[10px] font-semibold text-[#5b5f63]">Penawaran Akhir Per Pax</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#2e6b1f] font-mono">Rp 42.000</span>
                    <span className="text-xs text-[#5b5f63] line-through font-mono">Rp 45.000</span>
                  </div>
                  <span className="text-xs text-[#5b5f63]">
                    Total: <strong className="text-[#171c21] font-mono">Rp {(42000 * pax).toLocaleString('id-ID')}</strong> ({pax} Pax)
                  </span>
                </div>

                {/* Key Advantages */}
                <div className="space-y-2 text-xs text-[#41493c]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">check_circle</span>
                    <span>Garansi Bonus {pax} Silk Pudding Mangga</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">check_circle</span>
                    <span>Ketepatan Waktu &plusmn;15 Menit Garansi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">check_circle</span>
                    <span>Dapur Radius 4.2 km dari Lokasi</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#eaeef5]">
                <button
                  type="button"
                  onClick={() => handleSelectVendor('Kurnia Boga Mandiri', 42000)}
                  className="w-full py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] shadow-sm transition-all"
                >
                  Pilih &amp; Bayar ke Escrow
                </button>
                <div className="flex items-center justify-between px-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveChatVendor('Kurnia Boga Mandiri')}
                    className="text-[#5b5f63] hover:text-[#2e6b1f] font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span> Chat Negosiasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCompareModal(true)}
                    className="text-[#5b5f63] hover:text-[#2e6b1f] font-semibold"
                  >
                    Bandingkan Menu &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* VENDOR CARD 2: Dapur Kemang Signature (Eco & Halal Top) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden group hover:shadow-xl transition-all border-2 border-[#2e6b1f]">
              <div className="absolute top-0 right-0 bg-[#2e6b1f] text-white px-3.5 py-1 rounded-bl-2xl text-[10px] font-extrabold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">eco</span>
                <span>Rekomendasi AI Saji</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#82c46c] flex items-center justify-center font-bold text-[#125104] text-base">
                    DK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#171c21]">Dapur Kemang Signature</h4>
                    <div className="flex items-center gap-1 text-[#5b5f63] text-xs">
                      <span className="text-amber-500 font-bold">★ 4.9</span>
                      <span>(520+ Event Korporat)</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-3.5 rounded-2xl bg-[#82c46c]/15 flex flex-col gap-1 border border-[#82c46c]/30">
                  <span className="text-[10px] font-semibold text-[#125104]">Penawaran Tepat Pagu Budget</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#171c21] font-mono">Rp 45.000</span>
                    <span className="text-xs text-[#5b5f63]">/ pax bersih</span>
                  </div>
                  <span className="text-xs text-[#5b5f63]">
                    Total: <strong className="text-[#171c21] font-mono">Rp {(45000 * pax).toLocaleString('id-ID')}</strong> ({pax} Pax)
                  </span>
                </div>

                {/* Key Advantages */}
                <div className="space-y-2 text-xs text-[#41493c]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">verified</span>
                    <span>Kemasan Zero-Plastic Foodgrade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">verified</span>
                    <span>Sendok Kayu Higienis &amp; Tisu Basah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">verified</span>
                    <span>Sertifikat Higiene Kemenkes Resmi</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#eaeef5]">
                <button
                  type="button"
                  onClick={() => handleSelectVendor('Dapur Kemang Signature', 45000)}
                  className="w-full py-3 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-[#125104] shadow-sm transition-all"
                >
                  Pilih &amp; Bayar ke Escrow
                </button>
                <div className="flex items-center justify-between px-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveChatVendor('Dapur Kemang Signature')}
                    className="text-[#5b5f63] hover:text-[#2e6b1f] font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span> Chat Negosiasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCompareModal(true)}
                    className="text-[#5b5f63] hover:text-[#2e6b1f] font-semibold"
                  >
                    Bandingkan Menu &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* VENDOR CARD 3: Larasati Royal Catering (Chef Grade) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden group hover:shadow-xl transition-all border border-[#dee3ea]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#f0f4fb] flex items-center justify-center font-bold text-[#171c21] text-base">
                    LR
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#171c21]">Larasati Royal Catering</h4>
                    <div className="flex items-center gap-1 text-[#5b5f63] text-xs">
                      <span className="text-amber-500 font-bold">★ 4.8</span>
                      <span>(190+ Event)</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-3.5 rounded-2xl bg-[#f0f4fb] flex flex-col gap-1 border border-[#dee3ea]/60">
                  <span className="text-[10px] font-semibold text-[#5b5f63]">Penawaran Premium Chef</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#171c21] font-mono">Rp 44.500</span>
                    <span className="text-[11px] text-[#2e6b1f] font-bold">-Rp 500/pax</span>
                  </div>
                  <span className="text-xs text-[#5b5f63]">
                    Total: <strong className="text-[#171c21] font-mono">Rp {(44500 * pax).toLocaleString('id-ID')}</strong> ({pax} Pax)
                  </span>
                </div>

                {/* Key Advantages */}
                <div className="space-y-2 text-xs text-[#41493c]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">restaurant</span>
                    <span>Dipimpin Executive Chef Bintang 4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">workspace_premium</span>
                    <span>Tester Gratis Dikirim Hari Ini (H-3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">local_shipping</span>
                    <span>Gratis Ongkir Armada Termal Panas</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#eaeef5]">
                <button
                  type="button"
                  onClick={() => handleSelectVendor('Larasati Royal Catering', 44500)}
                  className="w-full py-3 rounded-full bg-[#f0f4fb] text-[#171c21] text-xs font-bold hover:bg-[#eaeef5] border border-[#dee3ea] transition-all"
                >
                  Pilih &amp; Bayar ke Escrow
                </button>
                <div className="flex items-center justify-between px-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveChatVendor('Larasati Royal Catering')}
                    className="text-[#5b5f63] hover:text-[#2e6b1f] font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span> Chat Negosiasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCompareModal(true)}
                    className="text-[#5b5f63] hover:text-[#2e6b1f] font-semibold"
                  >
                    Bandingkan Menu &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ESCROW & BUYER PROTECTION BANNER */}
          <div className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-[#dee3ea]">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#82c46c]/20 flex items-center justify-center text-[#2e6b1f] shrink-0 border border-[#82c46c]/30">
                <span className="material-symbols-outlined text-[32px]">security</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-[#171c21]">
                    Proteksi Garansi Transaksi SajiEscrow™
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#82c46c] text-[#125104] text-[10px] font-extrabold">
                    100% AMAN
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5b5f63] mt-1 max-w-2xl leading-relaxed">
                  Dana pesanan Anda ditampung di rekening bersama berizin resmi Bank Indonesia. Pembayaran baru diteruskan ke vendor setelah PIC acara menandatangani verifikasi kepuasan dan jumlah porsi di lokasi.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/pricing"
                className="w-full md:w-auto px-5 py-3 rounded-full bg-[#f0f4fb] text-[#171c21] text-xs font-bold hover:bg-[#eaeef5] transition-colors border border-[#dee3ea] text-center"
              >
                Pelajari Polis Proteksi
              </Link>
              <a
                href="https://wa.me/6281192887254"
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto px-6 py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-opacity text-center shadow-xs"
              >
                Konsultasi Legal &amp; Pajak
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  5. WORKFLOW STEPS (HOW RFQ BIDDING WORKS)
       * ─────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 px-6 lg:px-12 bg-white border-t border-[#eaeef5]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-extrabold text-[#2e6b1f] uppercase tracking-widest bg-[#82c46c]/20 px-3 py-1 rounded-full">
              Alur Mudah 4 Langkah
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171c21] mt-2">
              Bagaimana Saji.AI Memangkas Waktu Pengadaan Katering
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Input Parameter Acara',
                desc: 'Tentukan pax, budget, dan preferensi makanan kantor Anda tanpa form rumit.',
              },
              {
                step: '02',
                title: 'AI Meracik Formulasi',
                desc: 'Algoritma menghitung kalori, gramasi gizi seimbang, dan batas biaya rasional.',
              },
              {
                step: '03',
                title: 'Tender Kilat Terbuka',
                desc: 'Vendor bersaing memberikan harga terbaik dan bonus nilai tambah dalam 30 menit.',
              },
              {
                step: '04',
                title: 'Pengiriman & Escrow',
                desc: 'Makanan tiba tepat waktu dengan segel keamanan. Dana aman hingga Anda puas.',
              },
            ].map((st) => (
              <div key={st.step} className="bg-[#f0f4fb] p-6 rounded-3xl border border-[#dee3ea] flex flex-col gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2c3136] text-white text-xs font-extrabold flex items-center justify-center">
                  {st.step}
                </div>
                <h4 className="text-sm font-bold text-[#171c21]">{st.title}</h4>
                <p className="text-xs text-[#5b5f63] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  MODAL: Chat Negosiasi Vendor
       * ─────────────────────────────────────────────────────────── */}
      {activeChatVendor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#dee3ea] flex flex-col overflow-hidden h-[500px]">
            {/* Header */}
            <div className="p-4 bg-[#f0f4fb] border-b border-[#dee3ea] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#82c46c] flex items-center justify-center text-[#125104] font-bold text-xs">
                  {activeChatVendor.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#171c21]">{activeChatVendor}</h4>
                  <span className="text-[10px] text-[#2e6b1f] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2e6b1f]"></span> Online Siap Merespons
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveChatVendor(null)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs text-[#5b5f63] hover:text-black border border-[#dee3ea]"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f7f9ff]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2e6b1f] text-white rounded-br-xs'
                        : 'bg-white text-[#171c21] shadow-xs border border-[#dee3ea] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-[#5b5f63] mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div className="p-3 bg-white border-t border-[#dee3ea] flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Tulis pesan negosiasi atau catatan khusus..."
                className="flex-1 bg-[#f0f4fb] px-4 py-2.5 rounded-full text-xs text-[#171c21] outline-none border border-[#dee3ea]"
              />
              <button
                type="button"
                onClick={handleSendChat}
                className="w-9 h-9 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center hover:bg-[#94d87d] transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  MODAL: Side-by-Side Comparison Matrix
       * ─────────────────────────────────────────────────────────── */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-[#dee3ea] max-h-[90vh] overflow-y-auto relative">
            <button
              type="button"
              onClick={() => setShowCompareModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-xs text-[#5b5f63] hover:text-black border border-[#dee3ea]"
            >
              ✕
            </button>
            <div className="pb-4 border-b border-[#eaeef5]">
              <span className="text-[10px] font-extrabold text-[#2e6b1f] uppercase tracking-wider">
                Matriks Komparasi Tender RFQ
              </span>
              <h3 className="text-xl font-bold text-[#171c21] mt-1">
                Perbandingan 3 Dapur Penawar Teratas ({pax} Pax)
              </h3>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#eaeef5] text-[#5b5f63]">
                    <th className="py-3 pr-4 font-semibold">Kriteria Penilaian</th>
                    <th className="py-3 px-4 font-bold text-[#2e6b1f]">Kurnia Boga Mandiri (Hemat)</th>
                    <th className="py-3 px-4 font-bold text-[#171c21]">Dapur Kemang (Rekomendasi AI)</th>
                    <th className="py-3 px-4 font-bold text-[#171c21]">Larasati Royal (Chef)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaeef5]">
                  <tr>
                    <td className="py-3 pr-4 font-bold text-[#171c21]">Harga Satuan (Per Pax)</td>
                    <td className="py-3 px-4 font-extrabold text-[#2e6b1f]">Rp 42.000 (-6%)</td>
                    <td className="py-3 px-4 font-semibold text-[#171c21]">Rp 45.000 (Pas Pagu)</td>
                    <td className="py-3 px-4 font-semibold text-[#171c21]">Rp 44.500 (-Rp 500)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-[#171c21]">Total Biaya ({pax} Pax)</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#2e6b1f]">
                      Rp {(42000 * pax).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#171c21]">
                      Rp {(45000 * pax).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#171c21]">
                      Rp {(44500 * pax).toLocaleString('id-ID')}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-[#171c21]">Kemasan Makanan</td>
                    <td className="py-3 px-4 text-[#5b5f63]">Eco Kraft Sekat 5</td>
                    <td className="py-3 px-4 text-[#2e6b1f] font-semibold">Biodegradable Zero-Plastic</td>
                    <td className="py-3 px-4 text-[#5b5f63]">Executive Matte Black</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-[#171c21]">Bonus Nilai Tambah</td>
                    <td className="py-3 px-4 text-[#2e6b1f] font-semibold">{pax} Silk Pudding Mangga</td>
                    <td className="py-3 px-4 text-[#5b5f63]">Sendok Kayu + Tisu Basah</td>
                    <td className="py-3 px-4 text-[#5b5f63]">Tester Gratis ke Kantor</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-[#171c21]">Rating &amp; Pengalaman</td>
                    <td className="py-3 px-4">★ 4.9 (340+ Event)</td>
                    <td className="py-3 px-4">★ 4.9 (520+ Event)</td>
                    <td className="py-3 px-4">★ 4.8 (190+ Event)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eaeef5] flex justify-end">
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#2c3136] text-white text-xs font-bold hover:bg-black"
              >
                Tutup Komparasi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AIPlannerPage;
