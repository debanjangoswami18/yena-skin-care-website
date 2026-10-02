import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  FEATURED_SERUM,
  SYNERGY_BUNDLE,
  REVIEWS,
  TRANSFORMATION_PHOTOS,
  ALL_PRODUCTS,
  Product
} from '../data/skincareData';

export const ProductDetailsScreen: React.FC = () => {
  const {
    selectedProduct,
    setActiveScreen,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCheckoutOpen,
    showToast
  } = useShop();

  const product: Product = selectedProduct || FEATURED_SERUM;
  const isHearted = isWishlisted(product.id);

  // Gallery state
  const galleryImages = product.gallery || [product.image];
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState<'30ml' | '50ml'>('30ml');
  const [quantity, setQuantity] = useState(1);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>('acc-1');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [reviewFormData, setReviewFormData] = useState({ name: '', text: '', rating: 5 });

  // Price calculations
  const unitPrice = selectedVolume === '30ml' ? 699 : 999;
  const mrpPrice = selectedVolume === '30ml' ? 899 : 1399;
  const totalPrice = unitPrice * quantity;
  const totalMrp = mrpPrice * quantity;

  const toggleAccordion = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  const handleBuyRoutine = () => {
    // Add all 3 bundle items to cart
    SYNERGY_BUNDLE.steps.forEach((step) => {
      const match = ALL_PRODUCTS.find((p) => p.name.includes(step.name.split(' ')[0])) || product;
      addToCart(match, step.volume, 1);
    });
    showToast('The 3-Step Radiance Synergy Routine added to Bag!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText) return;
    showToast('Question submitted to Atelier Chemist. Response via email.');
    setQuestionText('');
    setIsAskModalOpen(false);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Review submitted for verified evaluation.');
    setIsReviewModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full pb-28 bg-[#fbf9f5] min-h-screen">
      {/* PDP Top Sub-Header */}
      <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-[#efeeea] bg-[#fbf9f5]">
        <button
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-1 text-xs font-['Plus_Jakarta_Sans'] font-semibold text-[#18120e] hover:text-[#8f4c35] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Atelier</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share Formulation"
            className="w-9 h-9 rounded-full bg-[#efeeea] flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Wishlist"
            className="w-9 h-9 rounded-full bg-[#efeeea] flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4] transition-colors"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={isHearted ? { fontVariationSettings: "'FILL' 1", color: '#8f4c35' } : undefined}
            >
              favorite
            </span>
          </button>
        </div>
      </div>

      {/* Main Two-Column PDP Layout */}
      <main className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 lg:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Media Gallery (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-4 sticky top-24">
          <section className="relative w-full overflow-hidden rounded-2xl bg-[#f5f3ef] shadow-sm border border-[#eae8e4]">
            {/* Gallery Viewport */}
            <div
              className="flex w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {galleryImages.map((src, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative aspect-[4/5] bg-[#f5f3ef] flex items-center justify-center cursor-pointer"
                  onClick={() => setIsZoomOpen(true)}
                >
                  <img
                    src={src}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <span className="bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-[10px] uppercase px-3 py-1.5 rounded-full tracking-wider font-bold shadow-sm">
                Bestseller
              </span>
              <span className="bg-[#d7e7d1] text-[#111f11] font-['Plus_Jakarta_Sans'] text-[10px] uppercase px-3 py-1.5 rounded-full tracking-wider font-semibold">
                Clinical Grade
              </span>
            </div>

            {/* Zoom Button */}
            <button
              aria-label="Expand image"
              onClick={() => setIsZoomOpen(true)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#18120e] shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">zoom_in</span>
            </button>

            {/* Carousel Dots & Wishlist Icon */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === i ? 'w-5 bg-[#18120e]' : 'w-2 bg-[#d1c4be]'
                    }`}
                  />
                ))}
              </div>

              <button
                aria-label="Save to Wishlist"
                onClick={() => toggleWishlist(product.id)}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#18120e] shadow-sm active:scale-90 transition-transform"
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isHearted ? { fontVariationSettings: "'FILL' 1", color: '#8f4c35' } : undefined}
                >
                  favorite
                </span>
              </button>
            </div>
          </section>

          {/* Thumbnails strip */}
          <div className="hidden sm:flex gap-3">
            {galleryImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  activeSlide === i ? 'border-[#18120e] shadow-sm scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Meta, Selection & Secrets (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Header Block */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#8f4c35]">
                <span className="material-symbols-outlined text-[16px]">spa</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-widest font-semibold">
                  YENA Atelier Skincare
                </span>
              </div>
              <div className="flex items-center gap-1 bg-[#efeeea] px-2.5 py-1 rounded-full">
                <span
                  className="material-symbols-outlined text-[15px] text-[#8f4c35]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#18120e]">
                  {product.rating}
                </span>
                <span className="text-[#7f7570] font-['Plus_Jakarta_Sans'] text-[11px]">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#18120e] leading-snug">
              {product.name}
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4d4540] leading-relaxed">
              {product.subtitle}
            </p>

            {/* Pricing Row */}
            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-baseline gap-2.5">
                <span className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#18120e]">
                  ₹{totalPrice}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#7f7570] line-through">
                  ₹{totalMrp}
                </span>
                <span className="bg-[#ffdbd0] text-[#390c00] font-['Plus_Jakarta_Sans'] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Save {selectedVolume === '30ml' ? '22%' : '28%'}
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#7f7570]">
                MRP inclusive of all taxes. Free express shipping on this order.
              </p>
            </div>

            {/* Trust Micro-Row */}
            <div className="mt-3 flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#f5f3ef] text-[#1b1c1a] border border-[#efeeea]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#8f4c35]">credit_card</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium">EMI from ₹233/mo</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#d1c4be]"></span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#8f4c35]">local_shipping</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-medium">COD Available</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#d1c4be]"></span>
              <button
                onClick={() => setIsAskModalOpen(true)}
                className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8f4c35] underline underline-offset-2 font-medium"
              >
                Ask a Question
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold uppercase tracking-wider text-[#7f7570]">
                Select Volume
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8f4c35] font-medium">
                Which size is right for you?
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* 30ml Standard */}
              <button
                type="button"
                onClick={() => setSelectedVolume('30ml')}
                className={`p-3 rounded-xl text-left transition-all shadow-sm border ${
                  selectedVolume === '30ml'
                    ? 'bg-[#18120e] text-white border-[#18120e]'
                    : 'bg-[#efeeea] text-[#1b1c1a] border-transparent hover:bg-[#eae8e4]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold">30ml Standard</span>
                  {selectedVolume === '30ml' && (
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  )}
                </div>
                <div className="font-['Playfair_Display'] text-lg font-bold mt-1">₹699</div>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] opacity-80 block mt-0.5">
                  Daily ritual • 4-5 wks
                </span>
              </button>

              {/* 50ml Value Pack */}
              <button
                type="button"
                onClick={() => setSelectedVolume('50ml')}
                className={`p-3 rounded-xl text-left transition-all shadow-sm border ${
                  selectedVolume === '50ml'
                    ? 'bg-[#18120e] text-white border-[#18120e]'
                    : 'bg-[#efeeea] text-[#1b1c1a] border-transparent hover:bg-[#eae8e4]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold">50ml Value Pack</span>
                  {selectedVolume === '50ml' && (
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  )}
                </div>
                <div className="font-['Playfair_Display'] text-lg font-bold mt-1">₹999</div>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#ffdbd0] font-semibold block mt-0.5">
                  Save ₹400 extra
                </span>
              </button>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between p-3 bg-[#efeeea] rounded-xl mt-1">
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] font-semibold">
                  Quantity
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
                  Stocked & ready to dispatch
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full shadow-sm">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-[#18120e] hover:bg-[#efeeea] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#18120e] min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-[#18120e] hover:bg-[#efeeea] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Clinical Results Bar Trio */}
          <div className="bg-[#f5f3ef] p-4 rounded-xl flex flex-col gap-3 border border-[#efeeea]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#8f4c35]">verified</span>
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold text-[#8f4c35] uppercase tracking-wider">
                Validated Clinical Efficacy
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-lg flex flex-col items-center shadow-xs">
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#18120e]">94%</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#4d4540] mt-0.5 leading-snug">
                  Observed instant glow
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg flex flex-col items-center shadow-xs">
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#8f4c35]">89%</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#4d4540] mt-0.5 leading-snug">
                  Reduced pigmentation
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg flex flex-col items-center shadow-xs">
                <span className="font-['Playfair_Display'] text-xl font-bold text-[#111f11]">96%</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#4d4540] mt-0.5 leading-snug">
                  Reinforced barrier
                </span>
              </div>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] text-center">
              *Independent 8-week clinical perception study with 140 participants.
            </p>
          </div>

          {/* Key Highlights Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#efeeea] p-3 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#8f4c35] shrink-0">
                <span className="material-symbols-outlined text-[18px]">science</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#18120e] truncate">
                  15% Ethyl Ascorbic
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  Ultra-stable vitamin C
                </span>
              </div>
            </div>

            <div className="bg-[#efeeea] p-3 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d7e7d1] flex items-center justify-center text-[#111f11] shrink-0">
                <span className="material-symbols-outlined text-[18px]">shield_with_heart</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#18120e] truncate">
                  1% Ferulic Acid
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  Antioxidant shield
                </span>
              </div>
            </div>

            <div className="bg-[#efeeea] p-3 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#18120e] shrink-0">
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#18120e] truncate">
                  Hyaluronic Complex
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  Multi-depth hydration
                </span>
              </div>
            </div>

            <div className="bg-[#efeeea] p-3 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#eae8e4] flex items-center justify-center text-[#18120e] shrink-0">
                <span className="material-symbols-outlined text-[18px]">cruelty_free</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#18120e] truncate">
                  Clean & Kind
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] truncate">
                  Fragrance-free & vegan
                </span>
              </div>
            </div>
          </div>

          {/* Upsell Routine: The 3-Step Synergy */}
          <div className="p-4 rounded-xl bg-[#eae8e4] flex flex-col gap-3 border border-[#d1c4be]/60">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase text-[#8f4c35] font-bold tracking-wider">
                  The 3-Step Synergy
                </span>
                <h3 className="font-['Playfair_Display'] text-base font-bold text-[#18120e]">
                  Complete Your Glow Routine
                </h3>
              </div>
              <span className="bg-[#8f4c35] text-white font-['Plus_Jakarta_Sans'] text-[10px] px-2.5 py-1 rounded-full font-bold">
                Save 15%
              </span>
            </div>

            <div className="flex items-center gap-2 py-1">
              {SYNERGY_BUNDLE.steps.map((st, idx) => (
                <React.Fragment key={st.step}>
                  <div className="flex-1 bg-white p-2 rounded-lg flex flex-col items-center text-center shadow-xs">
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-12 h-12 object-cover rounded-md mb-1"
                    />
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#18120e] font-semibold truncate w-full">
                      {st.step}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[9px] text-[#7f7570]">
                      ₹{st.price}
                    </span>
                  </div>
                  {idx < SYNERGY_BUNDLE.steps.length - 1 && (
                    <span className="material-symbols-outlined text-[14px] text-[#7f7570]">
                      add
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              type="button"
              onClick={handleBuyRoutine}
              className="w-full h-11 bg-[#18120e] text-white rounded-full font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-98 transition-all hover:bg-[#2d2622] shadow-sm"
            >
              <span>Buy Routine for ₹1,399</span>
              <span className="line-through text-[#978c87] text-[11px]">₹1,647</span>
            </button>
          </div>

          {/* Formula & Ritual Secrets Accordions */}
          <div className="flex flex-col gap-2 pt-2">
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#18120e]">
              Formula & Ritual Secrets
            </h3>

            {/* Accordion 1 */}
            <div className="rounded-xl bg-[#efeeea] overflow-hidden">
              <button
                onClick={() => toggleAccordion('acc-1')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold text-[#18120e]">
                  Formula Philosophy & Results
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#18120e] transition-transform duration-300 ${
                    expandedAccordion === 'acc-1' ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {expandedAccordion === 'acc-1' && (
                <div className="px-4 pb-4 font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed border-t border-[#eae8e4]/60 pt-2">
                  Formulated with advanced 3-O-Ethyl Ascorbic Acid, our formula ensures deep cutaneous penetration without premature oxidation. Ferulic acid doubles antioxidant performance while stabilized hyaluronic spheres replenish depleted lipid barriers.
                </div>
              )}
            </div>

            {/* Accordion 2 */}
            <div className="rounded-xl bg-[#efeeea] overflow-hidden">
              <button
                onClick={() => toggleAccordion('acc-2')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold text-[#18120e]">
                  Key Botanical & Active Ingredients
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#18120e] transition-transform duration-300 ${
                    expandedAccordion === 'acc-2' ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {expandedAccordion === 'acc-2' && (
                <div className="px-4 pb-4 flex flex-col gap-2 font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] border-t border-[#eae8e4]/60 pt-2">
                  <div>
                    <strong className="text-[#18120e]">Kakadu Plum Extract:</strong> World's richest biological source of vitamin C, revitalizes cellular vitality.
                  </div>
                  <div>
                    <strong className="text-[#18120e]">Niacinamide (Vitamin B3 2%):</strong> Minimizes dilated pore architecture and smooths texture irregularities.
                  </div>
                  <div>
                    <strong className="text-[#18120e]">Hydrolyzed Sodium Hyaluronate:</strong> Low-molecular hydration agent securing trans-epidermal moisture lock.
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3 */}
            <div className="rounded-xl bg-[#efeeea] overflow-hidden">
              <button
                onClick={() => toggleAccordion('acc-3')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold text-[#18120e]">
                  How to Use: The Morning Ritual
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#18120e] transition-transform duration-300 ${
                    expandedAccordion === 'acc-3' ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {expandedAccordion === 'acc-3' && (
                <div className="px-4 pb-4 flex flex-col gap-2 font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] border-t border-[#eae8e4]/60 pt-2">
                  <div className="flex items-start gap-2.5">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#8f4c35]">01</span>
                    <span>Dispense 3–4 drops onto freshly cleansed fingertips or palm.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#8f4c35]">02</span>
                    <span>Gently press into face, neck, and décolletage using upward gliding motions.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#8f4c35]">03</span>
                    <span>Follow immediately with your daily SPF 50 for synergistic photo-protection.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4 */}
            <div className="rounded-xl bg-[#efeeea] overflow-hidden">
              <button
                onClick={() => toggleAccordion('acc-4')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold text-[#18120e]">
                  Dermatological Testing & Safety
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#18120e] transition-transform duration-300 ${
                    expandedAccordion === 'acc-4' ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {expandedAccordion === 'acc-4' && (
                <div className="px-4 pb-4 font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed border-t border-[#eae8e4]/60 pt-2">
                  Hypoallergenic, non-comedogenic, and patch-tested under strict board-certified dermatological oversight on reactive skin. Zero added synthetic fragrances, parabens, phthalates, or microplastics.
                </div>
              )}
            </div>

            {/* Accordion 5 */}
            <div className="rounded-xl bg-[#efeeea] overflow-hidden">
              <button
                onClick={() => toggleAccordion('acc-5')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold text-[#18120e]">
                  Shipping & 7-Day Hassle-Free Returns
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#18120e] transition-transform duration-300 ${
                    expandedAccordion === 'acc-5' ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {expandedAccordion === 'acc-5' && (
                <div className="px-4 pb-4 font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] leading-relaxed border-t border-[#eae8e4]/60 pt-2">
                  Orders placed before 2 PM IST ship the same business day in temperature-regulated insulated eco-packaging. We provide a 7-day love-it-or-return guarantee with instant refund processing.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Verified Customer Praise Section */}
      <section className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#efeeea]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#18120e]">
              Verified Customer Praise
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570]">
              2,890 verified patron evaluations
            </p>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-[#efeeea] hover:bg-[#eae8e4] px-4 py-2 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#18120e] transition-colors"
          >
            Write Review
          </button>
        </div>

        {/* Rating Breakdown Bar & Score */}
        <div className="bg-[#f5f3ef] p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6 border border-[#efeeea]">
          <div className="flex flex-col items-center justify-center sm:pr-6 sm:border-r border-[#eae8e4] shrink-0">
            <span className="font-['Playfair_Display'] text-4xl font-bold text-[#18120e]">
              4.8
            </span>
            <div className="flex text-[#8f4c35] mt-1">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star_half
              </span>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#7f7570] mt-1">
              98% Recommend
            </span>
          </div>

          {/* Bar rows */}
          <div className="flex flex-col flex-grow gap-1.5 w-full">
            {[
              { stars: 5, pct: '82%' },
              { stars: 4, pct: '12%' },
              { stars: 3, pct: '4%' },
              { stars: 2, pct: '1%' },
              { stars: 1, pct: '1%' },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-2.5">
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] w-3">
                  {row.stars}
                </span>
                <div className="flex-grow bg-[#eae8e4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#8f4c35] h-full rounded-full"
                    style={{ width: row.pct }}
                  ></div>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570] w-8 text-right">
                  {row.pct}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Skin Transformations Photo Strip */}
        <div className="flex flex-col gap-2.5 mt-8">
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold uppercase tracking-wider text-[#7f7570]">
            Real Skin Transformations
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TRANSFORMATION_PHOTOS.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden bg-[#efeeea] aspect-square shadow-sm group border border-[#eae8e4]"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 bg-[#fbf9f5]/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-['Plus_Jakarta_Sans'] font-semibold text-[#18120e]">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards Feed */}
        <div className="flex flex-col gap-3 mt-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#efeeea] p-4 sm:p-5 rounded-2xl flex flex-col gap-2.5 border border-[#eae8e4]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-['Playfair_Display'] text-sm sm:text-base font-bold text-[#18120e]">
                    {rev.author}
                  </span>
                  <span className="bg-[#d7e7d1] text-[#111f11] font-['Plus_Jakarta_Sans'] text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                    Verified Buyer
                  </span>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570]">
                  {rev.date}
                </span>
              </div>

              <div className="flex text-[#8f4c35]">
                {[...Array(rev.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>

              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#18120e] leading-relaxed">
                "{rev.content}"
              </p>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#7f7570] font-medium">
                {rev.purchasedVariant}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Purchase Bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-xl pb-safe shadow-[0_-8px_24px_rgba(45,38,34,0.08)] border-t border-[#eae8e4]">
        <div className="max-w-md md:max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex flex-col min-w-[75px]">
            <span className="font-['Playfair_Display'] text-lg font-bold text-[#18120e] leading-tight">
              ₹{totalPrice}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
              {selectedVolume} • Qty {quantity}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, selectedVolume, quantity)}
            className="flex-1 h-12 rounded-full bg-[#eae8e4] text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-[#d1c4be]"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Add to Bag</span>
          </button>

          <button
            onClick={() => {
              addToCart(product, selectedVolume, quantity);
              setIsCheckoutOpen(true);
            }}
            className="flex-1 h-12 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-[#2d2622] shadow-md"
          >
            <span>Buy Now</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </aside>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomOpen(false)}
        >
          <img
            src={galleryImages[activeSlide]}
            alt="Zoomed View"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>
      )}

      {/* Ask a Question Modal */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#fbf9f5] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#eae8e4]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#18120e]">
                Consult the Atelier Chemist
              </h3>
              <button onClick={() => setIsAskModalOpen(false)}>
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] mb-3">
              Have inquiries about combining actives, skin sensitivity, or pregnancy safety? Submit your inquiry directly.
            </p>
            <form onSubmit={handleAskQuestion} className="flex flex-col gap-3">
              <textarea
                required
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Write your formulation question here..."
                className="w-full p-3 rounded-xl bg-white border border-[#eae8e4] text-xs font-['Plus_Jakarta_Sans'] focus:outline-none focus:border-[#8f4c35]"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-[#18120e] text-white text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider hover:bg-[#2d2622]"
              >
                Submit Consultation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#fbf9f5] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#eae8e4]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#18120e]">
                Share Patron Evaluation
              </h3>
              <button onClick={() => setIsReviewModalOpen(false)}>
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddReview} className="flex flex-col gap-3 font-['Plus_Jakarta_Sans'] text-xs">
              <input
                type="text"
                required
                value={reviewFormData.name}
                onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                placeholder="Your Name (e.g. Priya S.)"
                className="h-10 px-3 rounded-lg bg-white border border-[#eae8e4]"
              />
              <div className="flex items-center gap-2 py-1">
                <span className="text-[#4d4540]">Rating:</span>
                <div className="flex gap-1 text-[#8f4c35]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{
                          fontVariationSettings: star <= reviewFormData.rating ? "'FILL' 1" : "'FILL' 0"
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                required
                rows={3}
                value={reviewFormData.text}
                onChange={(e) => setReviewFormData({ ...reviewFormData, text: e.target.value })}
                placeholder="Describe your skin transformation, texture experience, and observed results..."
                className="p-3 rounded-xl bg-white border border-[#eae8e4]"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-[#18120e] text-white font-bold uppercase tracking-wider"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
