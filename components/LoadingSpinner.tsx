"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  message = "加载中...",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}
