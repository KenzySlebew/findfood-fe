import React, { useState } from 'react';
import { BookCallModal } from './BookCallModal';

export const PlanEvent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="katering-acara" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Title & Booking CTA */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full pr-0 lg:pr-4">
          <div>
            <span className="text-xs font-bold text-[#2e6b1f] tracking-widest uppercase mb-1 block">
              Layanan Terpadu
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171c21] tracking-tight mb-3">
              Plan Event With Us
            </h2>
            <p className="text-sm sm:text-base text-[#41493c] mb-6 leading-relaxed">
              Rancang perhelatan Anda bersama tim katering kami. Mulai dari makan siang rapat direksi hingga jamuan pesta berskala ribuan porsi dengan dukungan sistem penawar tender (RFQ).
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#82c46c] text-[#125104] font-bold text-sm shadow-md hover:scale-[1.02] transition-transform"
            >
              Book a call
            </button>
          </div>

          {/* SajiEscrow Tag */}
          <div className="mt-8 p-4 rounded-2xl bg-[#82c46c]/15 border border-[#82c46c]/20">
            <div className="flex items-center gap-2 text-[#2e6b1f] font-bold text-xs mb-1">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              Proteksi SajiEscrow™
            </div>
            <p className="text-[11px] text-[#41493c]">
              Dana Anda aman di rekening bersama pihak ketiga sampai katering tiba di lokasi sesuai spesifikasi menu.
            </p>
          </div>
        </div>

        {/* Right Column: Event Types Mosaic Collage */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Event 1: Office Event */}
          <div className="relative h-56 rounded-3xl overflow-hidden group shadow-sm border border-[#dee3ea]/50">
            <img
              src="/images/event-office.jpg"
              alt="Office event corporate catering"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
              <div>
                <span className="text-white font-bold text-lg block">Office Event</span>
                <span className="text-white/80 text-xs">Makan siang rapat, townhall &amp; gathering</span>
              </div>
            </div>
          </div>

          {/* Event 2: Nonprofit Event */}
          <div className="relative h-56 rounded-3xl overflow-hidden group shadow-sm border border-[#dee3ea]/50">
            <img
              src="/images/event-nonprofit.jpg"
              alt="Nonprofit community event"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
              <div>
                <span className="text-white font-bold text-lg block">Nonprofit Event</span>
                <span className="text-white/80 text-xs">Baksos, donasi &amp; komunitas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 More Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        
        {/* Event 3: Students Meal */}
        <div className="relative h-56 rounded-3xl overflow-hidden group shadow-sm border border-[#dee3ea]/50">
          <img
            src="/images/event-students.jpg"
            alt="Students meal campus catering"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
            <div>
              <span className="text-white font-bold text-base block">Students Meal</span>
              <span className="text-white/80 text-xs">Seminar &amp; kegiatan kampus</span>
            </div>
          </div>
        </div>

        {/* Event 4: Party or Festival */}
        <div className="relative h-56 rounded-3xl overflow-hidden group shadow-sm border border-[#dee3ea]/50">
          <img
            src="/images/event-party.jpg"
            alt="Social party & festival"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
            <div>
              <span className="text-white font-bold text-base block">Party or Festival's</span>
              <span className="text-white/80 text-xs">Konser, bazaar &amp; pesta keluarga</span>
            </div>
          </div>
        </div>

        {/* Event 5: Wedding Event */}
        <div className="relative h-56 rounded-3xl overflow-hidden group shadow-sm border border-[#dee3ea]/50">
          <img
            src="/images/event-wedding.jpg"
            alt="Luxury wedding catering"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
            <div>
              <span className="text-white font-bold text-base block">Wedding Event</span>
              <span className="text-white/80 text-xs">Prasmanan mewah &amp; gubukan resepsi</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Modal */}
      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
