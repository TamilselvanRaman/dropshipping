"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    // Skip auth checks on login page
    if (pathname === "/admin/login") {
      setChecking(false);
      setAuthorized(false);
      return;
    }

    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin_logged_in");
      if (isLoggedIn === "true") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        router.push("/admin/login");
      }
      setChecking(false);
    }
  }, [pathname, router]);

  // 1. If on login route, bypass the console grid layout frame
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-50 relative overflow-hidden">{children}</div>;
  }

  // 2. Display loading skeleton during auth session resolution
  if (checking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center gap-4 relative overflow-hidden">
        <svg
          className="animate-spin h-10 w-10 text-emerald-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-sm font-bold text-slate-500 animate-pulse relative z-10">
          Verifying Merchant Session...
        </span>
      </div>
    );
  }

  // 3. Fallback loader if not authorized and awaiting redirect push
  if (!authorized) {
    return null;
  }

  // 4. Render main merchant console for verified administrators with standard design
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative overflow-x-hidden flex">
      {/* Standard Left Navigation Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 min-h-screen flex flex-col relative z-10">
        {/* Standard Top Navigation Header */}
        <AdminHeader />

        {/* Dynamic Page Viewport */}
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
