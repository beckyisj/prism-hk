"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t, ui } from "@/lib/i18n";

type HeroProps = {
  listingsCount: number;
  categoriesCount: number;
  districtsCount: number;
};

export default function Hero({
  listingsCount,
  categoriesCount,
  districtsCount,
}: HeroProps) {
  const { language } = useLanguage();

  const stats = [
    {
      value: listingsCount,
      label: t("listings", language),
    },
    {
      value: districtsCount,
      label: t("districts", language),
    },
    {
      value: categoriesCount,
      label: t("categories", language),
    },
    {
      value: "24/7",
      label: language === "zh" ? "全天候" : language === "both" ? "Online 線上" : "Online",
    },
  ];

  return (
    <section className="hero-gradient relative overflow-hidden pt-14 pb-20">
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        {/* Title */}
        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-3"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}
        >
          PRISM
        </h1>

        {/* Bilingual tagline in "both" mode */}
        {language === "both" && (
          <p className="text-lg md:text-xl text-white/80 mb-4 font-medium">
            香港 LGBTQ+ 雙語目錄
          </p>
        )}

        {/* Subtitle */}
        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          {language === "zh"
            ? ui.zh.heroSubtitle
            : language === "en"
              ? ui.en.heroSubtitle
              : `${ui.en.heroSubtitle}\n${ui.zh.heroSubtitle}`}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold"
                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.1)" }}
              >
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-wider text-white/70 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
