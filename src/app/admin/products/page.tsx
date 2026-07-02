"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  Laptop,
  Shirt,
  Home as HomeIcon,
  Scissors,
  Dumbbell,
  Inbox,
  AlertTriangle,
  CloudUpload,
  Clock,
  Filter,
  Plus,
  Pencil,
  Rocket,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

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
    { name: "All Categories", value: "All", icon: LayoutGrid },
    { name: "Electronics", value: "Electronics", icon: Laptop },
    { name: "Fashion", value: "Fashion", icon: Shirt },
    { name: "Home & Living", value: "Home & Living", icon: HomeIcon },
    { name: "Beauty", value: "Beauty", icon: Scissors },
    { name: "Sports", value: "Sports", icon: Dumbbell },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Quick Filters */}
      <section className="flex gap-3 overflow-x-auto pb-1.5 hide-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          const IconComp = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-emerald-700 border-emerald-700 text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <IconComp className={`w-4 h-4 ${isSelected ? "text-white" : "text-emerald-700"}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </section>

      {/* Stats Overview (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <Inbox className="w-5 h-5" />
            </span>
            <span className="text-emerald-700 font-bold text-xs">+12%</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Total Products</p>
            <h3 className="font-bold text-2xl text-slate-900 mt-1">
              {totalProductsCount.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-red-50 text-red-700 rounded-lg border border-red-100">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <span className="text-red-700 font-bold text-xs">4 Critical</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Low Inventory</p>
            <h3 className="font-bold text-2xl text-slate-900 mt-1">
              {lowInventoryCount}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-slate-50 text-slate-700 rounded-lg border border-slate-250">
              <CloudUpload className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Pushed to Shopify</p>
            <h3 className="font-bold text-2xl text-slate-900 mt-1">
              {pushedCount.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-slate-50 text-slate-700 rounded-lg border border-slate-250">
              <Clock className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Ready to Push</p>
            <h3 className="font-bold text-2xl text-slate-900 mt-1">
              {readyToPushCount.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Product Sourcing List Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Product Sourcing List</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Update your inventory and push products to your Shopify store instantly.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-250 bg-white rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </button>
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer">
              <Plus className="w-4 h-4" />
              Bulk Source
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-55 border-b border-slate-200">
              <tr className="text-slate-500 font-semibold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-3.5">Product Details</th>
                <th className="px-6 py-3.5">Our Price</th>
                <th className="px-6 py-3.5">Selling Price</th>
                <th className="px-6 py-3.5 text-center">Inventory</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const isLowStock = p.inventory <= 15;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden border border-slate-200 shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <img className="w-full h-full object-cover" alt={p.name} src={p.image} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 leading-tight">{p.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            SKU: {p.sku} | ID: {p.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">₹{p.ourPrice.toLocaleString()}</p>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">Excl. Tax</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-emerald-700">₹{p.sellingPrice.toLocaleString()}</p>
                      <span className="text-[10px] text-emerald-700 font-bold px-2 py-0.5 bg-emerald-50 rounded-full mt-1 inline-block border border-emerald-100">
                        {p.margin}% Margin
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center min-w-[100px]">
                        <div className="w-full h-1.5 bg-slate-100 rounded-full max-w-[80px] overflow-hidden border border-slate-200">
                          <div
                            className={`h-full rounded-full transition-all duration-350 ${
                              isLowStock ? "bg-red-500" : "bg-emerald-600"
                            }`}
                            style={{ width: `${(p.inventory / p.maxInventory) * 100}%` }}
                          ></div>
                        </div>
                        {isLowStock ? (
                          <span className="text-[11px] text-red-600 font-bold mt-1.5 flex items-center gap-0.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {p.inventory} left
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500 mt-1.5 font-semibold">
                            {p.inventory} in stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {p.status === "Pushed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Pushed
                        </span>
                      )}
                      {p.status === "Ready to Push" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Ready to Push
                        </span>
                      )}
                      {p.status === "Pushing" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                          <svg
                            className="animate-spin h-3 w-3 text-emerald-700"
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
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <button className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer">
                          <Pencil className="w-4 h-4" />
                        </button>
                        {p.status === "Ready to Push" && (
                          <button
                            onClick={() => handlePush(p.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 active:scale-95 transition-all cursor-pointer"
                          >
                            <Rocket className="w-3.5 h-3.5" />
                            Push
                          </button>
                        )}
                        {p.status === "Pushed" && (
                          <button className="flex items-center gap-1 px-3 py-1 bg-white text-slate-600 rounded-lg text-xs font-bold border border-slate-250 hover:bg-slate-50 transition-all cursor-pointer">
                            <RefreshCw className="w-3.5 h-3.5" />
                            Update
                          </button>
                        )}
                        {p.status === "Pushing" && (
                          <button
                            disabled
                            className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold border border-slate-200 cursor-not-allowed"
                          >
                            <Rocket className="w-3.5 h-3.5 animate-pulse" />
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
        <div className="px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-200">
          <p className="text-xs font-semibold text-slate-500">
            Showing 1 to {filteredProducts.length} of {totalProductsCount.toLocaleString()} products
          </p>
          <div className="flex gap-1">
            <button className="p-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-30 cursor-not-allowed" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-emerald-700 text-white rounded-lg text-xs font-bold">1</button>
            <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer">2</button>
            <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer">3</button>
            <span className="flex items-center px-1 text-slate-400">...</span>
            <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer">248</button>
            <button className="p-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-900 text-white py-3 px-5 rounded-lg shadow-xl z-[100] transition-all duration-300">
          <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
