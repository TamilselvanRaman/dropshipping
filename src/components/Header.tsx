"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  { name: "Smartphones", icon: "smartphone" },
  { name: "Laptops", icon: "laptop" },
  { name: "Cameras", icon: "photo_camera" },
  { name: "Headphones", icon: "headphones" },
  { name: "Gaming", icon: "videogame_asset" },
  { name: "Watches", icon: "watch" },
  { name: "Accessories", icon: "mouse" },
  { name: "Daily Offers", icon: "local_offer" },
];

export const Header: React.FC = () => {
  const { cartCount, cartTotal, setCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container/50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-3 md:py-4 flex flex-col gap-3 md:gap-4">
        
        {/* Main Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-8">
          
          {/* Brand Logo & Mobile Triggers */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-2">
              {/* Hamburger Button for Mobile */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="block md:hidden p-2 rounded-xl hover:bg-surface-container-low active:scale-95 transition-all text-on-surface-variant hover:text-primary"
                title="Menu"
              >
                <span className="material-symbols-outlined text-[26px]">menu</span>
              </button>

              {/* Brand Logo */}
              <Link
                className="font-display-lg text-headline-md md:text-display-lg font-black text-primary flex items-center gap-2 select-none tracking-tight active:scale-95 transition-transform"
                href="/"
              >
                TOKOO
              </Link>
            </div>

            {/* Mobile Actions Group */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                className="relative group transition-all active:scale-95 p-2 rounded-full hover:bg-surface-container-low"
                title="Account"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[24px]">person</span>
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative group transition-all active:scale-95 p-2 rounded-xl hover:bg-surface-container-low select-none"
                title="Cart"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[26px]">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-primary text-on-primary text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:flex-grow md:max-w-2xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-transparent rounded-xl py-2.5 md:py-3 px-11 md:px-12 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-body-md outline-none"
              placeholder="Search for electronics, fashion, and more..."
            />
            <span
              className="material-symbols-outlined absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant select-none"
              data-icon="search"
            >
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 md:right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Desktop Icons Group */}
          <div className="hidden md:flex items-center gap-6">
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

        {/* Main Nav Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-8 border-t border-surface-container pt-3">
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
            Home &amp; Living
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

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-2xl flex flex-col h-full md:hidden text-on-surface"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                <span className="font-display-lg text-headline-sm font-black text-primary">TOKOO MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high active:scale-95 transition-all text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Navigation Links Scroll Container */}
              <div className="flex-grow overflow-y-auto p-5 space-y-6">
                {/* Menu Navigation Pages */}
                <div>
                  <h4 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2.5">
                    Navigation
                  </h4>
                  <div className="flex flex-col gap-1">
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-primary font-bold py-2.5 px-3 rounded-xl bg-primary/5 flex items-center gap-3 text-label-md"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">home</span>
                      Home
                    </a>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-on-surface hover:text-primary py-2.5 px-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3 text-label-md font-semibold"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">devices</span>
                      Electronics
                    </a>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-on-surface hover:text-primary py-2.5 px-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3 text-label-md font-semibold"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">apparel</span>
                      Fashion
                    </a>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-on-surface hover:text-primary py-2.5 px-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3 text-label-md font-semibold"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">bed</span>
                      Home &amp; Living
                    </a>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-on-surface hover:text-primary py-2.5 px-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3 text-label-md font-semibold"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">forest</span>
                      Garden
                    </a>
                    <a
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-error hover:bg-red-50 py-2.5 px-3 rounded-xl transition-colors flex items-center gap-3 text-label-md font-extrabold"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[20px]">local_offer</span>
                      Deals
                    </a>
                  </div>
                </div>

                {/* Shop by Category Departments */}
                <div>
                  <h4 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2.5">
                    Departments
                  </h4>
                  <div className="flex flex-col gap-1">
                    {CATEGORIES.map((cat) => (
                      <a
                        key={cat.name}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-on-surface hover:text-primary py-2.5 px-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3 text-label-md font-semibold"
                        href="#"
                      >
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                          {cat.icon}
                        </span>
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
