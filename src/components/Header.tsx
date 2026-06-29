"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const { cartCount, cartTotal, setCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container/50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-margin-desktop py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-8">
          {/* Brand Logo */}
          <a
            className="font-display-lg text-display-lg font-black text-primary flex items-center gap-2 select-none tracking-tight active:scale-95 transition-transform"
            href="/"
          >
            TOKOO
          </a>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-transparent rounded-xl py-3 px-12 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-body-md outline-none"
              placeholder="Search for electronics, fashion, and more..."
            />
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant select-none"
              data-icon="search"
            >
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Icons Group */}
          <div className="flex items-center gap-6">
            <button
              className="relative group transition-all active:scale-95 p-2 rounded-full hover:bg-surface-container-low"
              title="Compare"
            >
              <span
                className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                data-icon="compare_arrows"
              >
                compare_arrows
              </span>
            </button>

            <button
              className="relative group transition-all active:scale-95 p-2 rounded-full hover:bg-surface-container-low"
              title="Wishlist"
            >
              <span
                className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                data-icon="favorite"
              >
                favorite
              </span>
              <span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            <button
              className="relative group transition-all active:scale-95 p-2 rounded-full hover:bg-surface-container-low"
              title="Account"
            >
              <span
                className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                data-icon="person"
              >
                person
              </span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative group transition-all active:scale-95 flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-low select-none"
              title="Cart"
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[28px]"
                  data-icon="shopping_cart"
                >
                  shopping_cart
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-label-sm leading-tight text-on-surface-variant font-medium">My Cart</p>
                <p className="text-label-md leading-tight font-bold text-on-surface">
                  {formatPrice(cartTotal)}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Main Nav Links */}
        <nav className="flex items-center gap-8 border-t border-surface-container pt-3">
          <a
            className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md transition-all"
            href="#"
          >
            Home
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-medium"
            href="#"
          >
            Electronics
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-medium"
            href="#"
          >
            Fashion
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-medium"
            href="#"
          >
            Home & Living
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-medium"
            href="#"
          >
            Garden
          </a>
          <a
            className="text-error hover:text-red-700 transition-colors font-body-md text-body-md font-semibold flex items-center gap-1"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">local_offer</span>
            Deals
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
