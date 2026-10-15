import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AIPlannerPageProps {
  onSelectPlan?: (plan: string, price: number) => void;
}

export const AIPlannerPage: React.FC<AIPlannerPageProps> = ({ onSelectPlan }) => {
  const navigate = useNavigate();

  // 1. Console Input States
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
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2e6b1f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2e6b1f]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#125104] uppercase tracking-wider">
                Algoritma Aktif &bull; 48 Vendor Siap Lelang
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-bold mb-3 border border-[#82c46c]/30">
              <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">auto_awesome</span>
              <span>Generative AI Catering Engine 3.2</span>
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
