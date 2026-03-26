import { getPublishedListings, getDistinctDistricts } from "@/lib/supabase";
import HealthClient from "./HealthClient";

export const revalidate = 300;

export const metadata = {
  title: "Healthcare & Support — PRISM HK 醫療支援",
  description: "LGBTQ+-affirming healthcare providers and support services in Hong Kong. 香港 LGBTQ+ 友善醫療支援服務。",
};

export default async function HealthPage() {
  const [allListings, districts] = await Promise.all([
    getPublishedListings(),
    getDistinctDistricts(),
  ]);

  // Pre-filter to Healthcare & Support + NGOs (contains match)
  const healthListings = allListings.filter(
    (l) => l.category?.includes("Healthcare") || l.category?.includes("NGO")
  );

  return (
    <HealthClient
      listings={healthListings}
      districts={districts}
    />
  );
}
