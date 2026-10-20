import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const OrderTrackingPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('#SJ-2026-0928-89B');
  const [otpCode] = useState('8921');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Client Destination Address State
  const [destinationAddress, setDestinationAddress] = useState('Menara Sahid Sudirman Lt. 24, Jl. Jend. Sudirman No. 86, Jakarta Pusat');
  const [dropoffPoint, setDropoffPoint] = useState('Lobi Utama Resepsionis VIP (Drop Kurir Khusus)');
  const [recipientPhone] = useState('+62 811-9288-7254 (PIC Sarah)');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(destinationAddress);
  const [tempDropoff, setTempDropoff] = useState(dropoffPoint);
  const [addressSavedNotification, setAddressSavedNotification] = useState(false);

  const presetAddresses = [
    { label: 'Menara Sahid Sudirman Lt. 24 (Kantor Pusat)', value: 'Menara Sahid Sudirman Lt. 24, Jl. Jend. Sudirman No. 86, Jakarta Pusat', drop: 'Lobi Utama Resepsionis VIP' },
    { label: 'Cyber 2 Tower Lt. 12, HR Rasuna Said (Kantor Cabang)', value: 'Cyber 2 Tower Lt. 12, Jl. H. R. Rasuna Said Blok X-5 No. 13, Kuningan, Jakarta Selatan', drop: 'Loading Dock Barat / Lift Servis B2' },
    { label: 'Pacific Century Place SCBD Lt. 35', value: 'Pacific Century Place SCBD Lt. 35, Jl. Jend. Sudirman Kav 52-53, Senayan, Jakarta Selatan', drop: 'Lobby Concierge SCBD Tower' },
  ];

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setDestinationAddress(tempAddress);
    setDropoffPoint(tempDropoff);
    setIsEditingAddress(false);
    setAddressSavedNotification(true);
    setTimeout(() => setAddressSavedNotification(false), 3000);
  };

  return (
    <div className="flex flex-col w-full bg-[#f7f9ff] text-[#171c21] min-h-screen pb-20">
      
      {/* Top Breadcrumb & Header */}
      <section className="w-full bg-white border-b border-[#eaeef5] py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#82c46c]/20 text-[#125104] text-[10px] font-bold uppercase">
                Live GPS &amp; Termal Tracking
              </span>
              <span className="text-xs text-[#5b5f63] font-mono">SajiEscrow™ Guaranteed</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171c21] tracking-tight">
              Pelacakan Pengiriman Katering Real-Time
            </h1>
            <p className="text-xs sm:text-sm text-[#5b5f63] mt-1">
              Pantau pergerakan armada berpendingin, temperatur hidangan, dan verifikasi serah terima paket acara.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f0f4fb] px-4 py-2 rounded-2xl border border-[#dee3ea]">
            <span className="text-xs text-[#5b5f63] font-semibold">ID Pesanan:</span>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="bg-transparent font-mono font-bold text-xs sm:text-sm text-[#171c21] outline-none w-44"
            />
          </div>
        </div>
      </section>

      {/* Main Tracking Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Map & Status Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Visual Route Map Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#dee3ea] overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#eaeef5] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2e6b1f] animate-ping"></span>
                  <span className="text-xs font-bold text-[#171c21]">Status Armada: Menuju Lokasi Acara</span>
                </div>
                <span className="text-xs font-extrabold text-[#2e6b1f] bg-[#82c46c]/20 px-3 py-1 rounded-full">
                  ETA: 18 Menit Tiba (11:15 WIB)
                </span>
              </div>

              {/* Map Graphic Preview */}
              <div
                className="w-full h-72 sm:h-80 bg-cover bg-center rounded-2xl relative flex flex-col justify-between p-4 shadow-inner"
                style={{ backgroundImage: "url('/images/pricing-map.jpg')" }}
              >
                {/* Floating GPS Courier Tag */}
                <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-[#dee3ea] flex items-center gap-3 w-fit">
                  <div className="w-9 h-9 rounded-full bg-[#82c46c] text-[#125104] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#5b5f63] block">Armada Van Chiller B 1928 SJI</span>
                    <span className="text-xs font-bold text-[#171c21]">Pak Bambang Irawan (+62 812-9901-2819)</span>
                  </div>
                </div>

                {/* Destination Badge */}
                <div className="self-end bg-[#171c21]/90 backdrop-blur-md text-white p-3 rounded-2xl text-xs flex items-center gap-2 shadow-md max-w-sm">
                  <span className="material-symbols-outlined text-[#82c46c] text-[18px]">location_on</span>
                  <span className="truncate">Tujuan: {destinationAddress}</span>
                </div>
              </div>

              {/* Route checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#eaeef5]">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f0f4fb]">
                  <span className="material-symbols-outlined text-[#2e6b1f] text-[20px]">store</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#5b5f63] block">Titik Asal</span>
                    <span className="text-xs font-bold text-[#171c21]">Dapur Sentral Kebayoran Baru</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f0f4fb]">
                  <span className="material-symbols-outlined text-[#2e6b1f] text-[20px]">thermostat</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#5b5f63] block">Sensor Suhu Makanan</span>
                    <span className="text-xs font-bold text-[#2e6b1f]">64&deg;C (Optimal Hangat)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f0f4fb]">
                  <span className="material-symbols-outlined text-[#2e6b1f] text-[20px]">shield_check</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#5b5f63] block">Segel Keamanan</span>
                    <span className="text-xs font-bold text-[#171c21]">Segel Tamper-Proof Utuh</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Alamat Tujuan Pengiriman (Sisi Client PIC) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#dee3ea]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eaeef5]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">location_on</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#171c21]">Alamat Tujuan Pengiriman Acara</h3>
                    <p className="text-xs text-[#5b5f63]">Dikonfigurasi oleh Client PIC untuk navigasi kurir dan serah terima</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTempAddress(destinationAddress);
                    setTempDropoff(dropoffPoint);
                    setIsEditingAddress(!isEditingAddress);
                  }}
                  className="px-4 py-2 rounded-full bg-[#f0f4fb] hover:bg-[#eaeef5] text-xs font-bold text-[#171c21] transition-colors flex items-center gap-1.5 w-fit"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#2e6b1f]">edit_location_alt</span>
                  <span>{isEditingAddress ? 'Batal Edit' : 'Ubah / Pilih Alamat'}</span>
                </button>
              </div>

              {addressSavedNotification && (
                <div className="mt-3 p-3 bg-[#aff496]/40 text-[#125104] text-xs font-bold rounded-2xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Alamat tujuan dan titik drop-off berhasil diperbarui ke armada kurir!</span>
                </div>
              )}

              {/* View Mode */}
              {!isEditingAddress ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="md:col-span-2 bg-[#f0f4fb] p-4 rounded-2xl border border-[#dee3ea]/70">
                    <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block mb-1">
                      Alamat Gedung &amp; Lokasi
                    </span>
                    <p className="font-semibold text-sm text-[#171c21] leading-relaxed">
                      {destinationAddress}
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-[#2e6b1f] font-semibold">
                      <span className="material-symbols-outlined text-[16px]">meeting_room</span>
                      <span>Titik Drop: {dropoffPoint}</span>
                    </div>
                  </div>

                  <div className="bg-[#f0f4fb] p-4 rounded-2xl border border-[#dee3ea]/70 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#5b5f63] uppercase tracking-wider block mb-1">
                        Kontak PIC Lapangan
                      </span>
                      <p className="font-bold text-xs text-[#171c21]">{recipientPhone}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#dee3ea] flex items-center gap-1 text-[11px] text-[#5b5f63]">
                      <span className="material-symbols-outlined text-[14px] text-[#2e6b1f]">shield</span>
                      <span>Verifikasi OTP Wajib di Lokasi</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit & Selection Mode */
                <form onSubmit={handleSaveAddress} className="mt-4 p-5 rounded-2xl bg-[#f0f4fb] border border-[#82c46c]/40 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#171c21] block mb-1.5">
                      Pilih dari Daftar Alamat Kantor Tersimpan:
                    </label>
                    <select
                      onChange={(e) => {
                        const selected = presetAddresses.find((p) => p.value === e.target.value);
                        if (selected) {
                          setTempAddress(selected.value);
                          setTempDropoff(selected.drop);
                        }
                      }}
                      className="w-full bg-white p-3 rounded-xl text-xs font-semibold text-[#171c21] border border-[#dee3ea] outline-none"
                    >
                      {presetAddresses.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#171c21] block mb-1.5">
                      Atau Isi Alamat Lengkap / Gedung Acara:
                    </label>
                    <textarea
                      value={tempAddress}
                      onChange={(e) => setTempAddress(e.target.value)}
                      rows={2}
                      className="w-full bg-white p-3 rounded-xl text-xs text-[#171c21] border border-[#dee3ea] outline-none"
                      placeholder="Nama gedung, lantai, jalan, patokan..."
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#171c21] block mb-1.5">
                      Titik Drop-off / Instruksi Khusus Kurir:
                    </label>
                    <input
                      type="text"
                      value={tempDropoff}
                      onChange={(e) => setTempDropoff(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl text-xs text-[#171c21] border border-[#dee3ea] outline-none"
                      placeholder="Contoh: Lobi Timur, Lantai 24 Ruang Training B..."
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-black transition-all shadow-sm"
                    >
                      Simpan &amp; Perbarui Alamat
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="px-4 py-2.5 rounded-full bg-white text-xs font-bold text-[#5b5f63] border border-[#dee3ea]"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Hygiene Checklist & Real-time Log */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dee3ea]">
              <h3 className="text-lg font-bold text-[#171c21] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2e6b1f] text-[22px]">fact_check</span>
                <span>Log Jaminan Higiene &amp; Mutu Dapur Saji</span>
              </h3>

              <div className="space-y-4">
                {[
                  { time: '08:00 WIB', title: 'Audit Sterilisasi Dapur', desc: 'Peralatan chafing dish dan bento box di-desinfeksi suhu tinggi oleh tim QA Kurnia Boga.', passed: true },
                  { time: '09:30 WIB', title: 'Uji Swab & Cek Kesegaran Bahan', desc: 'Daging sapi sirloin dan sayuran lulus inspeksi higienis mutu Halal Grade A.', passed: true },
                  { time: '10:15 WIB', title: 'Pemasakan Selesai & Pengemasan', desc: '150 box bento dikemas rapi dalam eco-kraft sugarcane box kedap udara.', passed: true },
                  { time: '10:55 WIB', title: 'Pemberangkatan Armada Kurir', desc: 'Dimasukkan ke thermobox van berpendingin khusus, suhu stabil 64°C.', passed: true },
                  { time: '11:15 WIB (Est)', title: 'Serah Terima di Lokasi Acara', desc: 'PIC kantor memvalidasi kelengkapan menu dengan kode OTP.', passed: isOtpVerified },
                ].map((log) => (
                  <div key={log.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      {log.passed ? '✓' : '...'}
                    </div>
                    <div className="flex-1 bg-[#f0f4fb] p-3.5 rounded-2xl border border-[#dee3ea]/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#171c21]">{log.title}</span>
                        <span className="font-mono text-[10px] text-[#5b5f63] font-bold">{log.time}</span>
                      </div>
                      <p className="text-xs text-[#5b5f63] mt-1">{log.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & OTP Verification */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            
            {/* OTP Handover Box */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#dee3ea] text-center">
              <div className="w-12 h-12 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[24px]">key</span>
              </div>
              <h3 className="text-base font-bold text-[#171c21]">Kode OTP Serah Terima PIC</h3>
              <p className="text-xs text-[#5b5f63] mt-1">
                Tunjukkan kode OTP berikut kepada kurir saat makanan tiba di lobi gedung kantor:
              </p>

              <div className="my-5 p-4 rounded-2xl bg-[#f0f4fb] border border-[#82c46c]/40">
                <span className="font-mono text-3xl font-extrabold text-[#2e6b1f] tracking-widest">
                  {otpCode}
                </span>
                <span className="text-[10px] text-[#5b5f63] block mt-1">Berlaku untuk ID #SJ-2026-0928-89B</span>
              </div>

              {isOtpVerified ? (
                <div className="p-3 bg-[#82c46c] text-[#125104] rounded-2xl text-xs font-bold flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">done_all</span>
                  <span>Pesanan Telah Terverifikasi Sukses!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsOtpVerified(true)}
                  className="w-full py-3.5 rounded-full bg-[#2e6b1f] text-white text-xs font-bold hover:bg-[#125104] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  <span>Verifikasi Kedatangan Hidangan</span>
                </button>
              )}
            </div>

            {/* Order Items Snapshot */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#dee3ea]">
              <h4 className="text-sm font-bold text-[#171c21] mb-3">Rincian Paket Dipesan</h4>
              <div className="space-y-2.5 text-xs text-[#41493c]">
                <div className="flex justify-between pb-2 border-b border-[#eaeef5]">
                  <span>Menu</span>
                  <span className="font-bold text-[#171c21]">150 Box Bento Nusantara VIP</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#eaeef5]">
                  <span>Vendor</span>
                  <span className="font-bold text-[#171c21]">Kurnia Boga Mandiri</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#eaeef5]">
                  <span>Total Nilai Escrow</span>
                  <span className="font-extrabold text-[#2e6b1f]">Rp 7.659.000 (Lunas)</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#eaeef5]">
                <Link
                  to="/dashboard"
                  className="w-full py-2.5 rounded-full bg-[#f0f4fb] hover:bg-[#eaeef5] text-[#171c21] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Kembali ke Dashboard PIC</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default OrderTrackingPage;
