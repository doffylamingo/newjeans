import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

import Counter from "yet-another-react-lightbox/plugins/counter";

import "yet-another-react-lightbox/plugins/counter.css";

import { RowsPhotoAlbum } from "react-photo-album";
import Download from "yet-another-react-lightbox/plugins/download";

import "react-photo-album/rows.css";

interface Photo {
  src: string;
  width: number;
  height: number;
}

interface GalleryProps {
  photos: Photo[];
  index: number;
  setIndex: (index: number) => void;
}

export default function Gallery({ photos, index, setIndex }: GalleryProps) {
  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
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
        slides={photos}
      />
    </>
  );
}
