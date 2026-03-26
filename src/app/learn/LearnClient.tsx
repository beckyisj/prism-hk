"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t, type Language } from "@/lib/i18n";

function tx(en: string, zh: string, zhHans: string, language: Language): string {
  if (language === "en") return en;
  if (language === "zh") return zh;
  if (language === "zh-Hans") return zhHans;
  return `${en} ${zh}`;
}

const MISSION_ITEMS = [
  {
    emoji: "\u{1F3F3}\u{FE0F}\u{200D}\u{1F308}",
    en: "Connect Community",
    zh: "連繫社區",
    zhHans: "连系社区",
    descEn: "We connect people with affirming businesses, events, and resources across all 18 districts.",
    descZh: "我們將大眾連繫到遍佈十八區的友善機構、活動及資源。",
    descZhHans: "我们将大众连系到遍布十八区的友善机构、活动及资源。",
  },
  {
    emoji: "\u{1F30F}",
    en: "Bilingual Access",
    zh: "雙語無障礙",
    zhHans: "双语无障碍",
    descEn: "All content is available in English and Chinese, so everyone can access information.",
    descZh: "所有內容均提供英文及中文，讓每個人都能獲取資訊。",
    descZhHans: "所有内容均提供英文及中文，让每个人都能获取资讯。",
  },
  {
    emoji: "\u{1F91D}",
    en: "Community-Driven",
    zh: "社區驅動",
    zhHans: "社区驱动",
    descEn: "Built by the community, for the community. Every listing is verified by volunteers.",
    descZh: "由社區建設，為社區服務。每一條資訊都由義工核實。",
    descZhHans: "由社区建设，为社区服务。每一条信息都由义工核实。",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    en: "Browse",
    zh: "瀏覽",
    zhHans: "浏览",
    descEn: "Find what you need by category, district, or search.",
    descZh: "按類別、地區或搜索找到你需要的。",
    descZhHans: "按类别、地区或搜索找到你需要的。",
  },
  {
    step: "2",
    en: "Connect",
    zh: "連繫",
    zhHans: "连系",
    descEn: "Reach out directly to verified organizations.",
    descZh: "直接聯繫已驗證的機構。",
    descZhHans: "直接联系已验证的机构。",
  },
  {
    step: "3",
    en: "Contribute",
    zh: "貢獻",
    zhHans: "贡献",
    descEn: "Submit listings, events, or volunteer with us.",
    descZh: "提交機構、活動或成為義工。",
    descZhHans: "提交机构、活动或成为义工。",
  },
];

export default function LearnClient() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-4xl font-bold mb-2">
        {t("learnTitle", language)}
      </h1>

      <div className="mt-8 space-y-8">
        <section>
          <p className="text-[#1E1B3A] leading-relaxed">
            {t("learnDesc", language)}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">
            {tx("Our Mission", "我們的使命", "我们的使命", language)}
          </h2>
          <div className="grid gap-4">
            {MISSION_ITEMS.map((item) => (
              <div
                key={item.en}
                className="flex gap-3 p-4 bg-white rounded-xl border border-[#E8E6F0]"
              >
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-[#1E1B3A]">
                    {tx(item.en, item.zh, item.zhHans, language)}
                  </p>
                  <p className="text-xs text-[#6B6890] mt-0.5">
                    {tx(item.descEn, item.descZh, item.descZhHans, language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">
            {tx("How It Works", "如何運作", "如何运作", language)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="text-center p-5 bg-white rounded-xl border border-[#E8E6F0]"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B68EE] to-[#E879F9] text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <p className="text-sm font-medium text-[#1E1B3A]">
                  {tx(item.en, item.zh, item.zhHans, language)}
                </p>
                <p className="text-xs text-[#6B6890] mt-1">
                  {tx(item.descEn, item.descZh, item.descZhHans, language)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#F3F0FF] to-[#FCE4EC] rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-2">
            {tx("Want to contribute?", "想參與？", "想参与？", language)}
          </h2>
          <p className="text-sm text-[#6B6890] mb-4">
            {tx(
              "PRISM is a community project. We welcome listing submissions, event tips, and volunteers.",
              "PRISM 是一個社區項目。我們歡迎提交機構、活動資訊及義工參與。",
              "PRISM 是一个社区项目。我们欢迎提交机构、活动资讯及义工参与。",
              language
            )}
          </p>
          <a
            href="/get-involved"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7B68EE] text-white rounded-xl font-semibold text-sm hover:bg-[#6B5CE7] transition-colors"
          >
            {t("getInvolved", language)}
          </a>
        </section>
      </div>
    </div>
  );
}
