"use client";

import { useState } from "react";
import ProductCard from "../components/products/ProductCard";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 4;
  const products = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      category: "Electronics",
      price: 2499,
      oldPrice: 3999,
      discount: 38,
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      image: "🎧",
    },
    {
      id: 2,
      title: "Smart Watch Series X",
      category: "Electronics",
      price: 3299,
      oldPrice: 4999,
      discount: 34,
      rating: 4.9,
      reviews: 216,
      badge: "Top Rated",
      image: "⌚",
    },
    {
      id: 3,
      title: "Classic Casual Sneakers",
      category: "Fashion",
      price: 1899,
      oldPrice: 2999,
      discount: 37,
      rating: 4.7,
      reviews: 89,
      badge: "Trending",
      image: "👟",
    },
    {
      id: 4,
      title: "Everyday Skincare Kit",
      category: "Beauty",
      price: 1299,
      oldPrice: 1999,
      discount: 35,
      rating: 4.6,
      reviews: 73,
      badge: "Popular",
      image: "🧴",
    },
    {
      id: 5,
      title: "Modern Table Lamp",
      category: "Home",
      price: 999,
      oldPrice: 1599,
      discount: 38,
      rating: 4.5,
      reviews: 61,
      badge: "New",
      image: "💡",
    },
    {
      id: 6,
      title: "Professional Football",
      category: "Sports",
      price: 799,
      oldPrice: 1199,
      discount: 33,
      rating: 4.7,
      reviews: 54,
      badge: "Popular",
      image: "⚽",
    },
    {
      id: 7,
      title: "Organic Grocery Basket",
      category: "Groceries",
      price: 699,
      oldPrice: 999,
      discount: 30,
      rating: 4.6,
      reviews: 48,
      badge: "Fresh",
      image: "🛒",
    },
    {
      id: 8,
      title: "Minimal Leather Backpack",
      category: "Fashion",
      price: 2199,
      oldPrice: 3499,
      discount: 37,
      rating: 4.8,
      reviews: 102,
      badge: "Trending",
      image: "🎒",
    },
  ];
  const filteredProducts = products.filter((product) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch =
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;

    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    const matchesRating =
      selectedRating === 0 || product.rating >= selectedRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating
    );
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.price - b.price;
    }

    if (sortOption === "price-high") {
      return b.price - a.price;
    }

    if (sortOption === "rating") {
      return b.rating - a.rating;
    }

    if (sortOption === "name") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-white">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                Our Collection
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Discover
              <span className="ml-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Products
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore our collection of carefully selected products and find
              exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Products Content */}
      <section className="relative py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-xl">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Sort */}
              <div className="flex w-full gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-none"
                >
                  ⚙️ Filters
                </button>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition hover:border-blue-200 focus:border-blue-500 sm:flex-none"
                >
                  <option value="">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content Layout */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Filter Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-slate-900">
                    Filters
                  </h2>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Products");
                      setMinPrice("");
                      setMaxPrice("");
                      setSelectedRating(0);
                    }}
                    className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
                  >
                    Clear
                  </button>
                </div>

                {/* Category */}
                <div className="mt-7">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Category
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "All Products",
                      "Electronics",
                      "Fashion",
                      "Beauty",
                      "Home",
                      "Sports",
                      "Groceries",
                    ].map((category) => (
                      <label
                        key={category}
                        className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-blue-600"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="h-4 w-4 accent-blue-600"
                        />

                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mt-8 border-t border-slate-150 pt-7">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Price Range
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 text-black"
                    />

                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-blue-500 text-black"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-8 border-t border-slate-100 pt-7">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Rating
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[4, 3, 2].map((rating) => (
                      <label
                        key={rating}
                        className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-blue-600"
                      >
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating}
                          onChange={(e) =>
                            setSelectedRating(Number(e.target.value))
                          }
                          className="h-4 w-4 accent-blue-600"
                        />

                        <span className="text-amber-400">
                          {"★".repeat(rating)}
                          <span className="text-slate-200">
                            {"★".repeat(5 - rating)}
                          </span>
                        </span>

                        <span>& up</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Area */}
            <div>
              {/* Results Header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    All Products
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Showing products from our collection
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                  {filteredProducts.length} Products
                </span>
              </div>

              {/* Empty Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
                    🔍
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-900">
                    No products found
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    We couldn't find any products matching
                    <span className="font-bold text-slate-700">
                      {" "}
                      "{searchQuery}"
                    </span>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                  >
                    Clear Search
                  </button>
                </div>
              )}
              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-bold text-slate-900">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-bold text-slate-900">
                      {Math.min(
                        startIndex + productsPerPage,
                        sortedProducts.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-slate-900">
                      {sortedProducts.length}
                    </span>{" "}
                    products
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((page) => page - 1)}
                      className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Previous
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((page) => page + 1)}
                      className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl sm:max-w-lg">
            {/* Drawer Header */}
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              {/* Category */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category
                </h3>

                <div className="mt-4 space-y-3">
                  {[
                    "All Products",
                    "Electronics",
                    "Fashion",
                    "Beauty",
                    "Home",
                    "Sports",
                    "Groceries",
                  ].map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-3 rounded-xl p-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <input
                        type="radio"
                        name="mobile-category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="h-4 w-4 accent-blue-600"
                      />

                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mt-8 border-t border-slate-100 pt-7">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Price Range
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Rating */}
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
                        name="mobile-rating"
                        value={rating}
                        checked={selectedRating === rating}
                        onChange={(e) => {
                          setSelectedRating(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="h-4 w-4 accent-blue-600"
                      />

                      <span className="text-amber-400">
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
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-200 bg-white p-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All Products");
                    setMinPrice("");
                    setMaxPrice("");
                    setSelectedRating(0);
                    setCurrentPage(1);
                  }}
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
