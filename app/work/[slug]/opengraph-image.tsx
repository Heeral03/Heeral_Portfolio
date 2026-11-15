import { projects } from "@/content/projects";
import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug)!;
  return ogImage(p.title, "Project", p.outcome);
}
