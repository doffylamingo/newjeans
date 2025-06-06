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
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getVideosQueryOptions());
  },
  component: RouteComponent,
  pendingComponent: () => (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <div className="relative mb-6 animate-pulse md:mb-8">
        <div className="aspect-video w-full bg-gray-300" />
      </div>

      <div className="grid animate-pulse grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col"
          >
            <div className="relative aspect-video w-full bg-gray-300" />
            <div className="mt-3 flex flex-col items-center gap-1 sm:flex-row sm:justify-between sm:gap-0">
              <div className="h-4 w-2/3 bg-gray-300" />
              <div className="h-4 w-1/3 bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  ),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Video videos={data.result} />
    </main>
  );
}
