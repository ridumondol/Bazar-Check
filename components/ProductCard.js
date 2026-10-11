import Link from "next/link";
import { priceNum } from "@/lib/data";
import PriceBadge from "./PriceBadge";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 transition hover:border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-canvas text-2xl">{product.emoji}</span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6">{product.name}</h3>
          <p className="text-xs text-ink/60">{product.unit}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink/60">আজকের দাম</p>
          <p>
            <span className="text-xl font-bold">{priceNum(product.price)} </span>
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <PriceBadge change={product.change} />
      </div>
    </Link>
  );
}
