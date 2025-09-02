"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Tag, ExternalLink } from "lucide-react";
import { NewsItem } from "@/types";
import {
  formatDate,
  formatRelativeTime,
  truncateText,
  getCategoryColor,
} from "@/lib/utils";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {news.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
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
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-4">{news.source}</span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <time dateTime={news.publishedAt}>
              {formatRelativeTime(news.publishedAt)}
            </time>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          <Link
            href={news.url}
            className="hover:text-blue-600 transition-colors"
          >
            {news.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateText(news.summary, 120)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{news.readTime} 分钟阅读</span>
          </div>

          <Link
            href={news.url}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            阅读全文
            <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {news.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {news.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
