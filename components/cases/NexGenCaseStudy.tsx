"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PageLightbox, { LightboxPage } from "./vv/PageLightbox";

// --- Content ---

const BRIEF = {
  client: "NexGen — Practice project",
  sector: "Web · Design + Build",
  year: "2026",
  role: "Design · HTML / CSS / JS",
  scope:
    "A self-initiated test build. Designed and coded end-to-end to prove to myself I can take a website from idea to working page — including custom interactions, motion and a real working contact form.",
};

const CHALLENGE = [
  "After a few months of doing brand and UI, I wanted to know I could actually ship a working website on my own — not a Figma mockup. So I made NexGen: a fictional design agency, single landing page, all of the trimmings.",
  "The brief I gave myself: don't reach for a template, don't pull in a framework, just write the HTML / CSS / JS. The one indulgence I allowed was a custom interaction I'd been wanting to try — a soft cursor blob.",
  "Quick note on the assets: the project tiles in the “Selected Projects” section (the Fintech dashboard, the e-comm, the health app, the SaaS chart) are AI-generated placeholder images. I used them to see how the gallery would look once filled — for a real client I'd swap them for actual case-study screenshots.",
];

const PROCESS = [
  {
    phase: "01",
    title: "Define the brand",
    blurb:
      "Picked a fictional client (NexGen, a design agency) so the work would have a coherent identity instead of being a generic Lorem-Ipsum demo. Wrote the headline, services and case-card copy myself.",
    out: "Tone of voice + content list before any layout.",
  },
  {
    phase: "02",
    title: "Layout in browser",
    blurb:
      "Skipped Figma. Started directly in HTML — header, hero, services, work, contact — and pushed the type until the page had its own rhythm. Iteration in the browser is faster for me than mocking up in another tool first.",
    out: "Single-page semantic HTML structure.",
  },
  {
    phase: "03",
    title: "Cursor blob",
    blurb:
      "The fun bit. A soft gradient blob that follows the mouse with lerp easing, blooms slightly larger when it's over the CTAs, and softly pulses (\"blinks\") on hover. The whole thing is a single PNG positioned with JS-driven transforms.",
    out: "blob.png + ~40 lines of JS in script.js.",
  },
  {
    phase: "04",
    title: "Polish + ship",
    blurb:
      "Service cards with subtle hover lift, project tiles with real interface mockups, contact form with validation and a working endpoint. Tested at 1440 / 1280 / 375.",
    out: "Live page running off a single index.html.",
  },
];

const TENSIONS = [
  {
    label: "What I learned · Cursor work is finicky",
    body: "The blob looked easy in my head and took me half a day to get right. Lerp factor, blend mode, what counts as \"interactive\" and triggers the bloom — small numbers, big difference. I'd been afraid of touching JS animation; doing it once made the next time feel routine.",
  },
  {
    label: "What I'd change · Less gradient",
    body: "The pink-purple gradient on \"Experiences\" is a bit much for me now. If I rebuilt this I'd keep one accent colour and lean harder on typography. Useful lesson — gradients age fast.",
  },
  {
    label: "Why it matters · Proof I can ship",
    body: "Most of my portfolio is brand and product work where someone else writes the code. This was the first time I built the whole thing myself, and it gave me a different kind of confidence in design decisions — knowing roughly what each one costs to implement.",
  },
];

const OUTCOMES: Array<[string, string]> = [
  ["Single-page site live, no framework, hand-written HTML / CSS / JS", "Build"],
  ["Custom blob-cursor interaction with hover bloom (\"blink\") behaviour", "Motion"],
  ["Fictional brand system: tone of voice, services, sample work all written by me", "Brand"],
  ["Working contact form with validation — submits to a tiny server.js", "Function"],
];

const PAGES: LightboxPage[] = [
  {
    id: "home",
    label: "NexGen — single page",
    thumb: "/nex-shots/nex-home.jpg",
    full: "/nex-shots/nex-full-home.jpg",
  },
];

// --- Component ---

