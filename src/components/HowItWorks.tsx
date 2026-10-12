import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01.',
      title: 'Fresh & Nutritious',
      desc: 'Bahan segar pilihan bersertifikasi dengan kalkulasi nutrisi dan porsi akurat via AI.',
      icon: 'nutrition',
    },
    {
      step: '02.',
      title: 'Pick Meals',
      desc: 'Pilih ratusan variasi menu bento, prasmanan, atau racik custom menu sesuai budget.',
      icon: 'restaurant_menu',
    },
    {
      step: '03.',
      title: 'Place A Order',
      desc: 'Sistem checkout instan bergaransi SajiEscrow™ aman dengan rekber pihak ketiga terpercaya.',
      icon: 'verified_user',
    },
    {
      step: '04.',
      title: 'Fast Delivery',
      desc: 'Kurir terlatih dengan thermo-box menjaga kehangatan dan kesegaran tepat sebelum acara dimulai.',
      icon: 'local_shipping',
    },
  ];

  return (
    <section id="cara-kerja" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#2e6b1f] tracking-widest uppercase mb-1 block">
          Alur Sederhana
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#171c21] tracking-tight mb-2">
          How it works
        </h2>
        <p className="text-sm sm:text-base text-[#41493c]">
          Solusi pemesanan katering cerdas dengan 4 alur simpel terintegrasi AI
        </p>
      </div>

      {/* 4 Step Green Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-[#82c46c]/20 hover:bg-[#82c46c]/30 p-8 rounded-3xl flex flex-col justify-between min-h-[240px] transition-all duration-300 hover:-translate-y-1 hover:shadow-sm border border-[#82c46c]/20"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-[#2c3136] text-[#edf1f8] font-bold text-xs flex items-center justify-center shadow-xs">
                {item.step}
              </div>
              <span className="material-symbols-outlined text-[24px] text-[#2e6b1f]/60">
                {item.icon}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-lg text-[#171c21] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#41493c] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
