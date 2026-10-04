import { Link, useParams } from "react-router";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import { getEventById } from "../data/events";

const BACK = { to: "/events", label: "நிகழ்வுகளுக்குத் திரும்பு" };

export default function EventDetail() {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) {
    return <PageHero back={BACK} title="இந்த நிகழ்வு கிடைக்கவில்லை." compact />;
  }

  return (
    <>
      <PageHero back={BACK} eyebrow={event.kicker} title={event.title}>
        <div className="page-hero-chips">
          <span className="chip">
            <FiCalendar aria-hidden="true" /> {event.meta}
          </span>
        </div>
      </PageHero>

      <div className="container page-body">
        <article className="panel page-stack">
          <div className="media-grid">
            {(event.gallery?.length ? event.gallery : [undefined, undefined, undefined]).map((photo, i) => (
              <PlaceholderImage key={i} aspectRatio="4/3" caption="நிகழ்வுப் புகைப்படம்" src={photo} alt={event.title} />
            ))}
          </div>
          {event.album && (
            <div>
              <Link to={`/gallery/${event.album}`} className="link-arrow">
                அனைத்துப் புகைப்படங்களையும் காண <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          )}
          <p className="prose">{event.long}</p>
        </article>
      </div>
    </>
  );
}
