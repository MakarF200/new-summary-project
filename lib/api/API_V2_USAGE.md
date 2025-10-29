# API V2 使用文档

这是项目的新版 API 封装，提供了完整的类型安全和错误处理。

## 📦 功能特性

✅ **超时控制** - 10 秒自动超时  
✅ **错误拦截** - 统一的错误处理机制  
✅ **类型安全** - 完整的 TypeScript 类型定义  
✅ **请求日志** - 开发环境自动记录请求/响应  
✅ **参数验证** - 自动验证必填参数  
✅ **自定义错误类** - `ApiError` 包含状态码和响应

---

## 🚀 快速开始

### 1. 基础使用

```typescript
import { getNewsList, getNewsDetail, searchNews } from "@/lib/api/apiFunc-v2";

// 获取新闻列表
const news = await getNewsList({ limit: 10 });

// 获取新闻详情
const detail = await getNewsDetail("news-001");

// 搜索新闻
const results = await searchNews("人工智能", { limit: 20 });
```

### 2. 使用 API 工具对象

```typescript
import api from "@/lib/api/apiFunc-v2";

// 业务方法
const news = await api.getNewsList({ limit: 10 });

// 底层 HTTP 方法（用于自定义端点）
const data = await api.get("/custom-endpoint", { param: "value" });
const result = await api.post("/submit", { name: "test" });
```

---

## 📚 API 方法详解

### `getNewsList(params?)`

获取新闻列表，支持游标分页和筛选。

**参数：**

```typescript
interface GetNewsListParams {
  cursor?: string; // 分页游标
  limit?: number; // 每页数量，默认 10
  date?: string; // 日期筛选 YYYY-MM-DD
  category?: string; // 分类筛选
}
```

**返回：**

```typescript
interface NewsListResponse {
  data: NewsCardItem[];
  nextCursor: string | null;
  prevCursor: string | null;
  hasMore: boolean;
}
```

**示例：**

```typescript
// 获取第一页
const news = await getNewsList({ limit: 10 });

// 获取下一页
const moreNews = await getNewsList({
  cursor: news.nextCursor,
  limit: 10,
});

// 按日期和分类筛选
const filtered = await getNewsList({
  date: "2025-10-28",
  category: "tech",
});
```

---

### `getNewsDetail(id)`

获取单条新闻的完整详情。

**参数：**

- `id: string` - 新闻 ID 或 cursor（必填）

**返回：**

- `Promise<NewsDetail>` - 新闻详情对象

**示例：**

```typescript
try {
  const detail = await getNewsDetail("news-001");
  console.log(detail.title, detail.content);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.message, error.status);
  }
}
```

---

### `searchNews(query, params?)`

搜索新闻，支持关键词搜索和筛选。

**参数：**

- `query: string` - 搜索关键词（必填）
- `params?: Partial<GetNewsListParams>` - 额外筛选参数

**返回：**

- `Promise<NewsListResponse>` - 搜索结果

**示例：**

```typescript
// 简单搜索
const results = await searchNews("人工智能");

// 带筛选条件的搜索
const filtered = await searchNews("AI", {
  category: "tech",
  limit: 20,
  dateFrom: "2025-01-01",
});
```

---

### `getCategories()`

获取所有新闻分类列表。

**返回：**

- `Promise<string[]>` - 分类列表

**示例：**

```typescript
const categories = await getCategories();
// ["tech", "sports", "entertainment", ...]
```

---

## 🛠️ 在 Zustand Store 中使用

```typescript
import { create } from "zustand";
import { getNewsList, ApiError } from "@/lib/api/apiFunc-v2";
import { NewsCardItem } from "@/types/apiTypes";

interface NewsStore {
  items: NewsCardItem[];
  isLoading: boolean;
  error: string | null;
  loadNews: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadNews: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await getNewsList({ limit: 10 });

      set({
        items: response.data,
        isLoading: false,
      });
    } catch (error) {
      // 错误处理
      const errorMessage =
        error instanceof ApiError ? error.message : "加载失败";

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
```

---

## 🚨 错误处理

### ApiError 类

