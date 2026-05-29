"use client";

/**
 * Rebuild of vv_boutique_case_study_storyboard.html in the portfolio's
 * dark / futurist style. All copy is sourced from the original storyboard
 * (Inna's research) — every "frame" is a moment in the V&V user journey,
 * tagged with what kind of moment it is (hook / context / tension /
 * exploration / decision / outcome / reflection).
 */

type Kind = "hook" | "ctx" | "tension" | "explore" | "decision" | "outcome" | "reflect";

const KIND_COLOR: Record<Kind, string> = {
  hook: "#F9CB42",
  ctx: "#9FE1CB",
  tension: "#F0997B",
  explore: "#B5D4F4",
  decision: "#1D9E75",
  outcome: "#AFA9EC",
  reflect: "#C9C7C2",
};

const KIND_LABEL: Record<Kind, string> = {
  hook: "Entry / hook",
  ctx: "Context",
  tension: "Key tension",
  explore: "Exploration",
  decision: "Decision moment",
  outcome: "Outcome",
  reflect: "Reflection",
};

interface Frame {
  num: string;
  kind: Kind;
  screen: string;
  section: string;
  takeaway: string;
  why: string;
  emphasis?: boolean;
  span?: "single" | "pair-left" | "pair-right" | "wide" | "narrow";
  mock: React.ReactNode;
}

const FRAMES: Frame[] = [
  {
    num: "01",
    kind: "hook",
    screen: 'Homepage hero — "елегантність у кожній деталі"',
    section: "Hero + CTA",
    takeaway: "This brand has a clear identity — premium, Ukrainian, London-based.",
    why: "First impression sets expectation. The hook must earn the scroll.",
    emphasis: true,
    span: "single",
    mock: <HeroMock />,
  },
  {
    num: "02",
    kind: "ctx",
    screen: "About page",
    section: "Brand story",
    takeaway: "Two founders, Ukrainian roots, London design — there's a real story here.",
    why: "Context builds trust before the product is shown.",
    span: "pair-left",
    mock: <AboutMock />,
  },
  {
    num: "03",
    kind: "tension",
    screen: "Shop page — grid view",
    section: "Product catalogue",
    takeaway: "The shop offers three categories — but how does a user navigate them confidently?",
    why: "Exposes the core UX tension: discovery vs decision fatigue.",
    span: "pair-right",
    mock: <ShopGridMock />,
  },
  {
    num: "04",
    kind: "tension",
    screen: "Product detail page — blazer set, no size guide visible, no styling context",
    section: "Product page — purchase moment",
    takeaway: "The user wants to buy — but hesitates. Will it fit? What does it look like styled? Where's the size chart?",
    why: "This is the highest-stakes moment. Friction here = abandoned basket. The tension is desire vs uncertainty.",
    emphasis: true,
    span: "single",
    mock: <PDPMock />,
  },
  {
    num: "05",
    kind: "explore",
    screen: "Lookbook — Spring '26",
    section: "Lookbook",
    takeaway: "Seeing clothes styled in context builds confidence the product page couldn't.",
    why: "Process: the user goes exploring after hesitation on the PDP.",
    span: "pair-left",
    mock: <LookbookMock />,
  },
  {
    num: "06",
    kind: "explore",
    screen: "Size guide + FAQ",
    section: "Size guide / FAQ",
    takeaway: "Information exists — but is it easy to find from the product page?",
    why: "Reveals a navigation gap: trust content is siloed from conversion content.",
    span: "pair-right",
    mock: <SizeGuideMock />,
  },
  {
    num: "07",
    kind: "decision",
    screen: "Basket / checkout — product added, delivery info shown",
    section: "Cart / checkout",
    takeaway: "The moment of commitment. Delivery info and returns policy are the last trust signals needed.",
    why: "Decision point — does the reassurance arrive in time, or is it already too late?",
    emphasis: true,
    span: "single",
    mock: <CheckoutMock />,
  },
  {
    num: "08",
    kind: "outcome",
    screen: "Instagram / TikTok — @vvboutiquelondon",
    section: "Social / community",
    takeaway: "The brand extends beyond the site. Social proof closes the loop and brings users back.",
    why: "Outcome = trust earned → repeat visit → community. The end is also a new entry point.",
    span: "wide",
    mock: <SocialMock />,
  },
  {
    num: "09",
    kind: "reflect",
    screen: "The question this raises",
    section: "Reflection",
    takeaway: "The gap between editorial warmth and checkout friction is the design opportunity.",
    why: "Reflection reframes the whole journey as a design problem worth solving.",
    span: "narrow",
    mock: <ReflectionMock />,
  },
];

