"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Mail,
  User,
  Clock,
  MapPin,
  Activity,
  Save,
  Settings,
  Lock,
  Store,
  CreditCard,
  Truck,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { getAuthUser, setAuthUser } from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

const DEFAULT_ADMIN = {
  name: "ShopEasy Administrator",
  email: "admin@shopeasy.com",
  role: "Super Administrator",
  phone: "+91 98200 11223",
  department: "Executive Operations",
};

const DEFAULT_STORE_SETTINGS = {
  storeName: "ShopEasy",
  supportEmail: "support@shopeasy.com",
  currency: "INR (₹)",
  freeShippingThreshold: 999,
  taxPercentage: 18,
  orderPrefix: "ORD-",
};

const getStoredSettings = () => {
  try {
    const saved = localStorage.getItem("shopeasy_settings");
    return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
  } catch {
    return DEFAULT_STORE_SETTINGS;
  }
};

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const authUser = useStoreSnapshot(getAuthUser, null, []);
  const savedSettings = useStoreSnapshot(
    getStoredSettings,
    DEFAULT_STORE_SETTINGS,
    []
  );
  const adminKey = JSON.stringify(authUser);
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [editedSettings, setEditedSettings] = useState(null);
  const adminDefaults = {
    ...DEFAULT_ADMIN,
    ...(authUser?.role === "admin"
      ? {
          name: authUser.name || DEFAULT_ADMIN.name,
          email: authUser.email || DEFAULT_ADMIN.email,
        }
      : {}),
  };
  const admin =
    editedAdmin?.key === adminKey ? editedAdmin.value : adminDefaults;
  const settingsKey = JSON.stringify(savedSettings);
  const storeSettings =
    editedSettings?.key === settingsKey
      ? editedSettings.value
      : savedSettings;

  const setAdmin = (value) => {
    setEditedAdmin({
      key: adminKey,
      value: typeof value === "function" ? value(admin) : value,
    });
  };

  const setStoreSettings = (value) => {
    setEditedSettings({
      key: settingsKey,
      value: typeof value === "function" ? value(storeSettings) : value,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      role: "admin",
      name: admin.name,
      email: admin.email,
      avatar: "A",
    };
    setAuthUser(updated);
    toast.success("Administrator profile saved successfully!");
  };

  const handleSaveStoreSettings = (e) => {
    e.preventDefault();
    localStorage.setItem("shopeasy_settings", JSON.stringify(storeSettings));
    toast.success("Store settings updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Admin Details & Store Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Manage administrator profile credentials and general e-commerce store preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition ${
            activeTab === "profile"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <User size={15} />
          <span>Administrator Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition ${
            activeTab === "settings"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Store size={15} />
          <span>Store Configuration</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("logs")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition ${
            activeTab === "logs"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Clock size={15} />
          <span>Access Logs & Security</span>
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              Personal Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={admin.name}
                  onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
                  className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={admin.email}
                  onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                  className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Contact
                </label>
                <input
                  type="text"
                  value={admin.phone}
                  onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
                  className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Department
                </label>
                <input
                  type="text"
                  value={admin.department}
                  onChange={(e) => setAdmin({ ...admin, department: e.target.value })}
                  className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-600 shadow-sm transition"
              >
                <Save size={15} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-black text-white">
                  A
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">
                    {admin.name}
                  </h3>
                  <p className="text-xs text-slate-400">{admin.email}</p>
                  <span className="mt-1 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                    {admin.role}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Role:</span>
                  <span className="font-bold text-slate-900">{admin.role}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Status:</span>
                  <span className="font-bold text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Two-Factor Auth:</span>
                  <span className="font-bold text-emerald-600">Enabled</span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-emerald-50 p-3.5 text-xs text-emerald-800 font-medium">
              Administrator session is authenticated with elevated permissions.
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Store Configuration */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveStoreSettings} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5 max-w-3xl">
          <h2 className="text-base font-black text-slate-900">
            E-Commerce Store Settings
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Store Front Name
              </label>
              <input
                type="text"
                value={storeSettings.storeName}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, storeName: e.target.value })
                }
                className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Customer Support Email
              </label>
              <input
                type="email"
                value={storeSettings.supportEmail}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    supportEmail: e.target.value,
                  })
                }
                className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={storeSettings.freeShippingThreshold}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    freeShippingThreshold: Number(e.target.value),
                  })
                }
                className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Standard GST / Tax Rate (%)
              </label>
              <input
                type="number"
                value={storeSettings.taxPercentage}
                onChange={(e) =>
                  setStoreSettings({
                    ...storeSettings,
                    taxPercentage: Number(e.target.value),
                  })
                }
                className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 text-xs font-medium text-slate-900 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-600 shadow-sm transition"
            >
              <Save size={15} />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Access Logs */}
      {activeTab === "logs" && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900">
            Security & Audit Trail
          </h2>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              {
                action: "Admin signed in via credentials",
                ip: "103.24.120.45",
                time: "Today, 10:42 AM",
                device: "Windows Chrome 124.0",
              },
              {
                action: "Updated product catalog inventory",
                ip: "103.24.120.45",
                time: "Today, 11:15 AM",
                device: "Admin Dashboard",
              },
              {
                action: "Order status marked as Shipped",
                ip: "103.24.120.45",
                time: "Today, 11:28 AM",
                device: "Order Fulfillment",
              },
              {
                action: "Customer directory review",
                ip: "103.24.120.45",
                time: "Today, 11:40 AM",
                device: "Admin Dashboard",
              },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-bold text-slate-900">{log.action}</p>
                  <p className="text-[10px] text-slate-400">
                    IP: {log.ip} · {log.device}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  {log.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}