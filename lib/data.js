// Mock market data for the 33 products shown in the Figma design.
const DIGITS = "০১২৩৪৫৬৭৮৯";
export const bn = (v) => String(v).replace(/\d/g, (d) => DIGITS[d]);
export const taka = (n) =>
  `${bn(
    Number.isInteger(n)
      ? n.toLocaleString("en-US")
      : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  )} টাকা`;
export const num = (n) => bn(Number(n).toLocaleString("en-US"));
export const priceNum = (n) => bn(Number.isInteger(n) ? n.toLocaleString("en-US") : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
export const pct = (n) => `${bn(Math.abs(n).toFixed(1))}%`;

export const categories = [
  { slug: "rice", name: "চাল", emoji: "🍚" },
  { slug: "pulses", name: "ডাল", emoji: "🫘" },
  { slug: "oil", name: "তেল", emoji: "🛢️" },
  { slug: "vegetables", name: "সবজি", emoji: "🥬" },
  { slug: "fish", name: "মাছ", emoji: "🐟" },
  { slug: "meat", name: "মাংস", emoji: "🍗" },
  { slug: "dairy-egg", name: "ডিম-দুধ", emoji: "🥚" },
  { slug: "spices", name: "মসলা", emoji: "🌶️" },
];

// [category slug, name, unit, price (BDT), change % vs yesterday]
const rows = [
  ["rice", "স্বর্ণমাছি চাল", "কেজি", 148, 2.1],
  ["rice", "মিনিকেট চাল", "কেজি", 99, -2.9],
  ["rice", "নাজির চাল", "কেজি", 74, 0],
  ["rice", "বাটাম সাইজ চাল", "কেজি", 66, 3.1],
  ["pulses", "মসুর ডাল", "কেজি", 142, 2.9],
  ["pulses", "মুগ ডাল", "কেজি", 135, -1.6],
  ["pulses", "ছোলা", "কেজি", 120, -2.4],
  ["pulses", "আমন ডাল (খোসাসিলা)", "কেজি", 156, 2.6],
  ["oil", "সরিষার তেল", "লিটার", 192, 1.1],
  ["oil", "পাম তেল", "লিটার", 168, 2.3],
  ["oil", "ঘানি ভাঙা সরিষার তেল", "লিটার", 215, 0.9],
  ["vegetables", "পেঁয়াজ", "কেজি", 54, 12.5],
  ["vegetables", "আদা", "কেজি", 85, 9.0],
  ["vegetables", "বেগুন", "কেজি", 44, 4.8],
  ["vegetables", "কাঁচামরিচ", "কেজি", 92, -12.4],
  ["vegetables", "রসুন", "কেজি", 125, -7.4],
  ["vegetables", "আলু", "কেজি", 30, -6.2],
  ["vegetables", "ঢেঁড়স", "কেজি", 38, 1.8],
  ["fish", "রুই মাছ", "কেজি", 46, 4.5],
  ["fish", "কাতলা মাছ", "কেজি", 43, -4.4],
  ["fish", "তেলাপিয়া", "কেজি", 36, -1.5],
  ["fish", "ইলিশ মাছ", "কেজি", 1850, 2.2],
  ["fish", "চিংড়ি মাছ (খোলা)", "কেজি", 330, -0.8],
  ["meat", "মুরগির মাংস", "কেজি", 225, -1.3],
  ["meat", "গরুর মাংস", "কেজি", 790, 1.2],
  ["meat", "হাঁসের মাংস", "কেজি", 285, -3.4],
  ["meat", "খাসির মাংস", "কেজি", 1290, -3.0],
  ["dairy-egg", "ডিম", "ডজন", 158, 3.9],
  ["dairy-egg", "মাখন (১০০ গ্রাম)", "পিস", 145, 3.6],
  ["dairy-egg", "দুধ", "লিটার", 102, 2.0],
  ["dairy-egg", "দই", "কেজি", 140, 1.5],
  ["spices", "মরিচ গুঁড়া", "কেজি", 245, -2.0],
  ["spices", "ধনেপাতা গুঁড়া", "কেজি", 265, 0.5],
];

const emojiOverride = {
  "পেঁয়াজ": "🧅", "আলু": "🥔", "কাঁচামরিচ": "🌶️", "রসুন": "🧄", "আদা": "🫚",
  "বেগুন": "🍆", "ডিম": "🥚", "দুধ": "🥛", "দই": "🥛", "মাখন (১০০ গ্রাম)": "🧈",
  "চিংড়ি মাছ (খোলা)": "🦐",
};
const catEmoji = Object.fromEntries(categories.map((c) => [c.slug, c.emoji]));

export const products = rows.map(([category, name, unit, price, change], i) => ({
  id: i + 1,
  category,
  emoji: emojiOverride[name] || catEmoji[category],
  name,
  unit: `প্রতি ${unit}`,
  unitName: unit,
  price,
  change,
  yesterday: Math.round(price / (1 + change / 100)),
}));

export const getProduct = (id) => products.find((p) => p.id === Number(id));
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug) => products.filter((p) => p.category === slug);

export const risers = () =>
  products.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
export const fallers = () =>
  products.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

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

// Deterministic per-market prices derived from the product's national price.
export function marketPrices(p) {
  return markets.map(([market, division], i) => {
    const mid = p.price * (1 + offsets[(i + p.id) % offsets.length]);
    const min = Math.round(mid * 0.96);
    const max = Math.round(mid * 1.04);
    return { market, division, min, max, avg: (min + max) / 2 };
  });
}

export const dateBn = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
