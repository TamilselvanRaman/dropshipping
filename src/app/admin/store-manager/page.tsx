"use client";

import React, { useState } from "react";

interface ShopifyStore {
  name: string;
  adminUrl: string;
  storefrontUrl: string;
  connectedAt: string;
  status: "Active" | "Syncing" | "Auth Error";
  iconName: string;
}

export default function StoreManager() {
  const [stores, setStores] = useState<ShopifyStore[]>([
    {
      name: "Organic Essentials",
      adminUrl: "admin.shopify.com/store/organic-ess-in",
      storefrontUrl: "organic-essentials.in",
      connectedAt: "Jun 24, 2024 at 3:54 PM",
      status: "Active",
      iconName: "shopping_bag",
    },
    {
      name: "Tech Gadgets Hub",
      adminUrl: "admin.shopify.com/store/techhub-india",
      storefrontUrl: "techgadgetshub.com",
      connectedAt: "May 12, 2024 at 11:20 AM",
      status: "Syncing",
      iconName: "app_shortcut",
    },
    {
      name: "Luxe Decor",
      adminUrl: "admin.shopify.com/store/luxedecor-home",
      storefrontUrl: "luxedecor.store",
      connectedAt: "Apr 05, 2024 at 09:15 AM",
      status: "Active",
      iconName: "diamond",
    },
    {
      name: "Fashion Forward",
      adminUrl: "admin.shopify.com/store/ff-activewear",
      storefrontUrl: "fashionforward.in",
      connectedAt: "Mar 22, 2024 at 02:40 PM",
      status: "Auth Error",
      iconName: "apparel",
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
      iconName: "storefront",
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
    <div className="p-4 max-w-[1440px] mx-auto space-y-6 relative">
      {/* Title & Button Banner */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-slate-800/40 shadow-sm">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Connected Shopify Stores</h3>
          <p className="text-label-md text-on-surface-variant mt-0.5">
            Monitor and manage your multi-store dropshipping ecosystem.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl text-label-md font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Link New Shopify Store
        </button>
      </section>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 hover:-translate-y-1 transition-all duration-300">
          <p className="text-on-surface-variant font-label-md opacity-75">Connected Stores</p>
          <h2 className="text-display-lg font-display-lg text-on-surface mt-2">{totalStores}</h2>
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mt-1.5">+1 link pending</span>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 hover:-translate-y-1 transition-all duration-300">
          <p className="text-on-surface-variant font-label-md opacity-75">Sync Status Health</p>
          <h2 className="text-display-lg font-display-lg text-primary mt-2">{statusHealth}%</h2>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-3">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${statusHealth}%` }}></div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 hover:-translate-y-1 transition-all duration-300">
          <p className="text-on-surface-variant font-label-md opacity-75">Live Orders</p>
          <h2 className="text-display-lg font-display-lg text-on-surface mt-2">148</h2>
          <span className="text-primary font-bold text-xs flex items-center gap-1 mt-1.5">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            Stable sync rate
          </span>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 hover:-translate-y-1 transition-all duration-300">
          <p className="text-on-surface-variant font-label-md opacity-75">Total Sales Volume</p>
          <h2 className="text-display-lg font-display-lg text-primary mt-2">₹2.4M</h2>
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block mt-1.5">Combined Revenue</span>
        </div>
      </div>

      {/* Main Grid: Stores and Logistics Map */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Stores List Card */}
        <div className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 overflow-hidden">
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/40 border-b border-outline-variant/20 text-on-surface-variant font-label-md text-label-sm uppercase tracking-widest text-[11px]">
                  <th className="px-6 py-4 font-bold">Store Details</th>
                  <th className="px-6 py-4 font-bold">Shopify Admin URI</th>
                  <th className="px-6 py-4 font-bold">Storefront URI</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {stores.map((s) => (
                  <tr key={s.name} className="hover:bg-surface-container/20 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                          <span className="material-symbols-outlined text-[20px]">{s.iconName}</span>
                        </div>
                        <div>
                          <h4 className="font-body-md font-bold text-on-surface leading-tight">{s.name}</h4>
                          <p className="text-[10px] text-on-surface-variant mt-1 opacity-70">Linked {s.connectedAt.split(" at ")[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-mono text-[12px] text-on-surface-variant opacity-80">{s.adminUrl}</td>
                    <td className="px-6 py-5">
                      <a
                        className="text-primary hover:underline font-bold text-label-md flex items-center gap-1"
                        href={`https://${s.storefrontUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {s.storefrontUrl}
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>
                    </td>
                    <td className="px-6 py-5">
                      {s.status === "Active" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          Active
                        </span>
                      )}
                      {s.status === "Syncing" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide border border-blue-200">
                          <svg className="animate-spin h-3 w-3 text-blue-600 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Syncing
                        </span>
                      )}
                      {s.status === "Auth Error" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container/40 text-error text-[10px] font-bold uppercase tracking-wide border border-error-container">
                          <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5 animate-pulse"></span>
                          Auth Error
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-2 hover:bg-surface-container-high/40 rounded-lg text-on-surface-variant hover:text-on-surface active:scale-95 transition-all cursor-pointer">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDisconnect(s.name)}
                          className="p-2 hover:bg-error-container/20 rounded-lg text-error hover:text-error active:scale-95 transition-all cursor-pointer"
                          title="Disconnect Store"
                        >
                          <span className="material-symbols-outlined text-[18px]">link_off</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Logistics Map */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/20 dark:border-slate-800/40 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Global Sourcing Network</h3>
            <p className="text-label-md text-on-surface-variant border-b border-outline-variant/20 pb-4 mb-4">
              Real-time monitoring of active fulfillment centers.
            </p>

            {/* Premium World Map Svg Graphic */}
            <div className="w-full aspect-[4/3] bg-surface-container-low/40 rounded-xl relative overflow-hidden flex items-center justify-center border border-outline-variant/10">
              <svg className="w-full h-full p-4 opacity-75" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified continents paths */}
                <path d="M15,25 Q35,15 50,22 T70,30 T90,20 T110,40 L100,60 L75,55 Z" fill="rgba(0,110,28,0.06)" />
                <path d="M110,45 Q135,35 155,42 T175,50 T190,60 L180,85 L145,80 Z" fill="rgba(0,110,28,0.06)" />
                <path d="M45,65 Q65,85 75,95 L85,115 L60,110 Z" fill="rgba(0,110,28,0.06)" />
                {/* Logistics route arches */}
                <path d="M60,40 Q100,20 150,55" fill="none" stroke="#016e1c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                <path d="M150,55 Q115,85 75,95" fill="none" stroke="#016e1c" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                {/* Map Pins */}
                <g className="animate-ping" style={{ transformOrigin: "60px 40px" }}>
                  <circle cx="60" cy="40" r="4" fill="#016e1c" opacity="0.5" />
                </g>
                <circle cx="60" cy="40" r="3" fill="#016e1c" />
                
                <g className="animate-ping animate-delay-1000" style={{ transformOrigin: "150px 55px" }}>
                  <circle cx="150" cy="55" r="4" fill="#016e1c" opacity="0.5" />
                </g>
                <circle cx="150" cy="55" r="3" fill="#016e1c" />

                <g className="animate-ping animate-delay-2000" style={{ transformOrigin: "75px 95px" }}>
                  <circle cx="75" cy="95" r="4" fill="#016e1c" opacity="0.5" />
                </g>
                <circle cx="75" cy="95" r="3" fill="#016e1c" />
              </svg>

              {/* Map tooltips */}
              <span className="absolute top-[25%] left-[24%] bg-on-surface text-surface text-[10px] py-1 px-2.5 rounded font-bold border border-outline-variant/30">
                New Delhi HUB
              </span>
              <span className="absolute bottom-[18%] left-[34%] bg-on-surface text-surface text-[10px] py-1 px-2.5 rounded font-bold border border-outline-variant/30">
                Bangalore HUB
              </span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-label-md text-on-surface-variant font-medium">
            <span>Fulfillment Health:</span>
            <span className="text-primary font-bold">100% Operational</span>
          </div>
        </div>
      </div>

      {/* Link Store Modal Dialog Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white dark:bg-slate-900 border border-outline-variant/40 max-w-md w-full rounded-3xl shadow-2xl p-6 relative overflow-hidden animate-zoomIn">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">Link New Shopify Store</h3>
            <p className="text-label-md text-on-surface-variant border-b border-outline-variant/20 pb-4 mb-4">
              Enter your Shopify shop credentials to sync your inventory list.
            </p>

            <form onSubmit={handleLinkStore} className="space-y-4">
              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1.5" htmlFor="store-name">
                  Store Display Name
                </label>
                <input
                  id="store-name"
                  type="text"
                  required
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-body-md focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g. Trendy Collections"
                />
              </div>

              <div>
                <label className="block text-label-sm font-bold text-on-surface mb-1.5" htmlFor="store-url">
                  Shopify Store Domain
                </label>
                <input
                  id="store-url"
                  type="text"
                  required
                  value={newStoreUrl}
                  onChange={(e) => setNewStoreUrl(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-body-md focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="e.g. trendy-collections.myshopify.com"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-outline-variant/40 bg-white/40 dark:bg-slate-900/40 rounded-xl text-label-md font-semibold text-on-surface-variant hover:bg-surface-container-high/40 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-xl text-label-md font-bold hover:brightness-110 transition-all cursor-pointer shadow-md shadow-primary/10"
                >
                  Initiate Sync Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
