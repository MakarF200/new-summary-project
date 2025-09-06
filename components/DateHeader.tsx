"use client";

import { Calendar } from "lucide-react";
import { dateUtils } from "@/lib/api";

interface DateHeaderProps {
  currentDate: string;
  onDateClick?: () => void;
  isSticky?: boolean;
}

export function DateHeader({
  currentDate,
  onDateClick,
  isSticky = false,
}: DateHeaderProps) {
  const displayDate = dateUtils.formatDateDisplay(currentDate);

  return (
    <div
      className={`
        bg-white border-b border-gray-200 px-4 py-3
        ${isSticky ? "sticky top-0 z-10 shadow-sm" : ""}
      `}
    >
      <div className="container mx-auto">
        <button
          onClick={onDateClick}
          className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span className="font-medium text-lg">
            {displayDate} ({currentDate})
          </span>
        </button>
      </div>
    </div>
  );
}
