"use client";

import React, { useState } from "react";

interface ReturnRequest {
  id: string;
  productName: string;
  productDesc: string;
  image: string;
  shopifyId: string;
  orderDate: string;
  orderTime: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "PICKED UP";
  reason: string;
}

export default function ManageReturns() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<ReturnRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Initial State
  const [returns, setReturns] = useState<ReturnRequest[]>([
    {
      id: "RET-45812",
      productName: "ShopEleven Abs 4",
      productDesc: "Roller Exercise Wheel",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVLzHEOZxhLF8TrH3vRvJWoKvY2UjQUXro9Zg0KrNlB_Yd31842wFOFxrs4zUBdYFvsZ6X7-F8w8ZFA1_y9I9Yt5M0lmNxodR2Ob9wzEM1anxYE4g14M25ubbulvVl1oEMO0DNYMXawetxBacbtFzC9CRKQ7Mwvz6Jlpy4Z7IYHAmQgqcYdWHQkXv6xePr4BaW-AUoGdcMgrLNlBE390f8dGosZ0soAblGdQPdkgfftK7FNvWDdaffWCk3PVJ1FQsqUcc6IVvcUpE",
      shopifyId: "#1074",
      orderDate: "Jun 18, 2024",
      orderTime: "6:32 AM",
      status: "PENDING",
      reason: "WRONG_ITEM_DELIVERED",
    },
    {
      id: "RET-45813",
      productName: "MagSafe Pro Pad",
      productDesc: "15W Fast Charger",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlxwNA0ZL3WPPcNRdSMcStz04nCcdDhC8HR3lMs3Mc2kAdjmjgTj_t-T1ivB9GkuFgKyXE0DlQ6rYEUOMMPSZZ-DAUsz5pH7ugoBYNO9rTV1gdJMFcNvkRIk_tQYPOuFdRcVOugERd3LV7oIIyYlG2s5Mlnl2_TR74Va2bASAajCSK7ft_C9zNp8rYaU-Y91Zgv9SWSYZp-5fCcCiqQ8TH0fMcRW2pJsQFgt2Iuj8f4lgb5o9oLKEdUaNVnnXxLg8EFAFgpQxPmo0",
      shopifyId: "#1085",
      orderDate: "Jun 19, 2024",
      orderTime: "11:15 AM",
      status: "APPROVED",
      reason: "DEFECTIVE_PART",
    },
    {
      id: "RET-45814",
      productName: "ZenGrip Elite Mat",
      productDesc: "Eco-Friendly Rubber",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTqcC678EWG8egxsQD0gG0fm-ryNOWMzV_Ktle7JKj_yFXROiOqGzOZQ5feKoBe8aRVjQCGfkQk40GCsNl0N_hSnHPzIYClsieg6vqLNFjODKPNrRXfi1zCxmFoAMfpWL1KljDm_PwYt6eLkG93xAPb_pCh2h9xi7BgWQgzBvl836KaR4SkbzyN5BIMLrHTIU_pTFjqFVqAGQhSyo4dQA6-qw6nmjCMvzLJ6Rd9FkqrkO5PMZ05maAe7HhYoGx3Hs9LWZAZx21I_g",
      shopifyId: "#1092",
      orderDate: "Jun 20, 2024",
      orderTime: "2:45 PM",
      status: "REJECTED",
      reason: "CHANGE_OF_MIND",
    },
  ]);

  // Toast notifier
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Decisions
  const handleProcessReturn = (id: string, newStatus: "APPROVED" | "REJECTED") => {
    setReturns((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          triggerToast(`Return request #${id} has been ${newStatus.toLowerCase()}!`);
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
    setSelectedReturn(null);
  };

  // Dynamic statistics
  const pendingCount = 12 - returns.filter((r) => r.id === "RET-45812" && r.status !== "PENDING").length;
  const processedPercentage = 84 + returns.filter((r) => r.id === "RET-45812" && r.status !== "PENDING").length;

  const filterOptions = ["All", "Pending", "Approved", "Rejected", "Picked Up"];

  const getFilteredReturns = () => {
    return returns.filter((r) => {
      const tabMatch =
        activeFilter === "All" ||
        (activeFilter === "Pending" && r.status === "PENDING") ||
        (activeFilter === "Approved" && r.status === "APPROVED") ||
        (activeFilter === "Rejected" && r.status === "REJECTED") ||
        (activeFilter === "Picked Up" && r.status === "PICKED UP");

      const searchMatch =
        searchQuery === "" ||
        r.shopifyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.productName.toLowerCase().includes(searchQuery.toLowerCase());

      return tabMatch && searchMatch;
    });
  };

  const filteredReturns = getFilteredReturns();

  return (
    <div className="p-4 max-w-[1440px] mx-auto space-y-6 relative">
      {/* Welcome/Stats Bento Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/20 dark:border-slate-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Track and process your store returns</h3>
            <p className="text-on-surface-variant font-body-md text-body-md max-w-2xl leading-relaxed">
              Effortlessly manage customer return requests, update statuses, and maintain transparency throughout the logistics cycle.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <button className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold hover:brightness-110 transition-all active:scale-95 cursor-pointer shadow-md shadow-primary/10">
              Process Batch
            </button>
            <button className="px-6 py-2.5 bg-white/50 dark:bg-slate-900/50 border border-outline-variant/30 text-on-surface-variant rounded-xl font-label-md text-label-md font-semibold hover:bg-surface-container-low/40 transition-all active:scale-95 cursor-pointer">
              Export Report
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40">
            <span className="text-primary font-display-lg text-headline-md font-bold">{pendingCount}</span>
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-semibold mt-1">Pending</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center text-center border-b-4 border-primary-container shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40">
            <span className="text-on-surface font-display-lg text-headline-md font-bold">{processedPercentage}%</span>
            <span className="text-label-md text-on-surface-variant uppercase tracking-wider font-semibold mt-1">Processed</span>
          </div>
          <div className="col-span-2 bg-inverse-surface p-6 rounded-2xl flex items-center justify-between shadow-md border border-white/5">
            <div className="text-surface">
              <p className="text-label-sm font-medium opacity-70 text-surface/80">Average Return Time</p>
              <p className="text-headline-sm font-bold text-white mt-0.5">3.2 Days</p>
            </div>
            <span className="material-symbols-outlined text-primary-fixed text-4xl">speed</span>
          </div>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-slate-800/40 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30 max-w-full overflow-x-auto hide-scrollbar">
          {filterOptions.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-md text-label-md font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high/40"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 flex-wrap flex-grow sm:flex-grow-0">
          {/* Date Picker Input */}
          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-1.5 shadow-sm text-label-md">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_today</span>
            <span className="text-on-surface-variant opacity-70 font-medium">01/06/2024</span>
            <span className="text-outline-variant">→</span>
            <span className="text-on-surface-variant opacity-70 font-medium">30/06/2024</span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-1.5 pl-9 pr-4 text-label-md w-48 focus:ring-1 focus:ring-primary outline-none"
              placeholder="Search ID/Shopify..."
            />
          </div>

          <button className="p-2 bg-surface-container-highest/60 rounded-lg text-on-surface-variant hover:bg-outline-variant transition-colors active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/20 text-on-surface-variant font-label-md text-label-sm uppercase tracking-widest text-[11px]">
                <th className="px-6 py-4 font-bold">Return ID</th>
                <th className="px-6 py-4 font-bold">Product Details</th>
                <th className="px-6 py-4 font-bold">Shopify ID</th>
                <th className="px-6 py-4 font-bold">Order Date</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Return Reason</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-on-surface-variant text-label-md">
                    No return requests found.
                  </td>
                </tr>
              ) : (
                filteredReturns.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container/20 transition-colors group">
                    <td className="px-6 py-5 font-label-md text-on-surface font-bold">{item.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-xl bg-surface-container border border-outline-variant/30 shrink-0 mr-3 transition-transform duration-300 group-hover:scale-105">
                          <img className="w-full h-full object-cover" alt={item.productName} src={item.image} />
                        </div>
                        <div>
                          <p className="font-label-md text-on-surface font-bold leading-tight">{item.productName}</p>
                          <p className="text-xs text-on-surface-variant mt-1 opacity-80">{item.productDesc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-label-md text-on-surface-variant font-mono">{item.shopifyId}</td>
                    <td className="px-6 py-5">
                      <p className="font-label-md text-on-surface leading-tight">{item.orderDate}</p>
                      <p className="text-xs text-on-surface-variant mt-1 opacity-80">{item.orderTime}</p>
                    </td>
                    <td className="px-6 py-5">
                      {item.status === "PENDING" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
                          Pending
                        </span>
                      )}
                      {item.status === "APPROVED" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
                          Approved
                        </span>
                      )}
                      {item.status === "REJECTED" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-error-container/40 text-error border border-error-container uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                          Rejected
                        </span>
                      )}
                      {item.status === "PICKED UP" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          Picked Up
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-label-md text-on-surface-variant font-mono italic text-[13px]">{item.reason}</p>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() => setSelectedReturn(item)}
                        className="text-primary font-label-md hover:underline font-bold transition-all cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-surface-container-low/30 px-6 py-4 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-label-md text-on-surface-variant font-medium">Showing 1 to {filteredReturns.length} of 42 entries</p>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-lg border border-outline-variant/40 bg-white/40 dark:bg-slate-900/40 hover:bg-surface-container-high/40 transition-all disabled:opacity-30 cursor-not-allowed" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex items-center">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-label-md font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high/40 text-label-md font-medium cursor-pointer">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high/40 text-label-md font-medium cursor-pointer">3</button>
              <span className="px-1 text-on-surface-variant">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high/40 text-label-md font-medium cursor-pointer">5</button>
            </div>
            <button className="p-1.5 rounded-lg border border-outline-variant/40 bg-white/40 dark:bg-slate-900/40 hover:bg-surface-container-high/40 transition-all cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="flex items-center text-label-md text-on-surface-variant">
            <span>Items per page:</span>
            <select className="ml-2 bg-transparent border-none focus:ring-0 cursor-pointer font-bold text-on-surface">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Detail & Process Dialog Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white dark:bg-slate-900 border border-outline-variant/40 max-w-lg w-full rounded-3xl shadow-2xl p-6 relative overflow-hidden animate-zoomIn">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">Process Return Request</h3>
            <p className="text-label-md text-on-surface-variant border-b border-outline-variant/20 pb-4 mb-4 font-medium">
              Return Request ID: <span className="font-mono font-bold text-on-surface">{selectedReturn.id}</span>
            </p>

            <div className="space-y-4">
              {/* Product Info */}
              <div className="flex items-center gap-3 bg-surface-container-low/60 p-4 rounded-xl border border-outline-variant/10">
                <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-outline-variant/20">
                  <img className="w-full h-full object-cover" alt={selectedReturn.productName} src={selectedReturn.image} />
                </div>
                <div>
                  <h4 className="font-body-md font-bold text-on-surface">{selectedReturn.productName}</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">{selectedReturn.productDesc}</p>
                  <p className="text-[11px] text-primary font-bold mt-1 font-mono">Shopify Reference: {selectedReturn.shopifyId}</p>
                </div>
              </div>

              {/* Return reason */}
              <div>
                <p className="text-label-md font-bold text-on-surface-variant mb-1">Reason for Return</p>
                <div className="bg-error-container/20 border border-error-container/30 px-4 py-3 rounded-xl text-error font-medium text-[13px] font-mono leading-relaxed">
                  {selectedReturn.reason}
                </div>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 text-label-md">
                <div>
                  <p className="font-bold text-on-surface-variant">Request Date</p>
                  <p className="text-on-surface mt-1 font-medium">{selectedReturn.orderDate} at {selectedReturn.orderTime}</p>
                </div>
                <div>
                  <p className="font-bold text-on-surface-variant">Current Status</p>
                  <p className="text-on-surface mt-1 uppercase font-bold">{selectedReturn.status}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setSelectedReturn(null)}
                className="px-5 py-2.5 border border-outline-variant/40 bg-white/40 dark:bg-slate-900/40 rounded-xl text-label-md font-semibold text-on-surface-variant hover:bg-surface-container-high/40 transition-colors cursor-pointer"
              >
                Close
              </button>
              {selectedReturn.status === "PENDING" && (
                <>
                  <button
                    onClick={() => handleProcessReturn(selectedReturn.id, "REJECTED")}
                    className="px-5 py-2.5 bg-error text-white rounded-xl text-label-md font-bold hover:brightness-110 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleProcessReturn(selectedReturn.id, "APPROVED")}
                    className="px-5 py-2.5 bg-primary text-on-primary rounded-xl text-label-md font-bold hover:brightness-110 transition-colors cursor-pointer shadow-md shadow-primary/10"
                  >
                    Approve Return
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <footer className="py-6 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between opacity-70 text-label-sm mt-8">
        <p>© 2026 Dropship India. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 right-10 flex items-center gap-3 bg-on-surface text-surface py-3.5 px-6 rounded-xl shadow-2xl z-[100] transition-all duration-300 animate-bounce">
          <span className="material-symbols-outlined text-primary-fixed text-xl">check_circle</span>
          <span className="text-label-md font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
