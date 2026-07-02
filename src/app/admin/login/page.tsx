"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("admin@dropship.in");
  const [password, setPassword] = useState<string>("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // If already logged in, redirect directly to admin panel
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin_logged_in");
      if (isLoggedIn === "true") {
        router.push("/admin");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate network authentication delay
    setTimeout(() => {
      if (email === "admin@dropship.in" && password === "admin123") {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_logged_in", "true");
        }
        router.push("/admin");
      } else {
        setError("Invalid email address or password.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Login Card Container */}
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-2xl relative z-10">
        {/* Logo and Titles */}
        <div className="text-center mb-8">
          <span className="font-display-lg text-headline-md font-black text-primary flex items-center justify-center gap-2">
            Dropship India
          </span>
          <p className="text-label-md text-on-surface-variant mt-2 font-medium">
            Premium Merchant Console Administrator Login
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 p-4 bg-error-container/30 border border-error-container/50 rounded-xl text-error text-label-md font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined shrink-0 text-[20px]">warning</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-1.5" htmlFor="email-input">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                mail
              </span>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3.5 text-body-md focus:ring-2 focus:ring-primary/20 outline-none text-on-surface"
                placeholder="admin@dropship.in"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-label-md font-bold text-on-surface" htmlFor="password-input">
                Password
              </label>
              <a href="#" className="text-xs text-primary hover:underline font-bold">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                lock
              </span>
              <input
                id="password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl pl-11 pr-4 py-3.5 text-body-md focus:ring-2 focus:ring-primary/20 outline-none text-on-surface"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              defaultChecked
              className="h-4.5 w-4.5 text-primary border-outline-variant/50 rounded focus:ring-primary/20 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 text-label-sm text-on-surface-variant font-medium cursor-pointer select-none">
              Remember my session
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-lg active:scale-98 transition-all ${
              loading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-on-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Authenticating Admin...</span>
              </>
            ) : (
              <span>Sign In to Console</span>
            )}
          </button>
        </form>

        {/* Credentials hints */}
        <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
          <p className="text-[12px] text-on-surface-variant">
            Testing Credentials: <span className="font-bold text-on-surface">admin@dropship.in</span> /{" "}
            <span className="font-bold text-on-surface">admin123</span>
          </p>
        </div>
      </div>

      {/* Back to Storefront Link */}
      <a href="/" className="mt-8 text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 font-bold">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Return to Shopify Storefront
      </a>
    </div>
  );
}
