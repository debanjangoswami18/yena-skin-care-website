import React from 'react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform -translate-y-0 animate-in fade-in slide-in-from-top-4">
      <div className="bg-[#18120e] text-[#fbf9f5] px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 font-['Plus_Jakarta_Sans'] text-xs font-medium tracking-wide border border-[#4d4540]/30">
        <span className="material-symbols-outlined text-[18px] text-[#ffdbd0]">check_circle</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
