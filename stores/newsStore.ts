import { create } from "zustand";
import { apiClient, dateUtils, NewsItem } from "@/lib/api";

// 新闻数据接口
interface NewsDataByDate {
  [date: string]: {
    news: NewsItem[];
    currentPage: number;
    hasMore: boolean;
    total: number;
    loading: boolean;
  };
}

// 状态接口
interface NewsState {
  // 数据状态
  newsByDate: NewsDataByDate;
  currentDate: string;
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;

  // 操作方法
  setCurrentDate: (date: string) => void;
  setSelectedCategory: (category: string) => void;
  loadNewsForDate: (
    date: string,
    page?: number,
    category?: string
  ) => Promise<void>;
  loadMoreNews: () => Promise<void>;
  resetNews: () => void;
  clearError: () => void;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  // 初始状态
  newsByDate: {},
  currentDate: dateUtils.getToday(),
  selectedCategory: "all",
  isLoading: false,
  error: null,

  // 设置当前日期
  setCurrentDate: (date: string) => {
    set({ currentDate: date });
  },

  // 设置选中的分类
  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  },

  // 加载指定日期的新闻
  loadNewsForDate: async (date: string, page = 1, category?: string) => {
    const state = get();
    const currentCategory = category || state.selectedCategory;

    // 如果是第一页，设置 loading 状态
    if (page === 1) {
      set({ isLoading: true, error: null });
    }

    try {
      // 调用 API（目前返回空数据，等待 Apifox 集成）
      const response = await apiClient.getNewsByDate({
        date,
        page,
        pageSize: 10,
        category: currentCategory === "all" ? undefined : currentCategory,
      });

      set((state) => {
        const newsByDate = { ...state.newsByDate };

        if (page === 1) {
          // 第一页，替换数据
          newsByDate[date] = {
            news: response.news,
            currentPage: page,
            hasMore: response.hasMore,
            total: response.total,
            loading: false,
          };
        } else {
          // 后续页，追加数据
          const existingData = newsByDate[date] || {
            news: [],
            currentPage: 0,
            hasMore: true,
            total: 0,
            loading: false,
          };

          newsByDate[date] = {
            ...existingData,
            news: [...existingData.news, ...response.news],
            currentPage: page,
            hasMore: response.hasMore,
            total: response.total,
            loading: false,
          };
        }

        return {
          newsByDate,
          isLoading: false,
          currentDate: date,
        };
      });
    } catch (error) {
      console.error("Failed to load news:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "加载失败",
      });
    }
  },

  // 加载更多新闻（当前日期的下一页）
  loadMoreNews: async () => {
    const state = get();
    const { currentDate, newsByDate } = state;
    const dateData = newsByDate[currentDate];

    if (!dateData || !dateData.hasMore || dateData.loading) {
      return;
    }

    const nextPage = dateData.currentPage + 1;
    await state.loadNewsForDate(currentDate, nextPage);
  },

  // 重置所有新闻数据
  resetNews: () => {
    set({
      newsByDate: {},
      currentDate: dateUtils.getToday(),
      selectedCategory: "all",
      isLoading: false,
      error: null,
    });
  },

  // 清除错误信息
  clearError: () => {
    set({ error: null });
  },
}));

// 工具函数：获取指定日期的新闻数据
export const getNewsForDate = (date: string) => {
  const { newsByDate } = useNewsStore.getState();
  return (
    newsByDate[date] || {
      news: [],
      currentPage: 0,
      hasMore: true,
      total: 0,
      loading: false,
    }
  );
};

// 工具函数：检查是否有更多数据可加载
export const hasMoreNewsForDate = (date: string) => {
  const dateData = getNewsForDate(date);
  return dateData.hasMore && !dateData.loading;
};
