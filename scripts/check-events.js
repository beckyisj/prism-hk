#!/usr/bin/env node
/**
 * Check configured sources for new events not yet in the Google Sheet Events tab.
 *
 * Add sources to the "Scrapers" tab of the PRISM sheet, or fall back to the
 * hardcoded SOURCES list below. Supports Meetup, Tessera, Eventbrite, and any
 * page that exposes schema.org/Event JSON-LD.
 *
 * Usage: node scripts/check-events.js
 */

const SHEET_ID = "1zKolQNmY8g_oDPBPiiQLmFeNC6KFmz7xXCNgBvAtWhY";
const API_KEY = "AIzaSyAruoZCvwELngTPpym_qncSAOmIv_S3pNk";

const SOURCES = [
  { url: "https://www.meetup.com/fruits-in-suits-fins/events/", org: "Fruits in Suits" },
  { url: "https://www.yourtessera.com/o/fagaihk", org: "Fa Gai" },
];

async function getExistingEvents() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Events?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  const rows = data.values || [];
  const existing = new Set();
  for (const row of rows.slice(1)) {
    const name = (row[0] || "").trim().toLowerCase();
    const date = (row[6] || "").trim();
    if (name) existing.add(`${name}|${date}`);
  }
  return existing;
}

async function getScraperSources() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Scrapers?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const rows = data.values || [];
  if (rows.length < 2) return null;
  const headers = rows[0].map((h) => h.toLowerCase().trim());
  const urlIdx = headers.findIndex((h) => h.includes("url"));
  const orgIdx = headers.findIndex((h) => h.includes("org") || h.includes("organization"));
  const sources = [];
  for (const row of rows.slice(1)) {
    const url = (row[urlIdx] || "").trim();
    const org = (row[orgIdx] || "").trim();
    if (url) sources.push({ url, org });
  }
  return sources;
}

function extractJsonLdEvents(html) {
  const events = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1]);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        const node = item["@graph"] ? [].concat(item["@graph"]) : [item];
        for (const n of node) {
          const type = n["@type"];
          if (!type) continue;
          const types = Array.isArray(type) ? type : [type];
          if (types.some((t) => String(t).toLowerCase().includes("event"))) {
            events.push(n);
          }
        }
      }
    } catch {
      // skip invalid JSON-LD block
    }
  }
  return events;
}

async function scrape(source) {
  const res = await fetch(source.url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PRISM-HK/1.0; +https://prism.lgbt)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  const jsonLdEvents = extractJsonLdEvents(html);
  return jsonLdEvents.map((e) => ({
    name: (e.name || "").trim(),
    date: e.startDate || "",
    endDate: e.endDate || "",
    location: e.location?.name || e.location?.address?.streetAddress || "",
    district: e.location?.address?.addressLocality || "",
    description: typeof e.description === "string" ? e.description : "",
    url: e.url || source.url,
    image: Array.isArray(e.image) ? e.image[0] : e.image || "",
  }));
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return "";
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function formatTime(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return "";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

async function main() {
  console.log("Checking event sources...\n");

  const existing = await getExistingEvents();
  console.log(`Found ${existing.size} existing events.\n`);

  const sheetSources = await getScraperSources();
  const sources = sheetSources && sheetSources.length ? sheetSources : SOURCES;
  console.log(`Sources: ${sources.length} (from ${sheetSources ? "sheet" : "fallback"})\n`);

  const newEvents = [];

  for (const source of sources) {
    console.log(`Scraping ${source.url}...`);
    try {
      const events = await scrape(source);
      if (events.length === 0) {
        console.log("  (no events found — page may not expose JSON-LD)");
        continue;
      }
      for (const event of events) {
        const date = formatDate(event.date);
        if (!event.name || !date) continue;
        const key = `${event.name.toLowerCase().trim()}|${date}`;
        if (existing.has(key)) {
          console.log(`  ✓ Already in sheet: ${event.name} (${date})`);
        } else {
          console.log(`  ★ NEW: ${event.name} (${date})`);
          newEvents.push({ ...event, org: source.org, formattedDate: date });
        }
      }
    } catch (err) {
      console.log(`  ✗ Failed: ${err.message}`);
    }
  }

  if (newEvents.length === 0) {
    console.log("\n✅ No new events.");
    return;
  }

  console.log(`\n=== ${newEvents.length} new event(s) — paste into Events sheet ===\n`);
  for (const e of newEvents) {
    console.log(`Event Name (EN): ${e.name}`);
    console.log(`Organization: ${e.org}`);
    console.log(`Date: ${e.formattedDate}`);
    console.log(`Start Time: ${formatTime(e.date)}`);
    console.log(`End Time: ${formatTime(e.endDate)}`);
    console.log(`Link: ${e.url}`);
    console.log(`Venue: ${e.location}`);
    console.log(`District: ${e.district}`);
    console.log(`Image: ${e.image}`);
    console.log(`Description: ${e.description.substring(0, 200)}...`);
    console.log("");
  }
}

main().catch(console.error);
