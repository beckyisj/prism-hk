"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type Listing } from "@/lib/supabase";
import FilterBar from "@/components/FilterBar";
import ListingGrid from "@/components/ListingGrid";
import { CATEGORIES } from "@/lib/categories";

type Filters = {
  search: string;
  category: string;
  district: string;
};

export default function DirectoryClient({
  listings,
  districts,
}: {
  listings: Listing[];
  districts: string[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: initialCategory,
    district: "",
  });

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      // Category filter
      if (filters.category && listing.category !== filters.category) {
        return false;
      }

      // District filter
      if (filters.district && listing.district_en !== filters.district) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const searchable = [
          listing.name_en,
          listing.name_zh,
          listing.description_en,
          listing.description_zh,
          listing.district_en,
          listing.district_zh,
          listing.category,
          ...(listing.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(q);
      }

      return true;
    });
  }, [listings, filters]);

  const categories = CATEGORIES.map((c) => c.id);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-3xl font-bold mb-1">
        Directory <span className="text-[#6B6890] font-medium text-xl">目錄</span>
      </h1>
      <p className="text-[#6B6890] text-sm mb-6">
        {listings.length} LGBTQ+-friendly listings across Hong Kong
      </p>

      <FilterBar
        categories={categories}
        districts={districts}
        onFilter={setFilters}
        initialCategory={initialCategory}
      />

      <div className="mt-6">
        <ListingGrid listings={filtered} />
      </div>
    </div>
  );
}
