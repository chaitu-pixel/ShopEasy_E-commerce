"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { getCartItems, saveCartItems } from "../utils/cartUtils";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
} from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = getCartItems();
    setCartItems(storedCart);
  }, []);

  // Update product quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;

        return {
          ...item,
          quantity: Math.max(1, newQuantity),
        };
      }

      return item;
    });

    setCartItems(updatedCart);
    saveCartItems(updatedCart);
  };

  // Remove product
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);
    saveCartItems(updatedCart);

    toast.success("Item removed from cart!");
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Discount
  const discount = cartItems.reduce(
    (total, item) => total + (item.oldPrice - item.price) * item.quantity,
    0,
  );

  // Delivery charge
  const delivery = subtotal >= 3000 ? 0 : 99;

  // Final total
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                Your Cart
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-2 text-slate-500">
                {cartItems.length} different products in your cart
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <ShoppingBag size={34} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Products */}
            <div className="space-y-5">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 sm:h-32 sm:w-32">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-3"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                            {item.category}
                          </p>

                          <h2 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                            {item.name}
                          </h2>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>

                        <span className="text-sm text-slate-400 line-through">
                          ₹{item.oldPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Bottom Row */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        {/* Quantity */}
                        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-white hover:text-indigo-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-3 text-sm font-bold text-slate-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-white hover:text-indigo-600"
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <p className="text-lg font-black text-slate-900">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Benefits */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Truck className="text-indigo-600" size={22} />
                  <p className="mt-3 text-sm font-bold text-slate-900">
                    Fast Delivery
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Quick & reliable shipping
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <ShieldCheck className="text-indigo-600" size={22} />
                  <p className="mt-3 text-sm font-bold text-slate-900">
                    Secure Payment
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    100% secure checkout
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Tag className="text-indigo-600" size={22} />
                  <p className="mt-3 text-sm font-bold text-slate-900">
                    Great Deals
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Best prices guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <h2 className="text-xl font-black text-slate-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>

                    <span className="font-semibold text-slate-900">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Discount</span>

                    <span className="font-semibold text-green-600">
                      -₹{discount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery</span>

                    <span className="font-semibold text-slate-900">
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Total</p>

                        <p className="mt-1 text-2xl font-black text-slate-900">
                          ₹{total.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                        Saved ₹{discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout */}
                <Link
                  href="/checkout"
                  className="mt-7 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Continue Shopping
                </Link>

                <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                  Taxes and final delivery charges are calculated at checkout.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
