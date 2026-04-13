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

          {/* Right — photo collage (exported from Figma) */}
          <div className="flex-shrink-0 hidden md:block">
            <img src="/hero-collage.png" alt="" className="w-[340px] h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
