"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { isZh } from "@/lib/i18n";

type HeroProps = {
  listingsCount: number;
  categoriesCount: number;
  districtsCount: number;
};

export default function Hero({}: HeroProps) {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-28 pb-8 bg-[#FAFAFE]">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
          {/* Left — text */}
          <div className="flex-1 pt-2">
            <p className="text-sm font-semibold text-[#7B68EE] tracking-wide mb-2">
              Find Your Wavelength
            </p>
            <h1 className="text-3xl md:text-[2.5rem] font-bold leading-[1.2] text-[#1E1B3A] whitespace-pre-line">
              {isZh(language)
                ? "探索香港 LGBTQ+\n資源與活動。"
                : "Explore LGBTQ+\nresources and events."}
            </h1>
          </div>

          {/* Right — photo collage with floating bubbles */}
          <div className="flex-shrink-0 hidden md:block relative w-[340px] h-[260px]">
            {/* PRISM peace badge */}
            <div className="absolute -top-2 left-[90px] z-10 w-[60px] h-[60px] bg-white rounded-full shadow-md flex items-center justify-center border-2 border-[#1E1B3A]/10">
              <span className="text-2xl">☮️</span>
            </div>

            {/* Main photo (flags — top right) */}
            <div className="absolute top-[30px] right-0 w-[210px] h-[170px] rounded-2xl overflow-hidden shadow-lg outline outline-1 outline-black/5">
              <img src="/hero-5.png" alt="" className="w-full h-full object-cover" />
            </div>

            {/* Secondary photo (pride arm — bottom left) */}
            <div className="absolute bottom-0 left-0 w-[160px] h-[140px] rounded-2xl overflow-hidden shadow-lg outline outline-1 outline-black/5">
              <img src="/hero-1.png" alt="" className="w-full h-full object-cover" />
            </div>

            {/* Floating category bubbles */}
            <div className="absolute top-[50px] left-0 bg-white rounded-full pl-2 pr-3 py-1.5 flex items-center gap-1.5 shadow-md border border-[#E8E6F0]">
              <span className="w-5 h-5 rounded bg-amber-100 flex items-center justify-center text-[10px]">🏥</span>
              <span className="text-[11px] font-medium text-[#1E1B3A]">{isZh(language) ? "醫療及支援" : "Healthcare & Support"}</span>
            </div>
            <div className="absolute top-[120px] right-[-12px] bg-white rounded-full pl-2 pr-3 py-1.5 flex items-center gap-1.5 shadow-md border border-[#E8E6F0]">
              <span className="w-5 h-5 rounded bg-pink-100 flex items-center justify-center text-[10px]">💜</span>
              <span className="text-[11px] font-medium text-[#1E1B3A]">{isZh(language) ? "商戶" : "Businesses"}</span>
            </div>
            <div className="absolute bottom-[15px] left-[80px] bg-white rounded-full pl-2 pr-3 py-1.5 flex items-center gap-1.5 shadow-md border border-[#E8E6F0]">
              <span className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-[10px]">🌐</span>
              <span className="text-[11px] font-medium text-[#1E1B3A]">{isZh(language) ? "社區及NGO" : "Community & NGOs"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
