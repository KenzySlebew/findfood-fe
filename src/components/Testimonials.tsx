import React from 'react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Robert Fox',
      role: 'Web Designer & Event PIC',
      image: '/images/reviewer-robert.jpg',
      quote:
        '“Sistem pemilihan menu katering Saji.AI sangat presisi. Seluruh karyawan kantor puas dengan ketepatan waktu pengantaran dan rasa masakan yang hangat konsisten.”',
      stars: 5,
    },
    {
      name: 'Sarah Jenkins',
      role: 'HR & Corporate Event Lead',
      image: '/images/reviewer-sarah.jpg',
      quote:
        '“Garansi SajiEscrow benar-benar memberi rasa tenang untuk event tahunan kami dengan 500 porsi. Rekomendasi porsi kalkulator AI sangat hemat budget!”',
      stars: 5,
    },
    {
      name: 'Dimas Anggara',
      role: 'Operations Director',
      image: '/images/reviewer-dimas.jpg',
      quote:
        '“Kombinasi bento box nusantara dan salmon bowl sangat diminati tim tech kami. Ganti menu harian semudah satu sentuhan di aplikasi web & mobile.”',
      stars: 5,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-bold text-[#2e6b1f] tracking-widest uppercase mb-1 block">
          Social Proof
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#171c21] tracking-tight mb-2">
          Customer thoughts
        </h2>
        <p className="text-sm sm:text-base text-[#41493c]">
          Which is what our popular customers are saying
        </p>
      </div>

      {/* 3 Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reviews.map((rev) => (
          <div
            key={rev.name}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#dee3ea]/60"
          >
            <p className="text-xs sm:text-sm text-[#41493c] mb-6 leading-relaxed italic">
              {rev.quote}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#eaeef5]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#eaeef5] shrink-0 border border-[#dee3ea]">
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#171c21] block leading-tight">
                    {rev.name}
                  </span>
                  <span className="text-[11px] text-[#5b5f63]">
                    {rev.role}
                  </span>
                </div>
              </div>

              {/* 5 Stars */}
              <div className="flex text-amber-500 text-[16px]">
                {Array.from({ length: rev.stars }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Discs */}
      <div className="flex items-center justify-center gap-3 mt-10">
        <button
          type="button"
          aria-label="Ulasan sebelumnya"
          className="w-10 h-10 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center hover:opacity-90 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <button
          type="button"
          aria-label="Ulasan selanjutnya"
          className="w-10 h-10 rounded-full bg-white text-[#171c21] flex items-center justify-center hover:bg-[#dee3ea] shadow-sm border border-[#dee3ea]"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
