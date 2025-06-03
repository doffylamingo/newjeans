import usePagination from "@/hooks/usePagination";
import { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import Pagination from "./Pagination";
import { CirclePlay } from "lucide-react";

interface Video {
  name: string;
  id: string;
  date: string;
}

export default function Video({ videos = [] }: { videos: Video[] }) {
  const [selected, setSelected] = useState<Video | null>(videos[0] ?? null);
  const {
    page: videoPage,
    setPage: setVideoPage,
    totalPages,
    paginatedItems: paginatedVideos,
  } = usePagination(videos, 3);

  const handleSelect = useCallback((video: Video) => setSelected(video), []);

  return (
    <div>
      <div className="relative shadow-2xl mb-6 md:mb-8">
        <div className="aspect-video">
          <ReactPlayer
            controls
            url={`https://www.youtube.com/watch?v=${selected?.id}`}
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <VideoList
        videos={paginatedVideos}
        selected={selected}
        setSelected={handleSelect}
      />
      <Pagination
        currentPage={videoPage}
        onPageChange={setVideoPage}
        totalPages={totalPages}
      />
    </div>
  );
}

function VideoList({
  videos,
  selected,
  setSelected,
}: {
  videos: Video[];
  selected: Video | null;
  setSelected: (video: Video) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {videos.map((video) => (
        <VideoThumbnail
          key={video.id}
          video={video}
          selected={selected}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}

function VideoThumbnail({
  video,
  selected,
  onSelect,
}: {
  video: Video;
  selected: Video | null;
  onSelect: (video: Video) => void;
}) {
  const { id: videoId, name, date } = video;

  return (
    <div className="flex flex-col group">
      <div
        onClick={() => onSelect(video)}
        className={`relative  cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
          selected?.id === videoId
            ? "ring-4 ring-blue-500 ring-opacity-75 shadow-lg"
            : "hover:ring-2 hover:ring-gray-300"
        }`}
      >
        <div className="aspect-video relative">
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`Thumbnail for ${name}`}
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <CirclePlay className="size-8 md:size-13 opacity-0 group-hover:opacity-100 transition-all duration-300 text-gray-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center pt-3 pb-4 group-hover:cursor-pointer gap-1 sm:gap-0">
        <div className="text-base sm:text-lg font-bold ">{name}</div>
        <div className="text-sm sm:text-base font-medium text-neutral-700 sm:text-right flex-shrink-0">
          {date}
        </div>
      </div>
    </div>
  );
}
