// api/simpleFetch.ts
import { NewsCardItem } from "@/types/apiTypes";
// 您的 API 地址
const BASE_URL = "https://m1.apifoxmock.com/m1/7286152-7014057-default/news";

// 极简响应类型
interface NewsListResponse {
  items: NewsCardItem[];
  // 您可以根据实际 API 响应添加其他字段
  firstCursor: string | null; // 最早一条的 cursor（用于向上加载更旧内容）
  lastCursor: string | null; // 最新一条的 cursor（用于向下加载更新内容）
  hasMore: boolean; // 是否还有更多数据
}

/**
 * 最简单的 API 请求函数。
 * @param cursor 用于分页的游标 (可选)。
 * @param limit 每次请求的条数 (默认 10)。
 * @returns 包含数据的 Promise。
 */

export async function simpleFetchNews(
  cursor: string | null = null,
  limit: number = 10
): Promise<NewsListResponse> {
  // 1. 构造 URLSearchParams
  const query = new URLSearchParams({
    // 假设您的 API 使用 limit 和 cursor 参数
    limit: String(limit),
  });

  if (cursor) {
    query.append("cursor", cursor);
  }

  // 2. 构造完整 URL
  const url = `${BASE_URL}?${query.toString()}`;

  try {
    // 3. 发起请求
    const response = await fetch(url);

    // 4. 检查响应状态
    if (!response.ok) {
      // 抛出错误，以便上层逻辑捕获
      throw new Error(`网络请求失败，状态码: ${response.status}`);
    }

    // 5. 解析并返回数据
    // **注意：您需要根据实际 API 响应结构来调整这里的类型转换和字段访问！**
    const data: any = await response.json();

    // 假设 data 对象本身就是您需要的响应体
    // 请根据您的 API 实际返回调整此处
    return data as NewsListResponse;
  } catch (error) {
    // 统一处理并抛出错误
    console.error("Fetch Error:", error);
    throw new Error(
      `数据加载失败: ${error instanceof Error ? error.message : "未知错误"}`
    );
  }
}
