/**
 * API 封装 - V2 增强版
 *
 * 特性：
 * - 统一的请求/响应处理
 * - 超时控制
 * - 错误拦截与处理
 * - TypeScript 类型安全
 * - 请求/响应日志
 */

import { NewsCardItem, NewsDetail } from "@/types/apiTypes";

// ==================== 类型定义 ====================

/**
 * 新闻列表响应结构
 */
export interface NewsListResponse {
  data: NewsCardItem[];
  nextCursor: string | null; // 下一页游标
  prevCursor: string | null; // 上一页游标
  hasMore: boolean; // 是否还有更多数据
}

/**
 * 获取新闻列表的请求参数
 */
export interface GetNewsListParams {
  cursor?: string; // 分页游标
  limit?: number; // 每页数量，默认 10
  date?: string; // 日期筛选 YYYY-MM-DD
  category?: string; // 分类筛选
}

/**
 * 搜索新闻的请求参数
 */
export interface SearchNewsParams extends Partial<GetNewsListParams> {
  q: string; // 搜索关键词
  dateFrom?: string; // 开始日期
  dateTo?: string; // 结束日期
}

/**
 * API 错误类
 */
export class ApiError extends Error {
  constructor(message: string, public status?: number, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}

// ==================== 配置 ====================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const DEFAULT_TIMEOUT = 10000; // 10秒超时
const ENABLE_LOGGING = process.env.NODE_ENV === "development"; // 开发环境启用日志

// ==================== 工具函数 ====================

/**
 * 创建带超时的 fetch 请求
 * @param url - 请求地址
 * @param options - fetch 配置
 * @param timeout - 超时时间（毫秒）
 * @returns Promise<Response>
 */
function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = DEFAULT_TIMEOUT
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new ApiError("请求超时", 408)), timeout)
    ),
  ]);
}

/**
 * 构建查询字符串
 * @param params - 参数对象
 * @returns 查询字符串
 */
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * 日志输出（仅开发环境）
 */
const logger = {
  request: (method: string, url: string, data?: any) => {
    if (ENABLE_LOGGING) {
      console.log(`📡 [API Request] ${method} ${url}`, data || "");
    }
  },
  response: (method: string, url: string, data: any) => {
    if (ENABLE_LOGGING) {
      console.log(`✅ [API Response] ${method} ${url}`, data);
    }
  },
  error: (method: string, url: string, error: any) => {
    console.error(`❌ [API Error] ${method} ${url}`, error);
  },
};

// ==================== 核心请求函数 ====================

/**
 * 通用请求封装（增强版）
 * @param endpoint - API 端点（例如：'/news'）
 * @param options - fetch 配置项
 * @returns Promise<T>
 */
async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || "GET";

  // 默认配置
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    // 1. 请求拦截（记录日志）
    logger.request(method, url, options.body);

    // 2. 发起请求（带超时控制）
    const response = await fetchWithTimeout(url, config);

    // 3. HTTP 状态检查
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // 无法解析 JSON，使用默认错误信息
      }

      throw new ApiError(errorMessage, response.status, errorText);
    }

    // 4. 解析响应数据
    const data = await response.json();

    // 5. 响应拦截（记录日志）
    logger.response(method, url, data);

    return data as T;
  } catch (error) {
    // 6. 错误拦截和统一处理
    logger.error(method, url, error);

    // 将所有错误转换为 ApiError
    if (error instanceof ApiError) {
      throw error;
    }

    // 处理网络错误
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new ApiError("网络错误，请检查网络连接", 0);
    }

    // 其他未知错误
    throw new ApiError(
      error instanceof Error ? error.message : "未知错误",
      500
    );
  }
}

// ==================== HTTP 方法封装 ====================

/**
 * GET 请求封装
 * @param endpoint - API 端点
 * @param params - 查询参数
 * @returns Promise<T>
 */
async function get<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  const query = params ? buildQueryString(params) : "";
  return request<T>(`${endpoint}${query}`, { method: "GET" });
}

/**
 * POST 请求封装
 * @param endpoint - API 端点
 * @param data - 请求体数据
 * @returns Promise<T>
 */
async function post<T>(endpoint: string, data?: any): Promise<T> {
  return request<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT 请求封装
 * @param endpoint - API 端点
 * @param data - 请求体数据
 * @returns Promise<T>
 */
async function put<T>(endpoint: string, data?: any): Promise<T> {
  return request<T>(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 请求封装
 * @param endpoint - API 端点
 * @returns Promise<T>
 */
async function del<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: "DELETE" });
}

// ==================== 业务 API 方法 ====================

/**
 * 获取新闻列表（支持游标分页）
 * @param params - 查询参数
 * @returns 新闻列表响应
 *
 * @example
 * ```ts
 * // 获取第一页
 * const news = await getNewsList({ limit: 10 });
 *
 * // 获取下一页
 * const moreNews = await getNewsList({
 *   cursor: news.nextCursor,
 *   limit: 10
 * });
 *
 * // 按日期和分类筛选
 * const filtered = await getNewsList({
 *   date: "2025-10-28",
 *   category: "tech"
 * });
 * ```
 */
export async function getNewsList(
  params: GetNewsListParams = {}
): Promise<NewsListResponse> {
  return get<NewsListResponse>("/news", params);
}

/**
 * 获取新闻详情
 * @param id - 新闻 ID 或 cursor
 * @returns 新闻详情
 *
 * @example
 * ```ts
 * const detail = await getNewsDetail("news-001");
 * ```
 */
export async function getNewsDetail(id: string): Promise<NewsDetail> {
  if (!id) {
    throw new ApiError("新闻 ID 不能为空", 400);
  }
  return get<NewsDetail>(`/news/${id}`);
}

/**
 * 搜索新闻
 * @param query - 搜索关键词
 * @param params - 额外的筛选参数
 * @returns 搜索结果
 *
 * @example
 * ```ts
 * // 简单搜索
 * const results = await searchNews("人工智能");
 *
 * // 带筛选条件的搜索
 * const filtered = await searchNews("AI", {
 *   category: "tech",
 *   limit: 20,
 *   dateFrom: "2025-01-01"
 * });
 * ```
 */
export async function searchNews(
  query: string,
  params: Partial<GetNewsListParams> = {}
): Promise<NewsListResponse> {
  if (!query || query.trim() === "") {
    throw new ApiError("搜索关键词不能为空", 400);
  }
  return get<NewsListResponse>("/news/search", { q: query, ...params });
}

/**
 * 获取新闻分类列表
 * @returns 分类列表
 *
 * @example
 * ```ts
 * const categories = await getCategories();
 * ```
 */
export async function getCategories(): Promise<string[]> {
  return get<string[]>("/categories");
}

// ==================== 导出 API 工具对象 ====================

/**
 * API 工具集合
 *
 * @example
 * ```ts
 * import { api } from "@/lib/api/apiFunc-v2";
 *
 * // 使用业务方法
 * const news = await api.getNewsList({ limit: 10 });
 *
 * // 使用底层 HTTP 方法
 * const data = await api.get("/custom-endpoint", { param: "value" });
 * ```
 */
export const api = {
  // HTTP 方法
  get,
  post,
  put,
  delete: del,

  // 业务方法
  getNewsList,
  getNewsDetail,
  searchNews,
  getCategories,
};

// ==================== 默认导出 ====================

export default api;
