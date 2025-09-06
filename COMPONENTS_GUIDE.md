# 📚 组件和页面说明文档

## 概述

本文档详细介绍了新闻摘要项目中各个组件和页面的作用、功能和使用方式。

---

## 🏗️ 页面结构

### 1. 首页 (`app/page.tsx`)

**作用**: 项目的主页面，实现单页面流式新闻阅读体验

**主要功能**:

- 无限滚动加载新闻
- 按日期分页加载（当天 → 前一天 → 前二天...）
- 实时搜索新闻内容
- 日期吸附效果（当前浏览日期固定在顶部）
- 响应式布局（桌面/移动端适配）

**技术特点**:

- 使用 `react-intersection-observer` 实现无限滚动
- 使用 `zustand` 进行状态管理
- 支持搜索过滤（标题、摘要、标签）
- 预加载优化（提前 400px 触发加载）

---

## 🧩 核心组件

### 1. Header (`components/Header.tsx`)

**作用**: 网站顶部导航栏

**功能**:

- Logo 展示
- 导航菜单（首页、关于我们）
- 移动端响应式菜单
- 固定置顶效果

**使用场景**: 所有页面都会使用此组件

### 2. SearchBar (`components/SearchBar.tsx`)

**作用**: 新闻搜索输入框

**功能**:

- 搜索关键词输入
- 搜索按钮提交
- 占位符提示
- 搜索图标展示

**Props**:

```typescript
interface SearchBarProps {
  onSearch?: (query: string) => void; // 搜索回调函数
  placeholder?: string; // 占位符文本
}
```

### 3. DateHeader (`components/DateHeader.tsx`)

**作用**: 日期显示和吸附组件

**功能**:

- 显示当前浏览的日期
- 智能日期格式化（今天/昨天/前天/具体日期）
- 吸附在搜索框下方
- 点击事件支持（为日期选择器预留）

**Props**:

```typescript
interface DateHeaderProps {
  currentDate: string; // 当前日期 (YYYY-MM-DD)
  onDateClick?: () => void; // 点击回调
  isSticky?: boolean; // 是否吸附
}
```

### 4. NewsCard (`components/NewsCard.tsx`)

**作用**: 单条新闻卡片组件

**功能**:

- 新闻标题、摘要、来源展示
- 分类标签显示
- 阅读时间提示
- 发布时间显示
- 图片展示（可选）
- 点击跳转到详情页

**Props**:

```typescript
interface NewsCardProps {
  news: NewsItem; // 新闻数据对象
}
```

### 5. EmptyState (`components/EmptyState.tsx`)

**作用**: 空状态提示组件

**功能**:

- 无数据时的友好提示
- 图标展示
- 自定义提示信息
- 引导用户操作

**Props**:

```typescript
interface EmptyStateProps {
  date: string; // 当前日期
  message?: string; // 提示信息
}
```

### 6. LoadingSpinner (`components/LoadingSpinner.tsx`)

**作用**: 加载状态指示器

**功能**:

- 旋转加载动画
- 加载提示文字
- 多种尺寸支持
- 居中显示

**Props**:

```typescript
interface LoadingSpinnerProps {
  message?: string; // 加载提示文字
  size?: "sm" | "md" | "lg"; // 尺寸大小
}
```

---

## 📄 其他页面

### 1. 关于我们 (`app/about/page.tsx`)

**作用**: 网站介绍页面

**功能**:

- 公司/团队介绍
- 服务特色说明
- 联系方式展示
- 感谢用户支持

### 2. 新闻详情 (`app/news/[id]/page.tsx`)

**作用**: 单条新闻的详细内容页面

**功能**:

- 新闻完整内容展示
- SEO 优化（动态元数据）
- 相关新闻推荐
- 分享功能

### 3. 404 页面 (`app/not-found.tsx`)

**作用**: 页面未找到时的错误页面

**功能**:

- 友好的错误提示
- 返回首页按钮
- 搜索功能入口

---

## 🗂️ 工具和配置

### 1. API 客户端 (`lib/api.ts`)

**作用**: API 请求封装和工具函数

**功能**:

- HTTP 请求封装
- 错误处理
- 日期工具函数
- 类型定义

**主要方法**:

```typescript
// 获取新闻列表
apiClient.getNewsByDate(params);

// 搜索新闻
apiClient.searchNews(params);

// 获取分类
apiClient.getCategories();

// 日期工具
dateUtils.getToday();
dateUtils.getPreviousDay(date);
dateUtils.formatDateDisplay(date);
```

