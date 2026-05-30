"use client";

import Link from "next/link";

// --- Content ---

const BRIEF = {
  client: "BEEXTRART — eyelashes",
  sector: "Beauty · Lashes (DTC + retail)",
  year: "2025",
  role: "Identity · Packaging · Print · Content",
  scope:
    "Real client work. Built the brand from logo through to packaging, retail boxes, a collaboration leaflet and a small set of social content the brand still uses.",
};

const CHALLENGE = [
  "BEEXTRART is a small Ukrainian eyelashes label run by a friend of mine. When she reached out they were selling already — just over Instagram DMs with no consistent visual identity. Every drop looked like a different brand.",
  "The brief: build something that holds together. One logo, one packaging system, print collateral that doesn't fight with the brand, and content that's quietly polished so the Instagram doesn't feel like a marketplace.",
];

const PROCESS = [
  {
    phase: "01",
    title: "Logo system",
    blurb:
      "A stylised B that doubles as a feminine silhouette — the icon reads at small sizes and the wordmark below carries the elegance. Plus a leopard-pattern wordmark variant for the packaging interiors so the inside surprises you.",
    out: "Primary logomark, wordmark, leopard variant, full vector set in .ai.",
  },
  {
    phase: "02",
    title: "Packaging",
    blurb:
      "Acrylic display box with the leopard wordmark printed on the top, dimensioned spec sheet for the manufacturer, and a Limited Edition box artwork featuring a custom illustration of the brand's customer.",
    out: "Spec sheet (top + sides, dimensions), illustrated Limited Edition box, retail box that ships now.",
  },
  {
    phase: "03",
    title: "Print",
    blurb:
      "Collaboration leaflet for the BEEXTRART × KARDIT STYLE drop. Editorial cover shot, product hero, and the headline \"КОЛАБОРАЦІЯ про яку говорять усі\" (\"the collaboration everyone's talking about\"). Designed to slip inside the parcel.",
    out: "A5 collab leaflet (PDF print-ready, 15 MB).",
  },
  {
    phase: "04",
    title: "Social",
    blurb:
      "A small library of content templates — captioned Reels frames, story highlight covers and a tone-of-voice doc — so the brand could keep posting without breaking the look I'd just built.",
    out: "Five live Reels, story highlight set, voice + caption guide.",
  },
];

const REFLECTIONS = [
  {
    label: "What I learned · Print is unforgiving",
    body: "Designing the box for a real manufacturer with real cm dimensions was the first time I had to think about a deliverable that someone else would actually make. I'd designed a logo I loved that became a hairline at the printer's resolution — had to chunk it up. Useful failure.",
  },
  {
    label: "What I'm proud of · The illustration",
    body: "The pink-dress Limited Edition box took the longest. The brand wanted \"the BEEXTRART girl\" and I made her up — silhouette, hair, dress, jewellery, the lot. It became the most recognisable thing they put out and the first thing customers DM about.",
  },
  {
    label: "What I'd change · One more accent colour",
    body: "Black + pink + leopard is strong but limits the seasonal moments. If I came back to this I'd add one cooler accent (a deep burgundy, maybe — they're already shooting burgundy lashes) so each drop can shift slightly without breaking the system.",
  },
];

const OUTCOMES: Array<[string, string]> = [
  ["Logo + wordmark + leopard variant adopted across product, packaging, print and social", "Identity"],
  ["Limited Edition illustrated box that became the most-DMed-about product", "Packaging"],
  ["Print-ready collab leaflet for the BEEXTRART × KARDIT STYLE drop", "Print"],
  ["Five Reels live on @beextrart_eyelashes — brand has kept posting in the system since", "Content"],
];

const SOCIAL: Array<{ label: string; href: string; kind: "reel" | "highlight" }> = [
  {
    label: "Lash drop · Reel 01",
    href: "https://www.instagram.com/reel/DFUzT1OI_Ys/?igsh=bDhrbmh3MmV3d3l1",
    kind: "reel",
  },
  {
    label: "Lash drop · Reel 02",
    href: "https://www.instagram.com/reel/DFm1XG7o2Y2/?igsh=MTdzNXRpNHpldnZueQ==",
    kind: "reel",
  },
  {
    label: "Lash drop · Reel 03",
    href: "https://www.instagram.com/reel/DF2aC5VIOyE/?igsh=MWxnNDFxOGU4NDFiZw==",
    kind: "reel",
  },
  {
    label: "Story highlight",
    href: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTEzMzk4ODQ2NjEwNzc4?story_media_id=3781730189047238011&igsh=MXZ4bDBqMzRobWJyNA==",
    kind: "highlight",
  },
  {
    label: "Lash drop · Reel 04",
    href: "https://www.instagram.com/reel/DR_s-pFAo4A/?igsh=MWg0MTBzb20wZ2JybQ==",
    kind: "reel",
  },
];

