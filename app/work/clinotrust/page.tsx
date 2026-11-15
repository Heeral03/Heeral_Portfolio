import Link from "next/link";
import type { Metadata } from "next";
import { clinotrust as c } from "@/content/clinotrust";
import { ClaimDemo } from "@/components/ClaimDemo";
import { Reveal } from "@/components/Reveal";
import { StatusChip } from "@/components/Chip";

export const metadata: Metadata = {
  title: "Clinotrust case study",
  description: "An AI scribe that shows its evidence. Every claim in a clinical note, checked against the transcript.",
  alternates: { canonical: "/work/clinotrust" },
};

const H = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <p className="label mb-2">{n}</p>
    <h2 className="serif text-3xl leading-tight md:text-5xl">{children}</h2>
  </div>
);

function EvalTable({ name, rows, pending }: { name: string; rows: { label: string; value: string }[]; pending?: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 ${pending ? "border-dashed border-[var(--line)]" : "border-[var(--line)]"}`}>
      <p className="label mb-4 !text-[var(--ink)]">{name}</p>
      <dl className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-3 last:border-0 last:pb-0">
            <dt className="text-sm">{r.label}</dt>
            <dd className={`serif text-2xl ${r.value === "TODO" ? "text-[var(--amber)]" : "text-[var(--ink)]"}`}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ClinotrustPage() {
  return (
    <article className="pb-24">
      <header className="wrap max-w-4xl pt-16 md:pt-24">
        <Link href="/#work" className="label ulink">← All work</Link>
        <div className="mb-5 mt-8 flex items-center gap-3"><StatusChip status="ongoing" /><span className="label">Case study</span></div>
        <h1 className="serif text-6xl md:text-8xl">{c.title}</h1>
        <p className="serif mt-4 text-3xl text-[var(--ink)] md:text-4xl">{c.tagline}</p>
        <a href={c.github} target="_blank" rel="noopener" className="ulink mt-6 inline-block text-sm">GitHub ↗</a>
      </header>

      <div className="wrap max-w-4xl space-y-24 pt-20 md:space-y-32 md:pt-28">
        <Reveal as="section">
          <H n="01 / Problem">{c.problem.heading}</H>
          <div className="max-w-2xl space-y-4 text-lg">{c.problem.body.map((p) => <p key={p}>{p}</p>)}</div>
        </Reveal>

        <Reveal as="section">
          <H n="02 / Pipeline">Five steps, and a human at the end.</H>
          <ol className="grid gap-3 md:grid-cols-5">
            {c.pipeline.map((s, i) => (
              <li key={s.step} className="relative rounded-xl border border-[var(--line)] p-4">
                <span className="mono text-xs text-[var(--muted)]">0{i + 1}</span>
                <p className="serif mt-1 text-xl text-[var(--ink)]">{s.step}</p>
                <p className="mt-1 text-sm">{s.detail}</p>
                {i < c.pipeline.length - 1 && (
                  <span aria-hidden="true" className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 bg-white px-1 text-[var(--muted)] md:-right-3 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:px-0">
                    <span className="md:hidden">↓</span><span className="hidden md:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-xl bg-[var(--soft)] p-4 text-[var(--ink)]"><span className="label mr-2">Rule</span>{c.rule}</p>
        </Reveal>

        <Reveal as="section">
          <H n="03 / Try it">Click a claim. See the evidence.</H>
          <ClaimDemo />
        </Reveal>

        <Reveal as="section">
          <H n="04 / Evaluation">{c.evaluation.heading}</H>
          <p className="mb-8 max-w-2xl text-lg">{c.evaluation.setup}</p>
          <div className="grid gap-5 md:grid-cols-2">
            <EvalTable {...c.evaluation.baseline} />
            <EvalTable {...c.evaluation.improved} pending />
          </div>
          <p className="serif mt-8 max-w-2xl text-2xl leading-snug text-[var(--ink)]">{c.evaluation.honest}</p>
        </Reveal>

        <Reveal as="section">
          <H n="05 / What broke">{c.lessons.heading}</H>
          <div className="grid gap-5 md:grid-cols-2">
            {c.lessons.items.map((l) => (
              <div key={l.title} className="rounded-2xl border border-[var(--line)] p-6">
                <h3 className="serif text-2xl text-[var(--ink)]">{l.title}</h3>
                <p className="mt-3">{l.body}</p>
                <p className="mt-4 text-sm"><span className="label mr-2">Fix</span>{l.fix}</p>
              </div>
            ))}
          </div>
          <p className="serif mt-8 max-w-2xl text-2xl leading-snug text-[var(--ink)]">{c.lessons.takeaway}</p>
        </Reveal>

        <div className="grid gap-16 md:grid-cols-2">
          <Reveal as="section">
            <H n="06 / Limitations">What this does not show.</H>
            <ul className="space-y-3">{c.limitations.map((l) => <li key={l} className="flex gap-3"><span className="mt-3 h-px w-4 shrink-0 bg-[var(--ink)]" />{l}</li>)}</ul>
          </Reveal>
          <Reveal as="section">
            <H n="07 / Next">What I am doing next.</H>
            <ul className="space-y-3">{c.next.map((l) => <li key={l} className="flex gap-3"><span className="mt-3 h-px w-4 shrink-0 bg-[var(--ink)]" />{l}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
