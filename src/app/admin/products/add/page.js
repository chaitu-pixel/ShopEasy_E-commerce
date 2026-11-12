"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Save,
  Image as ImageIcon,
  IndianRupee,
  Boxes,
  Star,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { addStoredProduct } from "@/utils/storeData";

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "Electronics",
    price: "",
    oldPrice: "",
    stock: "25",
    rating: "4.8",
    description: "",
    image: "",
    sku: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Home",
    "Sports",
    "Groceries",
  ];

  const imagePresets = [
    {
      label: "Headphones",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    },
    {
      label: "Smartwatch",
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    },
    {
      label: "Sneakers",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    },
    {
      label: "Camera",
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
    },
    {
      label: "Skincare",
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    },
    {
      label: "Backpack",
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Product title is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Valid price in ₹ is required.";
    if (formData.stock === "" || Number(formData.stock) < 0)
      newErrors.stock = "Valid stock is required.";
    if (!formData.description.trim())
      newErrors.description = "Product description is required.";
    if (!formData.image.trim())
      newErrors.image = "Please provide an image URL or choose a preset.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const created = addStoredProduct({
      name: formData.title,
      title: formData.title,
      category: formData.category,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : Number(formData.price) * 1.25,
      stock: Number(formData.stock),
      rating: Number(formData.rating) || 4.5,
      description: formData.description,
      image: formData.image,
      sku: formData.sku || `SKU-${Date.now().toString().slice(-6)}`,
      status: formData.status,
    });

    toast.success(`"${created.name}" created and added to catalog!`);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition mb-2"
          >
            <ArrowLeft size={14} />
            <span>Back to Products</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Add New Product
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
            Publish a new product item into the live ShopEasy customer catalog.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-3">
        {/* Left Column: Core Fields */}
        <div className="space-y-6 xl:col-span-2">
          {/* General Information */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              General Information
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
                placeholder="e.g. Bose QuietComfort Ultra Wireless Headphones"
                className="w-full h-11 rounded-xl border border-slate-200 px-4 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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
                  SKU Identifier (Optional)
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. ELEC-BOSE-009"
                  className="w-full h-11 rounded-xl border border-slate-200 px-4 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Product Description *
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write compelling features, technical specifications, and package contents..."
                className="w-full rounded-xl border border-slate-200 p-4 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              Pricing & Inventory
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Selling Price (₹) *
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
                    placeholder="2499"
                    className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-4 text-xs font-bold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Original Price (₹) (For Discount)
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
                    placeholder="3499"
                    className="w-full h-11 rounded-xl border border-slate-200 pl-9 pr-4 text-xs font-bold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Initial Stock Units *
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
                    placeholder="25"
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

        {/* Right Column: Media, Status, Submit */}
        <div className="space-y-6">
          {/* Product Media & Image */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              Product Image
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Image Web URL *
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs text-slate-900 outline-none focus:border-indigo-500"
              />
              {errors.image && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.image}</p>
              )}
            </div>

            {/* Quick Image Presets */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Or Quick Pick Sample Image:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {imagePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Box */}
            <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt="Preview"
                  width={500}
                  height={500}
                  unoptimized
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="text-center text-slate-400 text-xs">
                  <ImageIcon size={28} className="mx-auto mb-1.5 text-slate-300" />
                  Live Image Preview
                </div>
              )}
            </div>
          </div>

          {/* Publishing Status */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-3">
            <h2 className="text-base font-black text-slate-900">
              Visibility & Publishing
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
                        ? "Visible to customers immediately"
                        : "Draft mode (hidden from customers)"}
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

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-xs font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-indigo-600 transition"
            >
              <Save size={16} />
              <span>Publish Product to Store</span>
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