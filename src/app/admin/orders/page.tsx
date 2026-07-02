"use client";

import React, { useState } from "react";

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

  // State transitions: Shipping an order
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

  // Dynamic statistics calculations
  const pendingCount = 42 - (orders.find((o) => o.id === "DI-92840")?.shippingStatus === "Shipped" ? 1 : 0);
  const transitCount = 156 + (orders.find((o) => o.id === "DI-92840")?.shippingStatus === "Shipped" ? 1 : 0);
  const refundedCount = 12;
  const completionRate = "99.2%";

  // Tabs layout
  const tabs = ["All Orders", "Pending", "Confirmed", "Shipped", "Cancelled"];

  // Filtering products based on selected tab
  const getFilteredOrders = () => {
    switch (activeTab) {
      case "Pending":
        return orders.filter((o) => o.shippingStatus === "Pending");
      case "Confirmed":
        // mock confirmed orders
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
    <div className="p-gutter max-w-[1440px] mx-auto space-y-8 relative">
      {/* Stats Quick Look Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-xs font-bold text-primary">+12%</span>
          </div>
          <p className="text-on-surface-variant font-label-md">Pending Orders</p>
          <h3 className="font-display-lg text-headline-md mt-1">{pendingCount}</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">+8%</span>
          </div>
          <p className="text-on-surface-variant font-label-md">In Transit</p>
          <h3 className="font-display-lg text-headline-md mt-1">{transitCount}</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-tertiary-container/20 rounded-lg text-tertiary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-xs font-bold text-tertiary">-$420</span>
          </div>
          <p className="text-on-surface-variant font-label-md">Refunded</p>
          <h3 className="font-display-lg text-headline-md mt-1">{refundedCount}</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-400">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <span className="text-xs font-bold text-green-700 dark:text-green-400">99.2%</span>
          </div>
          <p className="text-on-surface-variant font-label-md">Completion Rate</p>
          <h3 className="font-display-lg text-headline-md mt-1">{completionRate}</h3>
        </div>
      </section>

      {/* Table Section Container */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/30">
        {/* Order Filters & Tabs */}
        <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-label-md rounded-md transition-colors font-medium whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "text-primary border-b-2 border-primary bg-primary/5 font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-label-md font-bold hover:bg-surface-container-high transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>More Filters</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold shadow-md hover:brightness-110 transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/30 text-on-surface-variant font-label-sm uppercase tracking-wider border-b border-outline-variant/30">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Product Details</th>
                <th className="px-6 py-4 font-semibold">Order Date</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Shipping</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-on-surface-variant text-label-md">
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-surface-container/20 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-label-md font-bold text-on-surface">{o.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/50 shrink-0">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={o.productName}
                            src={o.image}
                          />
                        </div>
                        <div>
                          <p className="font-label-md text-on-surface font-semibold max-w-[180px] truncate leading-tight">
                            {o.productName}
                          </p>
                          <p className="text-[10px] text-on-surface-variant uppercase font-bold mt-0.5">
                            Qty: {o.qty} • {o.variant}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-label-md text-on-surface">{o.date}</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">{o.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-label-md font-semibold text-on-surface">{o.customerName}</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">
                        {o.customerCity}, {o.customerState}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {o.paymentStatus === "Paid" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Paid
                        </span>
                      )}
                      {o.paymentStatus === "COD Pending" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          COD Pending
                        </span>
                      )}
                      {o.paymentStatus === "Cancelled" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-error text-[10px] font-bold uppercase tracking-wide border border-error-container">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {o.shippingStatus === "Shipped" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Shipped
                        </span>
                      )}
                      {o.shippingStatus === "Pending" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-wide border border-outline-variant/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                          Pending
                        </span>
                      )}
                      {o.shippingStatus === "Delivered" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Delivered
                        </span>
                      )}
                      {o.shippingStatus === "N/A" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant/60 text-[10px] font-bold uppercase tracking-wide border border-outline-variant/10">
                          N/A
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {o.shippingStatus === "Pending" && o.paymentStatus !== "Cancelled" ? (
                          <button
                            onClick={() => handleMarkShipped(o.id)}
                            className="px-3 py-1.5 text-label-sm font-bold text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors active:scale-95 cursor-pointer"
                          >
                            Mark Shipped
                          </button>
                        ) : (
                          <button className="px-3 py-1.5 text-label-sm font-bold text-primary border border-primary/20 rounded-md hover:bg-primary/5 transition-colors active:scale-95">
                            Details
                          </button>
                        )}
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high p-1 rounded transition-colors active:scale-95 cursor-pointer">
                          more_vert
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
        <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-label-md text-on-surface-variant">Showing 1 to {filteredOrders.length} of 2,402 entries</p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded hover:bg-surface-container-high transition-colors disabled:opacity-30 cursor-not-allowed" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-3 py-1 rounded bg-primary text-on-primary font-bold text-label-md">1</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container-high transition-colors text-label-md">2</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container-high transition-colors text-label-md">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 rounded hover:bg-surface-container-high transition-colors text-label-md">240</button>
            <button className="p-2 rounded hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 right-10 flex items-center gap-3 bg-on-surface text-surface py-3.5 px-6 rounded-xl shadow-2xl z-[100] transition-all animate-bounce">
          <span className="material-symbols-outlined text-primary-fixed text-xl">check_circle</span>
          <span className="text-label-md font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
