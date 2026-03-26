"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t, type Language } from "@/lib/i18n";

function tx(en: string, zh: string, zhHans: string, language: Language): string {
  if (language === "en") return en;
  if (language === "zh") return zh;
  if (language === "zh-Hans") return zhHans;
  return `${en} ${zh}`;
}

const HELP_ITEMS = [
  {
    emoji: "\u{1F4E2}",
    titleEn: "Spread the Word",
    titleZh: "推廣",
    titleZhHans: "推广",
    descEn: "Share PRISM with friends, colleagues, and on social media.",
    descZh: "與朋友、同事分享 PRISM，並在社交媒體上推廣。",
    descZhHans: "与朋友、同事分享 PRISM，并在社交媒体上推广。",
  },
  {
    emoji: "\u{270D}\u{FE0F}",
    titleEn: "Submit Listings",
    titleZh: "提交機構",
    titleZhHans: "提交机构",
    descEn: "Know an LGBTQ+-friendly business? Submit it to our directory.",
    descZh: "認識 LGBTQ+ 友善商戶？提交至我們的資料庫。",
    descZhHans: "认识 LGBTQ+ 友善商户？提交至我们的资料库。",
    href: "/get-involved",
  },
  {
    emoji: "\u{1F310}",
    titleEn: "Help Translate",
    titleZh: "協助翻譯",
    titleZhHans: "协助翻译",
    descEn: "Help us translate listings and content into Chinese or English.",
    descZh: "協助我們翻譯機構資訊及內容。",
    descZhHans: "协助我们翻译机构资讯及内容。",
  },
  {
    emoji: "\u{1F91D}",
    titleEn: "Partner With Us",
    titleZh: "合作",
    titleZhHans: "合作",
    descEn: "Organizations can partner with PRISM for events and visibility.",
    descZh: "組織可以與 PRISM 合作舉辦活動及提升可見度。",
    descZhHans: "组织可以与 PRISM 合作举办活动及提升可见度。",
  },
];

export default function SupportClient() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-4xl font-bold mb-2">
        {t("supportTitle", language)}
      </h1>
      <p className="text-[#6B6890] mb-10">
        {t("supportDesc", language)}
      </p>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#F3F0FF] to-[#FCE4EC] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">{"\u{1F49C}"}</div>
          <h2 className="text-xl font-bold mb-2">
            {tx("How You Can Help", "如何幫助", "如何帮助", language)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HELP_ITEMS.map((item) => (
            <div
              key={item.titleEn}
              className="bg-white rounded-xl border border-[#E8E6F0] p-5"
            >
              <span className="text-2xl">{item.emoji}</span>
              <h3 className="font-bold mt-2 text-sm">
                {tx(item.titleEn, item.titleZh, item.titleZhHans, language)}
              </h3>
              <p className="text-xs text-[#6B6890] mt-1">
                {tx(item.descEn, item.descZh, item.descZhHans, language)}
              </p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://forms.gle/G2J1u9rupXvdydBs8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-xl border border-[#E8E6F0] p-5 hover:border-[#7B68EE] transition-colors"
          >
            <span className="text-2xl">{"\u{1F4AC}"}</span>
            <div>
              <h3 className="font-bold text-sm">
                {t("feedback", language)}
              </h3>
              <p className="text-xs text-[#6B6890] mt-0.5">
                {tx(
                  "Suggestions, corrections, or ideas to improve PRISM.",
                  "建議、更正或改善 PRISM 的想法。",
                  "建议、更正或改善 PRISM 的想法。",
                  language
                )}
              </p>
            </div>
          </a>
          <a
            href="/get-involved"
            className="flex items-center gap-3 bg-white rounded-xl border border-[#E8E6F0] p-5 hover:border-[#7B68EE] transition-colors"
          >
            <span className="text-2xl">{"\u{1F64B}"}</span>
            <div>
              <h3 className="font-bold text-sm">
                {t("volunteer", language)}
              </h3>
              <p className="text-xs text-[#6B6890] mt-0.5">
                {tx(
                  "Help with research, verification, translation, or outreach.",
                  "協助研究、驗證、翻譯或推廣工作。",
                  "协助研究、验证、翻译或推广工作。",
                  language
                )}
              </p>
            </div>
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E6F0] p-6 text-center">
          <h3 className="font-bold mb-2">
            {tx("Get in Touch", "聯絡我們", "联络我们", language)}
          </h3>
          <p className="text-sm text-[#6B6890] mb-4">
            {tx(
              "For partnerships, sponsorships, or general enquiries:",
              "如有合作、贊助或一般查詢：",
              "如有合作、赞助或一般查询：",
              language
            )}
          </p>
          <a
            href="mailto:hello@prism.lgbt"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7B68EE] text-white rounded-xl font-semibold text-sm hover:bg-[#6B5CE7] transition-colors"
          >
            hello@prism.lgbt
          </a>
        </div>
      </div>
    </div>
  );
}
