import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PricingSectionProps {
  onSelectPlan: (plan: string, price: number) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelect = (plan: string, price: number) => {
    setSelectedPlan(plan);
    onSelectPlan(plan, price);
  };

  return (
    <section id="harga-paket" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-bold text-[#2e6b1f] tracking-widest uppercase mb-1 block">
          Paket Berlangganan
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#171c21] tracking-tight mb-2">
          Pricing
        </h2>
        <p className="text-sm sm:text-base text-[#41493c]">
          Choose the plan that works best for you &bull; Bebas ganti menu kapan saja
        </p>
      </div>

      {/* Comparative Cards (Weekly vs Monthly) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Card 1: Weekly (Green Highlighted Container) */}
        <div className="bg-[#82c46c]/25 hover:bg-[#82c46c]/35 rounded-3xl p-8 flex flex-col justify-between shadow-sm border border-[#82c46c]/30 transition-all duration-300 relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-[#2e6b1f] uppercase tracking-wide">
                  Paket Percobaan
                </span>
                <h3 className="text-2xl font-bold text-[#171c21]">Weekly</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#171c21]">Rp 250.000</span>
                <span className="text-xs text-[#5b5f63] block">/ minggu</span>
              </div>
            </div>

            {/* Feature checkmarks */}
            <ul className="space-y-3.5 my-6 text-xs sm:text-sm text-[#171c21]">
              {[
                '1 Week package catering',
                '2 Meals per day (Lunch & Dinner)',
                'Choose preferred menus freely',
                'Complementary infused meal drink',
                'Rewards Points akumulatif',
                'Lifestyle & nutrition advice',
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#171c21] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[13px]">check</span>
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleSelect('Weekly', 250000)}
            className="w-full py-3.5 rounded-full bg-[#2c3136] text-[#edf1f8] font-bold text-sm hover:bg-[#171c21] transition-all shadow-sm hover:shadow"
          >
            {selectedPlan === 'Weekly' ? '✓ Paket Dipilih' : 'Get plan'}
          </button>
        </div>

        {/* Card 2: Monthly (Clean White Card) */}
        <div className="bg-white rounded-3xl p-8 flex flex-col justify-between shadow-md border-2 border-[#82c46c] transition-all duration-300 relative">
          
          {/* Most Popular Badge */}
          <div className="absolute -top-3.5 right-8 bg-[#82c46c] text-[#125104] text-[11px] font-extrabold px-3.5 py-1 rounded-full shadow-sm">
            PALING DIMINATI KANTOR
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-[#2e6b1f] uppercase tracking-wide">
                  Langganan Penuh
                </span>
                <h3 className="text-2xl font-bold text-[#171c21]">Monthly</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#171c21]">Rp 950.000</span>
                <span className="text-xs text-[#5b5f63] block">/ bulan</span>
              </div>
            </div>

            {/* Feature checkmarks */}
            <ul className="space-y-3.5 my-6 text-xs sm:text-sm text-[#171c21]">
              {[
                '1 Month full subscription',
                '3 Meals per day (Breakfast, Lunch, Dinner)',
                'Choose preferred menus & dietary goals',
                'Complementary snack & juice box',
                'SajiEscrow™ Corporate protection',
                'Dedicated culinary account manager',
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[13px]">check</span>
                  </span>
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleSelect('Monthly', 950000)}
            className="w-full py-3.5 rounded-full bg-[#82c46c] text-[#125104] font-extrabold text-sm hover:opacity-95 transition-all shadow-md hover:scale-[1.01]"
          >
            {selectedPlan === 'Monthly' ? '✓ Paket Dipilih' : 'Get plan'}
          </button>
        </div>

      </div>

      {/* Explore Full Pricing & Escrow Simulator */}
      <div className="flex justify-center mt-12">
        <Link
          to="/pricing"
          className="px-8 py-3.5 rounded-full bg-[#f0f4fb] hover:bg-[#eaeef5] text-[#171c21] text-xs sm:text-sm font-bold border border-[#dee3ea] transition-all flex items-center gap-2 group"
        >
          <span>Lihat Rincian SajiEscrow™ &amp; Kalkulator Tender RFQ</span>
          <span className="material-symbols-outlined text-[18px] text-[#2e6b1f] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
};
