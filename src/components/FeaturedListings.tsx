"use client";

import { type Listing } from "@/lib/supabase";
import ListingCard from "./ListingCard";

export default function FeaturedListings({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <p className="text-center text-[#6B6890] text-sm py-8">
        No featured listings yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
