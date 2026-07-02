"use client";

import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  sku: string;
  ourPrice: number;
  sellingPrice: number;
  margin: number;
  inventory: number;
  maxInventory: number;
  status: "Pushed" | "Ready to Push" | "Pushing";
  image: string;
  category: string;
}

export default function ManageProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Product Data
  const [products, setProducts] = useState<Product[]>([
    {
      id: "882190",
      name: "Pro Audio Wireless Gen 2",
      sku: "DS-AUD-9204",
      ourPrice: 2490,
      sellingPrice: 4999,
      margin: 50,
      inventory: 846,
      maxInventory: 1000,
      status: "Pushed",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxFwZyn5Tg5leq6YquHtwru7WQoaMzrPxltWjvMs6KWYopKCWaSz8P3WWtaGnr3dI81e0mQK3zwFT2mWXR60cW9SiYC6H-JlIruNXEdin_C4eVaDRrnE6VZHnksL92ucjGYjXwIsso_p7C6mfUm2XEHmOzM_foVWqZ-jaR5m3q3sJeOx-7_VEcEUqAFGo3xFT7Xr2xlvuQX8dOoAQ4VWWIG_d7881yqUWGnZW5vjFHZRR_c8kRHPDk4uaJrBl_o9e2oC0PHCZhfdI",
      category: "Electronics",
    },
    {
      id: "771201",
      name: "Vantage Smart Series X",
      sku: "DS-WTH-1102",
      ourPrice: 1120,
      sellingPrice: 2850,
      margin: 60,
      inventory: 12,
      maxInventory: 100,
      status: "Ready to Push",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDaJkMT53c4cofGI88IQ-mzzAFCwsnnEAFAamCPG8jXH6Mm2ggyVjPyhRnO7z7X1lNCcpSVSFvU3hQTAm5LD3Y4Dll7c3j2TUKfJUDVpY06_DuZRVUl-coe-FuL7wdFMiig9CqkqOCm8JnhqPh31zIzgL1DVhdycNFodEcGednYxZnSvZMBjxwqiI61hzILnLEBrLARQxoOAqDVJYDvzXpQ59jByHlPsxU8lkqtMND-XAD8tpOlpBT9LeTk2l6Tz7jc--kS9MHWB0",
      category: "Electronics",
    },
    {
      id: "990123",
      name: "Artisan Ceramic Brew Set",
      sku: "DS-HOM-4412",
      ourPrice: 840,
      sellingPrice: 1999,
      margin: 58,
      inventory: 156,
      maxInventory: 300,
      status: "Pushed",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQe_1a7BkmlftPCoKa1rlqvkY63h63uX7lTAH6wJKEYds7_PoxyDEaz0-dDbKPoc2TjVW53AGHvu7WstNjir3DneHZnUf81ih6K2vM-s1Lmpk7CREFD5n2JSvwdqobVubRrOLU5nVGZB77o0nSQdAEz65ONcA09uzSoBzThJm-wwp5nusuBjohwKOimIoKWbt3JoiYXPYy4fxklMddV1kqC_2HX4utAGx35eXd7AwDiLr6Orp0ve8Nc_IYQzn5X1iMLQ3o_w62RWs",
      category: "Home & Living",
    },
  ]);

  // Derived Stats
  const totalProductsCount = 2480;
  const lowInventoryCount = 24;
  const pushedCount = 1902 + products.filter((p) => p.status === "Pushed").length - 2;
  const readyToPushCount = 578 - (products.filter((p) => p.status === "Pushed").length - 2);

  // Trigger Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Push simulation
  const handlePush = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: "Pushing" } : p))
    );

    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === productId) {
            showToast(`${p.name} pushed to Shopify successfully!`);
            return { ...p, status: "Pushed" };
          }
          return p;
        })
      );
    }, 1500);
  };

  const categories = [
    { name: "All Categories", value: "All", icon: "grid_view" },
    { name: "Electronics", value: "Electronics", icon: "devices" },
    { name: "Fashion", value: "Fashion", icon: "apparel" },
    { name: "Home & Living", value: "Home & Living", icon: "chair" },
    { name: "Beauty", value: "Beauty", icon: "content_cut" },
    { name: "Sports", value: "Sports", icon: "fitness_center" },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-4 max-w-[1440px] mx-auto space-y-6 relative">
      {/* Category Quick Filters */}
      <section className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-gradient-to-r from-primary to-primary-container text-white shadow-md -translate-y-0.5"
                  : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-on-surface hover:bg-surface-container-high/40 border border-white/20 dark:border-slate-800/40 shadow-sm"
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isSelected ? "text-white" : "text-primary"}`}>
                {cat.icon}
              </span>
              <span className="font-label-md text-label-md">{cat.name}</span>
            </button>
          );
        })}
      </section>

      {/* Stats Overview (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-3 bg-primary/10 text-primary rounded-xl">
              inventory
            </span>
            <span className="text-primary font-bold text-label-sm">+12%</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-md">Total Products</p>
            <h3 className="font-display-lg text-headline-md text-on-surface mt-1">
              {totalProductsCount.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-3 bg-error-container/30 text-error rounded-xl">
              warning
            </span>
            <span className="text-error font-bold text-label-sm">4 Critical</span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-md">Low Inventory</p>
            <h3 className="font-display-lg text-headline-md text-on-surface mt-1">
              {lowInventoryCount}
            </h3>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-3 bg-secondary-container/20 text-secondary rounded-xl">
              cloud_upload
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-md">Pushed to Shopify</p>
            <h3 className="font-display-lg text-headline-md text-on-surface mt-1">
              {pushedCount.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-3 bg-tertiary-container/15 text-tertiary rounded-xl">
              pending_actions
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant font-label-md">Ready to Push</p>
            <h3 className="font-display-lg text-headline-md text-on-surface mt-1">
              {readyToPushCount.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Product Sourcing List Table */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 overflow-hidden">
        <div className="px-8 py-6 border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest/30">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Product Sourcing List</h3>
            <p className="text-label-md text-on-surface-variant mt-0.5">
              Update your inventory and push products to your Shopify store instantly.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant/50 bg-white/50 dark:bg-slate-900/50 rounded-xl text-label-md font-bold hover:bg-surface-container-high/40 transition-colors active:scale-98 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Advanced Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl text-label-md font-bold hover:brightness-110 transition-all shadow-md active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Bulk Source
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/40 border-b border-outline-variant/20">
              <tr className="text-on-surface-variant font-label-md text-label-sm uppercase tracking-widest text-[11px]">
                <th className="px-8 py-4">Product Details</th>
                <th className="px-6 py-4">Our Price</th>
                <th className="px-6 py-4">Selling Price</th>
                <th className="px-6 py-4 text-center">Inventory</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredProducts.map((p) => {
                const isLowStock = p.inventory <= 15;
                return (
                  <tr key={p.id} className="hover:bg-surface-container/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-surface-container-high overflow-hidden border border-outline-variant/30 shrink-0 transition-transform duration-300 group-hover:scale-105">
                          <img className="w-full h-full object-cover" alt={p.name} src={p.image} />
                        </div>
                        <div>
                          <h4 className="font-body-md font-bold text-on-surface leading-tight">{p.name}</h4>
                          <p className="text-[12px] text-on-surface-variant mt-1 font-medium opacity-80">
                            SKU: {p.sku} | ID: {p.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-body-md font-bold text-on-surface">₹{p.ourPrice.toLocaleString()}</p>
                      <span className="text-[11px] text-on-surface-variant font-medium opacity-80 mt-0.5 block">Excl. Tax</span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-body-md font-bold text-primary">₹{p.sellingPrice.toLocaleString()}</p>
                      <span className="text-[11px] text-on-primary-container font-bold px-2.5 py-0.5 bg-primary-container/20 rounded-full mt-1.5 inline-block border border-primary-container/10">
                        {p.margin}% Margin
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center min-w-[120px]">
                        <div className="w-full h-2 bg-surface-container-high rounded-full max-w-[100px] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isLowStock ? "bg-error" : "bg-primary"
                            }`}
                            style={{ width: `${(p.inventory / p.maxInventory) * 100}%` }}
                          ></div>
                        </div>
                        {isLowStock ? (
                          <span className="text-label-sm text-error font-bold mt-2.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            {p.inventory} left
                          </span>
                        ) : (
                          <span className="text-label-sm text-on-surface-variant font-medium mt-2.5">
                            {p.inventory} in stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {p.status === "Pushed" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-container/20 text-on-primary-container text-label-sm font-bold rounded-full border border-primary-container/10">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                          Pushed
                        </span>
                      )}
                      {p.status === "Ready to Push" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high/40 text-on-surface-variant text-label-sm font-bold rounded-full border border-outline-variant/30">
                          <span className="w-2 h-2 rounded-full bg-outline"></span>
                          Ready to Push
                        </span>
                      )}
                      {p.status === "Pushing" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/20 text-on-secondary-container text-label-sm font-bold rounded-full border border-outline-variant/20">
                          <svg
                            className="animate-spin h-3.5 w-3.5 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Pushing...
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-high/40 transition-colors active:scale-95 cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        {p.status === "Ready to Push" && (
                          <button
                            onClick={() => handlePush(p.id)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-label-sm font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                            Push to Shopify
                          </button>
                        )}
                        {p.status === "Pushed" && (
                          <button className="flex items-center gap-1.5 px-4 py-2 bg-surface-container-highest/60 text-on-surface-variant rounded-xl text-label-sm font-bold border border-outline-variant/30 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 cursor-pointer">
                            <span className="material-symbols-outlined text-[16px]">refresh</span>
                            Update
                          </button>
                        )}
                        {p.status === "Pushing" && (
                          <button
                            disabled
                            className="flex items-center gap-1.5 px-4 py-2 bg-surface-container-high text-on-surface-variant/40 rounded-xl text-label-sm font-bold border border-outline-variant/20 cursor-not-allowed"
                          >
                            <span className="material-symbols-outlined text-[16px] animate-pulse">rocket_launch</span>
                            Pushing...
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-8 py-5 bg-surface-container-low/30 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/30">
          <p className="text-label-md text-on-surface-variant font-medium">
            Showing 1 to {filteredProducts.length} of {totalProductsCount.toLocaleString()} products
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant/40 bg-white/40 dark:bg-slate-900/40 rounded-lg hover:bg-surface-container-high/40 transition-colors disabled:opacity-30 cursor-not-allowed" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 bg-primary text-white rounded-lg text-label-md font-bold">1</button>
            <button className="w-10 h-10 hover:bg-surface-container-high/40 rounded-lg text-label-md transition-colors cursor-pointer">2</button>
            <button className="w-10 h-10 hover:bg-surface-container-high/40 rounded-lg text-label-md transition-colors cursor-pointer">3</button>
            <span className="flex items-center px-2">...</span>
            <button className="w-10 h-10 hover:bg-surface-container-high/40 rounded-lg text-label-md transition-colors cursor-pointer">248</button>
            <button className="p-2 border border-outline-variant/40 bg-white/40 dark:bg-slate-900/40 rounded-lg hover:bg-surface-container-high/40 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-10 right-10 flex items-center gap-3 bg-on-surface text-surface py-3.5 px-6 rounded-xl shadow-2xl z-[100] transition-all animate-bounce">
          <span className="material-symbols-outlined text-primary-fixed text-xl">check_circle</span>
          <span className="text-label-md font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
