"use client";

import { categories } from "@/lib/mockData";
import { NewsCategory } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: NewsCategory | "all";
  onCategoryChange: (category: NewsCategory | "all") => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange("all")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          selectedCategory === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        全部
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selectedCategory === category.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
