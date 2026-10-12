import React, { useState } from 'react';

export const AIPlannerSection: React.FC = () => {
  const [portionCount, setPortionCount] = useState<number>(50);
  const [budgetPerPortion, setBudgetPerPortion] = useState<number>(35000);
  const [dietaryType, setDietaryType] = useState<string>('nusantara-balanced');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<{
    title: string;
    items: string[];
    avgCalories: number;
    totalCost: number;
    matchScore: number;
  } | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult({
        title:
          dietaryType === 'nusantara-balanced'
            ? 'Paket Nusantara Smart Corporate'
            : dietaryType === 'low-carb'
            ? 'Paket Fit Protein & Fibre Lean'
            : 'Paket Gourmet Executive Meeting',
        items:
          dietaryType === 'nusantara-balanced'
            ? [
                'Nasi Pandan Wangi Organik',
                'Ayam Panggang Bumbu Rujak (Zero Santan Kental)',
                'Tumis Buncis Jagung Manis Baby Corn',
                'Tahu Tempe Bacem Gurih',
                'Sambal Bajak Segar & Buah Potong Semangka',
              ]
            : dietaryType === 'low-carb'
            ? [
                'Brown Rice / Quinoa Base',
                'Pan-seared Salmon Fillet Teriyaki',
                'Steamed Broccolini & Cherry Tomatoes',
                'Boiled Omega-3 Egg with Herbs',
                'Infused Lemon Mint Drink',
              ]
            : [
                'Gourmet Beef Tenderloin Demi-glace',
                'Mashed Potatoes with Truffle Essence',
                'Grilled Asparagus & Portobello Mushroom',
                'Classic Caesar Salad with Crisp Croutons',
                'Artisan Pastry Dessert',
              ],
        avgCalories: dietaryType === 'low-carb' ? 420 : 560,
        totalCost: portionCount * budgetPerPortion,
        matchScore: 98,
      });
    }, 1200);
  };

  return (
    <section id="ai-planner" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="bg-gradient-to-br from-[#171c21] via-[#2c3136] to-[#125104] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#82c46c]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#82c46c]/20 text-[#aff496] text-xs font-bold mb-4 tracking-wider uppercase border border-[#82c46c]/30">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            Fitur Utama PRD V3 &bull; AI Smart Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Rancang Paket Katering Sesuai Budget dalam 3 Detik
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mx-auto">
            Masukkan jumlah tamu dan batas anggaran kantor Anda. Asisten AI kami akan menyusun kombinasi menu bernutrisi seimbang dan siap dibroadcast ke vendor katering terverifikasi (RFQ Tender).
          </p>
        </div>

        {/* Input Parameters Box */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            
            {/* Jumlah Porsi */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1.5">
                Jumlah Porsi Tamu
              </label>
              <div className="flex items-center bg-white/20 rounded-full px-3 py-2 border border-white/20">
                <span className="material-symbols-outlined text-[18px] text-[#aff496] mr-2">
                  group
                </span>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={portionCount}
                  onChange={(e) => setPortionCount(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-bold text-white outline-none"
                />
                <span className="text-xs text-gray-300 font-medium">Porsi</span>
              </div>
            </div>

            {/* Pagu Budget per Porsi */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1.5">
                Budget / Porsi
              </label>
              <div className="flex items-center bg-white/20 rounded-full px-3 py-2 border border-white/20">
                <span className="text-xs font-bold text-[#aff496] mr-2">Rp</span>
                <input
                  type="number"
                  step="2000"
                  min="20000"
                  max="500000"
                  value={budgetPerPortion}
                  onChange={(e) => setBudgetPerPortion(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-bold text-white outline-none"
                />
              </div>
            </div>

            {/* Preferensi Diet */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1.5">
                Tema / Preferensi
              </label>
              <select
                value={dietaryType}
                onChange={(e) => setDietaryType(e.target.value)}
                className="w-full bg-white/20 rounded-full px-3 py-2 border border-white/20 text-xs sm:text-sm font-bold text-white outline-none focus:bg-white/30"
              >
                <option value="nusantara-balanced" className="bg-[#171c21] text-white">
                  Nusantara Sehat
                </option>
                <option value="low-carb" className="bg-[#171c21] text-white">
                  Healthy High Protein
                </option>
                <option value="executive" className="bg-[#171c21] text-white">
                  Executive VIP Meeting
                </option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-full bg-[#82c46c] text-[#125104] font-extrabold text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <span className="animate-spin">⚙️</span>
                <span>AI sedang menghitung kalori &amp; pagu anggaran...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Generate Rekomendasi Menu Cerdas (AI Proposal)</span>
              </>
            )}
          </button>
        </div>

        {/* AI Output Result Box */}
        {generatedResult && (
          <div className="relative z-10 mt-6 bg-white text-[#171c21] rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl animate-in fade-in-50 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#eaeef5] gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-[#2e6b1f] uppercase tracking-wider">
                    Hasil Rekomendasi AI Engine
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-1">{generatedResult.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-[#82c46c]/20 text-[#2e6b1f] px-3 py-1 rounded-full">
                  Kesesuaian Budget: {generatedResult.matchScore}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div>
                <h4 className="text-xs font-bold text-[#5b5f63] uppercase tracking-wider mb-2">
                  Draf Komposisi Menu:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#171c21]">
                  {generatedResult.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#82c46c]/30 text-[#125104] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f7f9ff] p-5 rounded-2xl border border-[#dee3ea] flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#5b5f63] uppercase tracking-wider mb-2">
                    Kalkulasi Finansial &amp; Nutrisi:
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#5b5f63]">Estimasi Kalori / Porsi:</span>
                      <span className="font-bold text-[#a83639]">🔥 ~{generatedResult.avgCalories} Kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5b5f63]">Jumlah Pesanan:</span>
                      <span className="font-bold">{portionCount} Porsi</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5b5f63]">Harga Satuan:</span>
                      <span className="font-bold">Rp {budgetPerPortion.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#dee3ea] text-sm">
                      <span className="font-bold">Total Estimasi Tender:</span>
                      <span className="font-extrabold text-[#2e6b1f]">
                        Rp {generatedResult.totalCost.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#dee3ea]">
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `RFQ Tender berhasil dibuat untuk ${portionCount} porsi dengan total pagu Rp ${generatedResult.totalCost.toLocaleString(
                          'id-ID'
                        )}. Sistem akan meneruskan tender ke dapur mitra terverifikasi!`
                      )
                    }
                    className="w-full py-2.5 rounded-full bg-[#2c3136] text-[#edf1f8] font-bold text-xs hover:bg-[#171c21] transition-colors shadow-xs"
                  >
                    📢 Broadcast RFQ Tender ke Vendor Mitra
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
