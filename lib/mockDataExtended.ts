import { NewsItem, CategoryInfo } from "@/types";
import { NewsCardItem, NewsDetail } from "@/types/apiTypes";
import dayjs from "dayjs";

// 分类信息
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

// 基础 Mock 新闻数据（静态数据）
export const mockNews: NewsItem[] = [
  {
    id: "news-001",
    title: "人工智能技术突破：新型算法提升效率30%",
    summary:
      "最新研究显示，新型AI算法在处理复杂任务时效率提升显著，为多个行业带来革命性变化。",
    content:
      "在今天的技术发布会上，研究团队展示了这一突破性的AI算法。该算法采用了全新的神经网络架构，能够更高效地处理复杂的数据模式。测试结果表明，在图像识别、自然语言处理和数据分析等领域，新算法的处理效率比传统方法提升了30%以上。这一突破将为自动驾驶、医疗诊断、金融分析等多个行业带来重大影响。",
    category: "technology",
    source: "科技日报",
    publishedAt: "2025-09-02T10:15:00Z",
    imageUrl: "https://picsum.photos/400/250?random=1",
    url: "/news/news-001",
    tags: ["人工智能", "算法", "技术创新"],
    readTime: 3,
  },
  {
    id: "news-002",
    title: "全球经济复苏：主要经济体增长超预期",
    summary:
      "最新经济数据显示，全球主要经济体复苏势头强劲，增长数据超出市场预期。",
    content:
      "根据国际货币基金组织最新发布的数据，全球经济正在以超预期的速度复苏。美国、欧盟、中国等主要经济体的GDP增长率均超过了年初的预测。专家分析认为，这得益于各国政府的积极财政政策和货币政策支持，以及国际贸易的逐步恢复。消费者信心指数也创下了近年来的新高。",
    category: "economy",
    source: "经济观察报",
    publishedAt: "2025-09-01T10:15:00Z",
    imageUrl: "https://picsum.photos/400/250?random=2",
    url: "/news/news-002",
    tags: ["经济复苏", "全球增长", "市场预期"],
    readTime: 4,
  },
  {
    id: "news-003",
    title: "新能源政策出台：推动绿色转型发展",
    summary:
      "国家发布新能源发展政策，明确未来五年发展目标，推动能源结构绿色转型。",
    content:
      "国家发改委今日发布了《新能源发展十四五规划》，明确了未来五年新能源发展的总体目标和重点任务。规划提出，到2025年，新能源装机容量将达到10亿千瓦以上，占全社会用电量的比重超过30%。政策还提出了一系列支持措施，包括财政补贴、税收优惠、土地政策等，为新能源产业发展提供全方位支持。",
    category: "politics",
    source: "人民日报",
    publishedAt: "2025-09-01T10:12:00Z",
    imageUrl: "https://picsum.photos/400/250?random=3",
    url: "/news/news-003",
    tags: ["新能源", "政策", "绿色转型"],
    readTime: 5,
  },
  {
    id: "news-004",
    title: "世界杯预选赛精彩回顾：强队表现出色",
    summary:
      "世界杯预选赛多场比赛精彩纷呈，多支强队展现出色表现，晋级形势明朗。",
    content:
      "在刚刚结束的世界杯预选赛中，各支球队展现出了精彩的竞技水平。巴西队以4:1大胜对手，继续领跑南美区积分榜。欧洲区的比赛同样激烈，法国队凭借姆巴佩的帽子戏法3:2险胜，而德国队则在客场1:1战平强敌。亚洲区方面，日本队和韩国队都取得了关键胜利，为晋级世界杯奠定了良好基础。",
    category: "sports",
    source: "体育周报",
    publishedAt: "2025-09-01T09:12:00Z",
    imageUrl: "https://picsum.photos/400/250?random=4",
    url: "/news/news-004",
    tags: ["世界杯", "预选赛", "足球"],
    readTime: 3,
  },
  {
    id: "news-005",
    title: "健康科普：冬季养生指南发布",
    summary: "专家发布冬季养生指南，从饮食、运动、作息等方面提供专业建议。",
    content:
      "随着冬季的到来，如何科学养生成为人们关注的焦点。中医专家建议，冬季养生应注重藏精，即收藏阳气、保存体力。在饮食方面，应多食用温性食物，如羊肉、牛肉、生姜等；在运动方面，应选择适度的室内运动，避免大汗淋漓；在作息方面，应早睡晚起，保证充足的睡眠时间。专家还提醒，冬季要注意保暖，特别是头部、颈部和脚部的保暖。",
    category: "health",
    source: "健康时报",
    publishedAt: "2025-09-01T08:12:00Z",
    imageUrl: "https://picsum.photos/400/250?random=5",
    url: "/news/news-005",
    tags: ["冬季养生", "健康指南", "专家建议"],
    readTime: 4,
  },
  {
    id: "news-006",
    title: "科学发现：新物种在亚马逊雨林被发现",
    summary:
      "科研团队在亚马逊雨林发现多个新物种，为生物多样性研究提供重要资料。",
    content:
      "国际科研团队在亚马逊雨林深处发现了15个新物种，包括3种鸟类、5种昆虫、4种植物和3种两栖动物。这一发现为生物多样性研究提供了宝贵的资料。研究人员表示，这些新物种的发现证明了亚马逊雨林生态系统的复杂性和重要性。其中一种新发现的鸟类具有独特的鸣叫声，另一种植物则具有潜在的药用价值。这一发现再次提醒人们保护雨林生态系统的重要性。",
    category: "science",
    source: "科学美国人",
    publishedAt: "2025-09-01T07:12:00Z",
    imageUrl: "https://picsum.photos/400/250?random=6",
    url: "/news/news-006",
    tags: ["新物种", "亚马逊雨林", "生物多样性"],
    readTime: 3,
  },
  {
    id: "news-007",
    title: "春节档电影票房创新高：国产电影表现亮眼",
    summary: "今年春节档电影票房再创新高，多部国产电影表现出色，观众反响热烈。",
    content:
      "今年春节档电影市场异常火爆，总票房突破70亿元大关，再次刷新历史纪录。其中，《流浪地球3》以超过25亿的票房成绩领跑，《熊出没·重返地球》和《深海》等动画电影也表现不俗。观众对国产电影的制作水平给予了高度评价，认为无论是特效技术还是故事情节都有了显著提升。业内专家认为，这表明中国电影产业正在走向成熟。",
    category: "entertainment",
    source: "娱乐周刊",
    publishedAt: "2025-08-22T06:12:00Z",
    imageUrl: "https://picsum.photos/400/250?random=7",
    url: "/news/news-007",
    tags: ["春节档", "电影票房", "国产电影"],
    readTime: 3,
  },
  {
    id: "news-008",
    title: "国际峰会：多国领导人讨论全球气候议题",
    summary: "多国领导人在峰会上就气候变化、经济合作等全球性议题进行深入讨论。",
    content:
      "在刚刚结束的国际气候峰会上，来自50多个国家的领导人就应对气候变化达成了重要共识。峰会通过了《全球气候行动宣言》，承诺在2030年前将全球温室气体排放量减少50%。各国还就清洁能源技术合作、气候资金支持、绿色发展等议题进行了深入讨论。中国代表在会上分享了碳达峰碳中和的实践经验，受到各国代表的广泛关注。",
    category: "world",
    source: "国际新闻",
    publishedAt: "2025-08-22T04:12:00Z",
    imageUrl: "https://picsum.photos/400/250?random=8",
    url: "/news/news-008",
    tags: ["国际峰会", "气候变化", "全球合作"],
    readTime: 5,
  },
  {
    id: "news-009",
    title: "人工智能将重塑未来十年的就业市场",
    summary:
      "专家预测，AI将在未来十年内取代部分重复性工作，同时创造更多高技能岗位，政府需提前规划职业转型路径。",
    content:
      "随着生成式人工智能的迅猛发展，越来越多企业开始部署AI助手与自动化系统。麦肯锡最新报告指出，到2035年，全球约有30%的岗位将被AI影响，但同时会催生超过5000万个新职业。教育体系和职业培训必须快速响应这一变革。",
    category: "technology",
    source: "科技前沿网",
    publishedAt: "2025-08-20T03:12:00Z",
    imageUrl: "https://picsum.photos/seed/tech1/800/400",
    imageUrlContent: [
      "https://picsum.photos/seed/tech1a/600/400",
      "https://picsum.photos/seed/tech1b/600/400",
    ],
    url: "/news/news-001",
    tags: ["人工智能", "就业", "科技趋势", "自动化"],
    readTime: 5,
  },
  {
    id: "news-010",
    title: "国家发布新医保政策，覆盖罕见病治疗费用",
    summary:
      "新政策将30种罕见病纳入医保报销范围，患者年均负担可降低80%，预计惠及超百万家庭。",
    content:
      "国家医保局今日宣布，自2025年7月1日起，新增30种罕见病药品进入医保目录，涵盖戈谢病、庞贝病、脊髓性肌萎缩症等。专家表示，此举将极大缓解“因病致贫”问题，是医疗公平的重要里程碑。",
    category: "health",
    source: "健康时报",
    publishedAt: "2025-08-19T10:15:00Z",
    imageUrl: "https://picsum.photos/seed/health1/800/400",
    imageUrlContent: ["https://picsum.photos/seed/health1a/600/400"],
    url: "/news/news-002",
    tags: ["医保", "罕见病", "医疗政策", "民生"],
    readTime: 4,
  },
  {
    id: "news-011",
    title: "中国男足晋级亚洲杯八强，点球大战险胜韩国",
    summary:
      "在昨晚的焦点战中，中国队通过点球5-4战胜韩国队，时隔12年再次进入亚洲杯八强，球迷沸腾！",
    content:
      "比赛在卡塔尔多哈举行，常规时间1-1战平，加时无进球。点球大战中，门将王大雷扑出两球，成为最大功臣。主帅表示：“这是团队意志的胜利，我们会继续向前！”下一轮将对阵日本队。",
    category: "sports",
    source: "体坛周报",
    publishedAt: "2025-08-18T22:45:00Z",
    imageUrl: "https://picsum.photos/seed/sports1/800/400",
    imageUrlContent: [
      "https://picsum.photos/seed/sports1a/600/400",
      "https://picsum.photos/seed/sports1b/600/400",
      "https://picsum.photos/seed/sports1c/600/400",
    ],
    url: "/news/news-003",
    tags: ["国足", "亚洲杯", "点球大战", "中韩大战"],
    readTime: 3,
  },
  {
    id: "news-012",
    title: "央行宣布降准0.5个百分点，释放长期资金约1.2万亿",
    summary:
      "为支持实体经济，央行决定下调存款准备金率，市场流动性将显著改善，利好股市与中小企业。",
    content:
      "中国人民银行今日宣布，自2025年4月10日起，下调金融机构存款准备金率0.5个百分点。这是年内首次降准，预计将向市场释放长期资金约1.2万亿元，重点支持科技创新、绿色经济和小微企业融资。",
    category: "politics",
    source: "财经观察",
    publishedAt: "2025-08-17T09:00:00Z",
    imageUrl: "https://picsum.photos/seed/money1/800/400",
    url: "/news/news-004",
    tags: ["央行", "降准", "货币政策", "经济"],
    readTime: 4,
  },
  {
    id: "news-013",
    title: "《星际远征2》首映票房破5亿，创国产科幻新纪录",
    summary:
      "由张艺谋执导的科幻巨制《星际远征2》上映首日票房达5.2亿，豆瓣开分8.7，被赞“中国科幻新标杆”。",
    content:
      "影片讲述人类在2180年建立火星殖民地后遭遇外星文明接触的故事。视觉效果由国内顶级团队打造，耗时4年，投资超8亿。影评人称：“这不仅是一部电影，更是中国重工业电影的里程碑。”",
    category: "entertainment",
    source: "娱乐周刊",
    publishedAt: "2025-08-16T18:20:00Z",
    imageUrl: "https://picsum.photos/seed/movie1/800/400",
    imageUrlContent: [
      "https://picsum.photos/seed/movie1a/600/400",
      "https://picsum.photos/seed/movie1b/600/400",
    ],
    url: "/news/news-005",
    tags: ["电影", "科幻", "张艺谋", "票房"],
    readTime: 3,
  },
  {
    id: "news-014",
    title: "SpaceX 成功发射第200颗星链卫星，全球覆盖率达90%",
    summary:
      "本次发射从佛罗里达升空，标志着星链服务即将覆盖全球绝大多数有人区，网速可达300Mbps。",
    content:
      "北京时间2025年4月2日凌晨，猎鹰9号火箭搭载60颗星链卫星成功升空。马斯克在推特发文：“互联网不应是奢侈品，而应是基本人权。”目前星链用户已超500万，资费降至每月50美元。",
    category: "technology",
    source: "星际科技",
    publishedAt: "2025-08-15T14:10:00Z",
    imageUrl: "https://picsum.photos/seed/spacex1/800/400",
    url: "/news/news-006",
    tags: ["SpaceX", "星链", "卫星", "马斯克"],
    readTime: 4,
  },
  {
    id: "news-015",
    title: "研究发现：每天步行8000步可降低40%心血管疾病风险",
    summary:
      "哈佛大学最新研究指出，无需剧烈运动，每日坚持8000步即可显著改善心脏健康，尤其对中老年人群效果明显。",
    content:
      "该研究追踪了超2万名40-75岁人群长达10年，发现每日步数达8000者，心血管疾病发病率降低40%，全因死亡率降低30%。研究者强调：“关键在于坚持，而非速度或强度。”",
    category: "health",
    source: "健康科学",
    publishedAt: "2025-08-14T11:30:00Z",
    imageUrl: "https://picsum.photos/seed/health2/800/400",
    url: "/news/news-007",
    tags: ["健康", "步行", "心血管", "研究"],
    readTime: 3,
  },
  {
    id: "news-016",
    title: "苹果发布全新AR眼镜Apple Vision 2，售价2999美元",
    summary:
      "新款AR眼镜更轻薄、续航更长，支持空间计算与手势操控，被称作“下一代个人计算平台”。",
    content:
      "Apple Vision 2 重量仅89克，配备M3芯片与Micro-OLED屏幕，支持全天候佩戴。库克称：“这不仅是设备，更是通往数字世界的窗口。”预售开启1小时订单破百万。",
    category: "technology",
    source: "数码前线",
    publishedAt: "2025-08-13T20:00:00Z",
    imageUrl: "https://picsum.photos/seed/apple1/800/400",
    imageUrlContent: [
      "https://picsum.photos/seed/apple1a/600/400",
      "https://picsum.photos/seed/apple1b/600/400",
    ],
    url: "/news/news-008",
    tags: ["苹果", "AR", "Apple Vision", "新品"],
    readTime: 4,
  },
  {
    id: "news-017",
    title: "文旅部推出“春日限定”全国旅游路线，覆盖100+小众景点",
    summary:
      "避开人潮，探索秘境！官方推荐10条精品路线，涵盖古镇、山野、滨海等多元体验，助力乡村振兴。",
    content:
      "本次路线包括“浙南古道徒步线”“滇西北秘境自驾线”“胶东海滨骑行线”等，所有路线均配备电子导览与无障碍设施。文旅部表示，目标是让游客“慢下来，深体验”。",
    category: "politics", // 或可设为 'travel'，若你有该分类
    source: "文旅中国",
    publishedAt: "2025-08-12T16:45:00Z",
    imageUrl: "https://picsum.photos/seed/travel1/800/400",
    url: "/news/news-009",
    tags: ["旅游", "春日", "小众景点", "乡村振兴"],
    readTime: 3,
  },
  {
    id: "news-018",
    title: "周杰伦官宣“时空之旅”世界巡演，首站上海开票秒空",
    summary:
      "暌违4年，周董携全新舞美与经典曲目回归，巡演覆盖亚洲、北美、欧洲共30城，歌迷泪目：“青春回来了！”",
    content:
      "演唱会将采用全息投影与沉浸式舞台，重新编曲《七里香》《青花瓷》等金曲。上海站5月20日开票，30秒售罄。黄牛价已炒至原价5倍，官方呼吁理性消费。",
    category: "entertainment",
    source: "音乐之声",
    publishedAt: "2025-08-11T19:10:00Z",
    imageUrl: "https://picsum.photos/seed/music1/800/400",
    imageUrlContent: ["https://picsum.photos/seed/music1a/600/400"],
    url: "/news/news-010",
    tags: ["周杰伦", "演唱会", "巡演", "华语乐坛"],
    readTime: 3,
  },
];

