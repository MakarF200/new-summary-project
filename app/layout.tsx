import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "新闻摘要 - 快速了解每日重要新闻",
    template: "%s | 新闻摘要",
  },
  description:
    "专业的新闻摘要服务，为您提供最新、最准确的新闻要点，让您在短时间内了解世界动态。",
  keywords: ["新闻摘要", "新闻要点", "时事新闻", "新闻速览", "每日新闻"],
  authors: [{ name: "新闻摘要团队" }],
  creator: "新闻摘要",
  publisher: "新闻摘要",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://antiquenews.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "新闻摘要 - 快速了解每日重要新闻",
    description:
      "专业的新闻摘要服务，为您提供最新、最准确的新闻要点，让您在短时间内了解世界动态。",
    url: "https://antiquenews.xyz",
    siteName: "新闻摘要",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "新闻摘要 - 快速了解每日重要新闻",
    description:
      "专业的新闻摘要服务，为您提供最新、最准确的新闻要点，让您在短时间内了解世界动态。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "antiquenews-xyz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
