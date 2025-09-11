import { NewsCategory } from "./index";

/**
 * 首页新闻卡片的精简数据结构
 * 用于：首页无限瀑布流 + 虚拟列表渲染
 */
export interface NewsCardItem {
  id: string; // 唯一标识符（cursor 主体部分）
  title: string; // 新闻标题
  summary: string; // 卡片的简短摘要（50-80字）
  imageUrl: string; // 封面图 URL
  publishedAt: string; // 发布时间（ISO 格式）
  category: NewsCategory; // 归属的分类（用于筛选和样式）
  cursor: string; // 游标（分页用，例如 timestamp+id）
  pageInfo: {
    nextCursor: string; // 下一页游标（更旧的新闻）
    prevCursor: string; // 上一页游标（更新的新闻）
  };
}

/**
 * 新闻详情的完整数据结构
 * 用于：新闻详情页（用户点击卡片时单独请求）
 * 继承 NewsCardItem 的所有字段，并扩展详情页需要的额外字段
 */
export interface NewsDetail extends NewsCardItem {
  content: string; // 新闻正文
  imageUrlContent?: string[]; // 正文中附带图片
  source: string; // 新闻来源
  tags: string[]; // 标签（可用于搜索、推荐）
  readTime: number; // 预计阅读时间（分钟）
}
