import React, { useState } from 'react';
import type { CartItem } from '../types';

interface PricingPageProps {
  onSelectPlan: (plan: string, price: number) => void;
  cartSubtotal?: number;
  cartItemCount?: number;
  cartItems?: CartItem[];
}

/* ────────────────────────────────────────────
 *  Data: 3 Subscription Plan Tiers
 * ──────────────────────────────────────────── */
const plans = [
  {
    id: 'weekly',
    badge: 'Uji Coba Tim Kecil',
    icon: 'calendar_view_week',
    title: 'Paket Mingguan (Weekly)',
    subtitle: 'Solusi praktis untuk kebutuhan makan siang 5 hari kerja.',
    weeklyPrice: 250000,
    monthlyPrice: 900000,
    savingNote: 'Hemat 12% dibanding pesan harian',
    features: [
      'Durasi paket 1 minggu (Senin - Jumat)',
      '2 Sesi santapan / hari (Siang & Snack)',
      'Menu berganti setiap hari (Nusantara & Asian)',
      'Bebas ongkos kirim radius 10 km',
      'Poin reward Saji 150 pts',
    ],
    btnText: 'Pilih Paket Mingguan',
    btnIcon: 'arrow_forward',
    highlight: false,
  },
  {
    id: 'monthly',
    badge: 'Prioritas Kantor & Startup',
    icon: 'corporate_fare',
    title: 'Paket Bulanan Korporat',
    subtitle: 'Otomasi nutrisi tim dengan laporan terpusat dan SLA ketepatan waktu.',
    weeklyPrice: 240000,
    monthlyPrice: 950000,
    savingNote: 'Termasuk Asuransi Mutu Rasa SajiEscrow™',
    features: [
      '1 Bulan penuh (22 hari kerja bergaransi)',
      '3 Sesi Santapan (Sarapan, Siang, & Healthy Snack)',
      'Bebas kustomisasi menu diet & preferensi alergi tim',
      'Dedicated Account Manager & PIC Hotline 24/7',
      'Faktur Pajak resmi (PPN/PPH) & Rekap konsumsi bulanan',
      'Audit kalori & gizi mingguan oleh Ahli Nutrisi Saji',
    ],
    btnText: 'Aktifkan Langganan Bulanan',
    btnIcon: 'bolt',
    highlight: true,
    recommended: true,
  },
  {
    id: 'enterprise',
    badge: 'Skala Besar & Konferensi',
    icon: 'celebration',
    title: 'Paket Event Akbar (Enterprise / RFQ)',
    subtitle: 'Layanan perjamuan menyeluruh untuk gathering, townhall, & pameran.',
    weeklyPrice: 0,
    monthlyPrice: 0,
    isCustom: true,
    savingNote: 'Mulai kapasitas 200+ pax hingga 5.000 pax',
    features: [
      'Live buffet banquet setup & booth stall tematik',
      'Pramusaji berseragam, chef on-site, & utensil lengkap',
      'Food tasting session gratis di kantor Anda',
      'Fasilitas Term of Payment korporat (TOP 30 Hari)',
      'Manajer operasional lapangan (Field Marshall)',
    ],
    btnText: 'Ajukan Penawaran Khusus',
    btnIcon: 'receipt_long',
    highlight: false,
  },
];

const escrowSteps = [
  {
    step: '01',
    title: 'Pembayaran Masuk Escrow',
    description: 'Dana disimpan aman di rekening penampung berlisensi Saji.AI. Vendor menerima jaminan konfirmasi pesanan resmi tanpa risiko.',
  },
  {
    step: '02',
    title: 'Vendor Mulai Masak (H-4 Jam)',
    description: 'Live Kitchen Tracking aktif. Tim Kurnia Boga Mandiri mengunggah log sertifikasi kesegaran bahan baku dan checklist higienis.',
  },
  {
    step: '03',
    title: 'Kurir Menuju Lokasi Acara',
    description: 'GPS Tracking realtime dengan armada khusus berpendingin. Update estimasi waktu tiba (ETA) otomatis terkirim via WhatsApp PIC.',
  },
  {
    step: '04',
    title: 'PIC Verifikasi Kondisi & Porsi',
    description: 'PIC kantor memeriksa checklist: kelengkapan paket, kehangatan hidangan, dan kesegaran rasa melalui kode OTP verifikasi.',
  },
  {
    step: '05',
    title: 'Dana Diteruskan ke Vendor',
    description: 'Setelah OTP validasi ditekan oleh PIC, dana escrow langsung dicairkan ke rekening vendor tanpa potongan keterlambatan.',
  },
];

