"use client";

import React, { useState, useEffect } from "react";

export const AnnouncementBar: React.FC = () => {
  // 2 hours, 45 minutes, 12 seconds = 9912 seconds
  const [timeLeft, setTimeLeft] = useState(9912);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 9912; // Reset for demo purposes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-primary text-on-primary py-2 px-margin-desktop hidden md:block">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center text-label-sm font-semibold">
        <p className="tracking-wide">
          Flash Sale: Use Code <span className="font-bold text-primary-fixed bg-white/10 px-2 py-0.5 rounded">TOKOO2026</span> for 20% Off! Ends in{" "}
          <span className="font-bold font-mono tracking-wider bg-white/20 px-2 py-0.5 rounded text-white inline-block min-w-[70px]">
            {formatTime(timeLeft)}
          </span>
        </p>
        <div className="flex gap-6">
          <a className="hover:text-primary-fixed transition-colors" href="#">
            Store Locator
          </a>
          <a className="hover:text-primary-fixed transition-colors" href="#">
            Track Order
          </a>
          <a className="hover:text-primary-fixed transition-colors" href="#">
            Support
          </a>
        </div>
      </div>
    </div>
  );
};
export default AnnouncementBar;
