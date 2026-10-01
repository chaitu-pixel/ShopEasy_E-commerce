export default function ProductCard({ product }) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-900/10">

      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">

        {/* Badge */}
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            {product.badge}
          </span>
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg text-slate-600 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-red-500"
        >
          ♡
        </button>

        {/* Product Image */}
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8">
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white text-7xl shadow-xl shadow-slate-900/10 transition duration-500 group-hover:scale-110">
            {product.image}
          </div>
        </div>

        {/* Quick View */}
        <div className="absolute inset-x-4 bottom-4 translate-y-16 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-blue-600"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5">

        {/* Category */}
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="mt-2 line-clamp-1 text-base font-black text-slate-900">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
            <span className="text-sm text-amber-500">★</span>
            <span className="text-xs font-bold text-amber-700">
              {product.rating}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-xl font-black text-slate-950">
              ₹{product.price}
            </span>

            <span className="ml-2 text-xs font-medium text-slate-400 line-through">
              ₹{product.oldPrice}
            </span>
          </div>

          <span className="rounded-lg bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600">
            {product.discount}% OFF
          </span>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30"
        >
          <span>🛒</span>
          Add to Cart
        </button>
      </div>
    </article>
  );
}