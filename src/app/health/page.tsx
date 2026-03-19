import { getPublishedListings, getDistinctDistricts } from "@/lib/supabase";
import HealthClient from "./HealthClient";

export const revalidate = 300;

export const metadata = {
  title: "Health & Support — PRISM HK 健康支援",
  description: "LGBTQ+-affirming healthcare providers in Hong Kong. 香港 LGBTQ+ 友善醫療服務。",
};

export default async function HealthPage() {
  const [allListings, districts] = await Promise.all([
    getPublishedListings(),
    getDistinctDistricts(),
  ]);

  // Pre-filter to Healthcare + relevant NGOs
  const healthListings = allListings.filter(
    (l) => l.category === "Healthcare" || l.category === "NGO"
  );

  return <HealthClient listings={healthListings} districts={districts} />;
}
