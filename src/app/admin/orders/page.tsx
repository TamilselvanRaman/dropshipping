"use client";

import React, { useState } from "react";
import {
  Clock,
  Truck,
  CreditCard,
  CheckCircle,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface Order {
  id: string;
  productName: string;
  qty: number;
  variant: string;
  image: string;
  date: string;
  time: string;
  customerName: string;
  customerCity: string;
  customerState: string;
  paymentStatus: "Paid" | "COD Pending" | "Cancelled";
  shippingStatus: "Shipped" | "Pending" | "Delivered" | "N/A";
}

export default function ManageOrders() {
  const [activeTab, setActiveTab] = useState<string>("All Orders");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "DI-92841",
      productName: "Minimalist Ceramic Vase",
      qty: 1,
      variant: "Large / White",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgXJ23r7pnyQvmcu6qf8UOo9gxk6G5Y4FzZQbpELaICaGlrsftXPmRo0E59q1hx8qpgvKEY1WpMwdugblX8MTiMwE-701ZgYEKvRub8v_7ZCycm48WxLaI2PPTwOTUsMfsRV5pAdAPcS0W70ucvmBncggX2fZ35nNCGArAaHW_Lp51NfYiR5qlJsmkLqF46o2TNNSfzQKjR7ST2hLToJdQfqB1-YpqnzikIcIBaaLgZlZBaya_uRWqk3IEIVhccB3ch45QXYhl5o0",
      date: "Jun 27, 2024",
      time: "06:06 PM",
      customerName: "Aryan Sharma",
      customerCity: "Mumbai",
      customerState: "MH",
      paymentStatus: "Paid",
      shippingStatus: "Shipped",
    },
    {
      id: "DI-92840",
      productName: "Premium Leather Wallet",
      qty: 2,
      variant: "Mahogany Brown",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7Osq-WGQ7-oxJWYZqczNh1wd77gQGvv80r20aMyKdBOXZH1nzZEbqGnEFWds8TdZ_7f-2-LYJ7e7klCg9FhqLseecBWlE3JGvv93v-UKKXQl0HCMLzOyP-xBULIkHQID0VpmY-bYZZZIbGOPz-7iIPtzuE5-xv0wVXPeEkJ95xmMZGvK9xCOcdQOae8fgXYqJfa3IbA2zIhOcweRHacab7mNabQJ12OVUPOQXMylCRvrembLlrR_nqGQr6iuq_XKrFTYqJtmQwCI",
      date: "Jun 27, 2024",
      time: "05:42 PM",
      customerName: "Priya Gupta",
      customerCity: "Delhi",
      customerState: "DL",
      paymentStatus: "COD Pending",
      shippingStatus: "Pending",
    },
    {
      id: "DI-92839",
      productName: "Ergo Mechanical Keyboard",
      qty: 1,
      variant: "Wireless / RGB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFrfchwwXjc0OpdhWV7OIaMIz6cFLJ0DNibeHYZbgIXybGkKU6-XTpGNDFRpILdkeVr-nhZM0Bg5N8ONJIcMzajtSfvWfHNCJ7MlqROzVQs4ob9bizWGsK3E4PYaGO6jj3nwgCpcw20F8taeVR_1p5_PITrNRfoVW5SYR1Ixrb01YhCaO7uRgqO9Iy_Uc_fQaramA0j9nY_tbMaTYjM76FYD2qBFpsI5S7Km9aJm1OS5TZPpFTVdvlwjc4zig-JC4uCmbpjWqkQtM",
      date: "Jun 26, 2024",
      time: "11:15 AM",
      customerName: "Karan Singh",
      customerCity: "Bangalore",
      customerState: "KA",
      paymentStatus: "Paid",
      shippingStatus: "Delivered",
    },
    {
      id: "DI-92838",
      productName: "Organic Cotton Tee",
      qty: 3,
      variant: "Olive Green",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg0XwY3kvFgLn3ODo3N-YJ-8gpmrDp7GTeMutNAeSbLJGjh7FdhZ1PC4V2OrTLpaaMT7KnTbCas0FM1Y7HUEyAmKGK0yqT55OxQ6hjBK7fvLCvv279O3t5zSoF7b47Jc2-mExcztvA0qNm46Gsg4Tlwkm0ljFds4WkgPoA_Me5IJkikobrMnmn5IrGHAyEkwVQ1VXdsYfWNjkPnUAKDvn1Jp8LSHa9K-8yuLM2DgcyWFbvuzXlE7q-tPgnV9unyqjZErR5Ywim3HI",
      date: "Jun 26, 2024",
      time: "09:30 AM",
      customerName: "Sneha Reddy",
      customerCity: "Hyderabad",
      customerState: "TS",
      paymentStatus: "Cancelled",
      shippingStatus: "N/A",
    },
  ]);

  // Toast handler
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Shipping updates
  const handleMarkShipped = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          triggerToast(`Order #${orderId} marked as shipped successfully!`);
          return { ...o, shippingStatus: "Shipped" };
        }
        return o;
      })
    );
  };

  // Dynamic stats
  const pendingCount = 42 - (orders.find((o) => o.id === "DI-92840")?.shippingStatus === "Shipped" ? 1 : 0);
  const transitCount = 156 + (orders.find((o) => o.id === "DI-92840")?.shippingStatus === "Shipped" ? 1 : 0);
  const refundedCount = 12;
  const completionRate = "99.2%";

  const tabs = ["All Orders", "Pending", "Confirmed", "Shipped", "Cancelled"];

  const getFilteredOrders = () => {
    switch (activeTab) {
      case "Pending":
        return orders.filter((o) => o.shippingStatus === "Pending");
      case "Confirmed":
        return orders.filter((o) => o.shippingStatus === "Delivered");
      case "Shipped":
        return orders.filter((o) => o.shippingStatus === "Shipped");
      case "Cancelled":
        return orders.filter((o) => o.paymentStatus === "Cancelled");
      default:
        return orders;
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="space-y-6">
      {/* Stats Quick Look Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-700">+12%</span>
          </div>
          <p className="text-slate-500 text-sm font-semibold">Pending Orders</p>
          <h3 className="font-bold text-2xl text-slate-900 mt-1">{pendingCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-700">+8%</span>
          </div>
          <p className="text-slate-500 text-sm font-semibold">In Transit</p>
          <h3 className="font-bold text-2xl text-slate-900 mt-1">{transitCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-700">-$420</span>
          </div>
          <p className="text-slate-500 text-sm font-semibold">Refunded</p>
          <h3 className="font-bold text-2xl text-slate-900 mt-1">{refundedCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-700">99.2%</span>
          </div>
          <p className="text-slate-500 text-sm font-semibold">Completion Rate</p>
          <h3 className="font-bold text-2xl text-slate-900 mt-1">{completionRate}</h3>
        </div>
      </section>

      {/* Table Section Container */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Order Filters & Tabs */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all font-semibold whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "text-emerald-700 bg-emerald-50 border border-emerald-100 font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-250 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>More Filters</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-55 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">Product Details</th>
                <th className="px-6 py-3.5">Order Date</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Payment</th>
                <th className="px-6 py-3.5">Shipping</th>
                <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500 text-sm">
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-bold text-slate-800">{o.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                            alt={o.productName}
                            src={o.image}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 max-w-[180px] truncate leading-tight">
                            {o.productName}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold mt-1 font-mono uppercase">
                            Qty: {o.qty} • {o.variant}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-800 leading-tight">{o.date}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{o.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{o.customerName}</p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {o.customerCity}, {o.customerState}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {o.paymentStatus === "Paid" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Paid
                        </span>
                      )}
                      {o.paymentStatus === "COD Pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          COD Pending
                        </span>
                      )}
                      {o.paymentStatus === "Cancelled" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wide border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {o.shippingStatus === "Shipped" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Shipped
                        </span>
                      )}
                      {o.shippingStatus === "Pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Pending
                        </span>
                      )}
                      {o.shippingStatus === "Delivered" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Delivered
                        </span>
                      )}
                      {o.shippingStatus === "N/A" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wide border border-slate-200">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {o.shippingStatus === "Pending" && o.paymentStatus !== "Cancelled" ? (
                          <button
                            onClick={() => handleMarkShipped(o.id)}
                            className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-700 rounded hover:bg-emerald-800 active:scale-95 transition-all cursor-pointer"
                          >
                            Mark Shipped
                          </button>
                        ) : (
                          <button className="px-2.5 py-1 text-xs font-bold text-emerald-700 border border-slate-200 bg-white rounded hover:bg-slate-50 transition-all active:scale-95 cursor-pointer">
                            Details
                          </button>
                        )}
                        <button className="p-1 text-slate-400 hover:text-slate-800 rounded-md transition-colors active:scale-95 cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-slate-500">Showing 1 to {filteredOrders.length} of 2,402 entries</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-55 transition-colors disabled:opacity-30 cursor-not-allowed" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-emerald-700 text-white rounded-lg text-xs font-bold">1</button>
            <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer">2</button>
            <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer">3</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors cursor-pointer">240</button>
            <button className="p-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-55 transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-900 text-white py-3 px-5 rounded-lg shadow-xl z-[100] transition-all duration-300">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
