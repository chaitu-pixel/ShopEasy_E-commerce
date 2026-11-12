"use client";

import { useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Crown,
  MoreHorizontal,
  Eye,
  CalendarDays,
  ShoppingBag,
  Wallet,
  ArrowUpRight,
  Plus,
  Mail,
  Phone,
  MapPin,
  X,
  UserPlus,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getStoredCustomers,
  addStoredCustomer,
  updateStoredCustomer,
  deleteStoredCustomer,
  getStoredOrders,
} from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function AdminCustomersPage() {
  const customers = useStoreSnapshot(getStoredCustomers, []);
  const orders = useStoreSnapshot(getStoredOrders, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerFilter, setCustomerFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Mumbai, Maharashtra",
    type: "Regular",
    status: "Active",
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustomerForm.name.trim() || !newCustomerForm.email.trim()) {
      toast.error("Name and Email are required.");
      return;
    }

    const created = addStoredCustomer(newCustomerForm);
    toast.success(`Customer "${created.name}" created!`);
    setIsAddModalOpen(false);
    setNewCustomerForm({
      name: "",
      email: "",
      phone: "",
      city: "Mumbai, Maharashtra",
      type: "Regular",
      status: "Active",
    });
  };

  const handleToggleCustomerStatus = (customer) => {
    const nextStatus = customer.status === "Active" ? "Inactive" : "Active";
    updateStoredCustomer(customer.id, { status: nextStatus });
    toast.success(`${customer.name} status updated to ${nextStatus}`);
  };

  const handleDeleteCustomer = (customerId) => {
    deleteStoredCustomer(customerId);
    toast.success("Customer removed from directory");
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      (customer.name || "").toLowerCase().includes(search) ||
      (customer.email || "").toLowerCase().includes(search) ||
      (customer.phone || "").toLowerCase().includes(search) ||
      (customer.id || "").toLowerCase().includes(search);

    let matchesFilter = true;
    if (customerFilter === "Active") matchesFilter = customer.status === "Active";
    if (customerFilter === "Inactive") matchesFilter = customer.status === "Inactive";
    if (customerFilter === "Premium") matchesFilter = customer.type === "Premium";
    if (customerFilter === "VIP") matchesFilter = customer.type === "VIP";

    return matchesSearch && matchesFilter;
  });

  const totalCustomers = customers.length;
  const activeCount = customers.filter((c) => c.status === "Active").length;
  const premiumCount = customers.filter((c) => ["Premium", "VIP"].includes(c.type)).length;
  const totalSpendAll = customers.reduce((sum, c) => sum + (Number(c.spent) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Directory
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            View customer purchase activity, tier segmentation, and user account status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-slate-900/10 hover:bg-indigo-600 transition w-fit"
        >
          <UserPlus size={16} />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Registered
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">{totalCustomers}</p>
          <p className="mt-1 text-[11px] font-semibold text-indigo-600">
            Verified accounts
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Users
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-emerald-600">{activeCount}</p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-600">
            {Math.round((activeCount / (totalCustomers || 1)) * 100)}% engagement rate
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              VIP & Premium
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Crown size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-amber-500">{premiumCount}</p>
          <p className="mt-1 text-[11px] font-semibold text-amber-600">
            High lifetime value users
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cumulative Spend
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet size={17} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">
            ₹{totalSpendAll.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-slate-400">
            Total across all accounts
          </p>
        </div>
      </div>

      {/* Main Customers Table */}
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
                placeholder="Search customers by name, email, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10.5 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Filter */}
            <select
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500"
            >
              <option value="All">All Customers ({customers.length})</option>
              <option value="Active">Active Users</option>
              <option value="Inactive">Inactive Users</option>
              <option value="Premium">Premium Tier</option>
              <option value="VIP">VIP Tier</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Account ID</th>
                <th className="px-5 py-3.5">Total Orders</th>
                <th className="px-5 py-3.5">Lifetime Spend</th>
                <th className="px-5 py-3.5">Tier</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">City / Region</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-black text-white">
                        {customer.initials || customer.name?.[0] || "C"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{customer.name}</p>
                        <p className="text-[10px] text-slate-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-mono font-bold text-slate-600">
                    {customer.id}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-bold text-slate-800">
                      {customer.orders || 0} orders
                    </span>
                  </td>

                  <td className="px-5 py-4 font-black text-slate-900">
                    ₹{Number(customer.spent || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                        customer.type === "VIP"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : customer.type === "Premium"
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {customer.type || "Regular"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleCustomerStatus(customer)}
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase transition ${
                        customer.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                    >
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
                      {customer.status}
                    </button>
                  </td>

                  <td className="px-5 py-4 text-slate-500 text-[11px]">
                    {customer.city || "India"}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(customer)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      <Eye size={13} />
                      <span>Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="py-16 text-center">
            <Users size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              No customers found
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Add Customer Account
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={newCustomerForm.name}
                  onChange={(e) =>
                    setNewCustomerForm({ ...newCustomerForm, name: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={newCustomerForm.email}
                  onChange={(e) =>
                    setNewCustomerForm({ ...newCustomerForm, email: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={newCustomerForm.phone}
                  onChange={(e) =>
                    setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="Hyderabad, Telangana"
                  value={newCustomerForm.city}
                  onChange={(e) =>
                    setNewCustomerForm({ ...newCustomerForm, city: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Customer Tier
                  </label>
                  <select
                    value={newCustomerForm.type}
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, type: e.target.value })
                    }
                    className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500 bg-white"
                  >
                    <option value="Regular">Regular</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newCustomerForm.status}
                    onChange={(e) =>
                      setNewCustomerForm({ ...newCustomerForm, status: e.target.value })
                    }
                    className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white hover:bg-indigo-600"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Profile Details Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white">
                  {selectedCustomer.initials}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedCustomer.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">
                    Total Orders
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-900">
                    {selectedCustomer.orders || 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">
                    Total Spent
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-900">
                    ₹{Number(selectedCustomer.spent || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">
                    Tier Level
                  </p>
                  <p className="mt-1 text-base font-black text-indigo-600">
                    {selectedCustomer.type || "Regular"}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2.5">
                <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                  Contact & Location
                </h4>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail size={14} className="text-slate-400" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={14} className="text-slate-400" />
                  <span>{selectedCustomer.phone || "+91 98201 44521"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{selectedCustomer.city || "India"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CalendarDays size={14} className="text-slate-400" />
                  <span>Member since: {selectedCustomer.joined || "2026"}</span>
                </div>
              </div>

              {/* Customer Orders History from shared store */}
              <div>
                <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-2.5">
                  Recent Purchases
                </h4>
                {orders.filter(
                  (o) =>
                    (o.email || "").toLowerCase() ===
                    (selectedCustomer.email || "").toLowerCase()
                ).length > 0 ? (
                  <div className="space-y-2">
                    {orders
                      .filter(
                        (o) =>
                          (o.email || "").toLowerCase() ===
                          (selectedCustomer.email || "").toLowerCase()
                      )
                      .map((ord) => (
                        <div
                          key={ord.id}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3"
                        >
                          <div>
                            <span className="font-mono font-bold text-slate-900">
                              {ord.id}
                            </span>
                            <p className="text-[11px] text-slate-500">{ord.product}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">
                              ₹{Number(ord.amount).toLocaleString("en-IN")}
                            </p>
                            <span className="text-[10px] font-bold text-indigo-600">
                              {ord.status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">
                    No recent store purchase history recorded for this customer.
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 p-5 bg-slate-50/50">
              <button
                type="button"
                onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
              >
                <Trash2 size={14} />
                <span>Delete Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
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
