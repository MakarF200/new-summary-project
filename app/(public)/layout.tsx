export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="text-2xl font-bold h-16 w-full border-b border-gray-200">
        LLM News
      </header>
      <main className="min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
