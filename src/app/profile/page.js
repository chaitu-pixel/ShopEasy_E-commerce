"use client";

import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  ShoppingBag,
  Edit3,
  Clock3,
  CheckCircle2,
  Truck,
  ChevronRight,
} from "lucide-react";

const orders = [
  {
    id: "SE-10482",
    date: "28 Sep 2026",
    items: 3,
    amount: 5697,
    status: "Delivered",
    statusColor: "green",
  },
  {
    id: "SE-10391",
    date: "21 Sep 2026",
    items: 2,
    amount: 4298,
    status: "Shipped",
    statusColor: "blue",
  },
  {
    id: "SE-10276",
    date: "14 Sep 2026",
    items: 1,
    amount: 2499,
    status: "Processing",
    statusColor: "amber",
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
              <User size={14} />
              My Account
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Profile & Orders
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your personal information and keep track of your recent
              orders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Profile Card */}
          <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Profile Cover */}
            <div className="h-28 bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-700" />

            <div className="px-6 pb-6">
              {/* Avatar */}
              <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-black text-white shadow-lg">
                C
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-black text-slate-900">
                  Chaitanya
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  chaitanya@example.com
                </p>
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Package size={18} className="text-indigo-500" />
                  <p className="mt-3 text-xl font-black text-slate-900">12</p>
                  <p className="text-xs font-medium text-slate-500">
                    Orders
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <Heart size={18} className="text-rose-500" />
                  <p className="mt-3 text-xl font-black text-slate-900">8</p>
                  <p className="text-xs font-medium text-slate-500">
                    Wishlist
                  </p>
                </div>
              </div>

              {/* Account Links */}
              <div className="mt-6 space-y-2">
                <Link
                  href="/cart"
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag size={18} />
                    My Cart
                  </span>
                  <ChevronRight size={17} />
                </Link>

                <Link
                  href="/wishlist"
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                >
                  <span className="flex items-center gap-3">
                    <Heart size={18} />
                    Wishlist
                  </span>
                  <ChevronRight size={17} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Personal Information */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                    Personal Details
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    Personal Information
                  </h2>
                </div>

                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600"
                >
                  <Edit3 size={15} />
                  Edit
                </button>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <User size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Full Name
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        Chaitanya
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      <Mail size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Email Address
                      </p>
                      <p className="mt-1 truncate text-sm font-bold text-slate-800">
                        chaitanya@example.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <Phone size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Phone Number
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        Hyderabad, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Order History */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                    Purchase History
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    Recent Orders
                  </h2>
                </div>

                <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 sm:block">
                  {orders.length} Recent
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-slate-100 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <Package size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-black text-slate-900">
                            Order #{order.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {order.date} · {order.items} items
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-black text-slate-900">
                            ₹{order.amount.toLocaleString("en-IN")}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 sm:justify-end">
                            {order.status === "Delivered" && (
                              <CheckCircle2
                                size={14}
                                className="text-emerald-500"
                              />
                            )}

                            {order.status === "Shipped" && (
                              <Truck size={14} className="text-blue-500" />
                            )}

                            {order.status === "Processing" && (
                              <Clock3 size={14} className="text-amber-500" />
                            )}

                            <span
                              className={`text-xs font-bold ${
                                order.statusColor === "green"
                                  ? "text-emerald-600"
                                  : order.statusColor === "blue"
                                  ? "text-blue-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                          aria-label={`View order ${order.id}`}
                        >
                          <ChevronRight size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                View All Orders
                <ArrowRightIcon />
              </button>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArrowRightIcon() {
  return <ChevronRight size={17} />;
}