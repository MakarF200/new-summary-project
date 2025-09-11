"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { categories } from "@/lib/mockDataExtended";
import { mockNewsByDate } from "@/lib/mockDataExtended";
import { dateUtils, NewsItem } from "@/lib/api";
import { Calendar, Filter, Search } from "lucide-react";

export default function SearchPlusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 执行搜索
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    // 模拟搜索逻辑
    setTimeout(() => {
      let results: NewsItem[] = [];

      // 从所有日期的数据中搜索
      Object.values(mockNewsByDate).forEach((dayNews) => {
        results = [...results, ...dayNews];
      });

      // 按关键词过滤
      if (searchQuery.trim()) {
        results = results.filter(
          (news) =>
            news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            news.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }

      // 按分类过滤
      if (selectedCategory !== "all") {
        results = results.filter((news) => news.category === selectedCategory);
      }

      // 按日期范围过滤
      if (dateFrom) {
        results = results.filter(
          (news) => news.publishedAt >= new Date(dateFrom).toISOString()
        );
      }
      if (dateTo) {
        results = results.filter(
          (news) => news.publishedAt <= new Date(dateTo).toISOString()
        );
      }

      // 排序
      if (sortBy === "date") {
        results.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      } else if (sortBy === "relevance") {
        // 简单的相关性排序（标题匹配优先）
        results.sort((a, b) => {
          const aTitleMatch = a.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const bTitleMatch = b.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          if (aTitleMatch && !bTitleMatch) return -1;
          if (!aTitleMatch && bTitleMatch) return 1;
          return 0;
        });
      }

      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDateFrom("");
    setDateTo("");
    setSortBy("date");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">高级搜索</h1>
          <p className="text-gray-600">使用多种条件精确搜索新闻内容</p>
        </div>

        {/* 搜索表单 */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 搜索关键词 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                关键词
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="请输入搜索关键词..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                新闻分类
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="all">全部分类</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 排序方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                排序方式
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="date">按时间排序</option>
                <option value="relevance">按相关性排序</option>
              </select>
            </div>

            {/* 日期范围 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                开始日期
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                结束日期
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isLoading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "搜索中..." : "开始搜索"}
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              重置条件
            </button>
          </div>
        </div>

        {/* 搜索结果 */}
        {isLoading && <LoadingSpinner message="正在搜索..." />}

        {hasSearched && !isLoading && (
          <>
            {/* 搜索结果统计 */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                搜索结果{" "}
                {searchResults.length > 0 && `(${searchResults.length} 条)`}
              </h2>
              {searchQuery && (
                <p className="text-gray-600 mt-1">
                  关键词：
                  <span className="font-medium">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </p>
              )}
            </div>

            {/* 结果网格 */}
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            ) : (
              <EmptyState
                date={dateUtils.getToday()}
                message="未找到匹配的新闻"
              />
            )}
          </>
        )}

        {/* 未搜索时的提示 */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              开始您的搜索
            </h3>
            <p className="text-gray-600">
              输入关键词并设置搜索条件，然后点击&ldquo;开始搜索&rdquo;按钮
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
