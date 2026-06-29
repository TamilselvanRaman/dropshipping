"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/CartContext";

const FLASH_PRODUCTS: Product[] = [
  {
    id: "flash-console",
    title: "Next-Gen Gaming Console 1TB",
    price: 499,
    oldPrice: 599,
    rating: "4.9",
    badge: "LIMITED",
    image: "console",
    description: "A powerful gaming console with 1TB SSD. Play next-gen games at 4K resolution with up to 120 FPS. Limited quantities available during this flash sale.",
  },
  {
    id: "flash-keyboard",
    title: "Mechanical RGB Keyboard",
    price: 120,
    oldPrice: 150,
    rating: "4.7",
    badge: "LIMITED",
    image: "keyboard",
    description: "Tactile mechanical keyboard with customization RGB backlit. High performance switches optimized for gaming and productivity.",
  },
  {
    id: "flash-laptop",
    title: "Ultra-Slim Laptop 14-inch",
    price: 999,
    oldPrice: 1200,
    rating: "4.8",
    badge: "LIMITED",
    image: "laptop",
    description: "14-inch slim, lightweight laptop with premium aluminum body. Powered by high-speed processor, 16GB RAM and fast NVMe storage.",
  },
];

export const FlashSaleSection: React.FC = () => {
  // Let's set the initial countdown: 23 minutes, 45 seconds (1425 seconds)
  const [timeLeft, setTimeLeft] = useState(1425);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 1425 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getHours = () => "00";
  const getMins = () => Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const getSecs = () => (timeLeft % 60).toString().padStart(2, "0");

  return (
    <section className="bg-primary py-12 md:py-16 text-white overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Title & Countdown Info */}
          <div className="lg:w-1/3 flex flex-col justify-center text-center lg:text-left">
            <span className="bg-white/10 text-primary-fixed border border-white/20 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest w-fit mx-auto lg:mx-0 mb-4">
              Flash Deal
            </span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 font-black leading-tight">
              Midnight Flash Sale!
            </h2>
            <p className="text-body-lg opacity-80 mb-8 leading-relaxed font-medium">
              {"Up to 70% off on selected items. Don't miss out, when they're gone, they're gone."}
            </p>
            {/* Live countdown visual boxes */}
            <div className="flex justify-center lg:justify-start gap-4 font-mono font-black text-on-surface">
              <div className="bg-white p-4 rounded-2xl text-center min-w-[90px] shadow-lg">
                <span className="block text-3xl font-black text-primary leading-none">
                  {getHours()}
                </span>
                <span className="text-[10px] uppercase font-bold text-on-secondary-container mt-1.5 block">
                  Hours
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl text-center min-w-[90px] shadow-lg">
                <span className="block text-3xl font-black text-primary leading-none">
                  {getMins()}
                </span>
                <span className="text-[10px] uppercase font-bold text-on-secondary-container mt-1.5 block">
                  Mins
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl text-center min-w-[90px] shadow-lg">
                <span className="block text-3xl font-black text-primary leading-none">
                  {getSecs()}
                </span>
                <span className="text-[10px] uppercase font-bold text-on-secondary-container mt-1.5 block">
                  Secs
                </span>
              </div>
            </div>
          </div>

          {/* Cards Carousel */}
          <div className="lg:w-2/3 flex gap-gutter overflow-x-auto hide-scrollbar py-4 scroll-smooth">
            {FLASH_PRODUCTS.map((prod) => (
              <div key={prod.id} className="min-w-[280px] sm:min-w-[320px]">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;
