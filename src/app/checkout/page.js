"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  ShieldCheck,
  LockKeyhole,
  Truck,
  CheckCircle2,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

const checkoutItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    quantity: 1,
    image: "🎧",
  },
  {
    id: 2,
    name: "Classic Casual Sneakers",
    category: "Fashion",
    price: 1899,
    quantity: 2,
    image: "👟",
  },
];

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = subtotal >= 3000 ? 0 : 99;
  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderPlaced(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {orderPlaced ? (
        <section className="flex min-h-[75vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Order Confirmed
            </p>

            <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Thank you for your order!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
              Your order has been placed successfully. We’ll send you the order
              details and delivery updates shortly.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Order Total</span>

                <span className="text-lg font-black text-slate-900">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-slate-500">Payment Method</span>

                <span className="text-sm font-bold capitalize text-slate-800">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod === "upi"
                      ? "UPI"
                      : "Card"}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="flex flex-1 items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-600"
              >
                Continue Shopping
              </Link>

              <Link
                href="/profile"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
              >
                View Orders
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Header */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
              >
                <ArrowLeft size={17} />
                Back to Cart
              </Link>

              <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                    <LockKeyhole size={13} />
                    Secure Checkout
                  </div>

                  <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                    Complete Your Order
                  </h1>

                  <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Enter your details and choose your preferred payment method.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <ShieldCheck size={17} className="text-emerald-500" />
                  Secure & Protected
                </div>
              </div>
            </div>
          </section>

          {/* Checkout Content */}
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              {/* Left Side */}
              <div className="space-y-6">
                {/* Shipping Information */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                        Step 1
                      </p>

                      <h2 className="mt-1 text-xl font-black text-slate-900">
                        Shipping Information
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        First Name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Street Address
                      </label>

                      <input
                        id="address"
                        type="text"
                        placeholder="House number, street name"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        type="text"
                        placeholder="Enter city"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label
                        htmlFor="state"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        State
                      </label>

                      <input
                        id="state"
                        type="text"
                        placeholder="Enter state"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label
                        htmlFor="pincode"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        PIN Code
                      </label>

                      <input
                        id="pincode"
                        type="text"
                        placeholder="500001"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Country
                      </label>

                      <select
                        id="country"
                        defaultValue="India"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Payment Information */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <CreditCard size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-violet-500">
                        Step 2
                      </p>

                      <h2 className="mt-1 text-xl font-black text-slate-900">
                        Payment Method
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Choose how you want to pay for your order.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    {/* Card */}
                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2  p-4">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="h-4 w-4 accent-indigo-600"
                      />

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                        <CreditCard size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">
                          Credit / Debit Card
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Visa, Mastercard, RuPay
                        </p>
                      </div>
                    </label>

                    {/* UPI */}
                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="h-4 w-4 accent-indigo-600"
                      />

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <span className="text-xs font-black">UPI</span>
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">UPI</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Google Pay, PhonePe, Paytm and more
                        </p>
                      </div>
                    </label>

                    {/* Cash */}
                    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="h-4 w-4 accent-indigo-600"
                      />

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Truck size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">
                          Cash on Delivery
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Pay when your order arrives
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === "card" && (
                    <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="cardNumber"
                            className="mb-2 block text-sm font-bold text-slate-700"
                          >
                            Card Number
                          </label>

                          <input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="expiry"
                            className="mb-2 block text-sm font-bold text-slate-700"
                          >
                            Expiry Date
                          </label>

                          <input
                            id="expiry"
                            type="text"
                            placeholder="MM / YY"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cvv"
                            className="mb-2 block text-sm font-bold text-slate-700"
                          >
                            CVV
                          </label>

                          <input
                            id="cvv"
                            type="password"
                            placeholder="•••"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {paymentMethod === "upi" && (
                    <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-900">
                          Choose UPI App
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Select your preferred UPI payment option
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                          {
                            name: "Google Pay",
                            logo: "/upi/google-pay.webp",
                          },
                          {
                            name: "PhonePe",
                            logo: "/upi/phonepe.png",
                          },
                          {
                            name: "Paytm",
                            logo: "/upi/paytm.jpeg",
                          },
                          {
                            name: "BHIM",
                            logo: "/upi/bhim.png",
                          },
                        ].map((app) => (
                          <button
                            key={app.name}
                            type="button"
                            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md"
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
                              <img
                                src={app.logo}
                                alt={`${app.name} logo`}
                                className="h-7 w-7 object-contain"
                              />
                            </div>

                            <span className="text-sm font-semibold text-slate-700 transition group-hover:text-indigo-600">
                              {app.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          UPI ID
                        </label>

                        <input
                          type="text"
                          placeholder="example@upi"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === "cod" && (
                    <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <Truck className="h-6 w-6 text-emerald-600" />
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            Cash on Delivery
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            Pay in cash when your order is delivered to your
                            address.
                          </p>

                          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
                            <CheckCircle2 className="h-4 w-4" />
                            No online payment required
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {/* Right Side — Order Summary */}
              <aside className="h-fit lg:sticky lg:top-6">
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <ShoppingBag size={19} />
                      </div>

                      <div>
                        <h2 className="text-lg font-black text-slate-900">
                          Order Summary
                        </h2>
                        <p className="text-xs text-slate-500">
                          {checkoutItems.length} products
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-4 p-6">
                    {checkoutItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-3xl">
                          {item.image}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold text-slate-800">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Qty: {item.quantity}
                          </p>

                          <p className="mt-1 text-sm font-black text-slate-900">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-slate-100 p-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-slate-500">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-800">
                          ₹{subtotal.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex justify-between text-slate-500">
                        <span>Delivery</span>
                        <span className="font-semibold text-emerald-600">
                          {delivery === 0
                            ? "FREE"
                            : `₹${delivery.toLocaleString("en-IN")}`}
                        </span>
                      </div>

                      <div className="my-4 border-t border-dashed border-slate-200" />

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-400">
                            Total Amount
                          </p>
                          <p className="mt-1 text-2xl font-black text-slate-900">
                            ₹{total.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                          Inclusive
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isPlacingOrder}
                      onClick={handlePlaceOrder}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-4 font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isPlacingOrder ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          Place Order
                          <ChevronRight className="h-5 w-5" />
                        </>
                      )}
                    </button>

                    <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <p className="text-xs leading-5 text-emerald-700">
                        Your payment and personal information are protected with
                        secure encryption.
                      </p>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
