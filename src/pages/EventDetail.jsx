import { Link, useParams } from "react-router";
import { ArrowRight02Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import Icon from "../components/ui/Icon";
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
            <Icon icon={Calendar03Icon} /> {event.meta}
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
                அனைத்துப் புகைப்படங்களையும் காண <Icon icon={ArrowRight02Icon} />
              </Link>
            </div>
          )}
          <p className="prose">{event.long}</p>
        </article>
      </div>
    </>
  );
}
