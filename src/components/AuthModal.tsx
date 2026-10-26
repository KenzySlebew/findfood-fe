import React, { useState, useEffect } from 'react';
import { api, setStoredToken, setStoredUser, saveRegisteredAccount } from '../services/api';
import type { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialTab = 'login',
  onClose,
  onSuccess,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [role, setRole] = useState<'CLIENT' | 'VENDOR'>('CLIENT');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [namaToko, setNamaToko] = useState('');
  const [alamatToko, setAlamatToko] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setErrorMsg(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const res = await api.login({ email, password, roleHint: role });
        if (res.data) {
          setStoredToken(res.data.token);
          setStoredUser(res.data.user);
          saveRegisteredAccount(res.data.user);
          onSuccess(res.data.user);
          onClose();
        }
      } else {
        const res = await api.register({
          name,
          email,
          password,
          role,
          ...(role === 'VENDOR' ? { namaToko, alamatToko } : {}),
        });
        if (res.data) {
          setStoredToken(res.data.token);
          setStoredUser(res.data.user);
          saveRegisteredAccount(res.data.user);
          onSuccess(res.data.user);
          onClose();
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Terjadi kesalahan. Silakan coba kembali.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-[#dee3ea]">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#5b5f63] hover:text-black transition-colors"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h3 className="text-2xl font-bold text-[#171c21] tracking-tight">
            {tab === 'login' ? 'Masuk ke Saji.AI' : 'Daftar Akun Baru'}
          </h3>
          <p className="text-xs text-[#5b5f63] mt-1">
            {tab === 'login'
              ? 'Akses dashboard pesanan katering Anda'
              : 'Bergabung sebagai Pembeli (Client) atau Mitra Dapur (Vendor)'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-[#f0f4fb] p-1 rounded-full mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              tab === 'login'
                ? 'bg-white text-[#171c21] shadow-xs'
                : 'text-[#5b5f63] hover:text-[#171c21]'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              tab === 'register'
                ? 'bg-white text-[#171c21] shadow-xs'
                : 'text-[#5b5f63] hover:text-[#171c21]'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {tab === 'login' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#171c21]">
                  Masuk Sebagai:
                </label>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#82c46c] text-[#125104]">
                  {role === 'VENDOR' ? 'Mitra Toko Dapur' : 'Client Korporat'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('CLIENT')}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    role === 'CLIENT'
                      ? 'border-[#2e6b1f] bg-[#82c46c]/20 text-[#125104] ring-2 ring-[#82c46c]/40 font-extrabold'
                      : 'border-[#dee3ea] text-[#5b5f63] hover:bg-[#f7f9ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">business</span>
                  <span>Client PIC</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('VENDOR')}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    role === 'VENDOR'
                      ? 'border-[#2e6b1f] bg-[#82c46c]/20 text-[#125104] ring-2 ring-[#82c46c]/40 font-extrabold'
                      : 'border-[#dee3ea] text-[#5b5f63] hover:bg-[#f7f9ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">storefront</span>
                  <span>Mitra Toko</span>
                </button>
              </div>
            </div>
          )}

          {tab === 'register' && (
            <>
              {/* Role Toggle for Register */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#171c21]">
                    Mendaftar Sebagai:
                  </label>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#82c46c] text-[#125104]">
                    {role === 'VENDOR' ? '✓ Mitra Toko Dapur' : '✓ Client Korporat'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('CLIENT')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      role === 'CLIENT'
                        ? 'border-[#2e6b1f] bg-[#82c46c]/20 text-[#125104] ring-2 ring-[#82c46c]/40 font-extrabold shadow-xs'
                        : 'border-[#dee3ea] text-[#5b5f63] hover:bg-[#f7f9ff]'
                    }`}
                  >
                    <span>👤 Client (Penyelenggara)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('VENDOR')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      role === 'VENDOR'
                        ? 'border-[#2e6b1f] bg-[#82c46c]/20 text-[#125104] ring-2 ring-[#82c46c]/40 font-extrabold shadow-xs'
                        : 'border-[#dee3ea] text-[#5b5f63] hover:bg-[#f7f9ff]'
                    }`}
                  >
                    <span>🍳 Vendor (Mitra Toko)</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#5b5f63] mt-1.5 italic">
                  {role === 'VENDOR'
                    ? '• Akun Anda akan memiliki akses edit katalog, kelola inventaris dapur, dan terima tender B2B.'
                    : '• Akun Anda akan memiliki akses pemesanan acara, lacak pengiriman kurir, dan faktur pajak DJP.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171c21] mb-1">
                  Nama Lengkap / Penanggung Jawab
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-xs sm:text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                />
              </div>

              {role === 'VENDOR' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#171c21] mb-1">
                      Nama Toko / Usaha Katering <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={namaToko}
                      onChange={(e) => setNamaToko(e.target.value)}
                      placeholder="Contoh: Berkah Rasa Katering"
                      className="w-full px-4 py-2.5 rounded-full border border-[#2e6b1f] text-xs sm:text-sm focus:outline-none bg-white shadow-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#171c21] mb-1">
                      Alamat Dapur Operasional
                    </label>
                    <input
                      type="text"
                      value={alamatToko}
                      onChange={(e) => setAlamatToko(e.target.value)}
                      placeholder="Contoh: Jl. Melati No. 8, Jakarta Selatan"
                      className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-xs sm:text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-xs sm:text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-xs sm:text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#82c46c] text-[#125104] font-bold text-sm shadow-md hover:scale-[1.01] transition-transform disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {loading && <span className="animate-spin text-sm">⏳</span>}
            {tab === 'login' ? 'Masuk Sekarang' : 'Daftarkan Akun'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-xs text-[#5b5f63]">
            {tab === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button
              type="button"
              onClick={() => {
                setTab(tab === 'login' ? 'register' : 'login');
                setErrorMsg(null);
              }}
              className="font-bold text-[#2e6b1f] hover:underline"
            >
              {tab === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </span>
        </div>

        {/* Quick Demo Login Option */}
        <div className="mt-5 pt-4 border-t border-[#eaeef5]">
          <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block text-center mb-2">
            Akses Demo Cepat (1-Klik Masuk):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                const demoClient: User = {
                  id: 'demo-client-1',
                  name: 'Sarah Wijaya (PIC Kantor)',
                  email: 'sarah.pic@megacapital.co.id',
                  role: 'CLIENT',
                };
                setStoredToken('mock-jwt-token-client');
                setStoredUser(demoClient);
                saveRegisteredAccount(demoClient);
                onSuccess(demoClient);
                onClose();
              }}
              className="py-2 px-3 rounded-xl bg-[#f0f4fb] hover:bg-[#eaeef5] text-xs font-bold text-[#171c21] flex items-center justify-center gap-1.5 border border-[#dee3ea]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">business</span>
              <span>Demo Client</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const demoVendor: User = {
                  id: 'demo-vendor-1',
                  name: 'Kurnia Boga Mandiri',
                  email: 'halo@kurniaboga.com',
                  role: 'VENDOR',
                  namaToko: 'Kurnia Boga Mandiri',
                  alamatToko: 'Kebayoran Baru, Jakarta Selatan',
                  vendor: {
                    id: 'v-1',
                    userId: 'demo-vendor-1',
                    namaToko: 'Kurnia Boga Mandiri',
                    alamat: 'Kebayoran Baru, Jakarta Selatan',
                    statusVerifikasi: 'APPROVED',
                    ratingRataRata: 4.95,
                  },
                };
                setStoredToken('mock-jwt-token-vendor');
                setStoredUser(demoVendor);
                saveRegisteredAccount(demoVendor);
                onSuccess(demoVendor);
                onClose();
              }}
              className="py-2 px-3 rounded-xl bg-[#f0f4fb] hover:bg-[#eaeef5] text-xs font-bold text-[#171c21] flex items-center justify-center gap-1.5 border border-[#dee3ea]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">storefront</span>
              <span>Demo Vendor</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
