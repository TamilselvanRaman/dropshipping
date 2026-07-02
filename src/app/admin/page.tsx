"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ProductRow {
  name: string;
  category: string;
  sku: string;
  price: string;
  sales: number;
  revenue: string;
  rating: number;
  image: string;
}

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState<"week" | "month">("month");
  const [hoveredPoint, setHoveredPoint] = useState<boolean>(false);

  const topProducts: ProductRow[] = [
    {
      name: "Premium Lycra Track Pant",
      category: "Clothing & Apparel",
      sku: "DS08422",
      price: "₹240",
      sales: 412,
      revenue: "₹98,880",
      rating: 4.8,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1r_pGV7rPb8NbeZ9TQp2HZN3Uz8uIBCmpZh6GfRiSrUjGFg7nShkd65OyF_0TSW3zY4Idn0-PqybqgNG0aukcdBI829zAx-inKIf0WPSGHVtR_F_ALb9lL-p0VNhHc98l9qeKybzd34Oqkn9zVN87V3jn7sY-l0C-UDwU490mAc51se7c6aaN4DwZCBH0I1bTLtnsAljiii6C_3EyiO4nUxLG23NqFgiEkgRqtxEEZh8QccCsQgefo4EJ2KOnIebUcfIzcJ6Lwdo",
    },
    {
      name: "Electric Mosquito Killer",
      category: "Home & Kitchen",
      sku: "DS09105",
      price: "₹890",
      sales: 285,
      revenue: "₹2,53,650",
      rating: 4.5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp4S73hFX0t80JQTOcVLQoRHvHJ-AvTdFrLvSeOrfqTIma6V6K8a7YuF-aZg7-LP_MiRSgsRYleH6N2hZdP4ae-mOBBmug7TO1XL9Vvo0K3NtXBaFhrqsxpFE3NR66YP_wXzxUOmnbekHvoK5C9igWOhQHvdDL3BazpzCDVZvR_skfSAsYP9gyvf1_Pee7uqU2iTWfBfCd9pIKpNJV0EVs-u_yfHZGbNvp9aV60qFYMgU8tV4IVlp55YMEGIIqHQd94qeJwOUtYUM",
    },
    {
      name: "ActiveFit Smartwatch",
      category: "Electronics",
      sku: "DS04431",
      price: "₹1,250",
      sales: 158,
      revenue: "₹1,97,500",
      rating: 4.9,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA25ld_97t9w0AGg2XEKDoTP0N8PLLPJXGe54p914PQeb2SKm9aFpfpeXeIaUh2-WI0o0nEv2rFGWhxWfYwMre3tFh8BQ1EaBmu10aeN7wUphvuUgw-WrIBmEU3XIX6auAtNLMVKaioJeTbcqvEIlpl0lhz1N50YqWZFJPkL_Mw_GwJkpU-FXF3qlg4VwuaZfaPJDQgsfHVfLGZJ__XRrK5Pz7jBJaA-0a28c-i0Ew-jYsDTU-DvE3Z2Xz-M8pN7hCyLBKht6wp9jw",
    },
  ];

  return (
    <div className="p-gutter max-w-[1440px] mx-auto space-y-8">
      {/* Bento Dashboard Grid: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-label-md text-on-surface-variant font-medium">Total Sales</p>
              <span className="bg-primary-container/20 text-on-primary-container text-[10px] px-2 py-0.5 rounded-full font-bold">+12.5%</span>
            </div>
            <h2 className="text-display-lg font-display-lg text-primary mt-2">₹48.2k</h2>
          </div>
          <div className="h-12 w-full mt-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path
                d="M0,35 Q10,15 20,25 T40,10 T60,30 T80,5 T100,20"
                fill="none"
                stroke="#016e1c"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-[3]"
              />
            </svg>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-label-md text-on-surface-variant font-medium">Total Orders</p>
              <span className="bg-primary-container/20 text-on-primary-container text-[10px] px-2 py-0.5 rounded-full font-bold">+8.1%</span>
            </div>
            <h2 className="text-display-lg font-display-lg text-on-surface mt-2">1,284</h2>
          </div>
          <div className="h-12 w-full mt-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path
                d="M0,30 Q15,10 30,35 T60,15 T100,5"
                fill="none"
                stroke="#5cb85c"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-[3]"
              />
            </svg>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-label-md text-on-surface-variant font-medium">Active Products</p>
              <span className="text-on-surface-variant text-[10px] px-2 py-0.5 rounded-full font-bold bg-surface-variant">Live</span>
            </div>
            <h2 className="text-display-lg font-display-lg text-on-surface mt-2">842</h2>
          </div>
          <div className="h-12 w-full mt-4 flex items-end justify-between gap-1 px-1">
            <div className="bg-tertiary-container/60 hover:bg-tertiary w-full rounded-t transition-all" style={{ height: "40%" }}></div>
            <div className="bg-tertiary-container/60 hover:bg-tertiary w-full rounded-t transition-all" style={{ height: "70%" }}></div>
            <div className="bg-tertiary-container/60 hover:bg-tertiary w-full rounded-t transition-all" style={{ height: "30%" }}></div>
            <div className="bg-tertiary-container/60 hover:bg-tertiary w-full rounded-t transition-all" style={{ height: "90%" }}></div>
            <div className="bg-tertiary-container/60 hover:bg-tertiary w-full rounded-t transition-all" style={{ height: "60%" }}></div>
            <div className="bg-tertiary-container/60 hover:bg-tertiary w-full rounded-t transition-all" style={{ height: "25%" }}></div>
          </div>
        </div>

        {/* Return Rate */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-label-md text-on-surface-variant font-medium">Return Rate</p>
              <span className="bg-error-container text-on-error-container text-[10px] px-2 py-0.5 rounded-full font-bold">-2.4%</span>
            </div>
            <h2 className="text-display-lg font-display-lg text-error mt-2">3.2%</h2>
          </div>
          <div className="h-12 w-full mt-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path
                d="M0,5 Q30,10 60,35 T100,38"
                fill="none"
                stroke="#ba1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-[3]"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Dashboard Row 2: Analytics & Recent Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Analytics Chart Area */}
        <div className="xl:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Sales Analytics</h3>
              <p className="text-label-md text-on-surface-variant">Daily performance for June 2024</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFilter("week")}
                className={`px-4 py-2 rounded-lg text-label-sm font-bold transition-all ${
                  timeFilter === "week"
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-dim"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeFilter("month")}
                className={`px-4 py-2 rounded-lg text-label-sm font-bold transition-all ${
                  timeFilter === "month"
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-dim"
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Line Graph */}
          <div className="w-full aspect-[21/9] bg-surface-container-low rounded-lg relative overflow-hidden flex items-end px-4 py-8">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
              <div className="border-t border-on-surface w-full"></div>
              <div className="border-t border-on-surface w-full"></div>
              <div className="border-t border-on-surface w-full"></div>
              <div className="border-t border-on-surface w-full"></div>
            </div>

            {/* SVG Graph Path */}
            <svg className="w-full h-full absolute inset-0 p-8" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#016e1c" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#016e1c" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path
                d="M0,250 C100,220 150,180 200,200 S300,100 400,120 S550,50 700,80 S850,200 1000,180 L1000,300 L0,300 Z"
                fill="url(#chartGradient)"
              ></path>
              <path
                d="M0,250 C100,220 150,180 200,200 S300,100 400,120 S550,50 700,80 S850,200 1000,180"
                fill="none"
                stroke="#016e1c"
                strokeLinecap="round"
                strokeWidth="4"
              ></path>
            </svg>

            {/* Interactive Hover Point & Tooltip */}
            <div
              className="absolute top-[80px] left-[70%] h-4 w-4 bg-primary border-4 border-surface rounded-full shadow-lg cursor-pointer transition-transform hover:scale-125 z-10"
              onMouseEnter={() => setHoveredPoint(true)}
              onMouseLeave={() => setHoveredPoint(false)}
            >
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-on-surface text-surface text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl transition-all duration-200 ${
                  hoveredPoint ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-2 pointer-events-none"
                }`}
              >
                <span className="font-bold">₹4,820</span> (June 24)
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {/* Activity Item 1 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                </div>
                <div className="flex-1 border-b border-outline-variant/20 pb-4">
                  <p className="font-body-md font-semibold text-on-surface leading-tight">New Order #1204</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">Lycra Track Pants for Men (Navy)</p>
                  <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mt-1">2 mins ago</span>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-tertiary-container/20 rounded-full flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <div className="flex-1 border-b border-outline-variant/20 pb-4">
                  <p className="font-body-md font-semibold text-on-surface leading-tight">Product Sync Success</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">124 items updated to Shopify store</p>
                  <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mt-1">1 hour ago</span>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-error-container/20 rounded-full flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[20px]">assignment_return</span>
                </div>
                <div className="flex-1 border-b border-outline-variant/20 pb-4">
                  <p className="font-body-md font-semibold text-on-surface leading-tight">Return Request</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">Refund initiated for order #1189</p>
                  <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mt-1">3 hours ago</span>
                </div>
              </div>

              {/* Activity Item 4 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
                <div className="flex-grow">
                  <p className="font-body-md font-semibold text-on-surface leading-tight">Payout Credited</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">Weekly settlement processed: ₹24,500</p>
                  <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mt-1">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-3 border border-outline text-label-md font-bold text-on-surface rounded-lg hover:bg-surface-container-high transition-colors active:scale-98">
            View All History
          </button>
        </div>
      </div>

      {/* Dashboard Row 3: Top Products Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Top Performing Products</h3>
            <p className="text-label-md text-on-surface-variant">Based on revenue and customer satisfaction</p>
          </div>
          <Link href="/admin/products" className="text-primary font-bold text-label-md hover:underline flex items-center gap-1">
            Manage Products
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant uppercase text-[11px] font-bold tracking-widest border-b border-outline-variant/30">
                <th className="px-8 py-4">Product Details</th>
                <th className="px-8 py-4">SKU</th>
                <th className="px-8 py-4">Our Price</th>
                <th className="px-8 py-4">Sales</th>
                <th className="px-8 py-4">Revenue</th>
                <th className="px-8 py-4">Rating</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {topProducts.map((p) => (
                <tr key={p.sku} className="hover:bg-surface-container/30 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-surface-variant overflow-hidden shrink-0 border border-outline-variant/50">
                        <img className="w-full h-full object-cover" alt={p.name} src={p.image} />
                      </div>
                      <div>
                        <p className="font-body-md font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                          {p.name}
                        </p>
                        <p className="text-label-sm text-on-surface-variant mt-0.5">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-label-md font-mono text-on-surface">{p.sku}</td>
                  <td className="px-8 py-4 text-label-md text-on-surface-variant">{p.price}</td>
                  <td className="px-8 py-4 text-label-md text-on-surface-variant">{p.sales}</td>
                  <td className="px-8 py-4 text-label-md font-bold text-on-surface">{p.revenue}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center text-primary">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-label-md font-bold ml-1">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-surface-container-low px-8 py-4 text-center border-t border-outline-variant/30">
          <button className="text-primary font-bold text-label-md hover:underline active:scale-98">
            Download CSV Performance Report
          </button>
        </div>
      </div>

      {/* Sticky FAB for Quick Action */}
      <button className="fixed bottom-8 right-8 h-14 w-14 rounded-2xl bg-primary text-on-primary shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group z-40">
        <span className="material-symbols-outlined">add</span>
        <span className="absolute right-full mr-4 bg-on-surface text-surface text-[12px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none duration-250 translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-lg">
          Add New Product
        </span>
      </button>
    </div>
  );
}
