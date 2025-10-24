"use client";
import { NewsCardItem } from "@/types/apiTypes";
import { useEffect, useState } from "react";

/**
 * Card 组件 - 新闻卡片组件
 * 功能：展示单条新闻的卡片，包含图片、标题和摘要
 * 特性：支持图片预加载检测、加载状态显示、错误处理
 */
export default function Card({ news }: { news: NewsCardItem }) {
  // ========== 状态管理 ==========
  // imageLoading: 图片加载中状态（默认为 true）
  const [imageLoading, setImageLoading] = useState(true);
  // imageError: 图片加载失败状态（默认为 false）
  const [imageError, setImageError] = useState(false);

  // 解构新闻数据
  const { title, summary, imageUrl, publishedAt, category, cursor } = news;

  // ========== 图片预加载逻辑 ==========
  // 作用：在实际渲染图片前，先用 Image 对象检测图片是否可用
  // 优势：可以提前判断图片是否已缓存，避免重复加载和布局跳动
  useEffect(() => {
    // 1. 边界检查：如果没有图片URL，直接标记为错误
    if (!imageUrl) {
      setImageLoading(false);
      setImageError(true);
      return;
    }

    // 2. 组件挂载标志：防止组件卸载后仍然更新状态（内存泄漏）
    let mounted = true;

    // 3. 创建图片对象用于预加载检测
    const img = new Image();

    // 4. 定义加载成功处理函数
    const handleLoad = () => {
      if (!mounted) return; // 组件已卸载，不再更新状态
      setImageLoading(false);
      setImageError(false);
    };

    // 5. 定义加载失败处理函数
    const handleError = () => {
      if (!mounted) return; // 组件已卸载，不再更新状态
      setImageLoading(false);
      setImageError(true);
    };

    // 6. 绑定事件处理器
    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = imageUrl; // 触发图片加载

    // 7. 处理已缓存的图片
    // 如果图片已在浏览器缓存中，img.complete 会立即为 true
    // 使用 setTimeout 确保状态更新在下一个事件循环中执行，保证一致性
    if (img.complete && mounted) {
      setTimeout(() => handleLoad(), 0);
    }

    // 8. 清理函数：组件卸载时执行
    return () => {
      mounted = false; // 标记组件已卸载
      // 移除事件监听器，防止内存泄漏
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]); // 依赖项：imageUrl 变化时重新执行

  // ========== 渲染逻辑 ==========
  return (
    <div className="rounded-lg bg-gray-200shadow-sm  w-full h-full flex flex-col">
      {/* 
        图片容器 
        - aspect-[16/9]: 固定16:9宽高比，防止加载前后尺寸变化
        - flex-shrink-0: 防止被 flex 布局压缩
        - overflow-hidden: 隐藏溢出的图片部分
      */}
      <div className="w-full aspect-[16/9] overflow-hidden rounded-md flex-shrink-0">
        {/* 加载状态：显示灰色脉冲动画骨架屏 */}
        {imageLoading && !imageError && (
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
        )}

        {/* 错误状态：显示红色脉冲动画提示 */}
        {imageError && !imageLoading && (
          <div className="w-full h-full bg-red-500 animate-pulse rounded-lg"></div>
        )}

        {/* 正常状态：显示实际图片 */}
        {imageUrl && !imageLoading && !imageError && (
          <img
            src={imageUrl}
            alt="card image"
            className="w-full h-full object-cover" // object-cover: 保持宽高比裁剪图片
          />
        )}
      </div>

      {/* 文本内容区域：标题和摘要 */}
      <div className="flex flex-col mb-8">
        <h2 className="text-center text-2xl font-bold">{title}</h2>
        <h4 className="text-center text-sm font-normal mt-2">{summary}</h4>
      </div>
    </div>
  );
}
