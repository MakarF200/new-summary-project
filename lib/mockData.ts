import { NewsItem, CategoryInfo } from "@/types";


// 首页分类列表
export const categories: CategoryInfo[] = [
  {
    id: "politics",
    name: "政治",
    description: "政治新闻和政策动态",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "economy",
    name: "经济",
    description: "经济新闻和金融市场",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "technology",
    name: "科技",
    description: "科技新闻和创新动态",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "sports",
    name: "体育",
    description: "体育赛事和运动动态",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "entertainment",
    name: "娱乐",
    description: "娱乐新闻和文化动态",
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: "health",
    name: "健康",
    description: "健康新闻和医疗动态",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "science",
    name: "科学",
    description: "科学发现和研究动态",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: "world",
    name: "国际",
    description: "国际新闻和全球动态",
    color: "bg-gray-100 text-gray-800",
  },
];

// 首页新闻列表
export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "人工智能技术突破：新型算法提升效率30%",
    summary:
      "最新研究显示，新型AI算法在处理复杂任务时效率提升显著，为多个行业带来革命性变化。",
    content: "详细内容...",
    category: "technology",
    source: "科技日报",
    publishedAt: "2024-01-15T10:00:00Z",
    imageUrl: "https://picsum.photos/400/250?random=1",
    url: "/news/1",
    tags: ["人工智能", "算法", "技术创新"],
    readTime: 3,
  },
  {
    id: "2",
    title: "全球经济复苏：主要经济体增长超预期",
    summary:
      "最新经济数据显示，全球主要经济体复苏势头强劲，增长数据超出市场预期。",
    content: "详细内容...",
    category: "economy",
    source: "经济观察报",
    publishedAt: "2024-01-15T09:30:00Z",
    imageUrl: "",
    url: "/news/2",
    tags: ["经济复苏", "全球增长", "市场预期"],
    readTime: 4,
  },
  {
    id: "3",
    title: "新能源政策出台：推动绿色转型发展",
    summary:
      "国家发布新能源发展政策，明确未来五年发展目标，推动能源结构绿色转型。",
    content: "详细内容...",
    category: "politics",
    source: "人民日报",
    publishedAt: "2024-01-15T08:00:00Z",
    imageUrl: "",
    url: "/news/3",
    tags: ["新能源", "政策", "绿色转型"],
    readTime: 5,
  },
  {
    id: "4",
    title: "体育赛事：世界杯预选赛精彩回顾",
    summary:
      "世界杯预选赛多场比赛精彩纷呈，多支强队展现出色表现，晋级形势明朗。",
    content: "详细内容...",
    category: "sports",
    source: "体育周报",
    publishedAt: "2024-01-15T07:00:00Z",
    imageUrl: "https://picsum.photos/400/250?random=4",
    url: "/news/4",
    tags: ["世界杯", "预选赛", "足球"],
    readTime: 3,
  },
  {
    id: "5",
    title: "健康科普：冬季养生指南发布",
    summary: "专家发布冬季养生指南，从饮食、运动、作息等方面提供专业建议。",
    content: "详细内容...",
    category: "health",
    source: "健康时报",
    publishedAt: "2024-01-15T06:00:00Z",
    imageUrl: "https://picsum.photos/400/250?random=5",
    url: "/news/5",
    tags: ["冬季养生", "健康指南", "专家建议"],
    readTime: 4,
  },
  {
    id: "6",
    title: "科学发现：新物种在亚马逊雨林被发现",
    summary:
      "科研团队在亚马逊雨林发现多个新物种，为生物多样性研究提供重要资料。",
    content: "详细内容...",
    category: "science",
    source: "科学美国人",
    publishedAt: "2024-01-15T05:00:00Z",
    imageUrl: "https://picsum.photos/400/250?random=6",
    url: "/news/6",
    tags: ["新物种", "亚马逊雨林", "生物多样性"],
    readTime: 3,
  },
];
