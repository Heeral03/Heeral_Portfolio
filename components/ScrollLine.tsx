"use client";
import { useEffect, useRef } from "react";

/**
 * A single ink line that draws itself down the left edge as you scroll.
 * Echoes the string in the reference site, kept thin and out of the way.
 */
export function ScrollLine() {
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    const p = path.current;
    if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      p.style.strokeDashoffset = `${len * (1 - (reduce ? 1 : t))}`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Gentle wave, one small loop near the middle (the "swirl" in the reference).
  const d =
    "M20 0 C 36 60, 4 120, 20 180 S 36 300, 20 360 S 4 440, 20 500 " +
    "C 40 540, 44 580, 24 584 C 6 586, 6 556, 22 552 C 40 548, 36 600, 20 640 " +
    "S 4 760, 20 820 S 36 940, 20 1000";
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-10 hidden h-screen w-[48px] xl:block"
      viewBox="0 0 40 1000"
      preserveAspectRatio="none"
      fill="none"
    >
      <path d={d} stroke="#e2e8f0" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path ref={path} d={d} stroke="#0f172a" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
