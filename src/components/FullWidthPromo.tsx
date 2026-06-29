"use client";

import React from "react";

export const FullWidthPromo: React.FC = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-margin-desktop mb-section-desktop select-none">
      <div className="relative h-[450px] rounded-[32px] overflow-hidden group shadow-md border border-surface-container/20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQqcI3hayocd8Dadt_W7kANcpDIOPlpPYD7zP5dklqrZZE5_917qMo_oQEWix7KrIa5cjqWMJ9LlryAuCPtwtKfHo7oJiV25WBpjBGbkHsXY-UQ1mYPDODqeYEHoVcgaDfS1tYmUHmfkjfUdb1YWkkH7MIPwl6niLRi2MwE13V-HB3v4N9uusmxFNUahnk9C9w0AC2cYP68vm1NfOdJV5t75Z58v62XOUDHELhKJoYxzkj8G2xFC6asWnpppWl-xZlqnhkUBzOEDc')",
          }}
        />
        {/* Dark overlay grid */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent flex items-center p-8 md:p-20">
          <div className="max-w-xl text-white">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight font-black">
              Empower Your Wellness Journey.
            </h2>
            <p className="text-white/80 text-body-lg mb-10 leading-relaxed font-medium">
              Discover the new FitPro Wearables collection designed for the ultimate athlete in you. Precision
              tracking meets timeless minimalist design.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-on-primary font-bold py-4 px-10 rounded-xl transition-all hover:bg-white hover:text-primary shadow-xl hover:shadow-white/10 active:scale-95">
                Shop Wellness
              </button>
              <button
                onClick={() => alert("Playing product promo video...")}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-xl hover:bg-white/20 transition-all active:scale-95"
              >
                Watch Promo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullWidthPromo;
