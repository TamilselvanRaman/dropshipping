"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Package,
  RefreshCw,
  CreditCard,
  Star,
  Edit3,
  Plus,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

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
    <div className="space-y-6">
      {/* Bento Dashboard Grid: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-slate-500">Total Sales</p>
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-100">+12.5%</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">₹48.2k</h2>
          </div>
          <div className="h-12 w-full mt-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,35 Q10,15 20,25 T40,10 T60,30 T80,5 T100,20 L100,40 L0,40 Z"
                fill="url(#salesGrad)"
              />
              <path
                d="M0,35 Q10,15 20,25 T40,10 T60,30 T80,5 T100,20"
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-slate-500">Total Orders</p>
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-100">+8.1%</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">1,284</h2>
          </div>
          <div className="h-12 w-full mt-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,30 Q15,10 30,35 T60,15 T100,5 L100,40 L0,40 Z" fill="url(#ordersGrad)" />
              <path
                d="M0,30 Q15,10 30,35 T60,15 T100,5"
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-slate-500">Active Products</p>
              <span className="text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 border border-slate-200">Live</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">842</h2>
          </div>
          <div className="h-12 w-full mt-4 flex items-end justify-between gap-1.5 px-1">
            <div className="bg-slate-300 w-full rounded-t" style={{ height: "40%" }}></div>
            <div className="bg-slate-300 w-full rounded-t" style={{ height: "70%" }}></div>
            <div className="bg-slate-300 w-full rounded-t" style={{ height: "30%" }}></div>
            <div className="bg-emerald-600 w-full rounded-t" style={{ height: "90%" }}></div>
            <div className="bg-emerald-600 w-full rounded-t" style={{ height: "60%" }}></div>
            <div className="bg-slate-300 w-full rounded-t" style={{ height: "25%" }}></div>
          </div>
        </div>

        {/* Return Rate */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-slate-500">Return Rate</p>
              <span className="bg-red-50 text-red-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-red-100">-2.4%</span>
            </div>
            <h2 className="text-3xl font-bold text-red-600 mt-2">3.2%</h2>
          </div>
          <div className="h-12 w-full mt-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="returnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,5 Q30,10 60,35 T100,38 L100,40 L0,40 Z" fill="url(#returnGrad)" />
              <path
                d="M0,5 Q30,10 60,35 T100,38"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Dashboard Row 2: Analytics & Recent Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Analytics Chart Area */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Sales Analytics</h3>
              <p className="text-sm text-slate-500">Daily performance for June 2024</p>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setTimeFilter("week")}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  timeFilter === "week"
                    ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeFilter("month")}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  timeFilter === "month"
                    ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Line Graph */}
          <div className="w-full aspect-[21/9] bg-slate-50 rounded-lg relative overflow-hidden flex items-end px-4 py-8 border border-slate-100">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
              <div className="border-t border-slate-500 w-full"></div>
              <div className="border-t border-slate-500 w-full"></div>
              <div className="border-t border-slate-500 w-full"></div>
              <div className="border-t border-slate-500 w-full"></div>
            </div>

            {/* SVG Graph Path */}
            <svg className="w-full h-full absolute inset-0 p-8" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#059669" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path
                d="M0,250 C100,220 150,180 200,200 S300,100 400,120 S550,50 700,80 S850,200 1000,180 L1000,300 L0,300 Z"
                fill="url(#chartGradient)"
              ></path>
              <path
                d="M0,250 C100,220 150,180 200,200 S300,100 400,120 S550,50 700,80 S850,200 1000,180"
                fill="none"
                stroke="#059669"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
            </svg>

            {/* Interactive Hover Point & Tooltip */}
            <div
              className="absolute top-[80px] left-[70%] h-4 w-4 bg-emerald-600 border-2 border-white rounded-full shadow-md cursor-pointer transition-transform hover:scale-125 z-10"
              onMouseEnter={() => setHoveredPoint(true)}
              onMouseLeave={() => setHoveredPoint(false)}
            >
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg transition-all duration-200 whitespace-nowrap ${
                  hoveredPoint ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <span className="font-bold">₹4,820</span> (June 24)
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center border border-emerald-100">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="flex-1 border-b border-slate-100 pb-3">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">New Order #1204</p>
                  <p className="text-xs text-slate-500 mt-0.5">Lycra Track Pants for Men (Navy)</p>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">2 mins ago</span>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center border border-slate-200">
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex-1 border-b border-slate-100 pb-3">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">Product Sync Success</p>
                  <p className="text-xs text-slate-500 mt-0.5">124 items updated to Shopify store</p>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">1 hour ago</span>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="flex-1 border-b border-slate-100 pb-3">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">Return Request</p>
                  <p className="text-xs text-slate-500 mt-0.5">Refund initiated for order #1189</p>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">3 hours ago</span>
                </div>
              </div>

              {/* Activity Item 4 */}
              <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center border border-emerald-100">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">Payout Credited</p>
                  <p className="text-xs text-slate-500 mt-0.5">Weekly Payout Processed: ₹24,500</p>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            View All History
          </button>
        </div>
      </div>

      {/* Dashboard Row 3: Top Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Top Performing Products</h3>
            <p className="text-sm text-slate-500">Based on revenue and customer satisfaction</p>
          </div>
          <Link href="/admin/products" className="text-emerald-700 font-bold text-sm hover:text-emerald-800 flex items-center gap-1">
            Manage Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200">
                <th className="px-6 py-3">Product Details</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Our Price</th>
                <th className="px-6 py-3">Sales</th>
                <th className="px-6 py-3">Revenue</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topProducts.map((p) => (
                <tr key={p.sku} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200 transition-transform duration-200 group-hover:scale-105">
                        <img className="w-full h-full object-cover" alt={p.name} src={p.image} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-500">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-800">{p.sku}</td>
                  <td className="px-6 py-4 text-xs text-slate-600">{p.price}</td>
                  <td className="px-6 py-4 text-xs text-slate-600">{p.sales}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{p.revenue}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="text-xs font-bold text-slate-700 ml-1">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-emerald-700 p-1.5 rounded-lg hover:bg-slate-150 transition-colors cursor-pointer">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50/50 px-6 py-3 text-center border-t border-slate-100">
          <button className="text-emerald-700 font-bold text-xs hover:text-emerald-800 cursor-pointer">
            Download CSV Performance Report
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-emerald-700 text-white shadow-lg hover:bg-emerald-800 active:scale-95 transition-all flex items-center justify-center group z-40 cursor-pointer">
        <Plus className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
