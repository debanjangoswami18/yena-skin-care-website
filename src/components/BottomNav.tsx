import React from 'react';
import { useShop, ScreenType } from '../context/ShopContext';

export const BottomNav: React.FC = () => {
  const { activeScreen, setActiveScreen, cartCount, wishlistCount } = useShop();

  const navItems: { label: string; screen: ScreenType; icon: string; badge?: string | number }[] = [
    { label: 'Home', screen: 'home', icon: 'home' },
    { label: 'Shop', screen: 'shop', icon: 'spa' },
    { label: 'Offers', screen: 'offers', icon: 'local_offer', badge: '20% OFF' },
    { label: 'Wishlist', screen: 'wishlist', icon: 'favorite', badge: wishlistCount > 0 ? wishlistCount : undefined },
    { label: 'Cart', screen: 'cart', icon: 'shopping_bag', badge: cartCount > 0 ? cartCount : undefined },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fbf9f5]/90 backdrop-blur-xl border-t border-[#eae8e4] pb-safe shadow-[0_-2px_12px_rgba(45,38,34,0.05)] md:hidden">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeScreen === item.screen;
          return (
            <button
              key={item.label}
              onClick={() => setActiveScreen(item.screen)}
              className={`relative flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all ${
                isActive ? 'text-[#8f4c35] scale-105' : 'text-[#4d4540] hover:text-[#18120e]'
              }`}
            >
              {/* Badge for Offers */}
              {item.label === 'Offers' && (
                <span className="absolute -top-1 px-1.5 py-0.2 rounded-full bg-[#8f4c35] text-white font-['Plus_Jakarta_Sans'] text-[8px] font-bold tracking-tight">
                  20% OFF
                </span>
              )}

              {/* Icon */}
              <span
                className="material-symbols-outlined text-[22px]"
                style={item.screen === 'wishlist' && wishlistCount > 0 ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>

              {/* Numeric Badges for Wishlist & Cart */}
              {typeof item.badge === 'number' && (
                <span
                  className={`absolute top-1 right-3 min-w-[15px] h-3.5 px-0.5 rounded-full text-white text-[9px] font-['Plus_Jakarta_Sans'] font-bold leading-3.5 flex items-center justify-center ${
                    item.screen === 'cart' ? 'bg-[#18120e]' : 'bg-[#8f4c35]'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Label */}
              <span className={`text-[10px] font-['Plus_Jakarta_Sans'] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
