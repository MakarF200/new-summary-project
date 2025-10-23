import { NewsCardItem } from "@/types/apiTypes";

export default function Card({ news }: { news: NewsCardItem }) {
  if (!news) return <div>Loading...</div>;
  const { title, summary, imageUrl, publishedAt, category, cursor } = news;
  return (
    <>
      <div className="rounded-lg bg-gray-200 p-6 shadow-sm border-2 border-gray-300 w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full aspect-16/9 flex justify-center items-center">
            <img src={imageUrl} alt="card image" />
          </div>
          <h2 className="text-center text-2xl font-bold -translate-x-0.5">
            {title}
          </h2>
          <h4 className="text-center text-sm font-normal -translate-x-0.5">
            {summary}
          </h4>
        </div>
      </div>
    </>
  );
}
