"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Slide {
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
}

const SLIDES: Slide[] = [
  {
    badge: "Limited Edition",
    title: "Elevate Your Sound. Experience Pure Clarity.",
    subtitle: "Pre-order the new Atmos-X Pro series today and get a complimentary charging dock.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO0Vb9c32ifi6hXAAd4YNVJCejw4FEo3ZkcP9_uzxLBQtFil7tOKuRJ8mHYqUKacmjscjSyg11Q9TCWk9e-NVtp9Vj1CumYlld85Oq61jR3YzbFJwzQHXDtvtPoPaMdtCJZnWncK_nJwDcdr8J7FOKHyKk1AsppwJOPZRhudsPvj69BvF1oTWU_NGyfHgAd-JDJqEipIs28V1B-tcrKjrFRB9d5Ei0zdhtKG3xl3f0eYDPZ3tF7KEuFiaJqTKCwx9s9yDfqpPa2cI",
    ctaText: "Shop Now",
  },
  {
    badge: "New Arrival",
    title: "Refined Elegance. Crafted for Precision.",
    subtitle: "Explore the titanium-crafted Chrono-Max Smartwatch Series with advanced diagnostic sensors.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSbwKYPM_JECEnPFPnYq-h4qxDegOfHz_-Y-wa6BwDayD0wtLsIYWVlK0alkfrP_1eetilFeueOY8P3iGfbik_K15Kqu1x9yujtjCX7lgiNQvpr7LsQTIU6FUx33dD-soLTIS462vwoF5mXJteqqKL6v7ihTsHcF_6UZ9zF8Od-02J7qS3igQSIB0vYIMnFeLZSbQmAKper_Jra0XsHFT6nTYvJ_6f2IfluUY1bVXaTQXt1oawzZsXkDSUOs4spMY4ksGXAxmb_gk",
    ctaText: "Explore Collection",
  },
  {
    badge: "Best Seller",
    title: "Unleash Power. Conquer Every Arena.",
    subtitle: "Upgrade to the Phantom mechanical keyboard and wireless pro gaming mouse bundle today.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQPH9CkXE94ifi6cwhmnjHqnjyUY5QUPlfyBq1T8_fxbpfcxQni8fqUTNEpeWJhFdSWR-ZCaPl4M7868jV8Qkap7AMMZ0YeWVS2v-hP_03K95lqxPVGi8jrqG74Rb0MpRT1G8Gko3RJkkTnvpDwfHwC2ftJTm1pDalSMPPBpw-g3dYr_R0BQ1G4QwB2SUalWjWS_4RZDWT9F4DXI0pl68T5GyY9NNe8Nrw7mltpHj6mBTojkeaK24BnpbgXoWT8xF4KxwFxireRuE",
    ctaText: "View Details",
  },
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Run GSAP slide transition animations
    const ctx = gsap.context(() => {
      // Background Image zoom reveal
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      // Slide texts staggered reveal
      const targets = textContainerRef.current?.children;
      if (targets) {
        gsap.fromTo(
          targets,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [currentIndex]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[currentIndex];

  return (
    <section className="col-span-12 lg:col-span-6 md:col-span-8 relative overflow-hidden rounded-xl group h-[380px] md:h-[550px] shadow-sm select-none">
      {/* Background Image */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${slide.imageUrl}')` }}
      />
      {/* Dark Overlay Grid */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent flex flex-col justify-center px-6 md:px-12 text-white">
        <div ref={textContainerRef} className="max-w-md flex flex-col">
          <span className="bg-primary-container text-on-primary-container font-bold px-3 py-1.5 rounded-full text-label-sm w-fit mb-3 md:mb-4 uppercase tracking-wider select-none shadow">
            {slide.badge}
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg max-w-md mb-3 md:mb-4 leading-tight font-black">
            {slide.title}
          </h1>
          <p className="text-body-md md:text-body-lg max-w-sm mb-6 md:mb-8 opacity-90 leading-relaxed font-medium">
            {slide.subtitle}
          </p>
          <button className="bg-primary text-on-primary font-bold py-3 px-8 md:py-4 md:px-10 rounded-xl w-fit transition-all hover:bg-on-primary-fixed-variant active:scale-95 shadow-xl hover:shadow-primary/20">
            {slide.ctaText}
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-6 md:bottom-6 md:left-12 flex gap-3 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-9 bg-primary shadow-lg"
                : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
