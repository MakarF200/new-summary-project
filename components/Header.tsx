"use client";

import Link from "next/link";
import { Menu, NewspaperIcon, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header className="bg-gray-50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">新</span>
            </div> */}
            <NewspaperIcon className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              新闻摘要
            </span>
          </Link>

          {/* 搜索框 - 桌面端 */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} placeholder="搜索新闻..." />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              首页
            </Link>
            <Link
              href="/search-plus"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              高级搜索
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              关于我们
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* 搜索框 - 移动端 */}
        <div className="md:hidden pb-3">
          <SearchBar onSearch={handleSearch} placeholder="搜索新闻..." />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/search-plus"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                高级搜索
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                关于我们
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
