"use client";

import { useState } from "react";
import Link from "next/link";
import VVStoryboard from "./vv/VVStoryboard";
import { VVTypeSystem, VVPalette } from "./vv/VVMocks";
import PageLightbox, { LightboxPage } from "./vv/PageLightbox";

// --- Content ---

const BRIEF = {
  client: "V&V Boutique London",
  sector: "Luxury fashion · Womenswear",
  year: "2025",
  role: "Identity · Web · Photo retouching",
  scope:
    "My first proper client project — built the brand and the online shop end-to-end, plus re-edited most of the product photography to give it one consistent look.",
};

const CHALLENGE = [
  "V&V Boutique is a small Ukrainian fashion label based in London — two founders, a tight production line, and an Instagram following that liked them long before they had a real website.",
  "They came to me wanting a proper digital home. We agreed on: a clear brand, a shop that doesn't feel like a spreadsheet, and a lookbook system they could reuse for every drop without my help.",
  "The thing that ended up taking the most time wasn't the layout. It was the photos. The original product shoots had a mix of backgrounds — some on clean brick walls, others on cluttered studio floors, some with bad lighting. To get the whole shop feeling like one boutique, I sat down and re-edited roughly 70% of the catalogue by hand. A few originals are still in there if you look closely — they were good enough as-is.",
];

const PROCESS = [
  { phase: "01", title: "Listening", blurb: "I went through the founders' old site and Instagram as if I were a customer, and wrote down every moment I hesitated — every 'wait, how does this fit?' and 'where's the returns policy?' That list became the brief.", out: "A one-page tension doc the three of us argued over for an evening." },
  { phase: "02", title: "Identity", blurb: "Pulled the wordmark apart and rebuilt it as a frame for the photography rather than a stamp. Paired a thin serif for hero moments with a grotesque for product copy. Palette anchored in warm bone, ink, silver — nothing decorative.", out: "Logotype, type pair, palette, photographic direction." },
  { phase: "03", title: "Photo retouching", blurb: "The slow part. Every product got the same treatment — cleaned backgrounds, matched white balance, gentle shadow work — so a customer scrolling the grid stops noticing where each photo was taken and just sees the clothes.", out: "~70% of the catalogue re-edited; a small guide so future shoots don't need this much rescue." },
  { phase: "04", title: "Storefront UX", blurb: "Re-flowed the shop around the moments people actually pause: size, styling, returns. Pulled the lookbook into the product page so the user can see a piece styled in context without leaving the screen.", out: "Re-thought product page, integrated size guide, lookbook system reused on every drop since." },
];

const TENSIONS = [
  { label: "Key tension · Product page", body: "I kept hovering on the product page when I tested the old site. Will it fit me? What does it look like worn? Where's the size chart? Every one of those questions used to send me off the page, and most people who leave don't come back." },
  { label: "Decision moment · Checkout", body: "By the time the user reaches checkout, they're already half-talked-out. Delivery info and returns policy need to be in view at the moment they're about to commit, not buried in a footer link they have to hunt for." },
  { label: "The bigger picture", body: "The brand felt warm everywhere except the part that asked for money. Fixing that gap — making the shop feel like the same boutique as the about page — turned out to be the whole project." },
];

const OUTCOMES: Array<[string, string]> = [
  ["A brand system that reads the same on the site, in print and on Instagram", "Consistency"],
  ["~70% of the product catalogue re-shot in post — same background, same light, same boutique", "Photography"],
  ["Lookbook template reused across three drops since launch with no further design help needed", "Handoff"],
  ["A documented UX critique handed over alongside the build, so they know what to improve next", "Strategy"],
];

// Pages of the V&V site — each has a thumbnail (top of page) and a full-page screenshot
const PAGES: LightboxPage[] = [
  { id: "home", label: "Home", thumb: "/vv-shots/vv-home.jpg", full: "/vv-shots/vv-full-home.jpg" },
  { id: "shop", label: "Shop", thumb: "/vv-shots/vv-shop.jpg", full: "/vv-shots/vv-full-shop.jpg" },
  { id: "lookbook", label: "Lookbook", thumb: "/vv-shots/vv-lookbook.jpg", full: "/vv-shots/vv-full-lookbook.jpg" },
  { id: "about", label: "About", thumb: "/vv-shots/vv-about.jpg", full: "/vv-shots/vv-full-about.jpg" },
  { id: "size-guide", label: "Size guide", thumb: "/vv-shots/vv-size-guide.jpg", full: "/vv-shots/vv-full-size-guide.jpg" },
  { id: "contact", label: "Contact", thumb: "/vv-shots/vv-contact.jpg", full: "/vv-shots/vv-full-contact.jpg" },
];

// --- Component ---

