import type { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Support PRISM — 支持 PRISM",
  description: "Support PRISM, a volunteer-run LGBTQ+ directory for Hong Kong. 支持由義工營運的香港 LGBTQ+ 資料庫。",
};

export default function SupportPage() {
  return <SupportClient />;
}
