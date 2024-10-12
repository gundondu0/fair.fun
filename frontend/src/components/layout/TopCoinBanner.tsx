"use client";
import { Fire } from "@phosphor-icons/react";
import TopCoingBannerContent from "../ui/TopCoinBannerContent";

export default function TopCoinBanner() {
  return (
    <div className="bg-theme-bg bg-opacity-90 flex flex-col gap-8 border rounded-2xl p-4 justify-center items-center w-8/12 mx-auto shadow transition-colors duration-300">
      <div className="flex flex-row justify-center items-center gap-2 border-2 border-theme-text/60 p-2 rounded transition-colors duration-300">
        <p className="text-3xl font-bold text-theme-text transition-colors duration-300">
          🔥 On Fire 🔥
        </p>
      </div>
      <TopCoingBannerContent />
    </div>
  );
}
