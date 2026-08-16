import { Link, useParams } from "react-router";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import { getGalleryAlbumById } from "../data/gallery";

export default function GalleryAlbum() {
  const { id } = useParams();
  const album = getGalleryAlbumById(id);

  if (!album) {
    return (
      <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
        <Link to="/gallery" style={{ cursor: "pointer", fontSize: "13.5px" }}>← படத்தொகுப்புக்குத் திரும்பு</Link>
        <p style={{ marginTop: 22, fontSize: 16 }}>இந்தத் தொகுப்பு கிடைக்கவில்லை.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <Link to="/gallery" style={{ cursor: "pointer", fontSize: "13.5px" }}>← படத்தொகுப்புக்குத் திரும்பு</Link>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "22px 0 32px", maxWidth: "24ch" }}>{album.caption}</h1>
      <div className="grid-3">
        {(album.photos?.length ? album.photos : [undefined, undefined, undefined]).map((photo, i) => (
          <PlaceholderImage key={i} aspectRatio="4/3" caption="புகைப்படம்" src={photo} alt={album.caption} />
        ))}
      </div>
    </div>
  );
}
