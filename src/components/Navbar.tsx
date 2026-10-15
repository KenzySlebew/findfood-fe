import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
  onLogout: () => void;
  onOpenCart: () => void;
  cartCount: number;
  backendOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onLogout,
  onOpenCart,
  cartCount,
  backendOnline,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-xl border-b border-[#eaeef5]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-full bg-[#82c46c]/20 flex items-center justify-center text-[#2e6b1f] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">skillet</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-[#171c21] tracking-tight leading-none">
              Saji<span className="text-[#2e6b1f]">.AI</span>
            </span>
            <span className="text-[10px] text-[#5b5f63] font-medium tracking-wide">
              SMART CATERING
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentPath === '/' ? 'bg-[#82c46c] text-[#125104] shadow-sm' : 'text-[#41493c] hover:text-[#171c21] hover:bg-[#f0f4fb]'
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/katalog"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentPath === '/katalog' ? 'bg-[#82c46c] text-[#125104] shadow-sm' : 'text-[#41493c] hover:text-[#171c21] hover:bg-[#f0f4fb]'
            }`}
          >
            Menu &amp; Katalog
          </Link>
          <a
            href={currentPath === '/' ? '#cara-kerja' : '/#cara-kerja'}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#41493c] hover:text-[#171c21] hover:bg-[#f0f4fb] transition-all"
          >
            Cara Kerja
          </a>
          <a
            href={currentPath === '/' ? '#katering-acara' : '/#katering-acara'}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#41493c] hover:text-[#171c21] hover:bg-[#f0f4fb] transition-all"
          >
            Katering Acara
          </a>
          <Link
            to="/pricing"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentPath === '/pricing' ? 'bg-[#82c46c] text-[#125104] shadow-sm' : 'text-[#41493c] hover:text-[#171c21] hover:bg-[#f0f4fb]'
            }`}
          >
            Harga &amp; Paket
          </Link>
          <Link
            to="/ai-planner"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
              currentPath === '/ai-planner'
                ? 'bg-[#82c46c] text-[#125104] shadow-sm'
                : 'text-[#2e6b1f] bg-[#aff496]/40 hover:bg-[#aff496]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            AI Planner
          </Link>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Backend Health Badge */}
          <div
            title={backendOnline ? 'Backend Express Terhubung (Port 5000)' : 'Menghubungkan ke Backend...'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              backendOnline
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="hidden md:inline">{backendOnline ? 'API Aktif' : 'Cek API...'}</span>
          </div>

          {/* Search Button & Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Pencarian"
              className="w-10 h-10 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#41493c] hover:text-[#171c21] hover:bg-[#eaeef5] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl p-3 border border-[#dee3ea] z-50">
                <div className="flex items-center gap-2 bg-[#f0f4fb] px-3 py-2 rounded-full">
                  <span className="material-symbols-outlined text-[18px] text-[#5b5f63]">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari bento, liwet, porsi..."
                    className="w-full bg-transparent text-xs text-[#171c21] outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#5b5f63] hover:text-black"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Bag Icon with Live Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Keranjang Belanja"
              className="w-10 h-10 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#41493c] hover:text-[#171c21] hover:bg-[#eaeef5] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#2e6b1f] text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </div>

          {/* User Auth Buttons / Dropdown */}
          {user ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-[#171c21] truncate max-w-[120px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-[#2e6b1f] font-semibold">
                  {user.role === 'VENDOR' ? 'Mitra Toko' : 'Client PIC'}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                title="Keluar Akun"
                className="w-9 h-9 rounded-full bg-[#2e6b1f] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-[#171c21] hover:text-[#2e6b1f] transition-colors"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#82c46c] text-[#125104] text-sm font-bold shadow-sm hover:opacity-95 hover:shadow transition-all"
              >
                Pesan Sekarang
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#41493c]"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#eaeef5] px-6 py-4 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-semibold ${
              currentPath === '/' ? 'bg-[#82c46c]/20 text-[#2e6b1f]' : 'text-[#41493c] hover:bg-[#f0f4fb]'
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/katalog"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-semibold ${
              currentPath === '/katalog' ? 'bg-[#82c46c]/20 text-[#2e6b1f]' : 'text-[#41493c] hover:bg-[#f0f4fb]'
            }`}
          >
            Menu &amp; Katalog
          </Link>
          <a
            href={currentPath === '/' ? '#cara-kerja' : '/#cara-kerja'}
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#41493c] hover:bg-[#f0f4fb]"
          >
            Cara Kerja
          </a>
          <a
            href={currentPath === '/' ? '#katering-acara' : '/#katering-acara'}
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#41493c] hover:bg-[#f0f4fb]"
          >
            Katering Acara
          </a>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-semibold ${
              currentPath === '/pricing' ? 'bg-[#82c46c]/20 text-[#2e6b1f]' : 'text-[#41493c] hover:bg-[#f0f4fb]'
            }`}
          >
            Harga &amp; Paket
          </Link>
          <Link
            to="/ai-planner"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 ${
              currentPath === '/ai-planner'
                ? 'bg-[#82c46c] text-[#125104]'
                : 'text-[#2e6b1f] bg-[#aff496]/40 hover:bg-[#aff496]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            AI Planner
          </Link>
        </div>
      )}
    </header>
  );
};
