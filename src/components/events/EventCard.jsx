import { Link } from "react-router";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import PlaceholderImage from "../ui/PlaceholderImage";

export function EventCardWithPhoto({ event }) {
  const to = `/events/${event.id}`;
  return (
    <article className="card card-photo card-hover">
      <Link to={to} className="card-photo-media" tabIndex={-1} aria-hidden="true">
        <PlaceholderImage shape="rect" aspectRatio="16/10" caption="நிகழ்வுப் புகைப்படம்" src={event.image} alt="" />
      </Link>
      <div className="card-photo-body">
        <span className="card-kicker">{event.kicker}</span>
        <h3 className="card-title">
          <Link to={to}>{event.title}</Link>
        </h3>
        <p className="card-body">{event.body}</p>
        <div className="card-footer">
          <span className="card-meta">
            <FiCalendar aria-hidden="true" /> {event.meta}
          </span>
          <Link to={to} className="link-arrow">
            முழு விபரம் காண <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
