"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Save,
  Image as ImageIcon,
  IndianRupee,
  Boxes,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    description: "",
    image: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.stock === "") {
      newErrors.stock = "Stock quantity is required";
    } else if (Number(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!formData.rating) {
      newErrors.rating = "Rating is required";
    } else if (
      Number(formData.rating) < 1 ||
      Number(formData.rating) > 5
    ) {
      newErrors.rating = "Rating must be between 1 and 5";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Product image URL is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    console.log("New Product:", formData);

    toast.success("Product added successfully!");

    setTimeout(() => {
      router.push("/admin/products");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => router.push("/admin/products")}
            className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600"
          >
            <ArrowLeft size={16} />
            Back to Products
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Package size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Add New Product
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a new product for your ShopEasy store.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Main Information */}
          <div className="space-y-6 xl:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Product Information
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Enter the basic information about your product.
                </p>
              </div>

              <div className="space-y-5">
                {/* Product Name */}
                <FormField
                  label="Product Name"
                  required
                  error={errors.title}
                >
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Premium Wireless Headphones"
                    className={inputClass(errors.title)}
                  />
                </FormField>

                {/* Category */}
                <FormField
                  label="Category"
                  required
                  error={errors.category}
                >
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass(errors.category)}
                  >
                    <option value="">
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* Description */}
                <FormField
                  label="Description"
                  required
                  error={errors.description}
                >
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the product..."
                    className={`${inputClass(
                      errors.description
                    )} resize-none`}
                  />
                </FormField>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Pricing & Inventory
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Set the product price and available stock.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {/* Price */}
                <FormField
                  label="Price"
                  required
                  error={errors.price}
                >
                  <div className="relative">
                    <IndianRupee
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="2499"
                      min="0"
                      className={`${inputClass(
                        errors.price
                      )} pl-10`}
                    />
                  </div>
                </FormField>

                {/* Stock */}
                <FormField
                  label="Stock"
                  required
                  error={errors.stock}
                >
                  <div className="relative">
                    <Boxes
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="50"
                      min="0"
                      className={`${inputClass(
                        errors.stock
                      )} pl-10`}
                    />
                  </div>
                </FormField>

                {/* Rating */}
                <FormField
                  label="Rating"
                  required
                  error={errors.rating}
                >
                  <div className="relative">
                    <Star
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
                    />

                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="4.8"
                      min="1"
                      max="5"
                      step="0.1"
                      className={`${inputClass(
                        errors.rating
                      )} pl-10`}
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Product Image
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Add the image URL for your product.
                </p>
              </div>

              <FormField
                label="Image URL"
                required
                error={errors.image}
              >
                <div className="relative">
                  <ImageIcon
                    size={17}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <textarea
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    rows={4}
                    placeholder="https://example.com/product.jpg"
                    className={`${inputClass(
                      errors.image
                    )} resize-none pl-10`}
                  />
                </div>
              </FormField>

              {/* Image Preview */}
              <div className="mt-5 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="h-full w-full object-contain p-5"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon
                      size={34}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Image preview
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Product Status
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Control product visibility.
              </p>

              <div className="mt-5 space-y-3">
                {["Active", "Inactive"].map((status) => (
                  <label
                    key={status}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                      formData.status === status
                        ? "border-violet-300 bg-violet-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {status}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {status === "Active"
                          ? "Product is visible to customers"
                          : "Product is hidden from customers"}
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={handleChange}
                      className="h-4 w-4 accent-violet-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <button
                type="button"
                onClick={() => router.push("/admin/products")}
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
              >
                <Save size={18} />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  required,
  error,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error) {
  return `h-11 w-full rounded-xl border ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-violet-400 focus:ring-violet-100"
  } bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:bg-white focus:ring-4`;
}