/**
 * 新闻条目的完整数据结构
 * 用于：新闻卡片、详情页、列表展示、搜索结果等
 */
export interface NewsItem {
  id: string; // 唯一标识符，用于 React key 和路由参数
  title: string; // 新闻标题，显示在卡片和详情页
  summary: string; // 新闻摘要，显示在卡片和搜索结果中
  content: string; // 新闻正文内容，用于详情页展示
  category: NewsCategory; // 新闻分类，用于筛选和样式区分
  source: string; // 新闻来源，显示在卡片底部
  publishedAt: string; // 发布时间（ISO字符串），用于排序和时间显示
  imageUrl: string; // 主图片URL，显示在新闻卡片顶部
  imageUrlContent?: string[]; // 内容图片URLs（可选），用于详情页图片展示
  url: string; // 新闻详情页路径，用于链接跳转
  tags: string[]; // 新闻标签，用于搜索和展示相关标签
  readTime: number; // 阅读时间（分钟），显示在卡片右下角
}

/**
 * 新闻分类枚举
 * 用于：分类筛选、样式配色、导航菜单、搜索过滤等
 */
export type NewsCategory =
  | "politics" // 政治 - 政策动态、时政新闻
  | "economy" // 经济 - 金融市场、商业资讯
  | "technology" // 科技 - 技术创新、产品发布
  | "sports" // 体育 - 赛事报道、运动资讯
  | "entertainment" // 娱乐 - 影视娱乐、文化活动
  | "health" // 健康 - 医疗健康、养生科普
  | "science" // 科学 - 科研发现、学术成果
  | "world"; // 国际 - 国际新闻、全球动态

/**
 * 新闻分类详细信息
 * 用于：分类选择器、分类展示、颜色配置等
 */
export interface CategoryInfo {
  id: NewsCategory; // 分类ID，对应 NewsCategory 枚举值
  name: string; // 中文分类名称，显示在UI中
  description: string; // 分类描述，用于提示或SEO
  color: string; // Tailwind CSS 样式类，用于分类标签颜色
}

/**
 * 搜索和筛选条件
 * 用于：高级搜索页面、搜索API请求、筛选状态管理等
 */
export interface SearchFilters {
  query: string; // 搜索关键词，用于标题、摘要、标签匹配
  category: NewsCategory | "all"; // 分类筛选，"all"表示所有分类
  dateRange: "today" | "week" | "month" | "all"; // 时间范围筛选
  sortBy: "relevance" | "date" | "popularity"; // 排序方式：相关性、时间、热度
}

/**
 * API 响应数据结构（分页新闻数据）
 * 用于：API 响应处理、分页组件、无限滚动加载等
 */
export interface NewsResponse {
  news: NewsItem[]; // 当前页的新闻数据数组
  total: number; // 符合条件的新闻总数，用于分页计算
  page: number; // 当前页码，从1开始
  pageSize: number; // 每页数据量，用于分页逻辑
  hasMore: boolean; // 是否还有更多数据，用于无限滚动判断
}
