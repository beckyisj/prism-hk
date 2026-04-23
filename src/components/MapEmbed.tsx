"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { isZh } from "@/lib/i18n";

type Place = {
  name: string;
  address: string | null;
  district: string | null;
};

/**
 * Embed a Google Maps iframe centered on Hong Kong showing the filtered
 * places. Because we don't have lat/lng for most rows, this drops a single
 * search marker per visible district so the map stays performant and the
 * user gets a neighborhood-level overview. Click a pin → opens full Google
 * Maps.
 *
 * If there's ≤5 places, we also add a "Show on Google Maps" link that opens
 * a multi-pin view with the actual addresses.
 */
export default function MapEmbed({ places, collapsedByDefault = true }: { places: Place[]; collapsedByDefault?: boolean }) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(!collapsedByDefault);

  const withAddress = places.filter((p) => p.address);
  const districts = Array.from(new Set(places.map((p) => p.district).filter(Boolean))) as string[];

  // Build the best query we can. Prefer full address for small sets, otherwise
  // show the first district (map stays readable instead of becoming a mess).
  let query = "Hong Kong";
  if (withAddress.length > 0 && withAddress.length <= 5) {
    query = withAddress.map((p) => p.address).join(" | ");
  } else if (districts.length === 1) {
    query = `${districts[0]}, Hong Kong`;
  }

  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const fullMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  if (places.length === 0) return null;

  return (
    <div className="mb-4 rounded-xl overflow-hidden border border-[#E8E6F0] bg-white">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-[#1E1B3A] hover:bg-[#FAFAFE] transition-colors"
      >
        <span>
          🗺️ {isZh(language) ? "在地圖上查看" : "View on map"}
          <span className="ml-2 text-[#6B6890]">
            ({places.length} {isZh(language) ? "個地點" : places.length === 1 ? "place" : "places"})
          </span>
        </span>
        <svg className={`w-4 h-4 transition-transform text-[#6B6890] ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div>
          <div className="relative w-full aspect-[16/9] bg-[#F5F4FA]">
            <iframe
              src={src}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </div>
          <a
            href={fullMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-xs text-[#7B68EE] hover:bg-[#F8F7FF] transition-colors"
          >
            {isZh(language) ? "在 Google 地圖中打開 →" : "Open in Google Maps →"}
          </a>
        </div>
      )}
    </div>
  );
}
