"use client";

import ProjectCase from "./ProjectCase";
import NexGenPreview from "./previews/NexGenPreview";

export default function NexGen() {
  return (
    <ProjectCase
      index="03"
      genre="Practice · Web"
      title="NexGen"
      description="A practice site I built end-to-end to test how far I could push a single page — custom blob-cursor that follows the mouse and softly blinks under buttons, gradient editorial type, a small project gallery, working contact form. Not a client project — just me proving I can design AND build a website I like."
      meta={[
        ["Year", "2026"],
        ["Role", "Design · Build"],
        ["Type", "Practice"],
      ]}
      href="/work/nexgen"
      asset="nex-home"
      accent="blue"
      preview={<NexGenPreview />}
    />
  );
}
