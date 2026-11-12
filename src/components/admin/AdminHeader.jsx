"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Package,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { getAuthUser, getStoreAnalytics, getStoredOrders } from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function AdminHeader({ onMenuClick }) {
  const pathname = usePathname();
  const adminUser = useStoreSnapshot(getAuthUser, null, []);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = useStoreSnapshot(
    () => {
      const orders = getStoredOrders();
      const analytics = getStoreAnalytics();

      const notifs = [];
      if (orders.length > 0) {
        notifs.push({
          id: 1,
          icon: ShoppingCart,
          color: "text-indigo-600 bg-indigo-50",
          title: "Recent Order Activity",
          message: `Order ${orders[0].id} (${orders[0].customer}) is currently ${orders[0].status}.`,
          time: orders[0].time || "Recently",
        });
      }

      if (analytics.lowStockProducts > 0) {
        notifs.push({
          id: 2,
          icon: Package,
          color: "text-amber-600 bg-amber-50",
          title: "Inventory Alert",
          message: `${analytics.lowStockProducts} products have low stock and need attention.`,
          time: "Action needed",
        });
      }

      notifs.push({
        id: 3,
        icon: Users,
        color: "text-emerald-600 bg-emerald-50",
        title: "Store Health",
        message: `${analytics.totalCustomers} registered customers and ${analytics.totalProducts} active products in catalog.`,
        time: "Today",
      });

      return notifs;
    },
    [],
    ["shopeasy_sync"]
  );

  const getPageTitle = () => {
    if (pathname.includes("/admin/products/add")) return "Add New Product";
    if (pathname.includes("/admin/products/edit")) return "Edit Product";
    if (pathname.includes("/admin/products")) return "Product Management";
    if (pathname.includes("/admin/orders")) return "Orders & Tracking";
    if (pathname.includes("/admin/customers")) return "Customer Directory";
    if (pathname.includes("/admin/dashboard/profile")) return "Admin Profile & Settings";
    return "Dashboard Overview";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu + Title */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open admin navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-indigo-600 font-bold capitalize">
                {pathname.split("/")[2] || "Dashboard"}
              </span>
            </div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* View Live Store Shortcut */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span>Live Store</span>
            <ExternalLink size={13} />
          </Link>

          {/* Notifications Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40 lg:hidden"
                  onClick={() => setShowNotifications(false)}
                />
                <div
                  className="absolute right-0 top-12 z-50 w-80 max-w-[calc(100vw-2rem)] sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Notifications</h3>
                    <p className="text-[11px] text-slate-400">Live store activity alerts</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-3 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="flex gap-3 py-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                        >
                          <Icon size={17} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900">{item.title}</p>
                          <p className="mt-0.5 text-xs text-slate-500 leading-snug">{item.message}</p>
                          <p className="mt-1 text-[10px] font-semibold text-slate-400">{item.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
            )}
          </div>

          {/* Admin Avatar Badge */}
          <Link
            href="/admin/dashboard/profile"
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-2 pr-3.5 transition hover:border-indigo-200 hover:bg-indigo-50/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-black text-white shadow-xs">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {adminUser?.name || "Administrator"}
              </p>
              <p className="text-[10px] font-medium text-slate-400">Store Manager</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}