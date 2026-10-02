import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ALL_PRODUCTS,
  CATEGORIES,
  CONCERN_CARDS,
  SOCIAL_GALLERY,
  REVIEWS,
  BRAND_ASSETS
} from '../data/skincareData';

export const HomeScreen: React.FC = () => {
  const {
    setActiveScreen,
    openProductDetails,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsAboutOpen,
    showToast
  } = useShop();

  const [selectedConcern, setSelectedConcern] = useState<string>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Welcome to YENA! Code WELCOME100 sent to ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  const filteredConcerns =
    selectedConcern === 'all'
      ? CONCERN_CARDS
      : CONCERN_CARDS.filter((c) => c.id === selectedConcern);

  const bestSellers = ALL_PRODUCTS.slice(0, 6);

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12">
      {/* 1. Editorial Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#f5f3ef]">
        <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] overflow-hidden">
          <img
            src={BRAND_ASSETS.heroImage}
            alt="YENA luxury skincare bottles on natural travertine stone with morning sunlight shadows"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f5] via-[#fbf9f5]/40 to-transparent"></div>
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#18120e]/60 via-[#18120e]/20 to-transparent"></div>

          {/* Ambient Floating Trust Badge */}
          <div className="absolute top-4 left-4 sm:left-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fbf9f5]/90 backdrop-blur-md text-[#4d4540] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold shadow-sm border border-[#eae8e4]/60">
              <span className="w-2 h-2 rounded-full bg-[#8f4c35]"></span>
              Clean • Dermatologist Backed • 100% Vegan
            </span>
          </div>

          {/* Hero Typography & CTAs */}
          <div className="absolute bottom-6 sm:bottom-10 inset-x-4 sm:inset-x-8 max-w-2xl flex flex-col gap-2.5">
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-5xl lg:text-6xl text-[#18120e] lg:text-white leading-[1.15] font-normal tracking-tight">
              Healthy Skin.<br />
              <span className="italic font-normal text-[#8f4c35] lg:text-[#ffdbd0]">
                Naturally You.
              </span>
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-[#4d4540] lg:text-white/90 max-w-md leading-relaxed">
              Simple, clinically balanced botanicals designed for your everyday mindful glow. Honouring dermal harmony with restorative cellular nourishment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveScreen('shop')}
                className="h-12 px-6 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 hover:bg-[#2d2622] transition-all"
              >
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => openProductDetails(ALL_PRODUCTS[0])}
                className="h-12 px-6 rounded-full bg-white/90 backdrop-blur-md text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-semibold tracking-wider uppercase shadow-sm active:scale-95 hover:bg-white transition-all border border-[#eae8e4]"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>

        {/* Quick Trust Badges Strip (4 items) */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-[#efeeea]">
              <div className="w-8 h-8 rounded-full bg-[#ffdbd0]/60 flex items-center justify-center text-[#8f4c35] shrink-0">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] font-semibold leading-tight">
                  Free Shipping
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  On orders over ₹499
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-[#efeeea]">
              <div className="w-8 h-8 rounded-full bg-[#d7e7d1]/70 flex items-center justify-center text-[#111f11] shrink-0">
                <span className="material-symbols-outlined text-[18px]">cruelty_free</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] font-semibold leading-tight">
                  Cruelty Free
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  100% PETA Certified
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-[#efeeea]">
              <div className="w-8 h-8 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#18120e] shrink-0">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] font-semibold leading-tight">
                  Derma Tested
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  Non-comedogenic care
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-[#efeeea]">
              <div className="w-8 h-8 rounded-full bg-[#ffdbd0]/60 flex items-center justify-center text-[#8f4c35] shrink-0">
                <span className="material-symbols-outlined text-[18px]">spa</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] font-semibold leading-tight">
                  Clean Formulas
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  Zero toxins or parabens
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Explore by Ritual (Category Carousel Scroller) */}
      <section className="py-8 sm:py-12 max-w-[1240px] mx-auto w-full">
        <div className="px-4 sm:px-6 lg:px-8 flex items-end justify-between mb-4">
          <div>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-widest block">
              Apothecary
            </span>
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#18120e] mt-0.5">
              Explore by Ritual
            </h2>
          </div>
          <button
            onClick={() => setActiveScreen('shop')}
            className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#8f4c35] flex items-center gap-0.5 hover:underline"
          >
            <span>See all</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Scroller Container */}
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-3 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveScreen('shop')}
              className="flex-shrink-0 w-24 sm:w-28 flex flex-col items-center group text-center focus:outline-none"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#efeeea] p-1 shadow-sm transition-transform duration-300 group-hover:scale-105 border border-[#eae8e4]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] mt-2 font-semibold line-clamp-1">
                {cat.name}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
                {cat.subtext}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Iconic Formulas (Best Sellers Grid) */}
      <section className="py-8 sm:py-12 w-full bg-[#f5f3ef]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8f4c35]"></span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-wider">
                  Most Loved
                </span>
              </div>
              <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#18120e] mt-0.5">
                Iconic Formulas
              </h2>
            </div>
            <button
              onClick={() => setActiveScreen('shop')}
              className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#8f4c35] flex items-center gap-1 hover:underline"
            >
              <span>View all</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Grid (2 cols mobile, 3 cols tablet, 3-4 cols desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {bestSellers.map((product) => {
              const wish = isWishlisted(product.id);
              return (
                <article
                  key={product.id}
                  className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative group border border-[#efeeea]"
                >
                  {/* Image container */}
                  <div
                    onClick={() => openProductDetails(product)}
                    className="relative w-full aspect-[4/5] bg-[#f5f3ef] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#390c00] font-['Plus_Jakarta_Sans'] text-[9px] font-bold">
                        {product.discount}
                      </span>
                    )}
                    <button
                      aria-label="Add to wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1b1c1a] hover:bg-white transition-colors shadow-sm"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={wish ? { fontVariationSettings: "'FILL' 1", color: '#8f4c35' } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[#4d4540] font-['Plus_Jakarta_Sans'] text-[10px]">
                      {product.volume}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-3 flex flex-col flex-grow justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-[#7f7570] mb-1">
                        <span
                          className="material-symbols-outlined text-[14px] text-[#8f4c35]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-bold text-[#18120e]">{product.rating}</span>
                        <span className="text-[10px]">({product.reviewCount})</span>
                      </div>
                      <h3
                        onClick={() => openProductDetails(product)}
                        className="font-['Playfair_Display'] text-sm text-[#18120e] font-semibold line-clamp-1 leading-snug cursor-pointer hover:text-[#8f4c35] transition-colors"
                      >
                        {product.name}
                      </h3>
                      <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#4d4540] line-clamp-1 mt-0.5">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#f5f3ef]">
                      <div className="flex flex-col">
                        <span className="font-['Playfair_Display'] text-sm text-[#18120e] font-bold">
                          ₹{product.price}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <button
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#18120e] text-white flex items-center justify-center shadow-md active:scale-90 hover:bg-[#2d2622] transition-all"
                        title="Add to ritual bag"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner Section ('Your Glow Starts Here') */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="relative overflow-hidden rounded-2xl bg-[#2d2622] text-white p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[#8f4c35]/30 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#ffb59d]/20 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#ffdbd0] text-[10px] font-['Plus_Jakarta_Sans'] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              FESTIVE RITUAL DROP
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-4xl text-white leading-tight font-normal">
              Your Glow Starts Here.
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-[#978c87] leading-relaxed">
              Get up to 20% OFF on selected skincare essentials. Formulated for everyday harmony and pure dermal restoration.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-lg">
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#978c87]">Use Code:</span>
                <span className="font-mono text-xs text-[#ffdbd0] font-bold tracking-widest">
                  GLOW20
                </span>
              </div>
              <button
                onClick={() => setActiveScreen('offers')}
                className="px-6 py-2.5 rounded-full bg-[#8f4c35] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#a0553d] active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Shop Offers</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Shop by Skin Concern (Interactive filter & cards) */}
      <section className="py-6 sm:py-10 max-w-[1240px] mx-auto w-full">
        <div className="px-4 sm:px-6 lg:px-8 mb-4">
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-wider">
            Targeted Care
          </span>
          <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#18120e] mt-0.5">
            Shop by Skin Concern
          </h2>
        </div>

        {/* Concern Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-3 no-scrollbar">
          {[
            { id: 'all', label: 'All Concerns' },
            { id: 'acne', label: 'Acne & Breakouts' },
            { id: 'dryness', label: 'Dry Skin' },
            { id: 'dullness', label: 'Dull Skin' },
            { id: 'sensitive', label: 'Sensitive Barrier' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedConcern(pill.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-medium transition-all shadow-sm ${
                selectedConcern === pill.id
                  ? 'bg-[#18120e] text-white'
                  : 'bg-white text-[#4d4540] hover:bg-[#efeeea] border border-[#efeeea]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Concern Cards Grid */}
        <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredConcerns.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveScreen('shop')}
              className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#efeeea] shadow-sm group cursor-pointer border border-[#eae8e4]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18120e]/85 via-[#18120e]/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-['Plus_Jakarta_Sans'] text-[9px] uppercase tracking-wider text-[#ffdbd0] font-semibold">
                  {card.tag}
                </span>
                <h3 className="font-['Playfair_Display'] text-sm sm:text-base text-white font-semibold leading-tight mt-0.5">
                  {card.title}
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-xs text-white/80 line-clamp-1 mt-0.5">
                  {card.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Skin Loves YENA (Philosophy & Pillars) */}
      <section className="py-12 sm:py-16 w-full bg-[#f5f3ef]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-widest">
              Philosophy
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#18120e] mt-1">
              Why Skin Loves YENA
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4d4540] mt-1.5 leading-relaxed">
              Formulated at the nexus of clinical rigor and pure botanical harmony for mindful restorative beauty.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-white shadow-sm flex flex-col gap-2 border border-[#efeeea]">
              <div className="w-10 h-10 rounded-full bg-[#ffdbd0]/60 text-[#8f4c35] flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[22px]">science</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-sm sm:text-base text-[#18120e] font-semibold">
                Dermatologically Tested
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed">
                Clinically evaluated for hypoallergenic safety on all Indian skin types and climatic humidity.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white shadow-sm flex flex-col gap-2 border border-[#efeeea]">
              <div className="w-10 h-10 rounded-full bg-[#d7e7d1]/70 text-[#111f11] flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[22px]">psychiatry</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-sm sm:text-base text-[#18120e] font-semibold">
                Skin-Loving Actives
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed">
                High-grade molecules balanced with calming plant antioxidants to support cellular longevity.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white shadow-sm flex flex-col gap-2 border border-[#efeeea]">
              <div className="w-10 h-10 rounded-full bg-[#eae8e4] text-[#18120e] flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[22px]">eco</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-sm sm:text-base text-[#18120e] font-semibold">
                100% Cruelty Free
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed">
                PETA certified vegan formulas with zero animal testing or toxic adulterants ever.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white shadow-sm flex flex-col gap-2 border border-[#efeeea]">
              <div className="w-10 h-10 rounded-full bg-[#ffdbd0]/40 text-[#793b26] flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[22px]">repeat</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-sm sm:text-base text-[#18120e] font-semibold">
                Everyday Barrier Safe
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed">
                pH 5.5 neutral balancing so skin never feels stripped, stung, or uncomfortably dehydrated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Founder & Formulator Profile Spotlight */}
      <section className="py-8 sm:py-12 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f5f3ef] rounded-3xl p-6 sm:p-10 border border-[#eae8e4] flex flex-col md:flex-row items-center gap-6 sm:gap-10 shadow-xs">
          <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md ring-2 ring-[#d1c4be] bg-white">
              <img
                src={BRAND_ASSETS.founder.photo}
                alt="Debanjan Goswami - CO-FOUNDER & CBO"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#5b7358] text-white p-1.5 rounded-full border-2 border-white shadow-xs" title="Verified Formulator">
              <span className="material-symbols-outlined text-[16px] block">verified</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col text-center md:text-left">
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-wider">
              From the Co-Founder's Desk
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#18120e] mt-1">
              Meet {BRAND_ASSETS.founder.name}
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#7f7570] mt-0.5">
              {BRAND_ASSETS.founder.title} • {BRAND_ASSETS.founder.location}
            </p>

            <blockquote className="font-['Playfair_Display'] text-sm sm:text-base text-[#2d2622] italic leading-relaxed mt-4 bg-white/70 p-4 rounded-xl border border-[#efeeea]">
              “{BRAND_ASSETS.founder.bio}”
            </blockquote>

            <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#2d2622] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Read Full Atelier Story</span>
                <span className="material-symbols-outlined text-[14px]">east</span>
              </button>
              <button
                onClick={() => setActiveScreen('shop')}
                className="px-5 py-2.5 rounded-full border border-[#d1c4be] text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-white transition-colors"
              >
                Explore Formulations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Community Testimonials ('Real Skin. Real Joy.') */}
      <section className="py-8 sm:py-14 max-w-[1240px] mx-auto w-full">
        <div className="px-4 sm:px-6 lg:px-8 flex items-end justify-between mb-5">
          <div>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-wider">
              Community Voices
            </span>
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#18120e] mt-0.5">
              Real Skin. Real Joy.
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#8f4c35]">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#18120e]">
              4.9/5
            </span>
          </div>
        </div>

        {/* Carousel / Cards */}
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-3 no-scrollbar">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="flex-shrink-0 w-72 sm:w-80 p-4 sm:p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between border border-[#efeeea]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-[#8f4c35] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-[10px] px-2 py-0.5 rounded-full bg-[#d7e7d1] text-[#111f11] font-semibold">
                    Verified Buyer
                  </span>
                </div>
                <p className="font-['Playfair_Display'] text-xs sm:text-sm text-[#18120e] italic font-normal leading-relaxed mb-3">
                  "{rev.content}"
                </p>
              </div>
              <div className="flex items-center gap-2.5 pt-3 border-t border-[#efeeea]">
                <div className="w-8 h-8 rounded-full bg-[#ffdbd0] flex items-center justify-center font-bold text-[#8f4c35] text-xs font-['Plus_Jakarta_Sans']">
                  {rev.avatarText || 'YR'}
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] font-semibold">
                    {rev.author}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
                    {rev.skinProfile}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Social Feed @YENASkincare */}
      <section className="py-6 sm:py-10 max-w-[1240px] mx-auto w-full">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-4">
          <div>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#8f4c35] uppercase tracking-wider">
              Social Feed
            </span>
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#18120e] mt-0.5">
              Follow @YENASkincare
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-[#efeeea] text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-sm flex items-center gap-1 hover:bg-[#eae8e4] transition-all"
          >
            <span>Follow</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>

        {/* 4 Photos Grid */}
        <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-2 sm:gap-3">
          {SOCIAL_GALLERY.map((imgUrl, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden bg-[#efeeea] shadow-sm hover:opacity-90 transition-opacity cursor-pointer border border-[#eae8e4]"
            >
              <img
                src={imgUrl}
                alt="YENA Skincare ritual imagery on Instagram"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 9. Newsletter Signup ('Join the YENA Circle') */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="p-6 sm:p-10 rounded-2xl bg-[#efeeea] text-center flex flex-col items-center gap-2.5 shadow-sm border border-[#eae8e4]">
          <div className="w-12 h-12 rounded-full bg-[#ffdbd0]/60 text-[#8f4c35] flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[24px]">mail</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#18120e]">
            Join the YENA Circle
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4d4540] max-w-sm leading-relaxed">
            Receive dermatologist tips, early access to festive formulations, and ₹100 off your first ritual.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="w-full max-w-md mt-2 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 h-12 px-4 rounded-full bg-white text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs sm:text-sm placeholder:text-[#7f7570] focus:outline-none focus:ring-1 focus:ring-[#8f4c35] shadow-sm"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#2d2622] active:scale-95 transition-all shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Unlock ₹100 Off</span>
              <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </form>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
            No spam. Only mindful skincare wisdom. Unsubscribe anytime.
          </span>
        </div>
      </section>

      {/* 10. Brand Story & Trust Badges Footer */}
      <footer className="w-full bg-[#eae8e4] px-4 sm:px-6 lg:px-8 py-10 mt-6 border-t border-[#d1c4be]">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2.5">
              <img
                src={BRAND_ASSETS.logo}
                alt="YENA Skincare Brand Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="font-['Playfair_Display'] text-base text-[#18120e] font-bold tracking-wide">
                YENA SKINCARE ATELIERS
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed">
              Crafted in harmony with skin physiology and the natural world. Pure actives, barrier-respecting pH, and honest formulations created for your daily mindful ritual.
            </p>
          </div>

          {/* Quick Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#18120e] uppercase font-bold tracking-wider">
                Quick Rituals
              </span>
              <button onClick={() => setActiveScreen('shop')} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] hover:text-[#18120e]">Best Sellers</button>
              <button onClick={() => setActiveScreen('shop')} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] hover:text-[#18120e]">Shop by Concern</button>
              <button onClick={() => setActiveScreen('offers')} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] hover:text-[#18120e]">Festive Offers</button>
              <button onClick={() => setActiveScreen('shop')} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] hover:text-[#18120e]">All Formulas</button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#18120e] uppercase font-bold tracking-wider">
                Customer Care
              </span>
              <button onClick={() => showToast('Order tracking active via SMS')} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] hover:text-[#18120e]">Track Order</button>
              <button onClick={() => showToast('Support concierge available 24/7')} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] hover:text-[#18120e]">FAQ & Support</button>
              <button onClick={() => setIsAboutOpen(true)} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#8f4c35] font-semibold hover:underline">Our Story & Founder</button>
              <button onClick={() => showToast('Contact: concierge@yenaskincare.com')} className="text-left font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] hover:text-[#18120e]">Contact Us</button>
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#18120e] uppercase font-bold tracking-wider">
                Safety & Compliance
              </span>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed">
                All formulations comply with GMP ISO 22716 standards. Eco-friendly amber glass protects bioactive compounds from light degradation without preservative overload.
              </p>
            </div>
          </div>

          {/* Payment Trust Badges */}
          <div className="p-3.5 rounded-xl bg-white flex flex-col gap-2 shadow-sm border border-[#d1c4be]/60">
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] uppercase tracking-wider text-center font-semibold">
              100% Secure Checkout & Certified Pure
            </span>
            <div className="flex items-center justify-around text-[#4d4540]">
              <div className="flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs font-medium">
                <span className="material-symbols-outlined text-[18px] text-[#8f4c35]">lock</span>
                <span>Encrypted 256-Bit</span>
              </div>
              <div className="flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs font-medium">
                <span className="material-symbols-outlined text-[18px] text-[#8f4c35]">assignment_return</span>
                <span>15-Day Return</span>
              </div>
              <div className="flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs font-medium">
                <span className="material-symbols-outlined text-[18px] text-[#8f4c35]">payments</span>
                <span>COD Available</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-2 pb-2">
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570]">
              © 2026 YENA Skincare Ateliers Pvt. Ltd. All rights reserved. Crafted for quiet luxury.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
