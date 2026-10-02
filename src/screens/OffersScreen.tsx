import React from 'react';
import { useShop } from '../context/ShopContext';

export const OffersScreen: React.FC = () => {
  const { applyCoupon, setActiveScreen, showToast } = useShop();

  const offers = [
    {
      code: 'GLOW20',
      title: 'Festive Ritual Privilege',
      discount: 'Flat 20% OFF Entire Order',
      description: 'Receive 20% off across all active botanical serums, cleansers, and barrier repair treatments.',
      minSpend: 'No minimum order required',
      expiry: 'Valid through festive season',
      tag: 'MOST POPULAR'
    },
    {
      code: 'WELCOME100',
      title: 'First Sacred Ritual',
      discount: '₹100 Instant Discount',
      description: 'An introductory atelier honorarium dedicated to new patrons embracing pure mindful skincare.',
      minSpend: 'Orders over ₹599',
      expiry: 'First purchase exclusively',
      tag: 'NEW PATRONS'
    },
    {
      code: 'SILKPOUCH',
      title: 'Complimentary Silk Travel Pouch',
      discount: 'Free Luxury Gift (Worth ₹450)',
      description: 'Handcrafted mulberry silk drawstring protective pouch auto-unlocked on orders exceeding ₹1,499.',
      minSpend: 'Orders over ₹1,499',
      expiry: 'Until stocks last',
      tag: 'AUTO UNLOCKED'
    }
  ];

  const handleCopyCode = (code: string) => {
    applyCoupon(code);
    navigator.clipboard?.writeText(code);
    showToast(`Code ${code} copied & applied to your Bag!`);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full pb-28">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#8f4c35]"></span>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-wider">
            Atelier Privileges
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-[#18120e]">
          Offers & Sacred Codes
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4d4540] mt-1.5 max-w-lg leading-relaxed">
          Mindfully formulated discounts and seasonal gift milestones created to celebrate your skincare dedication.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <div
            key={offer.code}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#efeeea] flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffdbd0]/20 rounded-bl-full pointer-events-none"></div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#390c00] font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-wider mb-3">
                {offer.tag}
              </span>

              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#18120e]">
                {offer.title}
              </h3>
              <div className="font-['Playfair_Display'] text-lg font-bold text-[#8f4c35] mt-1">
                {offer.discount}
              </div>

              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] mt-2.5 leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f5f3ef] flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] font-['Plus_Jakarta_Sans'] text-[#7f7570]">
                <span>{offer.minSpend}</span>
                <span>{offer.expiry}</span>
              </div>

              <div className="flex items-center justify-between bg-[#f5f3ef] rounded-xl p-2 pl-3.5 border border-[#eae8e4]">
                <span className="font-mono text-xs font-bold text-[#18120e] tracking-widest">
                  {offer.code}
                </span>
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-[11px] font-semibold uppercase tracking-wider hover:bg-[#2d2622] transition-colors"
                >
                  Apply Code
                </button>
              </div>

              <button
                onClick={() => setActiveScreen('shop')}
                className="w-full text-center text-xs font-['Plus_Jakarta_Sans'] text-[#8f4c35] font-semibold hover:underline mt-1"
              >
                Shop Qualifying Formulas →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
