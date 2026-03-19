import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — PRISM HK 活動",
  description: "LGBTQ+ community events in Hong Kong. 香港 LGBTQ+ 社區活動。",
};

const COMMUNITY_ORGS = [
  { name: "Hong Kong Pride", zh: "香港同志遊行", url: "https://www.hkpride.net", emoji: "🏳️‍🌈" },
  { name: "Pink Alliance", zh: "粉紅聯盟", url: "https://www.pinkalliance.hk", emoji: "💖" },
  { name: "AIDS Concern", zh: "關懷愛滋", url: "https://aidsconcern.org.hk", emoji: "❤️" },
  { name: "Les Peches", zh: "Les Peches", url: "https://www.instagram.com/lespeches.hk", emoji: "🍑" },
  { name: "Out in HK", zh: "Out in HK", url: "https://www.outinhk.com", emoji: "🌈" },
];

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#F3F0FF] text-[#7B68EE] rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
          Coming Soon 即將推出
        </div>
        <h1 className="text-4xl font-bold mb-3">
          Events <span className="text-[#6B6890] font-medium text-2xl">活動</span>
        </h1>
        <p className="text-[#6B6890] max-w-lg mx-auto">
          The PRISM community events calendar is launching soon. In the meantime, check out these
          organizations for upcoming events.
        </p>
        <p className="text-[#6B6890] max-w-lg mx-auto text-sm mt-1">
          PRISM 社區活動日曆即將推出。在此期間，歡迎瀏覽以下組織的活動資訊。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {COMMUNITY_ORGS.map((org) => (
          <a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8E6F0] hover:border-[#A78BFA] hover:shadow-md transition-all"
          >
            <span className="text-2xl">{org.emoji}</span>
            <div>
              <div className="font-semibold text-sm text-[#1E1B3A]">{org.name}</div>
              <div className="text-xs text-[#6B6890]">{org.zh}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
