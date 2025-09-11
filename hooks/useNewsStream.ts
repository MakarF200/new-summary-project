/**
 * useNewsStream Hook - 新闻流数据管理
 *
 * 功能概述：
 * - 管理新闻流的状态（新闻数据、日期、分类、加载状态等）
 * - 提供无限滚动的数据加载机制
 * - URL 状态同步（支持分享和刷新恢复）
 * - 本地存储状态持久化
 * - 滚动位置记忆功能
 *
 * 使用场景：新闻首页的核心数据管理 Hook
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NewsItem, NewsCategory } from "@/types";
import { getNewsByDate } from "@/lib/mockDataExtended";
import { dateUtils } from "@/lib/api";

// 📊 新闻流状态接口定义
interface NewsStreamState {
  news: NewsItem[]; // 当前加载的新闻列表
  currentDate: string; // 当前日期 (YYYY-MM-DD)
  selectedCategory: NewsCategory | "all"; // 选中的分类
  isLoading: boolean; // 是否正在加载
  hasMore: boolean; // 是否还有更多数据
  loadedDates: string[]; // 已加载的日期列表
  error: string | null; // 错误信息
}
// return 数据interface
// 🔄 Hook 返回值接口定义
interface UseNewsStreamReturn extends NewsStreamState {
  loadMore: () => void; // 加载更多数据
  setCategory: (category: NewsCategory | "all") => void; // 切换分类
  jumpToDate: (date: string) => void; // 跳转到指定日期
  refresh: () => void; // 刷新当前数据
  clearError: () => void; // 清除错误状态
}

// 💾 本地存储键名
const STORAGE_KEY = "news-stream-state";

// 📍 滚动状态接口 - 用于页面切换时保存/恢复滚动位置
interface ScrollState {
  position: number; // 滚动位置
  timestamp: number; // 保存时间戳
}

/**
 * 🌊 useNewsStream Hook 主函数
 *
 * 这是新闻流管理的核心 Hook，负责：
 * 1. 状态管理：新闻列表、日期、分类、加载状态
 * 2. URL 同步：支持分享链接和刷新恢复
 * 3. 数据持久化：localStorage 存储
 * 4. 滚动记忆：页面切换后恢复滚动位置
 */
