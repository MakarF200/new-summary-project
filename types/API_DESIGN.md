# API 设计文档

基于新的 `apiTypes.ts` 接口设计，采用游标分页机制实现高性能的无限滚动。

## 数据结构说明

### NewsCardItem

首页新闻卡片的精简数据结构，用于无限瀑布流 + 虚拟列表渲染。

### NewsDetail

新闻详情的完整数据结构，继承自 NewsCardItem 并扩展详细内容。

---

## API 接口

### 1. 获取首页新闻流

**用途**: 首页无限瀑布流加载，返回精简数据（NewsCardItem[]）

```
GET /api/news?date=2025-01-15&cursor=1736937045_news-001&limit=10&category=technology
```

**请求参数**:

- `date` (string, optional): 筛选指定日期新闻（YYYY-MM-DD 格式，默认当天）
- `cursor` (string, optional): 分页游标（上一次请求返回的最后一条 news.cursor）
- `limit` (number, optional, default=10): 单次获取数量
- `category` (NewsCategory, optional): 分类筛选

**返回示例**:

```json
{
  "data": [
    {
      "id": "news-001",
      "title": "人工智能技术突破：新型算法提升效率30%",
      "summary": "最新研究显示，新型AI算法在处理复杂任务时效率提升显著...",
      "imageUrl": "https://picsum.photos/400/250?random=1",
      "publishedAt": "2025-01-15T12:30:45Z",
      "category": "technology",
      "cursor": "1736937045_news-001",
      "pageInfo": {
        "nextCursor": "1736933445_news-002",
        "prevCursor": ""
      }
    }
  ],
  "nextCursor": "1736933445_news-002",
  "prevCursor": null,
  "hasMore": true
}
```

### 2. 获取新闻详情

**用途**: 用户点击新闻卡片时获取完整的新闻内容

```
GET /api/news/:id
```

**返回示例**:

```json
{
  "id": "news-001",
  "title": "人工智能技术突破：新型算法提升效率30%",
  "summary": "最新研究显示，新型AI算法在处理复杂任务时效率提升显著...",
  "content": "在今天的技术发布会上，研究团队展示了这一突破性的AI算法...",
  "imageUrl": "https://picsum.photos/400/250?random=1",
  "publishedAt": "2025-01-15T12:30:45Z",
  "category": "technology",
  "cursor": "1736937045_news-001",
  "pageInfo": {
    "nextCursor": "1736933445_news-002",
    "prevCursor": ""
  },
  "imageUrlContent": [
    "https://picsum.photos/600/400?random=news-001_1",
    "https://picsum.photos/600/400?random=news-001_2"
  ],
  "source": "科技日报",
  "tags": ["人工智能", "算法", "技术创新"],
  "readTime": 3
}
```

### 3. 搜索新闻

**用途**: 高级搜索页面，按关键词在标题/摘要/标签中搜索

```
GET /api/news/search?q=人工智能&limit=10&cursor=1736937045_news-001&category=technology&dateFrom=2025-01-01&dateTo=2025-01-15
```

**请求参数**:

- `q` (string, required): 搜索关键词
- `cursor` (string, optional): 分页游标
- `limit` (number, optional, default=10): 单次获取数量
- `category` (NewsCategory, optional): 分类筛选
- `dateFrom` (string, optional): 开始日期（YYYY-MM-DD 格式）
- `dateTo` (string, optional): 结束日期（YYYY-MM-DD 格式）

**返回结果**: 同 `GET /api/news`（即 NewsCardItem[] + 分页信息）

### 4. 获取分类列表

**用途**: 分类选择器、导航菜单

```
GET /api/categories
```

**返回示例**:

```json
[
  {
    "id": "technology",
    "name": "科技",
    "description": "科技新闻和创新动态",
    "color": "bg-purple-100 text-purple-800"
  },
  {
    "id": "economy",
    "name": "经济",
    "description": "经济新闻和金融市场",
    "color": "bg-blue-100 text-blue-800"
  }
]
```

---

## 游标分页机制

### 游标格式

```
cursor = timestamp_id
例如: "1736937045_news-001"
```

### 分页逻辑

1. 首次请求不传 cursor，返回最新数据
2. 后续请求传入上次返回的 `nextCursor`
3. 服务端根据 cursor 解析时间戳和 ID，返回更早的数据
4. `hasMore` 字段指示是否还有更多数据

### 优势

- 避免传统分页的重复/遗漏问题
- 支持实时数据插入
- 性能优于 offset 分页
- 适合无限滚动场景

---

## 错误处理

### 错误响应格式

```json
{
  "error": {
    "code": "INVALID_CURSOR",
    "message": "Invalid cursor format",
    "details": "Cursor should be in format: timestamp_id"
  }
}
```

### 常见错误码

- `INVALID_CURSOR`: 游标格式错误
- `NEWS_NOT_FOUND`: 新闻不存在
- `INVALID_CATEGORY`: 无效的分类
- `INVALID_DATE_RANGE`: 无效的日期范围
