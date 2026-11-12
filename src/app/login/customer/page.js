"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  UserRound,
  LockKeyhole,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import InputField from "@/components/forms/InputField";
import PasswordInput from "@/components/forms/PasswordInput";
import { authenticateCustomer, setAuthUser } from "@/utils/storeData";

function CustomerLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const account = authenticateCustomer(form.email, form.password);
      if (!account) {
        setErrors({ password: "Invalid email or password. Please register first if you don't have an account." });
        toast.error("Invalid customer credentials");
        return;
      }

      const displayName = account.name || form.email.split("@")[0];
      setAuthUser({
        role: "user",
        email: account.email,
        name: displayName,
        phone: account.phone || "",
        city: account.city || "",
        avatar: displayName[0]?.toUpperCase() || "C",
      });

      toast.success(`Welcome back, ${displayName}!`);
      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") && !next.startsWith("//") ? next : "/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT BRAND PANEL */}
          <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <p className="text-base font-black">ShopEasy</p>
                  <p className="text-xs text-slate-400">Customer Shopping</p>
                </div>
              </div>

              <div className="mt-16">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold text-blue-300">
                  <UserRound size={14} />
                  CUSTOMER PORTAL
                </div>

                <h1 className="text-3xl font-black leading-tight sm:text-4xl">
                  Shop Smarter.
                  <br />
                  Live Better.
                </h1>

                <p className="mt-4 max-w-sm text-xs leading-6 text-slate-400">
                  Access your cart, track current packages, browse exclusive members discounts, and enjoy speedy checkout.
                </p>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs font-bold text-slate-200">Express</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Fast delivery</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs font-bold text-slate-200">Rewards</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Member perks</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs font-bold text-slate-200">Security</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Protected pay</p>
              </div>
            </div>
          </section>

          {/* RIGHT LOGIN PANEL */}
          <section className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mx-auto max-w-md">
              <Link
                href="/login"
                className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-slate-900"
              >
                <ArrowLeft size={15} />
                Back to Account Selection
              </Link>

              <div className="mb-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <UserRound size={14} />
                  Customer Access
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Customer Sign In
                </h2>

                <p className="mt-1.5 text-xs text-slate-500">
                  Welcome back! Enter your details to continue your shopping journey.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <InputField
                  id="customer-email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                  placeholder="you@example.com"
                  error={errors.email}
                  variant="light"
                  icon={UserRound}
                />

                <PasswordInput
                  id="customer-password"
                  label="Password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  placeholder="Enter your password (6+ chars)"
                  error={errors.password}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  variant="light"
                  icon={LockKeyhole}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Login as Customer"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

              {/* Register Link */}
              <p className="mt-6 text-center text-xs text-slate-500">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Create Customer Account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={null}>
      <CustomerLoginContent />
    </Suspense>
  );
}