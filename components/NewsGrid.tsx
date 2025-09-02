"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { CategoryFilter } from "./CategoryFilter";
import { mockNews } from "@/lib/mockData";
import { NewsItem, NewsCategory } from "@/types";

interface NewsGridProps {
  searchQuery?: string;
}

export function NewsGrid({ searchQuery = "" }: NewsGridProps) {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(mockNews);
  const [selectedCategory, setSelectedCategory] = useState<
    NewsCategory | "all"
  >("all");

  useEffect(() => {
    let filtered = news;

    // 按分类筛选
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // 按搜索词筛选
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: NewsCategory | "all") => {
    setSelectedCategory(category);
  };

  if (filteredNews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          {searchQuery ? "没有找到相关新闻" : "暂无新闻"}
        </div>
        {(searchQuery || selectedCategory !== "all") && (
          <button
            onClick={() => {
              setSelectedCategory("all");
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            清除筛选条件
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      {filteredNews.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">共找到 {filteredNews.length} 条新闻</p>
        </div>
      )}
    </div>
  );
}
