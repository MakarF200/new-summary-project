import { NextRequest, NextResponse } from "next/server";

// GET /api/news/search?q=关键词&page=1&pageSize=10&category=technology
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const category = searchParams.get("category");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  // 参数验证
  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    // TODO: 这里暂时返回空数据，等待 Apifox 集成
    const mockResponse = {
      news: [], // 空数组，等待真实数据
      total: 0,
      page,
      pageSize,
      hasMore: false,
      searchInfo: {
        query,
        category,
        dateFrom,
        dateTo,
        searchTime: 0.05,
      },
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
