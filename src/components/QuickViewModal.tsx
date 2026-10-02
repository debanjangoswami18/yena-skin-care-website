import React from 'react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, openProductDetails } = useShop();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2d2622]/40 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      {/* Sheet / Modal */}
      <div className="relative w-full max-w-lg bg-[#fbf9f5] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-10 border border-[#eae8e4] animate-in fade-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 px-6 flex justify-between items-center bg-[#fbf9f5] border-b border-[#efeeea]">
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-widest text-[#7f7570] uppercase">
            Quick Ritual Preview
          </span>
          <button
            aria-label="Close Preview"
            className="w-8 h-8 rounded-full bg-[#efeeea] flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4] transition-colors"
            onClick={closeQuickView}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 flex flex-col gap-4 no-scrollbar">
          {/* Image */}
          <div className="w-full aspect-[4/3] rounded-xl bg-[#f5f3ef] overflow-hidden relative shadow-sm">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.discount && (
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md font-['Plus_Jakarta_Sans'] text-[10px] font-bold text-[#8f4c35] shadow-sm">
                {quickViewProduct.discount}
              </div>
            )}
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-['Plus_Jakarta_Sans'] text-[#7f7570]">
              {quickViewProduct.volume}
            </span>
          </div>

          {/* Rating & Origin */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#8f4c35] text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#1b1c1a]">
                {quickViewProduct.rating}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570]">
                ({quickViewProduct.reviewCount} reviews)
              </span>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8f4c35] font-semibold">
              Lab Verified Formulation
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#18120e]">
              {quickViewProduct.name}
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] mt-1 leading-relaxed">
              {quickViewProduct.subtitle}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 py-1 border-y border-[#efeeea]">
            <span className="font-['Playfair_Display'] text-2xl font-bold text-[#18120e]">
              ₹{quickViewProduct.price}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570] line-through">
              ₹{quickViewProduct.originalPrice}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          {/* Purity Guarantee note */}
          <div className="p-3 rounded-xl bg-[#f5f3ef] flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#8f4c35] text-[20px]">eco</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#1b1c1a]">
              Formulated without artificial fragrance, sulfates, parabens, or silicones.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                addToCart(quickViewProduct);
                closeQuickView();
              }}
              className="flex-1 h-12 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#2d2622] active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Add to Ritual Bag</span>
            </button>
            <button
              onClick={() => {
                closeQuickView();
                openProductDetails(quickViewProduct);
              }}
              className="px-5 h-12 rounded-full border border-[#d1c4be] text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#efeeea] transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
