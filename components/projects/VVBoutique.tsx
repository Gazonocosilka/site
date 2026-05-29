"use client";

import ProjectCase from "./ProjectCase";
import VVPreview from "./previews/VVPreview";

export default function VVBoutique() {
  return (
    <ProjectCase
      index="01"
      genre="Editorial · Boutique"
      title="V&V Boutique"
      description="My first proper client project — brand, online shop and lookbook system for V&V Boutique, a small Ukrainian fashion label working out of London. Most of the product photos I had to re-edit by hand to give the whole shop one consistent look."
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
