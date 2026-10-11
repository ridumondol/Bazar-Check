import { products, priceNum } from "@/lib/data";
import PriceBadge from "./PriceBadge";

export default function Ticker() {
  const items = products.slice(0, 12);
  const track = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-line bg-surface" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track flex w-max text-sm">
        {track.map((p, i) => (
          <span key={i} className="flex items-center gap-1.5 whitespace-nowrap border-r border-canvas py-2 pl-4 pr-[17px]">
            <span>{p.emoji}</span>
            <span className="font-medium">{p.name}</span>
            <span>{priceNum(p.price)} টাকা/{p.unitName}</span>
            <PriceBadge change={p.change} arrow />
          </span>
        ))}
      </div>
    </div>
  );
}
