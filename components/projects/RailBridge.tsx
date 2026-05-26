"use client";

/**
 * Bridge between the last project and the Contact section.
 * Makes the site read as one continuous chapter rather than separate pages —
 * the projects "exhale" into a small line that hands off to Contact.
 */
export default function RailBridge() {
  const goToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    const lenis = (window as unknown as {
      __lenis?: { scrollTo: (t: HTMLElement | number, opts?: object) => void };
    }).__lenis;
    if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: 0 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative z-[2] mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 pb-32 pt-12 text-center md:pb-44 md:pt-20 md:px-12">
      {/* Soft thread separator */}
      <div
        aria-hidden
        className="h-px w-[60%] max-w-[460px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,245,243,0.25), transparent)",
        }}
      />

      <span className="mono opacity-50">End of work · Ch.03</span>

      <h3
        className="display"
        style={{
          fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "var(--bone-50)",
          letterSpacing: "-0.02em",
        }}
      >
        Seen something you like?
      </h3>

      <p className="max-w-[40ch] text-[15px] leading-[1.6] text-bone-200/80">
        Every project here started as a conversation.
        The next one could be yours.
      </p>

      <button
        onClick={goToContact}
        data-cursor="view"
        data-cursor-label="write"
        className="group glass mt-2 inline-flex items-center gap-3 rounded-full pl-3 pr-5 py-3 text-[12px] uppercase tracking-[0.3em] text-bone-50 transition-transform duration-500 ease-cinema hover:-translate-y-0.5"
        style={{
          boxShadow: "0 0 50px var(--accent-soft), inset 0 1px 0 rgba(255,255,255,0.06)",
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
        <span className="transition-all duration-500 group-hover:tracking-[0.36em]">
          Continue to contact
        </span>
        <span aria-hidden className="text-[14px] leading-none transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
      </button>
    </div>
  );
}
