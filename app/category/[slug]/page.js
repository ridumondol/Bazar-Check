import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory, getProducts } from "@/lib/api";
import { num } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import { sortProducts } from "@/lib/sort-products";

export async function generateMetadata({ params }) {
  const c = await getCategory((await params).slug).catch(() => null);
  return { title: c ? `${c.name} — বাজার দর` : "বাজার দর" };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategory(slug);
  if (!category) notFound();
  const sort = ["price-asc", "price-desc"].includes(sp?.sort) ? sp.sort : "default";
  const list = sortProducts(await getProducts({ category: slug }), sort);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 pb-12">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-[21px]">
        <span className="text-4xl leading-none">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-sm text-ink/60">{num(list.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end rounded-2xl border border-line bg-surface p-[17px]">
          <SortSelect value={sort} />
        </div>
        <p className="text-sm text-ink/60">মোট {num(list.length)}টি পণ্য দেখানো হচ্ছে</p>
        {list.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center">
            <p className="mb-4 text-sm text-ink/60">এই বিভাগে কোনো পণ্য নেই।</p>
            <Link href="/" className="inline-flex h-10 items-center rounded-lg border border-brand-dark bg-brand px-[17px] text-sm font-semibold text-brand-content">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
