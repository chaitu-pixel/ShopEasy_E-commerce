"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputField from "@/components/forms/InputField";
import PasswordInput from "@/components/forms/PasswordInput";
import { addStoredCustomer, setAuthUser, registerCustomerAccount } from "@/utils/storeData";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      newErrors.password = "Use at least 8 characters with an uppercase letter, a number and a special character";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      // Create a local demo account and customer directory entry.
      registerCustomerAccount({
        name: fullName,
        email: email.trim(),
        password,
        phone,
      });
      addStoredCustomer({
        name: fullName,
        email: email.trim(),
        phone,
        status: "Active",
        type: "Regular",
      });

      // Log in the user
      setAuthUser({
        role: "user",
        name: fullName,
        email: email.trim(),
        phone,
        avatar: firstName[0].toUpperCase(),
      });

      toast.success(`Account created successfully! Welcome, ${firstName}!`);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
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
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
                JOIN SHOPEASY TODAY
              </span>

              <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl xl:text-5xl">
                Start your premium shopping journey.
              </h1>

              <p className="mt-4 text-sm leading-7 text-indigo-100">
                Unlock member discounts, lightning fast order tracking, personalized wishlists, and express dispatch.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-2xl font-black">10K+</p>
              <p className="text-xs text-indigo-200">Curated Items</p>
            </div>
            <div>
              <p className="text-2xl font-black">50K+</p>
              <p className="text-xs text-indigo-200">Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl font-black">4.9/5</p>
              <p className="text-xs text-indigo-200">Satisfaction</p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center bg-white px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Create Free Account
              </p>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Welcome to ShopEasy
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Fill in your details below to register your customer profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Rahul"
                  error={errors.firstName}
                />
                <InputField
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sharma"
                  error={errors.lastName}
                />
              </div>

              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                error={errors.email}
              />

              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                variant="light"
              />

              <PasswordInput
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters, uppercase, number & symbol"
                error={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                error={errors.confirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />

              <div>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600"
                  />
                  <span className="text-xs text-slate-600">
                    I agree to the Terms & Conditions and Privacy Policy
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs font-semibold text-rose-500">
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-indigo-600 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account & Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login/customer"
                className="font-bold text-indigo-600 hover:text-indigo-700"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
