"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { dateUtils } from "@/lib/api";

interface DateHeaderProps {
  currentDate: string;
  loadedDates?: string[];
  currentNewsCount?: number;
  totalNewsCount?: number;
  onDateClick?: () => void;
  isSticky?: boolean;
}

export function DateHeader({
  currentDate,
  loadedDates = [],
  currentNewsCount = 0,
  totalNewsCount = 0,
  onDateClick,
  isSticky = false,
}: DateHeaderProps) {
  const displayDate = dateUtils.formatDateDisplay(currentDate);

  return (
    <div
      className={`
        px-4 py-3 glass-medium
        ${isSticky ? "sticky top-0  z-30 shadow-sm" : ""}
      `}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* 日期显示 */}
          <button
            onClick={onDateClick}
            className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors group"
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium text-lg">{displayDate}</span>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* 统计信息 */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {currentNewsCount > 0 && (
              <span>
                已显示{" "}
                <span className="font-medium text-gray-900">
                  {currentNewsCount}
                </span>{" "}
                条
              </span>
            )}
            {loadedDates.length > 1 && (
              <span>
                跨越{" "}
                <span className="font-medium text-gray-900">
                  {loadedDates.length}
                </span>{" "}
                天
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
