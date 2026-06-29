"use client";

import React from "react";

export const PromoBanners: React.FC = () => {
  return (
    <section className="col-span-12 lg:col-span-3 md:col-span-4 hidden md:flex md:flex-col gap-4 h-[300px] md:h-[550px]">
      {/* Smart Watches Banner */}
      <div className="h-1/2 rounded-xl overflow-hidden relative group shadow-sm">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSbwKYPM_JECEnPFPnYq-h4qxDegOfHz_-Y-wa6BwDayD0wtLsIYWVlK0alkfrP_1eetilFeueOY8P3iGfbik_K15Kqu1x9yujtjCX7lgiNQvpr7LsQTIU6FUx33dD-soLTIS462vwoF5mXJteqqKL6v7ihTsHcF_6UZ9zF8Od-02J7qS3igQSIB0vYIMnFeLZSbQmAKper_Jra0XsHFT6nTYvJ_6f2IfluUY1bVXaTQXt1oawzZsXkDSUOs4spMY4ksGXAxmb_gk')",
          }}
        />
        {/* Dark overlay grid */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/35 to-transparent">
          <h2 className="text-white font-headline-sm mb-2 font-bold tracking-tight">Smart Watches</h2>
          <a
            className="text-primary-fixed text-label-md font-bold hover:text-white transition-colors flex items-center gap-1 w-fit group/btn"
            href="#"
          >
            Shop Collection{" "}
            <span
              className="material-symbols-outlined text-[16px] transform group-hover/btn:translate-x-1 transition-transform"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </a>
        </div>
      </div>

      {/* Gaming Gear Banner */}
      <div className="h-1/2 rounded-xl overflow-hidden relative group shadow-sm">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQPH9CkXE94ifi6cwhmnjHqnjyUY5QUPlfyBq1T8_fxbpfcxQni8fqUTNEpeWJhFdSWR-ZCaPl4M7868jV8Qkap7AMMZ0YeWVS2v-hP_03K95lqxPVGi8jrqG74Rb0MpRT1G8Gko3RJkkTnvpDwfHwC2ftJTm1pDalSMPPBpw-g3dYr_R0BQ1G4QwB2SUalWjWS_4RZDWT9F4DXI0pl68T5GyY9NNe8Nrw7mltpHj6mBTojkeaK24BnpbgXoWT8xF4KxwFxireRuE')",
          }}
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/35 to-transparent">
          <h2 className="text-white font-headline-sm mb-2 font-bold tracking-tight">Gaming Gear</h2>
          <a
            className="text-primary-fixed text-label-md font-bold hover:text-white transition-colors flex items-center gap-1 w-fit group/btn"
            href="#"
          >
            View Details{" "}
            <span
              className="material-symbols-outlined text-[16px] transform group-hover/btn:translate-x-1 transition-transform"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
