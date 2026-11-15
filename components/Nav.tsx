"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="serif text-xl text-[var(--ink)]" onClick={() => setOpen(false)}>
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-[var(--body)] transition-colors hover:text-[var(--ink)]">
              {n.label}
            </Link>
          ))}
          <a href={site.resume} className="btn btn-ghost !py-1.5 !text-sm" target="_blank" rel="noopener">Resume</a>
        </nav>
        <button
          className="md:hidden label !text-[var(--ink)] py-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="wrap flex flex-col gap-4 border-t border-[var(--line)] pb-6 pt-4 md:hidden">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="serif text-2xl text-[var(--ink)]">
              {n.label}
            </Link>
          ))}
          <a href={site.resume} className="serif text-2xl text-[var(--ink)]">Resume</a>
        </nav>
      )}
    </header>
  );
}
