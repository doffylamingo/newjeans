import { Video } from "@generated/prisma";

import VideoThumbnail from "@/components/VideoThumnail";

export default function VideoList({
  videos,
  selected,
  setSelected,
}: {
  videos: Video[];
  selected: Video | null;
  setSelected: (video: Video) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
      {videos.map((video) => (
        <VideoThumbnail
          key={video.videoId}
          selected={selected}
          video={video}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}
