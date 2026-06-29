"use client";

import React from "react";

interface Department {
  icon: string;
  name: string;
  bgColorClass: string;
}

const DEPARTMENTS: Department[] = [
  { icon: "smartphone", name: "Phones", bgColorClass: "bg-blue-50/70 text-blue-700" },
  { icon: "laptop", name: "Laptops", bgColorClass: "bg-green-50/70 text-green-700" },
  { icon: "headphones", name: "Audio", bgColorClass: "bg-purple-50/70 text-purple-700" },
  { icon: "watch", name: "Watches", bgColorClass: "bg-yellow-50/70 text-yellow-700" },
  { icon: "videogame_asset", name: "Gaming", bgColorClass: "bg-red-50/70 text-red-700" },
  { icon: "photo_camera", name: "Cameras", bgColorClass: "bg-indigo-50/70 text-indigo-700" },
  { icon: "tv", name: "Smart TVs", bgColorClass: "bg-orange-50/70 text-orange-700" },
  { icon: "styler", name: "Apparel", bgColorClass: "bg-pink-50/70 text-pink-700" },
  { icon: "home", name: "Living", bgColorClass: "bg-teal-50/70 text-teal-700" },
  { icon: "garden", name: "Outdoor", bgColorClass: "bg-emerald-50/70 text-emerald-700" },
  { icon: "fitness_center", name: "Fitness", bgColorClass: "bg-rose-50/70 text-rose-700" },
  { icon: "diamond", name: "Jewelry", bgColorClass: "bg-slate-50/70 text-slate-700" },
];

export const DepartmentGrid: React.FC = () => {
  return (
    <section className="py-section-mobile md:py-section-desktop select-none">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-headline-md text-headline-md font-extrabold text-on-surface mb-3">
          Shop By Department
        </h2>
        <p className="text-on-surface-variant max-w-lg mx-auto mb-8 md:mb-12 text-body-md font-medium">
          Browse our wide selection of premium products across all categories.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-gutter">
          {DEPARTMENTS.map((dept) => (
            <a
              key={dept.name}
              href="#"
              className={`group flex flex-col items-center gap-4 p-4 sm:p-8 rounded-2xl ${dept.bgColorClass} border border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 active:scale-95`}
            >
              {/* Circular Icon Container */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors duration-300">
                <span
                  className="material-symbols-outlined text-[32px] group-hover:text-white transition-colors duration-300 text-primary"
                  data-icon={dept.icon}
                >
                  {dept.icon}
                </span>
              </div>
              <span className="font-bold text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                {dept.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentGrid;
