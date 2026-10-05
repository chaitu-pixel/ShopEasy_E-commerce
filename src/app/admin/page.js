"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Users,
  Package,
  IndianRupee,
  MoreHorizontal,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  AlertTriangle,
  Plus,
} from "lucide-react";

import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,48,560",
      change: "+12.5%",
      comparison: "vs last month",
      icon: IndianRupee,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      positive: true,
    },
    {
      title: "Total Orders",
      value: "1,248",
      change: "+8.2%",
      comparison: "vs last month",
      icon: ShoppingBag,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      positive: true,
    },
    {
      title: "Customers",
      value: "8,549",
      change: "+14.6%",
      comparison: "vs last month",
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      positive: true,
    },
    {
      title: "Products",
      value: "156",
      change: "-2.4%",
      comparison: "vs last month",
      icon: Package,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      positive: false,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1048",
      customer: "Rahul Sharma",
      product: "Wireless Headphones",
      amount: "₹2,499",
      status: "Delivered",
      date: "Oct 05, 2026",
    },
    {
      id: "#ORD-1047",
      customer: "Priya Reddy",
      product: "Smart Watch Series X",
      amount: "₹3,299",
      status: "Processing",
      date: "Oct 05, 2026",
    },
    {
      id: "#ORD-1046",
      customer: "Arjun Kumar",
      product: "Classic Sneakers",
      amount: "₹1,899",
      status: "Shipped",
      date: "Oct 04, 2026",
    },
    {
      id: "#ORD-1045",
      customer: "Sneha Patel",
      product: "Skincare Kit",
      amount: "₹1,299",
      status: "Pending",
      date: "Oct 04, 2026",
    },
  ];

  const topProducts = [
    {
      name: "Premium Wireless Headphones",
      category: "Electronics",
      sales: 324,
      revenue: "₹8,09,676",
    },
    {
      name: "Smart Watch Series X",
      category: "Electronics",
      sales: 216,
      revenue: "₹7,12,584",
    },
    {
      name: "Classic Casual Sneakers",
      category: "Fashion",
      sales: 189,
      revenue: "₹3,58,911",
    },
  ];

  const lowStockProducts = [
    {
      name: "Wireless Mouse",
      stock: 4,
      status: "Low Stock",
    },
    {
      name: "USB-C Hub",
      stock: 7,
      status: "Low Stock",
    },
    {
      name: "Sports Backpack",
      stock: 2,
      status: "Critical",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div className="relative hidden sm:block">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search anything..."
                  className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                <Bell size={20} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              <button className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                  A
                </div>

                <div className="hidden text-left md:block">
                  <p className="text-sm font-semibold text-slate-800">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-400">
                    Administrator
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className="hidden text-slate-400 md:block"
                />
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-violet-600">
                ShopEasy Admin
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Good morning, Admin 👋
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here's what's happening with your store today.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow">
                <span>Last 30 days</span>
                <ChevronDown size={16} />
              </button>

              <button className="hidden items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 sm:flex">
                <Plus size={17} />
                Add Product
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        {stat.value}
                      </h2>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                    >
                      <Icon size={21} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs">
                    <span
                      className={`flex items-center gap-1 font-semibold ${
                        stat.positive
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {stat.positive ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}

                      {stat.change}
                    </span>

                    <span className="text-slate-400">
                      {stat.comparison}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Analytics */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {/* Sales Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Sales Overview
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Revenue performance over the selected period
                  </p>
                </div>

                <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
                  {["7D", "30D", "90D", "1Y"].map((period, index) => (
                    <button
                      key={period}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                        index === 1
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="mt-6 flex h-64 items-end gap-2 border-b border-slate-100 px-2">
                {[45, 60, 48, 72, 58, 82, 68, 90, 74, 96, 80, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        style={{ height: `${height}%` }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-400 opacity-80 transition-all duration-300 group-hover:opacity-100"
                      />
                    </div>
                  )
                )}
              </div>

              <div className="mt-3 flex justify-between text-[11px] text-slate-400">
                <span>Sep 06</span>
                <span>Sep 13</span>
                <span>Sep 20</span>
                <span>Sep 27</span>
                <span>Oct 05</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Order Status
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Current order distribution
                  </p>
                </div>

                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                  <MoreHorizontal size={19} />
                </button>
              </div>

              <div className="mt-7 space-y-5">
                <OrderStatus
                  icon={Clock3}
                  label="Pending"
                  count="86"
                  percentage="7%"
                  color="text-amber-500"
                  bg="bg-amber-100"
                />

                <OrderStatus
                  icon={Package}
                  label="Processing"
                  count="142"
                  percentage="11%"
                  color="text-blue-500"
                  bg="bg-blue-100"
                />

                <OrderStatus
                  icon={Truck}
                  label="Shipped"
                  count="218"
                  percentage="17%"
                  color="text-violet-500"
                  bg="bg-violet-100"
                />

                <OrderStatus
                  icon={CheckCircle2}
                  label="Delivered"
                  count="742"
                  percentage="59%"
                  color="text-emerald-500"
                  bg="bg-emerald-100"
                />

                <OrderStatus
                  icon={XCircle}
                  label="Cancelled"
                  count="60"
                  percentage="6%"
                  color="text-red-500"
                  bg="bg-red-100"
                />
              </div>
            </div>
          </div>

          {/* Orders + Top Products */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {/* Recent Orders */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Recent Orders
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Latest transactions from your store
                  </p>
                </div>

                <button className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700">
                  View all
                  <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-5 py-3 font-semibold">
                        Order
                      </th>
                      <th className="px-5 py-3 font-semibold">
                        Customer
                      </th>
                      <th className="px-5 py-3 font-semibold">
                        Product
                      </th>
                      <th className="px-5 py-3 font-semibold">
                        Amount
                      </th>
                      <th className="px-5 py-3 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                          {order.id}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {order.customer}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {order.product}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                          {order.amount}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Top Products
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Best performing products
                  </p>
                </div>

                <button className="text-xs font-semibold text-violet-600">
                  View all
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                      {index === 0
                        ? "🎧"
                        : index === 1
                        ? "⌚"
                        : "👟"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {product.sales} sales
                      </p>
                    </div>

                    <p className="text-sm font-bold text-slate-800">
                      {product.revenue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Stock */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
                  <AlertTriangle size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Inventory Alerts
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Products that need your attention
                  </p>
                </div>
              </div>

              <button className="text-xs font-semibold text-violet-600">
                Manage Inventory
              </button>
            </div>

            <div className="grid gap-3 p-5 md:grid-cols-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Only {product.stock} units left
                    </p>
                  </div>

                  <span
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                      product.status === "Critical"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Order Status Component */
function OrderStatus({
  icon: Icon,
  label,
  count,
  percentage,
  color,
  bg,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg} ${color}`}
      >
        <Icon size={17} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-slate-700">
            {label}
          </span>

          <span className="text-xs font-semibold text-slate-500">
            {count}
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${color.replace(
              "text-",
              "bg-"
            )}`}
            style={{ width: percentage }}
          />
        </div>
      </div>
    </div>
  );
}

/* Status Badge */
function StatusBadge({ status }) {
  const styles = {
    Delivered: "bg-emerald-50 text-emerald-600",
    Processing: "bg-blue-50 text-blue-600",
    Shipped: "bg-violet-50 text-violet-600",
    Pending: "bg-amber-50 text-amber-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}