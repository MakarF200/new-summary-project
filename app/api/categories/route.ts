import { NextResponse } from "next/server";
import { categories } from "@/lib/mockData";

// GET /api/categories
export async function GET() {
  try {
    // 返回分类数据
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