export default function VVStoryboard() {
  return (
    <div className="text-bone-50">
      {/* Legend */}
      <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
          <span
            key={k}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bone-200/85"
          >
            <span
              className="block h-2.5 w-2.5 rounded-full"
              style={{ background: KIND_COLOR[k], boxShadow: `0 0 8px ${KIND_COLOR[k]}66` }}
            />
            {KIND_LABEL[k]}
          </span>
        ))}
      </div>

      {/* Frames */}
      <div className="flex flex-col gap-5">
        <FrameRow frames={[FRAMES[0]]} />
        <Connector />
        <FrameRow frames={[FRAMES[1], FRAMES[2]]} />
        <Connector />
        <FrameRow frames={[FRAMES[3]]} />
        <Connector />
        <FrameRow frames={[FRAMES[4], FRAMES[5]]} />
        <Connector />
        <FrameRow frames={[FRAMES[6]]} />
        <Connector />
        <FrameRow frames={[FRAMES[7], FRAMES[8]]} wide />
      </div>

      {/* Footer note */}
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[12px] text-bone-200/65">
        <span>Linear narrative with two slow-down moments at frames 04 and 07.</span>
        <span aria-hidden>·</span>
        <span>Frames 01 + 09 act as bookends — hook ↔ reflection.</span>
        <span aria-hidden>·</span>
        <span>Frames 02–06 summarise; 04 and 07 expand.</span>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center">
      <span
        aria-hidden
        className="block h-6 w-px"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18), transparent)" }}
      />
    </div>
  );
}

function FrameRow({ frames, wide = false }: { frames: Frame[]; wide?: boolean }) {
  if (frames.length === 1) {
    return <Frame frame={frames[0]} />;
  }
  // Pair
  const cols = wide ? "md:grid-cols-[2fr_1fr]" : "md:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 gap-5 ${cols}`}>
      {frames.map((f) => (
        <Frame key={f.num} frame={f} />
      ))}
    </div>
  );
}

