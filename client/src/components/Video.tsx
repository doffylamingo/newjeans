import { useCallback, useEffect, useState } from "react";
import { CirclePlay, X } from "lucide-react";
import ReactPlayer from "react-player";

import usePagination from "@/hooks/usePagination";

import Pagination from "./Pagination";

interface Video {
  name: string;
  videoId: string;
  date: string;
}

export default function Video({ videos = [] }: { videos: Video[] }) {
  const [selected, setSelected] = useState<Video | null>(videos[0] ?? null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    page: videoPage,
    setPage: setVideoPage,
    totalPages,
    paginatedItems: paginatedVideos,
  } = usePagination(videos, 3);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = useCallback(
    (video: Video) => {
      setSelected(video);
      if (isMobile) {
        setShowModal(true);
      }
    },
    [isMobile],
  );

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (showModal && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal, isMobile]);

  if (videos.length === 0) {
    return (
      <div className="text-center text-gray-500">No videos available.</div>
    );
  }

  return (
    <div>
      <div className="relative mb-6 hidden shadow-2xl md:mb-8 md:block">
        <div className="aspect-video">
          <ReactPlayer
            controls
            height="100%"
            url={`https://www.youtube.com/watch?v=${selected?.videoId}`}
            width="100%"
          />
        </div>
      </div>

      {isMobile && showModal && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-4 right-4 z-10 bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            onClick={closeModal}
          >
            <X className="size-5" />
          </button>
          <div
            className="relative w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              <ReactPlayer
                controls
                height="100%"
                playing={true}
                url={`https://www.youtube.com/watch?v=${selected.videoId}`}
                width="100%"
              />
            </div>
          </div>
        </div>
      )}

      <VideoList
        selected={selected}
        setSelected={handleSelect}
        videos={paginatedVideos}
      />

      <Pagination
        currentPage={videoPage}
        totalPages={totalPages}
        onPageChange={setVideoPage}
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

function VideoThumbnail({
  video,
  selected,
  onSelect,
}: {
  video: Video;
  selected: Video | null;
  onSelect: (video: Video) => void;
}) {
  const { videoId: id, name, date } = video;

  return (
    <div className="group flex flex-col">
      <div
        className={`relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
          selected?.videoId === id
            ? "ring-opacity-75 shadow-lg ring-4 ring-blue-500"
            : "hover:ring-2 hover:ring-gray-300"
        }`}
        onClick={() => onSelect(video)}
      >
        <div className="relative aspect-video">
          <img
            alt={`Thumbnail for ${name}`}
            className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
            <CirclePlay className="size-8 text-gray-300 opacity-0 transition-all duration-300 group-hover:opacity-100 md:size-13" />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-1 pt-3 pb-4 group-hover:cursor-pointer sm:gap-0">
        <div className="text-base font-bold sm:text-lg">{name}</div>
        <div className="flex-shrink-0 text-sm font-medium text-neutral-700 sm:text-right sm:text-base">
          {date}
        </div>
      </div>
    </div>
  );
}
