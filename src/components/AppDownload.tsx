import React from 'react';

export const AppDownload: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="bg-[#82c46c]/30 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 border border-[#82c46c]/20">
        
        {/* Left Content */}
        <div className="max-w-xl z-10 text-left">
          <span className="text-xs font-bold text-[#2e6b1f] tracking-widest uppercase mb-2 block">
            Aplikasi Seluler Saji.AI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171c21] tracking-tight mb-4 leading-tight">
            Download Our Mobile<br />App to Make it Easier
          </h2>
          <p className="text-sm sm:text-base text-[#41493c] mb-8 max-w-md leading-relaxed">
            Pesan makanan katering, pantau lokasi kurir thermo-box secara real-time, dan sesuaikan preferensi kalori tim Anda kapan saja dan di mana saja.
          </p>

          {/* Download Badges */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* App Store Badge */}
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-[#2c3136] text-[#edf1f8] px-6 py-3 rounded-full hover:bg-[#171c21] transition-colors shadow-md"
            >
              <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
              <div className="text-left">
                <span className="block text-[10px] leading-none opacity-80 uppercase tracking-wider">
                  Download on the
                </span>
                <span className="text-sm font-bold leading-tight">App Store</span>
              </div>
            </a>

            {/* Google Play Badge */}
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-[#2c3136] text-[#edf1f8] px-6 py-3 rounded-full hover:bg-[#171c21] transition-colors shadow-md"
            >
              <span className="material-symbols-outlined text-[24px]">android</span>
              <div className="text-left">
                <span className="block text-[10px] leading-none opacity-80 uppercase tracking-wider">
                  GET IT ON
                </span>
                <span className="text-sm font-bold leading-tight">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Graphic / Chef & Mobile Mockup */}
        <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center shrink-0">
          
          {/* Chef Oval Shape Image */}
          <div className="w-56 h-80 sm:w-64 sm:h-96 rounded-full overflow-hidden shadow-2xl bg-[#eaeef5] relative z-10 border-4 border-white">
            <img
              src="/images/app-chef.jpg"
              alt="Executive Saji Chef"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating UI Screen Mockup */}
          <div className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 w-52 sm:w-64 bg-white rounded-3xl p-4 shadow-2xl z-20 hidden sm:block border border-[#dee3ea]">
            <div className="flex items-center justify-between mb-3 text-[#171c21]">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">location_on</span>
                <span className="truncate">Sudirman, Jakarta</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#5b5f63]">notifications</span>
            </div>

            <span className="text-xs font-bold text-[#171c21] block mb-0.5">
              Selamat Siang, Rehan!
            </span>
            <span className="text-[11px] text-[#5b5f63] block mb-3">
              Jadwal menu tim hari ini:
            </span>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#f0f4fb] mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#82c46c] flex items-center justify-center text-[#125104] font-bold text-xs">
                  ✓
                </div>
                <span className="text-xs font-bold text-[#171c21]">Grilled Salmon</span>
              </div>
              <span className="text-[10px] font-extrabold text-[#2e6b1f] bg-[#82c46c]/30 px-2 py-0.5 rounded-full">
                DIKIRIM
              </span>
            </div>

            <div className="text-[10px] text-[#5b5f63] flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">thermostat</span>
              Suhu terjaga di thermo-box: 65°C
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
