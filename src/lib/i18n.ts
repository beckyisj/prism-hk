export type Language = "en" | "zh" | "both";

export const ui = {
  en: {
    // Nav
    home: "Home",
    directory: "Directory",
    health: "Health & Support",
    events: "Events",
    learn: "Learn",
    getInvolved: "Get Involved",
    support: "Support",

    // Hero
    heroTitle: "PRISM",
    heroSubtitle: "Find LGBTQ+-friendly businesses, community groups, healthcare, NGOs, and events across all 18 districts of Hong Kong.",
    listings: "Listings",
    districts: "Districts",
    categories: "Categories",

    // Directory
    search: "Search businesses, groups, services...",
    all: "All",
    verified: "Verified",
    noResults: "No listings found matching your search.",

    // Categories
    Business: "Business",
    Community: "Community",
    Healthcare: "Healthcare",
    NGO: "NGO",
    Government: "Government",
    Media: "Media",
    Other: "Other",

    // Health
    emergencyTitle: "Crisis & Emergency Resources",
    emergencyDesc: "If you or someone you know needs immediate support:",
    samaritans: "The Samaritans — 24hr hotline",
    mindHK: "Mind HK — Mental health support",

    // Events
    comingSoon: "Coming Soon",
    eventsDesc: "Community events calendar launching soon. In the meantime, check out these organizations:",

    // Get Involved
    getInvolvedTitle: "Get Involved",
    submitListing: "Submit a Listing",
    submitEvent: "Submit an Event",
    volunteer: "Volunteer",

    // Support
    supportTitle: "Support PRISM",
    supportDesc: "PRISM is a volunteer-run project. Your support helps keep the directory updated and accessible.",

    // Learn
    learnTitle: "About PRISM",
    learnDesc: "PRISM is a bilingual LGBTQ+ directory and community platform for Hong Kong. We connect people with affirming businesses, healthcare providers, community groups, NGOs, and events across all 18 districts.",

    // Footer
    footerTagline: "Hong Kong's LGBTQ+ bilingual directory.",
    footerBuiltWith: "Built with love for the community.",
  },
  zh: {
    home: "首頁",
    directory: "目錄",
    health: "健康支援",
    events: "活動",
    learn: "了解更多",
    getInvolved: "參與",
    support: "支持",

    heroTitle: "PRISM",
    heroSubtitle: "探索香港十八區的 LGBTQ+ 友善商戶、社區組織、醫療服務、NGO 及活動。",
    listings: "商戶",
    districts: "地區",
    categories: "類別",

    search: "搜尋商戶、組織、服務...",
    all: "全部",
    verified: "已驗證",
    noResults: "找不到符合搜尋條件的商戶。",

    Business: "商戶",
    Community: "社區",
    Healthcare: "醫療",
    NGO: "非政府組織",
    Government: "政府",
    Media: "媒體",
    Other: "其他",

    emergencyTitle: "危機及緊急資源",
    emergencyDesc: "如果你或身邊的人需要即時支援：",
    samaritans: "撒瑪利亞防止自殺會 — 24小時熱線",
    mindHK: "Mind HK — 精神健康支援",

    comingSoon: "即將推出",
    eventsDesc: "社區活動日曆即將推出。在此期間，歡迎瀏覽以下組織：",

    getInvolvedTitle: "參與",
    submitListing: "提交商戶",
    submitEvent: "提交活動",
    volunteer: "義工",

    supportTitle: "支持 PRISM",
    supportDesc: "PRISM 由義工營運。你的支持有助維持目錄的更新及可及性。",

    learnTitle: "關於 PRISM",
    learnDesc: "PRISM 是一個服務香港的雙語 LGBTQ+ 目錄及社區平台。我們連結人們與友善的商戶、醫療提供者、社區組織、非政府組織及十八區的活動。",

    footerTagline: "香港 LGBTQ+ 雙語目錄。",
    footerBuiltWith: "用愛為社區而建。",
  },
} as const;

export function t(key: keyof typeof ui.en, lang: Language): string {
  if (lang === "both") {
    const en = ui.en[key];
    const zh = ui.zh[key];
    if (en === zh) return en;
    return `${en} ${zh}`;
  }
  return lang === "zh" ? ui.zh[key] : ui.en[key];
}

export function bilingualText(
  en: string | null | undefined,
  zh: string | null | undefined,
  lang: Language
): string {
  const enText = en || "";
  const zhText = zh || "";

  if (lang === "en") return enText || zhText;
  if (lang === "zh") return zhText || enText;
  // "both" mode
  if (!zhText) return enText;
  if (!enText) return zhText;
  if (enText === zhText) return enText;
  return `${enText}\n${zhText}`;
}
