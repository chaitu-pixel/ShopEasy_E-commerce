"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  Package,
  Layers,
} from "lucide-react";
import { getAuthUser, logoutUser, setAuthUser } from "@/utils/storeData";
import { useShop } from "@/context/ShopContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { cartCount, wishlistCount, user: authUser } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = () => {
    logoutUser();
    setIsUserDropdownOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Deals", href: "/deals", badge: "Hot" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full select-none">
     
     

      {/* Main Navbar */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-xs">
        <div className="mx-auto flex h-16 sm:h-[72px] max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <Image
              src="/images/shopeasy-logo.svg"
              alt="ShopEasy logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                Shop<span className="text-violet-600">Easy</span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-violet-500">
                Better. Faster. Yours.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-bold"
                      : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-white leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden flex-1 max-w-md lg:block"
          >
            <div className="group relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="h-10.5 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-slate-900 px-2 py-1 text-[11px] font-bold text-white transition hover:bg-indigo-600"
              >
                Go
              </button>
            </div>
          </form>

          {/* Actions on Right */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              title="My Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              title="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-black text-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Auth Dropdown */}
            <div className="relative">
              {authUser ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-2 pr-3 text-left transition hover:border-indigo-200 hover:bg-white"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black text-white shadow-xs ${
                        authUser.role === "admin"
                          ? "bg-slate-900 ring-2 ring-indigo-500"
                          : "bg-indigo-600"
                      }`}
                    >
                      {authUser.avatar || authUser.name?.[0] || "U"}
                    </div>
                    <div className="hidden md:block">
                      <p className="max-w-[100px] truncate text-xs font-bold text-slate-900">
                        {authUser.name || "My Account"}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase">
                        {authUser.role === "admin" ? "Admin" : "Customer"}
                      </p>
                    </div>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setIsUserDropdownOpen(false)}
                      />
                      <div
                        className="absolute right-0 top-12 z-50 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                      <div className="border-b border-slate-100 p-3">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {authUser.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {authUser.email}
                        </p>
                        <span
                          className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                            authUser.role === "admin"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {authUser.role === "admin"
                            ? "Administrator"
                            : "Verified Customer"}
                        </span>
                      </div>

                      <div className="py-1">
                        {authUser.role === "admin" ? (
                          <>
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50"
                            >
                              <LayoutDashboard size={15} />
                              <span>Admin Dashboard</span>
                            </Link>
                            <Link
                              href="/admin/products"
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Package size={15} />
                              <span>Manage Products</span>
                            </Link>
                            <Link
                              href="/admin/orders"
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Layers size={15} />
                              <span>Manage Orders</span>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/profile"
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <User size={15} />
                              <span>My Profile & Orders</span>
                            </Link>
                            <Link
                              href="/wishlist"
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Heart size={15} />
                              <span>Saved Items</span>
                            </Link>
                          </>
                        )}

                        <div className="my-1 border-t border-slate-100" />

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                          <LogOut size={15} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-slate-950 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-600"
                  >
                    <User size={14} />
                    <span>Sign In</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-5 md:hidden animate-in slide-in-from-top duration-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </form>

            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <span>Home</span>
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <span>All Products</span>
              </Link>
              <Link
                href="/deals"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <span>Deals & Offers</span>
                <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  HOT
                </span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <span>My Profile & Orders</span>
              </Link>
              <div className="my-2 border-t border-slate-100" />
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
              >
                <ShieldCheck size={17} className="text-indigo-400" />
                <span>Admin Management Portal</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}