import { useState } from "react";
import { useParams } from "react-router";
import { FiCalendar, FiImage } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import Lightbox from "../components/ui/Lightbox";
import { getGalleryAlbumById } from "../data/gallery";

const BACK = { to: "/gallery", label: "படத்தொகுப்புக்குத் திரும்பு" };

export default function GalleryAlbum() {
  const { id } = useParams();
  const album = getGalleryAlbumById(id);
  const [openIndex, setOpenIndex] = useState(null);

  if (!album) {
    return <PageHero back={BACK} title="இந்தத் தொகுப்பு கிடைக்கவில்லை." compact />;
  }

  const photos = album.photos ?? [];

  return (
    <>
      <PageHero back={BACK} title={album.caption}>
        {(album.date || photos.length > 0) && (
          <div className="page-hero-chips">
            {album.date && (
              <span className="chip">
                <FiCalendar aria-hidden="true" /> {album.date}
              </span>
            )}
            {photos.length > 0 && (
              <span className="chip">
                <FiImage aria-hidden="true" /> {photos.length} புகைப்படங்கள்
              </span>
            )}
          </div>
        )}
      </PageHero>
      <div className="container page-body">
        <div className="panel media-grid">
          {photos.length > 0
            ? photos.map((photo, i) => (
                <button key={photo} type="button" className="media-tile" aria-label={`புகைப்படம் ${i + 1}`} onClick={() => setOpenIndex(i)}>
                  <PlaceholderImage aspectRatio="3/2" src={photo} alt="" loading="lazy" decoding="async" />
                </button>
              ))
            : [0, 1, 2].map((i) => <PlaceholderImage key={i} aspectRatio="4/3" caption="புகைப்படம்" />)}
        </div>
      </div>
      {openIndex !== null && (
        <Lightbox photos={photos} index={openIndex} alt={album.caption} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}
