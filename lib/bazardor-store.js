// Query logic shared by the /api/bazardor route handlers and lib/api.js (built-in mode).
import { categories, products } from "./bazardor-data";

export const listCategories = () => categories;

export const findCategory = (id) => categories.find((c) => c.id === String(id)) ?? null;

// Any product field works as a filter: ?category=chal, ?unit=কেজি, ?price=148 ...
export const listProducts = (filters = {}) =>
  products.filter((p) => Object.entries(filters).every(([key, value]) => String(p[key]) === String(value)));

export const findProduct = (id) => products.find((p) => String(p.id) === String(id)) ?? null;
