// stores/newsList/actions.ts
import { StateCreator } from "zustand";
import { NewsListStore, NewsListActions } from "./type";

// StateCreator 的类型签名是固定的，用于保证类型安全
export const createNewsListActions: StateCreator<
  NewsListStore,
  [],
  [],
  NewsListActions
> = (set, get) => ({
  // 动作实现 1: 增加计数
  increase: (by: number) => {
    // 使用 set((state) => ...) 来基于当前状态更新
    set((state) => ({ count: state.count + by }));

    // 示例：使用 get() 来读取当前状态
    console.log(`Current count is: ${get().count}`);
  },

  // 动作实现 2: 切换加载状态
  toggleLoading: () => {
    // 使用 set((state) => ...) 来基于当前状态切换 boolean 值
    set((state) => ({ loading: !state.loading }));
  },

  // 动作实现 3: 设置消息
  setMessage: (msg: string) => {
    // 使用 set({...}) 直接覆盖部分状态
    set({ message: msg });
  },
});
