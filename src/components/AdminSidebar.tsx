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
    <aside className="fixed left-0 top-0 bottom-0 flex flex-col py-6 h-screen w-64 border-r border-outline-variant bg-surface dark:bg-on-surface z-50 transition-all duration-300">
      {/* Brand Section */}
      <div className="px-6 mb-8 flex flex-col gap-1">
        <span className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed leading-none">
          Dropship India
        </span>
        <span className="text-label-sm text-secondary opacity-70">
          Premium Merchant Console
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 py-3 px-4 mx-2 rounded-lg transition-all duration-200 active:scale-95 ${
                active
                  ? "bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary font-bold shadow-sm"
                  : "text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high font-medium"
              }`}
            >
              <span
                className="material-symbols-outlined shrink-0"
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-body-md text-body-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto border-t border-outline-variant pt-4 mx-2">
        <button className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-error-container hover:text-on-error-container transition-all duration-200 active:scale-95 text-left">
          <span className="material-symbols-outlined shrink-0">logout</span>
          <span className="font-body-md text-body-md font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
