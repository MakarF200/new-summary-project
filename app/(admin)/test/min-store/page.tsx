"use client";
import { useNewsListStore } from "@/stores/miniStoreTest/index"; // 假设路径正确

function NewsList() {
  // 1. 从 Store 中选择需要的部分：状态和动作
  const count = useNewsListStore((state) => state.count);
  const loading = useNewsListStore((state) => state.loading);
  const message = useNewsListStore((state) => state.message);
  const increase = useNewsListStore((state) => state.increase);
  const setMessage = useNewsListStore((state) => state.setMessage);
  const toggleLoading = useNewsListStore((state) => state.toggleLoading);

  return (
    <div>
      <h1>Count: {count}</h1>
      <p>Loading: {loading ? "Yes" : "No"}</p>
      <p>Message: {message}</p>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => increase(1)}
      >
        Increase Count
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={toggleLoading}
      >
        Toggle Loading
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setMessage("New Message!")}
      >
        Set New Message
      </button>
    </div>
  );
}

export default function Page() {
  return <NewsList />;
}
