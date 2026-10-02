import React from 'react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS } from '../data/skincareData';

export const WishlistScreen: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    openProductDetails,
    setActiveScreen
  } = useShop();

  const wishlistedProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#efeeea] flex items-center justify-center text-[#8f4c35] mb-4">
          <span className="material-symbols-outlined text-[36px]">favorite_border</span>
        </div>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#18120e]">
          Your Sacred Wishlist is Empty
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4d4540] max-w-sm mt-2 leading-relaxed">
          Save your cherished formulations, morning rituals, and protective shields here for mindful acquisition.
        </p>
        <button
          onClick={() => setActiveScreen('shop')}
          className="mt-6 px-8 py-3 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#2d2622] transition-colors"
        >
          Explore Formulations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full pb-28">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#efeeea]">
        <div>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-wider">
            Curated Intentions
          </span>
          <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#18120e] mt-0.5">
            Sacred Wishlist ({wishlistedProducts.length})
          </h1>
        </div>
        <button
          onClick={() => setActiveScreen('shop')}
          className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#8f4c35] hover:underline"
        >
          Continue Browsing
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistedProducts.map((product) => (
          <article
            key={product.id}
            className="bg-white rounded-xl p-3 shadow-sm border border-[#efeeea] flex flex-col justify-between group"
          >
            <div>
              <div
                onClick={() => openProductDetails(product)}
                className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#f5f3ef] mb-2.5 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  aria-label="Remove from wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center text-[#8f4c35] shadow-sm hover:bg-white"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#7f7570] mb-1">
                <span className="material-symbols-outlined text-[14px] text-[#8f4c35]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-bold text-[#18120e]">{product.rating}</span>
              </div>

              <h3
                onClick={() => openProductDetails(product)}
                className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e] line-clamp-1 cursor-pointer hover:text-[#8f4c35]"
              >
                {product.name}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate mt-0.5">
                {product.volume} • {product.subtitle}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-[#f5f3ef] flex flex-col gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Playfair_Display'] text-base font-bold text-[#18120e]">
                  ₹{product.price}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570] line-through">
                  ₹{product.originalPrice}
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  toggleWishlist(product.id);
                }}
                className="w-full h-9 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#2d2622] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                <span>Move to Bag</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
