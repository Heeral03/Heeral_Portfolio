import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { notes } from "@/content/notes";

export const dynamicParams = false;
export function generateStaticParams() { return notes.map((n) => ({ slug: n.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) return {};
  return { title: n.title, description: n.summary, alternates: { canonical: `/notes/${n.slug}` } };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) notFound();
  const { default: Body } = await import(`@/content/notes/${slug}.mdx`);
  return (
    <article className="wrap max-w-2xl py-16 md:py-24">
      <Link href="/#notes" className="label ulink">← Notes</Link>
      <h1 className="serif mt-8 text-4xl leading-tight md:text-6xl">{n.title}</h1>
      {n.draft && <p className="label mt-4">Draft</p>}
      <div className="prose-note mt-10 space-y-5 text-lg">
        <Body />
      </div>
    </article>
  );
}
