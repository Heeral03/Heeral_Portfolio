import Link from "next/link";
import { site, hero, contact } from "@/content/site";
import { featured, others } from "@/content/projects";
import { research } from "@/content/research";
import { experience, education, achievements } from "@/content/experience";
import { skills } from "@/content/skills";
import { notes } from "@/content/notes";
import { HeroDemo } from "@/components/HeroDemo";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Chip";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-20 md:pt-28 md:pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="label mb-5">{hero.eyebrow}</p>
            <h1 className="serif text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>
            <p className="serif mt-5 max-w-xl text-2xl leading-snug text-[var(--ink)] md:text-3xl">
              {hero.headline}
            </p>
            <p className="mt-5 max-w-lg text-[var(--body)]">{hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work/clinotrust" className="btn btn-solid">View Clinotrust</Link>
              <a href={site.resume} target="_blank" rel="noopener" className="btn btn-ghost">Download resume</a>
            </div>
          </div>
          <HeroDemo />
        </div>
      </section>

      {/* Work */}
      <Section id="work" index="01" title="Selected work">
        <Reveal className="mb-6"><ProjectCard p={featured} large /></Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}><ProjectCard p={p} /></Reveal>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" index="02" title="Experience">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <p className="label mb-2">{experience.dates}</p>
            <h3 className="serif text-3xl">{experience.role}</h3>
            <p className="mt-1 text-[var(--ink)]">{experience.org}</p>
            <p className="text-sm text-[var(--muted)]">{experience.orgNote}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {experience.stack.map((s) => <li key={s}><Tag>{s}</Tag></li>)}
            </ul>
          </Reveal>
          <div>
            <Reveal><p className="text-lg text-[var(--ink)]">{experience.intro}</p></Reveal>
            <ol className="mt-8 space-y-7 border-l border-[var(--line)] pl-6">
              {experience.blocks.map((b) => (
                <Reveal as="li" key={b.title} className="relative">
                  <span aria-hidden="true" className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-[var(--ink)]" />
                  <h4 className="serif text-2xl text-[var(--ink)]">{b.title}</h4>
                  <p className="mt-1">{b.body}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-9 rounded-xl bg-[var(--soft)] p-5">
              <p className="label mb-2">What I took from it</p>
              <p className="text-[var(--ink)]">{experience.learned}</p>
            </Reveal>
          </div>
        </div>
        <Reveal className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 md:grid-cols-2">
          <div>
            <p className="label mb-2">Education</p>
            <p className="serif text-2xl text-[var(--ink)]">{education.school}</p>
            <p>{education.degree}</p>
            <p className="text-sm text-[var(--muted)]">{education.years} · {education.cgpa}</p>
          </div>
          <div>
            <p className="label mb-2">Recognition</p>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a.title}><span className="text-[var(--ink)]">{a.title}</span><br /><span className="text-sm text-[var(--muted)]">{a.detail}</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Research */}
      <Section id="research" index="03" title="Research">
        <Reveal className="rounded-2xl border border-[var(--line)] p-7 md:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="label">{research.type}</span>
            <span className="chip chip-review">{research.status}</span>
          </div>
          <h3 className="serif text-3xl md:text-4xl">{research.title}</h3>
          <p className="serif mt-1 text-xl text-[var(--muted)] md:text-2xl">{research.subtitle}</p>
          <p className="mt-5 max-w-2xl text-[var(--ink)]">{research.summary}</p>
          <ul className="mt-5 space-y-1.5 text-[0.95rem]">
            {research.details.map((d) => <li key={d} className="flex gap-3"><span className="mt-2.5 h-px w-4 shrink-0 bg-[var(--ink)]" />{d}</li>)}
          </ul>
        </Reveal>
      </Section>

      {/* Skills */}
      <Section id="skills" index="04" title="What I work with">
        <div className="grid gap-x-12 gap-y-9 md:grid-cols-2">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={(i % 2) * 80}>
              <h3 className="label mb-3 !text-[var(--ink)]">{g.group}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => <li key={s}><Tag>{s}</Tag></li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Notes */}
      <Section id="notes" index="05" title="Notes">
        <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {notes.map((n) => (
            <Reveal as="li" key={n.slug}>
              <Link href={`/notes/${n.slug}`} className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <span>
                  <span className="serif block text-2xl text-[var(--ink)] transition-transform group-hover:translate-x-1 md:text-3xl">{n.title}</span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">{n.summary}</span>
                </span>
                {n.draft && <span className="chip chip-ongoing shrink-0 self-start">Coming soon</span>}
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" index="06" title={contact.heading}>
        <Reveal>
          <p className="serif max-w-2xl text-2xl leading-snug text-[var(--ink)] md:text-3xl">{contact.line}</p>
          <a href={`mailto:${site.email}`} className="serif mt-8 inline-block break-all text-3xl ulink md:text-5xl">{site.email}</a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-solid">Email me</a>
            <a href={site.github} target="_blank" rel="noopener" className="btn btn-ghost">GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noopener" className="btn btn-ghost">LinkedIn</a>
            <a href={site.resume} target="_blank" rel="noopener" className="btn btn-ghost">Resume (PDF)</a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
