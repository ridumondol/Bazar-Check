"use client";
import { useRouter, usePathname } from "next/navigation";

export const sortOptions = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];


export function SortControl({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      সাজান
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 cursor-pointer appearance-none rounded-lg border border-ink/20 bg-surface pl-[13px] pr-[29px] text-xs focus:border-brand focus:outline-none"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-[10px] top-[11px]" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#1d271f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1.5 3.5 5 7l3.5-3.5" />
        </svg>
      </span>
    </label>
  );
}

export default function SortSelect({ value }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SortControl
      value={value}
      onChange={(v) => router.push(v === "default" ? pathname : `${pathname}?sort=${v}`)}
    />
  );
}
