"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/utils/storeData";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = () => {
      const user = getAuthUser();
      if (user?.role === "admin") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        router.replace("/login/admin");
      }
    };
    verifyAdmin();
    window.addEventListener("auth_changed", verifyAdmin);
    return () => window.removeEventListener("auth_changed", verifyAdmin);
  }, [router]);

  if (!authorized) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm font-semibold text-slate-600">Checking administrator access...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100/90 flex flex-col lg:flex-row">
      {/* Sidebar (drawer on mobile, persistent column on desktop) */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}