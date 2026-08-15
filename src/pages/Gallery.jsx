import PlaceholderImage from "../components/ui/PlaceholderImage";
import { GALLERY_PHOTOS } from "../data/gallery";

export default function Gallery() {
  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        படத்தொகுப்பு
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 36px" }}>நினைவலைகள்</h1>
      <div className="grid-3">
        {GALLERY_PHOTOS.map((photo) => (
          <figure key={photo.id} className="grayscale" style={{ margin: 0 }}>
            <PlaceholderImage aspectRatio="4/3" caption={photo.caption} src={photo.image} alt={photo.caption} />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
