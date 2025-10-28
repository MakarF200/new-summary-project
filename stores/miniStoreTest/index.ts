// stores/newsList/index.ts
import { create } from "zustand";
import { NewsListStore, NewsListState } from "./type";
import { createNewsListActions } from "./action";

// 初始状态定义
const initialState: NewsListState = {
  count: 0,
  loading: false,
  message: "Initial message from Zustand store.",
};

// 使用 create 函数创建 Store Hook
export const useNewsListStore = create<NewsListStore>((set, get) => ({
  // 1. 展开初始状态 (NewsListState 部分)
  ...initialState,

  // 2. 展开动作实现 (NewsListActions 部分)
  // StateCreator<T> 会返回 T 的一部分，这里就是 NewsListActions
  ...createNewsListActions(set, get, [], []),
}));
