import { NewsItem, CategoryInfo } from "@/types";
import dayjs from "dayjs";

// 分类信息（与原来保持一致）
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

// 生成多天的 Mock 数据
const generateMockNews = (): { [date: string]: NewsItem[] } => {
  const newsTemplates = [
    // 科技类
    {
      title: "人工智能技术突破：新型算法提升效率30%",
      summary:
        "最新研究显示，新型AI算法在处理复杂任务时效率提升显著，为多个行业带来革命性变化。",
      category: "technology" as const,
      source: "科技日报",
      tags: ["人工智能", "算法", "技术创新"],
      readTime: 3,
    },
    {
      title: "量子计算机新突破：IBM发布1000量子比特处理器",
      summary:
        "IBM公司发布了最新的量子计算机处理器，量子比特数量达到1000个，标志着量子计算技术的重大进步。",
      category: "technology" as const,
      source: "科技前沿",
      tags: ["量子计算", "IBM", "处理器"],
      readTime: 4,
    },
    // 经济类
    {
      title: "全球经济复苏：主要经济体增长超预期",
      summary:
        "最新经济数据显示，全球主要经济体复苏势头强劲，增长数据超出市场预期。",
      category: "economy" as const,
      source: "经济观察报",
      tags: ["经济复苏", "全球增长", "市场预期"],
      readTime: 4,
    },
    {
      title: "央行降准释放流动性，助力实体经济发展",
      summary:
        "央行宣布降准0.5个百分点，释放长期资金约1万亿元，旨在支持实体经济发展。",
      category: "economy" as const,
      source: "财经日报",
      tags: ["央行", "降准", "流动性"],
      readTime: 3,
    },
    // 政治类
    {
      title: "新能源政策出台：推动绿色转型发展",
      summary:
        "国家发布新能源发展政策，明确未来五年发展目标，推动能源结构绿色转型。",
      category: "politics" as const,
      source: "人民日报",
      tags: ["新能源", "政策", "绿色转型"],
      readTime: 5,
    },
    {
      title: "国际合作新进展：多边贸易协定达成共识",
      summary: "多国就新的多边贸易协定达成初步共识，将进一步促进国际贸易合作。",
      category: "politics" as const,
      source: "外交部",
      tags: ["国际合作", "贸易协定", "多边"],
      readTime: 4,
    },
    // 体育类
    {
      title: "体育赛事：世界杯预选赛精彩回顾",
      summary:
        "世界杯预选赛多场比赛精彩纷呈，多支强队展现出色表现，晋级形势明朗。",
      category: "sports" as const,
      source: "体育周报",
      tags: ["世界杯", "预选赛", "足球"],
      readTime: 3,
    },
    {
      title: "奥运备战：中国代表团积极训练备战巴黎奥运",
      summary:
        "距离巴黎奥运会还有几个月时间，中国代表团各项目队伍正在积极备战训练。",
      category: "sports" as const,
      source: "奥运频道",
      tags: ["奥运会", "巴黎", "中国代表团"],
      readTime: 3,
    },
    // 健康类
    {
      title: "健康科普：冬季养生指南发布",
      summary: "专家发布冬季养生指南，从饮食、运动、作息等方面提供专业建议。",
      category: "health" as const,
      source: "健康时报",
      tags: ["冬季养生", "健康指南", "专家建议"],
      readTime: 4,
    },
    {
      title: "新冠疫苗加强针接种：专家建议及时接种",
      summary:
        "随着新冠病毒变异株的出现，专家建议符合条件的人群及时接种加强针。",
      category: "health" as const,
      source: "卫生部",
      tags: ["新冠疫苗", "加强针", "接种"],
      readTime: 3,
    },
    // 科学类
    {
      title: "科学发现：新物种在亚马逊雨林被发现",
      summary:
        "科研团队在亚马逊雨林发现多个新物种，为生物多样性研究提供重要资料。",
      category: "science" as const,
      source: "科学美国人",
      tags: ["新物种", "亚马逊雨林", "生物多样性"],
      readTime: 3,
    },
    {
      title: "火星探测新进展：毅力号发现古代水流证据",
      summary: "NASA的毅力号火星探测器在火星表面发现了古代水流活动的新证据。",
      category: "science" as const,
      source: "NASA",
      tags: ["火星探测", "毅力号", "水流证据"],
      readTime: 4,
    },
    // 娱乐类
    {
      title: "春节档电影票房创新高：国产电影表现亮眼",
      summary:
        "今年春节档电影票房再创新高，多部国产电影表现出色，观众反响热烈。",
      category: "entertainment" as const,
      source: "娱乐周刊",
      tags: ["春节档", "电影票房", "国产电影"],
      readTime: 3,
    },
    {
      title: "音乐节盛况：知名歌手云集，观众热情高涨",
      summary:
        "年度音乐节在多个城市举办，众多知名歌手参演，吸引了大量音乐爱好者。",
      category: "entertainment" as const,
      source: "音乐频道",
      tags: ["音乐节", "歌手", "演出"],
      readTime: 2,
    },
    // 国际类
    {
      title: "国际局势：多国领导人举行峰会讨论全球议题",
      summary:
        "多国领导人在峰会上就气候变化、经济合作等全球性议题进行深入讨论。",
      category: "world" as const,
      source: "国际新闻",
      tags: ["国际峰会", "全球议题", "领导人"],
      readTime: 5,
    },
    {
      title: "欧盟新政策：加强数字化转型和绿色发展",
      summary: "欧盟发布新的政策框架，旨在加速数字化转型和推进绿色可持续发展。",
      category: "world" as const,
      source: "欧盟官网",
      tags: ["欧盟", "数字化", "绿色发展"],
      readTime: 4,
    },
  ];

  const mockNewsByDate: { [date: string]: NewsItem[] } = {};

  // 生成最近7天的数据
  for (let i = 0; i < 7; i++) {
    const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
    const dateNews: NewsItem[] = [];

    // 每天随机生成12-18条新闻
    const newsCount = Math.floor(Math.random() * 7) + 12; // 12-18条

    for (let j = 0; j < newsCount; j++) {
      const template =
        newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
      const randomHour = Math.floor(Math.random() * 24);
      const randomMinute = Math.floor(Math.random() * 60);

      const newsItem: NewsItem = {
        id: `${date}-${j + 1}`,
        title: `${template.title}${j > 0 ? ` (${j + 1})` : ""}`,
        summary: template.summary,
        content: `详细内容...这是关于"${template.title}"的详细报道内容。`,
        category: template.category,
        source: template.source,
        publishedAt: dayjs(date)
          .hour(randomHour)
          .minute(randomMinute)
          .toISOString(),
        imageUrl:
          Math.random() > 0.3
            ? `https://picsum.photos/400/250?random=${Date.now()}-${j}`
            : "",
        url: `/news/${date}-${j + 1}`,
        tags: template.tags,
        readTime: template.readTime,
      };

      dateNews.push(newsItem);
    }

    // 按发布时间排序（最新的在前面）
    dateNews.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    mockNewsByDate[date] = dateNews;
  }

  return mockNewsByDate;
};

// 生成扩展的 Mock 数据
export const mockNewsByDate = generateMockNews();

// 获取指定日期的新闻（支持分页）
export const getNewsByDate = (
  date: string,
  page: number = 1,
  pageSize: number = 10,
  category?: string
) => {
  const dateNews = mockNewsByDate[date] || [];

  // 如果指定了分类，先过滤
  const filteredNews =
    category && category !== "all"
      ? dateNews.filter((news) => news.category === category)
      : dateNews;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  return {
    news: paginatedNews,
    total: filteredNews.length,
    page,
    pageSize,
    hasMore: endIndex < filteredNews.length,
    date,
  };
};

// 获取所有可用的日期列表
export const getAvailableDates = () => {
  return Object.keys(mockNewsByDate).sort((a, b) => b.localeCompare(a)); // 最新日期在前
};

// 兼容原有的 mockNews 导出（取今天的数据）
export const mockNews = mockNewsByDate[dayjs().format("YYYY-MM-DD")] || [];
