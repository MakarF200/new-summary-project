"use client";

import { useState, Suspense } from "react";
import { Header } from "@/components/Header";
import { CategoryFilterBar } from "@/components/CategoryFilterBar";
import { DateHeader } from "@/components/DateHeader";
import { VirtualNewsList } from "@/components/VirtualNewsList";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useNewsStream } from "@/hooks/useNewsStream";

function HomePageContent() {
  const [searchQuery, setSearchQuery] = useState("");

  // 使用新的 news stream hook
  const {
    news,
    currentDate,
    selectedCategory,
    isLoading,
    hasMore,
    loadedDates,
    error,
    loadMore,
    setCategory,
    refresh,
    clearError,
  } = useNewsStream();

  // 搜索处理
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 过滤新闻（搜索 + 分类）
  const filteredNews = searchQuery
    ? news.filter(
        (newsItem) =>
          newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          newsItem.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          newsItem.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : news;

  // 计算统计信息
  const totalNewsEstimate = loadedDates.length * 15; // 每天预估15条新闻

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - 置顶 */}
      <Header onSearch={handleSearch} />

      {/* 日期吸附条 - 随滚动自动更新 */}
      <DateHeader
        currentDate={currentDate}
        loadedDates={loadedDates}
        currentNewsCount={filteredNews.length}
        totalNewsCount={totalNewsEstimate}
        isSticky={true}
        onDateClick={() => {
          // TODO: 实现日期选择器
          console.log("Open date picker for:", currentDate);
        }}
      />

      {/* 主内容区域 */}
      <div className="relative">
        {/* 错误状态 */}
        {error && (
          <div className="container mx-auto px-4 py-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={refresh}
                  className="text-red-600 hover:text-red-800 underline"
                >
                  重试
                </button>
                <button
                  onClick={clearError}
                  className="text-red-600 hover:text-red-800 underline"
                >
                  忽略
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 新闻流 */}
        {filteredNews.length > 0 ? (
          <VirtualNewsList
            news={filteredNews}
            onLoadMore={loadMore}
            isLoading={isLoading}
            hasMore={hasMore}
          />
        ) : (
          <div className="container mx-auto px-4 py-12">
            {isLoading ? (
              <LoadingSpinner message="正在加载新闻..." />
            ) : (
              <EmptyState
                date={currentDate}
                message={
                  searchQuery
                    ? `没有找到包含 "${searchQuery}" 的新闻`
                    : selectedCategory !== "all"
                    ? `${selectedCategory} 分类暂无新闻`
                    : "暂无新闻"
                }
              />
            )}
          </div>
        )}

        {/* 回到顶部按钮 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="回到顶部"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>

        {/* 开发调试信息 */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-6 left-6 z-40 p-3 bg-black/80 text-white text-xs rounded-lg max-w-xs">
            <div>当前日期: {currentDate}</div>
            <div>已加载: {news.length} 条新闻</div>
            <div>跨越: {loadedDates.length} 天</div>
            <div>分类: {selectedCategory}</div>
            <div>搜索: {searchQuery || "无"}</div>
            <div>加载中: {isLoading ? "是" : "否"}</div>
            <div>还有更多: {hasMore ? "是" : "否"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner message="正在初始化..." />}>
      <HomePageContent />
    </Suspense>
  );
}
