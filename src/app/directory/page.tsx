import { Suspense } from "react";
import { getPublishedListings, getDistinctDistricts, getDistinctTags, getDistinctPrices } from "@/lib/supabase";
import DirectoryClient from "./DirectoryClient";

export const revalidate = 300;

export const metadata = {
  title: "Explore — PRISM HK 探索",
  description: "Explore LGBTQ+-friendly spaces and support across Hong Kong. 探索香港各區 LGBTQ+ 友善空間及支援。",
};

export default async function DirectoryPage() {
  const [listings, districts, tags, prices] = await Promise.all([
    getPublishedListings(),
    getDistinctDistricts(),
    getDistinctTags(),
    getDistinctPrices(),
  ]);

  return (
    <Suspense>
      <DirectoryClient listings={listings} districts={districts} tags={tags} prices={prices} />
    </Suspense>
  );
}
