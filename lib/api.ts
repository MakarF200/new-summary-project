import dayjs from "dayjs";

// API 基础配置
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

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

  // 获取新闻列表（按日期分页）
  async getNewsByDate(params: {
    date: string; // YYYY-MM-DD 格式
    page?: number; // 页码，默认 1
    pageSize?: number; // 每页数量，默认 10
    category?: string; // 分类筛选，可选
  }) {
    const searchParams = new URLSearchParams({
      date: params.date,
      page: (params.page || 1).toString(),
      pageSize: (params.pageSize || 10).toString(),
      ...(params.category && { category: params.category }),
    });

    return this.request<NewsResponse>(`/news/date?${searchParams}`);
  }

  // 获取新闻详情
  async getNewsById(id: string) {
    return this.request<NewsItem>(`/news/${id}`);
  }

  // 搜索新闻
  async searchNews(params: {
    query: string;
    page?: number;
    pageSize?: number;
    category?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const searchParams = new URLSearchParams({
      q: params.query,
      page: (params.page || 1).toString(),
      pageSize: (params.pageSize || 10).toString(),
      ...(params.category && { category: params.category }),
      ...(params.dateFrom && { dateFrom: params.dateFrom }),
      ...(params.dateTo && { dateTo: params.dateTo }),
    });

    return this.request<NewsResponse>(`/news/search?${searchParams}`);
  }

  // 获取分类列表
  async getCategories() {
    return this.request<CategoryInfo[]>("/categories");
  }
}

// 创建 API 客户端实例
export const apiClient = new ApiClient(API_CONFIG.baseURL);

// 类型定义（从 types/index.ts 导入）
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  url: string;
  tags: string[];
  readTime: number;
}

export type NewsCategory =
  | "politics"
  | "economy"
  | "technology"
  | "sports"
  | "entertainment"
  | "health"
  | "science"
  | "world";

export interface CategoryInfo {
  id: NewsCategory;
  name: string;
  description: string;
  color: string;
}

export interface NewsResponse {
  news: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  date: string;
}

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
