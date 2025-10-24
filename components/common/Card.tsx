"use client";
import { NewsCardItem } from "@/types/apiTypes";
import { useEffect, useState } from "react";

export default function Card({ news }: { news: NewsCardItem }) {
  // 定义图片加载状态、解构传入的news数据
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { title, summary, imageUrl, publishedAt, category, cursor } = news;
  // 判断图片是否已经缓存，如果缓存了则设置图片加载状态为false
  useEffect(() => {
    if (!imageUrl) {
      setImageLoading(false);
      setImageError(true);
      return;
    }

    let mounted = true;
    const img = new Image();
    // load 和 error 事件处理函数
    const handleLoad = () => {
      if (!mounted) return;
      setImageLoading(false);
      setImageError(false);
    };
    const handleError = () => {
      if (!mounted) return;
      setImageLoading(false);
      setImageError(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = imageUrl;

    // 如果已缓存，img.complete 可能为 true（部分浏览器）
    if (img.complete && mounted) {
      // small timeout to ensure handlers run consistently across browsers
      setTimeout(() => handleLoad(), 0);
    }

    return () => {
      mounted = false;
      // 移除事件处理器，避免内存泄漏
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className="rounded-lg bg-gray-200shadow-sm  w-full h-full flex flex-col">
      {/* 图片容器：固定宽高比，防止压缩 */}
      <div className="w-full aspect-[16/9] overflow-hidden rounded-md flex-shrink-0">
        {imageLoading && !imageError && (
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
        )}
        {imageError && !imageLoading && (
          <div className="w-full h-full bg-red-500 animate-pulse rounded-lg"></div>
        )}
        {imageUrl && !imageLoading && !imageError && (
          <img
            src={imageUrl}
            alt="card image"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* 文本内容区域 */}
      <div className="flex flex-col mt-4">
        <h2 className="text-center text-2xl font-bold">{title}</h2>
        <h4 className="text-center text-sm font-normal mt-2">{summary}</h4>
      </div>
    </div>
  );
}
