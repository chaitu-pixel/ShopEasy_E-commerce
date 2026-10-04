"use client";

import { useState } from "react";

export default function ProductCard({ product }) {
  const [imageError, setImageError] =
    useState(false);

  // DummyJSON gives thumbnail
  // Our Products page converts it to image
  const imageUrl =
    product.image || product.thumbnail;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60">

      {/* ================================= */}
      {/* PRODUCT IMAGE */}
      {/* ================================= */}

      <div className="relative overflow-hidden bg-slate-100">

        <div className="flex h-64 items-center justify-center p-5">

          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={product.title}
              loading="lazy"
              onError={() =>
                setImageError(true)
              }
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-6xl">
              🛍️
            </div>
          )}

        </div>


        {/* DISCOUNT */}

        {product.discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-black text-white shadow-lg">
            -{product.discount}%
          </span>
        )}


        {/* STOCK */}

        {product.stock !== undefined &&
          product.stock <= 5 && (
            <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
              Only {product.stock} left
            </span>
          )}

      </div>


      {/* ================================= */}
      {/* PRODUCT CONTENT */}
      {/* ================================= */}

      <div className="p-5">

        {/* CATEGORY + RATING */}

        <div className="flex items-center justify-between gap-3">

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold capitalize text-slate-600">
            {product.category
              ?.replaceAll("-", " ")}
          </span>

          <span className="text-xs font-bold text-amber-500">
            ★{" "}
            {product.rating?.toFixed?.(1) ||
              product.rating ||
              "—"}
          </span>

        </div>


        {/* TITLE */}

        <h3 className="mt-4 line-clamp-2 min-h-12 text-base font-black leading-6 text-slate-900 transition group-hover:text-blue-600">
          {product.title}
        </h3>


        {/* DESCRIPTION */}

        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
          {product.description}
        </p>


        {/* PRICE */}

        <div className="mt-5 flex items-end justify-between gap-3">

          <div>

            <p className="text-xl font-black text-slate-950">
              ₹
              {Number(
                product.price
              ).toLocaleString("en-IN")}
            </p>

            {product.oldPrice && (
              <p className="text-xs font-medium text-slate-400 line-through">
                ₹
                {Number(
                  product.oldPrice
                ).toLocaleString("en-IN")}
              </p>
            )}

          </div>


          {/* BUTTON */}

          <button
            type="button"
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600"
          >
            View Product
          </button>

        </div>

      </div>

    </article>
  );
}