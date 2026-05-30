"use client";

import ProjectCase from "./ProjectCase";
import BeextrartPreview from "./previews/BeextrartPreview";

export default function Beextrart() {
  return (
    <ProjectCase
      index="02"
      genre="Client · Beauty"
      title="BEEXTRART"
      description="Brand identity, packaging and print for an eyelashes label working out of Ukraine. Logo system, limited-edition box artwork, retail boxes, a collab leaflet with KARDIT STYLE and a small library of social content the brand still uses on Instagram and TikTok."
      meta={[
        ["Year", "2025"],
        ["Role", "Brand · Packaging · Print"],
        ["Type", "Client"],
      ]}
      href="/work/beextrart"
      asset="bee-home"
      accent="pink"
      preview={<BeextrartPreview />}
    />
  );
}
