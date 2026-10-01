export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 text-gray-300">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Newsletter Section */}
        <div className="border-b border-white/10 py-12">

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-2xl shadow-blue-950/20 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-xl">

                <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100">
                  Stay in the loop
                </span>

                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Get the latest deals & updates
                </h2>

                <p className="mt-2 text-sm leading-6 text-blue-100 sm:text-base">
                  Subscribe to our newsletter and be the first to know about
                  new products, exclusive offers and special discounts.
                </p>

              </div>

              {/* Newsletter Form */}
              <div className="w-full max-w-md">

                <div className="flex rounded-2xl bg-white p-1.5 shadow-xl">

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  />

                  <button
                    className="rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                  >
                    Subscribe
                  </button>

                </div>

                <p className="mt-2 px-2 text-xs text-blue-100/80">
                  No spam. Unsubscribe anytime.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">

          {/* Brand */}
          <div className="lg:col-span-2">

            <a href="/" className="inline-flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white">
                S
              </div>

              <span className="text-2xl font-black text-white">
                Shop<span className="text-blue-500">Easy</span>
              </span>

            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Your trusted destination for quality products, great prices and
              a seamless online shopping experience.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-300 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-300 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                ◎
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-300 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-gray-300 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                𝕏
              </a>

            </div>

          </div>

          {/* Shop */}
          <div>

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Shop
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a href="/products" className="transition hover:text-blue-400">
                  All Products
                </a>
              </li>

              <li>
                <a href="/wishlist" className="transition hover:text-blue-400">
                  Wishlist
                </a>
              </li>

              <li>
                <a href="/cart" className="transition hover:text-blue-400">
                  Cart
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  New Arrivals
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Special Offers
                </a>
              </li>

            </ul>

          </div>

          {/* Company */}
          <div>

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Our Story
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Contact Us
                </a>
              </li>

            </ul>

          </div>

          {/* Support */}
          <div>

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Shipping Info
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Returns
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Track Order
                </a>
              </li>

            </ul>

          </div>

        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 border-y border-white/10 py-8 sm:grid-cols-3">

          <div className="flex items-center gap-4 py-3 sm:py-0 sm:border-r sm:border-white/10 sm:pr-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
              🚚
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">
                Free Shipping
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                On orders above ₹499
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 sm:px-6 sm:py-0 sm:border-r sm:border-white/10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
              🔒
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">
                Secure Payment
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                100% secure checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 sm:pl-6 sm:py-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
              ↩
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">
                Easy Returns
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Simple return process
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p className="text-xs text-gray-500">
            © 2026 ShopEasy. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-xs text-gray-500 sm:justify-end">

            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-white">
              Terms & Conditions
            </a>

            <a href="#" className="transition hover:text-white">
              Cookie Policy
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}