export default function VVCaseStudy() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#050505] text-bone-50">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,168,255,0.10), transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(183,167,255,0.05), transparent 60%), linear-gradient(180deg, #050505 0%, #0a0a0c 50%, #050505 100%)",
        }}
      />

      <article className="relative z-[2]">
        {/* Back link */}
        <div className="mx-auto max-w-[1400px] px-6 pt-28 md:px-12 md:pt-32">
          <Link
            href="/"
            data-cursor="hover"
            data-cursor-label="back"
            className="group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-bone-200 transition-colors duration-500 hover:text-bone-50"
          >
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:-translate-x-1">←</span>
            Back to index
          </Link>
        </div>

        {/* Hero */}
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
            My first proper client project — a brand and online shop for V&V Boutique,
            a small Ukrainian fashion label working out of London. Identity, the
            full storefront, the lookbook system, and a lot of evenings spent
            re-editing the product photography so the whole shop felt like one
            boutique.
          </p>

          {/* Personal note tag */}
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
            />
            <span className="text-[11px] uppercase tracking-[0.3em] text-bone-200">
              Client project · 2025
            </span>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-5 md:gap-10">
            <Meta k="Client" v={BRIEF.client} />
            <Meta k="Sector" v={BRIEF.sector} />
            <Meta k="Year" v={BRIEF.year} />
            <Meta k="Role" v={BRIEF.role} wide />
            <Meta k="Scope" v={BRIEF.scope} wide />
          </div>
        </header>

        {/* Cover */}
        <section className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-24 md:px-12">
          <PageThumb
            page={PAGES[0]}
            aspect="16 / 9"
            onClick={() => setOpenId("home")}
            primary
          />
          <div className="mt-3 flex items-center justify-between text-bone-200/70" style={{ fontSize: 11 }}>
            <span className="mono">↓ Click any page to open it</span>
            <span className="mono">Live site · v&v boutique</span>
          </div>
        </section>

        {/* === Page gallery — right after the cover, before the writing === */}
        <section
          id="pages"
          className="mx-auto mt-24 max-w-[1400px] px-6 md:mt-32 md:px-12"
        >
          <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-baseline">
            <div>
              <div className="mono opacity-60">01 · The site</div>
              <h2
                className="display mt-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                  lineHeight: 1.05,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Every page, click to open
              </h2>
            </div>
            <p className="max-w-[40ch] text-[14px] leading-[1.55] text-bone-200/75">
              The whole site, captured at 1440 × 900. Click any tile and
              you can scroll through that page top to bottom — same as a
              visitor would see it.
            </p>
          </div>

          {/* Uniform grid — 2 cols on tablet, 4 cols on desktop, all same aspect */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {PAGES.map((p, i) => (
              <PageThumb
                key={p.id}
                page={p}
                aspect="16 / 10"
                onClick={() => setOpenId(p.id)}
                index={i + 1}
              />
            ))}
          </div>
        </section>

        {/* === Brief === */}
        <section
          id="brief"
          className="mx-auto mt-32 grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:mt-44 md:px-12"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="mono opacity-60">02 · Brief</div>
            <h2 className="display mt-4" style={titleStyle}>How this one started</h2>
          </div>
          <div className="col-span-12 space-y-6 text-[16px] leading-[1.65] text-bone-200/90 md:col-span-8 md:col-start-5">
            {CHALLENGE.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* === Process (4 phase cards) === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">03 · Process</div>
              <h2 className="display mt-4" style={titleStyle}>What I actually did</h2>
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
                        style={{ background: "var(--glow-blue)", boxShadow: "0 0 10px var(--glow-blue)" }}
                      />
                    </div>
                    <h3 className="display mt-5" style={{ fontSize: 22, lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em" }}>
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.6] text-bone-200/85">{p.blurb}</p>
                    <div className="mt-6 border-t border-white/8 pt-4">
                      <div className="mono opacity-60" style={{ fontSize: 10 }}>Output</div>
                      <div className="mt-2 text-[13px] leading-[1.55] text-bone-50/95">{p.out}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === Design system — palette + type === */}
        <section className="mx-auto mt-24 grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:mt-32 md:px-12">
          <div className="col-span-12 md:col-span-7">
            <DesignBlock title="Palette · 05 stops">
              <VVPalette />
            </DesignBlock>
          </div>
          <div className="col-span-12 md:col-span-5">
            <DesignBlock title="Type system · 02 families">
              <VVTypeSystem />
            </DesignBlock>
          </div>
        </section>

        {/* === Insights === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">04 · Insights</div>
              <h2 className="display mt-4" style={titleStyle}>The moments people pause</h2>
            </div>
            <div className="col-span-12 space-y-10 md:col-span-9">
              {TENSIONS.map((t, i) => (
                <div key={i} className="border-l border-white/10 pl-6">
                  <div className="eyebrow opacity-75">{t.label}</div>
                  <p className="mt-4 text-[17px] leading-[1.6] text-bone-50/95">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === Storyboard === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">05 · Journey</div>
              <h2 className="display mt-4" style={titleStyle}>Walking through the site</h2>
              <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.55] text-bone-200/80">
                Nine moments I mapped before the rebuild — the order a real
                customer goes through, with the two trickiest stops called out.
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <VVStoryboard />
            </div>
          </div>
        </section>

        {/* === Outcome === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">06 · Outcome</div>
              <h2 className="display mt-4" style={titleStyle}>What I handed over</h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ul className="divide-y divide-white/10">
                {OUTCOMES.map(([body, tag], i) => (
                  <li key={i} className="flex flex-col items-start justify-between gap-2 py-6 md:flex-row md:items-center">
                    <span className="text-[17px] leading-[1.5] text-bone-50">{body}</span>
                    <span className="mono opacity-70" style={{ fontSize: 11 }}>{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* === Outro === */}
        <section className="mx-auto mt-32 flex max-w-[1400px] flex-col items-start justify-between gap-10 border-t border-white/10 px-6 py-16 md:mt-44 md:flex-row md:items-center md:px-12 md:py-20">
          <div>
            <div className="mono opacity-60">End of case · 01</div>
            <h3 className="display mt-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Got a project that needs this kind of attention?
            </h3>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.55] text-bone-200/75">
              Send me a note — I read every one and I'm
              picky about what I take on.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              data-cursor="view"
              data-cursor-label="write"
              className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[12px] uppercase tracking-[0.3em] text-bone-50 transition-transform duration-500 ease-cinema hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 50px rgba(139,168,255,0.30), inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }} />
              Contact me
              <span aria-hidden className="text-[14px] leading-none transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/"
              data-cursor="hover"
              data-cursor-label="back"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-[12px] uppercase tracking-[0.3em] text-bone-200 transition-colors duration-500 hover:border-white/35 hover:text-bone-50"
            >
              Back to all work
              <span aria-hidden className="text-[14px] leading-none transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>

        <footer className="mx-auto max-w-[1400px] px-6 py-10 text-center md:px-12">
          <div className="mono opacity-50" style={{ fontSize: 10 }}>
            © Inna · 2026 · London
          </div>
        </footer>
      </article>

      {/* Lightbox */}
      <PageLightbox
        pages={PAGES}
        openId={openId}
        onClose={() => setOpenId(null)}
        onJump={(id) => setOpenId(id)}
      />
    </main>
  );
}

