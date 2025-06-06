import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";
import Video from "@/components/Video";

const getVideosQueryOptions = () => ({
  queryKey: ["videos"],
  queryFn: async () => {
    const res = await api.videos.$get();
    const data = await res.json();

    return data;
  },
});

export const Route = createFileRoute("/video")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery(getVideosQueryOptions());

  if (isLoading) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
        <div className="relative mb-6 hidden animate-pulse md:mb-8 md:block">
          <div className="aspect-video w-full bg-gray-300" />
        </div>

        <div className="grid animate-pulse grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col"
            >
              <div className="aspect-video w-full bg-gray-300" />
              <div className="mt-3 space-y-2">
                <div className="h-4 bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Video videos={data?.result ?? []} />
    </main>
  );
}
