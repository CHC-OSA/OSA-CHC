import { EventCardWithPhoto } from "../components/events/EventCard";
import { EVENTS } from "../data/events";

export default function Events() {
  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        நிகழ்வுகளும் செய்திகளும்
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 36px" }}>சமீபத்திய நிகழ்வுகள்</h1>
      <div className="grid-3">
        {EVENTS.map((event) => (
          <EventCardWithPhoto key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
