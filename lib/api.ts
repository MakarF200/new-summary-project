import dayjs from "dayjs";
import { NewsCardItem, NewsDetail } from "@/types/apiTypes";
import { NewsCategory, CategoryInfo } from "@/types";

// API 基础配置
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// API 响应数据结构
export interface NewsListResponse {
  data: NewsCardItem[];
  nextCursor: string | null;
  prevCursor: string | null;
  hasMore: boolean;
}

export type SearchResponse = NewsListResponse;

// API 请求封装
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  /**
   * 获取首页新闻流（无限瀑布流）
   * 用于：首页无限滚动加载，返回精简的新闻卡片数据
   */
  async getNewsList(params: {
    date?: string; // 筛选指定日期新闻（YYYY-MM-DD格式，默认当天）
    cursor?: string; // 分页游标（上一次请求返回的最后一条 cursor）
    limit?: number; // 单次获取数量（默认10）
    category?: NewsCategory; // 分类筛选（可选）
  }): Promise<NewsListResponse> {
    const searchParams = new URLSearchParams();

    if (params.date) searchParams.set("date", params.date);
    if (params.cursor) searchParams.set("cursor", params.cursor);
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.category) searchParams.set("category", params.category);

    return this.request<NewsListResponse>(`/news?${searchParams}`);
  }

  /**
   * 获取新闻详情
   * 用于：用户点击新闻卡片时获取完整的新闻内容
   */
  async getNewsDetail(id: string): Promise<NewsDetail> {
    return this.request<NewsDetail>(`/news/${id}`);
  }

  /**
   * 搜索新闻
   * 用于：高级搜索页面，按关键词在标题/摘要/标签中搜索
   */
  async searchNews(params: {
    query: string; // 搜索关键词
    cursor?: string; // 分页游标
    limit?: number; // 单次获取数量（默认10）
    category?: NewsCategory; // 分类筛选（可选）
    dateFrom?: string; // 开始日期（YYYY-MM-DD格式）
    dateTo?: string; // 结束日期（YYYY-MM-DD格式）
  }): Promise<SearchResponse> {
    const searchParams = new URLSearchParams({
      q: params.query,
      limit: (params.limit || 10).toString(),
    });

    if (params.cursor) searchParams.set("cursor", params.cursor);
    if (params.category) searchParams.set("category", params.category);
    if (params.dateFrom) searchParams.set("dateFrom", params.dateFrom);
    if (params.dateTo) searchParams.set("dateTo", params.dateTo);

    return this.request<SearchResponse>(`/news/search?${searchParams}`);
  }

  /**
   * 获取新闻分类列表
   * 用于：分类选择器、导航菜单
   */
  async getCategories(): Promise<CategoryInfo[]> {
    return this.request<CategoryInfo[]>("/categories");
  }
}

// 创建 API 客户端实例
export const apiClient = new ApiClient(API_CONFIG.baseURL);

// 工具函数
export const dateUtils = {
  // 获取今天的日期字符串
  getToday(): string {
    return dayjs().format("YYYY-MM-DD");
  },

  // 获取指定天数前的日期
  getDaysAgo(days: number): string {
    return dayjs().subtract(days, "day").format("YYYY-MM-DD");
  },

  // 获取前一天的日期
  getPreviousDay(date: string): string {
    return dayjs(date).subtract(1, "day").format("YYYY-MM-DD");
  },

  // 格式化日期显示
  formatDateDisplay(date: string): string {
    const today = dayjs();
    const targetDate = dayjs(date);

    if (targetDate.isSame(today, "day")) {
      return "今天";
    } else if (targetDate.isSame(today.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (targetDate.isSame(today.subtract(2, "day"), "day")) {
      return "前天";
    } else {
      return targetDate.format("MM月DD日");
    }
  },

  // 检查日期是否有效
  isValidDate(date: string): boolean {
    return dayjs(date).isValid();
  },
};
