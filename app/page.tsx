"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { DateHeader } from "@/components/DateHeader";
import { NewsCard } from "@/components/NewsCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useNewsStore } from "@/stores/newsStore";
import { dateUtils, NewsItem, NewsResponse } from "@/lib/api";
import { getNewsByDate } from "@/lib/mockDataExtended";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 无限滚动监听
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "400px", // 提前 400px 触发加载
  });

  // 状态管理
  const { currentDate, isLoading, error, setCurrentDate, clearError } =
    useNewsStore();

  // 当前日期的新闻数据（使用 mock 数据）
  const [currentNews, setCurrentNews] = useState<NewsItem[]>([]);
  const [allDatesData, setAllDatesData] = useState<{
    [date: string]: NewsResponse;
  }>({});
  const [loadedDates, setLoadedDates] = useState<string[]>([]);

  // 加载当前日期的新闻
  const loadCurrentDateNews = (date: string, page: number = 1) => {
    const newsData = getNewsByDate(date, page, 10);

    if (page === 1) {
      setCurrentNews(newsData.news);
      setAllDatesData((prev) => ({
        ...prev,
        [date]: newsData,
      }));
      if (!loadedDates.includes(date)) {
        setLoadedDates((prev) => [...prev, date]);
      }
    } else {
      // 追加更多数据
      setCurrentNews((prev) => [...prev, ...newsData.news]);
      setAllDatesData((prev) => ({
        ...prev,
        [date]: {
          ...prev[date],
          news: [...(prev[date]?.news || []), ...newsData.news],
          hasMore: newsData.hasMore,
          page: page,
        },
      }));
    }

    return newsData;
  };

  // 加载下一天的数据
  const loadNextDay = () => {
    const lastLoadedDate = loadedDates[loadedDates.length - 1] || currentDate;
    const nextDate = dateUtils.getPreviousDay(lastLoadedDate);

    const newsData = loadCurrentDateNews(nextDate, 1);

    // 如果有数据，将其追加到当前新闻列表
    if (newsData.news.length > 0) {
      setCurrentNews((prev) => [...prev, ...newsData.news]);
    }
  };

  // 初始化加载今天的数据
  useEffect(() => {
    const today = dateUtils.getToday();
    setCurrentDate(today);
    loadCurrentDateNews(today);
  }, [setCurrentDate]); // 只依赖 setCurrentDate

  // 无限滚动触发
  useEffect(() => {
    if (inView && !isLoading) {
      const currentDateData = allDatesData[currentDate];

      if (currentDateData?.hasMore) {
        // 当前日期还有更多数据，加载下一页
        const nextPage = (currentDateData.page || 1) + 1;
        loadCurrentDateNews(currentDate, nextPage);
      } else {
        // 当前日期没有更多数据，加载下一天
        loadNextDay();
      }
    }
  }, [inView, isLoading]); // 移除 currentDate 和 allDatesData 避免循环依赖

  // 搜索处理
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: 实现搜索逻辑
  };

  // 过滤新闻（如果有搜索查询）
  const filteredNews = searchQuery
    ? currentNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : currentNews;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* 搜索区域 */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* 日期吸附区域 */}
      <DateHeader
        currentDate={currentDate}
        isSticky={true}
        onDateClick={() => {
          // TODO: 实现日期选择器
          console.log("Open date picker");
        }}
      />

      {/* 新闻内容区域 */}
      <div className="container mx-auto px-4 py-6">
        {/* 错误状态 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
            <button
              onClick={clearError}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              重试
            </button>
          </div>
        )}

        {/* 新闻网格 */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <EmptyState
              date={currentDate}
              message={searchQuery ? "未找到相关新闻" : "暂无新闻"}
            />
          )
        )}

        {/* 加载更多触发区域 */}
        <div ref={loadMoreRef} className="mt-8">
          {isLoading && <LoadingSpinner message="加载更多新闻..." />}
        </div>

        {/* 显示已加载数量 */}
        {filteredNews.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              已显示 {filteredNews.length} 条新闻
              {loadedDates.length > 1 && (
                <span> · 跨越 {loadedDates.length} 天</span>
              )}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
