"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  AlertTriangle,
  Eye,
  ArrowUpDown,
  CheckCircle2,
  Boxes,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getStoredProducts,
  deleteStoredProduct,
  updateStoredProduct,
} from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function AdminProductsPage() {
  const router = useRouter();
  const products = useStoreSnapshot(getStoredProducts, []);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [openMenu, setOpenMenu] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Beauty",
    "Home",
    "Sports",
    "Groceries",
  ];

  // Filtering
  const filteredProducts = products
    .filter((product) => {
      const q = search.toLowerCase();
      const matchesSearch =
        (product.name || product.title || "").toLowerCase().includes(q) ||
        (product.sku || "").toLowerCase().includes(q) ||
        (product.category || "").toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      let matchesStock = true;
      if (stockFilter === "In Stock") matchesStock = product.stock > 10;
      if (stockFilter === "Low Stock") matchesStock = product.stock > 0 && product.stock <= 10;
      if (stockFilter === "Out of Stock") matchesStock = product.stock === 0;

      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "stock-asc") return a.stock - b.stock;
      if (sortBy === "rating-desc") return (b.rating || 0) - (a.rating || 0);
      return b.id - a.id;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDeleteProduct = () => {
    if (!deleteProduct) return;
    deleteStoredProduct(deleteProduct.id);
    toast.success(`"${deleteProduct.name || deleteProduct.title}" deleted.`);
    setDeleteProduct(null);
    setOpenMenu(null);
    loadProducts();
  };

  const handleToggleStatus = (product) => {
    const nextStatus = product.status === "Active" ? "Inactive" : "Active";
    updateStoredProduct(product.id, { status: nextStatus });
    toast.success(`Product status set to ${nextStatus}`);
    loadProducts();
  };

  const handleStockAdjust = (product, change) => {
    const nextStock = Math.max(0, (product.stock || 0) + change);
    const nextStatus =
      nextStock === 0 ? "Out of Stock" : nextStock <= 10 ? "Low Stock" : "Active";
    updateStoredProduct(product.id, { stock: nextStock, status: nextStatus });
    loadProducts();
  };

  const activeCount = products.filter((p) => p.status === "Active").length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Product Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Control your product catalog, real-time inventory levels, and store pricing.
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-900/10 transition hover:bg-indigo-600 w-fit"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Catalog
          </p>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {products.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active Online
          </p>
          <p className="mt-2 text-2xl font-black text-emerald-600">
            {activeCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Low Stock Alerts
          </p>
          <p className="mt-2 text-2xl font-black text-amber-500">
            {lowStockCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Out of Stock
          </p>
          <p className="mt-2 text-2xl font-black text-rose-500">
            {outOfStockCount}
          </p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        {/* Filters Toolbar */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products by name, SKU..."
                className="h-10.5 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Category: {c}
                  </option>
                ))}
              </select>

              {/* Stock Filter */}
              <select
                value={stockFilter}
                onChange={(e) => {
                  setStockFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500"
              >
                <option value="All">All Inventory</option>
                <option value="In Stock">In Stock (&gt;10)</option>
                <option value="Low Stock">Low Stock (1-10)</option>
                <option value="Out of Stock">Out of Stock (0)</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock-asc">Stock: Lowest First</option>
                <option value="rating-desc">Rating: Highest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Stock Quantity</th>
                <th className="px-5 py-3.5">Rating</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition">
                  {/* Product Info */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/80 p-1 overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name || product.title}
                            width={48}
                            height={48}
                            unoptimized
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="text-xl">🛍️</span>
                        )}
                      </div>

                      <div className="min-w-0 max-w-[260px]">
                        <p className="font-bold text-slate-900 truncate">
                          {product.name || product.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          SKU: {product.sku || `#PROD-${product.id}`}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <p className="font-black text-slate-900 text-sm">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                    {product.oldPrice && (
                      <p className="text-[10px] text-slate-400 line-through">
                        ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                      </p>
                    )}
                  </td>

                  {/* Stock with quick buttons */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStockAdjust(product, -1)}
                        className="h-6 w-6 rounded bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 flex items-center justify-center text-xs"
                        title="Reduce stock"
                      >
                        -
                      </button>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-xs ${
                          product.stock === 0
                            ? "bg-rose-100 text-rose-700"
                            : product.stock <= 10
                            ? "bg-amber-100 text-amber-800"
                            : "text-slate-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                      <button
                        onClick={() => handleStockAdjust(product, 5)}
                        className="h-6 w-6 rounded bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 flex items-center justify-center text-xs"
                        title="Add 5 units"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-700">
                        {product.rating || "4.5"}
                      </span>
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(product)}
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase transition ${
                        product.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
                      {product.status || "Active"}
                    </button>
                  </td>

                  {/* Action Menu */}
                  <td className="px-5 py-4 text-right relative">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        title="Edit product"
                      >
                        <Edit3 size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteProduct(product)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                        title="Delete product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <Package size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              No products found
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p>
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredProducts.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-800">
              {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-800">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-bold disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`h-8 w-8 rounded-lg font-bold ${
                  currentPage === pg
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-bold disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setDeleteProduct(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <AlertTriangle size={24} />
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-900">
              Delete Product?
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-800">
                &quot;{deleteProduct.name || deleteProduct.title}&quot;
              </span>
              ? This action cannot be undone and will remove it from the customer store.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteProduct(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteProduct}
                className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                <Trash2 size={14} />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
