import { Link } from "react-router";
import { FiArrowRight, FiImage } from "react-icons/fi";
import PlaceholderImage from "../ui/PlaceholderImage";

export function GalleryAlbumCard({ album }) {
  const to = `/gallery/${album.id}`;
  const count = album.photos?.length ?? 0;
  return (
    <article className="card card-photo card-hover">
      <Link to={to} className="card-photo-media" tabIndex={-1} aria-hidden="true">
        <PlaceholderImage shape="rect" aspectRatio="16/10" caption="புகைப்படத் தொகுப்பு அட்டைப்படம்" src={album.cover} alt="" />
      </Link>
      <div className="card-photo-body">
        <h3 className="card-title">
          <Link to={to}>{album.caption}</Link>
        </h3>
        <p className="card-meta">
          <FiImage aria-hidden="true" /> {count > 0 ? `${count} புகைப்படங்கள்` : "விரைவில் புகைப்படங்கள்"}
        </p>
        <div className="card-footer">
          <Link to={to} className="link-arrow">
            முழு புகைப்படங்களைக் காண <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
