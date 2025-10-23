import { NewsCardItem } from "@/types/apiTypes";
import Card from "./Card";

const testNews: NewsCardItem = {
  title: "Title",
  summary: "Summary",
  imageUrl: "https://picsum.photos/200/300",
  publishedAt: "2025-01-01",
  category: "sports",
  cursor: "1736937045_news-001",
};
export default function CardForm() {
  return (
    <>
      <div className="grid grid-cols-3">
        <Card news={testNews} />
        <Card news={testNews} />
        <Card news={testNews} />
      </div>
    </>
  );
}