所有 API 错误都会被包装为 `ApiError` 类型：

```typescript
class ApiError extends Error {
  name: "ApiError";
  message: string; // 错误信息
  status?: number; // HTTP 状态码
  response?: any; // 原始响应
}
```

### 错误类型

| 状态码 | 说明       |
| ------ | ---------- |
| `0`    | 网络错误   |
| `408`  | 请求超时   |
| `400`  | 参数错误   |
| `404`  | 资源不存在 |
| `500`  | 服务器错误 |

### 错误处理示例

```typescript
import { ApiError } from "@/lib/api/apiFunc-v2";

try {
  const news = await getNewsList();
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 0:
        console.error("网络错误，请检查网络连接");
        break;
      case 408:
        console.error("请求超时，请稍后重试");
        break;
      case 404:
        console.error("资源不存在");
        break;
      default:
        console.error("发生错误：", error.message);
    }
  }
}
```

---

## 🔧 底层 HTTP 方法

当业务 API 无法满足需求时，可以使用底层 HTTP 方法：

```typescript
import api from "@/lib/api/apiFunc-v2";

// GET 请求
const data = await api.get<ResponseType>("/endpoint", {
  param1: "value1",
  param2: "value2",
});

// POST 请求
const result = await api.post<ResponseType>("/endpoint", {
  name: "test",
  value: 123,
});

// PUT 请求
const updated = await api.put<ResponseType>("/endpoint", {
  id: 1,
  name: "updated",
});

// DELETE 请求
await api.delete("/endpoint");
```

---

## 📝 配置说明

### 环境变量

在 `.env.local` 中配置 API 地址：

```bash
NEXT_PUBLIC_API_URL=https://api.example.com/api
```

### 超时时间

默认超时时间为 10 秒，可以在源码中修改：

```typescript
const DEFAULT_TIMEOUT = 10000; // 毫秒
```

### 日志开关

日志仅在开发环境启用，生产环境自动关闭：

```typescript
const ENABLE_LOGGING = process.env.NODE_ENV === "development";
```

---

## 🎯 最佳实践

### 1. 使用 try-catch 包裹异步调用

```typescript
const loadNews = async () => {
  try {
    const news = await getNewsList({ limit: 10 });
    // 处理成功
  } catch (error) {
    // 处理错误
  }
};
```

### 2. 在 Store 中统一处理错误

```typescript
loadNews: async () => {
  set({ isLoading: true, error: null });

  try {
    const response = await getNewsList({ limit: 10 });
    set({ items: response.data, isLoading: false });
  } catch (error) {
    set({
      error: error instanceof ApiError ? error.message : "未知错误",
      isLoading: false,
    });
  }
};
```

### 3. 使用类型安全

```typescript
// ✅ 好：类型安全
const news: NewsListResponse = await getNewsList({ limit: 10 });

// ❌ 不好：丢失类型信息
const news = await getNewsList({ limit: 10 });
```

### 4. 合理使用分页

```typescript
// 初始加载
const firstPage = await getNewsList({ limit: 10 });

// 加载更多
if (firstPage.hasMore) {
  const secondPage = await getNewsList({
    cursor: firstPage.nextCursor,
    limit: 10,
  });
}
```

---

## 🔄 从旧版 API 迁移

### 旧版 (lib/api.ts)

```typescript
import { apiClient } from "@/lib/api";

const news = await apiClient.getNewsList({
  date: "2025-10-28",
  cursor: "xxx",
  limit: 10,
  category: "tech",
});
```

### 新版 (lib/api/apiFunc-v2.ts)

```typescript
import { getNewsList } from "@/lib/api/apiFunc-v2";

const news = await getNewsList({
  date: "2025-10-28",
  cursor: "xxx",
  limit: 10,
  category: "tech",
});
```

**主要区别：**

- ✅ 更简洁的导入（直接导入函数）
- ✅ 更好的错误处理（ApiError 类）
- ✅ 超时控制（自动处理）
- ✅ 请求日志（开发环境自动记录）

---

## 📞 支持

如有问题，请查看源码注释或联系开发团队。
