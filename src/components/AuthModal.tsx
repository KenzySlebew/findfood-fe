import React, { useState } from 'react';
import { api, setStoredToken, setStoredUser } from '../services/api';
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const res = await api.login({ email, password });
        if (res.data) {
          setStoredToken(res.data.token);
          setStoredUser(res.data.user);
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
          
          {tab === 'register' && (
            <>
              {/* Role Toggle for Register */}
              <div>
                <label className="block text-xs font-bold text-[#171c21] mb-1">
                  Mendaftar Sebagai:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('CLIENT')}
                    className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
                      role === 'CLIENT'
                        ? 'border-[#2e6b1f] bg-[#82c46c]/15 text-[#2e6b1f]'
                        : 'border-[#dee3ea] text-[#5b5f63] hover:bg-[#f7f9ff]'
                    }`}
                  >
                    👤 Client (Penyelenggara)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('VENDOR')}
                    className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
                      role === 'VENDOR'
                        ? 'border-[#2e6b1f] bg-[#82c46c]/15 text-[#2e6b1f]'
                        : 'border-[#dee3ea] text-[#5b5f63] hover:bg-[#f7f9ff]'
                    }`}
                  >
                    🍳 Vendor (Mitra Toko)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171c21] mb-1">
                  Nama Lengkap
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
                      Nama Toko / Usaha Katering
                    </label>
                    <input
                      type="text"
                      required
                      value={namaToko}
                      onChange={(e) => setNamaToko(e.target.value)}
                      placeholder="Contoh: Berkah Rasa Katering"
                      className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-xs sm:text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
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

      </div>
    </div>
  );
};
