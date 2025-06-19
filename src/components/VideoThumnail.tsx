import Image from "next/image";
import { Video } from "@generated/prisma";
import { CirclePlay } from "lucide-react";

export default function VideoThumbnail({
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
          <Image
            fill
            alt={`Thumbnail for ${name}`}
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
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
