"use client";

import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/products" },
  { label: "Deals", href: "/deals" },
  { label: "About Us", href: "/about" },
];

const customerLinks = [
  { label: "Help & Support", href: "/contact" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Return Policy", href: "/returns" },
  { label: "Track Order", href: "/orders" },
  { label: "Contact Us", href: "/contact" },
];

const accountLinks = [
  { label: "My Account", href: "/profile" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "Order History", href: "/orders" },
  { label: "Login", href: "/login" },
];

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white sm:text-base">
        {title}
      </h3>

      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-xs text-blue-100 transition-colors hover:text-white hover:underline sm:text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#061e43] text-white">
  <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-7 px-4 py-7 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8 lg:px-8">
        {/* Brand */}
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xl font-extrabold tracking-tight text-white sm:text-2xl"
          >
            <span aria-hidden="true">♧</span>
            <span>ShopEasy</span>
          </Link>

          <p className="mt-3 text-xs leading-5 text-blue-200 sm:text-sm">
            Better Products. A Brighter You.
          </p>

          <div className="mt-5 flex items-center gap-4 text-sm text-white">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition hover:text-blue-300"
            >
              f
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition hover:text-blue-300"
            >
              ◎
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition hover:text-blue-300"
            >
              𝕏
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="transition hover:text-blue-300"
            >
              ▶
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <FooterLinks title="Quick Links" links={quickLinks} />

        {/* Customer Service */}
        <FooterLinks
          title="Customer Service"
          links={customerLinks}
        />

        {/* Account */}
        <FooterLinks title="Account" links={accountLinks} />

        {/* Payment methods */}
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-white sm:text-base">
            We Accept
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-white px-2.5 py-1.5 text-[10px] font-black italic text-blue-800 sm:text-xs">
              VISA
            </span>

            <span
              aria-label="Mastercard"
              className="flex h-[26px] items-center justify-center rounded bg-white px-2"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
              <span className="-ml-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
            </span>

            <span className="rounded bg-white px-2.5 py-1.5 text-[10px] font-bold text-blue-800 sm:text-xs">
              PayPal
            </span>

            <span className="rounded bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-900 sm:text-xs">
              UPI
            </span>
          </div>

          <p className="mt-4 text-[10px] leading-4 text-blue-200 sm:text-xs">
            © {new Date().getFullYear()} ShopEasy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}