"use client";

import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "react-photo-album/rows.css";

import { useState } from "react";
import { Image } from "@generated/prisma";

interface GalleryProps {
  images: Image[];
}

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <RowsPhotoAlbum
        photos={images}
        spacing={5}
        targetRowHeight={180}
        onClick={({ index: current }) => setIndex(current)}
      />
      <Lightbox
        carousel={{
          padding: 0,
        }}
        close={() => setIndex(-1)}
        counter={{ container: { style: { top: 0, bottom: "unset" } } }}
        index={index}
        open={index >= 0}
        plugins={[Counter, Download]}
        slides={images}
      />
    </>
  );
}
