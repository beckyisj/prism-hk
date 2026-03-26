#!/usr/bin/env node
/**
 * Sync translations from Google Sheet → code files
 *
 * Reads the "Translations" tab from the PRISM Google Sheet and updates:
 * - src/lib/i18n.ts (UI translations)
 * - src/lib/tagTranslations.ts (tag translations)
 * - src/lib/districtTranslations.ts (district translations)
 * - src/lib/categories.ts (category zh/zhHans names)
 *
 * Usage: node scripts/sync-translations.js
 */

const fs = require("fs");
const path = require("path");

const SHEET_ID = "1zKolQNmY8g_oDPBPiiQLmFeNC6KFmz7xXCNgBvAtWhY";
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY || "AIzaSyAruoZCvwELngTPpym_qncSAOmIv_S3pNk";
const TAB = "Translations";

const SRC = path.join(__dirname, "..", "src", "lib");

async function fetchSheet() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB}?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.values) throw new Error("No data returned from sheet");
  return data.values;
}

function parseRows(rows) {
  // Skip header row
  const ui = [];
  const tags = [];
  const districts = [];
  const categories = [];

  for (let i = 1; i < rows.length; i++) {
    const [section, key, en, zh, zhHans] = rows[i];
    if (!section || !key) continue;

    const entry = { key: key?.trim(), en: en?.trim() || "", zh: zh?.trim() || "", zhHans: zhHans?.trim() || "" };

    switch (section?.trim()) {
      case "Tag":
        tags.push(entry);
        break;
      case "District":
        districts.push(entry);
        break;
      case "Categories":
        categories.push(entry);
        break;
      default:
        // All other sections are UI translations
        ui.push(entry);
        break;
    }
  }

  return { ui, tags, districts, categories };
}

function writeTagTranslations(tags) {
  const lines = [
    `import type { Language } from "./i18n";`,
    `import { isZh } from "./i18n";`,
    ``,
    `const tagMap: Record<string, { zh: string; zhHans: string }> = {`,
  ];

  for (const t of tags) {
    lines.push(`  "${t.key}": { zh: "${t.zh}", zhHans: "${t.zhHans}" },`);
  }

  lines.push(`};`);
  lines.push(``);
  lines.push(`export function translateTag(tag: string, language: Language): string {`);
  lines.push(`  if (!isZh(language)) return tag;`);
  lines.push(`  const entry = tagMap[tag];`);
  lines.push(`  if (!entry) return tag;`);
  lines.push(`  return language === "zh-Hans" ? entry.zhHans : entry.zh;`);
  lines.push(`}`);
  lines.push(``);

  fs.writeFileSync(path.join(SRC, "tagTranslations.ts"), lines.join("\n"));
  console.log(`  ✓ tagTranslations.ts — ${tags.length} tags`);
}

function writeDistrictTranslations(districts) {
  const lines = [
    `import type { Language } from "./i18n";`,
    `import { isZh } from "./i18n";`,
    ``,
    `const districtMap: Record<string, { zh: string; zhHans: string }> = {`,
  ];

  for (const d of districts) {
    lines.push(`  "${d.key}": { zh: "${d.zh}", zhHans: "${d.zhHans}" },`);
  }

  lines.push(`};`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * Translate a district string, handling comma-separated multi-district values.`);
  lines.push(` */`);
  lines.push(`export function translateDistrict(district: string, language: Language): string {`);
  lines.push(`  if (!isZh(language)) return district;`);
  lines.push(`  if (district.includes(",")) {`);
  lines.push(`    return district.split(",").map((d) => d.trim()).map((d) => translateSingle(d, language)).join("、");`);
  lines.push(`  }`);
  lines.push(`  return translateSingle(district, language);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`function translateSingle(district: string, language: Language): string {`);
  lines.push(`  const entry = districtMap[district];`);
  lines.push(`  if (!entry) return district;`);
  lines.push(`  return language === "zh-Hans" ? entry.zhHans : entry.zh;`);
  lines.push(`}`);
  lines.push(``);

  fs.writeFileSync(path.join(SRC, "districtTranslations.ts"), lines.join("\n"));
  console.log(`  ✓ districtTranslations.ts — ${districts.length} districts`);
}

function updateCategories(categories) {
  const catFile = path.join(SRC, "categories.ts");
  let content = fs.readFileSync(catFile, "utf-8");

  for (const cat of categories) {
    // Update zh and zhHans for matching category
    const regex = new RegExp(
      `(id: "${cat.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?zh: )"[^"]*"([\\s\\S]*?zhHans: )"[^"]*"`,
    );
    const match = content.match(regex);
    if (match) {
      content = content.replace(regex, `$1"${cat.zh}"$2"${cat.zhHans}"`);
    }
  }

  fs.writeFileSync(catFile, content);
  console.log(`  ✓ categories.ts — ${categories.length} categories updated`);
}

function updateI18n(uiEntries) {
  const i18nFile = path.join(SRC, "i18n.ts");
  let content = fs.readFileSync(i18nFile, "utf-8");

  // Build lookup maps
  const zhMap = {};
  const zhHansMap = {};
  for (const entry of uiEntries) {
    if (entry.zh) zhMap[entry.key] = entry.zh;
    if (entry.zhHans) zhHansMap[entry.key] = entry.zhHans;
  }

  // Update zh entries
  for (const [key, val] of Object.entries(zhMap)) {
    const escaped = val.replace(/"/g, '\\"');
    // Match key in zh section
    const regex = new RegExp(`(  zh:[\\s\\S]*?"${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}": )"[^"]*"`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1"${escaped}"`);
    }
  }

  // Update zh-Hans entries
  for (const [key, val] of Object.entries(zhHansMap)) {
    const escaped = val.replace(/"/g, '\\"');
    const regex = new RegExp(`(  "zh-Hans":[\\s\\S]*?"${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}": )"[^"]*"`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1"${escaped}"`);
    }
  }

  fs.writeFileSync(i18nFile, content);
  console.log(`  ✓ i18n.ts — ${uiEntries.length} UI entries synced`);
}

async function main() {
  console.log("Fetching translations from Google Sheet...");
  const rows = await fetchSheet();
  console.log(`  Found ${rows.length - 1} rows\n`);

  const { ui, tags, districts, categories } = parseRows(rows);
  console.log("Writing translation files:");

  writeTagTranslations(tags);
  writeDistrictTranslations(districts);
  updateCategories(categories);
  updateI18n(ui);

  console.log("\n✅ Translations synced! Run `npm run dev` to see changes.");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
