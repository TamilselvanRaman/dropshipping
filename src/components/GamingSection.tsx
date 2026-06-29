"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/CartContext";

const GAMING_PRODUCTS: Product[] = [
  {
    id: "gaming-console",
    title: "Next-Gen Gaming Console 1TB",
    price: 499,
    oldPrice: 599,
    rating: "4.9",
    image: "console",
    description: "Experience ultra-high speed SSD load times, 4K resolution gaming, and HDR color depths.",
  },
  {
    id: "gaming-keyboard",
    title: "Mechanical RGB Keyboard",
    price: 120,
    oldPrice: 150,
    rating: "4.7",
    image: "keyboard",
    description: "Customizable mechanical keyboard with red switch keys, aluminum top frame, and dedicated volume wheel.",
  },
  {
    id: "gaming-laptop",
    title: "Ultra-Slim Laptop 14-inch",
    price: 999,
    oldPrice: 1200,
    rating: "4.8",
    image: "laptop",
    description: "Lightweight and powerful laptop featuring a 14-inch IPS display, 16GB RAM, and 512GB SSD.",
  },
];

export const GamingSection: React.FC = () => {
  return (
    <section className="py-12 bg-surface-container-low select-none">
      <div className="max-w-[1440px] mx-auto px-margin-desktop">
        {/* Title */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-2.5 h-10 bg-primary rounded-full" />
          <h2 className="font-headline-md text-headline-md font-extrabold text-on-surface">
            Gaming &amp; Electronics
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Left Rig Banner */}
          <div className="lg:w-1/4 rounded-2xl overflow-hidden relative h-[420px] shadow-sm group border border-surface-container/20">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbn3dOl81nwPE9EYVExMbN7hAevOj0PlphZcKoqKSP0Phcx6iOLKtd9s72GGwhccqcbaOdtoHrlZq2JS-HZ7kSKtu1_GdzXw6E8lI4ATFWdbHEQFA_gJA0w6MQzPyOGoQm7NQm1bE_B_xS4SaU8iHuzr_JcWU9QCIWish7DXuR78yiplJFqovdS2CiBab2yUoJUpOFpqqnDyS4keXLmwhiC_sR5Z_wax4JKRt8rZhAF5wq3KKnF7DGHtV1WQohksqxbvVCeBo-yIA')",
              }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/35 to-transparent text-white">
              <h3 className="font-headline-md text-[22px] mb-2 font-bold leading-tight">
                Build Your Rig
              </h3>
              <p className="text-white/70 mb-6 text-label-md font-medium">
                Expert parts for expert players. Custom-engineered components.
              </p>
              <button
                onClick={() => alert("Shop Hardware collection...")}
                className="bg-primary-container text-on-primary-container py-3 px-6 rounded-xl font-bold w-fit hover:bg-white hover:text-primary transition-all active:scale-95 shadow"
              >
                Shop Hardware
              </button>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            {GAMING_PRODUCTS.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingSection;
