"use client";

import React, { useState } from "react";
import { useCart, Product } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="w-full bg-white rounded-xl product-card-shadow product-card-hover border border-surface-container transition-all duration-300 group p-4 flex flex-col justify-between h-full">
      <div>
        {/* Image Container */}
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-surface-container-low flex items-center justify-center border border-surface-container/30">
          {/* Product Icon Illustration */}
          <div className="w-full h-full bg-gradient-to-tr from-primary/5 to-primary-container/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-500">
            <span className="material-symbols-outlined text-[48px] opacity-75">
              {product.id.includes("tv")
                ? "tv"
                : product.id.includes("chair")
                ? "chair"
                : product.id.includes("camera")
                ? "photo_camera"
                : product.id.includes("headphone")
                ? "headphones"
                : product.id.includes("console")
                ? "videogame_asset"
                : product.id.includes("keyboard")
                ? "keyboard"
                : product.id.includes("laptop")
                ? "laptop"
                : product.id.includes("coffee")
                ? "coffee_maker"
                : "smartphone"}
            </span>
          </div>

          {product.badge && (
            <span className="absolute top-2 left-2 bg-error text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-2 right-2 p-2 bg-white/95 rounded-full shadow hover:bg-primary hover:text-white transition-colors z-10 active:scale-90"
          >
            <span
              className="material-symbols-outlined text-[18px] flex items-center justify-center"
              style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
              data-icon="favorite"
            >
              favorite
            </span>
          </button>

          {/* Quick View Button (hover slide up) */}
          <div className="absolute inset-x-0 bottom-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/40 backdrop-blur-sm z-10">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="w-full bg-primary-container text-on-primary-container py-2 rounded-lg font-bold text-label-sm active:scale-95 transition-all hover:bg-primary hover:text-white shadow"
            >
              Quick View
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1.5 select-none">
          <span
            className="material-symbols-outlined text-yellow-500 text-[14px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
            data-icon="star"
          >
            star
          </span>
          <span className="text-label-sm text-on-surface-variant font-semibold">
            {product.rating}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => setQuickViewProduct(product)}
          className="font-headline-sm text-label-md mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer font-bold leading-snug"
        >
          {product.title}
        </h3>
      </div>

      <div>
        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-headline-sm text-primary font-black">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-label-md text-on-surface-variant line-through font-medium">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
