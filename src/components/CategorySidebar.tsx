"use client";

import React, { useState } from "react";

interface Category {
  name: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { name: "Smartphones", icon: "smartphone" },
  { name: "Laptops", icon: "laptop" },
  { name: "Cameras", icon: "photo_camera" },
  { name: "Headphones", icon: "headphones" },
  { name: "Gaming", icon: "videogame_asset" },
  { name: "Watches", icon: "watch" },
  { name: "Accessories", icon: "mouse" },
  { name: "Daily Offers", icon: "local_offer" },
];

export const CategorySidebar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Smartphones");

  return (
    <aside className="hidden lg:flex lg:col-span-3 bg-surface-container-low rounded-xl p-4 flex-col gap-2 overflow-y-auto max-h-[550px] shadow-sm">
      <div className="mb-4">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Categories</h3>
        <p className="text-label-md text-on-surface-variant">Shop by Department</p>
      </div>
      <div className="space-y-1">
        {CATEGORIES.map((cat) => {
          const isActive = cat.name === activeCategory;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 active:translate-x-1 select-none text-left ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-md"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined" data-icon={cat.icon}>
                {cat.icon}
              </span>
              <span className="text-label-md font-label-md">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default CategorySidebar;
