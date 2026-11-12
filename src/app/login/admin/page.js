"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  UserRound,
  LockKeyhole,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import InputField from "@/components/forms/InputField";
import PasswordInput from "@/components/forms/PasswordInput";
import { setAuthUser } from "@/utils/storeData";

export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Admin email or username is required.";
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
      const isValidAdmin =
        form.username.trim().toLowerCase() === "admin@shopeasy.com" &&
        form.password === "Admin@123";

      if (!isValidAdmin) {
        setErrors({
          username: "Invalid administrator email or password.",
        });
        toast.error("Invalid credentials");
        return;
      }

      setAuthUser({
        role: "admin",
        email: form.username,
        name: "ShopEasy Administrator",
        avatar: "A",
      });

      toast.success("Welcome back, Administrator!");
      router.push("/admin/dashboard");
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
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-base font-black">ShopEasy</p>
                  <p className="text-xs text-slate-400">Administration Portal</p>
                </div>
              </div>

              {/* Main content */}
              <div className="mt-16">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-bold text-indigo-300">
                  <ShieldCheck size={14} />
                  ADMINISTRATIVE ACCESS
                </div>

                <h1 className="text-3xl font-black leading-tight sm:text-4xl">
                  Enterprise Store
                  <br />
                  Management.
                </h1>

                <p className="mt-4 max-w-sm text-xs leading-6 text-slate-400">
                  Live order tracking, stock replenishment, and customer relationship control from one unified console.
                </p>
              </div>
            </div>

            {/* Bottom info */}
            <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs font-bold text-slate-200">Catalog</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Real-time CRUD</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs font-bold text-slate-200">Orders</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Live Tracking</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs font-bold text-slate-200">Customers</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Directory</p>
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
                  <ShieldCheck size={14} />
                  Admin Authentication
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Admin Login
                </h2>

                <p className="mt-1.5 text-xs text-slate-500">
                  Sign in to manage products, customer orders, and store operations.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <InputField
                  id="admin-username"
                  label="Admin Email / Username"
                  type="text"
                  value={form.username}
                  onChange={(e) => {
                    setForm({ ...form, username: e.target.value });
                    setErrors({ ...errors, username: "" });
                  }}
                  placeholder="admin@shopeasy.com"
                  error={errors.username}
                  variant="light"
                  icon={UserRound}
                />

                <PasswordInput
                  id="admin-password"
                  label="Password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  placeholder="Enter administrator password (e.g. Admin@123)"
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
                  {loading ? "Authenticating..." : "Login as Administrator"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}