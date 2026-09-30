import { Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";

// Blue banner at the top of every inner page; the page's first cards overlap its bottom edge (.page-body).
// `compact` is for pages with no cards below the banner.
export default function PageHero({ eyebrow, title, lead, back, compact = false, children }) {
  return (
    <header className={`page-hero${compact ? " page-hero-compact" : ""}`}>
      <div className="container page-hero-inner">
        {back && (
          <Link to={back.to} className="page-back">
            <FiArrowLeft aria-hidden="true" /> {back.label}
          </Link>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
