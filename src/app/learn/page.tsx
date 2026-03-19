import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PRISM — Learn 了解更多",
  description: "About PRISM, Hong Kong's bilingual LGBTQ+ directory. 關於 PRISM 香港 LGBTQ+ 雙語目錄。",
};

export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-4xl font-bold mb-2">
        About PRISM <span className="text-[#6B6890] font-medium text-2xl">關於 PRISM</span>
      </h1>

      <div className="mt-8 space-y-8">
        <section>
          <p className="text-[#1E1B3A] leading-relaxed">
            PRISM is a bilingual LGBTQ+ directory and community platform for Hong Kong. We connect
            people with affirming businesses, healthcare providers, community groups, NGOs, and
            events across all 18 districts.
          </p>
          <p className="text-[#6B6890] leading-relaxed mt-3 text-sm">
            PRISM 是一個服務香港的雙語 LGBTQ+
            目錄及社區平台。我們連結人們與友善的商戶、醫療提供者、社區組織、非政府組織及十八區的活動。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">
            Our Mission <span className="text-[#6B6890] font-medium text-base">我們的使命</span>
          </h2>
          <div className="grid gap-4">
            {[
              {
                emoji: "🏳️‍🌈",
                en: "Make LGBTQ+-friendly resources easily discoverable in Hong Kong",
                zh: "讓香港的 LGBTQ+ 友善資源容易被發現",
              },
              {
                emoji: "🌏",
                en: "Bridge language barriers with bilingual (EN/繁中) content",
                zh: "以雙語（英/繁中）內容消除語言障礙",
              },
              {
                emoji: "🤝",
                en: "Build a connected, visible LGBTQ+ community ecosystem",
                zh: "建立一個相連、可見的 LGBTQ+ 社區生態系統",
              },
              {
                emoji: "✅",
                en: "Verify and maintain quality listings through community input",
                zh: "透過社區參與驗證及維護優質商戶資訊",
              },
            ].map((item) => (
              <div
                key={item.en}
                className="flex gap-3 p-4 bg-white rounded-xl border border-[#E8E6F0]"
              >
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-[#1E1B3A]">{item.en}</p>
                  <p className="text-xs text-[#6B6890] mt-0.5">{item.zh}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">
            How It Works{" "}
            <span className="text-[#6B6890] font-medium text-base">如何運作</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                en: "Listings are curated and verified by the PRISM team",
                zh: "商戶由 PRISM 團隊策劃及驗證",
              },
              {
                step: "2",
                en: "Data is synced from our CRM to the live site daily",
                zh: "資料每日從 CRM 同步到網站",
              },
              {
                step: "3",
                en: "Community members can submit new listings for review",
                zh: "社區成員可提交新商戶以供審核",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center p-5 bg-white rounded-xl border border-[#E8E6F0]"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B68EE] to-[#E879F9] text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <p className="text-sm font-medium text-[#1E1B3A]">{item.en}</p>
                <p className="text-xs text-[#6B6890] mt-1">{item.zh}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#F3F0FF] to-[#FCE4EC] rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2">
            Want to contribute?{" "}
            <span className="text-[#6B6890] font-medium text-base">想參與？</span>
          </h2>
          <p className="text-sm text-[#6B6890] mb-4">
            PRISM is a community project. We welcome listing submissions, event tips, and
            volunteers.
          </p>
          <a
            href="/get-involved"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7B68EE] text-white rounded-xl font-semibold text-sm hover:bg-[#6B5CE7] transition-colors"
          >
            Get Involved 參與
          </a>
        </section>
      </div>
    </div>
  );
}
