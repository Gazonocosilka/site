"use client";

import Link from "next/link";
import Slot from "../projects/Slot";
import VVPreview from "../projects/previews/VVPreview";
import VVStoryboard from "./vv/VVStoryboard";
import { VVWireframe, VVTypeSystem, VVPalette, VVLookbook } from "./vv/VVMocks";

// --- Content (generated from the storyboard + brand notes) ---

const BRIEF = {
  client: "V&V Boutique London",
  sector: "Luxury fashion · Womenswear",
  year: "2025",
  role: "Brand identity · Web design · UX case study",
  scope:
    "Identity system, lookbook art direction, e-commerce flow, UX critique mapping the moments where trust is earned or lost.",
};

const CHALLENGE = [
  "Two founders. Ukrainian roots. London base. They had a strong emotional brand — handwritten care, modest production, fabrics chosen one bolt at a time — but the website existed only as a transactional shop. The story stopped at the homepage.",
  "The brief: build a digital flagship that lets people FEEL the brand before they're asked to buy from it, and design an honest critique of where the current experience breaks trust.",
];

const PROCESS = [
  {
    phase: "01",
    title: "Discovery",
    blurb:
      "Mapped the existing site as a user, recorded every hesitation moment, then re-mapped it as a designer. Read every founder interview and Instagram caption to find the brand's actual voice.",
    out: "A one-page tension document — every place where the editorial tone of the brand and the friction of the storefront stopped agreeing.",
  },
  {
    phase: "02",
    title: "Identity",
    blurb:
      "Treated the wordmark as a frame, not a logo. Built a type system around an ultra-thin display sans (for hero moments) and a tight grotesque (for product copy). Anchored the palette in warm bone, deep ink and silver — no decoration.",
    out: "Logotype, type pairing, palette, photographic direction, packaging marks.",
  },
  {
    phase: "03",
    title: "Lookbook system",
    blurb:
      'A "season-as-story" template: each drop gets a horizontal lookbook with monochrome photography, large negative space and quiet captions. The same template runs in print, on the site and as a vertical Reel.',
    out: "Reusable lookbook system + Spring '26 first release.",
  },
  {
    phase: "04",
    title: "Storefront UX",
    blurb:
      "Re-flowed the shop around the moments of doubt: size, styling, returns. Pulled the lookbook into the PDP so the user can see the garment in context without leaving the page.",
    out: "Re-thought PDP, integrated size guide, refreshed checkout reassurance.",
  },
];

const TENSIONS = [
  {
    label: "Key tension · Product page",
    body:
      "The user wants to buy — but hesitates. Will it fit? What does it look like styled? Where's the size chart? The PDP is the highest-stakes moment in the journey and the first place friction starts costing money.",
  },
  {
    label: "Decision moment · Checkout",
    body:
      "Delivery info and returns policy are the last trust signals before commitment. If they arrive after the user has already added doubt to the basket, they're too late. Reassurance has to be in view at the moment the decision is being made.",
  },
  {
    label: "Reframe · The whole journey",
    body:
      "The gap between editorial warmth (homepage, lookbook, about page) and checkout friction (PDP, size, returns) is the real design opportunity. The site needed to feel like one continuous brand experience instead of two systems sharing a logo.",
  },
];

const OUTCOMES = [
  ["+ Unified visual system across web, print, social", "Consistency"],
  ["Lookbook embedded into every product page", "Conversion"],
  ["Editorial homepage that earns the scroll, not just decorates it", "Engagement"],
  ["Honest, documented UX critique as part of the brand handover", "Strategy"],
];

const NEXT_PROJECT = { title: "BEEXTRART", href: "/" }; // not built yet — links back to home

// --- Component ---

