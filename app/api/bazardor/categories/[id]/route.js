import { NextResponse } from "next/server";
import { findCategory } from "@/lib/bazardor-store";

// GET /api/bazardor/categories/chal
export async function GET(_request, { params }) {
  const { id } = await params;
  const category = findCategory(id);
  return category
    ? NextResponse.json(category)
    : NextResponse.json({ error: `Category "${id}" not found` }, { status: 404 });
}