export function useNewsStream(): UseNewsStreamReturn {
  const router = useRouter(); // Next.js 路由控制
  const searchParams = useSearchParams(); // URL 参数读取

  // 🏪 核心状态管理 - 使用 useState 管理新闻流的所有状态
  const [state, setState] = useState<NewsStreamState>({
    news: [], // 新闻列表，随着滚动逐渐追加
    currentDate: dateUtils.getToday(), // 当前查看的日期，默认今天
    selectedCategory: "all", // 分类筛选，默认全部
    isLoading: false, // 加载状态，防止重复请求
    hasMore: true, // 是否还有更多数据可加载
    loadedDates: [], // 已加载日期记录，用于无限滚动
    error: null, // 错误状态，显示给用户
  });

  // 📍 滚动位置引用 - 用于页面切换时保存/恢复滚动位置
  const scrollStateRef = useRef<ScrollState | null>(null);

  // 从浏览器地址获取参数
  // 🔗 URL 参数初始化 - 支持分享链接和刷新恢复
  useEffect(() => {
    const urlDate = searchParams.get("date") || dateUtils.getToday();
    const urlCategory = (searchParams.get("category") as NewsCategory) || "all";

    // 💾 恢复本地保存的状态（新闻数据和已加载日期）
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setState((prev) => ({
          ...prev,
          currentDate: urlDate, // URL 优先级更高
          selectedCategory: urlCategory, // URL 优先级更高
          ...parsed, // 恢复新闻数据和已加载日期
        }));
      } catch (error) {
        console.warn("Failed to parse saved state:", error);
      }
    } else {
      // 📋 首次访问，只设置基础状态
      setState((prev) => ({
        ...prev,
        currentDate: urlDate,
        selectedCategory: urlCategory,
      }));
    }
  }, [searchParams]);

  // 💾 状态持久化 - 保存新闻数据到 localStorage
  useEffect(() => {
    const stateToSave = {
      news: state.news, // 保存已加载的新闻列表
      loadedDates: state.loadedDates, // 保存已加载的日期记录
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [state.news, state.loadedDates]);

  // 🔄 URL 状态同步 - 保持 URL 与当前状态一致，支持分享和书签
  const updateURL = useCallback(
    (date: string, category: NewsCategory | "all") => {
      const params = new URLSearchParams();

      // 🗓️ 只有非今天日期才加入 URL 参数
      if (date !== dateUtils.getToday()) {
        params.set("date", date);
      }

      // 🏷️ 只有非"全部"分类才加入 URL 参数
      if (category !== "all") {
        params.set("category", category);
      }

      // 🌐 更新浏览器 URL，不触发页面滚动
      const newURL = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newURL, { scroll: false });
    },
    [router]
  );

  // 📥 核心数据加载函数 - 加载指定日期的新闻
  const loadNewsForDate = useCallback(
    async (
      date: string, // 目标日期 (YYYY-MM-DD)
      category: NewsCategory | "all" = "all", // 分类筛选
      append: boolean = false // 是否追加到现有数据
    ) => {
      // 🔄 设置加载状态，清除错误
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // ⏱️ 模拟网络延迟，提供更真实的用户体验
        await new Promise((resolve) => setTimeout(resolve, 300));

        // 📊 调用数据获取函数
        const newsData = getNewsByDate(
          date,
          1, // 页码（当前固定为1）
          15, // 🎯 每次加载15条新闻（可调整）
          category === "all" ? undefined : category
        );

        // 📋 更新状态 - 根据 append 参数决定是替换还是追加数据
        setState((prev) => ({
          ...prev,
          news: append
            ? [...prev.news, ...newsData.news] // 🔗 追加模式：用于无限滚动
            : newsData.news, // 🔄 替换模式：用于切换日期/分类
          currentDate: date,
          selectedCategory: category,
          loadedDates: append
            ? prev.loadedDates.includes(date)
              ? prev.loadedDates // 📅 日期已存在，不重复添加
              : [...prev.loadedDates, date] // 📅 新日期，添加到记录中
            : [date], // 📅 替换模式：重置为当前日期
          hasMore: newsData.hasMore, // 🔚 是否还有更多数据
          isLoading: false,
        }));

        // 🔗 同步 URL 状态
        updateURL(date, category);
      } catch {
        // ❌ 错误处理
        setState((prev) => ({
          ...prev,
          error: "加载新闻失败，请重试",
          isLoading: false,
        }));
      }
    },
    [updateURL]
  );

  // 🔄 无限滚动加载更多 - VirtualNewsList 调用的核心函数
  const loadMore = useCallback(() => {
    // 🚫 防护：正在加载或没有更多数据时不执行
    if (state.isLoading || !state.hasMore) return;

    // 📅 计算下一个要加载的日期（时间倒序：越往下越早）
    const lastDate =
      state.loadedDates[state.loadedDates.length - 1] || state.currentDate;
    const nextDate = dateUtils.getPreviousDay(lastDate);

    // 📥 追加模式加载前一天的新闻
    loadNewsForDate(nextDate, state.selectedCategory, true);
  }, [
    state.isLoading,
    state.hasMore,
    state.loadedDates,
    state.currentDate,
    state.selectedCategory,
    loadNewsForDate,
  ]);

  // 🏷️ 分类切换 - 重新加载当前日期的指定分类新闻
  const setCategory = useCallback(
    (category: NewsCategory | "all") => {
      // 🔄 相同分类无需重新加载
      if (category === state.selectedCategory) return;

      // 📍 清除滚动状态，因为内容会完全改变
      scrollStateRef.current = null;
      // 🔄 替换模式：重新加载当前日期的新分类数据
      loadNewsForDate(state.currentDate, category, false);
    },
    [state.selectedCategory, state.currentDate, loadNewsForDate]
  );

  // 📅 日期跳转 - 跳转到指定日期（日期选择器调用）
  const jumpToDate = useCallback(
    (date: string) => {
      // 📍 清除滚动状态，因为会跳转到新日期
      scrollStateRef.current = null;
      // 🔄 替换模式：加载指定日期的当前分类数据
      loadNewsForDate(date, state.selectedCategory, false);
    },
    [state.selectedCategory, loadNewsForDate]
  );

  // 🔄 刷新当前内容 - 重新加载当前日期和分类的数据
  const refresh = useCallback(() => {
    // 📍 清除滚动状态
    scrollStateRef.current = null;
    // 🔄 替换模式：重新加载当前状态的数据
    loadNewsForDate(state.currentDate, state.selectedCategory, false);
  }, [state.currentDate, state.selectedCategory, loadNewsForDate]);

  // ❌ 清除错误状态 - 用户手动清除错误提示
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // 🚀 初始数据加载 - 首次进入页面时加载新闻

  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // 📊 防止重复初始化，只在第一次且没有数据时加载
    if (!hasInitializedRef.current && state.news.length === 0) {
      hasInitializedRef.current = true;
      loadNewsForDate(state.currentDate, state.selectedCategory);
    }
  }, [
    state.news.length,
    state.currentDate,
    state.selectedCategory,
    loadNewsForDate,
  ]);

  // 📍 滚动位置记忆管理 - 页面切换时保存/恢复滚动位置
  useEffect(() => {
    // 💾 页面卸载前保存滚动位置
    const handleBeforeUnload = () => {
      const scrollPosition = window.scrollY;
      scrollStateRef.current = {
        position: scrollPosition, // 当前滚动位置
        timestamp: Date.now(), // 保存时间戳
      };
    };

    // 🔄 页面加载后恢复滚动位置
    const handleLoad = () => {
      setTimeout(() => {
        if (scrollStateRef.current) {
          const { position, timestamp } = scrollStateRef.current;

          // ⏰ 只在5分钟内恢复滚动位置（避免过时数据影响用户体验）
          if (Date.now() - timestamp < 5 * 60 * 1000) {
            window.scrollTo(0, position);
          }

          // 🧹 清除已使用的滚动状态
          scrollStateRef.current = null;
        }
      }, 100); // 延迟100ms确保页面渲染完成
    };

    // 📱 注册事件监听器
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    // 🧹 组件卸载时清理事件监听器
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []); // 空依赖数组，只在组件挂载/卸载时执行

  // 🎁 返回所有状态和操作函数
  return {
    ...state, // 展开所有状态（news, currentDate, selectedCategory 等）
    loadMore, // 🔄 加载更多函数（无限滚动）
    setCategory, // 🏷️ 分类切换函数
    jumpToDate, // 📅 日期跳转函数
    refresh, // 🔄 刷新函数
    clearError, // ❌ 清除错误函数
  };
}
