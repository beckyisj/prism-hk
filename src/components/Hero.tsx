"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t, ui, isZh } from "@/lib/i18n";

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

  return (
    <section className="relative overflow-hidden pt-28 pb-16 bg-[#FAFAFE]">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-6">
          {/* Left side — text */}
          <div className="flex-1 max-w-lg pt-2">
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.15] bg-gradient-to-r from-[#7B68EE] via-[#E879F9] to-[#F472B6] bg-clip-text text-transparent">
              Find your{"\n"}wavelength.
            </h1>

            <p className="mt-5 text-[#6B6890] text-sm leading-relaxed max-w-sm">
              {isZh(language)
                ? (language === "zh-Hans" ? ui["zh-Hans"].heroSubtitle : ui.zh.heroSubtitle)
                : ui.en.heroSubtitle}
            </p>
          </div>

          {/* Right side — staggered stats + photos (desktop) */}
          <div className="flex-shrink-0 relative w-[360px] h-[380px] hidden md:block">
            {/* Row 1: Districts + Flag photo */}
            <div className="absolute top-0 left-[40px]">
              <StatCard value={districtsCount} label={t("districts", language)} />
            </div>
            <div className="absolute top-0 right-0 w-[180px] h-[150px] rounded-2xl overflow-hidden shadow-sm">
              <img src="/hero-flags.png" alt="Pride flags" className="w-full h-full object-cover" />
            </div>

            {/* Row 2: Listings + Categories */}
            <div className="absolute top-[120px] left-0">
              <StatCard value={listingsCount} label={t("listings", language)} />
            </div>
            <div className="absolute top-[155px] left-[160px]">
              <StatCard value={categoriesCount} label={t("categories", language)} />
            </div>

            {/* Row 3: Pride photo + 24/7 */}
            <div className="absolute bottom-[10px] left-[20px] w-[150px] h-[130px] rounded-2xl overflow-hidden shadow-sm">
              <img src="/hero-pride.png" alt="Pride celebration" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-[5px] right-[10px]">
              <StatCard value="24/7" label={isZh(language) ? "全天候" : "Online"} />
            </div>
          </div>

          {/* Mobile stats — compact row */}
          <div className="flex flex-wrap gap-3 md:hidden">
            {[
              { value: districtsCount, label: t("districts", language) },
              { value: listingsCount, label: t("listings", language) },
              { value: categoriesCount, label: t("categories", language) },
              { value: "24/7", label: isZh(language) ? "全天候" : "Online" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#E8DFFF]/60 rounded-xl px-4 py-2.5 text-center">
                <div className="text-lg font-bold text-[#7B68EE] tabular-nums">
                  {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                </div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-[#6B6890] font-semibold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="bg-[#E8DFFF]/50 rounded-2xl px-7 py-4 text-center shadow-sm">
      <div className="text-3xl font-bold text-[#7B68EE] tabular-nums">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-[9px] uppercase tracking-[0.2em] text-[#6B6890] font-semibold mt-1">
        {label}
      </div>
    </div>
  );
}
