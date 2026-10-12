import React, { useState } from 'react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');

  if (!isOpen) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setCheckoutStep('success');
    setTimeout(() => {
      onClearCart();
      setCheckoutStep('cart');
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#eaeef5]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-[#2e6b1f]">
                shopping_bag
              </span>
              <h3 className="font-bold text-lg text-[#171c21]">Keranjang Katering</h3>
              <span className="text-xs font-bold bg-[#82c46c]/25 text-[#125104] px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} Porsi
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f0f4fb] flex items-center justify-center text-[#5b5f63] hover:text-black transition-colors"
            >
              ✕
            </button>
          </div>

          {checkoutStep === 'success' ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#82c46c]/20 text-[#2e6b1f] flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h4 className="text-xl font-bold text-[#171c21] mb-1">Pesanan Diteruskan!</h4>
              <p className="text-xs text-[#5b5f63] max-w-xs mx-auto">
                Dapur katering mitra sedang memverifikasi ketersediaan porsi. Rekber SajiEscrow™ diaktifkan otomatis.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#f0f4fb] text-[#5b5f63] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[32px]">shopping_cart</span>
              </div>
              <p className="text-sm font-semibold text-[#171c21]">Keranjang Masih Kosong</p>
              <p className="text-xs text-[#5b5f63] mt-1 max-w-xs mx-auto">
                Pilih menu bento atau paket katering favorit Anda dari bagian katalog menu.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#eaeef5] mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.dish.id} className="pt-3 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#f0f4fb] shrink-0 border border-[#dee3ea]">
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-[#171c21] truncate">
                      {item.dish.name}
                    </h5>
                    <span className="text-xs text-[#2e6b1f] font-semibold block">
                      Rp {item.dish.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-[#5b5f63]">
                      Subtotal: Rp {(item.dish.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#f0f4fb] px-2 py-1 rounded-full shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.dish.id, -1)}
                      className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.dish.id, 1)}
                      className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.dish.id)}
                    className="text-[#5b5f63] hover:text-red-500 text-xs px-1"
                    title="Hapus"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="pt-4 border-t border-[#eaeef5]">
            <div className="bg-[#82c46c]/15 p-3 rounded-2xl mb-4 border border-[#82c46c]/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#2e6b1f]">
                verified_user
              </span>
              <p className="text-[11px] text-[#2e6b1f] font-medium leading-tight">
                Dilindungi <strong>SajiEscrow™</strong>: Pembayaran aman ditahan sampai makanan terverifikasi tiba.
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#5b5f63] font-medium">Total Tagihan:</span>
              <span className="text-xl font-extrabold text-[#171c21]">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#82c46c] text-[#125104] font-bold text-sm shadow-md hover:scale-[1.01] transition-transform"
            >
              Lanjut ke Pembayaran Escrow
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
