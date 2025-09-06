"use client";

import { Calendar, FileText } from "lucide-react";

interface EmptyStateProps {
  date: string;
  message?: string;
}

export function EmptyState({ date, message = "暂无数据" }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
          <p className="text-gray-500">{date} 暂无新闻内容</p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>请尝试查看其他日期的内容</span>
        </div>
      </div>
    </div>
  );
}
