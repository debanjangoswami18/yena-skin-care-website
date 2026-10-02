import React from 'react';
import { useShop, ScreenType } from '../context/ShopContext';
import { BRAND_ASSETS } from '../data/skincareData';

export const NavigationDrawer: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, activeScreen, setActiveScreen, setIsAboutOpen } = useShop();

  if (!isDrawerOpen) return null;

  const navigateTo = (screen: ScreenType) => {
    setActiveScreen(screen);
    setIsDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2d2622]/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <aside className="fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-sm bg-[#fbf9f5] shadow-2xl flex flex-col justify-between pt-safe pb-safe overflow-y-auto transform transition-transform duration-300 ease-out border-r border-[#eae8e4]">
        <div className="p-5 flex flex-col">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-6 border-b border-[#efeeea]">
            <div className="flex items-center gap-2">
              <img
                src={BRAND_ASSETS.logo}
                alt="YENA Skincare Brand Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="font-['Playfair_Display'] text-xl font-bold tracking-wider text-[#18120e]">
                YENA
              </span>
            </div>
            <button
              aria-label="Close Drawer"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#1b1c1a] hover:bg-[#efeeea] transition-colors"
              onClick={() => setIsDrawerOpen(false)}
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-1 mt-4">
            <button
              onClick={() => navigateTo('home')}
              className={`flex items-center justify-between py-3 px-3 rounded-lg text-left transition-colors font-['Playfair_Display'] text-base ${
                activeScreen === 'home'
                  ? 'text-[#8f4c35] font-semibold bg-[#efeeea]'
                  : 'text-[#1b1c1a] hover:bg-[#f5f3ef]'
              }`}
            >
              <span>Home</span>
              <span className="material-symbols-outlined text-sm text-[#7f7570]">arrow_forward_ios</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`flex items-center justify-between py-3 px-3 rounded-lg text-left transition-colors font-['Playfair_Display'] text-base ${
                activeScreen === 'shop'
                  ? 'text-[#8f4c35] font-semibold bg-[#efeeea]'
                  : 'text-[#1b1c1a] hover:bg-[#f5f3ef]'
              }`}
            >
              <span>Shop All</span>
              <span className="material-symbols-outlined text-sm text-[#7f7570]">arrow_forward_ios</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="flex items-center justify-between py-3 px-3 rounded-lg text-[#1b1c1a] hover:bg-[#f5f3ef] font-['Playfair_Display'] text-base text-left transition-colors"
            >
              <span>Categories</span>
              <span className="material-symbols-outlined text-sm text-[#7f7570]">arrow_forward_ios</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="flex items-center justify-between py-3 px-3 rounded-lg text-[#1b1c1a] hover:bg-[#f5f3ef] font-['Playfair_Display'] text-base text-left transition-colors"
            >
              <span>Best Sellers</span>
              <span className="material-symbols-outlined text-sm text-[#7f7570]">arrow_forward_ios</span>
            </button>

            <button
              onClick={() => navigateTo('offers')}
              className="flex items-center justify-between py-3 px-3 rounded-lg text-[#1b1c1a] hover:bg-[#f5f3ef] font-['Playfair_Display'] text-base text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                Offers & Deals
                <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#390c00] text-[10px] font-['Plus_Jakarta_Sans'] font-bold">
                  SALE 20%
                </span>
              </span>
              <span className="material-symbols-outlined text-sm text-[#7f7570]">arrow_forward_ios</span>
            </button>

            <div className="my-3 h-px bg-[#efeeea]"></div>

            <button
              onClick={() => {
                setIsAboutOpen(true);
                setIsDrawerOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg text-[#4d4540] hover:text-[#1b1c1a] font-['Plus_Jakarta_Sans'] text-sm text-left transition-colors flex items-center justify-between"
            >
              <span>About Founder & Atelier</span>
              <span className="material-symbols-outlined text-sm text-[#8f4c35]">person</span>
            </button>
            <button
              onClick={() => navigateTo('product')}
              className="py-2.5 px-3 rounded-lg text-[#4d4540] hover:text-[#1b1c1a] font-['Plus_Jakarta_Sans'] text-sm text-left transition-colors"
            >
              Featured Vitamin C Ritual
            </button>
            <button
              onClick={() => navigateTo('wishlist')}
              className="py-2.5 px-3 rounded-lg text-[#4d4540] hover:text-[#1b1c1a] font-['Plus_Jakarta_Sans'] text-sm text-left transition-colors flex items-center justify-between"
            >
              <span>Sacred Wishlist</span>
              <span className="material-symbols-outlined text-sm text-[#8f4c35]">favorite</span>
            </button>
            <button
              onClick={() => navigateTo('cart')}
              className="py-2.5 px-3 rounded-lg text-[#4d4540] hover:text-[#1b1c1a] font-['Plus_Jakarta_Sans'] text-sm text-left transition-colors flex items-center justify-between"
            >
              <span>Shopping Bag</span>
              <span className="material-symbols-outlined text-sm text-[#18120e]">shopping_bag</span>
            </button>
          </nav>
        </div>

        {/* Member Tier Profile Capsule at bottom */}
        <button
          onClick={() => {
            setIsAboutOpen(true);
            setIsDrawerOpen(false);
          }}
          className="p-5 bg-[#f5f3ef] flex items-center gap-3 border-t border-[#eae8e4] text-left hover:bg-[#eae8e4] transition-colors cursor-pointer w-full"
        >
          <img
            src={BRAND_ASSETS.userAvatar}
            alt="Debanjan Goswami"
            className="w-11 h-11 rounded-full object-cover object-top ring-2 ring-[#d1c4be]"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
              {BRAND_ASSETS.founder.name}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570]">
              Co-Founder & CBO • Member
            </span>
          </div>
        </button>
      </aside>
    </div>
  );
};
