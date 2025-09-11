"use client";

// 毛玻璃效果使用示例组件
export function GlassExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      {/* 基础毛玻璃效果 */}
      <div className="glass rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          基础毛玻璃效果
        </h2>
        <p className="text-gray-700">
          这是使用 <code className="bg-gray-200 px-2 py-1 rounded">glass</code>{" "}
          类的基础毛玻璃效果。
        </p>
      </div>

      {/* 不同透明度的毛玻璃效果 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-light rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">浅色毛玻璃</h3>
          <p className="text-sm text-gray-700">使用 glass-light 类</p>
        </div>

        <div className="glass-medium rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">中等毛玻璃</h3>
          <p className="text-sm text-gray-700">使用 glass-medium 类</p>
        </div>

        <div className="glass-dark rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">深色毛玻璃</h3>
          <p className="text-sm text-gray-700">使用 glass-dark 类</p>
        </div>
      </div>

      {/* 带边框的毛玻璃效果 */}
      <div className="glass-border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          带边框的毛玻璃
        </h2>
        <p className="text-gray-700">
          使用{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">glass-border</code>{" "}
          类，包含半透明边框。
        </p>
      </div>

      {/* 带阴影的毛玻璃效果 */}
      <div className="glass-shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          带阴影的毛玻璃
        </h2>
        <p className="text-gray-700">
          使用{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">glass-shadow</code>{" "}
          类，包含深度阴影效果。
        </p>
      </div>

      {/* 实际应用示例 - 模态框 */}
      <div className="glass-shadow rounded-xl p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          模态框示例
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          这是一个使用毛玻璃效果的模态框示例
        </p>
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            确认
          </button>
          <button className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors">
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