const securityBadges = [
  {
    icon: 'published_with_changes',
    iconColor: 'text-[#a83639]',
    title: '100% Garansi Tepat Waktu & Uang Kembali',
    desc: 'Jika hidangan terlambat > 30 menit atau mutu tidak sesuai spesifikasi, dana dikembalikan penuh tanpa berbelit.',
  },
  {
    icon: 'account_balance',
    iconColor: 'text-[#2e6b1f]',
    title: 'Rekening Penampung Berlisensi Bank Indonesia',
    desc: 'Didukung payment gateway berlisensi kategori PJP 1 dengan enkripsi data transaksi bersertifikat PCI-DSS.',
  },
  {
    icon: 'health_and_safety',
    iconColor: 'text-[#2e6b1f]',
    title: 'Sertifikat Halal & Uji Higienis Laboratorium',
    desc: 'Vendor wajib lulus audit dapur dan uji swab berkala bebas bakteri E.Coli dan Salmonella.',
  },
];

const paymentMethods = [
  {
    id: 'bca',
    name: 'BCA Virtual Account',
    detail: 'Verifikasi otomatis < 30 detik',
    vaNumber: '8210 9928 1729 0012',
    badge: 'Instan',
    badgeColor: 'bg-[#82c46c]/30 text-[#125104]',
  },
  {
    id: 'mandiri',
    name: 'Mandiri Virtual Account / Bill',
    detail: 'Verifikasi real-time 24 jam',
    vaNumber: '8890 8219 4432 0012',
    badge: 'Instan',
    badgeColor: 'bg-[#82c46c]/30 text-[#125104]',
  },
  {
    id: 'qris',
    name: 'QRIS Dinamis (Gopay, OVO, ShopeePay)',
    detail: 'Scan via aplikasi perbankan apa saja',
    vaNumber: 'NMID: ID1020039281728',
    badge: 'QR Pay',
    badgeColor: 'bg-[#eaeef5] text-[#41493c]',
  },
  {
    id: 'corporate',
    name: 'Corporate Invoice (TOP 14 / 30 Hari)',
    detail: 'Khusus perusahaan terdaftar dengan kontrak kerja sama',
    vaNumber: 'No. PO / Kontrak Korporat Aktif',
    badge: 'B2B TOP',
    badgeColor: 'bg-[#dee3ea] text-[#41493c]',
  },
];

type TabType = 'langganan' | 'korporat' | 'single';

