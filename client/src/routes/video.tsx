import Video from "@/components/Video";
import { createFileRoute } from "@tanstack/react-router";
import { videos } from "@/lib/constants";

export const Route = createFileRoute("/video")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-full min-h-screen max-w-[68rem] mx-auto px-4 md:px-0 py-6 md:py-8">
      <Video videos={videos} />
    </main>
  );
}
