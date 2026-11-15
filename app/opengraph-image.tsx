import { ogImage, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Heeral Mandolia, Applied AI Engineer";
export default function Image() {
  return ogImage("Heeral Mandolia", "Applied AI Engineer", "I build LLM systems for healthcare that show their evidence.");
}
