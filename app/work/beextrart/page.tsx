import type { Metadata } from "next";
import BeextrartCaseStudy from "@/components/cases/BeextrartCaseStudy";

export const metadata: Metadata = {
  title: "BEEXTRART — Case Study · Inna",
  description:
    "Brand identity, packaging, print and social content for BEEXTRART, a Ukrainian eyelashes label. Logo system, Limited Edition box artwork, collab leaflet and Instagram Reels still in use.",
};

export default function Page() {
  return <BeextrartCaseStudy />;
}
