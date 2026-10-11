// Bazardor API client. This is the only place the app reads categories/products from.
//
//   GET /api/bazardor/categories
//   GET /api/bazardor/categories/:id
//   GET /api/bazardor/products
//   GET /api/bazardor/products?category=:id
//   GET /api/bazardor/products/:id
//
// Two modes:
//   - BAZARDOR_API_URL not set (default): uses the built-in API (app/api/bazardor + lib/bazardor-data.js).
//     The data is read directly, with no HTTP round trip, so no setup is needed.
//   - BAZARDOR_API_URL=https://some-host (host only, no path): calls <host>/api/bazardor/... over HTTP.
//
// Server-only: call these from Server Components / route handlers, not from "use client" files.

import * as store from "./bazardor-store";

const REVALIDATE_SECONDS = 60;

let warned = false;

// Returns the external API host, or null to use the built-in API.
function externalHost() {
  const raw = process.env.BAZARDOR_API_URL?.trim();
  if (!raw) return null;
  // A pasted placeholder such as "https://your-api-host" or "https://আপনার-api-host" is not a real host.
  if (!/^https?:\/\/[\x21-\x7E]+$/.test(raw) || raw.includes("your-api-host")) {
    if (!warned) {
      warned = true;
      console.warn(`BAZARDOR_API_URL ("${raw}") is not a real URL, using the built-in API instead.`);
    }
    return null;
  }
  return raw.replace(/\/+$/, "");
}

// Built-in API: same logic the /api/bazardor route handlers use. Returns null for "not found".
function local(path) {
  const url = new URL(path, "http://local");
  const [resource, rawId] = url.pathname.split("/").filter(Boolean);
  const id = rawId === undefined ? undefined : decodeURIComponent(rawId);
  if (resource === "categories") return id === undefined ? store.listCategories() : store.findCategory(id);
  if (resource === "products") {
    return id === undefined ? store.listProducts(Object.fromEntries(url.searchParams)) : store.findProduct(id);
  }
  return null;
}

// Returns parsed JSON, or null when the resource does not exist (404).
async function request(path) {
  const host = externalHost();
  if (!host) return local(path);
  const res = await fetch(`${host}/api/bazardor${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Bazardor API responded ${res.status} for ${path}`);
  return res.json();
}

// Accepts a bare value or a common wrapper such as { data: ... } or { products: [...] }.
function unwrap(json, key) {
  if (json == null || Array.isArray(json)) return json;
  for (const k of [key, "data", "items", "result"]) {
    if (json[k] !== undefined) return json[k];
  }
  return json;
}

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// ---------------------------------------------------------------------------
// Normalisation: the UI works with { slug, name, emoji } categories and
// { id, category, emoji, name, unit, unitName, price, change, yesterday } products.
// If the API uses different field names, adjust the two functions below — nothing else.
// ---------------------------------------------------------------------------

// Fallback emojis, used only when the API does not send its own.
const CATEGORY_EMOJI_BY_NAME = {
  "চাল": "🍚", "ডাল": "🫘", "তেল": "🛢️", "সবজি": "🥬",
  "মাছ": "🐟", "মাংস": "🍗", "ডিম-দুধ": "🥚", "মসলা": "🌶️",
};
const PRODUCT_EMOJI_BY_NAME = {
  "পেঁয়াজ": "🧅", "আলু": "🥔", "কাঁচামরিচ": "🌶️", "রসুন": "🧄", "আদা": "🫚",
  "বেগুন": "🍆", "ডিম": "🥚", "দুধ": "🥛", "দই": "🥛", "মাখন (১০০ গ্রাম)": "🧈",
  "চিংড়ি মাছ (খোলা)": "🦐",
};
const DEFAULT_EMOJI = "🛒";

function normalizeCategory(raw) {
  const slug = String(raw.id ?? raw.slug ?? "");
  const name = raw.name ?? raw.nameBn ?? raw.title ?? slug;
  return {
    slug,
    name,
    emoji: raw.emoji ?? raw.icon ?? CATEGORY_EMOJI_BY_NAME[name] ?? DEFAULT_EMOJI,
  };
}

function normalizeProduct(raw, categoryEmoji = {}) {
  const category = String(
    isObject(raw.category) ? raw.category.id ?? raw.category.slug : raw.category ?? raw.categoryId ?? raw.category_id ?? ""
  );
  const name = raw.name ?? raw.nameBn ?? raw.title ?? "";
  const price = Number(raw.price ?? raw.currentPrice ?? raw.todayPrice ?? 0);

  const unitRaw = String(raw.unitName ?? raw.unit ?? "").replace(/^প্রতি\s*/, "");
  const prevRaw = raw.yesterday ?? raw.yesterdayPrice ?? raw.previousPrice;
  const changeRaw = raw.change ?? raw.changePercent ?? raw.percentChange;

  let change = Number(changeRaw);
  if (changeRaw == null || Number.isNaN(change)) {
    const prev = Number(prevRaw);
    change = prev > 0 ? ((price - prev) / prev) * 100 : 0;
  }
  const prev = Number(prevRaw);
  const yesterday = prevRaw != null && !Number.isNaN(prev) ? prev : Math.round(price / (1 + change / 100));

  return {
    id: raw.id,
    category,
    emoji: raw.emoji ?? raw.icon ?? PRODUCT_EMOJI_BY_NAME[name] ?? categoryEmoji[category] ?? DEFAULT_EMOJI,
    name,
    unit: `প্রতি ${unitRaw}`,
    unitName: unitRaw,
    price,
    change,
    yesterday,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getCategories() {
  const list = unwrap(await request("/categories"), "categories");
  return Array.isArray(list) ? list.filter(isObject).map(normalizeCategory) : [];
}

export async function getCategory(slug) {
  const raw = unwrap(await request(`/categories/${encodeURIComponent(slug)}`), "category");
  if (!isObject(raw) || (raw.id ?? raw.slug) == null) return null;
  return normalizeCategory(raw);
}

async function categoryEmojiMap() {
  const categories = await getCategories();
  return Object.fromEntries(categories.map((c) => [c.slug, c.emoji]));
}

// getProducts() → all products; getProducts({ category: "chal" }) → only that category.
export async function getProducts({ category } = {}) {
  const path = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const [json, emojis] = await Promise.all([request(path), categoryEmojiMap()]);
  const list = unwrap(json, "products");
  return Array.isArray(list) ? list.filter(isObject).map((p) => normalizeProduct(p, emojis)) : [];
}

export async function getProduct(id) {
  const [json, emojis] = await Promise.all([request(`/products/${encodeURIComponent(id)}`), categoryEmojiMap()]);
  const raw = unwrap(json, "product");
  if (!isObject(raw) || raw.id == null) return null;
  return normalizeProduct(raw, emojis);
}
