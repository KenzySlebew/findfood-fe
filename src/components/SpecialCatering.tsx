import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { MenuItem } from '../types';

interface SpecialCateringProps {
  onAddToCart: (dish: MenuItem) => void;
}

export const initialDishes: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Bhuna Khichuri & Thai Chicken',
    category: 'bento',
    description: 'Nasi bumbu rempah aromatik dengan ayam panggang khas Thai dan acar segar.',
    price: 38000,
    rating: 4.8,
    calories: 150,
    image: '/images/menu-khichuri.jpg',
    tag: 'Terlaris',
  },
  {
    id: 'dish-2',
    name: 'Bento Rendang Padang Spesial',
    category: 'nusantara',
    description: 'Daging sapi rendang empuk bumbu rempah warisan, sambal ijo, dan daun singkong.',
    price: 45000,
    rating: 4.9,
    calories: 180,
    image: '/images/menu-rendang.jpg',
    tag: 'Rekomendasi Chef',
  },
  {
    id: 'dish-3',
    name: 'Salmon Teriyaki Rice Bowl',
    category: 'western',
    description: 'Fillet salmon segar panggang glasir teriyaki manis gurih dengan brokoli kukus.',
    price: 52000,
    rating: 4.9,
    calories: 160,
    image: '/images/menu-salmon.jpg',
    tag: 'Favorit Direksi',
  },
  {
    id: 'dish-4',
    name: 'Nasi Liwet Solo Komplit',
    category: 'nusantara',
    description: 'Nasi liwet gurih santan kelapa, suwiran ayam opor, sayur labu siam, dan areh.',
    price: 42000,
    rating: 4.8,
    calories: 175,
    image: '/images/menu-liwet.jpg',
    tag: 'Otentik',
  },
  {
    id: 'dish-5',
    name: 'Healthy Salad Grilled Chicken',
    category: 'healthy',
    description: 'Dada ayam panggang herb, romaine lettuce organik, tomat ceri, dan dressing balsamic.',
    price: 39000,
    rating: 5.0,
    calories: 140,
    image: '/images/menu-chickensalad.jpg',
    tag: 'Diet Rendah Kalori',
  },
];

export const SpecialCatering: React.FC<SpecialCateringProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredDishes =
    activeCategory === 'all'
      ? initialDishes
      : initialDishes.filter((d) => d.category === activeCategory);

  const handleAdd = (dish: MenuItem) => {
    onAddToCart(dish);
    setAddedIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16" id="menu-pilihan">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#2e6b1f] tracking-widest uppercase mb-1 block">
          Pilihan Eksklusif
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#171c21] tracking-tight mb-2">
          Our special Catering
        </h2>
        <p className="text-sm sm:text-base text-[#41493c]">
          Pilihan paket bento lezat, sehat, dan diracik langsung oleh chef tersertifikasi
        </p>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'Semua Menu' },
            { id: 'bento', label: 'Bento Box' },
            { id: 'nusantara', label: 'Nusantara' },
            { id: 'healthy', label: 'Healthy & Diet' },
            { id: 'western', label: 'Western Gourmet' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#82c46c] text-[#125104] shadow-xs'
                  : 'bg-white text-[#5b5f63] hover:text-[#171c21] hover:bg-[#eaeef5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5 Circular Dish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-6">
        {filteredDishes.map((dish) => {
          const isAdded = !!addedIds[dish.id];

          return (
            <div
              key={dish.id}
              className="bg-white rounded-3xl p-5 pt-0 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative border border-[#dee3ea]/40 group"
            >
              {/* Circular Top-Overlapping Dish Image */}
              <div className="w-36 h-36 mx-auto -mt-8 rounded-full overflow-hidden shadow-md bg-[#f0f4fb] border-4 border-white group-hover:scale-105 transition-transform duration-300">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tag / Badge */}
              {dish.tag && (
                <div className="text-center mt-3">
                  <span className="text-[10px] font-bold text-[#2e6b1f] bg-[#82c46c]/20 px-2.5 py-0.5 rounded-full inline-block">
                    {dish.tag}
                  </span>
                </div>
              )}

              <div className="mt-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#171c21] line-clamp-2 min-h-[40px] leading-snug">
                    {dish.name}
                  </h4>

                  {/* Ratings & Calories */}
                  <div className="flex items-center gap-3 my-2 text-[#41493c] text-xs">
                    <span className="flex items-center gap-1 text-[#171c21] font-bold">
                      <span
                        className="material-symbols-outlined text-[16px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {dish.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#a83639] font-medium">
                      <span className="material-symbols-outlined text-[15px]">
                        local_fire_department
                      </span>
                      {dish.calories} Kcal
                    </span>
                  </div>
                </div>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between pt-3 border-t border-[#eaeef5]">
                  <div>
                    <span className="text-[11px] text-[#5b5f63] font-medium block leading-none">
                      Mulai dari
                    </span>
                    <span className="font-bold text-base text-[#171c21]">
                      Rp {dish.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(dish)}
                    aria-label={`Tambah ${dish.name} ke keranjang`}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isAdded
                        ? 'bg-[#2e6b1f] text-white scale-110 shadow-md'
                        : 'bg-[#82c46c] text-[#125104] hover:opacity-90 hover:scale-105 shadow-sm'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isAdded ? 'done' : 'add'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explore Full Catalog Action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
        <Link
          to="/katalog"
          className="px-8 py-3.5 rounded-full bg-[#2c3136] text-white text-sm font-semibold hover:bg-black transition-all shadow-md flex items-center gap-2 group"
        >
          <span>Eksplorasi Seluruh Katalog (250+ Pilihan)</span>
          <span className="material-symbols-outlined text-[18px] text-[#82c46c] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
};
