主页面开发总结（新闻流）

1. 布局设计

Header（置顶）

Logo

分类筛选按钮（置顶，随滚动不消失）

搜索框（随滚动吸附到 Header）

日期吸附条

固定在搜索框下方，随着用户滚动新闻流自动更新

点击可弹出日期选择器

新闻卡片流

无限瀑布流，时间越往下越早

卡片简化展示（标题、摘要、封面图、来源、时间、阅读时长）

2. 核心功能

无限滚动 + 预加载

使用 IntersectionObserver 监听滚动

触底时请求更多新闻

预加载：在用户接近底部时提前请求

虚拟列表

渲染可见区域的新闻卡片，减少 DOM 数量

解决长时间下滑性能问题

日期吸附效果

随滚动自动更新日期条

支持日期点击 → 打开日历 → 定位到某一天

SEO 兼容

滚动时更新 URL（?date=...&cursor=...），可分享与回溯

状态记忆

用户进入新闻详情后返回 → 记忆滚动位置和已加载数据

## 3. 数据加载调用关系

### 组件层级结构

```
app/page.tsx (主页面)
├── useNewsStream hook (数据管理)
│   ├── loadMore() 函数
│   ├── loadNewsForDate() 函数
│   └── getNewsByDate() 调用
├── VirtualNewsList 组件
│   ├── 接收 onLoadMore prop
│   ├── 滚动监听逻辑
│   └── 触发 onLoadMore() 回调
└── 其他组件 (Header, DateHeader)
```

### 数据流向

1. **用户滚动到底部**
2. **VirtualNewsList 检测到触底**
3. **调用 onLoadMore() 回调**
4. **执行 useNewsStream 的 loadMore() 函数**
5. **调用 loadNewsForDate() 获取下一天数据**
6. **通过 getNewsByDate() 从 mockData 获取数据**
7. **更新 news 状态，触发重新渲染**
8. **VirtualNewsList 显示新加载的内容**

### 关键文件位置

| 功能模块 | 文件路径                         | 说明                   |
| -------- | -------------------------------- | ---------------------- |
| 数据管理 | `hooks/useNewsStream.ts`         | 状态管理、数据加载逻辑 |
| 虚拟列表 | `components/VirtualNewsList.tsx` | 无限滚动、性能优化     |
| 模拟数据 | `lib/mockDataExtended.ts`        | 测试数据源             |
| 主页面   | `app/page.tsx`                   | 组件集成、页面布局     |

### 加载配置参数

| 参数名称     | 默认值   | 位置                     | 说明                   |
| ------------ | -------- | ------------------------ | ---------------------- |
| 每次加载数量 | 15 条    | `useNewsStream.ts:122`   | 控制单次请求的新闻数量 |
| 触发阈值     | 3 × 列数 | `VirtualNewsList.tsx:75` | 距底部多少条时开始加载 |
| 缓冲区大小   | 5        | `VirtualNewsList.tsx:16` | 渲染区域外的额外项目数 |
