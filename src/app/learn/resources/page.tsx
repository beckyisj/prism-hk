import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Educational Resources — PRISM HK 教育資源",
  description: "LGBTQ+ educational resources for Hong Kong. 香港 LGBTQ+ 教育資源。",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
