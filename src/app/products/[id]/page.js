"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";
import Link from "next/link";
import { getProductById } from "../../services/productService";
import { getCartItems, saveCartItems } from "../../utils/cartUtils";

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(params.id);

        setProduct(data);
      } catch (error) {
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const increaseQuantity = () => {
    if (quantity < (product?.stock || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-8 h-5 w-32 rounded bg-slate-200" />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-[500px] rounded-3xl bg-slate-200" />

            <div className="space-y-6">
              <div className="h-8 w-3/4 rounded bg-slate-200" />
              <div className="h-5 w-1/3 rounded bg-slate-200" />
              <div className="h-10 w-1/2 rounded bg-slate-200" />
              <div className="h-24 rounded bg-slate-200" />
              <div className="h-14 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-3 text-slate-500">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Product not found
          </h2>

          <Link
            href="/products"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const discount = Math.round(product.discountPercentage || 0);

  const finalPrice =
    product.price * quantity;

  const handleAddToCart = () => {
  const cartItems = getCartItems();

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      id: product.id,
      name: product.title,
      category: product.category,
      price: product.price,
      oldPrice: product.price,
      quantity: quantity,
      image: product.thumbnail,
    });
  }

  saveCartItems(cartItems);

  toast.success("Product added to cart!");
};

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Products
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Image */}
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              {discount > 0 && (
                <div className="absolute left-6 top-6 z-10 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  -{discount}% OFF
                </div>
              )}

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
              >
                <Heart
                  size={21}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-slate-600"
                  }
                />
              </button>

              <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-slate-50 p-8">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-h-[400px] w-full object-contain transition duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Benefits */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <Truck className="mx-auto mb-2 text-slate-800" size={21} />
                <p className="text-xs font-semibold text-slate-700">
                  Fast Delivery
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <ShieldCheck
                  className="mx-auto mb-2 text-slate-800"
                  size={21}
                />
                <p className="text-xs font-semibold text-slate-700">
                  Secure Payment
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <RotateCcw
                  className="mx-auto mb-2 text-slate-800"
                  size={21}
                />
                <p className="text-xs font-semibold text-slate-700">
                  Easy Returns
                </p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-2">
                <Star size={17} className="fill-amber-400 text-amber-400" />

                <span className="font-bold text-slate-900">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-slate-500">
                {product.reviews?.length || 0} customer reviews
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span
                className={
                  product.stock > 0
                    ? "text-sm font-semibold text-emerald-600"
                    : "text-sm font-semibold text-red-500"
                }
              >
                {product.stock > 0
                  ? `${product.stock} items in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex items-end gap-4">
              <span className="text-4xl font-black text-slate-900">
                ${product.price}
              </span>

              {discount > 0 && (
                <span className="pb-1 text-lg text-slate-400 line-through">
                  ${(product.price / (1 - discount / 100)).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-7 text-base leading-8 text-slate-600">
              {product.description}
            </p>

            <div className="my-8 h-px bg-slate-200" />

            {/* Quantity */}
            <div>
              <p className="mb-3 text-sm font-bold text-slate-900">
                Quantity
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-slate-300 bg-white">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-12 w-12 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="flex h-12 w-12 items-center justify-center border-x border-slate-200 font-bold text-slate-900">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="flex h-12 w-12 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <span className="text-sm text-slate-500">
                  Total:{" "}
                  <span className="font-bold text-slate-900">
                    ${finalPrice.toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-800 transition hover:border-slate-900 hover:bg-slate-50"
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />

                {isWishlisted
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <Check size={18} className="text-emerald-500" />
                <span className="text-sm text-slate-600">
                  Authentic product guarantee
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Check size={18} className="text-emerald-500" />
                <span className="text-sm text-slate-600">
                  Secure checkout and payment
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Check size={18} className="text-emerald-500" />
                <span className="text-sm text-slate-600">
                  Easy returns available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}