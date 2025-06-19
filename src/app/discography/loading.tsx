export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[68rem] px-4 pb-4 md:px-0 md:pb-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex animate-pulse flex-col"
          >
            <div className="aspect-square w-full bg-gray-300" />
            <div className="mt-3 space-y-2">
              <div className="h-5 bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
