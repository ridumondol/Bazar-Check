import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getProduct, getCategory, marketPrices, priceNum } from "@/lib/data";
import { getSession } from "@/lib/session";

export async function generateMetadata({ params }) {
  const p = getProduct((await params).id);
  return { title: p ? `${p.name} — বাজার দর` : "বাজার দর" };
}

function Stat({ label, value, note, color = "" }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-[25px] py-[17px]">
      <p className="text-xs text-ink/60">{label}</p>
      <p className={color}>
        <span className="text-2xl font-bold">{priceNum(value)}</span>
        <span className="text-sm font-medium"> টাকা</span>
      </p>
      <p className="text-xs text-ink/60">{note}</p>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  if (!(await getSession())) redirect(`/signin?callbackURL=/products/${product.id}`);

  const category = getCategory(product.category);
  const rows = marketPrices(product);
  const min = Math.min(...rows.map((r) => r.min));
  const max = Math.max(...rows.map((r) => r.max));
  const avg = Math.round(rows.reduce((s, r) => s + r.avg, 0) / rows.length);
  const diff = product.price - product.yesterday;
  const dirText = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 pb-12">
      <nav className="flex items-center gap-2 py-2 text-sm" aria-label="breadcrumb">
        <Link href="/" className="hover:underline">হোম</Link>
        <span className="text-xs">›</span>
        <Link href={`/category/${category.slug}`} className="hover:underline">{category.name}</Link>
        <span className="text-xs">›</span>
        <span className="text-ink/60">{product.name}</span>
      </nav>

      <div className="rounded-2xl border border-line bg-surface p-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-canvas text-4xl">{product.emoji}</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold leading-9">{product.name}</h1>
            <p className="text-sm text-ink/60">{product.unit} · {category.name}</p>
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম <span className="font-semibold">{dirText}</span>
              {diff !== 0 && <> · {priceNum(Math.abs(diff))} টাকা</>}
            </p>
          </div>
          <div className="rounded-2xl bg-canvas px-5 py-4 text-center">
            <p className="text-sm">আজকের দাম</p>
            <p className="text-3xl font-bold leading-9">{priceNum(product.price)}</p>
            <p className="text-sm">টাকা / {product.unitName}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-[21px]">
        <div className="flex flex-col gap-6">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="সর্বনিম্ন দাম" value={min} note="সবচেয়ে কম দামের বাজার" color="text-down" />
              <Stat label="সর্বোচ্চ দাম" value={max} note="সবচেয়ে বেশি দামের বাজার" color="text-up" />
              <Stat label="গড় দাম" value={avg} note="সব বাজারের গড়" />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="text-left font-bold">
                      {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বোচ্চ", "গড়"].map((h) => (
                        <th key={h} className="border-b border-ink/5 px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.market} className={i % 2 ? "bg-canvas" : ""}>
                        <td className="px-4 py-3 font-medium">{r.market}</td>
                        <td className="px-4 py-3">{r.division}</td>
                        <td className="px-4 py-3 text-down">{priceNum(r.min)} টাকা</td>
                        <td className="px-4 py-3 text-up">{priceNum(r.max)} টাকা</td>
                        <td className="px-4 py-3 font-semibold">{priceNum(r.avg)} টাকা</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
