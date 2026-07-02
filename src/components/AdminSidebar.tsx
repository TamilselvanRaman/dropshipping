"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "Manage Products", href: "/admin/products", icon: "inventory_2" },
    { name: "Manage Orders", href: "/admin/orders", icon: "shopping_cart" },
    { name: "Manage Returns", href: "/admin/returns", icon: "assignment_return" },
    { name: "Store Manager", href: "/admin/store-manager", icon: "storefront" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-60 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] z-50 flex flex-col py-6 transition-all duration-300">
      {/* Brand Section */}
      <div className="px-6 mb-8 flex flex-col gap-1.5">
        <span className="font-headline-sm text-headline-sm font-black text-primary dark:text-primary-fixed leading-none tracking-tight">
          Dropship India
        </span>
        <span className="text-[11px] text-on-surface-variant font-bold opacity-60 uppercase tracking-wider">
          Merchant Console
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 py-3 px-4 mx-3 rounded-xl transition-all duration-300 active:scale-95 group ${
                active
                  ? "bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-md shadow-primary/10"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/60 font-medium"
              }`}
            >
              <span
                className={`material-symbols-outlined shrink-0 text-[20px] transition-transform duration-300 group-hover:scale-105 ${
                  active ? "text-white" : "text-primary"
                }`}
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-body-md text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto border-t border-outline-variant/30 pt-4 mx-3">
        <button className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-on-surface-variant hover:bg-error-container/20 hover:text-error transition-all duration-200 active:scale-95 text-left cursor-pointer group">
          <span className="material-symbols-outlined shrink-0 text-[20px] text-error opacity-75 group-hover:opacity-100 transition-opacity">
            logout
          </span>
          <span className="font-body-md text-label-md font-bold text-on-surface-variant group-hover:text-error transition-colors">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
