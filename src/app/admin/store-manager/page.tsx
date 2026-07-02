"use client";

import React, { useState } from "react";

interface ShopifyStore {
  id: string;
  name: string;
  status: "Active" | "Syncing" | "Auth Error";
  adminUrl: string;
  storefrontUrl: string;
  createdAt: string;
  typeIcon: string;
}

export default function StoreManager() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newStoreName, setNewStoreName] = useState<string>("");
  const [newAdminUrl, setNewAdminUrl] = useState<string>("");
  const [newStorefrontUrl, setNewStorefrontUrl] = useState<string>("");
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // Initial Stores List
  const [stores, setStores] = useState<ShopifyStore[]>([
    {
      id: "store-1",
      name: "Organic Essentials",
      status: "Active",
      adminUrl: "admin.shopify.com/store/organic-ess-in",
      storefrontUrl: "organic-essentials.in",
      createdAt: "Jun 24, 2024 3:54 PM",
      typeIcon: "shopping_bag",
    },
    {
      id: "store-2",
      name: "Tech Gadgets Hub",
      status: "Syncing",
      adminUrl: "admin.shopify.com/store/techhub-india",
      storefrontUrl: "techgadgetshub.com",
      createdAt: "May 12, 2024 11:20 AM",
      typeIcon: "app_shortcut",
    },
    {
      id: "store-3",
      name: "Luxe Decor",
      status: "Active",
      adminUrl: "admin.shopify.com/store/luxedecor-home",
      storefrontUrl: "luxedecor.store",
      createdAt: "Apr 05, 2024 09:15 AM",
      typeIcon: "diamond",
    },
    {
      id: "store-4",
      name: "Fashion Forward",
      status: "Auth Error",
      adminUrl: "admin.shopify.com/store/ff-collection",
      storefrontUrl: "fashionforward.in",
      createdAt: "Mar 22, 2024 02:45 PM",
      typeIcon: "style",
    },
  ]);

  // Toast trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Disconnect / Link logic
  const handleDisconnect = (id: string, name: string) => {
    setStores((prev) => prev.filter((s) => s.id !== id));
    triggerToast(`Store "${name}" disconnected successfully.`);
  };

  const handleLinkStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName || !newStorefrontUrl) {
      triggerToast("Please fill in the store name and storefront URL.");
      return;
    }

    const formattedAdminUrl = newAdminUrl || `admin.shopify.com/store/${newStoreName.toLowerCase().replace(/\s+/g, "-")}`;
    const newStore: ShopifyStore = {
      id: `store-${Date.now()}`,
      name: newStoreName,
      status: "Active",
      adminUrl: formattedAdminUrl,
      storefrontUrl: newStorefrontUrl,
      createdAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      typeIcon: "storefront",
    };

    setStores((prev) => [newStore, ...prev]);
    setIsModalOpen(false);
    setNewStoreName("");
    setNewAdminUrl("");
    setNewStorefrontUrl("");
    triggerToast(`Store "${newStoreName}" linked successfully!`);
  };

  // Dynamic statistics calculations
  const totalStores = 12 + (stores.length - 4);
  const activeSkus = 1.2 + (stores.length - 4) * 0.3;

  // Breakdown percentages
  const healthyPercent = Math.round((stores.filter((s) => s.status === "Active").length / stores.length) * 100) || 0;
  const syncingPercent = Math.round((stores.filter((s) => s.status === "Syncing").length / stores.length) * 100) || 0;
  const errorPercent = 100 - healthyPercent - syncingPercent;

  return (
    <div className="p-8 flex-1 flex flex-col space-y-8 relative">
      {/* Header Section with CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Connected Shopify Stores</h3>
          <p className="text-body-md font-body-md text-on-surface-variant mt-0.5">
            Monitor and manage your multi-store dropshipping ecosystem.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/25 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Link New Shopify Store
        </button>
      </div>

      {/* Dashboard Overview Stats (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Total Stores
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-on-surface">{totalStores}</span>
            <span className="text-primary text-label-sm font-bold">+2 this month</span>
          </div>
        </div>

        <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Live Orders
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-on-surface">148</span>
            <span className="material-symbols-outlined text-primary text-headline-sm">trending_up</span>
          </div>
        </div>

        <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Total Sales
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-on-surface font-sans">₹2.4M</span>
          </div>
        </div>

        <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Active Inventory
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-on-surface">{activeSkus.toFixed(1)}k</span>
            <span className="text-on-surface-variant text-label-sm font-semibold">SKUs</span>
          </div>
        </div>
      </div>

      {/* Stores Table Container */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Store Name
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Shopify Admin URL
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Storefront URL
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Created At
                </th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-label-md text-label-md text-on-surface">
              {stores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-on-surface-variant">
                    No connected Shopify stores found. Link a new store to start.
                  </td>
                </tr>
              ) : (
                stores.map((store) => (
                  <tr key={store.id} className="hover:bg-surface-container-high/20 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/50 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">{store.typeIcon}</span>
                        </div>
                        <div>
                          <p className="font-bold leading-tight">{store.name}</p>
                          {store.status === "Active" && (
                            <span className="text-[10px] text-primary bg-primary-fixed/20 px-2 py-0.5 rounded-full mt-1.5 inline-block font-semibold">
                              Active
                            </span>
                          )}
                          {store.status === "Syncing" && (
                            <span className="text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full mt-1.5 inline-block font-semibold animate-pulse">
                              Syncing
                            </span>
                          )}
                          {store.status === "Auth Error" && (
                            <span className="text-[10px] text-error bg-error-container/20 px-2 py-0.5 rounded-full mt-1.5 inline-block font-semibold">
                              Auth Error
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-on-surface-variant font-mono text-[13px]">{store.adminUrl}</td>
                    <td className="px-6 py-5">
                      <a
                        className="text-primary hover:underline flex items-center gap-1 font-bold"
                        href={`https://${store.storefrontUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {store.storefrontUrl}
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>
                    </td>
                    <td className="px-6 py-5 text-on-surface-variant">{store.createdAt}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors material-symbols-outlined text-[20px] active:scale-95 cursor-pointer"
                          title="Edit Store"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => handleDisconnect(store.id, store.name)}
                          className="p-2 hover:bg-error-container/20 rounded-lg text-error transition-colors material-symbols-outlined text-[20px] active:scale-95 cursor-pointer"
                          title="Disconnect Store"
                        >
                          link_off
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container border-t border-outline-variant/30 flex items-center justify-between">
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            Showing {stores.length} of {totalStores} stores
          </span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-label-sm hover:bg-surface-container-high transition-colors disabled:opacity-50 cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-sm hover:brightness-110 transition-colors active:scale-98">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Section (Asymmetric / Modern UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Breakdown Card */}
        <div className="lg:col-span-1 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-6">Status Health</h4>
            <div className="space-y-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-bold inline-block py-1 px-2.5 uppercase rounded-full text-primary bg-primary-fixed/25">
                      Healthy
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-primary">{healthyPercent}%</span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-surface-container-high">
                  <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500" style={{ width: `${healthyPercent}%` }}></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-bold inline-block py-1 px-2.5 uppercase rounded-full text-on-tertiary-container bg-tertiary-container/20">
                      Pending Sync
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-on-tertiary-container">{syncingPercent}%</span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-surface-container-high">
                  <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-tertiary transition-all duration-500" style={{ width: `${syncingPercent}%` }}></div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-bold inline-block py-1 px-2.5 uppercase rounded-full text-error bg-error-container/20">
                      Action Required
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-error">{errorPercent}%</span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-surface-container-high">
                  <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-error transition-all duration-500" style={{ width: `${errorPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-98 cursor-pointer">
            View Detailed Audit
          </button>
        </div>

        {/* Featured Image Card (Atmospheric Pro Insight) */}
        {!isDismissed && (
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group min-h-[350px] shadow-sm">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSxFYrNlWuTlPxEiLYOLkKdTI6NwU5bGGOK9Ck-Bip9zRG_Q6-8tB2cT51Ztx2zI6BolYZ5l12E23cxtZj3Vh1VpOYLdzecMxwUXdDioD76BCGE52k2t99v6sV0qZl3M_24Z3uwhPlUAi0VOw-Fr5ukXNSFRu5LkDGM191CI1yspsAmjRw_fGul9R2Ktcxx22vTa6ZiKfWG6Oj0jRYvIMTmQ4AjSE-2dATXB3zlIW6bWpcGzGwZvDHXAN_Y7kYXWbLRl-mLbPahYg')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-bold mb-4 inline-block shadow-sm">
                Pro Insight
              </span>
              <h4 className="font-headline-md text-headline-md mb-2 text-white">Automate Store Syncing</h4>
              <p className="font-body-md text-body-md opacity-90 max-w-lg text-surface-container-low leading-relaxed">
                New for 2026: Enable "Intelligent Stock Rebalancing" to automatically transfer inventory between your Shopify
                stores based on regional demand spikes.
              </p>
              <div className="mt-6 flex gap-4">
                <button className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer">
                  Learn More
                </button>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="px-6 py-2.5 border border-white/40 bg-white/10 backdrop-blur-md rounded-lg font-bold hover:bg-white/20 transition-all active:scale-95 cursor-pointer text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky FAB for Quick Actions */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 group cursor-pointer"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300">
          add
        </span>
        <span className="absolute right-20 px-3 py-1.5 bg-on-surface text-surface rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Quick Store Link
        </span>
      </button>

      {/* Link Store Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fadeIn">
          <div className="bg-surface-container-lowest border border-outline-variant max-w-md w-full rounded-2xl shadow-2xl p-6 relative overflow-hidden animate-zoomIn">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Link New Shopify Store</h3>
            <p className="text-label-md text-on-surface-variant border-b border-outline-variant/30 pb-4 mb-6">
              Establish a secure credentials channel to sync inventory catalog items automatically.
            </p>

            <form onSubmit={handleLinkStore} className="space-y-4">
              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1.5">Store Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Health & Glow Depot"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1.5">Storefront Domain Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. healthglow-depot.com"
                  value={newStorefrontUrl}
                  onChange={(e) => setNewStorefrontUrl(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-label-md font-bold text-on-surface mb-1.5">
                  Shopify Admin Address <span className="text-on-surface-variant font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. admin.shopify.com/store/healthglow-depot"
                  value={newAdminUrl}
                  onChange={(e) => setNewAdminUrl(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-outline-variant/30 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-outline-variant rounded-xl text-label-md font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary rounded-xl text-label-md font-bold hover:brightness-110 transition-colors shadow-md cursor-pointer"
                >
                  Connect Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed bottom-10 right-10 flex items-center gap-3 bg-on-surface text-surface py-3.5 px-6 rounded-xl shadow-2xl z-[100] transition-all animate-bounce">
          <span className="material-symbols-outlined text-primary-fixed text-xl">check_circle</span>
          <span className="text-label-md font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
