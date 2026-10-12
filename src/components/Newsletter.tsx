import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 sm:p-10 bg-[#eaeef5] rounded-3xl border border-[#dee3ea]/60">
        
        {/* Left Headline */}
        <div className="text-left max-w-md">
          <span className="text-xs font-bold text-[#2e6b1f] uppercase tracking-wider block mb-1">
            Tetap Terhubung
          </span>
          <h3 className="text-2xl font-bold text-[#171c21] mb-1">
            Our Newsletter
          </h3>
          <p className="text-xs sm:text-sm text-[#41493c]">
            Dapatkan update menu mingguan, panduan nutrisi, &amp; promo diskon tender katering korporat.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-auto flex-1 max-w-md">
          {isSubscribed ? (
            <div className="bg-white rounded-full px-5 py-3 text-emerald-700 text-xs font-bold flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Terima kasih! Email Anda telah terdaftar di buletin Saji.AI.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center rounded-full bg-white p-1.5 shadow-sm border border-[#dee3ea]"
            >
              <span className="material-symbols-outlined text-[#5b5f63] ml-3 text-[20px]">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat email kantor / pribadi"
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-[#171c21] placeholder:text-[#5b5f63] outline-none"
              />
              <button
                type="submit"
                aria-label="Langganan newsletter"
                className="w-10 h-10 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