const titleStyle = {
  fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
  lineHeight: 1.05,
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

function Meta({ k, v, wide }: { k: string; v: string; wide?: boolean }) {
  return (
    <div className={wide ? "md:col-span-1" : ""}>
      <div className="eyebrow opacity-75">{k}</div>
      <div className="mt-2.5 text-[14px] text-bone-50">{v}</div>
    </div>
  );
}

function DesignBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[4px] border border-white/10" style={{ aspectRatio: "16 / 9" }}>
      <div className="absolute inset-0">{children}</div>
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-bone-200/85" style={{ backdropFilter: "blur(4px)" }}>
        {title}
      </div>
    </div>
  );
}

/**
 * Single clickable page thumbnail. The whole tile is a button, not a Slot
 * (no off-page links) — it opens the lightbox in-place.
 */
function PageThumb({
  page,
  aspect,
  onClick,
  index,
  primary,
}: {
  page: LightboxPage;
  aspect: string;
  onClick: () => void;
  index?: number;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="view"
      data-cursor-label="open"
      className="group relative block w-full overflow-hidden rounded-[6px] border border-white/10 text-left transition-all duration-500 ease-cinema hover:-translate-y-1 hover:border-white/30"
      style={{
        aspectRatio: aspect,
        boxShadow: primary
          ? "0 30px 100px rgba(0,0,0,0.55), 0 0 80px rgba(139,168,255,0.16)"
          : "0 16px 40px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={page.thumb}
        alt={`V&V Boutique — ${page.label}`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-cinema group-hover:scale-[1.025]"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-5"
        style={{
          background:
            "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.85) 100%)",
        }}
      >
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-bone-50">
          <span
            className="block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
          />
          {page.label}
        </span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-bone-50">
          Open ↗
        </span>
      </div>
      {/* Always-visible index for gallery tiles */}
      {index !== undefined && (
        <span
          className="absolute left-3 top-3 z-[1] rounded-full bg-black/55 px-2 py-1 mono text-bone-50/90 backdrop-blur"
          style={{ fontSize: 10 }}
        >
          {String(index).padStart(2, "0")} · {page.label}
        </span>
      )}
    </button>
  );
}
