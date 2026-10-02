"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../components/forms/InputField";
import PasswordInput from "../components/forms/PasswordInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
        password,
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one number, and one special character";
    }

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("Login details are valid!");
  };
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative flex min-h-[calc(100vh-120px)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />

        {/* Login Card */}
        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative hidden overflow-hidden bg-slate-950 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-lg shadow-blue-600/30">
                  S
                </div>

                <div>
                  <h2 className="text-xl font-black text-white">
                    Shop<span className="text-blue-400">Easy</span>
                  </h2>

                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                    Shop smarter
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                Welcome Back
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight text-white xl:text-5xl">
                Your favorite products are
                <span className="text-blue-400"> waiting for you.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                Sign in to access your wishlist, manage your orders, and enjoy a
                faster shopping experience.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-black text-white">10K+</p>
                  <p className="mt-1 text-[10px] text-slate-500">Products</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-black text-white">4.8/5</p>
                  <p className="mt-1 text-[10px] text-slate-500">Rating</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-black text-white">24/7</p>
                  <p className="mt-1 text-[10px] text-slate-500">Support</p>
                </div>
              </div>
            </div>

            <p className="relative text-xs text-slate-600">
              Secure shopping experience • ShopEasy
            </p>
          </div>

          {/* Right Side */}
          <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
            <div className="mx-auto max-w-md">
              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white">
                  S
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    Shop<span className="text-blue-600">Easy</span>
                  </h2>

                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                    Shop smarter
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
                  Account Login
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter your details to continue shopping with ShopEasy.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                  <InputField
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    error={errors.email}
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    error={errors.password}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>

                {/* Remember */}
                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded accent-blue-600"
                  />

                  <label htmlFor="remember" className="text-sm text-slate-600">
                    Remember me
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-600/20"
                >
                  Sign In
                </button>
              </form>

              {successMessage && (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  ✓ {successMessage}
                </div>
              )}

              {/* Register */}
              <p className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-bold text-blue-600 transition hover:text-blue-700"
                >
                  Create an account
                </a>
              </p>

              {/* Security */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span>🔒</span>
                Secure & private shopping experience
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
