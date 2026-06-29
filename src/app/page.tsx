"use client";

import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import HeroSlider from "@/components/HeroSlider";
import PromoBanners from "@/components/PromoBanners";
import DealsSection from "@/components/DealsSection";
import BestSellingSection from "@/components/BestSellingSection";
import FullWidthPromo from "@/components/FullWidthPromo";
import FlashSaleSection from "@/components/FlashSaleSection";
import BentoSection from "@/components/BentoSection";
import GamingSection from "@/components/GamingSection";
import DepartmentGrid from "@/components/DepartmentGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickViewModal from "@/components/QuickViewModal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Announcement bar at the top */}
      <AnnouncementBar />

      {/* Sticky Main Header */}
      <Header />

      {/* Hero layout grid */}
      <main className="max-w-[1440px] w-full mx-auto px-margin-desktop mt-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-[550px] mb-12">
          {/* Left departments list */}
          <CategorySidebar />

          {/* Main animated hero banner */}
          <HeroSlider />

          {/* Right watch & gear promo banner cards */}
          <PromoBanners />
        </div>
      </main>

      {/* Product list deals carousel section */}
      <DealsSection />

      {/* Grid of bestselling products */}
      <BestSellingSection />

      {/* Mid banner FitPro wearables callout */}
      <FullWidthPromo />

      {/* Green background flash sale grid and timer */}
      <FlashSaleSection />

      {/* Bento layout (Urban Luxe Collection) */}
      <BentoSection />

      {/* Gaming section category grid */}
      <GamingSection />

      {/* Shop by Department 12 circular items grid */}
      <DepartmentGrid />

      {/* Email newsletter subscription signup */}
      <Newsletter />

      {/* Footer copyright and links */}
      <Footer />

      {/* Slide-out Cart Drawer panel */}
      <CartDrawer />

      {/* Detailed overlay Quick View dialog */}
      <QuickViewModal />
    </div>
  );
}
