import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/services/productService";
import ProductCard from "@/components/products/ProductCard";
import HeroCarousel from "@/components/home/HeroCarousel";

export const dynamic = "force-dynamic";

const categories = [
  {
    name: "Fashion",
    count: "1,200+",
    href: "/products?category=Fashion",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Electronics",
    count: "850+",
    href: "/products?category=Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Home & Living",
    count: "640+",
    href: "/products?category=Home",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Beauty & Care",
    count: "420+",
    href: "/products?category=Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Sports",
    count: "380+",
    href: "/products?category=Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Toys & Games",
    count: "290+",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Groceries",
    count: "320+",
    href: "/products?category=Groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Books",
    count: "260+",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=85",
  },
];

const fallbackProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    category: "electronics",
    price: 99.99,
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    title: "Smart Watch",
    category: "mens-watches",
    price: 199.99,
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    title: "Everyday Fragrance",
    category: "fragrances",
    price: 89.99,
    thumbnail:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    title: "Running Shoes",
    category: "mens-shoes",
    price: 69.99,
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 5,
    title: "Skincare Essentials",
    category: "beauty",
    price: 49.99,
    thumbnail:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 6,
    title: "Everyday Backpack",
    category: "accessories",
    price: 79.99,
    thumbnail:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=85",
  },
];

function SectionHeading({ eyebrow, title, description, href }) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-700">
          {eyebrow}
        </p>

        <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="text-sm font-semibold text-violet-700 hover:text-blue-900"
        >
          View all →
        </Link>
      )}
    </div>
  );
}

