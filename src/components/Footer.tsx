"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-highest text-on-surface-variant select-none border-t border-surface-container/50">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-section-desktop grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
        {/* Brand Info */}
        <div className="flex flex-col gap-6">
          <Link
            className="font-display-lg text-display-lg-mobile md:text-headline-md font-black text-primary hover:opacity-90 active:scale-95 transition-all w-fit"
            href="/"
          >
            TOKOO
          </Link>
          <p className="text-body-md leading-relaxed font-medium">
            {"Premium marketplace for the next generation. We bring you the world's most innovative products with a seamless shopping experience."}
          </p>
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary hover:text-white flex items-center justify-center transition-all active:scale-90 shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]" data-icon="public">
                public
              </span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary hover:text-white flex items-center justify-center transition-all active:scale-90 shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]" data-icon="share">
                share
              </span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary hover:text-white flex items-center justify-center transition-all active:scale-90 shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]" data-icon="hub">
                hub
              </span>
            </a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-extrabold text-on-surface mb-6 uppercase tracking-widest text-label-sm">
            Customer Service
          </h4>
          <ul className="flex flex-col gap-4 text-label-md font-semibold">
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Help Center
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Shipping Policy
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Returns &amp; Refunds
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Track Orders
              </a>
            </li>
          </ul>
        </div>

        {/* Categories Quick Links */}
        <div>
          <h4 className="font-extrabold text-on-surface mb-6 uppercase tracking-widest text-label-sm">
            Shop Departments
          </h4>
          <ul className="flex flex-col gap-4 text-label-md font-semibold">
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Phones & Tablets
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Laptops & Computers
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Cameras & Photography
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Gaming Console & Accessories
              </a>
            </li>
          </ul>
        </div>

        {/* Corporate Info */}
        <div>
          <h4 className="font-extrabold text-on-surface mb-6 uppercase tracking-widest text-label-sm">
            Our Company
          </h4>
          <ul className="flex flex-col gap-4 text-label-md font-semibold">
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                About TOKOO
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Careers (We&apos;re hiring!)
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Affiliate Program
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="#">
                Privacy & Terms
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-surface-container/60 py-6 text-center text-label-sm font-medium text-on-surface-variant/80 bg-surface-container-high/40">
        <p>&copy; {new Date().getFullYear()} TOKOO Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
