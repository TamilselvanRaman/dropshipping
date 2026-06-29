"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/CartContext";

const DEALS_PRODUCTS: Product[] = [
  {
    id: "deal-tv",
    title: "Ultra HD 4K Smart OLED TV - 55 Inch",
    price: 899,
    oldPrice: 1299,
    rating: "4.8 (120)",
    badge: "30% OFF",
    image: "tv",
    description: "A sleek, thin-bezel OLED television displaying a vibrant, high-contrast image of a colorful coral reef. The TV is mounted on a clean white wall in a minimalist, modern living room setup. Professional studio lighting emphasizes the screen's clarity and the sleek metal frame.",
  },
  {
    id: "deal-chair",
    title: "Ergonomic Mesh Office Chair with Lumbar Support",
    price: 219,
    oldPrice: 349,
    rating: "4.6 (85)",
    badge: "HOT",
    image: "chair",
    description: "A premium ergonomic office chair featuring breathable mesh backrest, adjustable headrest, and polished aluminum armrests. The chair is photographed from a three-quarter angle in a bright, modern office studio with light wood flooring.",
  },
  {
    id: "deal-camera",
    title: "Professional Mirrorless Camera - Silver Edition",
    price: 1750,
    oldPrice: 2100,
    rating: "5.0 (42)",
    badge: "NEW",
    image: "camera",
    description: "A sophisticated silver and black mirrorless camera with a high-quality prime lens attached. The camera is placed on a rustic wooden table with a soft-focus background of an outdoor garden in natural sunlight.",
  },
  {
    id: "deal-headphones",
    title: "Wireless Noise Cancelling Over-Ear Headphones",
    price: 299,
    oldPrice: 399,
    rating: "4.9 (210)",
    badge: "SALE",
    image: "headphones",
    description: "A sleek pair of matte black noise-cancelling headphones resting on a high-end metal headphone stand. The background is a dark, moody tech-studio environment with subtle blue and green accent lighting.",
  },
];

export const DealsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // 12 hours, 45 minutes, 30 seconds = 45930 seconds
  const [timeLeft, setTimeLeft] = useState(45930);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 45930 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUnit = (timeInSecs: number, unit: "h" | "m" | "s") => {
    if (unit === "h") return Math.floor(timeInSecs / 3600).toString().padStart(2, "0");
    if (unit === "m") return Math.floor((timeInSecs % 3600) / 60).toString().padStart(2, "0");
    return (timeInSecs % 60).toString().padStart(2, "0");
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-section-mobile md:mt-section-desktop py-8 md:py-12 bg-white border-y border-surface-container/30">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <h2 className="font-headline-md text-headline-md font-extrabold text-on-surface">
              Deals of the Day
            </h2>
            <div className="flex items-center gap-3 text-on-surface-variant font-medium text-label-md">
              <span className="flex items-center gap-1 text-[13px]">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                Ends in:
              </span>
              <div className="flex gap-1.5 text-on-surface font-black font-mono">
                <span className="bg-surface-container px-2.5 py-1 rounded shadow-sm text-label-md">
                  {formatUnit(timeLeft, "h")}
                </span>
                <span className="self-center">:</span>
                <span className="bg-surface-container px-2.5 py-1 rounded shadow-sm text-label-md">
                  {formatUnit(timeLeft, "m")}
                </span>
                <span className="self-center">:</span>
                <span className="bg-surface-container px-2.5 py-1 rounded shadow-sm text-label-md">
                  {formatUnit(timeLeft, "s")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Scroll Navigation */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
            <a
              className="text-primary font-bold flex items-center gap-1 hover:underline select-none pl-2 text-label-md"
              href="#"
            >
              View All{" "}
              <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-gutter overflow-x-auto hide-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {DEALS_PRODUCTS.map((prod) => (
            <div key={prod.id} className="snap-start min-w-[280px] sm:min-w-[320px]">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
