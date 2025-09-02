import Link from "next/link";
import { Header } from "@/components/Header";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              页面未找到
            </h2>
            <p className="text-gray-600 mb-8">
              抱歉，您访问的页面不存在。可能已被删除、移动或链接错误。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首页
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              浏览新闻
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            <p>如果您认为这是一个错误，请联系我们的支持团队。</p>
          </div>
        </div>
      </div>
    </main>
  );
}
