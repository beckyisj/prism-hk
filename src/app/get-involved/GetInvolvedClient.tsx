"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t, type Language } from "@/lib/i18n";

function tx(en: string, zh: string, zhHans: string, language: Language): string {
  if (language === "en") return en;
  if (language === "zh") return zh;
  if (language === "zh-Hans") return zhHans;
  return `${en} ${zh}`;
}

const CARDS = [
  {
    emoji: "\u{1F3EA}",
    gradient: "from-[#7B68EE] to-[#A78BFA]",
    btnColor: "bg-[#7B68EE] hover:bg-[#6B5CE7]",
    titleEn: "Submit an Organization",
    titleZh: "提交機構",
    titleZhHans: "提交机构",
    descEn: "Know an LGBTQ+-friendly business, healthcare provider, or community group? Submit it for review.",
    descZh: "認識 LGBTQ+ 友善的商戶、醫療服務或社區組織？提交以供審核。",
    descZhHans: "认识 LGBTQ+ 友善的商户、医疗服务或社区组织？提交以供审核。",
    btnEn: "Submit Organization",
    btnZh: "提交機構",
    btnZhHans: "提交机构",
    url: "https://forms.gle/feTGk1BpQVCY4woSA",
  },
  {
    emoji: "\u{1F4C5}",
    gradient: "from-[#E879F9] to-[#F472B6]",
    btnColor: "bg-[#E879F9] hover:bg-[#D865E5]",
    titleEn: "Submit an Event",
    titleZh: "提交活動",
    titleZhHans: "提交活动",
    descEn: "Organizing or know about an upcoming LGBTQ+ event in Hong Kong? Let us know.",
    descZh: "正在籌辦或知道即將舉行的香港 LGBTQ+ 活動？告訴我們。",
    descZhHans: "正在筹办或知道即将举行的香港 LGBTQ+ 活动？告诉我们。",
    btnEn: "Submit Event",
    btnZh: "提交活動",
    btnZhHans: "提交活动",
    url: "https://forms.gle/XyjEMGrbT7baWZen7",
  },
  {
    emoji: "\u{1F4DD}",
    gradient: "from-[#22C55E] to-[#16A34A]",
    btnColor: "bg-[#22C55E] hover:bg-[#1DB954]",
    titleEn: "Submit an Article",
    titleZh: "提交文章",
    titleZhHans: "提交文章",
    descEn: "Have a story, resource, or piece of writing relevant to Hong Kong\u2019s LGBTQ+ community? Share it with us.",
    descZh: "有與香港 LGBTQ+ 社區相關的故事、資源或文章？歡迎與我們分享。",
    descZhHans: "有与香港 LGBTQ+ 社区相关的故事、资源或文章？欢迎与我们分享。",
    btnEn: "Submit Article",
    btnZh: "提交文章",
    btnZhHans: "提交文章",
    url: "https://forms.gle/MxWPavkHaGV25z8c6",
  },
];

export default function GetInvolvedClient() {
  const { language } = useLanguage();

  const pageDescEn = "Help grow Hong Kong\u2019s LGBTQ+ directory. Submit an organization, event, or article.";
  const pageDescZh = "協助擴展香港 LGBTQ+ 資料庫。提交機構、活動或文章。";
  const pageDescZhHans = "协助扩展香港 LGBTQ+ 资料库。提交机构、活动或文章。";

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-4xl font-bold mb-2">
        {t("getInvolvedTitle", language)}
      </h1>
      <p className="text-[#6B6890] mb-10">
        {tx(pageDescEn, pageDescZh, pageDescZhHans, language)}
      </p>

      <div className="space-y-6">
        {CARDS.map((card) => (
          <div key={card.titleEn} className="bg-white rounded-2xl border border-[#E8E6F0] p-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-xl shrink-0`}>
                {card.emoji}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-1">
                  {tx(card.titleEn, card.titleZh, card.titleZhHans, language)}
                </h2>
                <p className="text-sm text-[#6B6890] mb-4">
                  {tx(card.descEn, card.descZh, card.descZhHans, language)}
                </p>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 ${card.btnColor} text-white rounded-xl font-semibold text-sm transition-colors`}
                >
                  {tx(card.btnEn, card.btnZh, card.btnZhHans, language)} &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Volunteer */}
        <div className="bg-white rounded-2xl border border-[#E8E6F0] p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFA726] to-[#FB923C] flex items-center justify-center text-xl shrink-0">
              {"\u{1F91D}"}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                {tx("Volunteer", "義工", "义工", language)}
              </h2>
              <p className="text-sm text-[#6B6890] mb-4">
                {tx(
                  "Please apply for volunteering opportunities at the following organizations.",
                  "請到以下機構申請義工機會。",
                  "请到以下机构申请义工机会。",
                  language
                )}
              </p>
              <a
                href="/directory?tag=volunteering"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFA726] hover:bg-[#F59E0B] text-white rounded-xl font-semibold text-sm transition-colors"
              >
                {tx("View Organizations", "查看機構", "查看机构", language)} &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Donate */}
        <div className="bg-white rounded-2xl border border-[#E8E6F0] p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center text-xl shrink-0">
              {"\u{1F49C}"}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                {tx("Donate", "捐款", "捐款", language)}
              </h2>
              <p className="text-sm text-[#6B6890] mb-4">
                {tx(
                  "Support organizations that accept donations.",
                  "支持接受捐款的機構。",
                  "支持接受捐款的机构。",
                  language
                )}
              </p>
              <a
                href="/directory?tag=donations"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#38BDF8] hover:bg-[#2AABEB] text-white rounded-xl font-semibold text-sm transition-colors"
              >
                {tx("View Organizations", "查看機構", "查看机构", language)} &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
