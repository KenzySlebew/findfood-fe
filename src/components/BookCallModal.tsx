import React, { useState } from 'react';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    eventType: 'Office Event',
    guestCount: '100',
    eventDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#dee3ea] max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#5b5f63] hover:text-black transition-colors"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-[#171c21] mb-2">Permintaan Terkirim!</h3>
            <p className="text-sm text-[#41493c]">
              Dedicated Culinary Account Manager kami akan menghubungi Anda via WhatsApp/Telepon dalam waktu 15 menit.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#2e6b1f] tracking-wide uppercase">
                Konsultasi Katering Acara
              </span>
              <h3 className="text-2xl font-bold text-[#171c21] tracking-tight mt-1">
                Book a Call with Culinary Lead
              </h3>
              <p className="text-xs sm:text-sm text-[#41493c] mt-1">
                Dapatkan proposal menu AI dan skema harga tender (RFQ) dalam hitungan jam.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#171c21] mb-1">
                  Nama Lengkap / PIC
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Sarah Jenkins"
                  className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171c21] mb-1">
                    Instansi / Perusahaan
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nama Kantor/Komunitas"
                    className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171c21] mb-1">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171c21] mb-1">
                    Tipe Acara
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                  >
                    <option>Office Event</option>
                    <option>Nonprofit &amp; Charity Event</option>
                    <option>Students Meal &amp; Kampus</option>
                    <option>Party or Festival</option>
                    <option>Wedding &amp; Resepsi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171c21] mb-1">
                    Estimasi Porsi
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="10000"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-[#dee3ea] text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171c21] mb-1">
                  Catatan Kebutuhan Khusus / Alergi
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Misal: Perlu opsi vegetarian 20 porsi, pengantaran pukul 11:30 WIB"
                  className="w-full px-4 py-2 rounded-2xl border border-[#dee3ea] text-sm focus:outline-none focus:border-[#2e6b1f] bg-[#f7f9ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#82c46c] text-[#125104] font-bold text-sm shadow-md hover:scale-[1.01] transition-transform"
              >
                Konfirmasi Jadwal Konsultasi
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
