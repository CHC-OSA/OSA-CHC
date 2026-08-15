import PlaceholderImage from "../components/ui/PlaceholderImage";

const PHOTOS = [
  { id: "g1", caption: "மறுசந்திப்பு நாள் 2025" },
  { id: "g2", caption: "விளையாட்டு விழா" },
  { id: "g3", caption: "பட்டமளிப்பு விழா" },
  { id: "g4", caption: "நூற்றாண்டு விழா" },
  { id: "g5", caption: "பழைய கட்டிடம் — 1960கள்" },
  { id: "g6", caption: "ஆண்டு பொது கூட்டம்" },
];

export default function Gallery() {
  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        படத்தொகுப்பு
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 36px" }}>நினைவலைகள்</h1>
      <div className="grid-3">
        {PHOTOS.map((photo) => (
          <figure key={photo.id} className="grayscale" style={{ margin: 0 }}>
            <PlaceholderImage aspectRatio="4/3" caption={photo.caption} />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
