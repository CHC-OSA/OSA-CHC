import { useParams } from "react-router";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import { getGalleryAlbumById } from "../data/gallery";

const BACK = { to: "/gallery", label: "படத்தொகுப்புக்குத் திரும்பு" };

export default function GalleryAlbum() {
  const { id } = useParams();
  const album = getGalleryAlbumById(id);

  if (!album) {
    return <PageHero back={BACK} title="இந்தத் தொகுப்பு கிடைக்கவில்லை." compact />;
  }

  return (
    <>
      <PageHero back={BACK} title={album.caption} />
      <div className="container page-body">
        <div className="panel media-grid">
          {(album.photos?.length ? album.photos : [undefined, undefined, undefined]).map((photo, i) => (
            <PlaceholderImage key={i} aspectRatio="4/3" caption="புகைப்படம்" src={photo} alt={album.caption} />
          ))}
        </div>
      </div>
    </>
  );
}
