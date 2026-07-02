"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertTriangle, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Login Card Container */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-lg relative z-10">
        {/* Logo and Titles */}
        <div className="text-center mb-8">
          <span className="text-2xl font-black text-emerald-700 flex items-center justify-center gap-2">
            Dropship India
          </span>
          <p className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-wide">
            Premium Merchant Console Admin Login
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-150 rounded-xl text-red-750 text-xs font-semibold flex items-center gap-2 text-red-750">
            <AlertTriangle className="shrink-0 text-red-500 w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="email-input">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-700/20 focus:bg-white outline-none text-slate-800"
                placeholder="admin@dropship.in"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700" htmlFor="password-input">
                Password
              </label>
              <a href="#" className="text-xs text-emerald-700 hover:text-emerald-800 hover:underline font-bold">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                id="password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-700/20 focus:bg-white outline-none text-slate-800"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs text-slate-500 font-semibold cursor-pointer select-none">
              Remember my session
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-emerald-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-emerald-800 shadow-sm active:scale-98 transition-all ${
              loading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Testing Credentials: <span className="font-bold text-slate-700">admin@dropship.in</span> /{" "}
            <span className="font-bold text-slate-700">admin123</span>
          </p>
        </div>
      </div>

      {/* Back to Storefront Link */}
      <a href="/" className="mt-6 text-xs text-slate-500 hover:text-emerald-700 transition-colors flex items-center gap-1 font-bold">
        <ArrowLeft className="w-3.5 h-3.5" />
        Return to Shopify Storefront
      </a>
    </div>
  );
}