function Frame({ frame }: { frame: Frame }) {
  const color = KIND_COLOR[frame.kind];
  return (
    <div
      className="relative rounded-[3px] p-5 md:p-6"
      style={{
        background: "rgba(15,15,16,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${frame.emphasis ? color + "55" : "rgba(255,255,255,0.10)"}`,
        boxShadow: frame.emphasis ? `0 0 50px ${color}22` : "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Header: number + kind badge */}
      <div className="mb-4 flex items-center gap-3">
        <span className="mono text-bone-200/80" style={{ fontSize: 11 }}>
          {frame.num}
        </span>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
          style={{ background: color + "22", color: color }}
        >
          {KIND_LABEL[frame.kind]}
        </span>
        {frame.emphasis && (
          <span
            className="rounded-[2px] border border-white/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-bone-200/70"
            style={{ borderStyle: "dashed" }}
          >
            slow down here
          </span>
        )}
      </div>

      {/* Mock screen */}
      <div
        className="mb-4 overflow-hidden rounded-[3px] border border-white/8 bg-white/[0.02] p-3"
      >
        <div className="mb-2 mono text-bone-400" style={{ fontSize: 9, letterSpacing: "0.22em" }}>
          SCREEN
        </div>
        <div className="text-[12px] leading-[1.4] text-bone-50/95" style={{ fontWeight: 500 }}>
          {frame.screen}
        </div>
        <div className="mt-3">{frame.mock}</div>
      </div>

      {/* Fields */}
      <dl className="space-y-1.5 text-[12px] leading-[1.5]">
        <Field k="Section" v={frame.section} />
        <Field k="Takeaway" v={frame.takeaway} />
        <Field k="Why here" v={frame.why} />
      </dl>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3">
      <dt className="text-bone-400" style={{ fontSize: 11 }}>
        {k}
      </dt>
      <dd className="text-bone-50/90">{v}</dd>
    </div>
  );
}

// ---------- Small mock components for each frame ----------

function Bar({ w = "100%", h = 4, op = 0.25 }: { w?: string | number; h?: number; op?: number }) {
  return (
    <div
      className="rounded-[2px]"
      style={{ width: w, height: h, background: `rgba(245,245,243,${op})`, marginBottom: 4 }}
    />
  );
}

function Img({ h = 28, ar }: { h?: number | string; ar?: string }) {
  return (
    <div
      className="rounded-[3px] border border-white/8"
      style={{
        height: ar ? "auto" : h,
        aspectRatio: ar,
        background:
          "linear-gradient(135deg, rgba(245,245,243,0.06), rgba(245,245,243,0.02))",
      }}
    />
  );
}

function HeroMock() {
  return (
    <div>
      <Img h={44} />
      <Bar w="60%" op={0.45} />
      <Bar w="40%" op={0.2} />
      <div className="mt-2 flex gap-2">
        <div className="h-4 w-14 rounded-[3px] bg-bone-50/35" />
        <div className="h-4 w-14 rounded-[3px] border border-white/15" />
      </div>
    </div>
  );
}

function AboutMock() {
  return (
    <div>
      <Bar w="70%" op={0.4} />
      <Bar w="80%" op={0.22} />
      <Bar w="40%" op={0.18} />
      <div className="mt-2"><Img h={26} /></div>
    </div>
  );
}

function ShopGridMock() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <Img h={30} /><Img h={30} /><Img h={30} /><Img h={30} />
    </div>
  );
}

function PDPMock() {
  return (
    <div className="flex gap-2">
      <div className="flex-1"><Img h={52} /></div>
      <div className="flex flex-1 flex-col justify-center gap-1">
        <Bar w="90%" op={0.45} />
        <Bar w="40%" op={0.2} />
        <Bar w="65%" h={3} op={0.15} />
        <div className="mt-1 h-4 w-14 rounded-[3px] bg-bone-50/30" />
      </div>
    </div>
  );
}

function LookbookMock() {
  return (
    <div className="flex gap-1">
      <Img h={42} /><Img h={42} /><Img h={42} />
    </div>
  );
}

function SizeGuideMock() {
  return (
    <div>
      <Bar w="50%" op={0.4} />
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        <div className="h-2.5 rounded-[2px] bg-white/15" />
        <div className="h-2.5 rounded-[2px] bg-white/15" />
        <div className="h-2.5 rounded-[2px] bg-white/10" />
        <div className="h-2.5 rounded-[2px] bg-white/10" />
      </div>
    </div>
  );
}

function CheckoutMock() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Img h={36} ar="1 / 1" />
        <div className="flex-1">
          <Bar w="80%" op={0.4} />
          <Bar w="40%" op={0.2} />
        </div>
        <div className="text-[13px] font-medium text-bone-50">£89</div>
      </div>
      <div className="mt-2 h-5 rounded-[4px] bg-bone-50/30" />
    </div>
  );
}

function SocialMock() {
  return (
    <div>
      <div className="flex gap-1.5">
        <Img h={36} /><Img h={36} /><Img h={36} />
      </div>
      <Bar w="40%" op={0.25} />
    </div>
  );
}

function ReflectionMock() {
  return (
    <div
      className="text-[13px] leading-[1.5] text-bone-50/90"
      style={{ fontStyle: "italic" }}
    >
      Does the site tell a coherent story — or does it split into brand narrative
      and shop as two separate experiences?
    </div>
  );
}
