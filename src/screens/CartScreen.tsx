import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { COMPLIMENTARY_SAMPLES } from '../data/skincareData';

export const CartScreen: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    selectedSampleId,
    setSelectedSampleId,
    finalTotal,
    totalSavings,
    amountNeededForFreeGift,
    freeGiftProgressPercent,
    toggleWishlist,
    setIsCheckoutOpen,
    setActiveScreen
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [showPromoAccordion, setShowPromoAccordion] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    applyCoupon(promoInput);
    setPromoInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#efeeea] flex items-center justify-center text-[#8f4c35] mb-4">
          <span className="material-symbols-outlined text-[36px]">shopping_bag</span>
        </div>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#18120e]">
          Your Ritual Bag is Empty
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#4d4540] max-w-sm mt-2 leading-relaxed">
          Restore harmony to your skin. Discover our clinical botanical elixirs, barrier repair essentials, and mineral sunscreens.
        </p>
        <button
          onClick={() => setActiveScreen('shop')}
          className="mt-6 px-8 py-3 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#2d2622] transition-colors"
        >
          Explore Formulations
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Title & Free Gift Progress Section */}
      <section className="mb-6">
        <div className="flex items-baseline justify-between mb-3">
          <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#18120e] tracking-tight">
            Shopping Bag
          </h1>
          <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570] font-semibold uppercase tracking-wider">
            {cart.length} Items
          </span>
        </div>

        {/* Free Gift Threshold Bar */}
        <div className="bg-[#f5f3ef] rounded-xl p-4 shadow-sm border border-[#efeeea]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ffdbd0] text-[#8f4c35] shrink-0">
              <span className="material-symbols-outlined text-[18px]">redeem</span>
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#18120e] flex-1">
              {amountNeededForFreeGift > 0 ? (
                <>
                  Add <span className="font-bold text-[#8f4c35]">₹{amountNeededForFreeGift}</span> more to unlock <strong className="font-semibold">Complimentary Silk Pouch</strong>
                </>
              ) : (
                <span className="font-bold text-[#8f4c35]">
                  🎉 Complimentary Silk Pouch unlocked for your order!
                </span>
              )}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#eae8e4] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#8f4c35] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${freeGiftProgressPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mt-2 font-['Plus_Jakarta_Sans'] text-[11px] text-[#7f7570]">
            <span>Current: ₹{cartSubtotal}</span>
            <span className="text-[#8f4c35] font-semibold">
              {freeGiftProgressPercent}% reached
            </span>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout (Items on Left, Order Summary on Right on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items & Complimentary Samples (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Cart Items List */}
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3 relative border border-[#efeeea]"
              >
                <div className="flex gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg bg-[#f5f3ef] overflow-hidden shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-white/90 text-[9px] font-['Plus_Jakarta_Sans'] font-bold text-[#18120e] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-1 min-w-0 justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h2 className="font-['Playfair_Display'] text-sm sm:text-base font-bold text-[#18120e] truncate">
                          {item.name}
                        </h2>
                        <button
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#7f7570] hover:text-[#ba1a1a] transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#4d4540] truncate mt-0.5">
                        {item.volume}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-['Playfair_Display'] text-sm sm:text-base font-bold text-[#18120e]">
                          ₹{item.price}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#7f7570] line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center bg-[#efeeea] rounded-full p-0.5">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#18120e] hover:bg-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-[15px]">remove</span>
                        </button>
                        <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold px-2 text-center min-w-[24px]">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#18120e] hover:bg-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-[15px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtotal & Wishlist row */}
                <div className="flex items-center justify-between pt-2 border-t border-[#f5f3ef]">
                  <button
                    onClick={() => {
                      toggleWishlist(item.productId);
                      removeFromCart(item.id);
                    }}
                    className="flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-xs text-[#8f4c35] hover:underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">favorite_border</span>
                    <span>Save to Ritual Wishlist</span>
                  </button>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] block leading-none">
                      Subtotal
                    </span>
                    <span className="font-['Playfair_Display'] text-sm font-bold text-[#18120e]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Complimentary Ritual Sample Selector */}
          <section className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#efeeea]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8f4c35]"></span>
                <h3 className="font-['Playfair_Display'] text-base font-bold text-[#18120e]">
                  Complimentary Sample
                </h3>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#8f4c35] uppercase font-bold tracking-wider">
                1 Selected
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] mb-3">
              Choose one handcrafted trial vial to accompany your order.
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {COMPLIMENTARY_SAMPLES.map((sample) => {
                const isSelected = selectedSampleId === sample.id;
                return (
                  <div
                    key={sample.id}
                    onClick={() => setSelectedSampleId(sample.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#ffdbd0]/30 border-[#8f4c35] shadow-xs'
                        : 'bg-[#fbf9f5] border-[#eae8e4] hover:bg-[#f5f3ef]'
                    }`}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mb-2 relative bg-[#efeeea]">
                      <img
                        src={sample.image}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#18120e]/60 flex items-center justify-center text-white">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </div>
                      )}
                    </div>
                    <span className="font-['Playfair_Display'] text-xs font-bold text-[#18120e] leading-tight">
                      {sample.name}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] mt-0.5">
                      {sample.spec}
                    </span>
                    <span className="mt-2 text-[10px] font-['Plus_Jakarta_Sans'] text-[#8f4c35] font-bold uppercase tracking-wider">
                      Free
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Order Details & Promo Code (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
          {/* Coupon Code Box */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#efeeea]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8f4c35] text-[20px]">
                  local_activity
                </span>
                <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
                  Ritual Code Applied
                </span>
              </div>
              <button
                onClick={() => applyCoupon('GLOW20')}
                className="font-['Plus_Jakarta_Sans'] text-xs text-[#8f4c35] hover:underline"
              >
                View All
              </button>
            </div>

            {appliedCoupon ? (
              <div className="bg-[#ffdbd0]/40 rounded-lg p-3 flex items-center justify-between border border-[#ffdbd0]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#d7e7d1] flex items-center justify-center text-[#111f11] shrink-0">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#18120e] tracking-wider">
                        {appliedCoupon}
                      </span>
                      <span className="bg-[#8f4c35] text-white px-1.5 py-0.2 text-[9px] font-['Plus_Jakarta_Sans'] rounded font-bold uppercase">
                        Applied
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#4d4540] truncate">
                      {appliedCoupon === 'GLOW20' ? 'Flat 20% off whole skincare ritual' : 'Special promo applied'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-[#4d4540] hover:text-[#ba1a1a] text-xs font-['Plus_Jakarta_Sans'] p-1 ml-2 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code: GLOW20"
                  className="flex-1 bg-[#f5f3ef] rounded-lg px-3 py-2 text-xs font-['Plus_Jakarta_Sans'] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#8f4c35]"
                />
                <button
                  type="submit"
                  className="bg-[#18120e] text-white px-4 py-2 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#2d2622]"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Accordion for alternate code */}
            <div className="mt-2.5 pt-2 border-t border-[#efeeea]">
              <button
                type="button"
                onClick={() => setShowPromoAccordion(!showPromoAccordion)}
                className="w-full flex justify-between items-center text-left text-xs font-['Plus_Jakarta_Sans'] text-[#7f7570] hover:text-[#18120e]"
              >
                <span>Have another promo code?</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform ${
                    showPromoAccordion ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {showPromoAccordion && (
                <form onSubmit={handleApplyPromo} className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 bg-[#f5f3ef] rounded-lg px-3 py-2 text-xs font-['Plus_Jakarta_Sans'] text-[#1b1c1a] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#18120e] text-white px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Order Details Breakdown Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-[#efeeea]">
            <h2 className="font-['Playfair_Display'] text-base font-bold text-[#18120e]">
              Order Details
            </h2>

            <div className="flex justify-between items-center font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540]">
              <span>Cart Subtotal</span>
              <span className="text-[#18120e] font-semibold">₹{cartSubtotal}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between items-center font-['Plus_Jakarta_Sans'] text-xs text-[#8f4c35]">
                <span className="flex items-center gap-1">
                  <span>Bag Discount ({appliedCoupon})</span>
                  <span className="material-symbols-outlined text-[14px]">stars</span>
                </span>
                <span className="font-semibold">-₹{couponDiscount}</span>
              </div>
            )}

            <div className="flex justify-between items-center font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540]">
              <span className="flex items-center gap-1">
                <span>Delivery Charges</span>
                <span className="text-[9px] font-['Plus_Jakarta_Sans'] font-bold bg-[#8f4c35] text-white px-1.5 py-0.2 rounded-full">
                  FREE
                </span>
              </span>
              <span className="text-[#111f11] font-semibold">₹0</span>
            </div>

            <div className="flex justify-between items-center font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540]">
              <span>Estimated GST & Local Taxes</span>
              <span className="text-[#7f7570] font-medium">Included</span>
            </div>

            <div className="h-px bg-[#efeeea] my-1"></div>

            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-['Playfair_Display'] text-base font-bold text-[#18120e] block leading-tight">
                  Total Amount
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
                  Incl. of all artisanal taxes
                </span>
              </div>
              <div className="text-right">
                <span className="font-['Playfair_Display'] text-2xl font-bold text-[#18120e]">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="mt-1 bg-[#d7e7d1]/50 text-[#111f11] rounded-lg py-2 px-3 flex items-center justify-center gap-2 border border-[#d7e7d1]">
              <span className="material-symbols-outlined text-sm text-[#8f4c35]">arrow_back_ios_new</span>
              <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-center">
                You are saving ₹{totalSavings} on this order!
              </p>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full h-12 mt-2 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-[#2d2622] active:scale-98 transition-all"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Trust Badges Trio */}
          <div className="bg-[#f5f3ef] rounded-xl p-3.5 grid grid-cols-3 gap-2 text-center border border-[#efeeea]">
            <div className="flex flex-col items-center gap-1">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#18120e] shadow-xs">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#18120e]">100% Pure</span>
              <span className="font-['Plus_Jakarta_Sans'] text-[9px] text-[#7f7570]">Botanical Active</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#18120e] shadow-xs">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#18120e]">Safe Encrypted</span>
              <span className="font-['Plus_Jakarta_Sans'] text-[9px] text-[#7f7570]">256-bit Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#18120e] shadow-xs">
                <span className="material-symbols-outlined text-[18px]">cached</span>
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#18120e]">Easy Returns</span>
              <span className="font-['Plus_Jakarta_Sans'] text-[9px] text-[#7f7570]">7-Day Serenity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Dock for Mobile Screen */}
      <aside className="fixed bottom-16 left-0 right-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-xl px-4 py-2.5 shadow-[0_-4px_20px_rgba(45,38,34,0.06)] border-t border-[#eae8e4] md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] uppercase tracking-wider font-semibold">
              Total Payable
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-['Playfair_Display'] text-xl font-bold text-[#18120e]">
                ₹{finalTotal}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#8f4c35] line-through">
                ₹{cartSubtotal + totalSavings}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex-1 max-w-[210px] h-12 bg-[#18120e] text-white rounded-full flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all"
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
