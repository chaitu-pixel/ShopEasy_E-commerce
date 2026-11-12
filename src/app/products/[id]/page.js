"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
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
import { getProductById } from "@/services/productService";
import { getAuthUser } from "@/utils/storeData";
import { getCartItems, saveCartItems, getWishlistItems, saveWishlistItems } from "@/utils/cartUtils";
import { useRouter } from "next/navigation";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product
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

  // Sync the signed-in customer's wishlist state.
  useEffect(() => {
    if (!product) return;
    const syncWishlist = () => {
      setIsWishlisted(getWishlistItems().some((item) => String(item.id) === String(product.id)));
    };
    syncWishlist();
    window.addEventListener("wishlist_changed", syncWishlist);
    window.addEventListener("auth_changed", syncWishlist);
    return () => {
      window.removeEventListener("wishlist_changed", syncWishlist);
      window.removeEventListener("auth_changed", syncWishlist);
    };
  }, [product]);

  const increaseQuantity = () => {
    if (quantity < (product?.stock || 1)) {
      setQuantity((previous) => previous + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((previous) => previous - 1);
    }
  };

  const requireCustomerLogin = () => {
    const user = getAuthUser();
    if (user?.role === "user") return true;
    toast.error("Please login as a customer first.");
    router.push(`/login/customer?next=${encodeURIComponent(window.location.pathname)}`);
    return false;
  };

  // Add / Remove Wishlist
  const handleWishlist = () => {
    if (!product || !requireCustomerLogin()) return;
    const wishlist = getWishlistItems();
    const exists = wishlist.some((item) => String(item.id) === String(product.id));
    if (exists) {
      saveWishlistItems(wishlist.filter((item) => String(item.id) !== String(product.id)));
      setIsWishlisted(false);
      toast.success("Product removed from wishlist!");
      return;
    }
    saveWishlistItems([...wishlist, {
      ...product,
      name: product.title,
      image: product.thumbnail || product.images?.[0] || "",
      reviews: Array.isArray(product.reviews) ? product.reviews.length : product.reviews || 0,
    }]);
    setIsWishlisted(true);
    toast.success("Product added to wishlist!");
  };

  // Add product to the signed-in customer's cart.
  const handleAddToCart = () => {
    if (!product || !requireCustomerLogin()) return;
    const cartItems = getCartItems();
    const existing = cartItems.find((item) => String(item.id) === String(product.id));
    const image = product.thumbnail || product.images?.[0] || "";
    const updated = existing
      ? cartItems.map((item) => String(item.id) === String(product.id)
          ? { ...item, quantity: Number(item.quantity || 1) + quantity, image: item.image || image }
          : item)
      : [...cartItems, {
          id: product.id,
          name: product.title,
          category: product.category,
          price: product.price,
          oldPrice: product.price,
          quantity,
          image,
        }];
    saveCartItems(updated);
    toast.success("Product added to cart!");
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

  const discount = Math.round(
    product.discountPercentage || 0
  );

  const finalPrice = product.price * quantity;

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
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              {discount > 0 && (
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-10 rounded-full bg-red-500 px-3 py-1.5 text-xs sm:text-sm font-bold text-white shadow-lg">
                  -{discount}% OFF
                </div>
              )}

              {/* Wishlist Heart */}
              <button
                type="button"
                onClick={handleWishlist}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-slate-600"
                  }
                />
              </button>

              <div className="flex h-64 sm:h-80 lg:h-96 items-center justify-center rounded-2xl bg-slate-50 p-4 sm:p-8">
                <Image
                  src={
                    product.image ||
                    product.thumbnail ||
                    product.images?.[0] ||
                    ""
                  }
                  alt={product.title}
                  width={600}
                  height={600}
                  unoptimized
                  className="h-full w-full object-contain transition duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Benefits */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <Truck
                  className="mx-auto mb-2 text-slate-800"
                  size={21}
                />

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
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-600">
              {product.category}
            </p>

            <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-2">
                <Star
                  size={17}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="font-bold text-slate-900">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-slate-500">
                {Array.isArray(product.reviews)
                  ? product.reviews.length
                  : 0}{" "}
                customer reviews
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
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>

              {discount > 0 && (
                <span className="pb-1 text-lg text-slate-400 line-through">
                  ₹
                  {Math.round(
                    product.price /
                    (1 - discount / 100)
                  ).toLocaleString("en-IN")}
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
                    ₹{Math.round(finalPrice).toLocaleString("en-IN")}
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
                onClick={handleWishlist}
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