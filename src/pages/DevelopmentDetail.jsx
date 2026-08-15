import { Link, useParams } from "react-router";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import DevelopmentTimeline from "../components/developments/DevelopmentTimeline";
import { STATUS_LABELS, STATUS_TAG_CLASS, getDevelopmentById } from "../data/developments";

export default function DevelopmentDetail() {
  const { id } = useParams();
  const development = getDevelopmentById(id);

  if (!development) {
    return (
      <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
        <Link to="/developments" style={{ cursor: "pointer", fontSize: "13.5px" }}>← அபிவிருத்திகளுக்குத் திரும்பு</Link>
        <p style={{ marginTop: 22, fontSize: 16 }}>இந்த அபிவிருத்தி கிடைக்கவில்லை.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <Link to="/developments" style={{ cursor: "pointer", fontSize: "13.5px" }}>← அபிவிருத்திகளுக்குத் திரும்பு</Link>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 8px", flexWrap: "wrap" }}>
        <span className="card-kicker" style={{ color: "var(--color-accent-2-700)" }}>{development.kicker}</span>
        <span className={`tag ${STATUS_TAG_CLASS[development.status]}`}>{STATUS_LABELS[development.status]}</span>
      </div>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 16px", maxWidth: "24ch" }}>{development.title}</h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "70ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)", margin: "0 0 32px" }}>
        {development.summary}
      </p>

      <figure className="grayscale" style={{ margin: "0 0 40px" }}>
        <PlaceholderImage aspectRatio="21/9" caption="அபிவிருத்தி இடப் புகைப்படம்" src={development.image} alt={development.title} />
      </figure>

      <div style={{ maxWidth: "70ch" }}>
        <p style={{ fontSize: 22, letterSpacing: "-0.01em", color: "var(--color-accent-700)", margin: "0 0 24px", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
          முன்னேற்றக் காலவரிசை
        </p>
        <DevelopmentTimeline entries={development.timeline} />
      </div>
    </div>
  );
}
