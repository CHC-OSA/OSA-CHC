import { Link, useParams } from "react-router";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import { getEventById } from "../data/events";

export default function EventDetail() {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) {
    return (
      <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
        <Link to="/events" style={{ cursor: "pointer", fontSize: "13.5px" }}>← நிகழ்வுகளுக்குத் திரும்பு</Link>
        <p style={{ marginTop: 22, fontSize: 16 }}>இந்த நிகழ்வு கிடைக்கவில்லை.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <Link to="/events" style={{ cursor: "pointer", fontSize: "13.5px" }}>← நிகழ்வுகளுக்குத் திரும்பு</Link>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, margin: "22px 0 8px", flexWrap: "wrap" }}>
        <span className="card-kicker" style={{ color: "var(--color-accent-2-700)" }}>{event.kicker}</span>
        <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>{event.meta}</span>
      </div>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 20px", maxWidth: "24ch" }}>{event.title}</h1>
      <div className="grayscale grid-3" style={{ marginBottom: 32 }}>
        {[1, 2, 3].map((n) => (
          <PlaceholderImage key={n} aspectRatio="4/3" caption="நிகழ்வுப் புகைப்படம்" />
        ))}
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "70ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)", margin: 0 }}>
        {event.long}
      </p>
    </div>
  );
}
