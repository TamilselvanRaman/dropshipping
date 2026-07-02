"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  RefreshCw,
  Store,
  LogOut,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Products", href: "/admin/products", icon: Package },
    { name: "Manage Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Manage Returns", href: "/admin/returns", icon: RefreshCw },
    { name: "Store Manager", href: "/admin/store-manager", icon: Store },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white z-50 flex flex-col py-6">
      {/* Brand Logo */}
      <div className="px-6 mb-8 flex flex-col gap-1">
        <span className="text-xl font-bold tracking-tight text-white">
          Dropship India
        </span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Merchant Console
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 py-3 px-4 mx-4 rounded-lg transition-colors duration-200 group ${
                active
                  ? "bg-emerald-700 text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800 font-medium"
              }`}
            >
              <IconComponent
                className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                  active ? "text-white" : "text-slate-400 group-hover:text-white"
                }`}
              />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto border-t border-slate-800 pt-4 mx-4">
        <button className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-slate-400 hover:bg-red-950/40 hover:text-red-400 transition-colors duration-200 text-left cursor-pointer group">
          <LogOut className="w-5 h-5 shrink-0 text-red-400 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