### 2. 状态管理 (`stores/newsStore.ts`)

**作用**: 全局新闻数据状态管理

**功能**:

- 多日期新闻数据管理
- 分页状态控制
- 加载状态管理
- 错误处理

**主要状态**:

```typescript
interface NewsState {
  newsByDate: NewsDataByDate; // 按日期存储的新闻数据
  currentDate: string; // 当前浏览日期
  selectedCategory: string; // 选中的分类
  isLoading: boolean; // 加载状态
  error: string | null; // 错误信息
}
```

### 3. Mock 数据 (`lib/mockDataExtended.ts`)

**作用**: 扩展的模拟数据，用于开发和测试

**功能**:

- 生成 7 天的新闻数据
- 每天 12-18 条新闻
- 8 个分类覆盖
- 支持分页查询
- 随机图片和内容

**主要方法**:

```typescript
// 获取指定日期的新闻
getNewsByDate(date, page, pageSize, category);

// 获取可用日期列表
getAvailableDates();

// 获取所有新闻数据
mockNewsByDate;
```

---

## 🔧 API 路由

### 1. 新闻接口

#### `GET /api/news/date`

**作用**: 按日期获取新闻列表

**参数**:

- `date`: 日期 (YYYY-MM-DD)
- `page`: 页码 (默认 1)
- `pageSize`: 每页数量 (默认 10)
- `category`: 分类筛选 (可选)

#### `GET /api/news/search`

**作用**: 搜索新闻

**参数**:

- `q`: 搜索关键词 (必填)
- `page`: 页码
- `pageSize`: 每页数量
- `category`: 分类筛选
- `dateFrom`: 开始日期
- `dateTo`: 结束日期

#### `GET /api/news/[id]`

**作用**: 获取单条新闻详情

**参数**:

- `id`: 新闻 ID

### 2. 分类接口

#### `GET /api/categories`

**作用**: 获取所有新闻分类

**返回**: 分类列表，包含 ID、名称、描述、颜色等

---

## 🎨 样式和布局

### 设计原则

- **响应式设计**: 支持桌面端和移动端
- **流式布局**: 类似今日头条的无限滚动体验
- **简洁美观**: 使用 Tailwind CSS 实现现代化 UI
- **用户体验**: 加载状态、错误处理、空状态等

### 主要布局

```
┌─────────────────────────────────────┐
│ Header（固定置顶）                   │
├─────────────────────────────────────┤
│ 搜索区域                            │
├─────────────────────────────────────┤
│ 日期吸附区域                        │
├─────────────────────────────────────┤
│ 新闻内容区域（无限滚动）              │
│ ┌─────┐ ┌─────┐ ┌─────┐             │
│ │新闻1│ │新闻2│ │新闻3│             │
│ └─────┘ └─────┘ └─────┘             │
└─────────────────────────────────────┘
```

---

## 🚀 使用指南

### 开发环境启动

```bash
npm install          # 安装依赖
npm run dev         # 启动开发服务器
```

### 环境配置

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 主要功能测试

1. **无限滚动**: 滚动到页面底部，自动加载更多新闻
2. **日期切换**: 当天数据加载完后自动切换到前一天
3. **搜索功能**: 在搜索框输入关键词，实时过滤新闻
4. **响应式**: 调整浏览器窗口大小，测试移动端适配

---

## 📝 开发注意事项

### 1. 性能优化

- 使用 `react-intersection-observer` 避免频繁的滚动事件监听
- 图片懒加载（通过 `imageUrl` 字段控制）
- 分页加载减少单次请求数据量

### 2. 错误处理

- API 请求失败时的友好提示
- 网络错误的重试机制
- 空数据状态的展示

### 3. SEO 优化

- 动态元数据生成
- 语义化 HTML 结构
- 合理的 URL 设计

### 4. 可扩展性

- 组件化设计，便于复用
- 状态管理集中化
- API 接口标准化

---

## 🔄 后续开发计划

### 第二阶段功能

- [ ] 日期选择器（跳转到任意日期）
- [ ] 分类筛选（tag/category 过滤）
- [ ] SEO 兼容（URL 同步 + 刷新恢复状态）

### 第三阶段功能

- [ ] 个性化推荐
- [ ] 用户收藏功能
- [ ] 分享功能
- [ ] 评论系统

---

_最后更新: 2024 年 1 月 15 日_
