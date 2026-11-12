"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  ShoppingBag,
  Edit3,
  Clock3,
  CheckCircle2,
  Truck,
  ChevronRight,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getAuthUser,
  getStoredOrders,
  logoutUser,
  setAuthUser,
  updateCustomerAccount,
} from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function ProfilePage() {
  const router = useRouter();
  const profileData = useStoreSnapshot(
    () => ({ user: getAuthUser(), orders: getStoredOrders() }),
    { user: null, orders: [] }
  );
  const user = profileData.user;
  const customerOrders = useMemo(() => {
    if (!user) return [];

    return profileData.orders.filter(
      (order) =>
        (order.email || "").toLowerCase() ===
          (user.email || "").toLowerCase() ||
        (order.customer || "")
          .toLowerCase()
          .includes((user.name || "").toLowerCase())
    );
  }, [profileData.orders, user]);
  const [isEditing, setIsEditing] = useState(false);
  const userKey = JSON.stringify(user);
  const [editedForm, setEditedForm] = useState(null);
  const editFormDefaults = {
    name: user?.name || "Customer",
    email: user?.email || "customer@example.com",
    phone: user?.phone || "",
    city: user?.city || "",
  };
  const editForm =
    editedForm?.userKey === userKey ? editedForm.value : editFormDefaults;
  const setEditForm = (value) => {
    setEditedForm({
      userKey,
      value: typeof value === "function" ? value(editForm) : value,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      city: editForm.city,
    };
    setAuthUser(updated);
    updateCustomerAccount(user.email, { name: updated.name, email: updated.email, phone: updated.phone, city: updated.city });
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <User size={14} />
                <span>Customer Account</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Profile & Orders
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Manage personal account settings, tracking updates, and order history.
              </p>
            </div>

            {user?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-600 transition w-fit"
              >
                <ShieldCheck size={16} />
                <span>Go to Admin Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Profile Body */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Left: User Card */}
          <aside className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden h-fit">
            <div className="h-24 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700" />
            <div className="px-6 pb-6">
              <div className="-mt-12 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-slate-900 text-2xl font-black text-white shadow-md">
                {user?.avatar || user?.name?.[0] || "C"}
              </div>

              <div className="mt-3">
                <h2 className="text-lg font-black text-slate-900">
                  {user?.name || "Guest Shopper"}
                </h2>
                <p className="text-xs text-slate-500">
                  {user?.email || "guest@shopeasy.com"}
                </p>
                <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  {user ? "Active Customer" : "Guest"}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">
                    Orders
                  </p>
                  <p className="mt-0.5 text-lg font-black text-slate-900">
                    {customerOrders.length}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">
                    Tier
                  </p>
                  <p className="mt-0.5 text-lg font-black text-indigo-600">
                    Prime
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-1.5 border-t border-slate-100 pt-4 text-xs font-semibold">
                <Link
                  href="/cart"
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={15} />
                    <span>My Shopping Cart</span>
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                <Link
                  href="/wishlist"
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-2">
                    <Heart size={15} />
                    <span>Saved Wishlist</span>
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>

                {user && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut size={15} />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Right: Info and Orders */}
          <div className="space-y-6">
            {/* Account Details Box */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-slate-900">
                  Account Details
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  <Edit3 size={14} />
                  <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City / Region</label>
                      <input
                        type="text"
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        className="w-full h-10 rounded-xl border border-slate-200 px-3 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-600"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Name</p>
                    <p className="font-bold text-slate-800 mt-0.5">{user?.name || "Rahul Sharma"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                    <p className="font-bold text-slate-800 mt-0.5">{user?.email || "rahul.sharma@gmail.com"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Phone</p>
                    <p className="font-bold text-slate-800 mt-0.5">{editForm.phone}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
                    <p className="font-bold text-slate-800 mt-0.5">{editForm.city}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Orders Tracking History */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Recent Orders & Live Fulfillment
                  </h3>
                  <p className="text-xs text-slate-400">
                    Status updates synced directly with warehouse admin dispatch
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {customerOrders.length} Orders
                </span>
              </div>

              {customerOrders.length > 0 ? (
                <div className="space-y-3">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-indigo-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-indigo-600 text-xs">
                              {ord.id}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              · {ord.date}
                            </span>
                          </div>
                          <p className="mt-1 text-xs font-bold text-slate-900">
                            {ord.product}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {ord.items?.length || 1} item(s) · Payment: {ord.paymentMethod} ({ord.payment})
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0">
                          <span className="text-sm font-black text-slate-900">
                            ₹{Number(ord.amount).toLocaleString("en-IN")}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                              ord.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : ord.status === "Shipped"
                                ? "bg-indigo-100 text-indigo-800"
                                : ord.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : ord.status === "Cancelled"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-400">
                  <ShoppingBag size={32} className="mx-auto mb-2 text-slate-300" />
                  No orders placed yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}