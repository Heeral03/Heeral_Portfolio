"use client";
import { useEffect, useState } from "react";
import { hero } from "@/content/site";

type Phase = "typing" | "split" | "check" | "hold";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.2 6.4l2.4 2.4 5.2-5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Transcript types out, splits into claim chips, each chip gets checked. Loops. */
export function HeroDemo() {
  const full = hero.transcript;
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<Phase>("typing");
  const [chars, setChars] = useState(0);
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (chars < full.length) t = setTimeout(() => setChars((c) => c + 1), 32);
      else t = setTimeout(() => setPhase("split"), 600);
    } else if (phase === "split") {
      t = setTimeout(() => setPhase("check"), 900);
    } else if (phase === "check") {
      if (checked < hero.claims.length) t = setTimeout(() => setChecked((c) => c + 1), 650);
      else t = setTimeout(() => setPhase("hold"), 100);
    } else {
      t = setTimeout(() => { setChars(0); setChecked(0); setPhase("typing"); }, 3200);
    }
    return () => clearTimeout(t);
  }, [phase, chars, checked, reduced, full.length]);

  const showChips = reduced || phase !== "typing";
  const nChecked = reduced ? hero.claims.length : checked;
  const text = reduced ? full : full.slice(0, chars);

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.03)] md:p-7" aria-label="Animated example: a transcript line is split into claims and each claim is checked">
      <p className="label mb-3">Transcript</p>
      <p className="mono min-h-[3.2rem] text-[0.95rem] leading-relaxed text-[var(--ink)] md:min-h-[1.6rem] md:text-base">
        {text}
        {!reduced && phase === "typing" && <span className="caret" aria-hidden="true" />}
      </p>
      <div className="my-5 h-px bg-[var(--line)]" />
      <p className="label mb-3">Claims</p>
      <ul className="flex min-h-[7.5rem] flex-wrap content-start gap-2.5 md:min-h-[2.4rem]">
        {hero.claims.map((c, i) => {
          const done = i < nChecked;
          return (
            <li
              key={c.text}
              className="chip !text-[0.78rem] !py-1.5 !px-3 transition-all duration-500"
              style={{
                opacity: showChips ? 1 : 0,
                transform: showChips ? "none" : "translateY(6px)",
                transitionDelay: reduced ? "0ms" : `${i * 120}ms`,
                color: done ? "var(--accent-ink)" : "var(--body)",
                background: done ? "var(--accent-soft)" : "var(--soft)",
                borderColor: done ? "#a7f3d0" : "var(--line)",
              }}
            >
              {done && <Check />}
              {c.text}
            </li>
          );
        })}
      </ul>
      <p className="mono mt-4 text-xs text-[var(--muted)]" aria-live="off">
        {nChecked === hero.claims.length ? "3 of 3 claims supported by evidence" : "checking against the transcript"}
      </p>
    </div>
  );
}
