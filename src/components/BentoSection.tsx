"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/CartContext";

const BENTO_PRODUCTS: Product[] = [
  {
    id: "featured-1",
    title: "Minimalist Leather Tablet Case",
    price: 199,
    oldPrice: 299,
    rating: "4.9 (48)",
    badge: "FEATURED",
    image: "tablet-case",
    description: "Premium leather tablet case with soft microfiber interior lining and magnetic closure. Handcrafted from top-grain leather that develops a beautiful patina over time.",
  },
  {
    id: "featured-2",
    title: "Designer High-Capacity Power Bank",
    price: 199,
    oldPrice: 299,
    rating: "4.9 (32)",
    badge: "FEATURED",
    image: "power-bank",
    description: "A clean, compact designer power bank with 20,000mAh capacity. Features dual USB-C Power Delivery ports for fast charging your laptop, tablet, or phone.",
  },
  {
    id: "featured-3",
    title: "Sleek Aluminum Laptop Stand",
    price: 199,
    oldPrice: 299,
    rating: "4.9 (64)",
    badge: "FEATURED",
    image: "laptop-stand",
    description: "An ergonomic brushed aluminum laptop stand that elevates your screen to eye level. Promotes better posture and improves laptop airflow for cooling.",
  },
  {
    id: "featured-4",
    title: "Wireless Desktop Charging Pad",
    price: 199,
    oldPrice: 299,
    rating: "4.9 (55)",
    badge: "FEATURED",
    image: "charging-pad",
    description: "Multi-device wireless charging station made from sustainably sourced walnut wood and premium felt. Supports Qi fast charging for phone, watch, and earbuds.",
  },
];

export const BentoSection: React.FC = () => {
  return (
    <section className="py-section-mobile md:py-section-desktop select-none">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Vertical Banner Card */}
          <div className="col-span-12 lg:col-span-4 rounded-[2rem] overflow-hidden relative group h-[400px] lg:h-auto lg:min-h-[600px] shadow-sm border border-surface-container/20">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPTocm8yCCanCdnN1k4AcuSHgjOXH01WUMS9wJuZero_ZM2cMGH9W950-YCV-CXhfcj7U45esRGiAUOn8cC1IJ1P7CYsVRNcC8z3prfRBaC-DWgbIpfEKnQbXD_7WpTGne8VFutSrplnLQQtWrr7jRJRZm0Xn3eMIpR_xaXQStgqyd6GG7i3gPYhp8Xno6xdtTNfQc4lZiQurboJEPvs3GN8ms6R2o0qUyDIdzNtEBNvuwZKgJjDNw68kF-_ypu9DYKZvkkbS_KHk')",
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 md:p-12 flex flex-col justify-end text-white">
              <span className="bg-white/10 text-white border border-white/20 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
                Lookbook 2026
              </span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 font-black leading-tight">
                Urban Luxe Collection
              </h2>
              <p className="text-white/70 mb-8 text-body-lg leading-relaxed font-medium">
                Reimagining modern city style with sustainably sourced materials and timeless silhouettes.
              </p>
              <button
                onClick={() => alert("Redirecting to Lookbook Collection...")}
                className="bg-white text-primary font-bold py-4 px-10 rounded-xl w-fit hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
              >
                Explore Lookbook
              </button>
            </div>
          </div>

          {/* Grid of Product Cards */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter h-full">
            {BENTO_PRODUCTS.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
