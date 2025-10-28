// stores/newsList/types.ts

// 1. 状态 (State) 接口：定义所有数据字段
export interface NewsListState {
  count: number;
  loading: boolean;
  message: string;
}

// 2. 动作 (Actions) 接口：定义所有动作函数签名
export interface NewsListActions {
  increase: (by: number) => void;
  toggleLoading: () => void;
  setMessage: (msg: string) => void;
}

// 3. 完整的 Store 类型：状态和动作的合并
export type NewsListStore = NewsListState & NewsListActions;
