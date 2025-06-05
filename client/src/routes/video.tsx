import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/api";
import Video from "@/components/Video";

const getVideosQueryOptions = () => ({
  queryKey: ["discography"],
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
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Video videos={data.result} />
    </main>
  );
}
