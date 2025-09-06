import { NextRequest, NextResponse } from "next/server";
import { dateUtils } from "@/lib/api";

// GET /api/news/date?date=2024-01-15&page=1&pageSize=10&category=technology
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date") || dateUtils.getToday();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const category = searchParams.get("category");

  // 参数验证
  if (!dateUtils.isValidDate(date)) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  try {
    // TODO: 这里暂时返回空数据，等待 Apifox 集成
    // 实际实现时需要：
    // 1. 连接数据库
    // 2. 根据 date, page, pageSize, category 查询数据
    // 3. 返回分页结果

    const mockResponse = {
      news: [], // 空数组，等待真实数据
      total: 0,
      page,
      pageSize,
      hasMore: false,
      date,
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