export default function VVCaseStudy() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#050505] text-bone-50">
      {/* Soft ambient atmosphere — same gradient family as the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,168,255,0.10), transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(183,167,255,0.05), transparent 60%), linear-gradient(180deg, #050505 0%, #0a0a0c 50%, #050505 100%)",
        }}
      />

      <article className="relative z-[2]">
        {/* === Top breadcrumb / back link === */}
        <div className="mx-auto max-w-[1400px] px-6 pt-28 md:px-12 md:pt-32">
          <Link
            href="/"
            data-cursor="hover"
            data-cursor-label="back"
            className="group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-bone-200 transition-colors duration-500 hover:text-bone-50"
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to index
          </Link>
        </div>

        {/* === Hero — project title === */}
        <header className="mx-auto mt-12 max-w-[1400px] px-6 md:mt-20 md:px-12">
          <div className="mono opacity-60">Case 01 · Editorial · Boutique</div>
          <h1
            className="display mt-6"
            style={{
              fontSize: "clamp(3.4rem, 11vw, 11rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              fontWeight: 500,
              color: "var(--bone-50)",
            }}
          >
            V&V Boutique
          </h1>
          <p className="mt-8 max-w-[64ch] text-[17px] leading-[1.6] text-bone-200/90">
            A brand identity and digital flagship for a Ukrainian luxury fashion
            house operating from London — and a UX case study mapping the
            moments where trust is earned or lost.
          </p>

          {/* meta row */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-5 md:gap-10">
            <Meta k="Client" v={BRIEF.client} />
            <Meta k="Sector" v={BRIEF.sector} />
            <Meta k="Year" v={BRIEF.year} />
            <Meta k="Role" v={BRIEF.role} wide />
            <Meta k="Scope" v={BRIEF.scope} wide />
          </div>
        </header>

        {/* === Cover image slot === */}
        <section className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-24 md:px-12">
          <Slot
            asset="vv-case-cover"
            href="#brief"
            label="Scroll"
            style={{ aspectRatio: "16 / 9", borderRadius: 6 }}
          >
            <VVPreview />
          </Slot>
        </section>

        {/* === Brief / Challenge === */}
        <section
          id="brief"
          className="mx-auto mt-32 grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:mt-44 md:px-12"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="mono opacity-60">01 · Brief</div>
            <h2
              className="display mt-4"
              style={{
                fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                lineHeight: 1.05,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              The challenge
            </h2>
          </div>
          <div className="col-span-12 space-y-6 text-[16px] leading-[1.65] text-bone-200/90 md:col-span-8 md:col-start-5">
            {CHALLENGE.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* === Process === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">02 · Process</div>
              <h2
                className="display mt-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                  lineHeight: 1.05,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                From listening to shipping
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                {PROCESS.map((p) => (
                  <div
                    key={p.phase}
                    className="bevel relative rounded-[2px] p-6"
                    style={{
                      background: "rgba(15,15,16,0.55)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                    }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="mono opacity-70">Phase {p.phase}</span>
                      <span
                        aria-hidden
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{
                          background: "var(--glow-blue)",
                          boxShadow: "0 0 10px var(--glow-blue)",
                        }}
                      />
                    </div>
                    <h3
                      className="display mt-5"
                      style={{
                        fontSize: 22,
                        lineHeight: 1.05,
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.6] text-bone-200/85">
                      {p.blurb}
                    </p>
                    <div className="mt-6 border-t border-white/8 pt-4">
                      <div className="mono opacity-60" style={{ fontSize: 10 }}>
                        Output
                      </div>
                      <div className="mt-2 text-[13px] leading-[1.55] text-bone-50/95">
                        {p.out}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === Process visuals — SVG/CSS mocks (will be swapped for photography later) === */}
        <section className="mx-auto mt-24 grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:mt-32 md:px-12">
          <div className="col-span-12 md:col-span-6">
            <Slot
              asset="vv-process-wireframe"
              label="Open wireframe"
              style={{ aspectRatio: "4 / 5", borderRadius: 4 }}
            >
              <VVWireframe />
            </Slot>
          </div>
          <div className="col-span-12 grid grid-rows-2 gap-6 md:col-span-6">
            <Slot
              asset="vv-process-lookbook"
              label="Lookbook spread"
              style={{ aspectRatio: "4 / 3", borderRadius: 4 }}
            >
              <VVLookbook />
            </Slot>
            <Slot
              asset="vv-process-type"
              label="Type system"
              style={{ aspectRatio: "4 / 3", borderRadius: 4 }}
            >
              <VVTypeSystem />
            </Slot>
          </div>
        </section>

        {/* === Palette strip === */}
        <section className="mx-auto mt-10 max-w-[1400px] px-6 md:mt-12 md:px-12">
          <Slot
            asset="vv-process-palette"
            label="Palette"
            style={{ aspectRatio: "16 / 5", borderRadius: 4 }}
          >
            <VVPalette />
          </Slot>
        </section>

        {/* === Key UX insights === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">03 · Insights</div>
              <h2
                className="display mt-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                  lineHeight: 1.05,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Where trust is won or lost
              </h2>
            </div>
            <div className="col-span-12 space-y-10 md:col-span-9">
              {TENSIONS.map((t, i) => (
                <div key={i} className="border-l border-white/10 pl-6">
                  <div className="eyebrow opacity-75">{t.label}</div>
                  <p className="mt-4 text-[17px] leading-[1.6] text-bone-50/95">
                    {t.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === User-journey storyboard — recreated from the original research === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">04 · Journey</div>
              <h2
                className="display mt-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                  lineHeight: 1.05,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Storyboard — 09 frames
              </h2>
              <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.55] text-bone-200/80">
                Nine moments mapped end-to-end, tagged by purpose. Two
                slow-down frames mark the highest-stakes UX tensions.
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <VVStoryboard />
            </div>
          </div>
        </section>

        {/* === Wide screenshot slot (kept for a future real screenshot) === */}
        <section className="mx-auto mt-24 max-w-[1400px] px-6 md:mt-32 md:px-12">
          <Slot
            asset="vv-screen-wide"
            label="Site screenshot"
            style={{ aspectRatio: "16 / 7", borderRadius: 6 }}
          />
        </section>

        {/* === Outcome === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">05 · Outcome</div>
              <h2
                className="display mt-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                  lineHeight: 1.05,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                What shipped
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ul className="divide-y divide-white/10">
                {OUTCOMES.map(([body, tag], i) => (
                  <li
                    key={i}
                    className="flex flex-col items-start justify-between gap-2 py-6 md:flex-row md:items-center"
                  >
                    <span className="text-[17px] leading-[1.5] text-bone-50">
                      {body}
                    </span>
                    <span
                      className="mono opacity-70"
                      style={{ fontSize: 11 }}
                    >
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* === Outro / next === */}
        <section className="mx-auto mt-32 flex max-w-[1400px] flex-col items-start justify-between gap-10 border-t border-white/10 px-6 py-16 md:mt-44 md:flex-row md:items-center md:px-12 md:py-20">
          <div>
            <div className="mono opacity-60">End of case · 01</div>
            <h3
              className="display mt-3"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Want to talk about something similar?
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              data-cursor="view"
              data-cursor-label="write"
              className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[12px] uppercase tracking-[0.3em] text-bone-50 transition-transform duration-500 ease-cinema hover:-translate-y-0.5"
              style={{
                boxShadow:
                  "0 0 50px rgba(139,168,255,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 12px var(--accent)",
                }}
              />
              Contact me
              <span aria-hidden className="text-[14px] leading-none transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={NEXT_PROJECT.href}
              data-cursor="hover"
              data-cursor-label="next"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-[12px] uppercase tracking-[0.3em] text-bone-200 transition-colors duration-500 hover:border-white/35 hover:text-bone-50"
            >
              Next · {NEXT_PROJECT.title}
              <span aria-hidden className="text-[14px] leading-none transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        <footer className="mx-auto max-w-[1400px] px-6 py-10 text-center md:px-12">
          <div className="mono opacity-50" style={{ fontSize: 10 }}>
            © Inna · 2026 · London
          </div>
        </footer>
      </article>
    </main>
  );
}

function Meta({ k, v, wide }: { k: string; v: string; wide?: boolean }) {
  return (
    <div className={wide ? "md:col-span-1" : ""}>
      <div className="eyebrow opacity-75">{k}</div>
      <div className="mt-2.5 text-[14px] text-bone-50">{v}</div>
    </div>
  );
}
