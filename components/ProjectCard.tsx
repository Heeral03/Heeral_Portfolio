import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusChip, Tag } from "./Chip";

export function ProjectCard({ p, large = false }: { p: Project; large?: boolean }) {
  const external = (h: string) => h.startsWith("http");
  return (
    <article className={`group relative flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--ink)] ${large ? "p-7 md:p-10" : "p-6"}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className={`serif ${large ? "text-4xl md:text-5xl" : "text-3xl"}`}>
          {(
            <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {p.title}
            </Link>
          )}
        </h3>
        {p.status && <StatusChip status={p.status} />}
      </div>
      <p className={`${large ? "max-w-2xl text-lg md:text-xl text-[var(--ink)]" : "text-[0.95rem]"} mb-5`}>{p.outcome}</p>
      {p.stack.length > 0 && (
        <ul className="mb-6 flex flex-wrap gap-1.5">
          {p.stack.slice(0, large ? 9 : 5).map((s) => (
            <li key={s}><Tag>{s}</Tag></li>
          ))}
        </ul>
      )}
      <div className="relative z-10 mt-auto flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {p.links.map((l) => (
          <Link key={l.label} href={l.href} className="ulink" {...(external(l.href) ? { target: "_blank", rel: "noopener" } : {})}>
            {l.label} {external(l.href) ? "↗" : "→"}
          </Link>
        ))}
        {p.links.length === 0 && <Link href={`/work/${p.slug}`} className="ulink">Details →</Link>}
      </div>
    </article>
  );
}
