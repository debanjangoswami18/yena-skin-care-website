import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  ALL_PRODUCTS,
  FEATURED_SERUM,
  INITIAL_CART_ITEMS,
  COMPLIMENTARY_SAMPLES,
  ComplimentarySample
} from '../data/skincareData';

export type ScreenType = 'home' | 'shop' | 'product' | 'cart' | 'wishlist' | 'offers';

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  sample: ComplimentarySample | null;
  totalPaid: number;
  savings: number;
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  date: string;
}

interface ShopContextType {
  activeScreen: ScreenType;
  setActiveScreen: (screen: ScreenType) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  openProductDetails: (product: Product) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, volume?: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  cartCount: number;
  cartSubtotal: number;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  selectedSampleId: string;
  setSelectedSampleId: (id: string) => void;
  selectedSample: ComplimentarySample | null;
  finalTotal: number;
  totalSavings: number;
  freeShippingThreshold: number;
  amountNeededForFreeGift: number;
  freeGiftProgressPercent: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  moveToCartFromWishlist: (productId: string) => void;

  // Modals & Navigation
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  placeOrder: (address: { fullName: string; phone: string; street: string; city: string; postalCode: string }, paymentMethod: string) => void;
  clearLastOrder: () => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Viewport mode
  viewportMode: 'responsive' | 'mobile';
  setViewportMode: (mode: 'responsive' | 'mobile') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(FEATURED_SERUM);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlist, setWishlist] = useState<string[]>(['vit-c-serum', 'spf-50-shield']);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('GLOW20');
  const [selectedSampleId, setSelectedSampleId] = useState<string>('lip-glaze');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewportMode, setViewportMode] = useState<'responsive' | 'mobile'>('responsive');

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeScreen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveScreen('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart logic
  const addToCart = (product: Product, volumeOverride?: string, qty = 1) => {
    setCart((prev) => {
      const vol = volumeOverride || product.volume;
      const existing = prev.find((item) => item.productId === product.id && item.volume === vol);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        name: product.name,
        tag: product.categoryLabel || 'Formulation',
        volume: vol,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: qty,
        image: product.image
      };
      return [...prev, newItem];
    });
    showToast(`${qty}x ${product.name} added to ritual bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Formula removed from ritual bag');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'GLOW20' || cleaned === 'YENA20') {
      setAppliedCoupon('GLOW20');
      showToast('GLOW20 code applied! Flat 20% discount unlocked');
      return true;
    }
    if (cleaned === 'WELCOME100') {
      setAppliedCoupon('WELCOME100');
      showToast('WELCOME100 code applied! ₹100 instant saving');
      return true;
    }
    showToast('Invalid promotion code. Try GLOW20 or WELCOME100');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed from order');
  };

  const couponDiscount = appliedCoupon === 'GLOW20'
    ? Math.round(cartSubtotal * 0.2)
    : appliedCoupon === 'WELCOME100'
    ? Math.min(100, cartSubtotal)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - couponDiscount);
  const originalSubtotal = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalSavings = (originalSubtotal - cartSubtotal) + couponDiscount;

  // Free silk pouch gift threshold at ₹1,499
  const freeGiftThreshold = 1499;
  const amountNeededForFreeGift = Math.max(0, freeGiftThreshold - cartSubtotal);
  const freeGiftProgressPercent = Math.min(100, Math.round((cartSubtotal / freeGiftThreshold) * 100));

  const selectedSample = COMPLIMENTARY_SAMPLES.find((s) => s.id === selectedSampleId) || COMPLIMENTARY_SAMPLES[0];

  // Wishlist logic
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from sacred wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your sacred wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  const moveToCartFromWishlist = (productId: string) => {
    const product = ALL_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      toggleWishlist(productId);
    }
  };

  // Quick view
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Place order
  const placeOrder = (
    address: { fullName: string; phone: string; street: string; city: string; postalCode: string },
    paymentMethod: string
  ) => {
    const newOrder: OrderDetails = {
      orderId: `YN-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      sample: selectedSample,
      totalPaid: finalTotal,
      savings: totalSavings,
      deliveryAddress: address,
      paymentMethod,
      date: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    setLastOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    showToast(`Order #${newOrder.orderId} Confirmed! Preparing dispatch.`);
  };

  const clearLastOrder = () => setLastOrder(null);

  return (
    <ShopContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        selectedProduct,
        setSelectedProduct,
        openProductDetails,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartSubtotal,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        selectedSampleId,
        setSelectedSampleId,
        selectedSample,
        finalTotal,
        totalSavings,
        freeShippingThreshold: freeGiftThreshold,
        amountNeededForFreeGift,
        freeGiftProgressPercent,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        moveToCartFromWishlist,
        isDrawerOpen,
        setIsDrawerOpen,
        isFilterOpen,
        setIsFilterOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAboutOpen,
        setIsAboutOpen,
        lastOrder,
        placeOrder,
        clearLastOrder,
        toastMessage,
        showToast,
        viewportMode,
        setViewportMode
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
