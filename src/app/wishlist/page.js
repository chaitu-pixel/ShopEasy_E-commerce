"use client";

import Link from "next/link";
import { useState, useEffect} from "react";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
  Star,
  ArrowRight,
} from "lucide-react";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 2499,
      oldPrice: 3999,
      rating: 4.8,
      reviews: 124,
      image: "🎧",
    },
    {
      id: 2,
      name: "Classic Casual Sneakers",
      category: "Fashion",
      price: 1899,
      oldPrice: 2999,
      rating: 4.7,
      reviews: 89,
      image: "👟",
    },
    {
      id: 3,
      name: "Smart Watch Series X",
      category: "Electronics",
      price: 3299,
      oldPrice: 4999,
      rating: 4.9,
      reviews: 216,
      image: "⌚",
    },
  ]);
  const removeFromWishlist = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };
  const moveToCart = (item) => {
  const savedCart = localStorage.getItem("cartItems");

  const cartItems = savedCart ? JSON.parse(savedCart) : [];

  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      ...item,
      quantity: 1,
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  removeFromWishlist(item.id);
};
  useEffect(() => {
  const savedWishlist = localStorage.getItem("wishlistItems");

  if (savedWishlist) {
    setWishlistItems(JSON.parse(savedWishlist));
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(wishlistItems)
  );
}, [wishlistItems]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
                <Heart size={14} fill="currentColor" />
                My Wishlist
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Your Favorite Products
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Save products you love and come back to them whenever
                you&apos;re ready.
              </p>
            </div>

            <div className="flex h-12 w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4">
              <Heart size={18} className="text-rose-500" fill="currentColor" />
              <span className="text-sm font-bold text-slate-700">
                {wishlistItems.length} Saved Items
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {wishlistItems.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
              <Heart size={36} className="text-rose-500" />
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Start adding products you love and they&apos;ll appear here for
              easy access later.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Product Image */}
                  <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-50">
                    <div className="text-7xl transition duration-300 group-hover:scale-110">
                      {item.image}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-rose-500 shadow-sm backdrop-blur transition hover:bg-rose-50"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <Trash2 size={17} />
                    </button>

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
                      Saved
                    </span>
                  </div>

                  {/* Product Information */}
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                      {item.category}
                    </p>

                    <h2 className="mt-2 line-clamp-2 min-h-[48px] text-lg font-black text-slate-900">
                      {item.name}
                    </h2>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                        <Star
                          size={14}
                          className="text-amber-500"
                          fill="currentColor"
                        />
                        <span className="text-xs font-bold text-amber-700">
                          {item.rating}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400">
                        ({item.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>

                      <span className="text-sm text-slate-400 line-through">
                        ₹{item.oldPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                      <button
                        type="button"
                        onClick={() => moveToCart(item)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                      >
                        <ShoppingBag size={17} />
                        Move to Cart
                      </button>

                      <Link
                        href={`/products/${item.id}`}
                        className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        aria-label={`View ${item.name}`}
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Info */}
            <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-indigo-900">
                  Keep your favorites close
                </p>
                <p className="mt-1 text-xs text-indigo-700">
                  Move your saved products to the cart whenever you&apos;re
                  ready to purchase.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-600 hover:text-white"
              >
                Browse More
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
