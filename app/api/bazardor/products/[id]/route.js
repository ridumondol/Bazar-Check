import { NextResponse } from "next/server";
import { findProduct } from "@/lib/bazardor-store";

// GET /api/bazardor/products/1
export async function GET(_request, { params }) {
  const { id } = await params;
  const product = findProduct(id);
  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: `Product "${id}" not found` }, { status: 404 });
}
