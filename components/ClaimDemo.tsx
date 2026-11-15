"use client";
import { useState } from "react";
import { clinotrust } from "@/content/clinotrust";
import { VerdictChip } from "./Chip";

export function ClaimDemo() {
  const { claims, transcript, label } = clinotrust.demo;
  const [sel, setSel] = useState(claims[0].id);
  const active = claims.find((c) => c.id === sel)!;
  const bad = active.verdict !== "supported";

  return (
    <div>
      <p className="label mb-4">{label} Click a claim.</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="label mb-3 !text-[var(--ink)]">Note, split into claims</h3>
          <ul className="space-y-2">
            {claims.map((c) => {
              const on = c.id === sel;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setSel(c.id)}
                    aria-pressed={on}
                    className={`flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${on ? "border-[var(--ink)] bg-[var(--soft)]" : "border-[var(--line)] hover:border-[#94a3b8]"}`}
                  >
                    <span className="text-[0.95rem] text-[var(--ink)]"><span className="mono mr-2 text-xs text-[var(--muted)]">{c.id}</span>{c.text}</span>
                    <VerdictChip verdict={c.verdict} />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-xl border border-dashed border-[var(--line)] p-4" aria-live="polite">
            <p className="label mb-1">Why</p>
            <p className="text-[var(--ink)]">{active.why}</p>
            <p className="mono mt-2 text-xs text-[var(--muted)]">Evidence: {active.turns.join(", ")}</p>
          </div>
        </div>
        <div>
          <h3 className="label mb-3 !text-[var(--ink)]">Transcript</h3>
          <ol className="space-y-1.5">
            {transcript.map((t) => {
              const hit = active.turns.includes(t.id);
              return (
                <li
                  key={t.id}
                  className={`rounded-lg border-l-2 px-3 py-2 text-[0.92rem] transition-colors ${hit ? (bad ? "border-[var(--amber)] bg-[var(--amber-soft)]" : "border-[var(--accent)] bg-[var(--accent-soft)]") : "border-transparent"}`}
                >
                  <span className="mono mr-2 text-xs text-[var(--muted)]">{t.id}</span>
                  <span className="font-medium text-[var(--ink)]">{t.who}:</span> {t.text}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
