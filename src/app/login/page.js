"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  LockKeyhole,
  UserRound,
} from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">

          {/* Header */}

          <div className="px-6 pb-8 pt-10 text-center sm:px-10 sm:pt-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
              <ShoppingBag size={26} />
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              ShopEasy
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Welcome to ShopEasy
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              Choose your account type to continue. Select administrator
              access for store management or customer access for shopping.
            </p>
          </div>

          {/* Login Options */}

          <div className="grid gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pb-14">

            {/* ADMIN LOGIN */}

            <Link
              href="/login/admin"
              className="group relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
            >
              {/* Background decorations */}

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl transition duration-500 group-hover:bg-indigo-500/30" />

              <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative">

                {/* Icon */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10 transition group-hover:bg-white/15">
                  <ShieldCheck size={27} />
                </div>

                {/* Content */}

                <div className="mt-7">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    <LockKeyhole size={13} />
                    Secure Access
                  </div>

                  <h2 className="text-2xl font-black sm:text-3xl">
                    Admin Login
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                    Access the ShopEasy administration panel to manage
                    products, orders, customers and store operations.
                  </p>
                </div>

                {/* Button */}

                <div className="mt-8 flex items-center justify-between rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition group-hover:bg-indigo-50">
                  <span>Login as Administrator</span>

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

              </div>
            </Link>

            {/* CUSTOMER LOGIN */}

            <Link
              href="/login/customer"
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl sm:p-8"
            >
              {/* Background decoration */}

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-slate-100 blur-3xl transition duration-500 group-hover:bg-slate-200" />

              <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-blue-50 blur-3xl" />

              <div className="relative">

                {/* Icon */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg transition group-hover:scale-105">
                  <ShoppingBag size={27} />
                </div>

                {/* Content */}

                <div className="mt-7">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    <UserRound size={13} />
                    Customer Access
                  </div>

                  <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                    Customer Login
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Sign in to shop products, manage your wishlist,
                    view your orders and complete secure checkout.
                  </p>
                </div>

                {/* Button */}

                <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition group-hover:bg-slate-800">
                  <span>Login as Customer</span>

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

              </div>
            </Link>

          </div>

          {/* Footer */}

          <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 text-center">
            <p className="text-xs text-slate-500">
              New to ShopEasy?{" "}
              <Link
                href="/register"
                className="font-bold text-slate-950 transition hover:text-blue-600"
              >
                Create a customer account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}