// --- Component ---

export default function BeextrartCaseStudy() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#050505] text-bone-50">
      {/* Ambient background — pink + violet tint for this case */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,222,233,0.10), transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(183,167,255,0.06), transparent 60%), linear-gradient(180deg, #050505 0%, #0a0a0c 50%, #050505 100%)",
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
          <div className="mono opacity-60">Case 02 · Client · Beauty</div>
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
            BEEXTRART
          </h1>
          <p className="mt-8 max-w-[64ch] text-[17px] leading-[1.6] text-bone-200/90">
            Real client project. Brand identity, packaging, print and a small
            library of social content for a Ukrainian eyelashes label.
            Everything you'd need to take a new beauty brand from
            Instagram-DM-only to a real retail product.
          </p>

          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--glow-pink)",
                boxShadow: "0 0 10px var(--glow-pink)",
              }}
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

        {/* === Cover — the packaging illustration === */}
        <section className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-24 md:px-12">
          <div
            className="relative overflow-hidden rounded-[6px] border border-white/10"
            style={{
              aspectRatio: "16 / 9",
              boxShadow:
                "0 30px 100px rgba(0,0,0,0.55), 0 0 80px rgba(255,222,233,0.20)",
            }}
          >
            <img
              src="/bee-shots/bee-packaging.jpg"
              alt="BEEXTRART Limited Edition box artwork"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-bone-200/70" style={{ fontSize: 11 }}>
            <span className="mono">Limited Edition · box artwork</span>
            <span className="mono">@beextrart_eyelashes</span>
          </div>
        </section>

        {/* === Logo — clean black-on-white panel === */}
        <section className="mx-auto mt-24 grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:mt-32 md:px-12">
          <div className="col-span-12 md:col-span-3">
            <div className="mono opacity-60">02 · Identity</div>
            <h2 className="display mt-4" style={titleStyle}>The logo</h2>
            <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.55] text-bone-200/80">
              A stylised B that doubles as a feminine silhouette — works
              at small sizes; wordmark carries the elegance. Leopard
              variant for the packaging interior.
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-1 gap-5 md:col-span-9 md:grid-cols-3">
            <ArtPanel
              src="/bee-shots/bee-logo.jpg"
              label="Logomark · primary"
              bg="#f5f5f3"
              ratio="1 / 1"
              big
            />
            <ArtPanel
              src="/bee-shots/bee-wordmark.jpg"
              label="Wordmark · leopard"
              bg="#f5f5f3"
              ratio="1 / 1"
            />
            <div
              className="relative overflow-hidden rounded-[4px] p-6"
              style={{
                aspectRatio: "1 / 1",
                background:
                  "linear-gradient(135deg, #ffdee9, #f8a8c4 60%, #d68aae)",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="mono opacity-70" style={{ fontSize: 10, color: "#3a1226" }}>
                  Palette · 03 stops
                </div>
                <div className="flex h-1/3 gap-2">
                  <Sw color="#050505" />
                  <Sw color="#FFDEE9" />
                  <Sw color="#3a1226" />
                </div>
                <div className="mono" style={{ fontSize: 10, color: "#3a1226" }}>
                  Black · Pink · Burgundy
                </div>
              </div>
              <span
                className="absolute bottom-3 right-3 rounded-full border border-black/20 bg-white/70 px-2 py-1 text-[9px] uppercase tracking-[0.22em]"
                style={{ color: "#3a1226", backdropFilter: "blur(4px)" }}
              >
                Palette
              </span>
            </div>
          </div>
        </section>

        {/* === Packaging — spec sheet + product photo === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">03 · Packaging</div>
              <h2 className="display mt-4" style={titleStyle}>For the manufacturer</h2>
              <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.55] text-bone-200/80">
                Acrylic retail box. Leopard wordmark on top, clear sides
                so the lashes show. Specced to the cm for the printer.
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ArtPanel
                src="/bee-shots/bee-box-spec.jpg"
                label="Box · spec sheet"
                bg="#ffffff"
                ratio="16 / 11"
              />
            </div>
          </div>
        </section>

        {/* === Print — collab leaflet & product === */}
        <section className="mx-auto mt-24 grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:mt-32 md:px-12">
          <div className="col-span-12 md:col-span-7">
            <ArtPanel
              src="/bee-shots/bee-product-burgundy.jpg"
              label="Burgundy lashes · BEEXTRART × KARDIT STYLE"
              bg="#1a0608"
              ratio="3 / 4"
              cover
            />
          </div>
          <div className="col-span-12 md:col-span-5">
            <ArtPanel
              src="/bee-shots/bee-collab-poster.jpg"
              label="Collab leaflet · A5"
              bg="#0e0405"
              ratio="3 / 4"
              cover
            />
          </div>
        </section>

        {/* === Social grid === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-baseline">
            <div>
              <div className="mono opacity-60">04 · Social</div>
              <h2 className="display mt-4" style={titleStyle}>Lives on Instagram</h2>
            </div>
            <p className="max-w-[40ch] text-[14px] leading-[1.55] text-bone-200/75">
              A small library of Reels + a story highlight set, all of which
              the brand still uses. Each link opens the actual post.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
            {SOCIAL.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                data-cursor-label="open"
                className="group relative block overflow-hidden rounded-[4px] border border-white/10 transition-all duration-500 ease-cinema hover:-translate-y-1 hover:border-white/30"
                style={{
                  aspectRatio: "9 / 16",
                  background:
                    "linear-gradient(160deg, rgba(255,222,233,0.10), rgba(183,167,255,0.06))",
                }}
              >
                {/* Use the content frame for the first tile to give it an image */}
                {i === 0 ? (
                  <img
                    src="/bee-shots/bee-content.jpg"
                    alt="BEEXTRART social content"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                    <div
                      className="display"
                      style={{
                        fontSize: 32,
                        fontWeight: 500,
                        letterSpacing: "-0.03em",
                        lineHeight: 0.9,
                        color: "var(--glow-pink)",
                      }}
                    >
                      {s.kind === "highlight" ? "★" : "▶"}
                    </div>
                    <div
                      className="mt-3 mono"
                      style={{ fontSize: 10, color: "var(--bone-200)" }}
                    >
                      Instagram · {s.kind}
                    </div>
                  </div>
                )}
                {/* Hover overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.85) 100%)",
                  }}
                >
                  <span className="text-[10px] uppercase tracking-[0.24em] text-bone-50">
                    {s.label}
                  </span>
                  <span className="text-[11px] text-bone-50">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* === Reflections === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">05 · Reflections</div>
              <h2 className="display mt-4" style={titleStyle}>What I took from it</h2>
            </div>
            <div className="col-span-12 space-y-10 md:col-span-9">
              {REFLECTIONS.map((t, i) => (
                <div key={i} className="border-l border-white/10 pl-6">
                  <div className="eyebrow opacity-75">{t.label}</div>
                  <p className="mt-4 text-[17px] leading-[1.6] text-bone-50/95">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === Outcome === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">06 · Outcome</div>
              <h2 className="display mt-4" style={titleStyle}>What shipped</h2>
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
            <div className="mono opacity-60">End of case · 02</div>
            <h3 className="display mt-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Looking for a brand someone will actually post?
            </h3>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.55] text-bone-200/75">
              Identity, packaging, content — I do all three and they
              tend to work better when they come from the same place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              data-cursor="view"
              data-cursor-label="write"
              className="glass group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[12px] uppercase tracking-[0.3em] text-bone-50 transition-transform duration-500 ease-cinema hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 50px rgba(255,222,233,0.30), inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full" style={{ background: "var(--glow-pink)", boxShadow: "0 0 12px var(--glow-pink)" }} />
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

function ArtPanel({
  src,
  label,
  bg,
  ratio,
  big,
  cover,
}: {
  src: string;
  label: string;
  bg: string;
  ratio: string;
  big?: boolean;
  cover?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[4px] border border-white/10"
      style={{ aspectRatio: ratio, background: bg }}
    >
      <img
        src={src}
        alt={label}
        className="absolute inset-0 h-full w-full"
        style={{
          objectFit: cover ? "cover" : "contain",
          padding: cover ? 0 : big ? "12%" : "16%",
        }}
      />
      <span
        className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-black/15 bg-white/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em]"
        style={{
          color: "#1a1a25",
          backdropFilter: "blur(4px)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Sw({ color }: { color: string }) {
  return (
    <div
      className="flex-1 rounded-[2px]"
      style={{
        background: color,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.10)",
      }}
    />
  );
}
