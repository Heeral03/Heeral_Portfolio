import { notes } from "@/content/notes";
import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export function generateStaticParams() { return notes.map((n) => ({ slug: n.slug })); }
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug)!;
  return ogImage(n.title, "Note");
}