export const PricingPage: React.FC<PricingPageProps> = ({
  onSelectPlan,
  cartSubtotal = 0,
  cartItemCount = 0,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('langganan');
  const [billingPeriod, setBillingPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [copiedVa, setCopiedVa] = useState(false);

  // Escrow simulation step
  const [currentEscrowStep, setCurrentEscrowStep] = useState(1);
  const [otpCode, setOtpCode] = useState('8921');
  const [otpVerified, setOtpVerified] = useState(false);
  const [showProformaModal, setShowProformaModal] = useState(false);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  // RFQ Calculator State
  const [rfqPax, setRfqPax] = useState(150);
  const [rfqEventType, setRfqEventType] = useState('Rapat Direksi & VIP');
  const [rfqPackageRate, setRfqPackageRate] = useState(45000);

  const rfqCalculatedSubtotal = rfqPax * rfqPackageRate;
  const rfqTax = Math.round(rfqCalculatedSubtotal * 0.11);
  const rfqTotal = rfqCalculatedSubtotal + rfqTax;

  // Single Order totals calculation
  const hasCustomCart = cartItemCount > 0 && cartSubtotal > 0;
  const orderSubtotal = hasCustomCart ? cartSubtotal : 6750000;
  const deliveryFee = 150000;
  const taxAmount = Math.round(orderSubtotal * 0.11);
  const grandTotal = orderSubtotal + deliveryFee + taxAmount;

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlanId(plan.id);
    const priceNum =
      billingPeriod === 'monthly' ? plan.monthlyPrice : plan.weeklyPrice;
    onSelectPlan(plan.title, priceNum);
  };

  const handleCopyVa = () => {
    navigator.clipboard?.writeText(selectedPayment.vaNumber);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  const handleVerifyOtp = () => {
    if (otpCode === '8921' || otpCode.length >= 4) {
      setOtpVerified(true);
      setCurrentEscrowStep(5);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* ───────────────────────────────────────────────────────────
       *  1. Top Security Ribbon & Breadcrumb
       * ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2e6b1f] mr-2 animate-pulse"></span>
              Sistem Perlindungan Escrow Terintegrasi
            </span>
            <span className="text-[#41493c] text-xs font-semibold">/ Transaksi Terenkripsi PCI-DSS</span>
          </div>
          <div className="flex items-center gap-2 text-[#41493c] text-[10px] font-bold bg-[#f0f4fb] px-3.5 py-1.5 rounded-full border border-[#dee3ea]">
            <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">verified_user</span>
            <span>Escrow Berlisensi Bank Indonesia &amp; Asosiasi Jasa Boga (APJI)</span>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  2. Page Hero & Tabs Header
       * ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-6 pb-10 text-center flex flex-col items-center">
        <div className="inline-block relative">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171c21] tracking-tight max-w-4xl">
            Paket Berlangganan &amp; Checkout{' '}
            <span className="relative inline-block text-[#171c21]">
              SajiEscrow™
              <svg
                className="absolute -bottom-2.5 left-0 w-full overflow-visible pointer-events-none"
                fill="none"
                height="14"
                viewBox="0 0 240 18"
              >
                <path
                  className="text-[#82c46c]"
                  d="M4 14C60 4 180 3 236 12C190 7 70 8 10 15"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></path>
              </svg>
            </span>
          </h1>
        </div>
        <p className="mt-5 text-sm sm:text-base text-[#41493c] max-w-2xl text-center leading-relaxed">
          Pilih paket katering rutin kantor Anda atau selesaikan pesanan acara dengan garansi SajiEscrow™ — uang hanya dicairkan ke vendor setelah makanan tiba hangat dan terverifikasi.
        </p>

        {/* Tab Filter Pills */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#f0f4fb] shadow-sm border border-[#dee3ea]">
          {[
            { key: 'langganan' as TabType, label: 'Langganan Rutin', icon: 'autorenew' },
            { key: 'korporat' as TabType, label: 'Kalkulator RFQ Tender', icon: 'calculate' },
            { key: 'single' as TabType, label: 'Checkout & Simulator Escrow', icon: 'shield_lock' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === tab.key
                  ? 'bg-[#82c46c] text-[#125104] shadow-sm font-bold'
                  : 'text-[#41493c] hover:text-[#171c21]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  3. TAB CONTENT: Langganan Rutin
       * ─────────────────────────────────────────────────────────── */}
      {activeTab === 'langganan' && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16">
          {/* Billing Switcher (Weekly vs Monthly) */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span
              className={`text-xs sm:text-sm font-semibold cursor-pointer ${
                billingPeriod === 'weekly' ? 'text-[#171c21] font-bold' : 'text-[#5b5f63]'
              }`}
              onClick={() => setBillingPeriod('weekly')}
            >
              Tagihan Mingguan
            </span>
            <button
              type="button"
              onClick={() =>
                setBillingPeriod(billingPeriod === 'weekly' ? 'monthly' : 'weekly')
              }
              className="w-14 h-8 rounded-full bg-[#2c3136] p-1 flex items-center transition-colors relative"
            >
              <span
                className={`w-6 h-6 rounded-full bg-[#82c46c] transition-transform ${
                  billingPeriod === 'monthly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span
              className={`text-xs sm:text-sm font-semibold cursor-pointer flex items-center gap-1.5 ${
                billingPeriod === 'monthly' ? 'text-[#171c21] font-bold' : 'text-[#5b5f63]'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Tagihan Bulanan
              <span className="px-2 py-0.5 rounded-full bg-[#82c46c] text-[#125104] text-[10px] font-extrabold">
                HEMAT 15%
              </span>
            </span>
          </div>

          {/* 3 Tier Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const displayPrice = plan.isCustom
                ? 'Custom RFQ'
                : billingPeriod === 'monthly'
                ? `Rp ${plan.monthlyPrice.toLocaleString('id-ID')}`
                : `Rp ${plan.weeklyPrice.toLocaleString('id-ID')}`;

              const displayUnit = plan.isCustom
                ? '/ tender proposal'
                : billingPeriod === 'monthly'
                ? '/ pax / bulan'
                : '/ pax / minggu';

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-gradient-to-b from-[#82c46c]/25 to-[#82c46c]/10 shadow-lg border-2 border-[#82c46c]'
                      : 'bg-white shadow-sm hover:shadow-xl border border-[#dee3ea]/70'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-[#2e6b1f] text-white px-4 py-1.5 rounded-bl-2xl text-[10px] font-bold shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                      PALING DIREKOMENDASIKAN
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4 pt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                          plan.highlight
                            ? 'bg-[#82c46c] text-[#125104]'
                            : 'bg-[#f0f4fb] text-[#41493c]'
                        }`}
                      >
                        {plan.badge}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          plan.highlight
                            ? 'bg-[#82c46c] text-[#125104]'
                            : 'bg-[#f0f4fb] text-[#5b5f63]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[22px]">{plan.icon}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-[#171c21]">{plan.title}</h2>
                    <p className="text-xs text-[#5b5f63] mt-1.5 leading-relaxed">{plan.subtitle}</p>

                    <div className="my-6 pb-6 border-b border-[#eaeef5]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#171c21]">
                          {displayPrice}
                        </span>
                        <span className="text-xs text-[#5b5f63] font-semibold">{displayUnit}</span>
                      </div>
                      <span
                        className={`inline-block mt-2 text-[10px] font-bold ${
                          plan.highlight
                            ? 'text-[#125104] bg-[#82c46c]/40 px-2.5 py-0.5 rounded-full'
                            : 'text-[#2e6b1f]'
                        }`}
                      >
                        {plan.savingNote}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-[#2e6b1f] text-[18px] shrink-0 mt-0.5">
                            {plan.highlight ? 'verified' : 'check_circle'}
                          </span>
                          <span className="text-xs sm:text-sm text-[#171c21] leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6">
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                        selectedPlanId === plan.id
                          ? 'bg-[#2e6b1f] text-white shadow'
                          : plan.highlight
                          ? 'bg-[#82c46c] text-[#125104] hover:bg-[#94d87d] shadow-md'
                          : plan.id === 'enterprise'
                          ? 'bg-[#2c3136] text-white hover:bg-black'
                          : 'bg-[#f0f4fb] text-[#171c21] hover:bg-[#eaeef5]'
                      }`}
                    >
                      {selectedPlanId === plan.id ? (
                        <>
                          <span className="material-symbols-outlined text-[18px]">check</span>
                          <span>Paket Telah Dipilih</span>
                        </>
                      ) : (
                        <>
                          <span>{plan.btnText}</span>
                          <span className="material-symbols-outlined text-[18px]">
                            {plan.btnIcon}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  4. TAB CONTENT: Kalkulator RFQ Tender
       * ─────────────────────────────────────────────────────────── */}
      {activeTab === 'korporat' && (
        <section className="max-w-5xl mx-auto px-6 lg:px-12 w-full pb-16 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#dee3ea]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#eaeef5]">
              <div>
                <span className="text-[10px] font-bold text-[#2e6b1f] uppercase tracking-wider bg-[#82c46c]/20 px-3 py-1 rounded-full">
                  Kalkulator Simulasi Tender Korporat
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171c21] mt-2">
                  Hitung Estimasi Anggaran Acara Akbar Anda
                </h2>
                <p className="text-xs text-[#5b5f63] mt-1">
                  AI Saji menyiarkan tender RFQ ke 48 dapur katering terakreditasi untuk mendapatkan harga terbaik.
                </p>
              </div>
              <div className="px-4 py-2 bg-[#f0f4fb] rounded-2xl text-center">
                <span className="text-[10px] text-[#5b5f63] font-bold block">SLA Respon Dapur</span>
                <span className="text-sm font-extrabold text-[#2e6b1f]">&lt; 30 Menit</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              {/* Left Form Controls */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-[#171c21] block mb-2">
                    Tipe Acara Perusahaan
                  </label>
                  <select
                    value={rfqEventType}
                    onChange={(e) => setRfqEventType(e.target.value)}
                    className="w-full bg-[#f0f4fb] p-3 rounded-2xl text-xs sm:text-sm font-semibold text-[#171c21] outline-none border border-[#dee3ea]"
                  >
                    <option>Rapat Direksi &amp; VIP Executive</option>
                    <option>Townhall &amp; Employee Gathering (200+ Pax)</option>
                    <option>Seminar, Pelatihan &amp; Workshop</option>
                    <option>Pameran &amp; Peluncuran Produk Publik</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#171c21]">
                      Jumlah Porsi / Tamu Undangan
                    </label>
                    <span className="text-xs font-extrabold text-[#2e6b1f] bg-[#82c46c]/20 px-2.5 py-0.5 rounded-full">
                      {rfqPax} Pax
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={1000}
                    step={10}
                    value={rfqPax}
                    onChange={(e) => setRfqPax(Number(e.target.value))}
                    className="w-full accent-[#2e6b1f] cursor-pointer h-2 bg-[#eaeef5] rounded-full"
                  />
                  <div className="flex justify-between text-[10px] text-[#5b5f63] mt-1">
                    <span>30 Pax</span>
                    <span>500 Pax</span>
                    <span>1.000+ Pax</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171c21] block mb-2">
                    Standar Format Hidangan
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { label: 'Snack Box', rate: 25000 },
                      { label: 'Bento VIP', rate: 45000 },
                      { label: 'Prasmanan', rate: 65000 },
                    ].map((fmt) => (
                      <button
                        key={fmt.label}
                        type="button"
                        onClick={() => setRfqPackageRate(fmt.rate)}
                        className={`p-3 rounded-2xl text-center font-bold transition-all ${
                          rfqPackageRate === fmt.rate
                            ? 'bg-[#82c46c] text-[#125104] shadow-sm'
                            : 'bg-[#f0f4fb] text-[#41493c] hover:bg-[#eaeef5]'
                        }`}
                      >
                        <div>{fmt.label}</div>
                        <div className="text-[10px] font-normal opacity-80 mt-0.5">
                          Rp {fmt.rate.toLocaleString('id-ID')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Calculation Preview */}
              <div className="bg-[#f0f4fb] rounded-3xl p-6 flex flex-col justify-between border border-[#dee3ea]">
                <div>
                  <span className="text-xs font-bold text-[#171c21] block mb-4">
                    Ringkasan Estimasi Tender (B2B)
                  </span>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-[#41493c]">
                      <span>Kapasitas Acara</span>
                      <span className="font-bold text-[#171c21]">{rfqPax} Porsi</span>
                    </div>
                    <div className="flex justify-between text-[#41493c]">
                      <span>Tarif Satuan</span>
                      <span className="font-bold text-[#171c21]">
                        Rp {rfqPackageRate.toLocaleString('id-ID')} / pax
                      </span>
                    </div>
                    <div className="flex justify-between text-[#41493c]">
                      <span>Subtotal Makanan</span>
                      <span className="font-bold text-[#171c21]">
                        Rp {rfqCalculatedSubtotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#41493c]">
                      <span>PPN 11% Faktur Pajak</span>
                      <span className="font-bold text-[#171c21]">
                        Rp {rfqTax.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#2e6b1f] font-bold">
                      <span>Perlindungan Escrow APJI</span>
                      <span>GRATIS (Included)</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#dee3ea] flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#171c21]">Estimasi Total Biaya</span>
                    <span className="text-2xl font-extrabold text-[#2e6b1f]">
                      Rp {rfqTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  {rfqSubmitted ? (
                    <div className="p-4 rounded-2xl bg-[#aff496]/40 text-[#145206] text-xs font-bold text-center flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">task_alt</span>
                      <span>RFQ Berhasil Disiarkan! Tim Tender Saji akan segera menghubungi Anda.</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRfqSubmitted(true)}
                      className="w-full py-4 rounded-full bg-[#2c3136] text-white text-xs sm:text-sm font-bold hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#82c46c]">send</span>
                      <span>Siarkan Tender RFQ ke Vendor</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  5. TAB CONTENT: Single Order & SajiEscrow™ Simulator
       * ─────────────────────────────────────────────────────────── */}
      {activeTab === 'single' && (
        <section className="w-full bg-[#f0f4fb] py-16 border-t border-[#eaeef5] animate-in fade-in duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#2e6b1f] tracking-wide uppercase bg-[#82c46c]/20 px-3 py-1 rounded-full">
                SajiEscrow™ Smart Protection Engine
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171c21] mt-2">
                Checkout Pesanan &amp; Verifikasi Rekening Bersama
              </h2>
              <p className="text-xs text-[#5b5f63] mt-1">
                Uang Anda aman dikunci di rekening penampungan hingga Anda memverifikasi kedatangan makanan di lokasi.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-xs text-[#41493c] text-xs font-bold border border-[#dee3ea]">
              <span className="material-symbols-outlined text-[#2e6b1f] text-[18px]">lock</span>
              <span>ID Transaksi Escrow: </span>
              <span className="font-mono text-[#171c21]">#SJ-2026-0928-89B</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Order Details & Price Composition */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Order Item Briefing Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#dee3ea]/70">
                <div className="flex items-center justify-between pb-6 border-b border-[#eaeef5]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#82c46c]/30 flex items-center justify-center text-[#2e6b1f]">
                      <span className="material-symbols-outlined text-[26px]">bento</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#171c21]">
                        {hasCustomCart
                          ? `Pesanan Keranjang Acara (${cartItemCount} Menu)`
                          : '150 Box Bento Nusantara VIP'}
                      </h3>
                      <p className="text-xs text-[#5b5f63] mt-0.5">
                        {hasCustomCart
                          ? 'Daftar menu kurasi langsung dari katalog pilihan Anda'
                          : 'Menu: Nasi Liwet Wangi, Ayam Bakar Taliwang, Sambal Goreng Ati, Telur Pindang'}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold shrink-0">
                    Tier VIP
                  </span>
                </div>

                {/* Bento Image & Vendor Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
                  <div className="sm:col-span-1 rounded-2xl overflow-hidden h-28 bg-[#f0f4fb] shadow-inner">
                    <img
                      className="w-full h-full object-cover"
                      src="/images/pricing-bento.jpg"
                      alt="Bento Nusantara VIP"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/katalog-nasikotak.jpg';
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] font-bold text-[#5b5f63]">Vendor Mitra Terpilih:</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold text-[#171c21]">Kurnia Boga Mandiri</span>
                        <span className="inline-flex items-center text-[#2e6b1f] bg-[#82c46c]/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[14px] mr-1">verified</span> Halal MUI A
                        </span>
                      </div>
                      <p className="text-xs text-[#5b5f63] mt-1">
                        Dapur Sentral: Kebayoran Baru, Jakarta Selatan (Rating Dapur 4.95/5.0)
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-[#41493c] text-[10px] font-bold pt-2">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">kitchen</span>
                        Higienitas Grade A
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">timer</span>
                        Masak H-4 Jam
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Logistics Context */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2e6b1f] shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[18px]">event</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[#5b5f63]">Target Pengantaran</span>
                      <span className="text-xs sm:text-sm font-bold text-[#171c21]">
                        Besok, 11:30 WIB
                      </span>
                      <span className="block text-[11px] text-[#2e6b1f] font-semibold">
                        Toleransi kedatangan: 11:00 - 11:20 WIB
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2e6b1f] shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-[#5b5f63]">Lokasi Acara Kantor</span>
                      <span className="text-xs sm:text-sm font-bold text-[#171c21]">Menara Sahid Sudirman Lt. 24</span>
                      <span className="block text-[11px] text-[#5b5f63]">Jl. Jend. Sudirman Kav 86, Jakarta</span>
                    </div>
                  </div>
                </div>

                {/* Live Route Map Banner */}
                <div className="mt-4 rounded-2xl overflow-hidden border border-[#dee3ea]">
                  <div
                    className="w-full h-32 bg-cover bg-center rounded-2xl relative flex items-end p-3"
                    style={{ backgroundImage: "url('/images/pricing-map.jpg')" }}
                  >
                    <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 text-[#171c21] shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#2e6b1f] animate-ping"></span>
                      <span className="text-[10px] font-bold">
                        Rute Terverifikasi Dapur ke Lokasi (18 menit tempuh estimasi kurir berpendingin)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Breakdown Table */}
                <div className="mt-6 pt-6 space-y-3 text-xs sm:text-sm border-t border-[#eaeef5]">
                  <div className="flex justify-between items-center text-[#41493c]">
                    <span>Subtotal Makanan</span>
                    <span className="font-bold text-[#171c21]">
                      Rp {orderSubtotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#41493c]">
                    <span className="flex items-center gap-1">
                      Biaya Pengantaran Armada Khusus Berpendingin
                      <span
                        className="material-symbols-outlined text-[16px] text-[#5b5f63]"
                        title="Menjaga suhu makanan tetap higienis selama perjalanan"
                      >
                        info
                      </span>
                    </span>
                    <span className="font-bold text-[#171c21]">
                      Rp {deliveryFee.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#41493c]">
                    <span>PPN 11% (Faktur Pajak Korporat Resmi)</span>
                    <span className="font-bold text-[#171c21]">
                      Rp {taxAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#2e6b1f] text-xs font-bold">
                    <span>Biaya Perlindungan Escrow Penjamin Mutu</span>
                    <span className="font-extrabold">GRATIS (Sponsor Saji)</span>
                  </div>

                  <div className="pt-4 mt-2 flex justify-between items-baseline border-t border-[#eaeef5]">
                    <div>
                      <span className="block text-base sm:text-xl font-extrabold text-[#171c21]">
                        Total Nilai Escrow Terproteksi
                      </span>
                      <span className="text-[11px] text-[#5b5f63]">
                        Dana dikunci sementara di rekening penampung resmi Saji
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-4xl font-extrabold text-[#2e6b1f]">
                        Rp {grandTotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#dee3ea]/70">
                <h3 className="text-base sm:text-lg font-bold text-[#171c21] mb-1">
                  Metode Pembayaran SajiEscrow™
                </h3>
                <p className="text-xs text-[#5b5f63] mb-6">
                  Pilih saluran pembayaran terdaftar. Dana Anda tidak diserahkan ke vendor sampai makanan tiba sesuai standar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {paymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      onClick={() => setSelectedPayment(pm)}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer transition-all border ${
                        selectedPayment.id === pm.id
                          ? 'bg-[#82c46c]/10 border-[#82c46c] ring-2 ring-[#82c46c]'
                          : 'bg-[#f0f4fb] border-[#dee3ea] hover:bg-[#eaeef5]'
                      }`}
                    >
                      <input
                        checked={selectedPayment.id === pm.id}
                        className="w-4 h-4 text-[#2e6b1f] accent-[#2e6b1f]"
                        name="payment_method"
                        type="radio"
                        readOnly
                      />
                      <div className="flex-1 min-w-0">
                        <span className="block text-xs sm:text-sm font-bold text-[#171c21] truncate">
                          {pm.name}
                        </span>
                        <span className="block text-[11px] text-[#5b5f63] truncate">
                          {pm.detail}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pm.badgeColor}`}>
                        {pm.badge}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Virtual Account / Instruction Display Box */}
                <div className="mt-6 p-4 rounded-2xl bg-[#f0f4fb] border border-[#dee3ea] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block">
                      Kode Bayar Escrow: {selectedPayment.name}
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-[#171c21]">
                      {selectedPayment.vaNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyVa}
                    className="px-4 py-2 rounded-full bg-white text-[#171c21] text-xs font-bold shadow-xs hover:bg-[#dee3ea] transition-colors flex items-center gap-1.5 border border-[#dee3ea]"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedVa ? 'done' : 'content_copy'}
                    </span>
                    <span>{copiedVa ? 'Disalin!' : 'Salin Nomor'}</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentEscrowStep(2);
                      alert(
                        `Pembayaran senilai Rp ${grandTotal.toLocaleString(
                          'id-ID'
                        )} via ${selectedPayment.name} berhasil diamankan di SajiEscrow™!`
                      );
                    }}
                    className="w-full sm:flex-1 py-4 px-8 rounded-full bg-[#82c46c] text-[#125104] text-xs sm:text-sm font-bold shadow-md hover:bg-[#94d87d] transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">shield_lock</span>
                    <span>Bayar &amp; Kunci Dana di SajiEscrow™</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProformaModal(true)}
                    className="w-full sm:w-auto py-4 px-6 rounded-full bg-[#f0f4fb] text-[#171c21] text-xs sm:text-sm font-bold hover:bg-[#eaeef5] transition-colors flex items-center justify-center gap-1.5 border border-[#dee3ea]"
                  >
                    <span className="material-symbols-outlined text-[18px]">draft</span>
                    <span>Unduh Proforma</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SajiEscrow™ Lifecycle Stepper & OTP Verification */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Escrow Lifecycle Tracker Timeline */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#dee3ea]/70">
                <div className="flex items-center justify-between pb-6 border-b border-[#eaeef5]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">timeline</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#171c21]">Siklus Perlindungan Dana</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold">
                    Langkah {currentEscrowStep} dari 5
                  </span>
                </div>

                <p className="text-xs text-[#5b5f63] my-4 leading-relaxed">
                  Uang Anda tidak langsung diberikan ke vendor. Dana disimpan di rekening penampungan bergaransi sampai pesanan tiba dengan sempurna.
                </p>

                {/* Steps List */}
                <div className="space-y-4">
                  {escrowSteps.map((s, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentEscrowStep === stepNumber;
                    const isPassed = currentEscrowStep > stepNumber;

                    return (
                      <div
                        key={s.step}
                        onClick={() => setCurrentEscrowStep(stepNumber)}
                        className={`flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                          isActive
                            ? 'bg-[#f0f4fb] border border-[#82c46c]'
                            : isPassed
                            ? 'bg-[#82c46c]/10'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                            isPassed
                              ? 'bg-[#2e6b1f] text-white'
                              : isActive
                              ? 'bg-[#2c3136] text-white shadow'
                              : 'bg-[#eaeef5] text-[#5b5f63]'
                          }`}
                        >
                          {isPassed ? '✓' : s.step}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#171c21]">{s.title}</span>
                            {isActive && (
                              <span className="text-[10px] font-bold text-[#2e6b1f] bg-[#82c46c]/20 px-2 py-0.5 rounded-full">
                                Sedang Berjalan
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#5b5f63] mt-1 leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive OTP Verification Simulation */}
                <div className="mt-6 pt-6 border-t border-[#eaeef5] bg-[#82c46c]/10 p-4 rounded-2xl border border-[#82c46c]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[20px]">
                      verified
                    </span>
                    <span className="text-xs font-bold text-[#171c21]">
                      Simulasi Validasi Kedatangan PIC
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5b5f63] mb-3 leading-relaxed">
                    Saat kurir tiba, periksa bento box Anda. Masukkan kode OTP serah terima berikut untuk melepas dana escrow ke vendor.
                  </p>

                  {otpVerified ? (
                    <div className="p-3 bg-[#82c46c] text-[#125104] rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">done_all</span>
                      <span>OTP Terverifikasi! Dana Escrow Telah Dicairkan ke Rekening Kurnia Boga Mandiri.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Kode OTP (contoh: 8921)"
                        className="bg-white px-3 py-2 rounded-xl text-xs font-mono font-bold text-[#171c21] outline-none border border-[#dee3ea] w-36 text-center"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#2e6b1f] text-white text-xs font-bold hover:bg-[#125104] transition-all shadow-xs"
                      >
                        Validasi &amp; Lepas Dana
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Guarantees Panel */}
              <div className="bg-[#82c46c]/20 rounded-3xl p-6 border border-[#82c46c]/30">
                <h4 className="text-sm font-bold text-[#171c21] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2e6b1f] text-[20px]">
                    verified_user
                  </span>
                  <span>Jaminan &amp; Standar Mutu Saji</span>
                </h4>
                <div className="space-y-3">
                  {securityBadges.map((badge) => (
                    <div
                      key={badge.title}
                      className="flex items-start gap-3 bg-white/90 p-3.5 rounded-2xl border border-white"
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] shrink-0 ${badge.iconColor}`}
                      >
                        {badge.icon}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-[#171c21] block">
                          {badge.title}
                        </span>
                        <span className="text-[11px] text-[#5b5f63] leading-relaxed">
                          {badge.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concierge Hotline */}
              <div className="bg-white rounded-2xl p-5 shadow-xs flex items-center justify-between border border-[#dee3ea]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#82c46c]/20 flex items-center justify-center text-[#2e6b1f]">
                    <span className="material-symbols-outlined text-[20px]">headset_mic</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#171c21]">
                      Executive Event Concierge
                    </span>
                    <span className="text-[11px] text-[#5b5f63]">
                      WhatsApp Priority: +62 811-9288-7254
                    </span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#2e6b1f] animate-ping" title="Online Sekarang"></span>
              </div>

            </div>
          </div>
        </div>
      </section>
    )}

      {/* ───────────────────────────────────────────────────────────
       *  6. Proforma Invoice Modal
       * ─────────────────────────────────────────────────────────── */}
      {showProformaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#dee3ea]">
            <button
              type="button"
              onClick={() => setShowProformaModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center hover:bg-[#dee3ea]"
            >
              ✕
            </button>
            <div className="text-center pb-4 border-b border-[#eaeef5]">
              <span className="text-[10px] font-bold text-[#2e6b1f] uppercase tracking-wider">
                Dokumen Resmi Penawaran Saji.AI
              </span>
              <h3 className="text-lg font-bold text-[#171c21] mt-1">
                Proforma Invoice #PI-2026-0928
              </h3>
              <p className="text-xs text-[#5b5f63]">Tanggal Penerbitan: Hari ini • Status: Terproteksi Escrow</p>
            </div>
            <div className="my-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#eaeef5]">
                <span className="text-[#5b5f63]">Penerima Tagihan</span>
                <span className="font-bold text-[#171c21]">Divisi HR / GA Korporat</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaeef5]">
                <span className="text-[#5b5f63]">Rincian Katering</span>
                <span className="font-bold text-[#171c21]">
                  {hasCustomCart ? `Keranjang (${cartItemCount} menu)` : '150 Box Bento VIP'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaeef5]">
                <span className="text-[#5b5f63]">Rekening Penampung</span>
                <span className="font-bold text-[#171c21]">PT Saji Boga Berjaya (Escrow Bank)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#eaeef5]">
                <span className="text-[#5b5f63]">Total yang Diamankan</span>
                <span className="font-extrabold text-[#2e6b1f]">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowProformaModal(false);
                alert('File Proforma Invoice #PI-2026-0928 berhasil diunduh dalam format PDF.');
              }}
              className="w-full mt-4 py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold hover:bg-[#94d87d] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh Dokumen PDF Resmi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
