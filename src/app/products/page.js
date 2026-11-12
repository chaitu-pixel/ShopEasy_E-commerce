"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/services/productService";
import { INITIAL_PRODUCTS } from "@/utils/storeData";

const CATEGORY_MAP = {
  "All Products": [],

  Electronics: [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
    "electronics",
  ],

  Fashion: [
    "mens-shirts",
    "mens-shoes",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
    "sunglasses",
    "clothing",
    "fashion",
    "shoes",
    "accessories",
  ],

  Beauty: ["beauty", "skin-care", "fragrances"],

  Home: ["furniture", "home-decoration", "kitchen-accessories", "home"],

  Sports: ["sports-accessories", "sports", "fitness"],

  Groceries: ["groceries"],
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchParamsKey = searchParams.toString();
  const queryFromUrl = searchParams.get("search") || searchParams.get("q");
  const categoryParam = searchParams.get("category");
  const categoryFromUrl = CATEGORIES.find(
    (category) => category.toLowerCase() === categoryParam?.toLowerCase()
  );
  const [searchState, setSearchState] = useState({
    searchParamsKey: null,
    value: "",
  });
  const [categoryState, setCategoryState] = useState({
    searchParamsKey: null,
    value: "All Products",
  });
  const searchQuery =
    searchState.searchParamsKey === searchParamsKey
      ? searchState.value
      : queryFromUrl ?? searchState.value;
  const selectedCategory =
    categoryState.searchParamsKey === searchParamsKey
      ? categoryState.value
      : categoryFromUrl || categoryState.value;

  const setSearchQuery = (value) => {
    setSearchState({ searchParamsKey, value });
  };
  const setSelectedCategory = (value) => {
    setCategoryState({ searchParamsKey, value });
  };

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedRating, setSelectedRating] = useState(0);

  const [sortOption, setSortOption] = useState("");

  const filterKey = JSON.stringify([
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedRating,
    sortOption,
  ]);
  const [pageState, setPageState] = useState({ filterKey: null, page: 1 });
  const currentPage =
    pageState.filterKey === filterKey ? pageState.page : 1;
  const setCurrentPage = (value) => {
    setPageState((previous) => ({
      filterKey,
      page:
        typeof value === "function"
          ? value(previous.filterKey === filterKey ? previous.page : 1)
          : value,
    }));
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 6;

  // =========================================
  // FETCH PRODUCTS
  // =========================================

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      const remoteProducts = data.products || [];
      // DummyJSON does not provide a dedicated Electronics/Fashion/Sports taxonomy.
      // Add the project's curated catalog so those filters always have relevant items.
      const curatedProducts = INITIAL_PRODUCTS.map((item) => ({
        ...item,
        id: `local-${item.id}`,
        title: item.title || item.name,
        thumbnail: item.image,
        image: item.image,
        category: item.category.toLowerCase(),
        price: Number(item.price),
        rating: Number(item.rating) || 4.5,
        description: item.description || "",
        reviews: Number(item.reviews) || 0,
      }));
      const combinedProducts = [...remoteProducts, ...curatedProducts];
      const formattedProducts = combinedProducts.map((product) => {
        const oldPrice = product.oldPrice || Math.round(product.price * 1.3);

        return {
          ...product,
          title: product.title || product.name || "Untitled Product",

          // Image from DummyJSON or Admin catalog
          image: product.image || product.thumbnail || product.images?.[0] || "",

          // DummyJSON reviews is an array
          reviews: Array.isArray(product.reviews)
            ? product.reviews.length
            : product.reviews || 0,

          oldPrice,

          discount:
            product.discount ||
            Math.round(((oldPrice - product.price) / oldPrice) * 100),
        };
      });

      setProducts(formattedProducts);
    } catch (err) {
      console.error(err);

      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError("");
    fetchProducts();
  };

  // =========================================
  // INITIAL API CALL & LIVE SYNC
  // =========================================

  useEffect(() => {
    Promise.resolve().then(fetchProducts);

    const handleSync = () => {
      setLoading(true);
      setError("");
      fetchProducts();
    };

    window.addEventListener("products_changed", handleSync);
    window.addEventListener("shopeasy_sync", handleSync);

    return () => {
      window.removeEventListener("products_changed", handleSync);
      window.removeEventListener("shopeasy_sync", handleSync);
    };
  }, []);

  // =========================================
  // FILTER PRODUCTS
  // =========================================

  const filteredProducts = useMemo(() => {
    const search = searchQuery.toLowerCase().trim();

    const allowedCategories =
      CATEGORY_MAP[selectedCategory] || [];

    return products.filter((product) => {
      // Search
      const matchesSearch =
        !search ||
        product.title?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search);

      // Category
      const productCat = (product.category || "").toLowerCase();
      const matchesCategory =
        selectedCategory === "All Products" ||
        productCat === selectedCategory.toLowerCase() ||
        allowedCategories.some((category) => category.toLowerCase() === productCat);

      // Minimum price
      const matchesMinPrice =
        minPrice === "" ||
        product.price >= Number(minPrice);

      // Maximum price
      const matchesMaxPrice =
        maxPrice === "" ||
        product.price <= Number(maxPrice);

      // Rating
      const matchesRating =
        selectedRating === 0 ||
        product.rating >= selectedRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating
      );
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedRating,
  ]);

  // =========================================
  // SORT PRODUCTS
  // =========================================

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortOption === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [filteredProducts, sortOption]);

  // =========================================
  // PAGINATION
  // =========================================

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    endIndex
  );

  // =========================================
  // CLEAR FILTERS
  // =========================================

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Products");
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating(0);
    setSortOption("");
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-50">
      {/* ===================================== */}
      {/* HERO */}
      {/* ===================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
          <div className="max-w-3xl">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-violet-600" />

              <span className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-700 sm:text-xs">
                Our Collection
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Discover{" "}
              <span className="text-violet-700">
                Products
              </span>
            </h1>


          </div>
        </div>
      </section>

      {/* ===================================== */}
      {/* PRODUCTS SECTION */}
      {/* ===================================== */}

      <section className="relative py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          {/* SEARCH + SORT */}

          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}

              <div className="relative min-w-0 w-full lg:max-w-xl">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <div className="flex min-w-0 w-full gap-3 sm:w-auto">
                {/* MOBILE FILTER BUTTON */}

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 sm:flex-none sm:px-5 lg:hidden"
                >
                  ⚙️
                  <span>Filters</span>
                </button>

                {/* SORT */}

                <select
                  value={sortOption}
                  onChange={(e) =>
                    setSortOption(e.target.value)
                  }
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none transition hover:border-violet-200 focus:border-violet-500 sm:flex-none sm:px-4"
                >
                  <option value="">Sort by</option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>

                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div className="mt-5 grid min-w-0 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* DESKTOP FILTER */}

            <aside className="hidden min-w-0 lg:block">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                clearFilters={clearFilters}
              />
            </aside>

            {/* PRODUCTS */}

            <div className="min-w-0 max-w-full">
              {/* RESULTS HEADER */}

              <div className="mb-4 flex min-w-0 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {selectedCategory}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Showing products from our collection
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-violet-50 px-2.5 py-1.5 text-[11px] font-semibold text-violet-700 sm:px-3 sm:text-xs">
                  {filteredProducts.length} Products
                </span>
              </div>

              {/* LOADING */}

              {loading && <LoadingState />}

              {/* ERROR */}

              {!loading && error && (
                <ErrorState onRetry={handleRetry} />
              )}

              {/* PRODUCTS */}

              {!loading &&
                !error &&
                paginatedProducts.length > 0 && (
                  <>
                    <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {paginatedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="min-w-0 max-w-full overflow-hidden rounded-3xl"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>

                    {/* PAGINATION */}

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalItems={sortedProducts.length}
                        setCurrentPage={setCurrentPage}
                      />
                    )}
                  </>
                )}

              {/* EMPTY */}

              {!loading &&
                !error &&
                paginatedProducts.length === 0 && (
                  <EmptyState
                    searchQuery={searchQuery}
                    onClear={clearFilters}
                  />
                )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================== */}
      {/* MOBILE FILTER DRAWER */}
      {/* ===================================== */}

      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* DRAWER */}

          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                  Refine Results
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-600 transition hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* FILTER CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
              <FilterContent
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            </div>

            {/* BUTTONS */}

            <div className="border-t border-slate-200 bg-white p-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear Filters
                </button>

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// =========================================
// FILTER SIDEBAR
// =========================================

