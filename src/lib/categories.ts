export const CATEGORIES = [
  {
    id: "Business",
    emoji: "\uD83C\uDFEA",
    gradient: "from-[#7B68EE] to-[#A78BFA]",
    en: "Businesses",
    zh: "商戶",
  },
  {
    id: "Community",
    emoji: "\uD83E\uDD1D",
    gradient: "from-[#F472B6] to-[#E879F9]",
    en: "Community & Student Groups",
    zh: "社區及學生組織",
  },
  {
    id: "Healthcare",
    emoji: "\u2694\uFE0F",
    gradient: "from-[#22C55E] to-[#16A34A]",
    en: "Healthcare",
    zh: "醫療服務",
  },
  {
    id: "NGO",
    emoji: "\uD83C\uDF0E",
    gradient: "from-[#FFA726] to-[#FB923C]",
    en: "NGOs & Advocacy",
    zh: "非政府組織",
  },
  {
    id: "Government",
    emoji: "\uD83C\uDFDB\uFE0F",
    gradient: "from-[#38BDF8] to-[#0EA5E9]",
    en: "Government",
    zh: "政府",
  },
  {
    id: "Media",
    emoji: "\uD83D\uDCF0",
    gradient: "from-[#A78BFA] to-[#7C3AED]",
    en: "Media",
    zh: "媒體",
  },
] as const;

export function getCategoryInfo(categoryId: string) {
  return CATEGORIES.find((c) => c.id === categoryId) || {
    id: categoryId,
    emoji: "\uD83D\uDCCB",
    gradient: "from-gray-400 to-gray-500",
    en: categoryId,
    zh: categoryId,
  };
}

// Color palette for avatar backgrounds
const AVATAR_COLORS = [
  "from-[#FF6B6B] to-[#EE5A24]",
  "from-[#38BDF8] to-[#0EA5E9]",
  "from-[#E879F9] to-[#C084FC]",
  "from-[#22C55E] to-[#15803D]",
  "from-[#FFA726] to-[#F59E0B]",
  "from-[#7B68EE] to-[#6366F1]",
  "from-[#22D3EE] to-[#06B6D4]",
  "from-[#FB923C] to-[#F59E0B]",
  "from-[#F472B6] to-[#EC4899]",
  "from-[#A78BFA] to-[#7C3AED]",
  "from-[#EF4444] to-[#DC2626]",
  "from-[#14B8A6] to-[#0D9488]",
];

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
