import React from 'react';

export const StatsBar: React.FC = () => {
  const stats = [
    { value: '10K+', label: 'Total customers', desc: 'Pelanggan korporat & perorangan' },
    { value: '09+', label: 'Years of experience', desc: 'Dalam industri katering profesional' },
    { value: '12K', label: 'Total destinations', desc: 'Titik pengantaran di Jabodetabek & kota besar' },
    { value: '4.9', label: 'Average rating', desc: 'Dari 25.000+ ulasan terverifikasi' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#82c46c]/25 hover:bg-[#82c46c]/35 rounded-3xl p-6 sm:p-8 text-center flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 border border-[#82c46c]/20"
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171c21] tracking-tight mb-1">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#171c21]">
              {stat.label}
            </span>
            <span className="text-[11px] text-[#41493c] hidden sm:inline mt-0.5">
              {stat.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