function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
  clearFilters,
}) {
  return (
    <div className="sticky top-28 min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-black text-slate-900">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="shrink-0 text-xs font-bold text-blue-600 transition hover:text-blue-700"
        >
          Clear
        </button>
      </div>

      <FilterContent
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
    </div>
  );
}

// =========================================
// FILTER CONTENT
// =========================================

function FilterContent({
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
}) {
  return (
    <>
      {/* CATEGORY */}

      <div className="mt-7">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Category
        </h3>

        <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex min-w-0 cursor-pointer items-center gap-3 rounded-xl p-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <input
                type="radio"
                name="product-category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="h-4 w-4 shrink-0 accent-blue-600"
              />

              <span className="truncate">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}

      <div className="mt-8 border-t border-slate-100 pt-7">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Price Range
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="min-w-0 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
          />

          <input
            type="number"
            min="0"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="min-w-0 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* RATING */}

      <div className="mt-8 border-t border-slate-100 pt-7">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Rating
        </h3>

        <div className="mt-4 space-y-3">
          {[4, 3, 2].map((rating) => (
            <label
              key={rating}
              className="flex min-w-0 cursor-pointer items-center gap-3 rounded-xl p-2 text-sm transition hover:bg-blue-50"
            >
              <input
                type="radio"
                name="product-rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={(e) =>
                  setSelectedRating(
                    Number(e.target.value)
                  )
                }
                className="h-4 w-4 shrink-0 accent-blue-600"
              />

              <span className="whitespace-nowrap text-amber-400">
                {"★".repeat(rating)}

                <span className="text-slate-200">
                  {"★".repeat(5 - rating)}
                </span>
              </span>

              <span className="text-slate-600">& up</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

// =========================================
// LOADING STATE
// =========================================

function LoadingState() {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />

          <div className="mt-5 h-4 w-3/4 animate-pulse rounded bg-slate-200" />

          <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />

          <div className="mt-5 h-10 w-1/3 animate-pulse rounded-xl bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

// =========================================
// ERROR STATE
// =========================================

function ErrorState({ onRetry }) {
  return (
    <div className="flex min-h-[400px] min-w-0 flex-col items-center justify-center rounded-[2rem] border border-red-100 bg-white px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-4xl">
        ⚠️
      </div>

      <h3 className="mt-6 text-xl font-black text-slate-900">
        Unable to load products
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Something went wrong while loading the product
        collection.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}

// =========================================
// EMPTY STATE
// =========================================

function EmptyState({ searchQuery, onClear }) {
  return (
    <div className="flex min-h-[400px] min-w-0 flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
        🔍
      </div>

      <h3 className="mt-6 text-xl font-black text-slate-900">
        No products found
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        No products match your current search or filters.

        {searchQuery && (
          <span className="font-bold text-slate-700">
            {" "}
            &quot;{searchQuery}&quot;
          </span>
        )}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
      >
        Clear Filters
      </button>
    </div>
  );
}

// =========================================
// PAGINATION
// =========================================

function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  setCurrentPage,
}) {
  // -----------------------------------------
  // CREATE RESPONSIVE PAGE NUMBERS
  // -----------------------------------------

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-8 min-w-0 border-t border-slate-200 pt-5">
      {/* MOBILE / DESKTOP FLEX */}

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* RESULT COUNT */}

        <p className="text-center text-xs text-slate-500 sm:text-left">
          Showing{" "}
          <span className="font-bold text-slate-700">
            {startIndex + 1}
          </span>
          {" – "}
          <span className="font-bold text-slate-700">
            {Math.min(endIndex, totalItems)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-700">
            {totalItems}
          </span>{" "}
          products
        </p>

        {/* PAGINATION CONTROLS */}

        <div className="flex min-w-0 max-w-full items-center justify-center gap-1.5 overflow-x-auto pb-1">
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(page - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-500 transition hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="hidden sm:inline">
              Previous
            </span>

            <span className="sm:hidden">‹</span>
          </button>

          {/* PAGE NUMBERS */}

          <div className="flex shrink-0 items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    className="flex h-9 w-6 items-center justify-center text-xs font-bold text-slate-400"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  type="button"
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`h-9 min-w-9 shrink-0 rounded-lg px-2 text-xs font-semibold transition ${
                    currentPage === page
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* NEXT */}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-500 transition hover:border-violet-300 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="hidden sm:inline">
              Next
            </span>

            <span className="sm:hidden">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-900 border-t-transparent" />
            <p className="text-sm font-semibold text-slate-500">Loading catalog...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}