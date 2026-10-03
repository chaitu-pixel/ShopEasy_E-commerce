export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">

      {/* Announcement Bar */}
      <div className="bg-gray-950 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        <span className="text-blue-400">✨ New Arrival</span>
        <span className="mx-2 text-gray-500">|</span>
        Free shipping on orders above ₹499
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <a href="/" className="group flex shrink-0 items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:scale-105">

              <span className="relative z-10">S</span>

              <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white/20" />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tight text-gray-950">
                Shop<span className="text-blue-600">Easy</span>
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                Shop smarter
              </p>
            </div>

          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">

            <a
              href="/"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="/products"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Products
            </a>

            <a
              href="#"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Deals
            </a>

            <a
              href="/profile"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Profile
            </a>

          </nav>

          {/* Search */}
          <div className="hidden min-w-0 flex-1 md:block">

            <div className="group relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-blue-600">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search products..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-medium text-gray-400 xl:block">
                Ctrl K
              </span>

            </div>

          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2">

            {/* Search Mobile */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 md:hidden"
              aria-label="Search"
            >
              🔍
            </button>

            {/* Wishlist */}
            <a
              href="/wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-lg text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex"
              aria-label="Wishlist"
            >
              ♡
            </a>

            {/* Cart */}
            <a
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-lg text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Shopping cart"
            >
              🛒

              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-md shadow-blue-600/30">
                0
              </span>
            </a>

            {/* Account */}
            <a
              href="/login"
              className="hidden items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 sm:flex"
            >
              <span>♙</span>
              Account
            </a>

            {/* Mobile Menu */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-lg text-gray-700 transition hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}