"use client";

import { useState, useMemo } from "react";
import { type Listing } from "@/lib/supabase";
import FilterBar from "@/components/FilterBar";
import ListingGrid from "@/components/ListingGrid";
import { useLanguage } from "@/lib/LanguageContext";
import { t, isZh } from "@/lib/i18n";

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
      if (filters.category && !listing.category?.includes(filters.category)) return false;
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
      <h1 className="text-3xl font-bold mb-1">
        {t("health", language)}
      </h1>
      <p className="text-[#6B6890] text-sm mb-6">
        {isZh(language) ? "LGBTQ+ 友善醫療服務提供者及支援組織" : language === "both" ? "LGBTQ+-affirming healthcare providers and support organizations LGBTQ+ 友善醫療服務提供者及支援組織" : "LGBTQ+-affirming healthcare providers and support organizations"}
      </p>

      <FilterBar
        categories={["Healthcare & Support", "NGOs"]}
        districts={districts}
        onFilter={setFilters}
      />

      <div className="mt-6">
        <ListingGrid listings={filtered} />
      </div>
    </div>
  );
}
