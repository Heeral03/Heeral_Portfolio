import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export default function Image() {
  return ogImage("Clinotrust", "Case study", "An AI scribe that shows its evidence. Every claim in a clinical note, checked against the transcript.");
}
