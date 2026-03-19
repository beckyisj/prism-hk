import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved — PRISM HK 參與",
  description: "Submit a listing, event, or volunteer with PRISM. 提交商戶、活動或成為義工。",
};

export default function GetInvolvedPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <h1 className="text-4xl font-bold mb-2">
        Get Involved <span className="text-[#6B6890] font-medium text-2xl">參與</span>
      </h1>
      <p className="text-[#6B6890] mb-10">
        Help grow Hong Kong&apos;s LGBTQ+ directory. Submit a listing, suggest an event, or join as
        a volunteer.
      </p>

      <div className="space-y-6">
        {/* Submit a Listing */}
        <div className="bg-white rounded-2xl border border-[#E8E6F0] p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B68EE] to-[#A78BFA] flex items-center justify-center text-xl shrink-0">
              🏪
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                Submit a Listing{" "}
                <span className="text-[#6B6890] font-medium text-sm">提交商戶</span>
              </h2>
              <p className="text-sm text-[#6B6890] mb-4">
                Know an LGBTQ+-friendly business, healthcare provider, or community group? Submit it
                for review.
                <br />
                <span className="text-xs">
                  認識 LGBTQ+ 友善的商戶、醫療服務或社區組織？提交以供審核。
                </span>
              </p>
              <a
                href="https://forms.gle/placeholder-listing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7B68EE] text-white rounded-xl font-semibold text-sm hover:bg-[#6B5CE7] transition-colors"
              >
                Submit Listing 提交商戶 →
              </a>
            </div>
          </div>
        </div>

        {/* Submit an Event */}
        <div className="bg-white rounded-2xl border border-[#E8E6F0] p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E879F9] to-[#F472B6] flex items-center justify-center text-xl shrink-0">
              📅
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                Submit an Event{" "}
                <span className="text-[#6B6890] font-medium text-sm">提交活動</span>
              </h2>
              <p className="text-sm text-[#6B6890] mb-4">
                Organizing or know about an upcoming LGBTQ+ event in Hong Kong? Let us know.
                <br />
                <span className="text-xs">
                  正在籌辦或知道即將舉行的香港 LGBTQ+ 活動？告訴我們。
                </span>
              </p>
              <a
                href="https://forms.gle/placeholder-event"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E879F9] text-white rounded-xl font-semibold text-sm hover:bg-[#D865E5] transition-colors"
              >
                Submit Event 提交活動 →
              </a>
            </div>
          </div>
        </div>

        {/* Volunteer */}
        <div className="bg-white rounded-2xl border border-[#E8E6F0] p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center text-xl shrink-0">
              🤝
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                Volunteer{" "}
                <span className="text-[#6B6890] font-medium text-sm">義工</span>
              </h2>
              <p className="text-sm text-[#6B6890] mb-4">
                Help with research, verification, translation, or outreach. Any amount of time
                helps.
                <br />
                <span className="text-xs">
                  協助研究、驗證、翻譯或推廣。任何時間的付出都有幫助。
                </span>
              </p>
              <a
                href="https://forms.gle/placeholder-volunteer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#38BDF8] text-white rounded-xl font-semibold text-sm hover:bg-[#2AABEB] transition-colors"
              >
                Sign Up 報名 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
