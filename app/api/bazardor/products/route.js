import { NextResponse } from "next/server";
import { listProducts } from "@/lib/bazardor-store";

// GET /api/bazardor/products
// GET /api/bazardor/products?category=chal   (any product field can be used as a filter)
export function GET(request) {
  const filters = Object.fromEntries(request.nextUrl.searchParams);
  return NextResponse.json(listProducts(filters));
}
