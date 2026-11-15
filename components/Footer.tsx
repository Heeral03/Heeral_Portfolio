import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="wrap flex flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="mono text-xs">Claims checked against evidence.</p>
        <div className="flex gap-5">
          <a className="hover:text-[var(--ink)]" href={site.github} rel="noopener">GitHub</a>
          <a className="hover:text-[var(--ink)]" href={site.linkedin} rel="noopener">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
