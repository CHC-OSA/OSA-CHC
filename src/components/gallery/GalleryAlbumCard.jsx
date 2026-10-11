import { Link } from "react-router";
import { ArrowRight02Icon, Calendar03Icon, Image01Icon } from "@hugeicons/core-free-icons";
import Icon from "../ui/Icon";
import PlaceholderImage from "../ui/PlaceholderImage";

export function GalleryAlbumCard({ album }) {
  const to = `/gallery/${album.id}`;
  const count = album.photos?.length ?? 0;
  // A cover that isn't the frame's shape (e.g. a poster) is shown whole, over a blurred copy of itself.
  const contain = album.coverFit === "contain" && Boolean(album.cover);
  return (
    <article className="card card-photo card-hover">
      <Link
        to={to}
        className={`card-photo-media${contain ? " card-photo-media-contain" : ""}`}
        style={contain ? { "--cover": `url(${JSON.stringify(album.cover)})` } : undefined}
        tabIndex={-1}
        aria-hidden="true"
      >
        <PlaceholderImage
          shape="rect"
          aspectRatio="16/10"
          caption="படத்தொகுப்பு முகப்புப் படம்"
          src={album.cover}
          alt=""
          style={contain ? { objectFit: "contain" } : undefined}
        />
      </Link>
      <div className="card-photo-body">
        <h3 className="card-title">
          <Link to={to}>{album.caption}</Link>
        </h3>
        {album.date ? (
          <p className="card-meta">
            <Icon icon={Calendar03Icon} /> {album.date}
          </p>
        ) : (
          <p className="card-meta">
            <Icon icon={Image01Icon} /> {count > 0 ? `${count} புகைப்படங்கள்` : "புகைப்படங்கள் விரைவில் இணைக்கப்படும்"}
          </p>
        )}
        <div className="card-footer">
          <Link to={to} className="link-arrow">
            அனைத்துப் புகைப்படங்கள் <Icon icon={ArrowRight02Icon} />
          </Link>
        </div>
      </div>
    </article>
  );
}
