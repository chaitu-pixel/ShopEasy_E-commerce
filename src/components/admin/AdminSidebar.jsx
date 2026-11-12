"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ShieldCheck,
  X,
  ExternalLink,
  LogOut,
  UserCheck,
  PlusCircle,
  Tag,
  BarChart3,
} from "lucide-react";
import { getAuthUser, logoutUser, getStoreAnalytics } from "@/utils/storeData";
import toast from "react-hot-toast";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const adminUser = useStoreSnapshot(getAuthUser, null, []);
  const metrics = useStoreSnapshot(
    () => {
      const data = getStoreAnalytics();
      return {
        activeOrders: data.activeOrders,
        lowStockProducts: data.lowStockProducts,
      };
    },
    { activeOrders: 0, lowStockProducts: 0 }
  );

  const handleLogout = () => {
    logoutUser();
    toast.success("Admin signed out");
    router.push("/login");
  };

  const navGroups = [
    {
      title: "Store Overview",
      items: [
        {
          name: "Dashboard",
          href: "/admin/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Store Management",
      items: [
        {
          name: "Products",
          href: "/admin/products",
          icon: Package,
          badge: metrics.lowStockProducts > 0 ? `${metrics.lowStockProducts} alert` : null,
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        },
        {
          name: "Orders",
          href: "/admin/orders",
          icon: ShoppingCart,
          badge: metrics.activeOrders > 0 ? `${metrics.activeOrders} active` : null,
          badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        },
        {
          name: "Customers",
          href: "/admin/customers",
          icon: Users,
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          name: "Admin Profile",
          href: "/admin/dashboard/profile",
          icon: UserCheck,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 text-slate-100 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-18 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/admin/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-600/30">
              <ShieldCheck size={22} />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-white">
                  ShopEasy
                </span>
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-indigo-400">
                  Admin
                </span>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Store Operations
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-4">
          <Link
            href="/admin/products/add"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-500"
          >
            <PlusCircle size={16} />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin/dashboard"
                      ? pathname === "/admin/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                        isActive
                          ? "bg-white text-slate-950 font-bold shadow-sm"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={17}
                          className={
                            isActive
                              ? "text-indigo-600"
                              : "text-slate-400 group-hover:text-white"
                          }
                        />
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick link to live store */}
          <div className="pt-2">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Customer Store
            </p>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>View Live Store</span>
              </div>
              <ExternalLink size={14} className="text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Admin User Card & Logout Footer */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white">
                A
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white">
                  {adminUser?.name || "Store Administrator"}
                </p>
                <p className="truncate text-[10px] text-slate-400">
                  {adminUser?.email || "admin@shopeasy.com"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-rose-400"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}