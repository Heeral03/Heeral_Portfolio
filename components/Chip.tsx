import type { Status } from "@/content/projects";
import type { Verdict } from "@/content/clinotrust";

const Check = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.2 6.4l2.4 2.4 5.2-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Dot = () => <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current" />;

export function StatusChip({ status }: { status: Status }) {
  if (status === "ongoing")
    return <span className="chip chip-ongoing"><Dot />Ongoing</span>;
  return <span className="chip chip-review"><Dot />Research</span>;
}

const verdictMap: Record<Verdict, { cls: string; label: string }> = {
  supported: { cls: "chip-supported", label: "Supported" },
  uncertain: { cls: "chip-review", label: "Uncertain" },
  unsupported: { cls: "chip-review", label: "Unsupported" },
  contradicted: { cls: "chip-review", label: "Contradicted" },
};

export function VerdictChip({ verdict }: { verdict: Verdict }) {
  const v = verdictMap[verdict];
  return (
    <span className={`chip ${v.cls}`}>
      {verdict === "supported" ? <Check /> : <Dot />}
      {v.label}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="chip chip-neutral">{children}</span>;
}
