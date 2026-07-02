"use client";

import React, { useState } from "react";
import {
  Calendar,
  Search,
  Filter,
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

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
    <div className="space-y-6">
      {/* Welcome/Stats Bento Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Track and process your store returns</h3>
            <p className="text-slate-500 text-sm leading-relaxed mt-1.5">
              Effortlessly manage customer return requests, update statuses, and maintain transparency throughout the logistics cycle.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <button className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">
              Process Batch
            </button>
            <button className="px-4 py-2 bg-white border border-slate-250 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer">
              Export Report
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-sm border border-slate-200">
            <span className="text-emerald-700 text-3xl font-bold">{pendingCount}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Pending</span>
          </div>
          <div className="bg-white p-6 rounded-xl flex flex-col items-center justify-center text-center border-b-2 border-emerald-600 shadow-sm border border-slate-200">
            <span className="text-slate-900 text-3xl font-bold">{processedPercentage}%</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Processed</span>
          </div>
          <div className="col-span-2 bg-slate-900 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="text-white">
              <p className="text-[10px] font-medium opacity-70">Average Return Time</p>
              <p className="text-lg font-bold mt-0.5">3.2 Days</p>
            </div>
            <Zap className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 max-w-full overflow-x-auto hide-scrollbar">
          {filterOptions.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 flex-wrap flex-grow sm:flex-grow-0">
          {/* Date Picker Input */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="opacity-80 font-medium">01/06/2024</span>
            <span className="text-slate-300">→</span>
            <span className="opacity-80 font-medium">30/06/2024</span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-3 text-xs w-40 focus:ring-1 focus:ring-emerald-700 outline-none text-slate-800"
              placeholder="Search ID/Shopify..."
            />
          </div>

          <button className="p-1.5 border border-slate-250 bg-white rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-55 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-3.5 font-bold">Return ID</th>
                <th className="px-6 py-3.5 font-bold">Product Details</th>
                <th className="px-6 py-3.5 font-bold">Shopify ID</th>
                <th className="px-6 py-3.5 font-bold">Order Date</th>
                <th className="px-6 py-3.5 font-bold">Status</th>
                <th className="px-6 py-3.5 font-bold">Return Reason</th>
                <th className="px-6 py-3.5 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500 text-sm">
                    No return requests found.
                  </td>
                </tr>
              ) : (
                filteredReturns.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4.5 text-sm font-bold text-slate-800">{item.id}</td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded bg-slate-100 border border-slate-200 shrink-0 mr-3 transition-transform duration-200 group-hover:scale-105">
                          <img className="w-full h-full object-cover" alt={item.productName} src={item.image} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-tight">{item.productName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.productDesc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-xs font-mono text-slate-500">{item.shopifyId}</td>
                    <td className="px-6 py-4.5">
                      <p className="text-sm text-slate-800 leading-tight">{item.orderDate}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.orderTime}</p>
                    </td>
                    <td className="px-6 py-4.5">
                      {item.status === "PENDING" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1 animate-pulse"></span>
                          Pending
                        </span>
                      )}
                      {item.status === "APPROVED" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></span>
                          Approved
                        </span>
                      )}
                      {item.status === "REJECTED" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
                          Rejected
                        </span>
                      )}
                      {item.status === "PICKED UP" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 border border-green-200 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                          Picked Up
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4.5 text-xs text-slate-500 font-mono italic">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4.5">
                      <button
                        onClick={() => setSelectedReturn(item)}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold text-xs transition-colors cursor-pointer"
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
        <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-semibold text-slate-500 font-sans">Showing 1 to {filteredReturns.length} of 42 entries</p>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all disabled:opacity-30 cursor-not-allowed" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center">
              <button className="w-8 h-8 flex items-center justify-center rounded bg-emerald-700 text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-xs font-medium cursor-pointer">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-xs font-medium cursor-pointer">3</button>
              <span className="px-1 text-slate-400 text-xs">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-xs font-medium cursor-pointer">5</button>
            </div>
            <button className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-55 transition-all cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail & Process Dialog Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white border border-slate-200 max-w-md w-full rounded-2xl shadow-xl p-6 relative overflow-hidden animate-zoomIn">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Process Return Request</h3>
            <p className="text-xs text-slate-500 border-b border-slate-100 pb-3 mb-4 font-semibold">
              Return Request ID: <span className="font-mono font-bold text-slate-800">{selectedReturn.id}</span>
            </p>

            <div className="space-y-4">
              {/* Product Info */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="h-14 w-14 rounded overflow-hidden shrink-0 border border-slate-200">
                  <img className="w-full h-full object-cover" alt={selectedReturn.productName} src={selectedReturn.image} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{selectedReturn.productName}</h4>
                  <p className="text-xs text-slate-505 mt-0.5">{selectedReturn.productDesc}</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-1 font-mono">Shopify Ref: {selectedReturn.shopifyId}</p>
                </div>
              </div>

              {/* Return reason */}
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1.5">Reason for Return</p>
                <div className="bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-lg text-red-650 font-semibold text-xs font-mono leading-relaxed flex items-start gap-1.5 text-red-700">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                  <span>{selectedReturn.reason}</span>
                </div>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wide">Request Date</p>
                  <p className="text-slate-800 mt-1 font-bold">{selectedReturn.orderDate} at {selectedReturn.orderTime}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wide">Current Status</p>
                  <p className="text-slate-800 mt-1 uppercase font-bold">{selectedReturn.status}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedReturn(null)}
                className="px-4 py-2 border border-slate-250 bg-white rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              {selectedReturn.status === "PENDING" && (
                <>
                  <button
                    onClick={() => handleProcessReturn(selectedReturn.id, "REJECTED")}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleProcessReturn(selectedReturn.id, "APPROVED")}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer shadow-sm shadow-emerald-700/10"
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
      <footer className="py-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between opacity-60 text-xs mt-6">
        <p>© 2026 Dropship India. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a className="hover:text-emerald-700 transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-emerald-700 transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-emerald-700 transition-colors" href="#">Contact Support</a>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-slate-900 text-white py-3 px-5 rounded-lg shadow-xl z-[100] transition-all duration-300">
          <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
