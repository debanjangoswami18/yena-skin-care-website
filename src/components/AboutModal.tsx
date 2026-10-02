import React from 'react';
import { useShop } from '../context/ShopContext';
import { BRAND_ASSETS } from '../data/skincareData';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen, setActiveScreen } = useShop();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2d2622]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAboutOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#fbf9f5] rounded-3xl shadow-2xl overflow-hidden border border-[#eae8e4] z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Modal Top Bar */}
        <div className="p-4 px-6 flex items-center justify-between border-b border-[#efeeea] bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8f4c35] text-[20px]">spa</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-widest text-[#7f7570]">
              Atelier Story & Founder
            </span>
          </div>
          <button
            onClick={() => setIsAboutOpen(false)}
            aria-label="Close About Modal"
            className="w-8 h-8 rounded-full bg-[#efeeea] flex items-center justify-center text-[#18120e] hover:bg-[#eae8e4] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 no-scrollbar">
          {/* Profile Hero Box */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left bg-white p-6 rounded-2xl border border-[#efeeea] shadow-xs">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md shrink-0 ring-2 ring-[#d1c4be]">
              <img
                src={BRAND_ASSETS.founder.photo}
                alt="Debanjan Goswami - CO-FOUNDER & CBO"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#5b7358] border-2 border-white" title="Active Formulator"></span>
            </div>

            <div className="flex flex-col justify-center">
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold text-[#8f4c35] uppercase tracking-wider">
                CO-FOUNDER & CBO
              </span>
              <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#18120e] mt-0.5">
                {BRAND_ASSETS.founder.name}
              </h2>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570] mt-0.5">
                {BRAND_ASSETS.founder.location}
              </span>

              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#d7e7d1] text-[#111f11] font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">
                  Ayurvedic Phyto-Alchemist
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#390c00] font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">
                  Dermato-Chemistry
                </span>
              </div>
            </div>
          </div>

          {/* Founder Quote & Philosophy */}
          <div className="p-5 rounded-2xl bg-[#f5f3ef] border border-[#efeeea] flex flex-col gap-2.5">
            <span className="font-['Playfair_Display'] text-2xl text-[#8f4c35] leading-none select-none">“</span>
            <p className="font-['Playfair_Display'] text-sm sm:text-base text-[#18120e] italic leading-relaxed -mt-3">
              {BRAND_ASSETS.founder.bio}
            </p>
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#8f4c35] text-right">
              — Debanjan Goswami
            </span>
          </div>

          {/* Brand Philosophy Pillars */}
          <div className="flex flex-col gap-3">
            <h3 className="font-['Playfair_Display'] text-base font-bold text-[#18120e]">
              The YENA Skincare Constitution
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-['Plus_Jakarta_Sans']">
              <div className="p-3.5 rounded-xl bg-white border border-[#efeeea]">
                <div className="flex items-center gap-1.5 text-[#8f4c35] font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">science</span>
                  <span>Pure Bio-Actives</span>
                </div>
                <p className="text-[#4d4540] leading-snug">
                  Zero oxidation stability, clinical percentages of Ethyl Ascorbic Acid, Multi-Hyaluronics, and Bio-Ferulic shields.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#efeeea]">
                <div className="flex items-center gap-1.5 text-[#111f11] font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">eco</span>
                  <span>Conscious Vegan</span>
                </div>
                <p className="text-[#4d4540] leading-snug">
                  100% PETA certified cruelty-free, recyclable pharmaceutical amber glass vessels, zero parabens or microplastics.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                setIsAboutOpen(false);
                setActiveScreen('shop');
              }}
              className="flex-1 h-12 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#2d2622] transition-colors"
            >
              Explore Formulated Rituals
            </button>
            <button
              onClick={() => {
                setIsAboutOpen(false);
                setActiveScreen('product');
              }}
              className="px-5 h-12 rounded-full border border-[#d1c4be] text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#efeeea] transition-colors"
            >
              Signature Vitamin C
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
