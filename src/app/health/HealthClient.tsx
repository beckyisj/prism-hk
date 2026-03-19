"use client";

import { useState, useMemo } from "react";
import { type Listing } from "@/lib/supabase";
import FilterBar from "@/components/FilterBar";
import ListingGrid from "@/components/ListingGrid";
import { useLanguage } from "@/lib/LanguageContext";

export default function HealthClient({
  listings,
  districts,
}: {
  listings: Listing[];
  districts: string[];
}) {
  const { language } = useLanguage();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    district: "",
  });

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      if (filters.category && listing.category !== filters.category) return false;
      if (filters.district && listing.district_en !== filters.district) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const searchable = [
          listing.name_en, listing.name_zh,
          listing.description_en, listing.description_zh,
          listing.district_en, listing.district_zh,
          ...(listing.tags || []),
        ].filter(Boolean).join(" ").toLowerCase();
        return searchable.includes(q);
      }
      return true;
    });
  }, [listings, filters]);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">
          {language === "zh" ? "危機及緊急資源" : "Crisis & Emergency Resources"}
          {language === "both" && <span className="text-sm font-medium opacity-90 ml-2">危機及緊急資源</span>}
        </h2>
        <p className="text-sm opacity-90 mb-4">
          {language === "zh"
            ? "如果你或身邊的人需要即時支援："
            : "If you or someone you know needs immediate support:"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="tel:23892222"
            className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3 hover:bg-white/25 transition-colors"
          >
            <span className="text-2xl">📞</span>
            <div>
              <div className="font-semibold text-sm">The Samaritans 撒瑪利亞防止自殺會</div>
              <div className="text-xs opacity-80">24hr hotline: 2389 2222</div>
            </div>
          </a>
          <a
            href="https://www.mind.org.hk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3 hover:bg-white/25 transition-colors"
          >
            <span className="text-2xl">🧠</span>
            <div>
              <div className="font-semibold text-sm">Mind HK</div>
              <div className="text-xs opacity-80">Mental health support 精神健康支援</div>
            </div>
          </a>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-1">
        Health & Support{" "}
        <span className="text-[#6B6890] font-medium text-xl">健康支援</span>
      </h1>
      <p className="text-[#6B6890] text-sm mb-6">
        LGBTQ+-affirming healthcare providers and support organizations
      </p>

      <FilterBar
        categories={["Healthcare", "NGO"]}
        districts={districts}
        onFilter={setFilters}
      />

      <div className="mt-6">
        <ListingGrid listings={filtered} />
      </div>
    </div>
  );
}
