import PageHero from "../components/layout/PageHero";
import { EventCardWithPhoto } from "../components/events/EventCard";
import { EVENTS } from "../data/events";

export default function Events() {
  return (
    <>
      <PageHero eyebrow="நிகழ்வுகளும் செய்திகளும்" title="சமீபத்திய நிகழ்வுகள்" />
      <div className="container page-body">
        <div className="grid-3">
          {EVENTS.map((event) => (
            <EventCardWithPhoto key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
