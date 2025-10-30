import { create } from "zustand";
import { NewsCardItem } from "@/types/apiTypes";

// ==================== 类型定义 ====================

interface NewsListStore {
  // ---------- 数据状态 ----------
  items: NewsCardItem[]; // 当前缓存的所有卡片（按时间倒序排列，最新在前）
  firstCursor: string | null; // 最早一条的 cursor（用于向上加载更旧内容）
  lastCursor: string | null; // 最新一条的 cursor（用于向下加载更新内容）

  // ---------- 加载状态 ----------
  isLoadingPrev: boolean; // 正在加载历史（上方）
  isLoadingNext: boolean; // 正在加载最新（下方）
  hasPrev: boolean; // 是否还有更早的内容可加载
  hasNext: boolean; // 是否还有更新的内容可加载
  isInitialized: boolean; // 是否已完成首次加载

  // ---------- 其他状态 ----------
  error: string | null; // 错误信息
  lastFetchTime: number | null; // 最后一次请求的时间戳

  // ---------- 数据操作方法 ----------
  setItems: (items: NewsCardItem[]) => void;
  addItemsToTop: (items: NewsCardItem[]) => void; // 添加到顶部（最新）
  addItemsToBottom: (items: NewsCardItem[]) => void; // 添加到底部（历史）
  updateItem: (cursor: string, updates: Partial<NewsCardItem>) => void;
  removeItem: (cursor: string) => void;

  // ---------- 状态管理方法 ----------
  updateCursors: (first: string | null, last: string | null) => void;
  setLoadingPrev: (loading: boolean) => void;
  setLoadingNext: (loading: boolean) => void;
  setHasPrev: (has: boolean) => void;
  setHasNext: (has: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // ---------- 重置操作 ----------
  reset: () => void; // 重置所有状态
  clearItems: () => void; // 只清空数据

  // ---------- 查询方法 ----------
  getItemByCursor: (cursor: string) => NewsCardItem | undefined;
  getItemsCount: () => number;
  isLoading: () => boolean; // 任一方向是否正在加载
}

// ==================== 创建 Store ====================

export const useNewsListStore = create<NewsListStore>((set, get) => ({
  // ========== 初始状态 ==========
  items: [],
  firstCursor: null,
  lastCursor: null,
  isLoadingPrev: false,
  isLoadingNext: false,
  hasPrev: false,
  hasNext: false,
  isInitialized: false,
  error: null,
  lastFetchTime: null,

  // ========== 数据操作方法 ==========

  /**
   * 设置新闻列表（覆盖）
   */
  setItems: (items) => {
    set({
      items,
      lastFetchTime: Date.now(),
    });
  },

  /**
   * 添加新闻到顶部（最新）
   * 用于：加载更新的内容
   */
  addItemsToTop: (newItems) => {
    set((state) => ({
      items: [...newItems, ...state.items],
      lastCursor: newItems[0]?.cursor || state.lastCursor,
      lastFetchTime: Date.now(),
    }));
  },

  /**
   * 添加新闻到底部（历史）
   * 用于：加载更旧的内容
   */
  addItemsToBottom: (newItems) => {
    set((state) => ({
      items: [...state.items, ...newItems],
      firstCursor: newItems[newItems.length - 1]?.cursor || state.firstCursor,
      lastFetchTime: Date.now(),
    }));
  },

  /**
   * 更新单条新闻
   */
  updateItem: (cursor, updates) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.cursor === cursor ? { ...item, ...updates } : item
      ),
    }));
  },

  /**
   * 删除单条新闻
   */
  removeItem: (cursor) => {
    set((state) => ({
      items: state.items.filter((item) => item.cursor !== cursor),
    }));
  },

  // ========== 状态管理方法 ==========

  /**
   * 更新游标
   */
  updateCursors: (first, last) => {
    set({ firstCursor: first, lastCursor: last });
  },

  /**
   * 设置历史加载状态
   */
  setLoadingPrev: (loading) => {
    set({ isLoadingPrev: loading });
  },

  /**
   * 设置最新加载状态
   */
  setLoadingNext: (loading) => {
    set({ isLoadingNext: loading });
  },

  /**
   * 设置是否还有历史内容
   */
  setHasPrev: (has) => {
    set({ hasPrev: has });
  },

  /**
   * 设置是否还有更新内容
   */
  setHasNext: (has) => {
    set({ hasNext: has });
  },

  /**
   * 设置错误信息
   */
  setError: (error) => {
    set({ error });
  },

  /**
   * 清除错误信息
   */
  clearError: () => {
    set({ error: null });
  },

  // ========== 重置操作 ==========

  /**
   * 重置所有状态到初始值
   */
  reset: () => {
    set({
      items: [],
      firstCursor: null,
      lastCursor: null,
      isLoadingPrev: false,
      isLoadingNext: false,
      hasPrev: false,
      hasNext: false,
      isInitialized: false,
      error: null,
      lastFetchTime: null,
    });
  },

  /**
   * 只清空新闻数据，保留其他状态
   */
  clearItems: () => {
    set({
      items: [],
      firstCursor: null,
      lastCursor: null,
    });
  },

  // ========== 查询方法（计算属性） ==========

  /**
   * 根据 cursor 查找新闻
   */
  getItemByCursor: (cursor) => {
    return get().items.find((item) => item.cursor === cursor);
  },

  /**
   * 获取新闻总数
   */
  getItemsCount: () => {
    return get().items.length;
  },

  /**
   * 检查是否正在加载（任一方向）
   */
  isLoading: () => {
    const state = get();
    return state.isLoadingPrev || state.isLoadingNext;
  },
}));

// ========== 带选择器的 Store（推荐使用） ==========
export const useNewsListStoreSelectors = createSelectors(useNewsListStore);

// ========== 使用示例 ==========
/*
// 1. 在组件中使用（选择性订阅）
const items = useNewsListStore((state) => state.items);
const isLoading = useNewsListStore((state) => state.isLoading());
const addItemsToTop = useNewsListStore((state) => state.addItemsToTop);

// 2. 使用选择器版本（更简洁）
const items = useNewsListStoreSelectors.use.items();
const isLoadingPrev = useNewsListStoreSelectors.use.isLoadingPrev();

// 3. 在组件外使用
useNewsListStore.getState().setItems(newItems);
useNewsListStore.getState().reset();
*/
