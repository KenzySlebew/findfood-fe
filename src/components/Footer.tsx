import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#eaeef5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1 & 2: Brand Information */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 w-fit group">
              <div className="w-10 h-10 rounded-full bg-[#82c46c]/20 flex items-center justify-center text-[#2e6b1f] group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">skillet</span>
              </div>
              <span className="font-bold text-xl text-[#171c21] tracking-tight">
                Saji<span className="text-[#2e6b1f]">.AI</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-[#41493c] max-w-sm leading-relaxed">
              Saji.AI &mdash; Good food and good life for corporate &amp; events. Solusi katering cerdas berbasis AI untuk kebutuhan pertemuan kantor, makan siang tim, dan perhelatan istimewa dengan proteksi transaksi SajiEscrow™.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-[#2e6b1f] bg-[#82c46c]/15 px-3 py-1.5 rounded-full w-fit border border-[#82c46c]/30">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              100% Bersertifikasi Halal MUI &amp; Higienis BPOM
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://saji.ai"
                target="_blank"
                rel="noreferrer"
                aria-label="Public Feed"
                className="w-9 h-9 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#41493c] hover:text-[#2e6b1f] hover:bg-[#82c46c]/20 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                href="https://wa.me/6281192887254"
                target="_blank"
                rel="noreferrer"
                aria-label="Call Support"
                className="w-9 h-9 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#41493c] hover:text-[#2e6b1f] hover:bg-[#82c46c]/20 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
              <Link
                to="/ai-planner"
                aria-label="AI Planner"
                className="w-9 h-9 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#41493c] hover:text-[#2e6b1f] hover:bg-[#82c46c]/20 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </Link>
            </div>
          </div>

          {/* Column 3: Layanan Kami */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm text-[#171c21]">Layanan &amp; Fitur</span>
            <Link to="/katalog" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Katalog Bento &amp; Prasmanan
            </Link>
            <Link to="/ai-planner" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors flex items-center gap-1">
              <span>AI Smart Planner &amp; RFQ</span>
              <span className="px-1.5 py-0.2 rounded bg-[#82c46c]/20 text-[#125104] text-[9px] font-bold">Baru</span>
            </Link>
            <Link to="/pricing" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Paket Langganan Kantor
            </Link>
            <Link to="/pricing" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Garansi SajiEscrow™
            </Link>
            <Link to="/tracking" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Pelacakan Kurir Real-Time
            </Link>
            <Link to="/dashboard" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Portal Client &amp; Vendor
            </Link>
          </div>

          {/* Column 4: Perusahaan */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm text-[#171c21]">Perusahaan &amp; Regulasi</span>
            <Link to="/" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Tentang Saji.AI
            </Link>
            <Link to="/dashboard" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Mitra Dapur &amp; Vendor
            </Link>
            <Link to="/pricing" className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors">
              Standar Higiene &amp; Halal
            </Link>
            <a
              href="https://wa.me/6281192887254"
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm text-[#41493c] hover:text-[#2e6b1f] transition-colors"
            >
              Kontak Tim Finance &amp; GA
            </a>
          </div>

          {/* Column 5: Buletin Singkat */}
          <div className="flex flex-col gap-3">
            <span className="font-bold text-sm text-[#171c21]">Buletin &amp; Promo</span>
            <p className="text-xs text-[#41493c]">
              Dapatkan panduan menu mingguan dan penawaran korporat eksklusif ke surel Anda.
            </p>
            <div className="flex items-center rounded-full bg-[#f0f4fb] p-1.5 focus-within:ring-2 focus-within:ring-[#82c46c]/40 border border-[#dee3ea]">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="w-full bg-transparent px-3 py-1 text-xs text-[#171c21] placeholder:text-[#5b5f63] outline-none"
              />
              <button
                type="button"
                onClick={() => alert('Terima kasih! Anda telah terdaftar untuk menerima info promo.')}
                aria-label="Kirim Email"
                className="w-8 h-8 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#eaeef5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5b5f63]">
            &copy; 2026 Saji.AI Platform Katering Nusantara. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="text-xs text-[#5b5f63] hover:text-[#171c21] transition-colors">
              Kebijakan Escrow
            </Link>
            <Link to="/pricing" className="text-xs text-[#5b5f63] hover:text-[#171c21] transition-colors">
              Syarat Layanan
            </Link>
            <a
              href="https://wa.me/6281192887254"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#5b5f63] hover:text-[#171c21] transition-colors"
            >
              Bantuan Hotline 24/7
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