// 转换为 NewsCardItem 格式（用于首页卡片展示）
export const mockNewsCards: NewsCardItem[] = mockNews.map((news, index) => ({
  id: news.id,
  title: news.title,
  summary: news.summary,
  imageUrl: news.imageUrl,
  publishedAt: news.publishedAt,
  category: news.category,
  cursor: `${dayjs(news.publishedAt).unix()}_${news.id}`,
  pageInfo: {
    nextCursor:
      index < mockNews.length - 1
        ? `${dayjs(mockNews[index + 1].publishedAt).unix()}_${
            mockNews[index + 1].id
          }`
        : "",
    prevCursor:
      index > 0
        ? `${dayjs(mockNews[index - 1].publishedAt).unix()}_${
            mockNews[index - 1].id
          }`
        : "",
  },
}));

// 转换为 NewsDetail 格式（用于详情页展示）
export const mockNewsDetails: NewsDetail[] = mockNews.map((news, index) => ({
  id: news.id,
  title: news.title,
  summary: news.summary,
  content: news.content,
  imageUrl: news.imageUrl,
  publishedAt: news.publishedAt,
  category: news.category,
  cursor: `${dayjs(news.publishedAt).unix()}_${news.id}`,
  pageInfo: {
    nextCursor:
      index < mockNews.length - 1
        ? `${dayjs(mockNews[index + 1].publishedAt).unix()}_${
            mockNews[index + 1].id
          }`
        : "",
    prevCursor:
      index > 0
        ? `${dayjs(mockNews[index - 1].publishedAt).unix()}_${
            mockNews[index - 1].id
          }`
        : "",
  },
  imageUrlContent: [
    `https://picsum.photos/600/400?random=${news.id}_1`,
    `https://picsum.photos/600/400?random=${news.id}_2`,
  ],
  source: news.source,
  tags: news.tags,
  readTime: news.readTime,
}));

// 模拟按日期分组的数据（保持兼容性）
export const mockNewsByDate: { [date: string]: NewsItem[] } = {
  [dayjs().format("YYYY-MM-DD")]: mockNews,
};

// 获取指定日期的新闻（兼容现有API）
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
  return Object.keys(mockNewsByDate).sort((a, b) => b.localeCompare(a));
};
