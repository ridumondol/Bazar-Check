// Helpers that work on product data already fetched from the API.

export const risers = (products) =>
  products.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);

export const fallers = (products) =>
  products.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

// NOTE: the Bazardor API has no per-market endpoint, so this table is still sample data.
// It is derived deterministically from the product's real price from the API.
const markets = [
  ["সদর বাজার", "রাজশাহী"],
  ["বাজারহাট", "খুলনা"],
  ["বাসারহাট বাজার", "বরিশাল"],
  ["চৌর বাজার", "ময়মনসিংহ"],
  ["আমতলী বাজার", "চট্টগ্রাম"],
  ["ডবলগেট বাজার", "চট্টগ্রাম"],
  ["চৌরাস্তা বাজার", "সিলেট"],
  ["গ্রীন মার্কেট, মিরপুর", "ঢাকা"],
  ["কারওয়ান বাজার", "ঢাকা"],
  ["মাঠ বাজার", "ময়মনসিংহ"],
];
const offsets = [-0.07, -0.04, -0.02, 0, 0.02, 0.04, -0.05, 0.03, 0.05, -0.03];

// Ids may be numbers or strings, so turn them into a stable integer seed.
const seedOf = (id) => {
  const n = Number(id);
  return Number.isFinite(n) ? n : [...String(id)].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
};

export function marketPrices(p) {
  const seed = seedOf(p.id);
  return markets.map(([market, division], i) => {
    const mid = p.price * (1 + offsets[(i + seed) % offsets.length]);
    const min = Math.round(mid * 0.96);
    const max = Math.round(mid * 1.04);
    return { market, division, min, max, avg: (min + max) / 2 };
  });
}
