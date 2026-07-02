"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, Settings, HelpCircle } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();

  // Resolve title dynamically based on path
  const getTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.startsWith("/admin/products")) return "Manage Products";
    if (pathname.startsWith("/admin/orders")) return "Manage Orders";
    if (pathname.startsWith("/admin/returns")) return "Manage Returns";
    if (pathname.startsWith("/admin/store-manager")) return "Store Manager";
    return "Dropship Admin";
  };

  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between transition-all duration-300">
      {/* Dynamic Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-slate-900 leading-none tracking-tight">
          {getTitle()}
        </h1>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden lg:block min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 select-none" />
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-emerald-700/20 focus:bg-white transition-all outline-none text-slate-800"
            placeholder="Search orders, products, analytics..."
            type="text"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button className="text-slate-500 hover:text-emerald-700 hover:bg-slate-100 p-2 rounded-lg transition-all cursor-pointer relative">
            <Bell className="w-5 h-5" />
            {/* Notification Dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="text-slate-500 hover:text-emerald-700 hover:bg-slate-100 p-2 rounded-lg transition-all cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
          <button className="text-slate-500 hover:text-emerald-700 hover:bg-slate-100 p-2 rounded-lg transition-all cursor-pointer">
            <HelpCircle className="w-5 h-5" />
          </button>

          <div className="h-4 bg-slate-200 w-px mx-1 hidden sm:block"></div>

          {/* Profile Avatar */}
          <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer transition-all hover:scale-105 hover:border-emerald-700 shadow-sm">
            <img
              className="w-full h-full object-cover"
              alt="Administrator Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1l6ALKzf8EYi2QN001PvpUe02nnx9WZ_GdkDLGle_GVr88GOfk8kGYikwNDYZzDdCIdRVDAm1SS1U5qXOSejSTrdn8zl3wj_hK75d6pnlIIN4lkppNuqac7Du1pIs7sXvkCZIRXEJdh6s-5ukKAQydzHUjGdSwzmCURjGWqOX5Qfl7-OHG6mJ3eO79szNfy-0dh3g472ThX1MBNNat5iIwvCZV_mGOjuDB-wVBXncMqc-M4ekgVGWjubzxj4ATHe96ZmEj9dpeTA"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
