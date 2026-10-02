import React from 'react';
import { useShop } from '../context/ShopContext';

interface FilterDrawerProps {
  selectedSkinTypes: string[];
  setSelectedSkinTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedConcerns: string[];
  setSelectedConcerns: React.Dispatch<React.SetStateAction<string[]>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void;
  filteredCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  selectedSkinTypes,
  setSelectedSkinTypes,
  selectedConcerns,
  setSelectedConcerns,
  maxPrice,
  setMaxPrice,
  onReset,
  filteredCount
}) => {
  const { isFilterOpen, setIsFilterOpen } = useShop();

  if (!isFilterOpen) return null;

  const skinTypes = ['oily', 'dry', 'combination', 'sensitive', 'normal'];
  const skinTypeLabels: Record<string, string> = {
    oily: 'Oily',
    dry: 'Dry',
    combination: 'Combination',
    sensitive: 'Sensitive',
    normal: 'Normal'
  };

  const concerns = ['pigmentation', 'acne', 'anti-aging', 'hydration', 'sun-damage'];
  const concernLabels: Record<string, string> = {
    pigmentation: 'Pigmentation',
    acne: 'Acne & Blemishes',
    'anti-aging': 'Anti-Aging',
    hydration: 'Hydration',
    'sun-damage': 'Sun Damage'
  };

  const toggleSkinType = (type: string) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const totalActive = selectedSkinTypes.length + selectedConcerns.length + (maxPrice < 1500 ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2d2622]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Drawer */}
      <aside className="relative w-full max-w-lg bg-[#fbf9f5] rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-10 border-t border-[#eae8e4] pb-safe animate-in slide-in-from-bottom duration-300">
        {/* Drawer Handle & Header */}
        <div className="pt-3 pb-3 px-5 flex flex-col items-center bg-[#fbf9f5] border-b border-[#efeeea] sticky top-0 z-10">
          <div className="w-10 h-1 rounded-full bg-[#d1c4be] mb-3"></div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-['Playfair_Display'] text-lg font-bold text-[#18120e]">
                Filter Routine
              </h2>
              {totalActive > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#390c00] font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                  {totalActive} Selected
                </span>
              )}
            </div>
            <button
              onClick={onReset}
              className="font-['Plus_Jakarta_Sans'] text-xs text-[#8f4c35] font-semibold hover:underline"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 flex flex-col gap-5 no-scrollbar">
          {/* Skin Type */}
          <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2.5 border border-[#efeeea]">
            <div className="flex items-center justify-between">
              <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
                Skin Type
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
                Personalized
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skinTypes.map((type) => {
                const isSelected = selectedSkinTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleSkinType(type)}
                    className={`px-3.5 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#8f4c35] text-white shadow-sm'
                        : 'bg-[#efeeea] text-[#4d4540] hover:bg-[#eae8e4]'
                    }`}
                  >
                    {skinTypeLabels[type]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Concern */}
          <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2.5 border border-[#efeeea]">
            <div className="flex items-center justify-between">
              <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
                Primary Concern
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
                Targeted Actives
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {concerns.map((concern) => {
                const isSelected = selectedConcerns.includes(concern);
                return (
                  <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    className={`px-3.5 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#8f4c35] text-white shadow-sm'
                        : 'bg-[#efeeea] text-[#4d4540] hover:bg-[#eae8e4]'
                    }`}
                  >
                    {concernLabels[concern]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-[#efeeea]">
            <div className="flex items-center justify-between">
              <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
                Price Range
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#8f4c35] font-bold">
                Up to ₹{maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={249}
              max={1500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-[#eae8e4] rounded-lg appearance-none cursor-pointer accent-[#8f4c35]"
            />
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setMaxPrice(499)}
                className={`px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] text-[11px] transition-colors ${
                  maxPrice === 499 ? 'bg-[#ffdbd0] text-[#390c00] font-bold' : 'bg-[#efeeea] text-[#4d4540]'
                }`}
              >
                Under ₹499
              </button>
              <button
                onClick={() => setMaxPrice(799)}
                className={`px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] text-[11px] transition-colors ${
                  maxPrice === 799 ? 'bg-[#ffdbd0] text-[#390c00] font-bold' : 'bg-[#efeeea] text-[#4d4540]'
                }`}
              >
                ₹499 - ₹799
              </button>
              <button
                onClick={() => setMaxPrice(1500)}
                className={`px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] text-[11px] transition-colors ${
                  maxPrice === 1500 ? 'bg-[#ffdbd0] text-[#390c00] font-bold' : 'bg-[#efeeea] text-[#4d4540]'
                }`}
              >
                All Prices
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Apply Button */}
        <div className="p-4 bg-white border-t border-[#efeeea]">
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full h-12 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center shadow-md active:scale-98 transition-all hover:bg-[#2d2622]"
          >
            Apply Filters ({filteredCount} Formulations)
          </button>
        </div>
      </aside>
    </div>
  );
};
