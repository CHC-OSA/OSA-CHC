import { Link } from "react-router";
import PlaceholderImage from "../ui/PlaceholderImage";

export function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="card" style={{ cursor: "pointer", textDecoration: "none" }}>
      <div className="card-kicker" style={{ color: "var(--color-accent-2-700)" }}>{event.kicker}</div>
      <div className="card-title">{event.title}</div>
      <p className="card-body">{event.body}</p>
      <div className="card-meta">
        <span>{event.meta}</span>
      </div>
    </Link>
  );
}

export function EventCardWithPhoto({ event }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PlaceholderImage shape="rect" aspectRatio="16/10" caption="நிகழ்வுப் புகைப்படம்" />
      <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="card-kicker" style={{ color: "var(--color-accent-2-700)" }}>{event.kicker}</div>
        <div className="card-title">{event.title}</div>
        <p className="card-body">{event.body}</p>
        <div
          className="card-meta"
          style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span>{event.meta}</span>
          <Link to={`/events/${event.id}`} style={{ cursor: "pointer", fontSize: "13.5px" }}>
            முழு விபரம் காண →
          </Link>
        </div>
      </div>
    </div>
  );
}
