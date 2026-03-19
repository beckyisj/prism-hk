import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support PRISM — 支持 PRISM",
  description: "Support PRISM, a volunteer-run LGBTQ+ directory for Hong Kong. 支持由義工營運的香港 LGBTQ+ 目錄。",
};

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-4xl font-bold mb-2">
        Support PRISM <span className="text-[#6B6890] font-medium text-2xl">支持 PRISM</span>
      </h1>
      <p className="text-[#6B6890] mb-10">
        PRISM is a volunteer-run project. Your support helps keep the directory updated, accessible,
        and free for everyone.
      </p>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[#F3F0FF] to-[#FCE4EC] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">💜</div>
          <h2 className="text-xl font-bold mb-2">How You Can Help</h2>
          <p className="text-sm text-[#6B6890] mb-1">如何幫助</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              emoji: "📢",
              title: "Spread the Word",
              zh: "推廣",
              desc: "Share PRISM with friends, colleagues, and on social media.",
              descZh: "與朋友、同事分享 PRISM，並在社交媒體上推廣。",
            },
            {
              emoji: "✍️",
              title: "Submit Listings",
              zh: "提交商戶",
              desc: "Know an LGBTQ+-friendly business? Submit it to our directory.",
              descZh: "認識 LGBTQ+ 友善商戶？提交至我們的目錄。",
            },
            {
              emoji: "🌐",
              title: "Help Translate",
              zh: "協助翻譯",
              desc: "Help us translate listings and content into Chinese or English.",
              descZh: "協助我們翻譯商戶資訊及內容。",
            },
            {
              emoji: "🤝",
              title: "Partner With Us",
              zh: "合作",
              desc: "Organizations can partner with PRISM for events and visibility.",
              descZh: "組織可以與 PRISM 合作舉辦活動及提升可見度。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-[#E8E6F0] p-5"
            >
              <span className="text-2xl">{item.emoji}</span>
              <h3 className="font-bold mt-2 text-sm">
                {item.title}{" "}
                <span className="text-[#6B6890] font-medium">{item.zh}</span>
              </h3>
              <p className="text-xs text-[#6B6890] mt-1">{item.desc}</p>
              <p className="text-xs text-[#6B6890] mt-0.5">{item.descZh}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E6F0] p-6 text-center">
          <h3 className="font-bold mb-2">
            Get in Touch <span className="text-[#6B6890] font-medium text-sm">聯絡我們</span>
          </h3>
          <p className="text-sm text-[#6B6890] mb-4">
            For partnerships, sponsorships, or general enquiries:
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
