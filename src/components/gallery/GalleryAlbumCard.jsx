import { Link } from "react-router";
import PlaceholderImage from "../ui/PlaceholderImage";

export function GalleryAlbumCard({ album }) {
  const count = album.photos?.length ?? 0;
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PlaceholderImage shape="rect" aspectRatio="16/10" caption="புகைப்படத் தொகுப்பு அட்டைப்படம்" src={album.cover} alt={album.caption} />
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div className="card-title">{album.caption}</div>
        <p className="card-meta" style={{ margin: 0 }}>
          <span>{count > 0 ? `${count} புகைப்படங்கள்` : "விரைவில் புகைப்படங்கள்"}</span>
        </p>
        <Link to={`/gallery/${album.id}`} style={{ cursor: "pointer", fontSize: "13.5px", marginTop: "auto" }}>
          முழு புகைப்படங்களைக் காண →
        </Link>
      </div>
    </div>
  );
}
