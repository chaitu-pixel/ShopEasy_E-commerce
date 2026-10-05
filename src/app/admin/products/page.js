"use client";

import { useState } from "react";
import { adminProducts } from "@/app/utils/adminProductData";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit3,
  Trash2,
  Package,
  Star,
  SlidersHorizontal,
  ChevronDown,
  X,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const [products, setProducts] = useState(adminProducts);

  const [deleteProduct, setDeleteProduct] = useState(null);
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Beauty",
    "Home",
    "Sports",
    "Groceries",
  ];

  const filteredProducts = adminProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = () => {
    if (!deleteProduct) return;

    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== deleteProduct.id),
    );

    setDeleteProduct(null);
    setOpenMenu(null);

    toast.success(`${deleteProduct.name} deleted successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <span>/</span>
            <span className="font-medium text-slate-700">Products</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Product Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage products, inventory, pricing and availability.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/admin/products/add")}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Products"
          value="156"
          icon={Package}
          iconStyle="bg-violet-100 text-violet-600"
        />

        <StatCard
          title="Active Products"
          value="142"
          icon={Package}
          iconStyle="bg-emerald-100 text-emerald-600"
        />

        <StatCard
          title="Low Stock"
          value="8"
          icon={SlidersHorizontal}
          iconStyle="bg-amber-100 text-amber-600"
        />

        <StatCard
          title="Out of Stock"
          value="6"
          icon={Package}
          iconStyle="bg-red-100 text-red-600"
        />
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 sm:w-48"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                <SlidersHorizontal size={17} />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4 font-semibold">Product</th>

                <th className="px-5 py-4 font-semibold">Category</th>

                <th className="px-5 py-4 font-semibold">Price</th>

                <th className="px-5 py-4 font-semibold">Stock</th>

                <th className="px-5 py-4 font-semibold">Rating</th>

                <th className="px-5 py-4 font-semibold">Status</th>

                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="transition hover:bg-slate-50">
                  {/* Product */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                        {product.image}
                      </div>

                      <div>
                        <p className="max-w-[240px] truncate text-sm font-semibold text-slate-800">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          ID: #{product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 text-sm font-bold text-slate-800">
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        product.stock === 0
                          ? "text-red-500"
                          : product.stock <= 10
                            ? "text-amber-500"
                            : "text-slate-700"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Star
                        size={15}
                        className="fill-amber-400 text-amber-400"
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {product.rating}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={product.status} />
                  </td>

                  {/* Actions */}
                  <td className="relative px-5 py-4 text-right">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === product.id ? null : product.id)
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {openMenu === product.id && (
                      <div className="absolute right-5 top-14 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 text-left shadow-xl">
                        <button
                          onClick={() =>
                            (window.location.href = `/admin/products/edit/${product.id}`)
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                          <Edit3 size={15} />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setDeleteProduct(product);
                            setOpenMenu(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Package size={42} className="mx-auto text-slate-300" />

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No products found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Try changing your search or category filter.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {adminProducts.length}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-400">
              Previous
            </button>

            <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
              1
            </button>

            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">
              2
            </button>

            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">
              Next
            </button>
          </div>
        </div>
      </div>
      {deleteProduct && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
    onClick={() => setDeleteProduct(null)}
  >
    <div
      className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-500">
        <AlertTriangle size={24} />
      </div>

      {/* Content */}
      <div className="mt-5">
        <h2 className="text-xl font-bold text-slate-900">
          Delete Product?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-800">
            {deleteProduct.name}
          </span>
          ?
        </p>

        <p className="mt-2 text-xs text-red-500">
          This action cannot be undone.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          onClick={() => setDeleteProduct(null)}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteProduct}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          <Trash2 size={17} />
          Delete Product
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, iconStyle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <Icon size={20} />
        </div>
      </div>
      
    </div>
    
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600",
    "Low Stock": "bg-amber-50 text-amber-600",
    "Out of Stock": "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}
