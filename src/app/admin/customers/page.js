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
} from "lucide-react";

const customers = [
  {
    id: "CUS-1001",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    initials: "RS",
    orders: 24,
    spent: 58490,
    status: "Active",
    joined: "Jan 12, 2026",
    type: "Premium",
  },
  {
    id: "CUS-1002",
    name: "Priya Reddy",
    email: "priya.reddy@gmail.com",
    initials: "PR",
    orders: 18,
    spent: 42680,
    status: "Active",
    joined: "Feb 08, 2026",
    type: "Premium",
  },
  {
    id: "CUS-1003",
    name: "Arjun Kumar",
    email: "arjun.kumar@gmail.com",
    initials: "AK",
    orders: 12,
    spent: 28750,
    status: "Active",
    joined: "Mar 19, 2026",
    type: "Regular",
  },
  {
    id: "CUS-1004",
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    initials: "SP",
    orders: 8,
    spent: 16490,
    status: "Active",
    joined: "Apr 02, 2026",
    type: "Regular",
  },
  {
    id: "CUS-1005",
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    initials: "VS",
    orders: 5,
    spent: 9240,
    status: "Inactive",
    joined: "May 14, 2026",
    type: "Regular",
  },
  {
    id: "CUS-1006",
    name: "Ananya Rao",
    email: "ananya.rao@gmail.com",
    initials: "AR",
    orders: 31,
    spent: 74680,
    status: "Active",
    joined: "Jan 28, 2026",
    type: "Premium",
  },
];

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customerFilter, setCustomerFilter] = useState("All Customers");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.id.toLowerCase().includes(search);

    const matchesFilter =
      customerFilter === "All Customers" ||
      customer.status === customerFilter ||
      customer.type === customerFilter;

    return matchesSearch && matchesFilter;
  });
  return (
    <div className="min-h-screen bg-[#f6f7fb] p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-violet-600">Customers</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Customers
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Manage customer accounts, orders and spending activity.
            </p>
          </div>

          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm">
            <Users size={17} />
            <span>1,842 Customers</span>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CustomerStat
          icon={<Users size={20} />}
          title="Total Customers"
          value="1,842"
          change="+14.8%"
          description="vs last month"
          iconStyle="bg-violet-50 text-violet-600"
        />

        <CustomerStat
          icon={<UserCheck size={20} />}
          title="Active Customers"
          value="1,624"
          change="+9.4%"
          description="currently active"
          iconStyle="bg-emerald-50 text-emerald-600"
        />

        <CustomerStat
          icon={<Crown size={20} />}
          title="Premium Customers"
          value="386"
          change="+7.2%"
          description="high value users"
          iconStyle="bg-amber-50 text-amber-600"
        />

        <CustomerStat
          icon={<UserX size={20} />}
          title="Inactive"
          value="218"
          change="-3.6%"
          description="need attention"
          iconStyle="bg-red-50 text-red-600"
        />
      </div>

      {/* INSIGHT CARDS */}
      <div className="mb-7 grid gap-5 lg:grid-cols-3">
        {/* CUSTOMER GROWTH */}
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-5 text-white shadow-xl shadow-violet-500/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-violet-200">
                Customer Growth
              </p>

              <h2 className="mt-2 text-3xl font-bold">+18.6%</h2>

              <div className="mt-3 flex items-center gap-2 text-xs text-violet-100">
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                  <ArrowUpRight size={13} />
                  12.4%
                </span>

                <span>this month</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-2.5">
              <Users size={20} />
            </div>
          </div>

          <div className="mt-8 flex h-20 items-end gap-2">
            {[32, 44, 38, 52, 48, 64, 58, 72, 66, 82, 76, 94].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-white/20 transition hover:bg-white/40"
                  style={{ height: `${height}%` }}
                />
              ),
            )}
          </div>
        </div>

        {/* CUSTOMER VALUE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Average Customer Value
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                ₹18,460
              </h2>

              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={13} />
                8.7% from last month
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
              <Wallet size={20} />
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Average orders</span>

              <span className="text-sm font-bold text-slate-700">6.4</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[72%] rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* CUSTOMER TYPES */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-bold text-slate-900">Customer Types</h2>

            <p className="mt-1 text-xs text-slate-400">Customer segmentation</p>
          </div>

          <div className="space-y-4">
            <CustomerType
              label="Premium"
              value="386"
              percentage="21%"
              color="bg-violet-500"
            />

            <CustomerType
              label="Regular"
              value="1,238"
              percentage="67%"
              color="bg-blue-500"
            />

            <CustomerType
              label="Inactive"
              value="218"
              percentage="12%"
              color="bg-slate-300"
            />
          </div>
        </div>
      </div>

      {/* CUSTOMER TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Customer Directory
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                View and manage all registered customers.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50 sm:w-64"
                />
              </div>

              <select
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none focus:border-violet-400 focus:bg-white"
              >
                <option>All Customers</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Premium</option>
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
                  Customer
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Customer ID
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Orders
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Total Spent
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Type
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Joined
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="group transition hover:bg-violet-50/30"
                  >
                    {/* CUSTOMER */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
                          {customer.initials}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {customer.name}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ID */}
                    <td className="px-6 py-5">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                        {customer.id}
                      </span>
                    </td>

                    {/* ORDERS */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={15} className="text-slate-400" />

                        <span className="text-sm font-bold text-slate-700">
                          {customer.orders}
                        </span>
                      </div>
                    </td>

                    {/* SPENT */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-800">
                        ₹{customer.spent.toLocaleString("en-IN")}
                      </p>
                    </td>

                    {/* TYPE */}
                    <td className="px-6 py-5">
                      <CustomerTypeBadge type={customer.type} />
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <CustomerStatus status={customer.status} />
                    </td>

                    {/* JOINED */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays size={14} />
                        {customer.joined}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-5">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-violet-600 hover:shadow-sm"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <Search size={24} className="text-slate-400" />
                      </div>

                      <h3 className="text-sm font-bold text-slate-700">
                        No customers found
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Try searching with a different name, email or customer
                        ID.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">{customers.length}</span>{" "}
            customers
          </p>

          <div className="flex items-center gap-1.5">
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-400">
              Previous
            </button>

            <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
              1
            </button>

            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
              2
            </button>

            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
              3
            </button>

            <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
              Next
            </button>
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}

/* STAT CARD */

function CustomerStat({ icon, title, value, change, description, iconStyle }) {
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

/* CUSTOMER TYPE */

function CustomerType({ label, value, percentage, color }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${color}`} />

          <span className="text-xs font-medium text-slate-500">{label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">{value}</span>

          <span className="text-[10px] text-slate-400">{percentage}</span>
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
}


{/*Modal component*/}
function CustomerDetailsModal({ customer, onClose }) {
  const recentOrders = [
    {
      id: "#ORD-1048",
      product: "Premium Wireless Headphones",
      amount: 2499,
      status: "Delivered",
      date: "Oct 05, 2026",
    },
    {
      id: "#ORD-1039",
      product: "Smart Watch Series X",
      amount: 3299,
      status: "Delivered",
      date: "Sep 28, 2026",
    },
    {
      id: "#ORD-1026",
      product: "Classic Casual Sneakers",
      amount: 1899,
      status: "Processing",
      date: "Sep 18, 2026",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              Customer Details
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {customer.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[calc(90vh-85px)] overflow-y-auto p-5 sm:p-7">
          {/* PROFILE */}
          <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-violet-500/20">
                {customer.initials}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {customer.name}
                  </h3>

                  <CustomerStatus status={customer.status} />

                  <CustomerTypeBadge type={customer.type} />
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {customer.email}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Customer ID: {customer.id}
                </p>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <DetailStat
              icon={<ShoppingBag size={17} />}
              label="Total Orders"
              value={customer.orders}
            />

            <DetailStat
              icon={<Wallet size={17} />}
              label="Total Spent"
              value={`₹${customer.spent.toLocaleString("en-IN")}`}
            />

            <DetailStat
              icon={<CalendarDays size={17} />}
              label="Joined"
              value={customer.joined}
            />
          </div>

          {/* CUSTOMER INFORMATION */}
          <div className="mt-7">
            <h3 className="mb-4 text-sm font-bold text-slate-900">
              Customer Information
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <InfoBox
                label="Full Name"
                value={customer.name}
              />

              <InfoBox
                label="Email Address"
                value={customer.email}
              />

              <InfoBox
                label="Customer ID"
                value={customer.id}
              />

              <InfoBox
                label="Account Status"
                value={customer.status}
              />
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="mt-7">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Orders
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Latest customer purchases
                </p>
              </div>

              <button className="text-xs font-bold text-violet-600 hover:text-violet-700">
                View all
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 border-b border-slate-100 p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-violet-600">
                        {order.id}
                      </span>

                      <span className="text-[11px] text-slate-400">
                        {order.date}
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {order.product}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <span className="text-sm font-bold text-slate-800">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </span>

                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Close
            </button>

            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700">
              View Customer Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{/*Detail stat */}
function DetailStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
        {icon}
      </div>

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function OrderStatusBadge({ status }) {
  const styles = {
    Delivered: "bg-emerald-50 text-emerald-700",
    Processing: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}


/* TYPE BADGE */

function CustomerTypeBadge({ type }) {
  if (type === "Premium") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-100">
        <Crown size={12} />
        Premium
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700 ring-1 ring-blue-100">
      Regular
    </span>
  );
}

/* STATUS */

function CustomerStatus({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold ${
        isActive
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
          : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
      }`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}
