import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events — PRISM HK 活動",
  description: "LGBTQ+ community events in Hong Kong. 香港 LGBTQ+ 社區活動。",
};

export default function EventsPage() {
  return <EventsClient />;
}
