import { NewsCardItem } from "@/types/apiTypes";
import Card from "./Card";

const testNews: NewsCardItem = {
  title: "This is a title",
  summary:
    "This is a summary, This is a summary,This is a summary,This is a summary,This is a summary,",
  imageUrl: "https://picsum.photos/200/300",
  publishedAt: "2025-01-01",
  category: "sports",
  cursor: "1736937045_news-001",
};
export default function CardForm() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 w-full h-full">
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
      </div>
    </>
  );
}