export default async function HomePage() {
  let products = [];
  let failed = false;

  try {
    const data = await getProducts();
    products = Array.isArray(data) ? data : data?.products || [];
  } catch (error) {
    failed = true;
    console.error("Product loading failed:", error);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Announcement bar */}


      {/* Three-slide responsive homepage carousel */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        <HeroCarousel />

        {/* Categories */}
        <section className="mt-12">
          <SectionHeading
            eyebrow="Shop by category"
            title="Explore Our Categories"
            description="Find exactly what you need, from fashion to electronics and more."
            href="/products"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-2xl border border-violet-100 bg-gradient-to-b from-blue-50 to-white p-3 text-center transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
              >
                <div className="relative mb-3 h-24 overflow-hidden rounded-xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    unoptimized
                    sizes="160px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <p className="text-xs font-bold">{category.name}</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  ({category.count})
                </p>
                <span className="mt-1 inline-block text-xs text-violet-700">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Promotional banners */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="relative min-h-[210px] overflow-hidden rounded-2xl bg-[#082653]">
            <Image
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85"
              alt="Premium watch promotion"
              fill
              unoptimized
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#082653] via-[#082653]/90 to-transparent" />

            <div className="relative z-10 max-w-sm p-7 text-white sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-200">
                ✧ Limited time offer
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold">
                Up to 70% Off
                <br />
                Top Brands
              </h3>
              <p className="mt-2 text-xs text-blue-100">
                Premium collections. Unbeatable prices.
              </p>
              <Link
                href="/deals"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-bold text-blue-900"
              >
                Shop Deals →
              </Link>
            </div>

            <span className="absolute right-5 top-5 rounded-full bg-blue-600 p-4 text-center text-xs font-bold text-white">
              Save
              <br />
              70%
            </span>
          </div>

          <div className="relative min-h-[210px] overflow-hidden rounded-2xl bg-blue-100">
            <Image
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85"
              alt="Men's accessories collection"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50/95 to-transparent" />

            <div className="relative z-10 max-w-sm p-7 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-700">
                ✧ New season
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold text-[#28104f]">
                Fresh Styles
                <br />
                for Modern Men
              </h3>
              <p className="mt-2 text-xs text-slate-600">
                Fashion · Accessories · Footwear · More
              </p>
              <Link
                href="/products"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-bold text-violet-700 shadow-sm"
              >
                Explore Now →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="mt-12">
          <SectionHeading
            eyebrow="Featured products"
            title="Handpicked Just for You"
            description="Our most popular items, loved by thousands of customers."
            href="/products"
          />

          {failed && (
            <p className="mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              Live products could not load. Showing sample products.
            </p>
          )}

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {products.slice(0, 6).map((product) => (
                <div key={product.id} className="min-w-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {fallbackProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href="/products">
                    <div className="relative h-36 bg-slate-50 sm:h-44">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[9px] font-bold text-white ${
                          index % 2 ? "bg-rose-500" : "bg-violet-600"
                        }`}
                      >
                        {[
                          "Best Seller",
                          "Sale",
                          "Trending",
                          "New",
                          "Sale",
                          "Best Seller",
                        ][index]}
                      </span>
                    </div>

                    <div className="p-3">
                      <p className="truncate text-xs font-bold">
                        {product.title}
                      </p>
                      <p className="mt-1 text-[10px] capitalize text-slate-400">
                        {product.category}
                      </p>
                      <p className="mt-2 text-xs text-amber-500">
                        ★★★★★ <span className="text-slate-400">(4.8)</span>
                      </p>
                      <p className="mt-2 text-sm font-bold text-violet-700">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Why ShopEasy, testimonial and welcome offer */}
        <section className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_1fr_.7fr]">
          <div className="rounded-2xl bg-gradient-to-br from-[#082653] to-[#0d438b] p-6 text-white sm:p-7">
            <h3 className="font-serif text-2xl font-bold">Why ShopEasy?</h3>
            <p className="mt-2 text-xs text-blue-100">
              More than just a store — it&apos;s a better way to shop.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {[
                ["♧", "Fast Delivery", "Get your orders quickly"],
                ["◇", "Secure Payments", "100% protected"],
                ["↺", "Easy Returns", "Hassle-free returns"],
                ["◎", "24/7 Support", "We're always here"],
              ].map(([icon, title, description]) => (
                <div key={title}>
                  <span className="text-2xl text-blue-200">{icon}</span>
                  <p className="mt-2 text-xs font-bold">{title}</p>
                  <p className="mt-1 text-[10px] text-blue-100">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-6 inline-flex rounded-full border border-blue-300/50 px-4 py-2 text-xs font-semibold hover:bg-white hover:text-blue-900"
            >
              Learn More →
            </Link>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-7">
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet-700">
              Customer stories
            </p>
            <h3 className="mt-2 font-serif text-xl font-bold text-[#28104f]">
              What Our Customers Say
            </h3>

            <div className="mt-5 rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
              <p className="text-lg tracking-widest text-amber-400">
                ★★★★★
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                “Amazing quality and super fast delivery! I love shopping on
                ShopEasy. The products are just as described and customer
                service is excellent.”
              </p>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-xs font-bold">Sarah Johnson</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Verified customer
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-blue-900">
            <Image
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=85"
              alt="Men's premium fashion"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082653] via-[#082653]/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xs uppercase tracking-widest text-blue-200">
                A welcome gift
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold">
                Get 15% Off
                <br />
                Your First Order
              </h3>
              <p className="mt-2 text-xs text-blue-100">
                Use code: WELCOME15
              </p>
              <Link
                href="/products"
                className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-bold text-blue-900"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-blue-50 via-[#edf5ff] to-blue-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700">
              Stay in the loop
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[#28104f]">
              Get Exclusive Offers & Updates
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Be the first to know about new arrivals, special offers and more.
            </p>
          </div>

          <form
            action="/products"
            className="flex w-full max-w-md gap-2 rounded-full border border-violet-100 bg-white p-1.5"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-full px-4 py-2 text-xs outline-none"
            />
            <button
              type="button"
              className="rounded-full bg-violet-600 px-5 py-3 text-xs font-bold text-white hover:bg-violet-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Same Footer preserved */}

    </main>
  );
}