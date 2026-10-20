import React from 'react';

interface HeroSectionProps {
  onOpenOrder: () => void;
  onExploreMenu?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrder,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16 text-center">
      
      {/* Main Headline with Hand-drawn Doodle around 'Fresh' */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Micro Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] text-xs font-bold mb-6 tracking-wide shadow-xs">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          REVOLUSI KATERING MULTI-VENDOR V3 &bull; DIDUKUNG AI PLANNER
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171c21] tracking-tight mb-4 leading-tight">
          Your Favorite Food<br />
          Delivered Hot &amp;{' '}
          <span className="relative inline-block px-3 py-0.5">
            Fresh
            {/* Organic Hand-drawn Loop SVG accent */}
            <svg
              className="absolute -inset-x-2 -inset-y-1.5 w-[calc(100%+16px)] h-[calc(100%+12px)] pointer-events-none text-[#82c46c]"
              fill="none"
              viewBox="0 0 160 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 28C8 14 34 5 80 6C130 7 152 18 150 34C147 48 116 55 76 54C28 53 4 45 10 24C12 18 24 12 40 10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.5"
              />
            </svg>
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#41493c] max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Best food catering service in your town. Layanan katering korporat dan harian terbaik didukung{' '}
          <strong className="font-semibold text-[#171c21]">AI Smart Planner</strong> &amp; Garansi{' '}
          <span className="text-[#2e6b1f] font-semibold">SajiEscrow™</span> higienis langsung ke mejamu.
        </p>

        {/* Call To Action */}
        <div className="flex items-center justify-center mb-14">
          <button
            type="button"
            onClick={onOpenOrder}
            className="px-9 py-4 rounded-full bg-[#82c46c] text-[#125104] font-extrabold text-base shadow-md hover:scale-[1.03] hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            <span>Pesan Sekarang</span>
          </button>
        </div>
      </div>

      {/* Multi-dish Floating Carousel Showcase (5 Organic Curved Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center max-w-6xl mx-auto mb-8">
        
        {/* Dish 1: Fresh Salad Bowl */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm h-64 sm:h-72 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
          <img
            src="/images/hero-salad.jpg"
            alt="Wholesome poke salad bowl"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-semibold backdrop-blur-xs px-2 py-0.5 rounded-md">
              Fresh Salad Bowl
            </span>
          </div>
        </div>

        {/* Dish 2: Grilled Skewers Platter */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm h-64 sm:h-80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
          <img
            src="/images/hero-sate.jpg"
            alt="Artisanal Indonesian sate feast"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-semibold backdrop-blur-xs px-2 py-0.5 rounded-md">
              Sate Nusantara
            </span>
          </div>
        </div>

        {/* Dish 3: Centerpiece Gourmet Steak & Broccolini (Hero Dish) */}
        <div className="col-span-2 sm:col-span-1 relative overflow-hidden rounded-3xl bg-white shadow-lg h-72 sm:h-96 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ring-2 ring-[#82c46c]/40 group">
          <img
            src="/images/hero-steak.jpg"
            alt="Fine dining tender tenderloin steak"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#82c46c] text-[#125104] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
            Chef Highlight
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <div className="text-left">
              <span className="text-white text-sm font-bold block leading-tight">
                Gourmet Tenderloin
              </span>
              <span className="text-white/80 text-xs">Pilihan Acara Direksi</span>
            </div>
          </div>
        </div>

        {/* Dish 4: Courier Hygiene Handover */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm h-64 sm:h-80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
          <img
            src="/images/hero-courier.jpg"
            alt="Saji courier eco-friendly delivery"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-semibold backdrop-blur-xs px-2 py-0.5 rounded-md">
              Thermo-Box Express
            </span>
          </div>
        </div>

        {/* Dish 5: Gourmet Mexican Artisan Tacos */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm h-64 sm:h-72 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
          <img
            src="/images/hero-tacos.jpg"
            alt="Gourmet Mexican artisan tacos"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-semibold backdrop-blur-xs px-2 py-0.5 rounded-md">
              Artisan Tacos
            </span>
          </div>
        </div>

      </div>

      {/* Dots pagination indicator */}
      <div className="flex items-center justify-center gap-2">
        <span className="w-6 h-2 rounded-full bg-[#82c46c]"></span>
        <span className="w-2 h-2 rounded-full bg-[#dee3ea]"></span>
        <span className="w-2 h-2 rounded-full bg-[#dee3ea]"></span>
      </div>
    </section>
  );
};
