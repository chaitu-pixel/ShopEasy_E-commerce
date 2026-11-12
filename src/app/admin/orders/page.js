"use client";

import { useState } from "react";
import Image from "next/image";
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
  Printer,
  Trash2,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getStoredOrders,
  updateStoredOrderStatus,
  deleteStoredOrder,
} from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function AdminOrdersPage() {
  const orders = useStoreSnapshot(getStoredOrders, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 6;

  const handleStatusChange = (orderId, newStatus) => {
    const updated = updateStoredOrderStatus(orderId, newStatus);
    toast.success(`Order ${orderId} updated to ${newStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(updated);
    }
  };

  const handleDeleteOrder = (orderId) => {
    deleteStoredOrder(orderId);
    toast.success(`Order ${orderId} removed`);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      (order.id || "").toLowerCase().includes(search) ||
      (order.customer || "").toLowerCase().includes(search) ||
      (order.email || "").toLowerCase().includes(search) ||
      (order.product || "").toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All Status" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage) || 1;
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Stats calculation
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const processingCount = orders.filter((o) => o.status === "Processing").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Fulfillment & Tracking
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Monitor, update, and manage incoming customer purchases and delivery dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs flex items-center gap-2">
            <ShoppingBag size={15} className="text-indigo-600" />
            <span>{totalOrdersCount} Total Placed</span>
          </div>
        </div>
      </div>

      {/* Order Status Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CreditCard size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600">
            Confirmed payments
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pending Action
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {pendingCount + processingCount}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-amber-600">
            {pendingCount} pending · {processingCount} in warehouse
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              In Transit
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Truck size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {shippedCount}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-indigo-600">
            Dispatched with courier
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Completed
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            {deliveredCount}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600">
            Successfully delivered
          </p>
        </div>
      </div>

      {/* Main Orders Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search by order ID, customer name, email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10.5 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500"
              >
                <option value="All Status">All Statuses ({orders.length})</option>
                <option value="Pending">Pending ({pendingCount})</option>
                <option value="Processing">Processing ({processingCount})</option>
                <option value="Shipped">Shipped ({shippedCount})</option>
                <option value="Delivered">Delivered ({deliveredCount})</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Order ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Products</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition">
                  {/* Order ID */}
                  <td className="px-5 py-4">
                    <span className="font-black text-slate-900 font-mono">
                      {order.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-black text-white">
                        {order.initials || "CU"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{order.customer}</p>
                        <p className="text-[10px] text-slate-400">{order.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Product items */}
                  <td className="px-5 py-4">
                    <div className="max-w-[220px]">
                      <p className="truncate font-semibold text-slate-800">
                        {order.product}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {order.items?.length || 1} product item(s)
                      </p>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4 font-black text-slate-900">
                    ₹{Number(order.amount).toLocaleString("en-IN")}
                  </td>

                  {/* Payment */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${
                        order.payment === "Paid"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.payment === "Refunded"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {order.payment} · {order.paymentMethod || "Online"}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`rounded-xl px-2.5 py-1 text-[11px] font-bold border transition outline-none ${
                        order.status === "Delivered"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : order.status === "Shipped"
                          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                          : order.status === "Processing"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : order.status === "Cancelled"
                          ? "border-rose-200 bg-rose-50 text-rose-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={13} className="text-slate-400" />
                      <span>{order.date}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <div className="py-16 text-center">
            <ShoppingBag size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              No orders found
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Try searching with another keyword or change your status filter.
            </p>
          </div>
        )}

        {/* Pagination footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p>
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredOrders.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-800">
              {Math.min(endIndex, filteredOrders.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-800">
              {filteredOrders.length}
            </span>{" "}
            orders
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-bold disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-2 font-bold text-slate-700">
              {currentPage} / {totalPages}
            </span>
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

      {/* Comprehensive Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-black text-slate-900">
                    {selectedOrder.id}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-black uppercase ${
                      selectedOrder.status === "Delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : selectedOrder.status === "Shipped"
                        ? "bg-indigo-100 text-indigo-700"
                        : selectedOrder.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : selectedOrder.status === "Cancelled"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Placed on {selectedOrder.date} at {selectedOrder.time || "12:00"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                  title="Print invoice"
                >
                  <Printer size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Quick Status Update Selector */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
                <p className="text-xs font-bold text-indigo-900 mb-2">
                  Update Fulfillment Status:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(selectedOrder.id, st)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                          selectedOrder.status === st
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Customer & Shipping info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Customer Information
                  </h4>
                  <p className="font-bold text-sm text-slate-900">
                    {selectedOrder.customer}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {selectedOrder.email}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {selectedOrder.phone || "+91 98201 44521"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Delivery Address
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-700 font-medium">
                    {selectedOrder.address ||
                      "Skyline Towers, Mumbai, Maharashtra - 400053"}
                  </p>
                  <div className="mt-2 text-xs font-bold text-indigo-600">
                    Payment: {selectedOrder.payment} ({selectedOrder.paymentMethod})
                  </div>
                </div>
              </div>

              {/* Items Ordered */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Ordered Products ({selectedOrder.items?.length || 1})
                </h4>
                <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
                  {(selectedOrder.items || [
                    {
                      id: 1,
                      name: selectedOrder.product,
                      price: selectedOrder.amount,
                      quantity: 1,
                    },
                  ]).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              unoptimized
                              className="h-full w-full object-contain p-1"
                            />
                          ) : (
                            <span>🛍️</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-slate-400">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>

                      <div className="text-right font-black text-slate-900">
                        ₹
                        {(
                          Number(item.price || 0) * Number(item.quantity || 1)
                        ).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between bg-slate-50 p-3.5 text-xs font-black text-slate-900 rounded-b-2xl">
                    <span>Total Order Amount</span>
                    <span className="text-sm">
                      ₹{Number(selectedOrder.amount).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              {selectedOrder.timeline && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Fulfillment History
                  </h4>
                  <div className="space-y-2">
                    {selectedOrder.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                          <span className="font-semibold text-slate-800">
                            {step.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {step.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 p-5 bg-slate-50/50">
              <button
                type="button"
                onClick={() => handleDeleteOrder(selectedOrder.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                <Trash2 size={14} />
                <span>Delete Order Record</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}