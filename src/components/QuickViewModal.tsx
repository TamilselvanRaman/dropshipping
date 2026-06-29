"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct);
      setQuickViewProduct(null); // Close modal
    }
  };

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Modal Wrapper (stops click propagation to avoid closing) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-3xl overflow-y-auto md:overflow-visible shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Product Image Section */}
              <div className="md:w-1/2 bg-surface-container-low flex items-center justify-center p-6 md:p-8 relative min-h-[220px] md:min-h-0 border-r border-surface-container/50">
                {quickViewProduct.badge && (
                  <span className="absolute top-4 left-4 bg-error text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {quickViewProduct.badge}
                  </span>
                )}
                {/* Visual placeholder using text & gradient style */}
                <div className="w-full aspect-square max-w-[280px] rounded-2xl bg-gradient-to-tr from-primary/10 to-primary-container/20 flex flex-col items-center justify-center p-6 text-center select-none shadow-inner border border-primary/10">
                  <span className="material-symbols-outlined text-[64px] text-primary mb-4 animate-bounce">
                    shopping_bag
                  </span>
                  <p className="font-display-lg text-[22px] font-black text-primary leading-tight">
                    {quickViewProduct.title.split(" ")[0]}
                  </p>
                  <p className="text-label-sm text-on-surface-variant mt-2 font-medium">
                    Premium Shopify Item
                  </p>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center text-yellow-500">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </div>
                    <span className="text-label-md font-bold text-on-surface">
                      {quickViewProduct.rating}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">
                      (Verified Review)
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline-md text-[22px] font-bold text-on-surface mb-3 leading-snug">
                    {quickViewProduct.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-display-lg text-[28px] font-black text-primary">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.oldPrice && (
                      <span className="text-body-md text-on-surface-variant line-through font-medium">
                        {formatPrice(quickViewProduct.oldPrice)}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-surface-container/60 my-4" />

                  {/* Description */}
                  <h4 className="text-label-sm font-bold text-on-surface uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    {quickViewProduct.description ||
                      "This is a premium, high-demand Shopify product designed to deliver exceptional performance, reliability, and modern aesthetics. Perfectly suited for next-generation digital environments."}
                  </p>

                  <ul className="mt-4 space-y-2 text-label-md text-on-surface font-medium">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        check_circle
                      </span>
                      Sustainably sourced premium materials
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        check_circle
                      </span>
                      1-Year Manufacturer Warranty included
                    </li>
                  </ul>
                </div>

                {/* Add to Cart Actions */}
                <div className="mt-8 pt-4 border-t border-surface-container/60">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-on-primary-fixed-variant active:scale-95 transition-all shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                    Add to Cart - {formatPrice(quickViewProduct.price)}
                  </button>
                  <p className="text-center text-[11px] text-on-surface-variant mt-3 flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">
                      local_shipping
                    </span>
                    Free Express Shipping on orders over $50
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
