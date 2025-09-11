# useNewsStream Hook 文档

## 📖 概述

`useNewsStream` 是新闻流应用的核心数据管理 Hook，负责管理首页新闻流的所有状态和操作。它提供了完整的新闻数据管理解决方案，包括无限滚动、状态持久化、URL 同步和滚动位置记忆等功能。

## 🎯 主要功能

### 1. 状态管理

- **新闻列表管理**：维护当前加载的新闻数据
- **日期状态**：跟踪当前查看的日期和已加载的日期列表
- **分类筛选**：管理当前选中的新闻分类
- **加载状态**：控制加载指示器的显示
- **错误处理**：统一的错误状态管理

### 2. 无限滚动

- **时间倒序加载**：从今天开始，往前加载历史新闻
- **智能追加**：新数据追加到现有列表，避免重复
- **加载防护**：防止重复请求和无效操作

### 3. 数据持久化

- **本地存储**：将新闻数据和已加载日期保存到 localStorage
- **状态恢复**：页面刷新后自动恢复之前的数据
- **URL 同步**：支持分享链接和书签功能

### 4. 滚动位置记忆

- **位置保存**：页面切换前保存当前滚动位置
- **智能恢复**：5 分钟内返回页面时恢复滚动位置
- **状态清理**：避免过时的滚动状态影响用户体验

## 🔧 接口定义

### 输入参数

Hook 无需输入参数，会自动从 URL 参数和本地存储中初始化状态。

### 返回值

```typescript
interface UseNewsStreamReturn {
  // 状态数据
  news: NewsItem[]; // 当前加载的新闻列表
  currentDate: string; // 当前日期 (YYYY-MM-DD)
  selectedCategory: NewsCategory | "all"; // 选中的分类
  isLoading: boolean; // 是否正在加载
  hasMore: boolean; // 是否还有更多数据
  loadedDates: string[]; // 已加载的日期列表
  error: string | null; // 错误信息

  // 操作函数
  loadMore: () => void; // 加载更多数据
  setCategory: (category: NewsCategory | "all") => void; // 切换分类
  jumpToDate: (date: string) => void; // 跳转到指定日期
  refresh: () => void; // 刷新当前数据
  clearError: () => void; // 清除错误状态
}
```

## 🚀 使用示例

### 基本用法

```tsx
import { useNewsStream } from "@/hooks/useNewsStream";

function HomePage() {
  const {
    news,
    currentDate,
    selectedCategory,
    isLoading,
    hasMore,
    error,
    loadMore,
    setCategory,
    refresh,
    clearError,
  } = useNewsStream();

  return (
    <div>
      {/* 分类切换 */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setCategory}
      />

      {/* 新闻列表 */}
      <VirtualNewsList
        news={news}
        onLoadMore={loadMore}
        isLoading={isLoading}
        hasMore={hasMore}
      />

      {/* 错误处理 */}
      {error && <ErrorMessage message={error} onClear={clearError} />}
    </div>
  );
}
```

### 集成无限滚动

```tsx
// VirtualNewsList 组件中的使用
<VirtualNewsList
  news={filteredNews}
  onLoadMore={loadMore} // 触底时调用
  isLoading={isLoading} // 显示加载指示器
  hasMore={hasMore} // 控制是否继续加载
/>
```

## 📊 数据流向

### 初始加载流程

1. **Hook 初始化** → 从 URL 参数获取日期和分类
2. **状态恢复** → 从 localStorage 恢复已保存的新闻数据
3. **首次加载** → 如果没有数据，加载当前日期的新闻
4. **URL 同步** → 更新浏览器 URL 参数

### 无限滚动流程

1. **用户滚动** → VirtualNewsList 检测到触底
2. **触发加载** → 调用 `loadMore()` 函数
3. **计算日期** → 获取下一个需要加载的日期（前一天）
4. **数据获取** → 调用 `getNewsByDate()` 获取数据
5. **状态更新** → 追加新数据到现有列表
6. **持久化** → 保存到 localStorage

### 分类切换流程

1. **用户选择** → 调用 `setCategory()` 函数
2. **清除状态** → 清空滚动位置记忆
3. **重新加载** → 加载当前日期的新分类数据
4. **替换数据** → 用新数据替换现有列表

## ⚙️ 配置参数

### 可调整的参数

| 参数名称     | 位置       | 默认值              | 说明                     |
| ------------ | ---------- | ------------------- | ------------------------ |
| 每次加载数量 | `line 156` | 15 条               | 控制单次请求的新闻数量   |
| 网络延迟模拟 | `line 150` | 300ms               | 模拟真实网络请求延迟     |
| 滚动记忆时长 | `line 276` | 5 分钟              | 超过此时间不恢复滚动位置 |
| 存储键名     | `line 43`  | "news-stream-state" | localStorage 的键名      |

### 性能优化建议

1. **增加加载数量**：桌面端可以将 15 条增加到 30-45 条
2. **减少网络延迟**：生产环境可以去掉模拟延迟
3. **调整记忆时长**：根据用户习惯调整滚动位置记忆时间

## 🔍 调试指南

### 常见问题排查

#### 1. 加载数量不足

**问题**：桌面端滚动时加载的新闻太少
**解决**：修改 `line 156` 的加载数量从 15 增加到 30-45

#### 2. 滚动位置不恢复

**问题**：页面返回时没有恢复到之前的滚动位置
**排查**：

- 检查是否超过 5 分钟时限
- 确认 `scrollStateRef.current` 是否正确保存
- 验证页面加载事件是否正常触发

#### 3. URL 参数不同步

**问题**：分享链接无法正确显示对应的日期/分类
**排查**：

- 检查 `updateURL` 函数是否正常调用
- 确认 URL 参数格式是否正确
- 验证 Next.js 路由是否正常工作

### 开发调试技巧

```tsx
// 添加调试日志
useEffect(() => {
  console.log("当前状态:", {
    newsCount: state.news.length,
    currentDate: state.currentDate,
    selectedCategory: state.selectedCategory,
    loadedDates: state.loadedDates,
    isLoading: state.isLoading,
    hasMore: state.hasMore,
  });
}, [state]);
```

## 🏗️ 架构设计

### 设计原则

1. **单一职责**：专注于新闻流的数据管理
2. **状态集中**：所有相关状态统一管理
3. **副作用隔离**：网络请求、本地存储等副作用封装在 Hook 内部
4. **接口简洁**：提供简单易用的操作函数

### 扩展性考虑

- **数据源切换**：可以轻松从 mock 数据切换到真实 API
- **缓存策略**：可以添加更复杂的数据缓存逻辑
- **离线支持**：可以扩展为支持离线阅读功能
- **多端同步**：可以集成云端状态同步功能

## 📝 更新日志

### v1.0.0

- ✅ 基础功能实现
- ✅ 无限滚动支持
- ✅ URL 状态同步
- ✅ 本地存储持久化
- ✅ 滚动位置记忆
- ✅ 完整的 TypeScript 类型定义
- ✅ 详细的代码注释和文档
