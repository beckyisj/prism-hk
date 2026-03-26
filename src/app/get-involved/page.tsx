import type { Metadata } from "next";
import GetInvolvedClient from "./GetInvolvedClient";

export const metadata: Metadata = {
  title: "Get Involved — PRISM HK 參與",
  description: "Submit an organization, event, article, or feedback. 提交機構、活動、文章或意見。",
};

export default function GetInvolvedPage() {
  return <GetInvolvedClient />;
}
