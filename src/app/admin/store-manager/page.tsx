"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Smartphone,
  Gem,
  Shirt,
  Store,
  Plus,
  ExternalLink,
  Pencil,
  Link2Off,
  TrendingUp,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface ShopifyStore {
  name: string;
  adminUrl: string;
  storefrontUrl: string;
  connectedAt: string;
  status: "Active" | "Syncing" | "Auth Error";
  iconType: React.ComponentType<{ className?: string }>;
}

export default function StoreManager() {
  const [stores, setStores] = useState<ShopifyStore[]>([
    {
      name: "Organic Essentials",
      adminUrl: "admin.shopify.com/store/organic-ess-in",
      storefrontUrl: "organic-essentials.in",
      connectedAt: "Jun 24, 2024 at 3:54 PM",
      status: "Active",
      iconType: ShoppingBag,
    },
    {
      name: "Tech Gadgets Hub",
      adminUrl: "admin.shopify.com/store/techhub-india",
      storefrontUrl: "techgadgetshub.com",
      connectedAt: "May 12, 2024 at 11:20 AM",
      status: "Syncing",
      iconType: Smartphone,
    },
    {
      name: "Luxe Decor",
      adminUrl: "admin.shopify.com/store/luxedecor-home",
      storefrontUrl: "luxedecor.store",
      connectedAt: "Apr 05, 2024 at 09:15 AM",
      status: "Active",
      iconType: Gem,
    },
    {
      name: "Fashion Forward",
      adminUrl: "admin.shopify.com/store/ff-activewear",
      storefrontUrl: "fashionforward.in",
      connectedAt: "Mar 22, 2024 at 02:40 PM",
      status: "Auth Error",
      iconType: Shirt,
    },
  ]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newStoreName, setNewStoreName] = useState<string>("");
  const [newStoreUrl, setNewStoreUrl] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stats calculation
  const totalStores = stores.length;
  const activeCount = stores.filter((s) => s.status === "Active" || s.status === "Syncing").length;
  const statusHealth = Math.round((activeCount / totalStores) * 100);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLinkStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName || !newStoreUrl) return;

    const newStore: ShopifyStore = {
      name: newStoreName,
      adminUrl: `admin.shopify.com/store/${newStoreUrl.replace(".myshopify.com", "")}`,
      storefrontUrl: `${newStoreName.toLowerCase().replace(/\s+/g, "-")}.myshopify.com`,
      connectedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }) + ` at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
      status: "Syncing",
      iconType: Store,
    };

    setStores((prev) => [...prev, newStore]);
    setModalOpen(false);
    setNewStoreName("");
    setNewStoreUrl("");
    showToast(`Linking request initiated for "${newStoreName}"`);

    // Simulate Sync complete after 4 seconds
    setTimeout(() => {
      setStores((prev) =>
        prev.map((s) => (s.name === newStoreName ? { ...s, status: "Active" } : s))
      );
      showToast(`Store "${newStoreName}" successfully linked and synchronized!`);
    }, 4000);
  };

  const handleDisconnect = (name: string) => {
    setStores((prev) => prev.filter((s) => s.name !== name));
    showToast(`Disconnected Shopify store: "${name}"`);
  };

  return (
    <div className="space-y-6">
      {/* Title & Button Banner */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Connected Shopify Stores</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor and manage your multi-store dropshipping ecosystem.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Link New Shopify Store
        </button>
      </section>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-slate-500 text-sm font-semibold">Connected Stores</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">{totalStores}</h2>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">+1 link pending</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-slate-500 text-sm font-semibold">Sync Status Health</p>
          <h2 className="text-3xl font-bold text-emerald-700 mt-2">{statusHealth}%</h2>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3 border border-slate-200">
            <div className="h-full bg-emerald-600 rounded-full transition-all duration-350" style={{ width: `${statusHealth}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-slate-500 text-sm font-semibold">Live Orders</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">148</h2>
          <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Stable sync rate
          </span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <p className="text-slate-500 text-sm font-semibold">Total Sales Volume</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">₹2.4M</h2>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Combined Revenue</span>
        </div>
      </div>

      {/* Main Grid: Stores and Logistics Map */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Stores List Card */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-55 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-3.5 font-bold">Store Details</th>
                  <th className="px-6 py-3.5 font-bold">Shopify Admin URI</th>
                  <th className="px-6 py-3.5 font-bold">Storefront URI</th>
                  <th className="px-6 py-3.5 font-bold">Status</th>
                  <th className="px-6 py-3.5 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stores.map((s) => {
                  const IconComponent = s.iconType;
                  return (
                    <tr key={s.name} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 leading-tight">{s.name}</h4>
                            <p className="text-[10px] text-slate-500 mt-1">Linked {s.connectedAt.split(" at ")[0]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 font-mono text-[11px] text-slate-500">{s.adminUrl}</td>
                      <td className="px-6 py-4.5">
                        <a
                          className="text-emerald-700 hover:underline font-bold text-xs flex items-center gap-0.5"
                          href={`https://${s.storefrontUrl}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {s.storefrontUrl}
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        </a>
                      </td>
                      <td className="px-6 py-4.5">
                        {s.status === "Active" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide border border-green-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                            Active
                          </span>
                        )}
                        {s.status === "Syncing" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide border border-blue-200">
                            <svg className="animate-spin h-2.5 w-2.5 text-blue-600 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Syncing
                          </span>
                        )}
                        {s.status === "Auth Error" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wide border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1 animate-pulse"></span>
                            Auth Error
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDisconnect(s.name)}
                            className="p-1.5 hover:bg-red-50 rounded text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                            title="Disconnect Store"
                          >
                            <Link2Off className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Logistics Map */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Global Sourcing Network</h3>
            <p className="text-xs text-slate-500 border-b border-slate-100 pb-3 mb-4">
              Real-time monitoring of active fulfillment centers.
            </p>

            {/* World Map Svg Graphic */}
            <div className="w-full aspect-[4/3] bg-slate-50 rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-100">
              <svg className="w-full h-full p-2 opacity-60" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                {/* continents */}
                <path d="M15,25 Q35,15 50,22 T70,30 T90,20 T110,40 L100,60 L75,55 Z" fill="rgba(5,150,105,0.06)" />
                <path d="M110,45 Q135,35 155,42 T175,50 T190,60 L180,85 L145,80 Z" fill="rgba(5,150,105,0.06)" />
                <path d="M45,65 Q65,85 75,95 L85,115 L60,110 Z" fill="rgba(5,150,105,0.06)" />
                {/* routes */}
                <path d="M60,40 Q100,20 150,55" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <path d="M150,55 Q115,85 75,95" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                
                <circle cx="60" cy="40" r="3" fill="#059669" />
                <circle cx="150" cy="55" r="3" fill="#059669" />
                <circle cx="75" cy="95" r="3" fill="#059669" />
              </svg>

              {/* Map tooltips */}
              <div className="absolute top-[22%] left-[20%] flex items-center gap-0.5 bg-slate-900 text-white text-[9px] py-0.5 px-2 rounded font-bold border border-slate-800 shadow-sm">
                <MapPin className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                <span>New Delhi</span>
              </div>
              <div className="absolute bottom-[16%] left-[32%] flex items-center gap-0.5 bg-slate-900 text-white text-[9px] py-0.5 px-2 rounded font-bold border border-slate-800 shadow-sm">
                <MapPin className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                <span>Bangalore</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Fulfillment Health:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* Link Store Modal Dialog Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl shadow-xl p-5 relative overflow-hidden animate-zoomIn">
            <h3 className="text-base font-bold text-slate-900 mb-1">Link New Shopify Store</h3>
            <p className="text-xs text-slate-500 border-b border-slate-100 pb-3 mb-4">
              Enter your Shopify shop credentials to sync your inventory list.
            </p>

            <form onSubmit={handleLinkStore} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-650 mb-1.5" htmlFor="store-name">
                  Store Display Name
                </label>
                <input
                  id="store-name"
                  type="text"
                  required
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:ring-1 focus:ring-emerald-750 outline-none text-slate-800"
                  placeholder="e.g. Trendy Collections"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-650 mb-1.5" htmlFor="store-url">
                  Shopify Store Domain
                </label>
                <input
                  id="store-url"
                  type="text"
                  required
                  value={newStoreUrl}
                  onChange={(e) => setNewStoreUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:ring-1 focus:ring-emerald-750 outline-none text-slate-800"
                  placeholder="e.g. trendy-collections.myshopify.com"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-250 bg-white rounded-lg font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition-colors cursor-pointer shadow-sm shadow-emerald-700/10"
                >
                  Initiate Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
