import type { Metadata } from "next";
import VVCaseStudy from "@/components/cases/VVCaseStudy";

export const metadata: Metadata = {
  title: "V&V Boutique — Case Study · Inna",
  description:
    "Brand identity and digital flagship for V&V Boutique, a Ukrainian luxury fashion house based in London. Process, key UX insights and outcome.",
};

export default function Page() {
  return <VVCaseStudy />;
}
