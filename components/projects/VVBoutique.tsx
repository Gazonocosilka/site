"use client";

import ProjectCase from "./ProjectCase";
import VVPreview from "./previews/VVPreview";

export default function VVBoutique() {
  return (
    <ProjectCase
      index="01"
      genre="Editorial · Boutique"
      title="V&V Boutique"
      description="Brand identity and digital flagship for a Ukrainian luxury fashion house operating from London. Editorial direction, lookbook system, e-commerce flow and a UX case-study mapping the gap between brand warmth and checkout friction."
      meta={[
        ["Year", "2025"],
        ["Role", "Brand · Web · UX"],
        ["Scope", "Identity · Site · Case"],
      ]}
      asset="vv-preview"
      href="/work/v-v-boutique"
      accent="neutral"
      preview={<VVPreview />}
    />
  );
}
