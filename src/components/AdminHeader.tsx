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
    <header className="sticky top-0 z-40 flex items-center justify-between px-gutter py-4 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant transition-all duration-300">
      {/* Dynamic Title */}
      <div className="flex items-center gap-4">
        <h1 className="font-headline-sm text-headline-sm font-extrabold text-primary">
          {getTitle()}
        </h1>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden lg:block min-w-[320px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant select-none">
            search
          </span>
          <input
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-label-md focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
            placeholder="Search orders, products, analytics..."
            type="text"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-on-secondary-container">
          <button className="text-secondary hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center p-1.5 rounded-full hover:bg-surface-container-high relative">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              notifications
            </span>
            {/* Notification Dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-surface"></span>
          </button>
          <button className="text-secondary hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center p-1.5 rounded-full hover:bg-surface-container-high">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="text-secondary hover:text-primary transition-colors opacity-80 hover:opacity-100 flex items-center justify-center p-1.5 rounded-full hover:bg-surface-container-high">
            <span className="material-symbols-outlined">help</span>
          </button>

          {/* Profile Avatar */}
          <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high ml-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm">
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
