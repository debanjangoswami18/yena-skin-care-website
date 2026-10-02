import React, { useState } from 'react';
import { useShop, ScreenType } from '../context/ShopContext';
import { BRAND_ASSETS } from '../data/skincareData';

export const Header: React.FC = () => {
  const {
    activeScreen,
    setActiveScreen,
    cartCount,
    wishlistCount,
    setIsDrawerOpen,
    setIsAboutOpen,
    viewportMode,
    setViewportMode
  } = useShop();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks: { label: string; screen: ScreenType }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Shop', screen: 'shop' },
    { label: 'Best Sellers', screen: 'shop' },
    { label: 'Rituals', screen: 'product' },
    { label: 'Offers', screen: 'offers' },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#fbf9f5]/90 backdrop-blur-xl border-b border-[#eae8e4] transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="w-full bg-[#2d2622] text-[#fbf9f5] py-2 px-4 text-center font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[14px] text-[#ffdbd0]">spa</span>
          <span>Complimentary Silk Pouch & Express Shipping on orders over ₹1,499 | Code: <strong className="text-[#ffdbd0]">GLOW20</strong></span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Mobile Menu Drawer Trigger & Desktop Wordmark */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              aria-label="Open Navigation Menu"
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full text-[#18120e] hover:bg-[#efeeea] transition-colors"
              onClick={() => setIsDrawerOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            {/* Brand Logo & Name */}
            <button
              onClick={() => setActiveScreen('home')}
              className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
              aria-label="YENA Skincare Home"
            >
              <img
                src={BRAND_ASSETS.logo}
                alt="YENA Skincare Brand Logo"
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold tracking-wider text-[#18120e] hidden xs:inline-block">
                YENA
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setActiveScreen(link.screen)}
                className={`font-['Plus_Jakarta_Sans'] text-sm tracking-wide transition-colors py-1 relative ${
                  activeScreen === link.screen
                    ? 'text-[#18120e] font-semibold after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#8f4c35]'
                    : 'text-[#4d4540] hover:text-[#18120e]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Actions (Search, Wishlist, Cart, Viewport Mode, Profile) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search Input for Desktop / Toggle for Mobile */}
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActiveScreen('shop');
                  }
                }}
                placeholder="Search formulas, botanicals..."
                className="w-52 lg:w-64 bg-[#f5f3ef] text-[#1b1c1a] font-['Plus_Jakarta_Sans'] text-xs rounded-full pl-9 pr-4 py-2 placeholder:text-[#7f7570] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#8f4c35] transition-all"
              />
              <span className="material-symbols-outlined absolute left-3 text-[#7f7570] text-[18px] pointer-events-none">
                search
              </span>
            </div>

            <button
              aria-label="Search"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setActiveScreen('shop');
              }}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#1b1c1a] hover:bg-[#efeeea] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Viewport Frame Toggle: Switch between Responsive Desktop and Mobile Mockup View */}
            <button
              aria-label="Toggle Phone Shell Preview"
              onClick={() => {
                setViewportMode(viewportMode === 'responsive' ? 'mobile' : 'responsive');
              }}
              title={viewportMode === 'responsive' ? 'Switch to Phone Mockup Screen' : 'Switch to Full Screen'}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans'] bg-[#efeeea] hover:bg-[#eae8e4] text-[#4d4540] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">
                {viewportMode === 'responsive' ? 'smartphone' : 'devices'}
              </span>
              <span className="text-[11px] font-medium hidden lg:inline">
                {viewportMode === 'responsive' ? 'Mobile Frame' : 'Full Width'}
              </span>
            </button>

            {/* Wishlist Icon */}
            <button
              aria-label="Sacred Wishlist"
              onClick={() => setActiveScreen('wishlist')}
              className={`relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition-colors ${
                activeScreen === 'wishlist' ? 'bg-[#efeeea] text-[#8f4c35]' : 'text-[#1b1c1a] hover:bg-[#efeeea]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={wishlistCount > 0 ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#8f4c35] text-white text-[10px] font-['Plus_Jakarta_Sans'] leading-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              aria-label="Shopping Cart"
              onClick={() => setActiveScreen('cart')}
              className={`relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full transition-colors ${
                activeScreen === 'cart' ? 'bg-[#efeeea] text-[#8f4c35]' : 'text-[#1b1c1a] hover:bg-[#efeeea]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#18120e] text-white text-[10px] font-['Plus_Jakarta_Sans'] leading-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <button
              aria-label="User Account Profile"
              onClick={() => setIsAboutOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-1 ring-[#d1c4be]/60 hover:ring-[#8f4c35] transition-all ml-1 shrink-0 cursor-pointer shadow-xs"
              title="View Founder & Patron Profile"
            >
              <img
                src={BRAND_ASSETS.userAvatar}
                alt="Debanjan Goswami - Profile"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay if opened */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-[#efeeea] bg-[#fbf9f5]">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActiveScreen('shop');
                    setIsSearchOpen(false);
                  }
                }}
                placeholder="Search serums, cleansers, sunscreens..."
                autoFocus
                className="w-full h-10 pl-9 pr-10 rounded-full bg-white text-[#1b1c1a] font-['Plus_Jakarta_Sans'] text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8f4c35]"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#7f7570] text-[18px]">
                search
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#7f7570]"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
