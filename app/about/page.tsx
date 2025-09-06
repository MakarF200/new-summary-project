import { Header } from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "了解新闻摘要团队，我们的使命是为用户提供最新、最准确的新闻要点。",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">关于我们</h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                我们的使命
              </h2>
              <p className="text-gray-600 leading-relaxed">
                在信息爆炸的时代，我们致力于为用户提供最新、最准确的新闻要点，
                让您在短时间内了解世界动态。我们相信，优质的信息应该触手可及。
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                我们的特色
              </h2>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>精选重要新闻，过滤噪音信息</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>多维度分类，快速找到感兴趣的内容</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>智能搜索，精准定位相关信息</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>简洁界面，专注阅读体验</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                联系我们
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>如果您有任何建议或问题，欢迎与我们联系：</p>
                <p>邮箱：contact@antiquenews.xyz</p>
                <p>我们会在24小时内回复您的邮件。</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                感谢您的支持
              </h2>
              <p className="text-blue-800">
                感谢您选择我们的新闻摘要服务。我们会持续改进，为您提供更好的阅读体验。
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
