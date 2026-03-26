import type { Metadata } from "next";
import LearnClient from "./LearnClient";

export const metadata: Metadata = {
  title: "About PRISM — Learn 了解更多",
  description: "About PRISM, Hong Kong's bilingual LGBTQ+ directory. 關於 PRISM 香港 LGBTQ+ 雙語目錄。",
};

export default function LearnPage() {
  return <LearnClient />;
}
