import ProductCard from "./components/products/ProductCard";

export default function Home() {
  const featuredProducts = [
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
      id: 3,
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
  ];
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section>
        <section className="relative isolate overflow-hidden bg-slate-50">
          {/* Background Effects */}
          <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

          {/* Decorative Grid */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            {/* ================= LEFT CONTENT ================= */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 sm:text-sm">
                  New collection is here
                </span>
              </div>

              {/* Heading */}
              <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Everything you
                <span className="block">need.</span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  All in one place.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Discover carefully selected products, exclusive deals and
                everyday essentials designed to make your shopping experience
                simple, enjoyable and effortless.
              </p>

              {/* CTA Buttons */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/products"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-600/25"
                >
                  Shop Collection
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#categories"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  Explore Categories
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-slate-200 pt-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg">
                    🚚
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Free Shipping
                    </p>

                    <p className="text-xs text-slate-500">Orders above ₹999</p>
                  </div>
                </div>

                <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                    🔒
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Secure Payment
                    </p>

                    <p className="text-xs text-slate-500">
                      100% secure checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT VISUAL ================= */}
            <div className="relative mx-auto w-full max-w-xl">
              {/* Main Glow */}
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

              {/* Main Product Card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-8 sm:p-10">
                  {/* Decorative circles */}
                  <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/10" />

                  <div className="absolute -bottom-24 -left-16 h-60 w-60 rounded-full border border-white/10" />

                  {/* Content */}
                  <div className="relative flex min-h-[400px] flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-widest text-blue-100 backdrop-blur">
                          SHOP EASY
                        </span>

                        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                          ★ 4.8
                        </span>
                      </div>

                      <h2 className="mt-8 max-w-sm text-3xl font-black leading-tight text-white sm:text-4xl">
                        Upgrade your
                        <span className="block text-blue-300">
                          everyday life.
                        </span>
                      </h2>

                      <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                        Premium products. Better prices. A shopping experience
                        built around you.
                      </p>
                    </div>

                    {/* Product Visual */}
                    <div className="relative flex items-center justify-center py-8">
                      {/* Product Circle */}
                      <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-blue-400/30 to-violet-500/30 shadow-[0_0_80px_rgba(59,130,246,0.3)] backdrop-blur">
                        <div className="text-8xl drop-shadow-2xl transition duration-500 hover:scale-110">
                          🛍️
                        </div>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-400">Starting from</p>

                        <p className="mt-1 text-3xl font-black text-white">
                          ₹499
                        </p>
                      </div>

                      <a
                        href="/products"
                        className="rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-blue-50"
                      >
                        Explore →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= FLOATING CARD 1 ================= */}
              <div className="absolute -left-3 top-16 hidden rounded-2xl border border-white bg-white p-4 shadow-xl shadow-slate-900/10 sm:block lg:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    🛒
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">10K+</p>

                    <p className="text-xs text-slate-500">Products</p>
                  </div>
                </div>
              </div>

              {/* ================= FLOATING CARD 2 ================= */}
              <div className="absolute -bottom-5 right-2 rounded-2xl border border-white bg-white p-4 shadow-xl shadow-slate-900/10 sm:right-0 lg:-right-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
                    ⭐
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">4.8 / 5</p>

                    <p className="text-xs text-slate-500">Customer rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Categories Section */}
      <section>
        {/* Categories Section */}
        <section
          id="categories"
          className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
        >
          {/* Background Decorations */}
          <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-violet-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                    Browse Collections
                  </span>
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  Shop by
                  <span className="ml-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    Category
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                  Explore our carefully organized collections and discover
                  products that fit your lifestyle, needs and everyday
                  essentials.
                </p>
              </div>

              {/* View All */}
              <a
                href="/products"
                className="group inline-flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg"
              >
                View all products
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  →
                </span>
              </a>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {/* Electronics */}
              <a
                href="/products?category=electronics"
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-200/30 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-2xl shadow-lg shadow-blue-600/20 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    💻
                  </div>

                  <h3 className="mt-6 text-base font-black text-slate-900">
                    Electronics
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    120+ Products
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600">
                      Explore
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-slate-500 shadow-sm transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </a>

              {/* Fashion */}
              <a
                href="/products?category=fashion"
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-pink-50 via-white to-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-pink-200 hover:shadow-2xl hover:shadow-pink-900/10"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-200/30 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-2xl shadow-lg shadow-pink-600/20 transition duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    👕
                  </div>

                  <h3 className="mt-6 text-base font-black text-slate-900">
                    Fashion
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    200+ Products
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-600">
                      Explore
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-slate-500 shadow-sm transition duration-300 group-hover:bg-pink-500 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </a>

              {/* Beauty */}
              <a
                href="/products?category=beauty"
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-900/10"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-200/30 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 text-2xl shadow-lg shadow-violet-600/20 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    💄
                  </div>

                  <h3 className="mt-6 text-base font-black text-slate-900">
                    Beauty
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    90+ Products
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-violet-600">
                      Explore
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-slate-500 shadow-sm transition duration-300 group-hover:bg-violet-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </a>

              {/* Home */}
              <a
                href="/products?category=home"
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-900/10"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-200/30 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-lg shadow-amber-600/20 transition duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    🏠
                  </div>

                  <h3 className="mt-6 text-base font-black text-slate-900">
                    Home
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    150+ Products
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600">
                      Explore
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-slate-500 shadow-sm transition duration-300 group-hover:bg-amber-500 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </a>

              {/* Sports */}
              <a
                href="/products?category=sports"
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-200/30 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 text-2xl shadow-lg shadow-emerald-600/20 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    ⚽
                  </div>

                  <h3 className="mt-6 text-base font-black text-slate-900">
                    Sports
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    80+ Products
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600">
                      Explore
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-slate-500 shadow-sm transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </a>

              {/* Groceries */}
              <a
                href="/products?category=groceries"
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-orange-50 via-white to-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-900/10"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-200/30 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-2xl shadow-lg shadow-orange-600/20 transition duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    🛒
                  </div>

                  <h3 className="mt-6 text-base font-black text-slate-900">
                    Groceries
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    100+ Products
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-600">
                      Explore
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-slate-500 shadow-sm transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Bottom Trust Strip */}
            <div className="mt-12 grid grid-cols-2 gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-4 sm:p-5">
              <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="text-xl">🚚</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Fast Delivery
                  </p>
                  <p className="text-[11px] text-slate-500">Across India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Secure Payment
                  </p>
                  <p className="text-[11px] text-slate-500">100% protected</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="text-xl">↩️</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Easy Returns
                  </p>
                  <p className="text-[11px] text-slate-500">Hassle-free</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="text-xl">⭐</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Top Rated</p>
                  <p className="text-[11px] text-slate-500">Trusted shopping</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Featured Products Section */}
      <section>
        {/* Featured Products Section */}
        <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
          {/* Background Effects */}
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-violet-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />

                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                    Handpicked for you
                  </span>
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  Featured
                  <span className="ml-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    Products
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                  Discover our most popular products, carefully selected for
                  quality, value and everyday use.
                </p>
              </div>

              {/* View All */}
              <a
                href="/products"
                className="group inline-flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg"
              >
                View all products
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  →
                </span>
              </a>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  ✨
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Looking for something specific?
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore our complete collection and find your perfect
                    product.
                  </p>
                </div>
              </div>

              <a
                href="/products"
                className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-600/20"
              >
                Explore Products
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>
      </section>

      {/* Promotional Banner */}
      <section>
        {/* Promotional Banner */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-slate-900/20">
              {/* Background Glow Effects */}
              <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl" />

              <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />

              <div className="absolute right-1/3 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

              {/* Decorative Circles */}
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

              {/* Content */}
              <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-20">
                {/* Left Content */}
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-400" />

                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-200">
                      Limited Time Offer
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Upgrade your
                    <span className="block bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
                      everyday essentials.
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                    Get exclusive deals on carefully selected products. Discover
                    premium quality, amazing prices and everything you need in
                    one place.
                  </p>

                  {/* Discount */}
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                      <p className="text-xs font-medium text-slate-400">
                        Save up to
                      </p>

                      <p className="mt-1 text-4xl font-black text-white">50%</p>

                      <p className="text-xs font-medium text-blue-300">
                        on selected products
                      </p>
                    </div>

                    <div className="hidden h-12 w-px bg-white/10 sm:block" />

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Use promo code
                      </p>

                      <div className="mt-2 inline-flex items-center gap-3 rounded-xl border border-dashed border-blue-400/40 bg-blue-500/10 px-4 py-2.5">
                        <span className="text-sm font-black tracking-widest text-blue-200">
                          SHOP50
                        </span>

                        <span className="text-xs text-slate-500">•</span>

                        <span className="text-xs font-medium text-slate-400">
                          Limited offer
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="/products"
                      className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
                    >
                      Shop the Offer
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>

                    <a
                      href="/products"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                    >
                      Explore Deals
                    </a>
                  </div>
                </div>

                {/* Right Visual */}
                <div className="relative mx-auto w-full max-w-md">
                  {/* Glow */}
                  <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/30 blur-3xl" />

                  {/* Main Offer Card */}
                  <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8">
                      {/* Decorative Shapes */}
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/20" />

                      <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full border border-white/10" />

                      <div className="relative text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-100">
                          Special Deal
                        </p>

                        <div className="mt-6 flex items-center justify-center">
                          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white/10 shadow-[0_0_80px_rgba(255,255,255,0.15)] backdrop-blur-md">
                            <div className="text-8xl drop-shadow-2xl">🛍️</div>
                          </div>
                        </div>

                        <p className="mt-7 text-sm font-medium text-blue-100">
                          Selected products
                        </p>

                        <p className="mt-1 text-5xl font-black text-white">
                          -50%
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-2">
                          <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white">
                            SHOP50
                          </span>

                          <span className="text-xs text-blue-100">
                            Use at checkout
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Card */}
                  <div className="absolute -bottom-5 -left-4 rounded-2xl border border-white/10 bg-white p-4 shadow-2xl sm:-left-8">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                        ✓
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">
                          Extra Savings
                        </p>

                        <p className="text-xs text-slate-500">
                          Limited availability
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Discount */}
                  <div className="absolute -right-3 top-8 rounded-2xl border border-white/10 bg-white p-4 shadow-2xl sm:-right-6">
                    <p className="text-xs font-medium text-slate-500">
                      Deal expires
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-900">
                      Soon!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Benefits Section */}
      <section>
        {/* Benefits Section */}
        <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
          {/* Background Decorations */}
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                  The ShopEasy Promise
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Why shop
                <span className="ml-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  with us?
                </span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                We make online shopping simple, secure and convenient from
                discovery to delivery.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Benefit 1 */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-100/50 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-2xl shadow-lg shadow-blue-600/20 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    🚚
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-900">
                    Fast Delivery
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Get your favorite products delivered quickly and
                    conveniently right to your doorstep.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
                    <span>Reliable delivery</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/10">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-100/50 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 text-2xl shadow-lg shadow-emerald-600/20 transition duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    🔒
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-900">
                    Secure Payment
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Shop confidently with a secure checkout experience designed
                    to protect your payment information.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <span>Protected checkout</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-900/10">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-100/50 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 text-2xl shadow-lg shadow-violet-600/20 transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                    ↩️
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-900">
                    Easy Returns
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Changed your mind? Our simple return experience makes
                    shopping more comfortable.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-violet-600">
                    <span>Hassle-free process</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-900/10">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-100/50 blur-2xl transition duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-lg shadow-amber-600/20 transition duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    ⭐
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-900">
                    Quality Products
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Discover carefully selected products with quality, value and
                    everyday usefulness in mind.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-amber-600">
                    <span>Made for you</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Statistics */}
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                <div className="p-6 text-center">
                  <p className="text-3xl font-black text-slate-950">10K+</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Products available
                  </p>
                </div>

                <div className="p-6 text-center">
                  <p className="text-3xl font-black text-slate-950">4.8/5</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Customer rating
                  </p>
                </div>

                <div className="p-6 text-center">
                  <p className="text-3xl font-black text-slate-950">24/7</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Customer support
                  </p>
                </div>

                <div className="p-6 text-center">
                  <p className="text-3xl font-black text-slate-950">100%</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Secure shopping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
