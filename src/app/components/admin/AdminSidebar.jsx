"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Store,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
              <Store size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                ShopEasy
              </h1>

              <p className="text-xs text-slate-500">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Management
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  size={19}
                  className={`transition-transform duration-200 ${
                    !isActive
                      ? "group-hover:scale-110"
                      : ""
                  }`}
                />

                <span>{item.name}</span>

                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}

          <div className="my-6 border-t border-white/10" />

          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Analytics
          </p>

          <Link
            href="/admin"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <BarChart3
              size={19}
              className="transition-transform group-hover:scale-110"
            />
            <span>Analytics</span>
          </Link>

          <Link
            href="/admin"
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Settings
              size={19}
              className="transition-transform group-hover:rotate-45"
            />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Admin Profile */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 font-bold">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Admin User
              </p>

              <p className="truncate text-xs text-slate-500">
                Store Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}