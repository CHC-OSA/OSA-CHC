import { Link } from "react-router";
import { FiArrowRight, FiClock } from "react-icons/fi";
import PlaceholderImage from "../ui/PlaceholderImage";
import { STATUS_LABELS, STATUS_TAG_CLASS, getLatestEntry } from "../../data/developments";

function StatusTag({ status }) {
  return <span className={`tag ${STATUS_TAG_CLASS[status]}`}>{STATUS_LABELS[status]}</span>;
}

export function DevelopmentCardWithPhoto({ development }) {
  const to = `/developments/${development.id}`;
  const latest = getLatestEntry(development);
  return (
    <article className="card card-photo card-hover">
      <Link to={to} className="card-photo-media" tabIndex={-1} aria-hidden="true">
        <PlaceholderImage shape="rect" aspectRatio="16/10" caption="அபிவிருத்தி இடப் புகைப்படம்" src={development.image} alt="" />
      </Link>
      <div className="card-photo-body">
        <div className="card-row">
          <span className="card-kicker">{development.kicker}</span>
          <StatusTag status={development.status} />
        </div>
        <h3 className="card-title">
          <Link to={to}>{development.title}</Link>
        </h3>
        <p className="card-body">{development.summary}</p>
        <p className="card-meta">
          <FiClock aria-hidden="true" /> இறுதி இற்றைப்படுத்தல்: {latest.date} — {latest.label}
        </p>
        <div className="card-footer">
          <Link to={to} className="link-arrow">
            முழு காலவரிசையைக் காண <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
