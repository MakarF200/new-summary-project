"use client";

import { GlassExample } from "@/components/GlassExample";
import { useEffect, useState } from "react";

// 文本页面
export default function TextPage() {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    console.log("TextPage mounted");
    console.log(number);
  }, [number]);

  return (
    <main className="min-h-screen bg-gray-50">
      GlassExample
      <GlassExample />
      <p>{number}</p>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => setNumber(number + 1)}
      >
        Increment
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={() => setNumber(number - 1)}
      >
        Decrement
      </button>
    </main>
  );
}
