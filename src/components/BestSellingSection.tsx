"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/context/CartContext";

const BEST_SELLING_PRODUCTS: Product[] = [
  {
    id: "best-console",
    title: "Next-Gen Gaming Console 1TB",
    price: 499,
    oldPrice: 599,
    rating: "4.9 (340)",
    image: "console",
    description: "A powerful white gaming console with its wireless controller resting beside it. Experience smooth gameplay with high-speed SSD load times and immersive graphics capabilities.",
  },
  {
    id: "best-keyboard",
    title: "Mechanical RGB Keyboard",
    price: 120,
    oldPrice: 150,
    rating: "4.7 (180)",
    image: "keyboard",
    description: "High-end mechanical keyboard with vibrant RGB lighting under each keycap. Features mechanical red switches for tactile responsiveness and low click latency.",
  },
  {
    id: "best-laptop",
    title: "Ultra-Slim Laptop 14-inch",
    price: 999,
    oldPrice: 1200,
    rating: "4.8 (95)",
    badge: "RECOMMENDED",
    image: "laptop",
    description: "An ultra-thin silver laptop open on a clean desk, showing a high-resolution workspace interface. Built for performance on-the-go with long battery life.",
  },
  {
    id: "best-coffee",
    title: "Premium Coffee Maker",
    price: 199,
    oldPrice: 250,
    rating: "4.5 (112)",
    image: "coffee",
    description: "A sleek stainless steel espresso machine with a freshly brewed cup of coffee. Experience coffee shop quality espresso, cappuccino, or latte from the comfort of home.",
  },
  {
    id: "best-speaker",
    title: "Smart Home Hub & Speaker",
    price: 89,
    oldPrice: 129,
    rating: "4.4 (76)",
    image: "speaker",
    description: "A minimalist fabric-covered smart speaker sitting on a bedside table next to a lamp. Voice assistant enabled for controlling smart home gadgets and streaming music.",
  },
];

export const BestSellingSection: React.FC = () => {
  return (
    <section className="py-section-desktop">
      <div className="max-w-[1440px] mx-auto px-margin-desktop">
        <h2 className="font-headline-md text-headline-md font-extrabold text-on-surface mb-8">
          Best Selling Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-gutter">
          {BEST_SELLING_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingSection;
