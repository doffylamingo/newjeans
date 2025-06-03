import { createFileRoute } from "@tanstack/react-router";

import { videos } from "@/lib/constants";
import Video from "@/components/Video";

export const Route = createFileRoute("/video")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[68rem] px-4 py-6 md:px-0 md:py-8">
      <Video videos={videos} />
    </main>
  );
}
