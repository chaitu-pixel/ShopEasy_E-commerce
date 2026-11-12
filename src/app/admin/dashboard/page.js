"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Users,
  IndianRupee,
  ShoppingCart,
  Activity,
  Package,
  ArrowUpRight,
  Plus,
  AlertTriangle,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
} from "lucide-react";
import {
  getStoreAnalytics,
  getStoredOrders,
  getStoredProducts,
  getStoredCustomers,
  updateStoredOrderStatus,
} from "@/utils/storeData";
import toast from "react-hot-toast";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function AdminDashboard() {
  const analytics = useStoreSnapshot(getStoreAnalytics, null);
  const orders = useStoreSnapshot(getStoredOrders, []);
  const products = useStoreSnapshot(getStoredProducts, []);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleQuickStatusChange = (orderId, newStatus) => {
    updateStoredOrderStatus(orderId, newStatus);
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  if (!analytics) return null;

  const lowStockItems = products.filter((p) => p.stock <= 10).slice(0, 4);
  const recentOrders = orders.slice(0, 5);

  const chartBars = [
    { month: "Jan", height: 45, sales: "₹1.4L" },
    { month: "Feb", height: 58, sales: "₹1.8L" },
    { month: "Mar", height: 50, sales: "₹1.6L" },
    { month: "Apr", height: 75, sales: "₹2.3L" },
    { month: "May", height: 65, sales: "₹2.0L" },
    { month: "Jun", height: 82, sales: "₹2.6L" },
    { month: "Jul", height: 70, sales: "₹2.2L" },
    { month: "Aug", height: 88, sales: "₹2.8L" },
    { month: "Sep", height: 80, sales: "₹2.5L" },
    { month: "Oct", height: 95, sales: `₹${(analytics.totalSales / 100000).toFixed(1)}L` },
    { month: "Nov", height: 84, sales: "₹2.6L" },
    { month: "Dec", height: 98, sales: "₹3.1L" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Live Operations Control
            </p>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Real-time tracking of sales, order fulfillment, and store inventory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-900/10 transition hover:bg-indigo-600"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <ShoppingCart size={15} />
            <span>All Orders ({orders.length})</span>
          </Link>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Sales */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <IndianRupee size={20} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ₹{analytics.totalSales.toLocaleString("en-IN")}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-0.5 font-bold text-emerald-600">
                <ArrowUpRight size={14} />
                +14.8%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </div>
        </div>

        {/* Active Orders */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Orders
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ShoppingCart size={20} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {analytics.activeOrders}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="font-bold text-indigo-600">
                {analytics.deliveredOrders} delivered
              </span>
              <span className="text-slate-400">out of {analytics.totalOrders} total</span>
            </div>
          </div>
        </div>

        {/* Registered Customers */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Customer Base
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {analytics.totalCustomers}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="font-bold text-emerald-600">
                {analytics.activeCustomers} active
              </span>
              <span className="text-slate-400">verified accounts</span>
            </div>
          </div>
        </div>

        {/* Catalog & Low Stock */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Inventory Health
            </span>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                analytics.lowStockProducts > 0
                  ? "bg-amber-50 text-amber-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              <Package size={20} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {analytics.totalProducts}{" "}
              <span className="text-sm font-semibold text-slate-400">Products</span>
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              {analytics.lowStockProducts > 0 ? (
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <AlertTriangle size={13} />
                  {analytics.lowStockProducts} low stock
                </span>
              ) : (
                <span className="font-bold text-emerald-600">All stock optimal</span>
              )}
              {analytics.outOfStockProducts > 0 && (
                <span className="text-rose-500 font-bold">
                  ({analytics.outOfStockProducts} out)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Side Panels */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Sales Trend Chart */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs xl:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Revenue & Sales Performance
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Monthly revenue distribution and seasonal projection
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                Avg Order: ₹{analytics.avgOrderValue.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="mt-8 flex h-64 items-end gap-2 sm:gap-3">
            {chartBars.map((bar, index) => (
              <div
                key={bar.month}
                className="group relative flex h-full flex-1 flex-col items-center justify-end"
              >
                {/* Hover Tooltip */}
                <div className="absolute -top-10 z-10 hidden rounded-md bg-slate-900 px-2 py-1 text-[11px] font-bold text-white shadow-lg group-hover:block whitespace-nowrap">
                  {bar.month}: {bar.sales}
                </div>

                {/* Bar */}
                <div
                  style={{ height: `${bar.height}%` }}
                  className={`w-full rounded-t-lg transition duration-300 ${
                    index === 9
                      ? "bg-indigo-600 group-hover:bg-indigo-500"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Month Labels */}
          <div className="mt-3 grid grid-cols-6 gap-2 text-center text-[11px] font-semibold text-slate-400 sm:grid-cols-12">
            {chartBars.map((bar) => (
              <span key={bar.month}>{bar.month}</span>
            ))}
          </div>
        </div>

        {/* Low Stock Warning Panel */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Stock Alerts
                </h2>
                <p className="text-xs text-slate-400">
                  Products requiring inventory restock
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <AlertTriangle size={18} />
              </div>
            </div>

            <div className="mt-5 space-y-3.5">
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-1 border border-slate-100 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            unoptimized
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span>📦</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                          item.stock === 0
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.stock === 0 ? "Out of Stock" : `${item.stock} left`}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  All items are well stocked.
                </div>
              )}
            </div>
          </div>

          <Link
            href="/admin/products"
            className="mt-6 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <span>Manage All Products</span>
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Recent Store Orders
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Live customer transactions requiring fulfillment
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition"
          >
            <span>View all {orders.length} orders</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Product Summary</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-5 py-4 font-bold text-slate-900">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                        {order.initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{order.customer}</p>
                        <p className="text-[10px] text-slate-400">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="max-w-[220px] truncate font-medium text-slate-700">
                      {order.product}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {order.items?.length || 1} item(s) · {order.date}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        order.payment === "Paid"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {order.payment} ({order.paymentMethod})
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        order.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.status === "Shipped"
                          ? "bg-indigo-50 text-indigo-700"
                          : order.status === "Processing"
                          ? "bg-blue-50 text-blue-700"
                          : order.status === "Cancelled"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleQuickStatusChange(order.id, e.target.value)
                      }
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 outline-none hover:border-indigo-400 focus:border-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}