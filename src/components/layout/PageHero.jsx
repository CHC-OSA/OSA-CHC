import { Link } from "react-router";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import Icon from "../ui/Icon";

// Blue banner at the top of every inner page; the page's first cards overlap its bottom edge (.page-body).
// `compact` is for pages with no cards below the banner.
export default function PageHero({ eyebrow, title, lead, back, compact = false, children }) {
  return (
    <header className={`page-hero${compact ? " page-hero-compact" : ""}`}>
      <div className="container page-hero-inner">
        {back && (
          <Link to={back.to} className="page-back">
            <Icon icon={ArrowLeft02Icon} /> {back.label}
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
