"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { NewsGrid } from "@/components/NewsGrid";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            今日新闻摘要
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            精选重要新闻，快速了解世界动态
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>

        <NewsGrid searchQuery={searchQuery} />
      </div>
    </main>
  );
}
