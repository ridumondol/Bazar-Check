import { NextResponse } from "next/server";
import { listCategories } from "@/lib/bazardor-store";

// GET /api/bazardor/categories
export function GET() {
  return NextResponse.json(listCategories());
}
