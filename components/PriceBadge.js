import { pct } from "@/lib/data";

export default function PriceBadge({ change, arrow = false }) {
  const up = change > 0;
  const down = change < 0;
  const color = up ? "text-up" : down ? "text-down" : "text-ink";
  const icon = up ? "▲" : down ? "▼" : "—";
  if (arrow) {
    return <span className={`font-semibold ${color}`}>{icon} {pct(change)}</span>;
  }
  return (
    <span className={`inline-flex h-6 items-center gap-1 rounded-xl bg-canvas px-2 text-xs font-semibold ${color}`}>
      <span className="font-normal">{icon}</span>
      {pct(change)}
    </span>
  );
}
