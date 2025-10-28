import { create } from "zustand";
import { NewsCardItem } from "@/types/apiTypes";
import { createSelectors } from "@/utils/zustand";

// ==================== 卡片列表数据状态 ====================
interface NewsListDataState {
  // 📦 核心数据
  items: NewsCardItem[]; // 当前缓存的所有卡片（按时间倒序排列，最新在前）
  // 🔁 游标状态（用于分页请求）
  firstCursor: string | null; // 最早一条的 cursor（用于向上加载更旧内容）
  lastCursor: string | null; // 最新一条的 cursor（用于向下加载更新内容）
  // ⏳ 加载状态
  isLoadingPrev: boolean; // 正在加载历史（上方）
  isLoadingNext: boolean; // 正在加载最新（下方）
  hasPrev: boolean; // 是否还有更早的内容可加载
  hasNext: boolean; // 是否还有更新的内容可加载
  // 🚫 错误状态
  error: string | null;
}
// ==================== 搜索/筛选数据状态 ====================
interface SearchDataState extends NewsListDataState {
  // 📅 筛选条件（如果需要按日期/分类筛选）
  currentDate?: string; // 当前查看的日期（YYYY-MM-DD）
  selectedCategory?: string; // 当前选中的分类（可选，用于筛选）
  // 🔄 初始化状态
  isInitialized: boolean; // 是否已完成首次加载（避免重复初始化）
  // 📊 统计信息（可选，用于显示总数等）
  totalCount?: number; // 总新闻数量（如果 API 返回）
  // 🕐 最后更新时间
  lastFetchTime: number | null; // 最后一次请求的时间戳（用于刷新判断）
}

export const useNewsListDataStore = create<NewsListDataState>((set) => ({
  items: [],
  firstCursor: null,
  lastCursor: null,
  isLoadingPrev: false,
  isLoadingNext: false,
  hasPrev: false,
  hasNext: false,
  error: null,
}));

export const useNewsListDataStoreSelectors =
  createSelectors(useNewsListDataStore);
