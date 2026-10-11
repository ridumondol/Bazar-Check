"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/data";

export default function CategoryNav() {
  const pathname = usePathname();
  return (
    <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2" aria-label="পণ্যের বিভাগ">
      {categories.map((c) => {
        const active = pathname === `/category/${c.slug}`;
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-[13px] text-xs font-semibold transition ${
              active
                ? "border-[#047c37] bg-brand-dark text-brand-content"
                : "border-transparent text-ink hover:bg-canvas"
            }`}
          >
            <span>{c.emoji}</span>
            {c.name}
          </Link>
        );
      })}
    </nav>
  );
}
