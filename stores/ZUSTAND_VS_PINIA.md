# Zustand vs Pinia 对比指南

从 Pinia 迁移到 Zustand 的快速参考指南。

## 核心概念对比

| 特性       | Pinia               | Zustand               |
| ---------- | ------------------- | --------------------- |
| 创建 Store | `defineStore()`     | `create()`            |
| 状态定义   | `state: () => ({})` | 直接在对象中定义      |
| Getters    | `getters: {}`       | 函数返回计算值        |
| Actions    | `actions: {}`       | 直接在对象中定义方法  |
| 更新状态   | `this.xxx = value`  | `set({ xxx: value })` |
| 读取状态   | `this.xxx`          | `get().xxx`           |
| TypeScript | 自动推导            | 需要定义接口          |

---

## 1. 创建 Store

### Pinia 写法

```typescript
// stores/counter.ts
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    name: "Counter",
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++;
    },
  },
});
```

### Zustand 写法

```typescript
// stores/counter.ts
import { create } from "zustand";

interface CounterState {
  count: number;
  name: string;
  doubleCount: () => number;
  increment: () => void;
}

export const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,
  name: "Counter",

  doubleCount: () => get().count * 2,

  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

---

## 2. 在组件中使用

### Pinia 写法

```vue
<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const { count, doubleCount } = storeToRefs(store);
const { increment } = store;
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### Zustand 写法

```tsx
import { useCounterStore } from "@/stores/counter";

function Counter() {
  // 方式1：选择性订阅（推荐）
  const count = useCounterStore((state) => state.count);
  const doubleCount = useCounterStore((state) => state.doubleCount());
  const increment = useCounterStore((state) => state.increment);

  // 方式2：订阅整个 store
  // const store = useCounterStore()

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

---

## 3. 更新状态

### Pinia 写法

```typescript
// 直接修改
this.count++;
this.name = "New Name";

// 批量修改
this.$patch({
  count: 10,
  name: "Updated",
});

// 使用函数修改
this.$patch((state) => {
  state.count++;
  state.name = "Updated";
});
```

### Zustand 写法

```typescript
// 单个字段修改
set({ count: 10 });

// 批量修改
set({ count: 10, name: "Updated" });

// 基于当前状态修改
set((state) => ({ count: state.count + 1 }));

// 复杂更新
set((state) => ({
  count: state.count + 1,
  name: "Updated",
}));
```

---

## 4. 异步操作

### Pinia 写法

```typescript
actions: {
  async fetchData() {
    this.loading = true
    try {
      const data = await api.getData()
      this.data = data
    } catch (error) {
      this.error = error.message
    } finally {
      this.loading = false
    }
  }
}
```

### Zustand 写法

```typescript
fetchData: async () => {
  set({ loading: true });
  try {
    const data = await api.getData();
    set({ data, loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};
```

---

## 5. Getters / 计算属性

### Pinia 写法

```typescript
getters: {
  doubleCount: (state) => state.count * 2,

  // 访问其他 getter
  quadrupleCount(): number {
    return this.doubleCount * 2
  },

  // 带参数的 getter
  getById: (state) => (id: string) => {
    return state.items.find(item => item.id === id)
  }
}
```

### Zustand 写法

```typescript
// 方式1：返回函数
doubleCount: () => get().count * 2,

// 方式2：在组件中计算（推荐）
// const doubleCount = useCounterStore((state) => state.count * 2)

// 访问其他计算属性
quadrupleCount: () => get().doubleCount() * 2,

// 带参数的函数
getById: (id: string) => {
  return get().items.find(item => item.id === id)
}
```

---

## 6. 重置状态

### Pinia 写法

```typescript
// 内置方法
store.$reset();
```

### Zustand 写法

```typescript
// 需要手动实现
const initialState = {
  count: 0,
  name: "Counter",
};

export const useCounterStore = create<CounterState>((set) => ({
  ...initialState,

  reset: () => set(initialState),
}));
```

---

## 7. 在组件外使用

### Pinia 写法

```typescript
import { useCounterStore } from "@/stores/counter";

// 需要在 setup 或组件内使用
const store = useCounterStore();
store.increment();
```

### Zustand 写法

```typescript
import { useCounterStore } from "@/stores/counter";

// 可以在任何地方使用
useCounterStore.getState().increment();

// 订阅变化
const unsubscribe = useCounterStore.subscribe((state) => {
  console.log("State changed:", state);
});
```

---

## 8. 持久化

### Pinia 写法

```typescript
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: useLocalStorage("count", 0),
  }),
});
```

### Zustand 写法

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCounterStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "counter-storage", // localStorage key
    }
  )
);
```

---

## 9. 中间件

### Pinia 写法

```typescript
// 使用插件
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

### Zustand 写法

```typescript
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        // store 定义
      }),
      { name: "my-store" }
    )
  )
);
```

---

## 10. 性能优化

### Pinia 写法

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

// 使用 storeToRefs 保持响应性
const store = useCounterStore();
const { count } = storeToRefs(store);
</script>
```

### Zustand 写法

```tsx
// 选择性订阅（自动优化）
const count = useCounterStore((state) => state.count);

// 使用 shallow 比较（避免不必要的重渲染）
import { shallow } from "zustand/shallow";

const { count, name } = useCounterStore(
  (state) => ({ count: state.count, name: state.name }),
  shallow
);
```

---

## 总结

### Zustand 的优势

✅ 更简洁的 API  
✅ 更小的包体积（~1KB）  
✅ 不需要 Provider  
✅ 可以在组件外使用  
✅ TypeScript 支持更好

### Pinia 的优势

✅ Vue 官方推荐  
✅ 更完善的 DevTools  
✅ 内置 $reset 方法  
✅ 更好的 Vue 生态集成

### 学习建议

1. Zustand 的核心是 `set()` 和 `get()`
2. 没有 getters，用函数代替
3. 选择性订阅提高性能
4. 中间件系统很强大
