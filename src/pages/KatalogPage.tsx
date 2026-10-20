import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { MenuItem } from '../types';

/* ────────────────────────────────────────────
 *  Data Types & Expanded Catalog Menu Items
 * ──────────────────────────────────────────── */
export interface ExtendedMenuItem extends MenuItem {
  vendor: string;
  minPax?: number;
  badge?: string;
  packaging?: string;
  halalCert?: string;
  leadTime?: string;
  ingredients?: string[];
  allergens?: string[];
  protein?: number;
  carbs?: number;
  fat?: number;
  isHalal?: boolean;
  noMsg?: boolean;
  isLowCalorie?: boolean;
  isVegetarian?: boolean;
}

const katalogDishes: ExtendedMenuItem[] = [
  {
    id: 'kat-1',
    name: 'Nasi Kotak Nusantara Heritage',
    category: 'nusantara',
    description: 'Empal gepuk serundeng empuk gurih, urap sayur bumbu sangrai kelapa sangrai, telur pindang & sambal terasi terasi matang.',
    price: 38000,
    rating: 4.8,
    calories: 620,
    protein: 34,
    carbs: 72,
    fat: 22,
    image: '/images/katalog-nasikotak.jpg',
    vendor: 'Dapur Kemang Heritage',
    packaging: 'Bento Box Daun Pisang Food-Grade Sekat 5',
    halalCert: 'ID31110000492810922 (MUI Halal Grade A)',
    leadTime: 'H-4 Jam',
    ingredients: ['Daging Sapi Empal', 'Kelapa Parut Sangrai', 'Bayam', 'Kacang Panjang', 'Tauge', 'Telur Bebek Pindang', 'Sambal Terasi'],
    allergens: ['Mengandung Terasi'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-2',
    name: 'Beef Bulgogi Eco-Bento Premium',
    category: 'bento',
    description: 'Irisan sirloin Australia gurih manis dengan minyak wijen murni, kimchi fermentasi alami, tamago telur gulung & nasi pulen jepang.',
    price: 45000,
    rating: 4.9,
    calories: 680,
    protein: 42,
    carbs: 68,
    fat: 24,
    image: '/images/katalog-bulgogi.jpg',
    vendor: 'Kurnia Boga Mandiri',
    badge: 'Best Seller',
    packaging: 'Eco Kraft Sugarcane Bento Box (Biodegradable)',
    halalCert: 'ID31210000843210823 (MUI Halal Grade A)',
    leadTime: 'H-3 Jam (Express)',
    ingredients: ['Sirloin Beef Slice', 'Saus Bulgogi Alami', 'Wijen Panggang', 'Kimchi Sawit', 'Tamagoyaki', 'Beras Japonica'],
    allergens: ['Wijen', 'Kedelai'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-3',
    name: 'Prasmanan Liwet Komplit Premium',
    category: 'nusantara',
    description: 'Lengkap meja chafing dish pemanas elektrik, taplak batik, dan 2 staf pramusaji terlatih. Nasi liwet teri kasturi, ayam goreng lengkuas, tahu bacem.',
    price: 65000,
    rating: 4.9,
    calories: 740,
    protein: 45,
    carbs: 85,
    fat: 26,
    image: '/images/katalog-liwet.jpg',
    vendor: 'Larasati Royal Catering',
    minPax: 30,
    packaging: 'Prasmanan Buffet Setup + Utensil Melamin Mewah',
    halalCert: 'ID31110000213450721 (MUI Halal Grade A)',
    leadTime: 'H-12 Jam',
    ingredients: ['Beras Pandan Wangi', 'Teri Medan', 'Ayam Kampung Lengkuas', 'Tahu Tempe Bacem', 'Lalapan Kemangi', 'Sambal Bawang'],
    allergens: ['Ikan Teri'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-4',
    name: 'Healthy Quinoa Honey Mustard',
    category: 'healthy',
    description: 'Dada ayam sous-vide rendah natrium, quinoa organik Peru, baby romaine segar, edamame renyah & dressing madu lemon segar dingin.',
    price: 42000,
    rating: 5.0,
    calories: 480,
    protein: 48,
    carbs: 45,
    fat: 12,
    image: '/images/katalog-quinoa.jpg',
    vendor: 'NutriPlate Kitchen Lab',
    badge: 'Diet Sehat',
    packaging: 'Bowl Bowl Compostable Sekat Ganda',
    halalCert: 'ID31110000994120124 (MUI Halal Grade A)',
    leadTime: 'H-4 Jam',
    ingredients: ['Dada Ayam Tanpa Lemak Sous-Vide', 'Quinoa Organik', 'Baby Romaine', 'Edamame', 'Tomat Cherry', 'Dressing Madu Lemon'],
    allergens: ['Bebas Alergen Utama'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: true,
    isVegetarian: false,
  },
  {
    id: 'kat-5',
    name: 'VIP Salmon Mentai Executive',
    category: 'bento',
    description: 'Fresh salmon Norwegia torched mentai tobiko sauce, furikake brown rice, chuka wakame rumput laut & baby corn bakar.',
    price: 75000,
    rating: 4.9,
    calories: 710,
    protein: 44,
    carbs: 62,
    fat: 28,
    image: '/images/katalog-salmon.jpg',
    vendor: 'Miyabi Gourmet Curation',
    badge: 'Menu Eksekutif',
    packaging: 'Executive Black Bento Matte Finished Box',
    halalCert: 'ID31110000773910622 (MUI Halal Grade A)',
    leadTime: 'H-4 Jam',
    ingredients: ['Salmon Norwegia Grade Sashimi', 'Saus Mentai Tobiko Halal', 'Nasi Furikake', 'Chuka Wakame', 'Edamame'],
    allergens: ['Ikan Laut', 'Telur Ikan (Tobiko)'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-6',
    name: 'Snack Box Tradisional & Pastry',
    category: 'snack',
    description: 'Isi 3 kudapan premium: Risoles Ragout Smoked Beef keju leleh, Fruit Tartlet buah segar kiwi anggur, dan Lemper Ayam Bakar wangi daun.',
    price: 25000,
    rating: 4.8,
    calories: 350,
    protein: 14,
    carbs: 46,
    fat: 15,
    image: '/images/katalog-snackbox.jpg',
    vendor: 'Koleksi Manis Nusantara',
    packaging: 'Paper Box Embossed Gold + Air Mineral Botol',
    halalCert: 'ID31110000381020421 (MUI Halal Grade A)',
    leadTime: 'H-3 Jam (Express)',
    ingredients: ['Risoles Ragout Smoked Beef', 'Fruit Tartlet Buah Segar', 'Lemper Ayam Suwir', 'Air Mineral 330ml'],
    allergens: ['Gluten (Tepung Terigu)', 'Susu'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-7',
    name: 'Soto Betawi Susu Daging Sengkel',
    category: 'nusantara',
    description: 'Daging sengkel empuk lumer kuah susu murni rempah kapulaga tanpa santan berat, disajikan dengan emping melinjo renyah & sambal rawit hijau.',
    price: 48000,
    rating: 4.9,
    calories: 580,
    protein: 38,
    carbs: 52,
    fat: 22,
    image: '/images/katalog-soto.jpg',
    vendor: 'Dapur Bang Ali Asli',
    badge: 'Khas Nusantara',
    packaging: 'Thermal Insulated Soup Container Anti-Tumpah',
    halalCert: 'ID31110000155230920 (MUI Halal Grade A)',
    leadTime: 'H-4 Jam',
    ingredients: ['Daging Sapi Sengkel', 'Susu Murni Segar', 'Cengkeh', 'Kapulaga', 'Emping Melinjo', 'Acar Mentimun'],
    allergens: ['Susu Sapi', 'Emping Melinjo'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-8',
    name: 'Tumpeng Mini Selamatan Kantor',
    category: 'nusantara',
    description: 'Nasi kuning pulen wangi kerucut, ayam bakar bumbu rujak manis gurih, abon sapi solo, perkedel kentang lembut, dan serundeng gurih kelapa gonseng.',
    price: 55000,
    rating: 4.8,
    calories: 750,
    protein: 36,
    carbs: 92,
    fat: 25,
    image: '/images/katalog-tumpeng.jpg',
    vendor: 'Berkah Rasa Catering',
    badge: 'Paling Favorit',
    packaging: 'Mika Tumpeng Dome Transparan Kunci Pita Satin',
    halalCert: 'ID31110000889020323 (MUI Halal Grade A)',
    leadTime: 'H-6 Jam',
    ingredients: ['Beras Kunyit Alami', 'Ayam Bakar Rujak', 'Abon Sapi Murni', 'Perkedel Kentang', 'Kering Tempe Balado'],
    allergens: ['Alergen Kedelai'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-9',
    name: 'Sate Ayam Madura Dapur Terbuka (Live Stall)',
    category: 'live',
    description: 'Stall live cooking dengan arang kelapa alami higienis. 10 tusuk sate ayam fillet paha lembut bumbu kacang gurih medok, lontong daun & acar.',
    price: 46000,
    rating: 4.9,
    calories: 610,
    protein: 46,
    carbs: 48,
    fat: 22,
    image: '/images/hero-sate.jpg',
    vendor: 'Sate Madura Warisan Cak Nur',
    badge: 'Live Stall',
    minPax: 40,
    packaging: 'Live Booth Cooking Setup + Chef Panggangan Profesional',
    halalCert: 'ID31110000912380523 (MUI Halal Grade A)',
    leadTime: 'H-12 Jam',
    ingredients: ['Fillet Paha Ayam Segar', 'Kacang Tanah Sangrai', 'Kecap Manis Fermentasi Alami', 'Lontong Daun Pisang'],
    allergens: ['Kacang Tanah'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-10',
    name: 'Rendang Sapi Daging Padang Asli',
    category: 'nusantara',
    description: 'Daging sapi has dalam dimasak 8 jam dengan santan kelapa sawit segar dan 16 macam rempah Minang otentik. Nasi kapau & gulai daun singkong.',
    price: 52000,
    rating: 5.0,
    calories: 710,
    protein: 48,
    carbs: 70,
    fat: 28,
    image: '/images/menu-rendang.jpg',
    vendor: 'Rumah Makan Minang Saiyo',
    badge: 'Juara Rasa',
    packaging: 'Bento Box Daun Pisang Food-Grade Sekat 5',
    halalCert: 'ID31110000492810922 (MUI Halal Grade A)',
    leadTime: 'H-4 Jam',
    ingredients: ['Daging Sapi Has Pilihan', 'Santan Kelapa Murni', 'Cabai Merah Keriting', 'Lengkuas', 'Serai', 'Daun Jeruk Purut'],
    allergens: ['Bebas Alergen Kacang'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: false,
    isVegetarian: false,
  },
  {
    id: 'kat-11',
    name: 'Warm Chicken & Avocado Garden Bowl',
    category: 'healthy',
    description: 'Alpukat mentega mentega lumer, grilled chicken breast herb garlic, jagung manis pipil, baby spinach organik & vinagrette balsamic citrus.',
    price: 49000,
    rating: 4.8,
    calories: 420,
    protein: 41,
    carbs: 34,
    fat: 14,
    image: '/images/menu-chickensalad.jpg',
    vendor: 'NutriPlate Kitchen Lab',
    badge: 'Rendah Karbo',
    packaging: 'Eco Kraft Salad Bowl Anti Rembes',
    halalCert: 'ID31110000994120124 (MUI Halal Grade A)',
    leadTime: 'H-4 Jam',
    ingredients: ['Alpukat Mentega Organik', 'Ayam Panggang Herbal', 'Baby Spinach', 'Jagung Pipil', 'Balsamic Citrus Dressing'],
    allergens: ['Bebas Alergen Utama'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: true,
    isVegetarian: false,
  },
  {
    id: 'kat-12',
    name: 'Vegan Rainbow Plant-Based Protein Bowl',
    category: 'healthy',
    description: 'Tempe organik panggang marinate shoyu, tahu sutra crispy, kacang edamame, ubi jalar panggang madu, dan brown rice kaya serat.',
    price: 36000,
    rating: 4.9,
    calories: 450,
    protein: 32,
    carbs: 58,
    fat: 11,
    image: '/images/hero-salad.jpg',
    vendor: 'Dharma Green Kitchen',
    badge: 'Plant-Based',
    packaging: '100% Recyclable Plant Fiber Bowl',
    halalCert: 'ID31110000109920124 (MUI Halal Grade A)',
    leadTime: 'H-3 Jam',
    ingredients: ['Tempe Non-GMO', 'Tahu Sutra', 'Edamame', 'Ubi Jalar', 'Nasi Merah Organik', 'Saus Tahini Wijen'],
    allergens: ['Kedelai', 'Wijen'],
    isHalal: true,
    noMsg: true,
    isLowCalorie: true,
    isVegetarian: true,
  },
];

const quickFilters = [
  { label: 'Semua Menu', value: 'all', count: 12 },
  { label: '🍱 Bento Rapat Kantor', value: 'bento', count: 2 },
  { label: '🍲 Prasmanan & Nusantara', value: 'nusantara', count: 5 },
  { label: '🥗 Diet & Healthy Kalori Terukur', value: 'healthy', count: 3 },
  { label: '🥐 Snack Box & Coffee Break', value: 'snack', count: 1 },
  { label: '🍳 Live Cooking Stall', value: 'live', count: 1 },
];

const eventCategories = [
  { id: 'direksi', label: 'Rapat Direksi & Eksekutif', defaultChecked: true },
  { id: 'townhall', label: 'Townhall & Karyawan Harian', defaultChecked: true },
  { id: 'seminar', label: 'Seminar & Workshop', defaultChecked: true },
  { id: 'gathering', label: 'Pesta Perusahaan / Gathering', defaultChecked: true },
];

interface KatalogPageProps {
  onAddToCart: (dish: MenuItem) => void;
  cartItemCount: number;
  cartSubtotal: number;
  onOpenCart?: () => void;
}

export const KatalogPage: React.FC<KatalogPageProps> = ({
  onAddToCart,
  cartItemCount,
  cartSubtotal,
  onOpenCart,
}) => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  // Filter States
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedArea, setSelectedArea] = useState('jaksel');
  const [budgetRange, setBudgetRange] = useState(85000);
  const [selectedPaxRange, setSelectedPaxRange] = useState<'all' | '10-25' | '25-100' | '100+'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'calories'>('relevance');

  // Sync with URL query changes (e.g. from Navbar search)
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Diet checkboxes
  const [filterHalal, setFilterHalal] = useState(true);
  const [filterNoMsg, setFilterNoMsg] = useState(false);
  const [filterLowCal, setFilterLowCal] = useState(false);
  const [filterVegetarian, setFilterVegetarian] = useState(false);

  // Pagination & Visual Feedback
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  // Quick View Modal
  const [quickViewDish, setQuickViewDish] = useState<ExtendedMenuItem | null>(null);
  const [modalQty, setModalQty] = useState(1);

  // Filter and Sort Logic
  const filteredDishes = useMemo(() => {
    return katalogDishes
      .filter((dish) => {
        // Quick Category Chip
        if (activeFilter !== 'all' && dish.category !== activeFilter) {
          return false;
        }

        // Budget Slider
        if (dish.price > budgetRange) return false;

        // Pax Range
        if (selectedPaxRange === '10-25' && dish.minPax && dish.minPax > 25) return false;
        if (selectedPaxRange === '25-100' && dish.minPax && (dish.minPax < 25 || dish.minPax > 100)) return false;
        if (selectedPaxRange === '100+' && dish.minPax && dish.minPax < 100) return false;

        // Diet filters
        if (filterHalal && !dish.isHalal) return false;
        if (filterNoMsg && !dish.noMsg) return false;
        if (filterLowCal && !dish.isLowCalorie) return false;
        if (filterVegetarian && !dish.isVegetarian) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = dish.name.toLowerCase().includes(q);
          const matchVendor = dish.vendor.toLowerCase().includes(q);
          const matchDesc = dish.description.toLowerCase().includes(q);
          const matchIng = dish.ingredients?.some((ing) => ing.toLowerCase().includes(q));
          if (!matchName && !matchVendor && !matchDesc && !matchIng) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'calories') return (a.calories || 999) - (b.calories || 999);
        return 0; // relevance
      });
  }, [
    activeFilter,
    budgetRange,
    selectedPaxRange,
    filterHalal,
    filterNoMsg,
    filterLowCal,
    filterVegetarian,
    searchQuery,
    sortBy,
  ]);

  // Paginated items
  const totalPages = Math.ceil(filteredDishes.length / itemsPerPage) || 1;
  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDishes.slice(start, start + itemsPerPage);
  }, [filteredDishes, currentPage, itemsPerPage]);

  const handleAdd = (dish: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(dish);
    setAddedIds((prev) => new Set(prev).add(dish.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(dish.id);
        return next;
      });
    }, 1200);
  };

  const handleOpenDetail = (dish: ExtendedMenuItem) => {
    setQuickViewDish(dish);
    setModalQty(1);
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setBudgetRange(150000);
    setSelectedPaxRange('all');
    setSortBy('relevance');
    setFilterHalal(true);
    setFilterNoMsg(false);
    setFilterLowCal(false);
    setFilterVegetarian(false);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ───────────────────────────────────────────────────────────
       *  1. Top Search & Quick Category Strip
       * ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-8 border-b border-[#eaeef5]/80 shadow-[0_1px_6px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-6">
          
          {/* Headline & Subtitle */}
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#82c46c]/20 text-[#125104] w-fit">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="text-xs font-semibold">100% Terverifikasi Halal &amp; Higiene Uji Lab Dapur</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171c21] tracking-tight">
              Katalog Hidangan &amp; Menu Katering Nusantara
            </h1>
            <p className="text-sm text-[#41493c] leading-relaxed">
              Eksplorasi pilihan paket bento rapat, prasmanan acara, snack box, dan hidangan sehat dari vendor katering berlisensi se-Jabodetabek dengan jaminan tepat waktu SajiEscrow™.
            </p>
          </div>

          {/* Search & Location Bar */}
          <div className="bg-[#f0f4fb] rounded-2xl lg:rounded-full p-2 flex flex-col lg:flex-row items-center justify-between gap-3 shadow-sm border border-[#dee3ea]/60">
            {/* Search Keyword */}
            <div className="flex items-center gap-3 w-full lg:w-5/12 px-4 py-2">
              <span className="material-symbols-outlined text-[#5b5f63] text-[22px]">search</span>
              <input
                className="w-full bg-transparent text-sm text-[#171c21] placeholder:text-[#5b5f63] outline-none"
                placeholder="Cari menu, lauk, nama vendor (misal: Bento, Bulgogi, Liwet)..."
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#5b5f63] hover:text-black font-bold p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="hidden lg:block w-px h-8 bg-[#dee3ea]"></div>

            {/* Location Dropdown */}
            <div className="flex items-center gap-3 w-full lg:w-4/12 px-4 py-2">
              <span className="material-symbols-outlined text-[#2e6b1f] text-[22px]">location_on</span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider">
                  Area Pengiriman Acara
                </span>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-[#171c21] outline-none cursor-pointer"
                >
                  <option value="jaksel">Jakarta Selatan (SCBD, Sudirman, Kuningan, Cilandak)</option>
                  <option value="jakpus">Jakarta Pusat (Thamrin, Menteng, Monas)</option>
                  <option value="jakbar">Jakarta Barat (Puri Indah, Kebon Jeruk, Tomang)</option>
                  <option value="bsd">Tangerang &amp; BSD City (Gading Serpong, Karawaci)</option>
                  <option value="bekasi">Bekasi &amp; Sekitarnya (Summarecon, Harapan Indah)</option>
                </select>
              </div>
            </div>

            {/* Find / Results Indicator */}
            <div className="w-full lg:w-auto px-6 py-3 rounded-full bg-[#2c3136] text-white text-xs font-semibold flex items-center justify-center gap-2">
              <span>{filteredDishes.length} Menu Siap Pesan</span>
              <span className="material-symbols-outlined text-[16px] text-[#94d87d]">restaurant</span>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickFilters.map((f) => {
              const isSelected = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => {
                    setActiveFilter(f.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#2c3136] text-white ring-2 ring-[#2c3136]'
                      : 'bg-[#f0f4fb] text-[#171c21] hover:bg-[#82c46c]/30 hover:text-[#125104]'
                  }`}
                >
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  2. Main Content: Left Filter Sidebar + Right Catalog Grid
       * ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Smart Filter */}
          <aside className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-[#dee3ea]/60 flex flex-col gap-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaeef5]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2e6b1f] text-[20px]">tune</span>
                <span className="text-base font-bold text-[#171c21]">Filter Pintar</span>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-[#2e6b1f] hover:underline"
              >
                Reset Semua
              </button>
            </div>

            {/* Budget Slider */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#171c21]">Maksimal Anggaran</span>
                <span className="text-xs font-bold text-[#2e6b1f] bg-[#82c46c]/20 px-2 py-0.5 rounded-full">
                  ≤ Rp {Math.round(budgetRange / 1000)}k / pax
                </span>
              </div>
              <input
                className="w-full accent-[#2e6b1f] cursor-pointer h-2 bg-[#eaeef5] rounded-full"
                max={150000}
                min={25000}
                step={5000}
                type="range"
                value={budgetRange}
                onChange={(e) => {
                  setBudgetRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
              />
              <div className="flex justify-between text-[11px] text-[#5b5f63]">
                <span>Rp 25.000</span>
                <span>Rp 150.000+</span>
              </div>
            </div>

            {/* Minimum Pesanan (Pax) */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#eaeef5]">
              <span className="text-xs font-bold text-[#171c21]">Kapasitas Pesanan (Pax)</span>
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-semibold">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: '10-25', label: '10-25' },
                  { id: '25-100', label: '25-100' },
                  { id: '100+', label: '100+' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedPaxRange(item.id as any);
                      setCurrentPage(1);
                    }}
                    className={`py-1.5 rounded-lg text-center transition-all ${
                      selectedPaxRange === item.id
                        ? 'bg-[#82c46c] text-[#125104] font-bold shadow-sm'
                        : 'bg-[#f0f4fb] text-[#41493c] hover:bg-[#eaeef5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategori Acara */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#eaeef5]">
              <span className="text-xs font-bold text-[#171c21]">Kategori Acara</span>
              <div className="space-y-2">
                {eventCategories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer text-xs text-[#41493c] hover:text-[#171c21]">
                    <input
                      defaultChecked={cat.defaultChecked}
                      className="w-4 h-4 rounded text-[#2e6b1f] accent-[#2e6b1f]"
                      type="checkbox"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Standar & Diet Khusus */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#eaeef5]">
              <span className="text-xs font-bold text-[#171c21]">Standar Mutu &amp; Diet</span>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#41493c] hover:text-[#171c21]">
                  <input
                    checked={filterHalal}
                    onChange={(e) => setFilterHalal(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2e6b1f] accent-[#2e6b1f]"
                    type="checkbox"
                  />
                  <span>Halal MUI Grade A (100%)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[#41493c] hover:text-[#171c21]">
                  <input
                    checked={filterNoMsg}
                    onChange={(e) => setFilterNoMsg(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2e6b1f] accent-[#2e6b1f]"
                    type="checkbox"
                  />
                  <span>Tanpa MSG Sintetis</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[#41493c] hover:text-[#171c21]">
                  <input
                    checked={filterLowCal}
                    onChange={(e) => setFilterLowCal(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2e6b1f] accent-[#2e6b1f]"
                    type="checkbox"
                  />
                  <span>Rendah Kalori (&lt;500 Kcal)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[#41493c] hover:text-[#171c21]">
                  <input
                    checked={filterVegetarian}
                    onChange={(e) => setFilterVegetarian(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2e6b1f] accent-[#2e6b1f]"
                    type="checkbox"
                  />
                  <span>Plant-Based &amp; Vegetarian</span>
                </label>
              </div>
            </div>

            {/* Pengiriman Kilat Callout */}
            <div className="p-3 bg-[#f0f4fb] rounded-xl flex items-center gap-3 border border-[#dee3ea]/60">
              <div className="w-8 h-8 rounded-full bg-[#82c46c]/30 text-[#2e6b1f] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#171c21]">Express H-3 Jam</span>
                <span className="text-[10px] text-[#5b5f63]">Dapur siap kirim kilat untuk rapat mendadak</span>
              </div>
            </div>

            {/* Support Callout */}
            <div className="p-4 rounded-xl bg-[#82c46c]/10 border border-[#82c46c]/30 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#171c21]">
                <span className="material-symbols-outlined text-[18px] text-[#2e6b1f]">support_agent</span>
                <span className="text-xs font-bold">Butuh Rekomendasi Menu?</span>
              </div>
              <p className="text-[11px] text-[#41493c]">
                Tim Food Sommelier Saji.AI siap membantu kurasi susunan menu acara 200+ pax secara cuma-cuma.
              </p>
              <a
                href="https://wa.me/6281192887254"
                target="_blank"
                rel="noreferrer"
                className="mt-1 text-xs font-bold text-[#2e6b1f] hover:underline flex items-center gap-1"
              >
                <span>Konsultasi WhatsApp</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </aside>

          {/* RIGHT COLUMN: Catalog Grid & Sort Bar */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            
            {/* Status & Sort Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#dee3ea]/60">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#171c21]">
                  Menampilkan {filteredDishes.length} Menu Pilihan
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f0f4fb] text-[#2e6b1f] text-[10px] font-bold border border-[#dee3ea]/60">
                  Dapur Siap Masak
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5b5f63]">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#f0f4fb] px-3 py-1.5 rounded-full text-xs font-semibold text-[#171c21] outline-none cursor-pointer border border-[#dee3ea]/60"
                >
                  <option value="relevance">Paling Relevan &amp; Rating</option>
                  <option value="price-asc">Harga: Rendah ke Tinggi</option>
                  <option value="price-desc">Harga: Tinggi ke Rendah</option>
                  <option value="rating">Rating Tertinggi (★ 5.0)</option>
                  <option value="calories">Kalori Terendah</option>
                </select>
              </div>
            </div>

            {/* Grid Dishes */}
            {paginatedDishes.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-[#dee3ea]/60">
                <div className="w-16 h-16 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#5b5f63] mb-4">
                  <span className="material-symbols-outlined text-[32px]">no_meals</span>
                </div>
                <h3 className="text-lg font-bold text-[#171c21]">Menu Tidak Ditemukan</h3>
                <p className="text-xs text-[#5b5f63] mt-1 max-w-sm">
                  Coba longgarkan rentang anggaran atau ganti kata kunci pencarian Anda untuk melihat menu lainnya.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#82c46c] text-[#125104] text-xs font-bold shadow hover:opacity-95"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {paginatedDishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => handleOpenDetail(dish)}
                    className="bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative border border-[#dee3ea]/50 cursor-pointer"
                  >
                    {/* Badge */}
                    {dish.badge && (
                      <span
                        className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                          dish.badge === 'Best Seller'
                            ? 'bg-[#2c3136] text-white'
                            : dish.badge === 'Diet Sehat'
                            ? 'bg-[#82c46c] text-[#125104]'
                            : 'bg-[#aff496]/60 text-[#145206]'
                        }`}
                      >
                        {dish.badge}
                      </span>
                    )}

                    <div className="flex flex-col items-center text-center">
                      {/* Circular Food Image */}
                      <div className="w-36 h-36 rounded-full overflow-hidden shadow-md mt-1 mb-4 bg-[#f0f4fb] group-hover:scale-105 transition-transform duration-300 border-4 border-white">
                        <img
                          className="w-full h-full object-cover"
                          src={dish.image}
                          alt={dish.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/katalog-nasikotak.jpg';
                          }}
                        />
                      </div>

                      {/* Vendor name */}
                      <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider mb-1 line-clamp-1">
                        {dish.vendor}
                      </span>

                      {/* Dish name */}
                      <h2 className="text-sm font-bold text-[#171c21] leading-snug min-h-[40px] group-hover:text-[#2e6b1f] transition-colors">
                        {dish.name}
                      </h2>

                      {/* Rating & Nutri Pill */}
                      <div className="flex items-center justify-center gap-1.5 my-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#f0f4fb] text-[#171c21] text-[10px] font-semibold flex items-center gap-1">
                          <span className="text-amber-500 font-bold">★</span> {dish.rating}
                        </span>
                        {dish.calories > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#f0f4fb] text-[#5b5f63] text-[10px] font-semibold">
                            🔥 {dish.calories} Kcal
                          </span>
                        ) : dish.minPax ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#f0f4fb] text-[#5b5f63] text-[10px] font-semibold">
                            Min {dish.minPax} Pax
                          </span>
                        ) : null}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#5b5f63] line-clamp-2 mb-3 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Price & Add Button */}
                    <div className="pt-3 border-t border-[#eaeef5] flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] font-semibold text-[#5b5f63] block">
                          {dish.minPax ? 'Per pax' : 'Mulai dari'}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#2e6b1f]">
                          Rp {dish.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={(e) => handleAdd(dish, e)}
                        aria-label={`Tambah ${dish.name}`}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all ${
                          addedIds.has(dish.id)
                            ? 'bg-[#2e6b1f] text-white'
                            : 'bg-[#82c46c] text-[#125104] hover:bg-[#94d87d]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {addedIds.has(dish.id) ? 'done' : 'add'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Halaman Sebelumnya"
                  className="w-9 h-9 rounded-full bg-white text-[#171c21] flex items-center justify-center hover:bg-[#eaeef5] disabled:opacity-30 disabled:pointer-events-none shadow-sm border border-[#dee3ea]"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-9 h-9 rounded-full text-xs font-bold transition-all shadow-sm ${
                        currentPage === pNum
                          ? 'bg-[#2c3136] text-white'
                          : 'bg-white text-[#171c21] hover:bg-[#eaeef5] border border-[#dee3ea]'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Halaman Berikutnya"
                  className="w-9 h-9 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center hover:bg-[#94d87d] disabled:opacity-30 disabled:pointer-events-none shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  3. Metric / Trust Proof Panels (From Stitch Design)
       * ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '250+', label: 'Dapur Terakreditasi Halal' },
            { value: '99.4%', label: 'Ketepatan Waktu Kirim SLA' },
            { value: '140K+', label: 'Porsi Acara Bulanan' },
            { value: '4.9/5', label: 'Tingkat Kepuasan HR & GA' },
          ].map((m) => (
            <div key={m.label} className="bg-[#82c46c]/15 border border-[#82c46c]/25 rounded-2xl p-6 flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#125104]">{m.value}</span>
              <span className="text-xs text-[#41493c] font-semibold mt-1">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
       *  4. Floating Sticky Cart Bar (Shown when Cart has items)
       * ─────────────────────────────────────────────────────────── */}
      {cartItemCount > 0 && (
        <div className="sticky bottom-6 z-40 max-w-4xl mx-auto px-4 w-full animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#2c3136] text-white rounded-3xl p-4 sm:px-6 sm:py-3.5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
            {/* Cart Meta */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={onOpenCart}
                className="w-12 h-12 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                title="Buka Keranjang"
              >
                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              </button>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Keranjang Acara ({cartItemCount} Menu)</span>
                  <button
                    type="button"
                    onClick={onOpenCart}
                    className="text-[10px] text-[#94d87d] font-bold hover:underline"
                  >
                    Lihat Rincian
                  </button>
                </div>
                <span className="text-xs text-[#dee3ea]">
                  Est. Pengiriman: Terjadwal Tepat Waktu
                </span>
              </div>
            </div>

            {/* Price Total & Checkout */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold text-[#dee3ea]/70">Subtotal Keranjang</span>
                <span className="text-lg font-extrabold text-[#94d87d]">
                  Rp {cartSubtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <Link
                to="/pricing"
                className="px-6 py-3 rounded-full bg-[#82c46c] text-[#125104] text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-[#94d87d] shadow-md active:scale-95 transition-all"
              >
                <span>Checkout SajiEscrow™</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Micro Escrow Pill */}
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[#41493c] text-[10px] font-bold shadow-xs border border-[#dee3ea]">
              <span className="material-symbols-outlined text-[#2e6b1f] text-[14px]">shield</span>
              <span><strong>SajiEscrow™:</strong> Dana hanya diteruskan ke mitra setelah makanan diterima hangat &amp; sesuai pesanan.</span>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
       *  5. Interactive Quick View Dish Modal
       * ─────────────────────────────────────────────────────────── */}
      {quickViewDish && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#dee3ea]">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setQuickViewDish(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f0f4fb] text-[#41493c] flex items-center justify-center hover:bg-[#dee3ea] transition-colors"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Dish Photo */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg shrink-0 border-4 border-[#f0f4fb]">
                <img
                  className="w-full h-full object-cover"
                  src={quickViewDish.image}
                  alt={quickViewDish.name}
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-[10px] font-bold text-[#2e6b1f] bg-[#82c46c]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {quickViewDish.vendor}
                  </span>
                  {quickViewDish.badge && (
                    <span className="text-[10px] font-bold text-white bg-[#2c3136] px-2.5 py-0.5 rounded-full">
                      {quickViewDish.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-[#171c21]">{quickViewDish.name}</h2>
                <p className="text-xs text-[#5b5f63] leading-relaxed">{quickViewDish.description}</p>

                {/* Macro Nutrition Badges */}
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start my-2 text-[11px] font-semibold">
                  <span className="bg-[#f0f4fb] px-2.5 py-1 rounded-lg text-[#171c21]">
                    🔥 {quickViewDish.calories} Kalori
                  </span>
                  {quickViewDish.protein && (
                    <span className="bg-[#f0f4fb] px-2.5 py-1 rounded-lg text-[#171c21]">
                      🥩 {quickViewDish.protein}g Protein
                    </span>
                  )}
                  {quickViewDish.carbs && (
                    <span className="bg-[#f0f4fb] px-2.5 py-1 rounded-lg text-[#171c21]">
                      🍚 {quickViewDish.carbs}g Karbo
                    </span>
                  )}
                  {quickViewDish.rating && (
                    <span className="bg-[#f0f4fb] px-2.5 py-1 rounded-lg text-amber-700">
                      ★ {quickViewDish.rating} / 5.0
                    </span>
                  )}
                </div>

                {/* Standard Badges */}
                <div className="space-y-1.5 text-xs text-[#41493c] bg-[#f0f4fb] p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2e6b1f] text-[16px]">verified</span>
                    <span><strong>Sertifikasi:</strong> {quickViewDish.halalCert}</span>
                  </div>
                  {quickViewDish.packaging && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#2e6b1f] text-[16px]">takeout_dining</span>
                      <span><strong>Kemasan:</strong> {quickViewDish.packaging}</span>
                    </div>
                  )}
                  {quickViewDish.leadTime && (
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#2e6b1f] text-[16px]">schedule</span>
                      <span><strong>Waktu Siap:</strong> {quickViewDish.leadTime}</span>
                    </div>
                  )}
                </div>

                {/* Price and Add Action */}
                <div className="pt-4 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#eaeef5]">
                  <div>
                    <span className="text-[10px] text-[#5b5f63] font-semibold block">Harga Satuan</span>
                    <span className="text-2xl font-bold text-[#2e6b1f]">
                      Rp {quickViewDish.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Stepper */}
                    <div className="flex items-center bg-[#f0f4fb] rounded-full p-1 border border-[#dee3ea]">
                      <button
                        type="button"
                        onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#171c21] shadow-xs"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-[#171c21]">{modalQty}</span>
                      <button
                        type="button"
                        onClick={() => setModalQty((q) => q + 1)}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#171c21] shadow-xs"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        for (let i = 0; i < modalQty; i++) {
                          handleAdd(quickViewDish);
                        }
                        setQuickViewDish(null);
                      }}
                      className="px-6 py-3 rounded-full bg-[#82c46c] text-[#125104] font-bold text-xs sm:text-sm hover:bg-[#94d87d] shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                      <span>Tambah ({modalQty} Porsi)</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KatalogPage;
