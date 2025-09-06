****# 新闻摘要 API 文档

## 概述

本文档描述了新闻摘要系统的 RESTful API 接口。API 基于 Next.js App Router 构建，提供新闻数据的 CRUD 操作、搜索、分类等功能。

**基础 URL**: `https://antiquenews.xyz/api`

## 认证

目前 API 不需要认证，未来可扩展 JWT Token 认证。

## 数据模型

### NewsItem

```typescript
interface NewsItem {
  id: string; // 新闻唯一标识
  title: string; // 新闻标题
  summary: string; // 新闻摘要
  content: string; // 新闻正文
  category: NewsCategory; // 新闻分类
  source: string; // 新闻来源
  publishedAt: string; // 发布时间 (ISO 8601)
  imageUrl?: string; // 新闻图片URL
  url: string; // 原始新闻链接
  tags: string[]; // 标签数组
  readTime: number; // 预计阅读时间（分钟）
}
```

### NewsCategory

```typescript
type NewsCategory =
  | "politics" // 政治
  | "economy" // 经济
  | "technology" // 科技
  | "sports" // 体育
  | "entertainment" // 娱乐
  | "health" // 健康
  | "science" // 科学
  | "world"; // 国际
```

### NewsResponse

```typescript
interface NewsResponse {
  news: NewsItem[]; // 新闻列表
  total: number; // 总数量
  page: number; // 当前页码
  pageSize: number; // 每页数量
  hasMore: boolean; // 是否有更多数据
}
```

## API 接口

### 1. 获取新闻列表

**GET** `/api/news`

获取新闻列表，支持分页、分类筛选、搜索等功能。

#### 查询参数

| 参数      | 类型   | 必填 | 默认值 | 说明                                 |
| --------- | ------ | ---- | ------ | ------------------------------------ |
| page      | number | 否   | 1      | 页码                                 |
| pageSize  | number | 否   | 10     | 每页数量                             |
| category  | string | 否   | all    | 分类筛选                             |
| search    | string | 否   | -      | 搜索关键词                           |
| sortBy    | string | 否   | date   | 排序方式 (date/relevance/popularity) |
| dateRange | string | 否   | all    | 时间范围 (today/week/month/all)      |

#### 请求示例

```bash
GET /api/news?page=1&pageSize=10&category=technology&search=AI&sortBy=date
```

#### 响应示例

```json
{
  "news": [
    {
      "id": "1",
      "title": "人工智能技术突破：新型算法提升效率30%",
      "summary": "最新研究显示，新型AI算法在处理复杂任务时效率提升显著...",
      "content": "详细内容...",
      "category": "technology",
      "source": "科技日报",
      "publishedAt": "2024-01-15T10:00:00Z",
      "imageUrl": "https://picsum.photos/400/250?random=1",
      "url": "/news/1",
      "tags": ["人工智能", "算法", "技术创新"],
      "readTime": 3
    }
  ],
  "total": 25,
  "page": 1,
  "pageSize": 10,
  "hasMore": true
}
```

### 2. 获取单条新闻详情

**GET** `/api/news/{id}`

根据新闻 ID 获取详细信息。

#### 路径参数

| 参数 | 类型   | 必填 | 说明    |
| ---- | ------ | ---- | ------- |
| id   | string | 是   | 新闻 ID |

#### 请求示例

```bash
GET /api/news/1
```

#### 响应示例

```json
{
  "id": "1",
  "title": "人工智能技术突破：新型算法提升效率30%",
  "summary": "最新研究显示，新型AI算法在处理复杂任务时效率提升显著...",
  "content": "详细内容...",
  "category": "technology",
  "source": "科技日报",
  "publishedAt": "2024-01-15T10:00:00Z",
  "imageUrl": "https://picsum.photos/400/250?random=1",
  "url": "/news/1",
  "tags": ["人工智能", "算法", "技术创新"],
  "readTime": 3
}
```

#### 错误响应

```json
{
  "error": "News not found",
  "status": 404
}
```

### 3. 获取新闻分类

**GET** `/api/categories`

获取所有新闻分类信息。

#### 响应示例

```json
[
  {
    "id": "politics",
    "name": "政治",
    "description": "政治新闻和政策动态",
    "color": "bg-red-100 text-red-800"
  },
  {
    "id": "economy",
    "name": "经济",
    "description": "经济新闻和金融市场",
    "color": "bg-blue-100 text-blue-800"
  }
]
```

### 4. 搜索新闻

**GET** `/api/search`

专门用于搜索新闻的接口，支持高级搜索功能。

#### 查询参数

