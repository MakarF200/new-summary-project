"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Tag, Share2, Bookmark } from "lucide-react";
import { NewsItem } from "@/types";
import { formatDate, formatRelativeTime, getCategoryColor } from "@/lib/utils";

interface NewsDetailProps {
  news: NewsItem;
}

export function NewsDetail({ news }: NewsDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首页
        </Link>
      </div>

      {/* 新闻头部信息 */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
              news.category
            )}`}
          >
            {news.category === "politics" && "政治"}
            {news.category === "economy" && "经济"}
            {news.category === "technology" && "科技"}
            {news.category === "sports" && "体育"}
            {news.category === "entertainment" && "娱乐"}
            {news.category === "health" && "健康"}
            {news.category === "science" && "科学"}
            {news.category === "world" && "国际"}
          </span>
          <span className="text-gray-500 text-sm">•</span>
          <span className="text-gray-500 text-sm">{news.source}</span>
          <span className="text-gray-500 text-sm">•</span>
          <time dateTime={news.publishedAt} className="text-gray-500 text-sm">
            {formatDate(news.publishedAt)}
          </time>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {news.title}
        </h1>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {news.summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{news.readTime} 分钟阅读</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 新闻图片 */}
      {news.imageUrl && (
        <div className="mb-8">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
          </div>
        </div>
      )}

      {/* 新闻内容 */}
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed mb-6">{news.content}</p>

        {/* 这里可以添加更多内容段落 */}
        <p className="text-gray-700 leading-relaxed mb-6">
          新闻摘要服务致力于为用户提供准确、及时的新闻信息。我们通过专业的编辑团队，
          对重要新闻进行精炼和总结，让用户能够在短时间内了解事件的核心要点。
        </p>
      </div>

      {/* 标签 */}
      {news.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">相关标签</h3>
          <div className="flex flex-wrap gap-2">
            {news.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Tag className="w-4 h-4 mr-2" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 分享和导航 */}
      <footer className="border-t pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">分享到：</span>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              微信
            </button>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              微博
            </button>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              复制链接
            </button>
          </div>

          <div className="text-gray-500 text-sm">
            最后更新：{formatRelativeTime(news.publishedAt)}
          </div>
        </div>
      </footer>
    </article>
  );
}
