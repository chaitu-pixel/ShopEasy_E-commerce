
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Flame,
  Gift,
  LoaderCircle,
  PackageCheck,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Truck,
  X,
  Zap,
} from "lucide-react";

import { getProducts } from "@/services/productService";
import ProductCard from "@/components/products/ProductCard";

const categories = [
  { label: "All Deals", value: "all" },
  { label: "Beauty", value: "beauty" },
  { label: "Fragrances", value: "fragrances" },
  { label: "Furniture", value: "furniture" },
  { label: "Groceries", value: "groceries" },
  { label: "Home Decoration", value: "home-decoration" },
  { label: "Kitchen Accessories", value: "kitchen-accessories" },
  { label: "Laptops", value: "laptops" },
  { label: "Mens Shirts", value: "mens-shirts" },
  { label: "Mens Shoes", value: "mens-shoes" },
  { label: "Mobile Accessories", value: "mobile-accessories" },
  { label: "Smartphones", value: "smartphones" },
  { label: "Sports Accessories", value: "sports-accessories" },
  { label: "Sunglasses", value: "sunglasses" },
  { label: "Tablets", value: "tablets" },
  { label: "Tops", value: "tops" },
  { label: "Womens Bags", value: "womens-bags" },
  { label: "Womens Dresses", value: "womens-dresses" },
  { label: "Womens Jewellery", value: "womens-jewellery" },
  { label: "Womens Shoes", value: "womens-shoes" },
  { label: "Womens Watches", value: "womens-watches" },
  { label: "Vehicle", value: "vehicle" },
  { label: "Motorcycle", value: "motorcycle" },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const getDiscount = (product) =>
  Math.round(Number(product.discountPercentage) || 0);

const getOriginalPrice = (product) => {
  const discount = getDiscount(product);
  if (discount <= 0 || discount >= 100) return product.price;
  return product.price / (1 - discount / 100);
};

export default function DealsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minimumDiscount, setMinimumDiscount] = useState("0");
  const [sortBy, setSortBy] = useState("discount");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadDeals() {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();
        const items = Array.isArray(response)
          ? response
          : response.products || [];

        if (active) setProducts(items);
      } catch {
        if (active) {
          setError(
            "We couldn't load the deals right now. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDeals();

    return () => {
      active = false;
    };
  }, []);

  const deals = useMemo(() => {
    let result = products.filter(
      (product) => getDiscount(product) > 0
    );

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query)
      );
    }

    result = result.filter(
      (product) =>
        getDiscount(product) >= Number(minimumDiscount)
    );

    if (sortBy === "discount") {
      result.sort(
        (a, b) => getDiscount(b) - getDiscount(a)
      );
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
    }

    return result;
  }, [products, category, search, minimumDiscount, sortBy]);

  const featuredDeals = useMemo(
    () => [...products]
      .filter((product) => getDiscount(product) > 0)
      .sort((a, b) => getDiscount(b) - getDiscount(a))
      .slice(0, 3),
    [products]
  );

  const limitedStock = useMemo(
    () => deals.filter(
      (product) =>
        Number(product.stock) > 0 &&
        Number(product.stock) <= 10
    ).slice(0, 4),
    [deals]
  );

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMinimumDiscount("0");
    setSortBy("discount");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">

      {/* PREMIUM HERO */}
      <section className="relative isolate overflow-hidden border-b border-violet-100 bg-[#f5f2fb]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-8 lg:px-8 lg:py-12">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">
              <Flame size={15} />
              The ShopEasy Deals Edit
            </div>

            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Big savings.
              <span className="block text-violet-700">
                Better shopping.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Discover discounted favourites across your store.
              Explore standout offers, compare prices and find
              your next great purchase.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#all-deals"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
              >
                Explore deals
                <ArrowRight size={17} />
              </a>

              <a
                href="#featured-deals"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                <Sparkles size={17} />
                Featured offers
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-violet-600" />
                Prices from the product catalogue
              </span>
              <span className="flex items-center gap-2">
                <PackageCheck size={16} className="text-violet-600" />
                Browse available stock
              </span>
            </div>
          </div>

          {/* HERO OFFER CARD */}
          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-sm shadow-violet-900/5 backdrop-blur-sm">

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Deal highlights
                  </p>
                  <h2 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                    Worth a closer look
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-800">
                  <BadgePercent size={20} />
                </div>
              </div>

              {loading ? (
                <div className="mt-4 flex h-36 items-center justify-center">
                  <LoaderCircle className="animate-spin text-violet-600" size={26} />
                </div>
              ) : featuredDeals.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {featuredDeals.map((product, index) => (
                    <Link
                      href={`/products/${product.id}`}
                      key={product.id}
                      className="flex min-w-0 items-center gap-2.5 rounded-lg border border-violet-100/80 bg-[#faf8fd] p-2 transition hover:border-violet-200 hover:bg-violet-50"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-100 bg-white p-1">
                        <Image
                          src={product.thumbnail || product.images?.[0] || ""}
                          alt={product.title}
                          width={56}
                          height={56}
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          Featured offer {index + 1}
                        </p>
                        <h3 className="mt-0.5 line-clamp-1 text-xs font-semibold text-slate-900 sm:text-sm">
                          {product.title}
                        </h3>
                        <p className="mt-0.5 text-sm font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-md bg-violet-100 px-2 py-1 text-[11px] font-bold text-violet-800">
                        -{getDiscount(product)}%
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="py-10 text-center text-sm text-slate-500">
                  Featured offers will appear here when discounted products are available.
                </p>
              )}

              <div className="mt-3 flex items-center justify-between rounded-lg bg-violet-50/70 px-3 py-2">
                <span className="text-xs text-slate-500">
                  Offers based on catalogue discounts
                </span>
                <Zap size={16} className="text-violet-600" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-100 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {[
            {
              icon: Tag,
              title: "Clear deal pricing",
              text: "See product prices and discounts.",
            },
            {
              icon: Truck,
              title: "Explore the catalogue",
              text: "Discover deals across categories.",
            },
            {
              icon: ShieldCheck,
              title: "Shop with confidence",
              text: "Review product details before buying.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-4 py-5 sm:px-5 lg:py-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Icon size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED DEALS */}
      <section id="featured-deals" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
              <Flame size={16} />
              Handpicked offers
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Featured deals
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Start with some of the biggest percentage discounts.
            </p>
          </div>

          <a
            href="#all-deals"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-slate-700 transition hover:text-violet-700 sm:self-auto"
          >
            View all offers
            <ArrowRight size={17} />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-40 animate-pulse rounded-xl bg-slate-200" />
            ))}
          </div>
        ) : featuredDeals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDeals.map((product, index) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-violet-200 hover:bg-violet-50/20 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700">
                    {index === 0 ? "Top discount" : "Featured deal"}
                  </span>
                  <ArrowDownRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-violet-700" size={18} />
                </div>

                <div className="mt-4 flex min-w-0 items-center gap-3">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                    <Image
                      src={product.thumbnail || product.images?.[0] || ""}
                      alt={product.title}
                      width={80}
                      height={80}
                      unoptimized
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] capitalize text-slate-500">
                      {product.category?.replaceAll("-", " ")}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-base font-bold text-violet-700">
                      {getDiscount(product)}% off
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 transition group-hover:text-violet-700">
                    View deal →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            No featured discounts are available at the moment.
          </div>
        )}
      </section>

      {/* ALL DEALS + FILTERS */}
      <section id="all-deals" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-12 lg:py-14">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                <Sparkles size={16} />
                Your next great find
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Shop all deals
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Search, filter and compare discounted products.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-72">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search discounted products..."
                  aria-label="Search deals"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:border-violet-200 hover:bg-violet-50 lg:hidden"
              >
                <SlidersHorizontal size={17} />
                Filters
                <ChevronDown size={16} className={`transition ${mobileFiltersOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

            {/* FILTER SIDEBAR */}
            <aside className={`${mobileFiltersOpen ? "block" : "hidden"} h-fit rounded-xl border border-slate-200 bg-slate-50 p-4 lg:sticky lg:top-24 lg:block`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold">Filter deals</h3>
                <SlidersHorizontal size={17} className="text-slate-500" />
              </div>

              <div className="mt-5">
                <label htmlFor="deal-category" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </label>

                <select
                  id="deal-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-400"
                >
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Minimum discount
                </p>

                <div className="space-y-3">
                  {[
                    { label: "Any discount", value: "0" },
                    { label: "10% and above", value: "10" },
                    { label: "20% and above", value: "20" },
                    { label: "30% and above", value: "30" },
                    { label: "40% and above", value: "40" },
                    { label: "50% and above", value: "50" },
                  ].map((item) => (
                    <label key={item.value} className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                      <input
                        type="radio"
                        name="minimumDiscount"
                        value={item.value}
                        checked={minimumDiscount === item.value}
                        onChange={(e) => setMinimumDiscount(e.target.value)}
                        className="h-4 w-4 accent-slate-950"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-violet-200 hover:text-violet-700"
              >
                <X size={16} />
                Clear filters
              </button>
            </aside>

            {/* RESULTS */}
            <div className="min-w-0">

              <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold">
                    {loading ? "Finding deals..." : `${deals.length} deals found`}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Results update when you change a filter.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="deal-sort" className="shrink-0 text-xs font-semibold text-slate-500">
                    Sort by
                  </label>

                  <select
                    id="deal-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-slate-400"
                  >
                    <option value="discount">Biggest discount</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="rating">Highest rated</option>
                  </select>
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                  <p className="font-bold text-red-800">
                    Unable to load deals
                  </p>
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Try again
                  </button>
                </div>
              ) : loading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4">
                      <div className="h-48 animate-pulse rounded-xl bg-slate-100" />
                      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                      <div className="mt-5 h-10 animate-pulse rounded-xl bg-slate-100" />
                    </div>
                  ))}
                </div>
              ) : deals.length > 0 ? (
                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {deals.map((product) => (
                    <div key={product.id} className="min-w-0">
                      <ProductCard
                        product={{
                          ...product,
                          discount: getDiscount(product),
                          discountPercentage: getDiscount(product),
                          oldPrice: getOriginalPrice(product),
                          image: product.thumbnail || product.images?.[0] || "",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                    <Search size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold">
                    No matching deals found
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Try a different search, choose another category or reduce the minimum discount.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Reset filters
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* LIMITED STOCK */}
      {!loading && !error && limitedStock.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-12 lg:py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                <Clock3 size={16} />
                Check availability
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Limited stock deals
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Discounted products with ten or fewer units listed in stock.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {limitedStock.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group flex min-w-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-violet-200 hover:bg-violet-50/20"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                  <Image
                    src={product.thumbnail || product.images?.[0] || ""}
                    alt={product.title}
                    width={80}
                    height={80}
                    unoptimized
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-bold">
                    {product.title}
                  </p>
                  <p className="mt-2 text-sm font-black">
                    {formatPrice(product.price)}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-violet-700">
                    {product.stock} units listed
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-7xl rounded-2xl border border-violet-100 bg-violet-50 px-6 py-8 text-slate-900 sm:px-8 sm:py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
                <Gift size={16} />
                Your next find awaits
              </div>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Good deals. Great choices.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                Browse the full ShopEasy catalogue and find products that fit your needs.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Explore all products
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