| 参数     | 类型   | 必填 | 默认值 | 说明                  |
| -------- | ------ | ---- | ------ | --------------------- |
| q        | string | 是   | -      | 搜索关键词            |
| category | string | 否   | all    | 分类筛选              |
| tags     | string | 否   | -      | 标签筛选（逗号分隔）  |
| source   | string | 否   | -      | 来源筛选              |
| dateFrom | string | 否   | -      | 开始日期 (YYYY-MM-DD) |
| dateTo   | string | 否   | -      | 结束日期 (YYYY-MM-DD) |
| page     | number | 否   | 1      | 页码                  |
| pageSize | number | 否   | 10     | 每页数量              |

#### 请求示例

```bash
GET /api/search?q=人工智能&category=technology&tags=AI,算法&page=1&pageSize=5
```

#### 响应示例

```json
{
  "news": [...],
  "total": 15,
  "page": 1,
  "pageSize": 5,
  "hasMore": true,
  "searchInfo": {
    "query": "人工智能",
    "category": "technology",
    "tags": ["AI", "算法"],
    "searchTime": 0.05
  }
}
```

### 5. 获取热门新闻

**GET** `/api/news/trending`

获取热门新闻列表，基于阅读量、分享数等指标。

#### 查询参数

| 参数     | 类型   | 必填 | 默认值 | 说明                      |
| -------- | ------ | ---- | ------ | ------------------------- |
| limit    | number | 否   | 10     | 返回数量                  |
| category | string | 否   | all    | 分类筛选                  |
| period   | string | 否   | day    | 时间周期 (day/week/month) |

#### 请求示例

```bash
GET /api/news/trending?limit=5&category=technology&period=week
```

### 6. 获取相关新闻

**GET** `/api/news/{id}/related`

根据新闻 ID 获取相关新闻推荐。

#### 路径参数

| 参数 | 类型   | 必填 | 说明    |
| ---- | ------ | ---- | ------- |
| id   | string | 是   | 新闻 ID |

#### 查询参数

| 参数  | 类型   | 必填 | 默认值 | 说明     |
| ----- | ------ | ---- | ------ | -------- |
| limit | number | 否   | 5      | 返回数量 |

#### 请求示例

```bash
GET /api/news/1/related?limit=3
```

## 管理接口（需要认证）

### 7. 创建新闻

**POST** `/api/admin/news`

创建新的新闻条目。

#### 请求体

```json
{
  "title": "新闻标题",
  "summary": "新闻摘要",
  "content": "新闻正文",
  "category": "technology",
  "source": "新闻来源",
  "imageUrl": "https://example.com/image.jpg",
  "url": "https://example.com/original-news",
  "tags": ["标签1", "标签2"],
  "readTime": 5
}
```

#### 响应示例

```json
{
  "id": "new-id",
  "title": "新闻标题",
  "summary": "新闻摘要",
  "content": "新闻正文",
  "category": "technology",
  "source": "新闻来源",
  "publishedAt": "2024-01-15T10:00:00Z",
  "imageUrl": "https://example.com/image.jpg",
  "url": "https://example.com/original-news",
  "tags": ["标签1", "标签2"],
  "readTime": 5
}
```

### 8. 更新新闻

**PUT** `/api/admin/news/{id}`

更新指定新闻的信息。

### 9. 删除新闻

**DELETE** `/api/admin/news/{id}`

删除指定的新闻。

## 错误处理

### 标准错误响应格式

```json
{
  "error": "错误描述",
  "status": 400,
  "message": "详细错误信息",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### 常见错误码

| 状态码 | 说明           |
| ------ | -------------- |
| 200    | 成功           |
| 400    | 请求参数错误   |
| 401    | 未授权         |
| 403    | 禁止访问       |
| 404    | 资源不存在     |
| 500    | 服务器内部错误 |

## 限流

- 普通接口：每分钟 100 次请求
- 搜索接口：每分钟 50 次请求
- 管理接口：每分钟 20 次请求

## 版本控制

当前 API 版本：v1

版本通过 URL 路径指定：`/api/v1/news`

## 示例代码

### JavaScript/TypeScript

```typescript
// 获取新闻列表
const fetchNews = async (params: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const response = await fetch(`/api/news?${queryParams}`);
  return response.json();
};

// 搜索新闻
const searchNews = async (query: string) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  return response.json();
};
```

### cURL 示例

```bash
# 获取科技类新闻
curl "https://antiquenews.xyz/api/news?category=technology&page=1&pageSize=5"

# 搜索新闻
curl "https://antiquenews.xyz/api/search?q=人工智能&category=technology"

# 获取新闻详情
curl "https://antiquenews.xyz/api/news/1"
```

## 更新日志

### v1.0.0 (2024-01-15)

- 初始版本发布
- 支持基本的新闻 CRUD 操作
- 支持搜索和分类筛选
- 支持分页功能

## 联系信息

如有问题或建议，请联系：

- 邮箱：api-support@antiquenews.xyz
- 文档更新：本文档会随着 API 更新而更新
