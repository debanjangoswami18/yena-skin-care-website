import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    finalTotal,
    totalSavings,
    selectedSample,
    placeOrder,
    lastOrder,
    clearLastOrder,
    setActiveScreen
  } = useShop();

  const [formData, setFormData] = useState({
    fullName: 'Aarohi Mukherjee',
    phone: '+91 98765 43210',
    street: '42 Lotus Garden Estate, Palm Avenue',
    city: 'Mumbai',
    postalCode: '400050'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !lastOrder) return null;

  // Order Confirmation View
  if (lastOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-[#2d2622]/50 backdrop-blur-sm" />
        <div className="relative w-full max-w-md bg-[#fbf9f5] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 border border-[#eae8e4] text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
          {/* Success Check Badge */}
          <div className="w-16 h-16 rounded-full bg-[#d7e7d1] text-[#111f11] flex items-center justify-center mb-4 shadow-sm">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <span className="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-[#8f4c35] font-bold">
            Sacred Ritual Confirmed
          </span>
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#18120e] mt-1">
            Order #{lastOrder.orderId}
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540] mt-2 leading-relaxed max-w-xs">
            Thank you, {lastOrder.deliveryAddress.fullName}. Your formulation batch is being carefully prepared in insulated eco-glass packaging.
          </p>

          {/* Order Details Receipt Box */}
          <div className="w-full bg-[#f5f3ef] rounded-xl p-4 my-5 text-left flex flex-col gap-2 text-xs font-['Plus_Jakarta_Sans']">
            <div className="flex justify-between text-[#7f7570]">
              <span>Date:</span>
              <span className="text-[#1b1c1a] font-medium">{lastOrder.date}</span>
            </div>
            <div className="flex justify-between text-[#7f7570]">
              <span>Destination:</span>
              <span className="text-[#1b1c1a] font-medium truncate max-w-[200px]">
                {lastOrder.deliveryAddress.street}, {lastOrder.deliveryAddress.city}
              </span>
            </div>
            <div className="flex justify-between text-[#7f7570]">
              <span>Payment Mode:</span>
              <span className="text-[#1b1c1a] font-medium uppercase">{lastOrder.paymentMethod}</span>
            </div>
            {lastOrder.sample && (
              <div className="flex justify-between text-[#8f4c35]">
                <span>Sample Enclosed:</span>
                <span className="font-semibold">{lastOrder.sample.name} ({lastOrder.sample.spec})</span>
              </div>
            )}
            <div className="h-px bg-[#eae8e4] my-1"></div>
            <div className="flex justify-between text-sm font-bold text-[#18120e]">
              <span>Total Paid:</span>
              <span>₹{lastOrder.totalPaid}</span>
            </div>
            <div className="text-[11px] text-[#8f4c35] text-right font-medium">
              You saved ₹{lastOrder.savings} with Atelier privileges
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={() => {
              clearLastOrder();
              setActiveScreen('home');
            }}
            className="w-full h-12 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#2d2622] transition-colors"
          >
            Continue Mindful Ritual
          </button>
        </div>
      </div>
    );
  }

  // Active Checkout Form View
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2d2622]/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Checkout Drawer / Modal */}
      <div className="relative w-full max-w-lg bg-[#fbf9f5] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 border border-[#eae8e4] pb-safe animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-4 px-6 flex justify-between items-center bg-[#fbf9f5] border-b border-[#efeeea] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8f4c35] text-[20px]">lock</span>
            <h2 className="font-['Playfair_Display'] text-lg font-bold text-[#18120e]">
              Secure Sensory Checkout
            </h2>
          </div>
          <button
            aria-label="Close Checkout"
            className="w-8 h-8 rounded-full bg-[#efeeea] flex items-center justify-center text-[#1b1c1a] hover:bg-[#eae8e4] transition-colors"
            onClick={() => setIsCheckoutOpen(false)}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex flex-col gap-5 no-scrollbar">
          {/* Quick Summary Pill */}
          <div className="bg-[#f5f3ef] rounded-xl p-3 flex items-center justify-between font-['Plus_Jakarta_Sans'] text-xs">
            <span className="text-[#4d4540]">
              Total Payable ({cart.length} items + trial sample):
            </span>
            <span className="font-bold text-[#18120e] text-sm">₹{finalTotal}</span>
          </div>

          {/* Delivery Address */}
          <div className="flex flex-col gap-3">
            <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
              01. Delivery Coordinates
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-['Plus_Jakarta_Sans'] text-xs">
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Full Name"
                className="h-10 px-3 rounded-lg bg-white border border-[#eae8e4] focus:outline-none focus:border-[#8f4c35]"
              />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone Number"
                className="h-10 px-3 rounded-lg bg-white border border-[#eae8e4] focus:outline-none focus:border-[#8f4c35]"
              />
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="House / Street Address"
                className="h-10 px-3 rounded-lg bg-white border border-[#eae8e4] focus:outline-none focus:border-[#8f4c35] sm:col-span-2"
              />
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
                className="h-10 px-3 rounded-lg bg-white border border-[#eae8e4] focus:outline-none focus:border-[#8f4c35]"
              />
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="PIN Code"
                className="h-10 px-3 rounded-lg bg-white border border-[#eae8e4] focus:outline-none focus:border-[#8f4c35]"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-2.5">
            <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
              02. Payment Gateway
            </span>
            <div className="grid grid-cols-2 gap-2 font-['Plus_Jakarta_Sans'] text-xs">
              {[
                { id: 'upi', label: 'UPI / Google Pay', icon: 'qr_code_scanner' },
                { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card' },
                { id: 'netbanking', label: 'Net Banking', icon: 'account_balance' },
                { id: 'cod', label: 'Cash on Delivery', icon: 'payments' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-left transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#8f4c35] bg-[#ffdbd0]/30 text-[#18120e] font-semibold'
                      : 'border-[#eae8e4] bg-white text-[#4d4540] hover:bg-[#f5f3ef]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#8f4c35]">
                    {opt.icon}
                  </span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Complimentary Sample Notice */}
          {selectedSample && (
            <div className="p-3 bg-[#d7e7d1]/40 rounded-xl flex items-center justify-between text-xs font-['Plus_Jakarta_Sans']">
              <span className="text-[#111f11] flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#8f4c35]">card_giftcard</span>
                Sample Included: {selectedSample.name} ({selectedSample.spec})
              </span>
              <span className="text-[#8f4c35] font-bold">FREE</span>
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 mt-2 rounded-full bg-[#18120e] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:bg-[#2d2622] active:scale-98 transition-all disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span>Authorizing Order...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Authorize & Place Order (₹{finalTotal})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
