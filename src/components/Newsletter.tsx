"use client";

import React, { useState } from "react";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <section className="bg-surface-container-highest py-20 select-none">
      <div className="max-w-[800px] mx-auto px-margin-mobile text-center">
        {/* Mail Icon Wrapper */}
        <div className="mb-10 inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full text-primary border border-primary/15 shadow-inner">
          <span className="material-symbols-outlined text-[40px]" data-icon="mail">
            mail
          </span>
        </div>

        {/* Headings */}
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 font-black text-on-surface leading-tight">
          Stay Ahead of the Curve
        </h2>
        <p className="text-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto leading-relaxed font-medium">
          Subscribe to our newsletter for exclusive early access to product drops, member-only discounts, and the
          latest tech trends.
        </p>

        {/* Subscription Form */}
        {isSubscribed ? (
          <div className="bg-primary/10 border border-primary/30 p-6 rounded-2xl max-w-md mx-auto text-primary font-bold flex items-center justify-center gap-3 animate-fade-in">
            <span className="material-symbols-outlined">check_circle</span>
            Thank you! You've subscribed successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-white border border-transparent rounded-2xl py-5 px-8 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-body-md text-on-surface font-medium transition-all"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary font-bold px-12 py-5 rounded-2xl hover:bg-on-primary-fixed-variant transition-all active:scale-95 shadow-lg hover:shadow-primary/20"
            >
              Subscribe Now
            </button>
          </form>
        )}

        <p className="mt-6 text-label-sm text-on-surface-variant font-medium">
          By subscribing, you agree to our{" "}
          <a className="underline hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="underline hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
