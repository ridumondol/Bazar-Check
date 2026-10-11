import Image from "next/image";
import { products, risers, fallers, dateBn } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AllProducts from "@/components/AllProducts";

export const dynamic = "force-dynamic";

function Movers({ icon, color, title, items }) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span className={`text-base font-normal ${color}`}>{icon}</span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <section className="rounded-3xl border border-line bg-surface">
        <div className="flex flex-col items-start justify-between gap-8 px-4 py-10 md:flex-row">
          <div className="flex max-w-xl flex-col items-start gap-2">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">{dateBn()}</span>
            <h1 className="text-4xl font-bold leading-tight">আজকের বাজারের দাম এক নজরে</h1>
            <p className="mt-1 leading-6">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#সব-পণ্য"
              className="mt-4 inline-flex h-10 items-center rounded-lg border border-brand-dark bg-brand px-[17px] text-sm font-semibold text-brand-content shadow-[0_4px_6px_-1px_rgba(5,137,62,0.2),0_2px_4px_-2px_rgba(5,137,62,0.2)] transition hover:bg-brand-dark"
            >
              সব পণ্য দেখুন
            </a>
          </div>
          <Image src="/hero-basket.png" alt="বাজারের ঝুড়ি" width={315} height={263} priority className="h-auto w-full max-w-[315px] self-center md:self-start" />
        </div>
      </section>

      <Movers icon="▲" color="text-up" title="আজ দাম বেড়েছে" items={risers()} />
      <Movers icon="▼" color="text-down" title="আজ দাম কমেছে" items={fallers()} />
      <AllProducts products={products} />
    </div>
  );
}
