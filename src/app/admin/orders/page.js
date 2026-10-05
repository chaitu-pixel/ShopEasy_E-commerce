"use client";

import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Clock3,
  PackageCheck,
  Truck,
  CheckCircle2,
  MoreHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  UserRound,
  Package,
  X,
  MapPin,
  Mail,
  Phone,
  ReceiptText,
} from "lucide-react";

const orders = [
  {
    id: "#ORD-1048",
    customer: "Rahul Sharma",
    initials: "RS",
    product: "Premium Wireless Headphones",
    productImage: "🎧",
    amount: 2499,
    payment: "Paid",
    status: "Delivered",
    date: "Oct 05, 2026",
  },
  {
    id: "#ORD-1047",
    customer: "Priya Reddy",
    initials: "PR",
    product: "Smart Watch Series X",
    productImage: "⌚",
    amount: 3299,
    payment: "Paid",
    status: "Processing",
    date: "Oct 05, 2026",
  },
  {
    id: "#ORD-1046",
    customer: "Arjun Kumar",
    initials: "AK",
    product: "Classic Casual Sneakers",
    productImage: "👟",
    amount: 1899,
    payment: "Paid",
    status: "Shipped",
    date: "Oct 04, 2026",
  },
  {
    id: "#ORD-1045",
    customer: "Sneha Patel",
    initials: "SP",
    product: "Everyday Skincare Kit",
    productImage: "🧴",
    amount: 1299,
    payment: "Pending",
    status: "Pending",
    date: "Oct 04, 2026",
  },
  {
    id: "#ORD-1044",
    customer: "Vikram Singh",
    initials: "VS",
    product: "Modern Table Lamp",
    productImage: "💡",
    amount: 999,
    payment: "Paid",
    status: "Cancelled",
    date: "Oct 03, 2026",
  },
];

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 3;

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(search) ||
      order.customer.toLowerCase().includes(search) ||
      order.product.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All Status" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const startIndex = (currentPage - 1) * ordersPerPage;

  const endIndex = startIndex + ordersPerPage;

  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-violet-600">Orders</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Orders
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Manage, track and monitor all customer orders from one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-violet-200 hover:text-violet-600">
              <CalendarDays size={17} />
              <span>Oct 2026</span>
            </button>

            <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-violet-600">
              <ShoppingBag size={17} />
              <span>1,248 Orders</span>
            </button>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OrderStat
          icon={<ShoppingBag size={20} />}
          title="Total Orders"
          value="1,248"
          change="+12.5%"
          description="vs last month"
          iconStyle="bg-violet-50 text-violet-600"
        />

        <OrderStat
          icon={<Clock3 size={20} />}
          title="Pending"
          value="86"
          change="+4.2%"
          description="needs attention"
          iconStyle="bg-amber-50 text-amber-600"
        />

        <OrderStat
          icon={<Truck size={20} />}
          title="Processing"
          value="142"
          change="+8.7%"
          description="being prepared"
          iconStyle="bg-blue-50 text-blue-600"
        />

        <OrderStat
          icon={<CheckCircle2 size={20} />}
          title="Delivered"
          value="742"
          change="+15.3%"
          description="successfully delivered"
          iconStyle="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* OVERVIEW CARDS */}
      <div className="mb-7 grid gap-5 lg:grid-cols-3">
        {/* ORDER STATUS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Order Status</h2>

              <p className="mt-1 text-xs text-slate-400">
                Current order distribution
              </p>
            </div>

            <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
              <PackageCheck size={19} />
            </div>
          </div>

          <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="flex h-full">
              <div className="w-[58%] bg-emerald-500" />
              <div className="w-[15%] bg-blue-500" />
              <div className="w-[10%] bg-violet-500" />
              <div className="w-[7%] bg-amber-400" />
              <div className="w-[10%] bg-red-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatusOverview
              label="Delivered"
              value="742"
              dot="bg-emerald-500"
            />

            <StatusOverview label="Processing" value="142" dot="bg-blue-500" />

            <StatusOverview label="Shipped" value="96" dot="bg-violet-500" />

            <StatusOverview label="Pending" value="86" dot="bg-amber-400" />
          </div>
        </div>

        {/* REVENUE */}
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-5 text-white shadow-xl shadow-violet-500/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-violet-200">
                Order Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold">₹24.86L</h2>

              <div className="mt-3 flex items-center gap-2 text-xs text-violet-100">
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                  <ArrowUpRight size={13} />
                  18.4%
                </span>

                <span>vs last month</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-2.5">
              <CreditCard size={20} />
            </div>
          </div>

          <div className="mt-8 flex h-20 items-end gap-2">
            {[35, 48, 42, 65, 54, 76, 62, 88, 72, 95, 78, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-white/20 transition hover:bg-white/40"
                  style={{ height: `${height}%` }}
                />
              ),
            )}
          </div>

          <div className="mt-3 flex justify-between text-[10px] text-violet-200">
            <span>Sep 01</span>
            <span>Sep 15</span>
            <span>Oct 01</span>
          </div>
        </div>

        {/* QUICK INFO */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">Today's Summary</h2>

            <p className="mt-1 text-xs text-slate-400">Orders received today</p>
          </div>

          <div className="space-y-4">
            <SummaryRow
              icon={<ShoppingBag size={17} />}
              label="New Orders"
              value="48"
              bg="bg-violet-50"
              color="text-violet-600"
            />

            <SummaryRow
              icon={<Package size={17} />}
              label="Processing"
              value="24"
              bg="bg-blue-50"
              color="text-blue-600"
            />

            <SummaryRow
              icon={<Truck size={17} />}
              label="Shipped"
              value="18"
              bg="bg-amber-50"
              color="text-amber-600"
            />

            <SummaryRow
              icon={<CheckCircle2 size={17} />}
              label="Delivered"
              value="36"
              bg="bg-emerald-50"
              color="text-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                View and manage your latest customer orders.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* SEARCH */}
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50 sm:w-64"
                />
              </div>

              {/* FILTER */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Order
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Customer
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Product
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Amount
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Payment
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Date
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="group transition hover:bg-violet-50/30"
                >
                  {/* ORDER */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {order.id}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Ecommerce order
                      </p>
                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-[11px] font-bold text-white">
                        {order.initials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {order.customer}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Customer
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PRODUCT */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                        {order.productImage}
                      </div>

                      <p className="max-w-[210px] truncate text-sm font-medium text-slate-600">
                        {order.product}
                      </p>
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-800">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </p>
                  </td>

                  {/* PAYMENT */}
                  <td className="px-6 py-5">
                    <PaymentBadge payment={order.payment} />
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={14} />
                      {order.date}
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-5">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-violet-600 hover:shadow-sm"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredOrders.length === 0 ? 0 : startIndex + 1}
            </span>
            {filteredOrders.length > 0 && (
              <>
                {" "}
                –{" "}
                <span className="font-bold text-slate-700">
                  {Math.min(endIndex, filteredOrders.length)}
                </span>
              </>
            )}{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {filteredOrders.length}
            </span>{" "}
            orders
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-violet-200 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition ${
                    currentPage === page
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-600"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <span className="px-1 text-xs text-slate-400">...</span>

            <button
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-violet-200 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
}

/* STAT CARD */

function OrderStat({ icon, title, value, change, description, iconStyle }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          {icon}
        </div>

        <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          <ArrowUpRight size={11} />
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>

      <div className="mt-1 flex items-end gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </h3>

        <span className="mb-1 text-[10px] text-slate-400">{description}</span>
      </div>
    </div>
  );
}

/* STATUS OVERVIEW */

function StatusOverview({ label, value, dot }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />

        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>

      <span className="text-xs font-bold text-slate-700">{value}</span>
    </div>
  );
}

/* SUMMARY ROW */

function SummaryRow({ icon, label, value, bg, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg} ${color}`}
        >
          {icon}
        </div>

        <span className="text-sm font-medium text-slate-600">{label}</span>
      </div>

      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

/* STATUS BADGE */

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
    Processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
    Shipped: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
    Delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    Cancelled: "bg-red-50 text-red-700 ring-1 ring-red-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/* PAYMENT BADGE */

function PaymentBadge({ payment }) {
  const styles = {
    Paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ${
        styles[payment] || "bg-slate-100 text-slate-600"
      }`}
    >
      {payment}
    </span>
  );
}
function OrderDetailsModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <ReceiptText size={18} />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Order Details
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {order.id}
                </h2>

                <StatusBadge status={order.status} />
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays size={14} />
                Placed on {order.date}
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto">
          <div className="space-y-5 p-5 sm:p-7">
            {/* ORDER PROGRESS */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Order Progress
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Current delivery status
                  </p>
                </div>

                <Truck
                  size={19}
                  className="text-violet-600"
                />
              </div>

              <OrderProgress status={order.status} />
            </div>

            {/* CUSTOMER + SHIPPING */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* CUSTOMER */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <UserRound size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Customer
                    </h3>

                    <p className="text-xs text-slate-400">
                      Customer information
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
                    {order.initials}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {order.customer}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Customer ID: CUST-2048
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <InfoRow
                    icon={<Mail size={14} />}
                    text="customer@example.com"
                  />

                  <InfoRow
                    icon={<Phone size={14} />}
                    text="+91 98765 43210"
                  />
                </div>
              </div>

              {/* SHIPPING */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Shipping Address
                    </h3>

                    <p className="text-xs text-slate-400">
                      Delivery information
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-700">
                    {order.customer}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    24, MG Road,
                    <br />
                    Hyderabad, Telangana
                    <br />
                    India - 500001
                  </p>
                </div>
              </div>
            </div>

            {/* PRODUCT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Ordered Product
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Product included in this order
                  </p>
                </div>

                <Package
                  size={19}
                  className="text-violet-600"
                />
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                    {order.productImage}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {order.product}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Quantity: 1
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Product ID: PROD-{order.id.replace("#ORD-", "")}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-lg font-bold text-slate-900">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Product price
                  </p>
                </div>
              </div>
            </div>

            {/* PAYMENT + TOTAL */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* PAYMENT */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CreditCard size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Payment
                    </h3>

                    <p className="text-xs text-slate-400">
                      Payment information
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Payment status
                    </p>

                    <div className="mt-2">
                      <PaymentBadge payment={order.payment} />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      Method
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      Online Payment
                    </p>
                  </div>
                </div>
              </div>

              {/* TOTAL */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold text-slate-900">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <PriceRow
                    label="Subtotal"
                    value={order.amount}
                  />

                  <PriceRow
                    label="Shipping"
                    value={0}
                  />

                  <div className="border-t border-dashed border-slate-200 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">
                        Total
                      </span>

                      <span className="text-lg font-bold text-violet-600">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Close
          </button>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-violet-600">
            <Eye size={16} />
            View Full Order
          </button>
        </div>
      </div>
    </div>
  );
}

{/* Progress Component*/}
function OrderProgress({ status }) {
  const steps = [
    {
      label: "Pending",
      icon: <Clock3 size={15} />,
    },
    {
      label: "Processing",
      icon: <Package size={15} />,
    },
    {
      label: "Shipped",
      icon: <Truck size={15} />,
    },
    {
      label: "Delivered",
      icon: <CheckCircle2 size={15} />,
    },
  ];

  const statusOrder = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="flex items-start">
      {steps.map((step, index) => {
        const completed =
          currentIndex >= index;

        const isLast =
          index === steps.length - 1;

        return (
          <div
            key={step.label}
            className="flex flex-1 items-start"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                  completed
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                    : "bg-white text-slate-400 ring-1 ring-slate-200"
                }`}
              >
                {step.icon}
              </div>

              <span
                className={`mt-2 text-[10px] font-semibold sm:text-xs ${
                  completed
                    ? "text-violet-600"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={`mt-[18px] h-0.5 flex-1 ${
                  currentIndex > index
                    ? "bg-violet-600"
                    : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

{/*Info Row*/}
function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-slate-500">
      <span className="text-slate-400">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

{/*Price Row*/}
function PriceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-700">
        ₹{value.toLocaleString("en-IN")}
      </span>
    </div>
  );
}