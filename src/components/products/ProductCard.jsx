"use client";

import { useEffect, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { getAuthUser } from "@/utils/storeData";
import { getWishlistItems, saveWishlistItems } from "@/utils/cartUtils";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const router = useRouter();

  // DummyJSON gives thumbnail
  // Our Products page converts it to image
  const imageUrl = product.image || product.thumbnail;

  // Keep wishlist state in sync with the signed-in customer's saved list.
  useEffect(() => {
    const syncWishlist = () => {
      const wishlist = getWishlistItems();
      setIsWishlisted(wishlist.some((item) => String(item.id) === String(product.id)));
    };
    syncWishlist();
    window.addEventListener("wishlist_changed", syncWishlist);
    window.addEventListener("auth_changed", syncWishlist);
    return () => {
      window.removeEventListener("wishlist_changed", syncWishlist);
      window.removeEventListener("auth_changed", syncWishlist);
    };
  }, [product.id]);

  const handleWishlist = () => {
    const user = getAuthUser();
    if (!user || user.role !== "user") {
      toast.error("Please login as a customer to use your wishlist.");
      router.push(`/login/customer?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const wishlist = getWishlistItems();
    const exists = wishlist.some((item) => String(item.id) === String(product.id));
    const updated = exists
      ? wishlist.filter((item) => String(item.id) !== String(product.id))
      : [...wishlist, {
          ...product,
          name: product.name || product.title,
          image: product.image || product.thumbnail || product.images?.[0] || "",
        }];

    saveWishlistItems(updated);
    setIsWishlisted(!exists);
    toast.success(exists ? "Product removed from wishlist!" : "Product added to wishlist!");
  };

  // View product details
  const handleViewDetails = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/70">

      {/* ================================= */}
      {/* PRODUCT IMAGE */}
      {/* ================================= */}

      <div className="relative w-full min-w-0 max-w-full overflow-hidden bg-slate-50">

        <div className="flex aspect-square items-center justify-center p-5 sm:p-6">

          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={product.title}
              width={600}
              height={600}
              unoptimized
              onError={() => setImageError(true)}
              className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-semibold text-slate-400">
              Image unavailable
            </div>
          )}

        </div>

        {/* ================================= */}
        {/* WISHLIST BUTTON */}
        {/* ================================= */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md border shadow-sm backdrop-blur-md transition-all duration-200 ${
            isWishlisted
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-white/70 bg-white/90 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart
            size={20}
            strokeWidth={2.2}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* ================================= */}
        {/* DISCOUNT */}
        {/* ================================= */}

        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-rose-600 px-2.5 py-1.5 text-[11px] font-extrabold text-white">
            -{product.discount}%
          </span>
        )}

        {/* ================================= */}
        {/* STOCK */}
        {/* ================================= */}

        {product.stock !== undefined &&
          product.stock <= 5 && (
            <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2.5 py-1.5 text-[11px] font-bold text-amber-800 shadow-sm">
              Only {product.stock} left
            </span>
          )}

      </div>

      {/* ================================= */}
      {/* PRODUCT CONTENT */}
      {/* ================================= */}

      <div className="flex flex-1 flex-col p-4">

        {/* CATEGORY + RATING */}

        <div className="flex items-center justify-between gap-3">

          <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">
            {product.category?.replaceAll("-", " ")}
          </span>

          <span className="text-xs font-bold text-amber-500">
            ★{" "}
            {product.rating?.toFixed?.(1) ||
              product.rating ||
              "—"}
          </span>

        </div>

        {/* TITLE */}

        <h3 className="mt-3 line-clamp-2 min-h-12 text-sm font-bold leading-5 text-slate-900 transition group-hover:text-indigo-600">
          {product.title}
        </h3>

        {/* DESCRIPTION */}

        <p className="mt-1.5 line-clamp-2 min-h-9 text-xs leading-[1.15rem] text-slate-500">
          {product.description}
        </p>

        {/* PRICE */}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-3">

          <div>

            <p className="text-lg font-extrabold text-slate-950">
              ₹
              {Number(product.price).toLocaleString("en-IN")}
            </p>

            {product.oldPrice && (
              <p className="text-xs font-medium text-slate-400 line-through">
                ₹
                {Number(product.oldPrice).toLocaleString("en-IN")}
              </p>
            )}

          </div>

          {/* VIEW DETAILS BUTTON */}

          <button
            type="button"
            onClick={handleViewDetails}
            className="group/btn flex min-h-9 items-center gap-1.5 rounded-md bg-slate-950 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-indigo-600"
          >
            View Details

            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            />
          </button>

        </div>

      </div>

    </article>
  );
}