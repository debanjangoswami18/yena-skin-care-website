import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { BottomNav } from './components/BottomNav';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutModal } from './components/AboutModal';
import { Toast } from './components/Toast';

import { HomeScreen } from './screens/HomeScreen';
import { ShopScreen } from './screens/ShopScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { CartScreen } from './screens/CartScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { OffersScreen } from './screens/OffersScreen';

const MainContent: React.FC = () => {
  const { activeScreen, viewportMode } = useShop();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'product':
        return <ProductDetailsScreen />;
      case 'cart':
        return <CartScreen />;
      case 'wishlist':
        return <WishlistScreen />;
      case 'offers':
        return <OffersScreen />;
      default:
        return <HomeScreen />;
    }
  };

  if (viewportMode === 'mobile') {
    return (
      <div className="min-h-screen bg-[#2d2622] py-6 sm:py-10 px-2 flex flex-col items-center justify-center">
        {/* Mobile Device Mockup Frame */}
        <div className="relative w-full max-w-[420px] bg-[#fbf9f5] rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[8px] border-[#18120e] overflow-hidden flex flex-col min-h-[884px] h-[92vh]">
          {/* Speaker / Notch bar */}
          <div className="w-full bg-[#18120e] h-5 flex items-center justify-center relative shrink-0">
            <div className="w-24 h-4 bg-[#18120e] rounded-b-xl flex items-center justify-center">
              <div className="w-12 h-1 bg-[#4d4540] rounded-full"></div>
            </div>
          </div>

          {/* Screen Content Container with inner scroll */}
          <div className="flex-1 overflow-y-auto relative no-scrollbar flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">{renderScreen()}</main>
            <BottomNav />
          </div>

          {/* Home indicator bar at bottom */}
          <div className="w-full h-4 bg-[#fbf9f5] flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-[#18120e]/30 rounded-full"></div>
          </div>
        </div>

        {/* Floating Switcher Hint */}
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#d1c4be] mt-4 text-center">
          Viewing mobile design shell. Click "Full Width" in top bar to switch back.
        </p>

        {/* Modals & Overlays */}
        <NavigationDrawer />
        <AboutModal />
        <QuickViewModal />
        <CheckoutModal />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] flex flex-col relative selection:bg-[#ffdbd0] selection:text-[#8f4c35]">
      <Header />
      <main className="flex-1 flex flex-col">{renderScreen()}</main>
      <BottomNav />

      {/* Global Modals & Overlays */}
      <NavigationDrawer />
      <AboutModal />
      <QuickViewModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
