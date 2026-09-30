import PageHero from "../components/layout/PageHero";
import { GalleryAlbumCard } from "../components/gallery/GalleryAlbumCard";
import { GALLERY_PHOTOS } from "../data/gallery";

export default function Gallery() {
  return (
    <>
      <PageHero eyebrow="படத்தொகுப்பு" title="நினைவலைகள்" />
      <div className="container page-body">
        <div className="grid-3">
          {GALLERY_PHOTOS.map((album) => (
            <GalleryAlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </>
  );
}
