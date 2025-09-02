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
  readTime: number; // 阅读时间（分钟）
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

export interface SearchFilters {
  query: string;
  category: NewsCategory | "all";
  dateRange: "today" | "week" | "month" | "all";
  sortBy: "relevance" | "date" | "popularity";
}

export interface NewsResponse {
  news: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
