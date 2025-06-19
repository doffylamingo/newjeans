"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Video as VideoType } from "@generated/prisma";
import { X } from "lucide-react";

import VideoList from "@/components/VideoList";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Video({ videos = [] }: { videos: VideoType[] }) {
  const [selected, setSelected] = useState<VideoType | null>(videos[0] ?? null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelect = useCallback(
    (video: VideoType) => {
      setSelected(video);

      const container = playerRef.current;

      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      }

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
      <div
        ref={playerRef}
        className="relative mb-6 hidden shadow-2xl md:mb-8 md:block"
      >
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
        videos={videos}
      />
    </div>
  );
}
