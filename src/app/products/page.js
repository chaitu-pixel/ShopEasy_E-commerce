"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../services/productService";

const CATEGORY_MAP = {
  "All Products": [],

  Electronics: [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
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
  ],

  Beauty: [
    "beauty",
    "skin-care",
    "fragrances",
  ],

  Home: [
    "furniture",
  ],

  Sports: [
    "sports-accessories",
  ],

  Groceries: [
    "groceries",
  ],
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Products");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedRating, setSelectedRating] = useState(0);

  const [sortOption, setSortOption] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 6;

  // -----------------------------------------
  // FETCH PRODUCTS
  // -----------------------------------------

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      const formattedProducts = (data.products || []).map(
        (product) => {
          const oldPrice = Math.round(product.price * 1.3);

          return {
            ...product,

            // DummyJSON image
            image: product.thumbnail,

            // DummyJSON reviews is an array
            reviews: Array.isArray(product.reviews)
              ? product.reviews.length
              : 0,

            oldPrice,

            discount: Math.round(
              ((oldPrice - product.price) / oldPrice) * 100
            ),
          };
        }
      );

      setProducts(formattedProducts);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // INITIAL API CALL
  // -----------------------------------------

  useEffect(() => {
    fetchProducts();
  }, []);

  // -----------------------------------------
  // RESET PAGE WHEN FILTER CHANGES
  // -----------------------------------------

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedRating,
    sortOption,
  ]);

  // -----------------------------------------
  // FILTER PRODUCTS
  // -----------------------------------------

  const filteredProducts = useMemo(() => {
    const search = searchQuery
      .toLowerCase()
      .trim();

    const allowedCategories =
      CATEGORY_MAP[selectedCategory] || [];

    return products.filter((product) => {
      // Search
      const matchesSearch =
        !search ||
        product.title
          .toLowerCase()
          .includes(search) ||
        product.category
          .toLowerCase()
          .includes(search) ||
        product.brand
          ?.toLowerCase()
          .includes(search);

      // Category
      const matchesCategory =
        selectedCategory === "All Products" ||
        allowedCategories.includes(product.category);

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

  // -----------------------------------------
  // SORT PRODUCTS
  // -----------------------------------------

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    if (sortOption === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortOption === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortOption === "rating") {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    if (sortOption === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [filteredProducts, sortOption]);

  // -----------------------------------------
  // PAGINATION
  // -----------------------------------------

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const paginatedProducts =
    sortedProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  // -----------------------------------------
  // CLEAR FILTERS
  // -----------------------------------------

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
    <main className="min-h-screen bg-slate-50">

      {/* ===================================== */}
      {/* HERO */}
      {/* ===================================== */}

      <section className="relative overflow-hidden bg-white">

        <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                Our Collection
              </span>

            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">

              Discover

              <span className="ml-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Products
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore our collection of carefully selected
              products and find exactly what you&apos;re
              looking for.
            </p>

          </div>

        </div>

      </section>

      {/* ===================================== */}
      {/* PRODUCTS SECTION */}
      {/* ===================================== */}

      <section className="relative py-10 sm:py-12 lg:py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* SEARCH + SORT */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* SEARCH */}

              <div className="relative w-full lg:max-w-xl">

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
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              <div className="flex w-full gap-3 sm:w-auto">

                {/* MOBILE FILTER BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    setIsFilterOpen(true)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-none lg:hidden"
                >
                  ⚙️ Filters
                </button>

                {/* SORT */}

                <select
                  value={sortOption}
                  onChange={(e) =>
                    setSortOption(e.target.value)
                  }
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition hover:border-blue-200 focus:border-blue-500 sm:flex-none"
                >

                  <option value="">
                    Sort by
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>

                  <option value="name">
                    Name
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* CONTENT */}

          <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">

            {/* DESKTOP FILTER */}

            <aside className="hidden lg:block">

              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={
                  setSelectedCategory
                }
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedRating={selectedRating}
                setSelectedRating={
                  setSelectedRating
                }
                clearFilters={clearFilters}
              />

            </aside>

            {/* PRODUCTS */}

            <div>

              {/* RESULTS HEADER */}

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <p className="text-sm font-bold text-slate-900">
                    {selectedCategory}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Showing products from our collection
                  </p>

                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                  {filteredProducts.length} Products
                </span>

              </div>

              {/* LOADING */}

              {loading && <LoadingState />}

              {/* ERROR */}

              {!loading && error && (
                <ErrorState
                  onRetry={fetchProducts}
                />
              )}

              {/* PRODUCTS */}

              {!loading &&
                !error &&
                paginatedProducts.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                      {paginatedProducts.map(
                        (product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                          />
                        )
                      )}

                    </div>

                    {/* PAGINATION */}

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        startIndex={startIndex}
                        pageSize={productsPerPage}
                        totalItems={
                          sortedProducts.length
                        }
                        setCurrentPage={
                          setCurrentPage
                        }
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
            onClick={() =>
              setIsFilterOpen(false)
            }
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
                onClick={() =>
                  setIsFilterOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-600 transition hover:bg-slate-100"
              >
                ✕
              </button>

            </div>

            {/* FILTER CONTENT */}

            <div className="flex-1 overflow-y-auto px-5 py-6">

              <FilterContent
                selectedCategory={
                  selectedCategory
                }
                setSelectedCategory={
                  setSelectedCategory
                }
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedRating={
                  selectedRating
                }
                setSelectedRating={
                  setSelectedRating
                }
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
                  onClick={() =>
                    setIsFilterOpen(false)
                  }
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
    <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-base font-black text-slate-900">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
        >
          Clear
        </button>

      </div>

      <FilterContent
        selectedCategory={selectedCategory}
        setSelectedCategory={
          setSelectedCategory
        }
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
              className="flex cursor-pointer items-center gap-3 rounded-xl p-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >

              <input
                type="radio"
                name="product-category"
                value={category}
                checked={
                  selectedCategory ===
                  category
                }
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="h-4 w-4 accent-blue-600"
              />

              <span>
                {category}
              </span>

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
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
          />

          <input
            type="number"
            min="0"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
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
              className="flex cursor-pointer items-center gap-3 rounded-xl p-2 text-sm transition hover:bg-blue-50"
            >

              <input
                type="radio"
                name="product-rating"
                value={rating}
                checked={
                  selectedRating === rating
                }
                onChange={(e) =>
                  setSelectedRating(
                    Number(e.target.value)
                  )
                }
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-amber-400">

                {"★".repeat(rating)}

                <span className="text-slate-200">
                  {"★".repeat(5 - rating)}
                </span>

              </span>

              <span className="text-slate-600">
                & up
              </span>

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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

      {Array.from({ length: 6 }).map(
        (_, index) => (

          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
          >

            <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />

            <div className="mt-5 h-4 w-3/4 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />

            <div className="mt-5 h-10 w-1/3 animate-pulse rounded-xl bg-slate-200" />

          </div>

        )
      )}

    </div>
  );
}


// =========================================
// ERROR STATE
// =========================================

function ErrorState({ onRetry }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-red-100 bg-white px-6 text-center">

      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-4xl">
        ⚠️
      </div>

      <h3 className="mt-6 text-xl font-black text-slate-900">
        Unable to load products
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Something went wrong while loading the
        product collection.
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

function EmptyState({
  searchQuery,
  onClear,
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 text-center">

      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
        🔍
      </div>

      <h3 className="mt-6 text-xl font-black text-slate-900">
        No products found
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">

        No products match your current search
        or filters.

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
  pageSize,
  totalItems,
  setCurrentPage,
}) {
  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">

      <p className="text-sm text-slate-500">

        Showing{" "}

        <span className="font-bold text-slate-900">
          {startIndex + 1}
        </span>

        {" "}to{" "}

        <span className="font-bold text-slate-900">
          {Math.min(
            startIndex + pageSize,
            totalItems
          )}
        </span>

        {" "}of{" "}

        <span className="font-bold text-slate-900">
          {totalItems}
        </span>

        {" "}products

      </p>


      <div className="flex items-center gap-2">

        {/* PREVIOUS */}

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              (page) => page - 1
            )
          }
          className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>


        {/* PAGE NUMBERS */}

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (

          <button
            key={page}
            type="button"
            onClick={() =>
              setCurrentPage(page)
            }
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {page}
          </button>

        ))}


        {/* NEXT */}

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(
              (page) => page + 1
            )
          }
          className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>

      </div>

    </div>
  );
}