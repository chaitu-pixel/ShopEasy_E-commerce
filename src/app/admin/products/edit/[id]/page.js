"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Save,
  Image as ImageIcon,
  IndianRupee,
  Boxes,
  Star,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { getStoredProducts, updateStoredProduct } from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const products = useStoreSnapshot(getStoredProducts, null, []);
  const product = products?.find((item) => item.id === productId) || null;
  const loading = products === null;
  const [editedFormData, setEditedFormData] = useState(null);
  const initialFormData = product
    ? {
        title: product.name || product.title || "",
        category: product.category || "Electronics",
        price: product.price || "",
        oldPrice: product.oldPrice || "",
        stock: product.stock !== undefined ? String(product.stock) : "0",
        rating: product.rating !== undefined ? String(product.rating) : "4.5",
        description: product.description || "",
        image: product.image || "",
        sku: product.sku || `SKU-${product.id}`,
        status: product.status || "Active",
      }
    : {
        title: "",
        category: "",
        price: "",
        oldPrice: "",
        stock: "",
        rating: "",
        description: "",
        image: "",
        sku: "",
        status: "Active",
      };
  const formData =
    editedFormData?.productId === productId
      ? editedFormData.values
      : initialFormData;
  const [errors, setErrors] = useState({});

  const setFormData = (update) => {
    setEditedFormData((previous) => {
      const current =
        previous?.productId === productId
          ? previous.values
          : initialFormData;

      return {
        productId,
        values: typeof update === "function" ? update(current) : update,
      };
    });
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Home",
    "Sports",
    "Groceries",
  ];

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-400">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <Package size={48} className="mx-auto text-slate-300" />
        <h2 className="mt-4 text-xl font-black text-slate-900">Product Not Found</h2>
        <p className="mt-1 text-xs text-slate-400">
          The requested product ID #{productId} could not be found.
        </p>
        <Link
          href="/admin/products"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white"
        >
          Return to Products
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Product title is required.";
    if (!formData.price || Number(formData.price) <= 0)
      errs.price = "Valid price in ₹ is required.";
    if (formData.stock === "" || Number(formData.stock) < 0)
      errs.stock = "Valid stock count is required.";
    if (!formData.description.trim())
      errs.description = "Product description is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the form fields.");
      return;
    }

    const updated = updateStoredProduct(productId, {
      name: formData.title,
      title: formData.title,
      category: formData.category,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      stock: Number(formData.stock),
      rating: Number(formData.rating) || product.rating,
      description: formData.description,
      image: formData.image,
      sku: formData.sku,
      status: formData.status,
    });

    toast.success(`"${updated.name}" updated successfully!`);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition mb-2"
        >
          <ArrowLeft size={14} />
          <span>Back to Products</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Edit Product #{productId}
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
              Update pricing, inventory levels, and product descriptions.
            </p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {formData.category}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-3">
        {/* Core fields */}
        <div className="space-y-6 xl:col-span-2">
          {/* General Information */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              Product Details
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Product Title / Name *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full h-11 rounded-xl border border-slate-200 px-4 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.title}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  SKU Identifier
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-slate-200 px-4 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Description *
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 p-4 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              Pricing & Stock Levels
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Price (₹) *
                </label>
                <div className="relative">
                  <IndianRupee
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-4 text-xs font-bold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Compare-At Price (₹)
                </label>
                <div className="relative">
                  <IndianRupee
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-4 text-xs font-bold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Stock Units Available *
                </label>
                <div className="relative">
                  <Boxes
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-4 text-xs font-bold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>
                {errors.stock && (
                  <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.stock}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              Product Image
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Image Web URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt={formData.title}
                  width={500}
                  height={500}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-center text-slate-400 text-xs">
                  <ImageIcon size={28} className="mx-auto mb-1.5 text-slate-300" />
                  No Image Preview
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-3">
            <h2 className="text-base font-black text-slate-900">
              Product Status
            </h2>

            <div className="space-y-2">
              {["Active", "Inactive"].map((st) => (
                <label
                  key={st}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                    formData.status === st
                      ? "border-indigo-300 bg-indigo-50/50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800">{st}</p>
                    <p className="text-[10px] text-slate-400">
                      {st === "Active"
                        ? "Visible to customers"
                        : "Hidden from customer catalog"}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="status"
                    value={st}
                    checked={formData.status === st}
                    onChange={handleChange}
                    className="h-4 w-4 accent-indigo-600"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-xs font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-indigo-600 transition"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>

            <Link
              href="/admin/products"
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}