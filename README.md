# 新闻摘要项目

一个专业的新闻摘要服务网站，为用户提供最新、最准确的新闻要点，让用户在短时间内了解世界动态。

# 开发中§(_￣ ▽ ￣_)§，敬请期待

## 🚀 功能特性

- **新闻摘要展示**: 精选重要新闻，提供简洁明了的摘要
- **分类筛选**: 支持政治、经济、科技、体育、娱乐、健康、科学、国际等分类
- **智能搜索**: 支持标题、摘要、标签的全文搜索
- **响应式设计**: 完美适配桌面端和移动端
- **SEO 优化**: 完整的 SEO 配置，包括元数据、sitemap、robots.txt 等
- **性能优化**: 使用 Next.js 15 和 React 19，支持图片优化和代码分割

## 🛠️ 技术栈

- **前端框架**: Next.js 15 + React 19
- **样式**: Tailwind CSS 4
- **类型安全**: TypeScript
- **图标**: Lucide React
- **UI 组件**: Headless UI
- **工具库**: date-fns, clsx, tailwind-merge

## 📁 项目结构

```
new-summary-project/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── not-found.tsx      # 404页面
│   ├── sitemap.ts         # 网站地图
│   ├── robots.ts          # 爬虫规则
│   └── news/[id]/         # 新闻详情页
│       └── page.tsx
├── components/             # React组件
│   ├── Header.tsx         # 页面头部
│   ├── SearchBar.tsx      # 搜索栏
│   ├── CategoryFilter.tsx # 分类筛选
│   ├── NewsCard.tsx       # 新闻卡片
│   ├── NewsGrid.tsx       # 新闻网格
│   └── NewsDetail.tsx     # 新闻详情
├── lib/                    # 工具库
│   ├── utils.ts           # 通用工具函数
│   └── mockData.ts        # 模拟数据
├── types/                  # TypeScript类型定义
│   └── index.ts
└── public/                 # 静态资源
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 🔍 SEO 特性

- **元数据优化**: 完整的 title、description、keywords 配置
- **Open Graph**: 支持社交媒体分享
- **Twitter Cards**: 优化 Twitter 分享体验
- **结构化数据**: 新闻文章的结构化标记
- **网站地图**: 自动生成 sitemap.xml
- **爬虫规则**: 配置 robots.txt
- **语义化 HTML**: 使用正确的 HTML 标签结构
- **图片优化**: 自动图片优化和懒加载

## 📱 响应式设计

- 移动端优先的设计理念
- 支持触摸手势操作
- 自适应布局，完美适配各种屏幕尺寸
- 优化的移动端导航体验

## 🎨 设计特色

- 现代简洁的 UI 设计
- 清晰的信息层次结构
- 舒适的阅读体验
- 一致的设计语言
- 优雅的动画过渡效果

## 🔧 自定义配置

### 修改网站信息

在 `app/layout.tsx` 中修改 metadata 配置：

```typescript
export const metadata: Metadata = {
  title: {
    default: "你的网站标题",
    template: "%s | 你的网站名称",
  },
  description: "你的网站描述",
  // ... 其他配置
};
```

### 添加新的新闻分类

在 `types/index.ts` 中扩展 NewsCategory 类型，并在 `lib/mockData.ts` 中添加对应的分类信息。

### 修改样式主题

在 `tailwind.config.ts` 中自定义颜色、字体等样式配置。

## 📈 性能优化

- 图片自动优化和 WebP 格式支持
- 代码分割和懒加载
- 静态生成和增量静态再生
- 缓存策略优化
- 字体优化和预加载

## 🌐 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他平台

支持部署到任何支持 Node.js 的平台，如：

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

## 📄 许可证

MIT License

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- 邮箱: your-email@example.com
- 网站: https://your-domain.com
- GitHub: https://github.com/your-username/new-summary
