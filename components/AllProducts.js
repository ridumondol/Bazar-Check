"use client";
import { useMemo, useState } from "react";
import { num } from "@/lib/format";
import ProductCard from "./ProductCard";
import { SortControl } from "./SortSelect";
import { sortProducts } from "@/lib/sort-products";

const chip = "inline-flex h-6 items-center gap-1.5 rounded-lg border px-[9px] text-[11px] font-semibold transition";

export default function AllProducts({ products, categories = [] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("default");

  const list = useMemo(() => {
    const filtered = products.filter(
      (p) => (cat === "all" || p.category === cat) && p.name.includes(q.trim())
    );
    return sortProducts(filtered, sort);
  }, [products, q, cat, sort]);

  return (
    <section id="সব-পণ্য" className="scroll-mt-32 space-y-3">
      <h2 className="text-xl font-bold">সব পণ্য</h2>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-ink/20 bg-surface px-[13px] text-sm focus-within:border-brand lg:w-56">
          <span>🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="পণ্যের নাম লিখুন…"
            className="w-full bg-transparent outline-none placeholder:text-ink/50"
          />
        </label>
        <div className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setCat("all")}
            className={`${chip} ${cat === "all" ? "border-brand-dark bg-brand text-brand-content" : "border-transparent hover:bg-canvas"}`}
          >
            সব
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`${chip} shrink-0 ${cat === c.slug ? "border-brand-dark bg-brand text-brand-content" : "border-transparent hover:bg-canvas"}`}
            >
              <span>{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>
        <SortControl value={sort} onChange={setSort} />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-ink/60">মোট {num(list.length)}টি পণ্য দেখানো হচ্ছে</p>
        {list.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink/60">কোনো পণ্য পাওয়া যায়নি।</p>
        )}
      </div>
    </section>
  );
}
