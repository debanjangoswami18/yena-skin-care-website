import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS, Product } from '../data/skincareData';
import { FilterDrawer } from '../components/FilterDrawer';

export const ShopScreen: React.FC = () => {
  const {
    openProductDetails,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openQuickView,
    setIsFilterOpen
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('bestsellers');
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>(['oily', 'sensitive']);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(['pigmentation']);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(8);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'serums', label: 'Serums' },
    { id: 'cleansers', label: 'Cleansers' },
    { id: 'moisturizers', label: 'Moisturizers' },
    { id: 'sunscreens', label: 'Sunscreens' },
    { id: 'lip-body', label: 'Lip & Body' },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((prod) => {
      // Category match
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesSub = prod.subtitle.toLowerCase().includes(query);
        const matchesCat = prod.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesCat) return false;
      }
      // Price filter
      if (prod.price > maxPrice) return false;

      // Skin type match (if active)
      if (selectedSkinTypes.length > 0) {
        const hasType = selectedSkinTypes.some((t) => prod.skinType.includes(t as any));
        if (!hasType) return false;
      }

      // Skin concern match (if active)
      if (selectedConcerns.length > 0) {
        const hasConcern = selectedConcerns.some((c) => prod.concern.includes(c as any));
        if (!hasConcern) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.reviewCount - a.reviewCount;
      return 0; // Default bestsellers
    });
  }, [selectedCategory, searchQuery, maxPrice, selectedSkinTypes, selectedConcerns, sortBy]);

  const displayedList = filteredProducts.slice(0, displayCount);

  const handleAddToCartAnimate = (prod: Product) => {
    setAddingId(prod.id);
    addToCart(prod);
    setTimeout(() => {
      setAddingId(null);
    }, 900);
  };

  const handleResetFilters = () => {
    setSelectedSkinTypes([]);
    setSelectedConcerns([]);
    setMaxPrice(1500);
    setSelectedCategory('all');
  };

  const activeFilterCount = selectedSkinTypes.length + selectedConcerns.length + (maxPrice < 1500 ? 1 : 0);

  return (
    <div className="flex flex-col w-full pb-24 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      {/* Search Input Bar */}
      <section className="flex flex-col gap-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7f7570]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search serums, cleansers, sunscreens..."
            className="w-full h-11 pl-10 pr-10 rounded-full bg-white text-[#1b1c1a] placeholder:text-[#7f7570]/70 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm shadow-sm border border-[#eae8e4] focus:outline-none focus:border-[#8f4c35]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7f7570] hover:text-[#18120e]"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="h-9 px-4 rounded-full bg-white shadow-sm border border-[#eae8e4] flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[#8f4c35] text-[18px]">tune</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#18120e]">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#8f4c35] text-white font-['Plus_Jakarta_Sans'] text-[9px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex-1 max-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-9 pl-3 pr-8 rounded-full bg-white shadow-sm border border-[#eae8e4] text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-medium appearance-none focus:outline-none cursor-pointer truncate"
            >
              <option value="bestsellers">Sort by: Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Formulations</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7f7570] text-[18px]">
              expand_more
            </span>
          </div>
        </div>
      </section>

      {/* Category Chips Bar */}
      <section className="w-full overflow-x-auto no-scrollbar py-3">
        <div className="flex items-center gap-2 min-w-max pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`h-8 px-4 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-medium transition-all shadow-xs ${
                selectedCategory === cat.id
                  ? 'bg-[#18120e] text-white'
                  : 'bg-white text-[#4d4540] hover:bg-[#efeeea] border border-[#efeeea]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Results Header & Active Refinements */}
      <div className="pt-1 pb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#efeeea] mb-4">
        <div className="flex items-center gap-2">
          <span className="font-['Playfair_Display'] text-sm font-semibold text-[#18120e]">
            Showing {filteredProducts.length} Formulations
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8f4c35]"></span>
          <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570]">Clinical Botanicals</span>
        </div>

        {/* Active Pill Removers */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {selectedSkinTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedSkinTypes(selectedSkinTypes.filter((t) => t !== type))}
              className="px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#390c00] font-['Plus_Jakarta_Sans'] text-[10px] font-semibold flex items-center gap-1"
            >
              <span>{type}</span>
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          ))}
          {selectedConcerns.map((conc) => (
            <button
              key={conc}
              onClick={() => setSelectedConcerns(selectedConcerns.filter((c) => c !== conc))}
              className="px-2.5 py-0.5 rounded-full bg-[#ffdbd0] text-[#390c00] font-['Plus_Jakarta_Sans'] text-[10px] font-semibold flex items-center gap-1"
            >
              <span>{conc}</span>
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          ))}
          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#8f4c35] underline ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {displayedList.map((product) => {
          const wish = isWishlisted(product.id);
          const isAdding = addingId === product.id;
          return (
            <article
              key={product.id}
              className="flex flex-col bg-white rounded-xl p-2.5 sm:p-3 shadow-sm hover:shadow-md transition-all relative group border border-[#efeeea]"
            >
              {/* Image & Quick View button */}
              <div
                onClick={() => openProductDetails(product)}
                className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#f5f3ef] mb-2.5 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badges && product.badges[0] && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#8f4c35] text-white font-['Plus_Jakarta_Sans'] text-[9px] font-bold">
                    {product.badges[0]}
                  </span>
                )}
                <button
                  aria-label="Save to Wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#18120e] shadow-sm active:scale-90 transition-transform"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={wish ? { fontVariationSettings: "'FILL' 1", color: '#8f4c35' } : undefined}
                  >
                    favorite
                  </span>
                </button>
                <button
                  aria-label="Quick View"
                  onClick={(e) => {
                    e.stopPropagation();
                    openQuickView(product);
                  }}
                  className="absolute bottom-2 left-2 right-2 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#18120e] font-['Plus_Jakarta_Sans'] text-[10px] font-semibold text-center shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                >
                  Quick View
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-1">
                <span
                  className="material-symbols-outlined text-[#8f4c35] text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#18120e]">
                  {product.rating}
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Title & Volume */}
              <h3
                onClick={() => openProductDetails(product)}
                className="font-['Playfair_Display'] text-xs sm:text-sm font-semibold text-[#18120e] line-clamp-1 leading-snug cursor-pointer hover:text-[#8f4c35]"
              >
                {product.name}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570] mb-2 truncate">
                {product.volume} • {product.subtitle}
              </p>

              {/* Price & Add to Cart button */}
              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-['Playfair_Display'] text-sm font-bold text-[#18120e]">
                    ₹{product.price}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#7f7570] line-through">
                    ₹{product.originalPrice}
                  </span>
                  {product.discount && (
                    <span className="font-['Plus_Jakarta_Sans'] text-[9px] text-[#8f4c35] font-bold">
                      {product.discount}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCartAnimate(product)}
                  className={`w-full h-8 rounded-full font-['Plus_Jakarta_Sans'] text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs ${
                    isAdding
                      ? 'bg-[#8f4c35] text-white'
                      : 'bg-[#18120e] text-white hover:bg-[#2d2622]'
                  }`}
                >
                  {isAdding ? (
                    <>
                      <span className="material-symbols-outlined text-[15px]">check</span>
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[15px]">add</span>
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Empty State if filter yields zero */}
      {filteredProducts.length === 0 && (
        <div className="w-full py-16 text-center flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-[#7f7570]">search_off</span>
          <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#18120e]">
            No formulations matched your filters
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#4d4540]">
            Try relaxing skin type or price threshold to explore more botanical elixirs.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 rounded-full bg-[#18120e] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More Pagination */}
      {filteredProducts.length > displayedList.length && (
        <section className="flex flex-col items-center gap-3 py-6">
          <div className="w-full max-w-[200px] h-1.5 rounded-full bg-[#eae8e4] overflow-hidden">
            <div
              className="h-full bg-[#8f4c35] rounded-full transition-all"
              style={{
                width: `${(displayedList.length / filteredProducts.length) * 100}%`
              }}
            ></div>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#7f7570]">
            Viewing {displayedList.length} of {filteredProducts.length} Clean Formulations
          </span>
          <button
            onClick={() => setDisplayCount((prev) => prev + 4)}
            className="w-full max-w-sm py-3 rounded-full bg-white text-[#18120e] font-['Plus_Jakarta_Sans'] text-xs font-bold uppercase tracking-wider shadow-sm border border-[#eae8e4] hover:bg-[#efeeea] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">autorenew</span>
            <span>Load More Products</span>
          </button>
        </section>
      )}

      {/* Bottom Trust Row */}
      <section className="bg-[#f5f3ef] rounded-2xl p-4 sm:p-6 shadow-sm border border-[#eae8e4] mt-6">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center gap-1.5 p-1">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#8f4c35] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <span className="font-['Playfair_Display'] text-xs sm:text-sm font-semibold text-[#18120e] leading-tight">
              Free Shipping
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
              Orders &gt; ₹499
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-1">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#8f4c35] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
            <span className="font-['Playfair_Display'] text-xs sm:text-sm font-semibold text-[#18120e] leading-tight">
              100% Authentic
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
              Direct Lab Pure
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-1">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#8f4c35] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <span className="font-['Playfair_Display'] text-xs sm:text-sm font-semibold text-[#18120e] leading-tight">
              COD Available
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#7f7570]">
              Pan-India Reach
            </span>
          </div>
        </div>
      </section>

      {/* Filter Bottom Sheet Drawer */}
      <FilterDrawer
        selectedSkinTypes={selectedSkinTypes}
        setSelectedSkinTypes={setSelectedSkinTypes}
        selectedConcerns={selectedConcerns}
        setSelectedConcerns={setSelectedConcerns}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onReset={handleResetFilters}
        filteredCount={filteredProducts.length}
      />
    </div>
  );
};