export default function NexGenCaseStudy() {
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
          <div className="mono opacity-60">Case 03 · Practice · Web</div>
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
            NexGen
          </h1>
          <p className="mt-8 max-w-[64ch] text-[17px] leading-[1.6] text-bone-200/90">
            A self-initiated test build. Not a client project — I made up a
            fictional design agency and gave myself a single rule: design AND
            code the whole thing by hand. Bonus indulgence: a soft cursor blob
            that follows the mouse and gently blinks under the buttons.
          </p>

          {/* Practice-project chip */}
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2">
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{
                background: "var(--glow-blue)",
                boxShadow: "0 0 10px var(--glow-blue)",
              }}
            />
            <span className="text-[11px] uppercase tracking-[0.3em] text-bone-200">
              Practice project · 2026
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

        {/* Cover — real screenshot, clickable into lightbox */}
        <section className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-24 md:px-12">
          <CoverThumb onClick={() => setOpenId("home")} />
          <div className="mt-3 flex items-center justify-between text-bone-200/70" style={{ fontSize: 11 }}>
            <span className="mono">↓ Click to open the full page</span>
            <span className="mono">Single-page · hand-coded</span>
          </div>
        </section>

        {/* === Cursor / blob detail callout === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">02 · Detail</div>
              <h2 className="display mt-4" style={titleStyle}>The cursor blinks</h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div
                className="relative overflow-hidden rounded-[6px] border border-white/10"
                style={{
                  aspectRatio: "21 / 9",
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 50%, #f1eff8, #e6e3f0)",
                }}
              >
                <BlobDemo />
                <div
                  className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-black/20 bg-white/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-ink-900/80"
                  style={{ backdropFilter: "blur(4px)" }}
                >
                  Demo · the cursor on the live site
                </div>
              </div>
              <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.6] text-bone-200/85">
                A soft gradient blob follows the mouse with lerp easing, blooms
                a little larger over any interactive element, and softly
                pulses — that's the "blink" of the title. The whole thing is
                one PNG and about forty lines of JS. The first interaction I'd
                built from scratch, and the one that made the rest of the site
                feel worth shipping.
              </p>
            </div>
          </div>
        </section>

        {/* === Brief === */}
        <section
          id="brief"
          className="mx-auto mt-32 grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:mt-44 md:px-12"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="mono opacity-60">03 · Brief</div>
            <h2 className="display mt-4" style={titleStyle}>Why this one</h2>
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
              <div className="mono opacity-60">04 · Process</div>
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

        {/* === Insights === */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <div className="mono opacity-60">05 · Reflections</div>
              <h2 className="display mt-4" style={titleStyle}>What it taught me</h2>
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
            <div className="mono opacity-60">End of case · 03</div>
            <h3 className="display mt-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Want me to build something like this for you?
            </h3>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-[1.55] text-bone-200/75">
              Design + front-end build, single page or small site. Drop me a note.
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

/**
 * Live mini-demo of the cursor-blob behaviour described in the case study.
 * Tracks the mouse inside its container, blooms larger + softly pulses
 * when hovering the demo button — users can feel what's described.
 */
function BlobDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const box = ref.current;
    const blob = blobRef.current;
    if (!box || !blob) return;
    let mx = box.clientWidth / 2;
    let my = box.clientHeight / 2;
    let x = mx;
    let y = my;
    let raf = 0;
    const tick = () => {
      x += (mx - x) * 0.12;
      y += (my - y) * 0.12;
      blob.style.transform = `translate3d(${x - 110}px, ${y - 110}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const r = box.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    box.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-0 top-0 transition-[width,height,opacity] duration-500 ease-cinema"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,160,210,0.65), rgba(168,140,255,0.45) 45%, rgba(120,160,255,0.0) 75%)",
          filter: "blur(18px)",
          opacity: hot ? 1 : 0.85,
          transform: "translate3d(-220px, -220px, 0)",
          willChange: "transform",
          animation: hot ? "nx-blob-blink 1.4s ease-in-out infinite" : "none",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div
          className="display"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#1a1a25",
          }}
        >
          Crafting{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #ff7eb6 0%, #a47cff 60%, #6ea2ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Experiences
          </span>
          <br />
          That Inspire.
        </div>
        <button
          onMouseEnter={() => setHot(true)}
          onMouseLeave={() => setHot(false)}
          className="mt-5 rounded-full px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition-transform duration-500 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(90deg, #ff7eb6, #a47cff 60%, #6ea2ff)",
          }}
        >
          Hover me · the blob blinks
        </button>
      </div>

      <style jsx global>{`
        @keyframes nx-blob-blink {
          0%, 100% { opacity: 1; filter: blur(18px); }
          50%     { opacity: 0.5; filter: blur(28px); }
        }
      `}</style>
    </div>
  );
}

function CoverThumb({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="view"
      data-cursor-label="open"
      className="group relative block w-full overflow-hidden rounded-[6px] border border-white/10 text-left transition-all duration-500 ease-cinema hover:-translate-y-1 hover:border-white/30"
      style={{
        aspectRatio: "16 / 9",
        boxShadow:
          "0 30px 100px rgba(0,0,0,0.55), 0 0 80px rgba(139,168,255,0.18)",
      }}
    >
      <img
        src="/nex-shots/nex-hero.jpg"
        alt="NexGen hero"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-cinema group-hover:scale-[1.025]"
        loading="eager"
      />
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
          NexGen · Home
        </span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-bone-50">
          Open ↗
        </span>
      </div>
    </button>
  );
}
