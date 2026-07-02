"use client";

import React from "react";
import { usePathname } from "next/navigation";

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
    <header className="sticky top-4 z-40 mx-4 mb-6 px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex items-center justify-between transition-all duration-300">
      {/* Dynamic Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-headline-sm font-black text-primary leading-none tracking-tight">
          {getTitle()}
        </h1>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden lg:block min-w-[320px]">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] select-none">
            search
          </span>
          <input
            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full py-2.5 pl-10 pr-4 text-label-md focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
            placeholder="Search orders, products, analytics..."
            type="text"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-on-secondary-container">
          <button className="text-secondary hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high/40 active:scale-95 cursor-pointer relative">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
            {/* Notification Dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-white"></span>
          </button>
          <button className="text-secondary hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high/40 active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
          <button className="text-secondary hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high/40 active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>

          <div className="h-px bg-outline-variant/30 w-4 rotate-90 hidden sm:block"></div>

          {/* Profile Avatar */}
          <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary/25 bg-surface-container-high cursor-pointer transition-all hover:scale-105 hover:border-primary active:scale-95 shadow-sm">
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
