import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { StatusChip, Tag } from "@/components/Chip";

export function generateStaticParams() {
  return projects.filter((p) => p.slug !== "clinotrust").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.outcome, alternates: { canonical: `/work/${p.slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <article className="wrap max-w-3xl py-16 md:py-24">
      <Link href="/#work" className="label ulink">← All work</Link>
      {p.status ? <div className="mb-5 mt-8"><StatusChip status={p.status} /></div> : <div className="mt-8" />}
      <h1 className="serif text-5xl md:text-7xl">{p.title}</h1>
      <p className="serif mt-5 text-2xl leading-snug text-[var(--ink)] md:text-3xl">{p.outcome}</p>
      <p className="mt-8 text-lg">{p.summary}</p>
      {p.highlights.length > 0 && (
        <ul className="mt-8 space-y-3">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3"><span className="mt-3 h-px w-4 shrink-0 bg-[var(--ink)]" />{h}</li>
          ))}
        </ul>
      )}
      {p.note && <p className="mt-8 rounded-xl bg-[var(--soft)] p-4 text-sm">{p.note}</p>}
      {p.stack.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-1.5">{p.stack.map((s) => <li key={s}><Tag>{s}</Tag></li>)}</ul>
      )}
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
        {p.links.map((l) => (
          <a key={l.label} href={l.href} className="ulink" target="_blank" rel="noopener">{l.label} ↗</a>
        ))}
      </div>
    </article>
  );
}
