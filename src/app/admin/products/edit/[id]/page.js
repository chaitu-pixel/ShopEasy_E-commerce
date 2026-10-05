"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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

import { adminProducts } from "../../../../utils/adminProductData";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const productId = Number(params.id);

  const product = adminProducts.find(
    (item) => item.id === productId
  );

  const [formData, setFormData] = useState(() => {
    if (!product) {
      return {
        name: "",
        category: "",
        price: "",
        stock: "",
        rating: "",
        description: "",
        image: "",
        status: "Active",
      };
    }

    return {
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
      description: product.description,
      image: product.image,
      status: product.status,
    };
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

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <Package
            size={48}
            className="mx-auto text-slate-300"
          />

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Product Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The product you are trying to edit does not exist.
          </p>

          <button
            onClick={() => router.push("/admin/products")}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

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

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
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
      newErrors.image = "Product image is required";
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

    console.log("Updated Product:", {
      id: productId,
      ...formData,
    });

    toast.success("Product updated successfully!");

    setTimeout(() => {
      router.push("/admin/products");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/admin/products")}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600"
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <Package size={23} />
          </div>

          <div>
            <p className="text-sm font-semibold text-violet-600">
              Product #{productId}
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Update product information, pricing and inventory.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Main */}
          <div className="space-y-6 xl:col-span-2">
            {/* Product Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Product Information
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Update the basic product information.
                </p>
              </div>

              <div className="space-y-5">
                <FormField
                  label="Product Name"
                  required
                  error={errors.name}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass(errors.name)}
                  />
                </FormField>

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
                    className={`${inputClass(
                      errors.description
                    )} h-auto resize-none py-3`}
                  />
                </FormField>
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Pricing & Inventory
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Update pricing and available stock.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
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
                      min="0"
                      className={`${inputClass(
                        errors.price
                      )} pl-10`}
                    />
                  </div>
                </FormField>

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
                      min="0"
                      className={`${inputClass(
                        errors.stock
                      )} pl-10`}
                    />
                  </div>
                </FormField>

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

          {/* Right */}
          <div className="space-y-6">
            {/* Image */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Product Image
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Update the product image.
              </p>

              <div className="mt-5">
                <FormField
                  label="Image URL / Emoji"
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
                      rows={3}
                      className={`${inputClass(
                        errors.image
                      )} h-auto resize-none pl-10 py-3`}
                    />
                  </div>
                </FormField>
              </div>

              <div className="mt-5 flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                {formData.image.startsWith("http") ? (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="h-full w-full object-contain p-5"
                  />
                ) : (
                  <span className="text-6xl">
                    {formData.image || "📦"}
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Product Status
              </h2>

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
                          ? "Visible to customers"
                          : "Hidden from customers"}
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
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() =>
                  router.push("/admin/products")
                }
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
              >
                <Save size={18} />
                Save Changes
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