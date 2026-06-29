"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col h-full"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  shopping_cart
                </span>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Shopping Cart
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high active:scale-95 transition-all text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    <span className="material-symbols-outlined text-[48px]">
                      shopping_bag
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-[18px] font-bold text-on-surface mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-body-md text-on-surface-variant max-w-[240px] mb-8">
                    Add some premium products to get started on your shopping journey.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="bg-primary text-on-primary font-bold py-3 px-8 rounded-xl hover:bg-on-primary-fixed-variant active:scale-95 transition-all shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 border-b border-surface-container/60 pb-6 last:border-none last:pb-0"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-surface-container">
                      <div className="w-full h-full rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-center text-[10px] px-1 font-sans">
                        {item.product.title.substring(0, 15)}...
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-label-md text-on-surface line-clamp-2 leading-snug">
                          {item.product.title}
                        </h4>
                        <p className="text-label-md font-bold text-primary mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Selector & Remove Button */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-surface-container rounded-lg bg-surface-container-low overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="px-2 py-1 text-on-surface-variant hover:bg-surface-container-high transition-colors font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 text-label-sm font-bold text-on-surface font-mono min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-2 py-1 text-on-surface-variant hover:bg-surface-container-high transition-colors font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 text-[13px] font-semibold"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            delete
                          </span>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-surface-container bg-surface-container-low space-y-4">
                <div className="flex justify-between items-center text-on-surface">
                  <span className="text-body-md font-medium">Subtotal</span>
                  <span className="font-display-lg text-[22px] font-black text-primary">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-label-sm text-on-surface-variant">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => alert("Checkout flow simulation!")}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:bg-on-primary-fixed-variant active:scale-95 transition-all shadow-lg text-center block"
                  >
                    Proceed To Checkout
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full text-center text-label-sm text-on-surface-variant hover:text-primary transition-colors font-semibold py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
