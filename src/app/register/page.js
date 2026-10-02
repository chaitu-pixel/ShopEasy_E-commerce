"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../components/forms/InputField";
import PasswordInput from "../components/forms/PasswordInput";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
        password,
      )
    ) {
      newErrors.password =
        "Password must contain uppercase, number, special character and 6+ characters";
    }

    // Confirm Password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms
    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Conditions";
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
    setSuccessMessage("Account created successfully!");

    console.log({
      firstName,
      lastName,
      email,
      password,
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-indigo-700 shadow-lg">
                S
              </div>

              <span className="text-2xl font-black tracking-tight">
                Shop<span className="text-indigo-200">Easy</span>
              </span>
            </Link>

            <div className="mt-20 max-w-lg">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                JOIN THE COMMUNITY
              </span>

              <h1 className="mt-7 text-4xl font-black leading-tight xl:text-5xl">
                Start your shopping journey with ShopEasy.
              </h1>

              <p className="mt-6 text-lg leading-8 text-indigo-100">
                Create your account and discover thousands of products,
                exclusive offers, and a seamless shopping experience.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-black">10K+</p>
              <p className="mt-1 text-sm text-indigo-200">Products</p>
            </div>

            <div>
              <p className="text-2xl font-black">50K+</p>
              <p className="mt-1 text-sm text-indigo-200">Customers</p>
            </div>

            <div>
              <p className="text-2xl font-black">4.8/5</p>
              <p className="mt-1 text-sm text-indigo-200">Rating</p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center bg-white px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-xl">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-black text-white">
                S
              </div>

              <span className="text-xl font-black text-slate-900">
                Shop<span className="text-indigo-600">Easy</span>
              </span>
            </div>

            {/* Heading */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                Create Account
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Welcome to ShopEasy
              </h2>

              <p className="mt-3 text-slate-500">
                Create your account and start shopping today.
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {successMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* First + Last Name */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <InputField
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    error={errors.firstName}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <InputField
                    id="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    error={errors.lastName}
                  />
                </div>
              </div>

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
                <PasswordInput
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  error={errors.password}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <PasswordInput
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />
              </div>

              {/* Terms */}
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span className="text-sm leading-6 text-slate-600">
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {errors.agreeTerms && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                Sign in
              </Link>
            </p>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>🔒</span>
              <span>Your information is securely protected</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
