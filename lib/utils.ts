import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy年MM月dd日", { locale: zhCN });
}

export function formatRelativeTime(date: string | Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: zhCN });
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategoryColor(category: string) {
  const colors = {
    politics: "bg-red-100 text-red-800",
    economy: "bg-blue-100 text-blue-800",
    technology: "bg-purple-100 text-purple-800",
    sports: "bg-green-100 text-green-800",
    entertainment: "bg-pink-100 text-pink-800",
    health: "bg-emerald-100 text-emerald-800",
    science: "bg-indigo-100 text-indigo-800",
    world: "bg-gray-100 text-gray-800",
  };
  return colors[category as keyof typeof colors] || colors.world;
}
