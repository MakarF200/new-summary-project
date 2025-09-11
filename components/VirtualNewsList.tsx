"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { NewsCard } from "./NewsCard";
import { NewsItem } from "@/types";

interface VirtualNewsListProps {
  news: NewsItem[]; // 📊 所有新闻数据（可能很大）
  onLoadMore?: () => void; // 🔄 加载更多的回调函数
  isLoading?: boolean; // ⏳ 是否正在加载状态
  hasMore?: boolean; // 📈 是否还有更多数据可加载
}

// 🎛️ 虚拟列表配置 - 这些参数需要根据实际情况调整
const ITEM_HEIGHT = 400; // 📏 每个新闻卡片的预估高度（需要根据实际卡片高度调整）
const BUFFER_SIZE = 5; // 🔄 缓冲区大小（屏幕上下各渲染几个额外项目，增加可提升滚动流畅度）
const BASE_LOAD_THRESHOLD = 3; // 🚀 基础加载阈值（会根据网格列数动态调整）

export function VirtualNewsList({
  news,
  onLoadMore,
  isLoading = false,
  hasMore = true,
}: VirtualNewsListProps) {
  // 📍 核心状态管理
  const containerRef = useRef<HTMLDivElement>(null); // 滚动容器的引用
  const [containerHeight, setContainerHeight] = useState(0); // 📐 容器可视高度
  const [scrollTop, setScrollTop] = useState(0); // 📍 当前滚动位置

  // 📱 响应式网格计算 - 适配不同屏幕尺寸
  const getGridCols = () => {
    if (typeof window === "undefined") return 1; // 🔒 SSR 安全检查
    const width = window.innerWidth;
    if (width >= 1024) return 3; // 🖥️ 桌面端：3列（可调整：1-4列）
    if (width >= 768) return 2; // 📱 平板端：2列（可调整：1-3列）
    return 1; // 📱 手机端：1列（固定）
  };

  const [gridCols, setGridCols] = useState(getGridCols); // 🔢 当前网格列数

  // 🧮 虚拟化核心算法 - 计算当前应该渲染哪些项目
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE // 🔍 计算起始索引（加上缓冲区）
  );
  const endIndex = Math.min(
    news.length,
    Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + BUFFER_SIZE // 🔍 计算结束索引（加上缓冲区）
  );

  // 📄 只取出需要渲染的新闻项（这是性能优化的关键）
  const visibleNews = news.slice(startIndex, endIndex);

  // 📏 虚拟滚动条的总高度（模拟所有内容的高度）
  const totalHeight = news.length * ITEM_HEIGHT;

  // 📐 计算可见内容的偏移量（让滚动位置看起来正确）
  const offsetY = startIndex * ITEM_HEIGHT;

  // 📜 滚动事件处理器 - 虚拟列表的核心逻辑
  const handleScroll = useCallback(
    (e: Event) => {
      const target = e.target as HTMLDivElement;
      const newScrollTop = target.scrollTop;
      setScrollTop(newScrollTop); // 🔄 更新滚动位置，触发重新计算可见项目

      // 🚀 智能预加载 - 在用户接近底部时提前加载更多数据
      if (hasMore && !isLoading && onLoadMore) {
        const visibleEndIndex = Math.ceil(
          (newScrollTop + containerHeight) / ITEM_HEIGHT // 🧮 计算当前可见的最后一个项目索引
        );

        // 🎯 根据网格列数动态调整加载阈值
        // 桌面端(3列)需要更早触发，确保用户看到完整的行
        const dynamicThreshold = BASE_LOAD_THRESHOLD * gridCols;

        // ⚡ 当滚动接近底部时触发加载（避免用户等待）
        if (visibleEndIndex >= news.length - dynamicThreshold) {
          onLoadMore(); // 📞 调用父组件的加载更多函数
        }
      }
    },
    [containerHeight, hasMore, isLoading, news.length, onLoadMore, gridCols] // 🔗 依赖项：添加 gridCols
  );

  // 📐 监听容器大小变化 - 响应式设计的关键
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 🔍 使用 ResizeObserver 监听容器尺寸变化（比 window.resize 更精确）
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerHeight(entry.contentRect.height); // 🔄 更新容器高度，重新计算可见项目
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect(); // 🧹 清理观察者，避免内存泄漏
  }, []);

  // 📜 监听滚动事件 - 虚拟列表的生命线
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ⚡ 使用 passive: true 优化滚动性能（告诉浏览器不会调用 preventDefault）
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll); // 🧹 清理事件监听器
  }, [handleScroll]);

  // 📐 监听窗口大小变化，动态调整网格布局
  useEffect(() => {
    const handleResize = () => setGridCols(getGridCols());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // 🧹 清理监听器
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-auto"
      style={{ height: "calc(100vh - 200px)" }} // 🔧 需要调整：减去header和其他固定元素的高度
    >
      {/* 🎭 虚拟容器 - 创建滚动条，但不渲染所有内容 */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* 📦 可见项目容器 - 只渲染当前可见的项目 */}
        <div
          style={{
            transform: `translateY(${offsetY}px)`, // 🎯 关键：通过 transform 模拟滚动位置
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {/* 🏗️ 响应式网格布局 */}
          <div
            className={`grid gap-6 px-4 ${
              gridCols === 3
                ? "grid-cols-3" // 🖥️ 大屏幕
                : gridCols === 2
                ? "grid-cols-2" // 📱 中屏幕
                : "grid-cols-1" // 📱 小屏幕
            }`}
          >
            {/* 🃏 只渲染可见的新闻卡片 */}
            {visibleNews.map((newsItem) => (
              <div
                key={newsItem.id} // 🔑 重要：使用稳定的 key
                style={{ minHeight: ITEM_HEIGHT }} // 📏 保持高度一致性
                className="flex"
              >
                <NewsCard news={newsItem} />
              </div>
            ))}
          </div>
        </div>

        {/* ⏳ 加载指示器 - 显示在内容底部 */}
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: news.length * ITEM_HEIGHT, // 📍 定位在所有内容的底部
              left: 0,
              right: 0,
            }}
            className="flex justify-center py-8"
          >
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>加载更多新闻...</span> {/* 🔧 可自定义加载文案 */}
            </div>
          </div>
        )}

        {/* 🏁 结束提示 - 没有更多数据时显示 */}
        {!hasMore && news.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: news.length * ITEM_HEIGHT, // 📍 定位在所有内容的底部
              left: 0,
              right: 0,
            }}
            className="flex justify-center py-8"
          >
            <div className="text-gray-500 text-center">
              <p>已加载全部新闻</p> {/* 🔧 可自定义结束文案 */}
              <p className="text-sm mt-1">共 {news.length} 条</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
