import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { NewsDetail } from "@/components/NewsDetail";
import { mockNews } from "@/lib/mockData";

interface NewsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const news = mockNews.find((item) => item.id === id);

  if (!news) {
    return {
      title: "新闻未找到",
      description: "抱歉，您访问的新闻页面不存在。",
    };
  }

  return {
    title: news.title,
    description: news.summary,
    keywords: [...news.tags, "新闻", "摘要"],
    openGraph: {
      title: news.title,
      description: news.summary,
      type: "article",
      publishedTime: news.publishedAt,
      authors: [news.source],
      tags: news.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.summary,
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  const news = mockNews.find((item) => item.id === id);

  if (!news) {
    notFound();
  }

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <NewsDetail news={news} />
      </div>
    </main>
  );
}
