import type { Metadata } from "next";
import NexGenCaseStudy from "@/components/cases/NexGenCaseStudy";

export const metadata: Metadata = {
  title: "NexGen — Case Study · Inna",
  description:
    "A self-initiated practice project: hand-coded single-page design agency site with a custom cursor blob, gradient editorial type and working contact form.",
};

export default function Page() {
  return <NexGenCaseStudy />;
}
