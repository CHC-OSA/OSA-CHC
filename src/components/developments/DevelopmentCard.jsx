import { Link } from "react-router";
import PlaceholderImage from "../ui/PlaceholderImage";
import { STATUS_LABELS, STATUS_TAG_CLASS, getLatestEntry } from "../../data/developments";

function StatusTag({ status }) {
  return <span className={`tag ${STATUS_TAG_CLASS[status]}`}>{STATUS_LABELS[status]}</span>;
}

function LatestUpdate({ development }) {
  const latest = getLatestEntry(development);
  return (
    <p className="card-meta" style={{ margin: 0 }}>
      <span>சமீபத்திய புதுப்பிப்பு: {latest.date} — {latest.label}</span>
    </p>
  );
}

export function DevelopmentCard({ development }) {
  return (
    <Link
      to={`/developments/${development.id}`}
      className="card"
      style={{ cursor: "pointer", textDecoration: "none", gap: 10 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div className="card-kicker" style={{ color: "var(--color-accent-2-700)" }}>{development.kicker}</div>
        <StatusTag status={development.status} />
      </div>
      <div className="card-title">{development.title}</div>
      <p className="card-body">{development.summary}</p>
      <LatestUpdate development={development} />
    </Link>
  );
}

export function DevelopmentCardWithPhoto({ development }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <PlaceholderImage shape="rect" aspectRatio="16/10" caption="அபிவிருத்தி இடப் புகைப்படம்" />
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div className="card-kicker" style={{ color: "var(--color-accent-2-700)" }}>{development.kicker}</div>
          <StatusTag status={development.status} />
        </div>
        <div className="card-title">{development.title}</div>
        <p className="card-body">{development.summary}</p>
        <LatestUpdate development={development} />
        <Link to={`/developments/${development.id}`} style={{ cursor: "pointer", fontSize: "13.5px", marginTop: "auto" }}>
          முழு காலவரிசையைக் காண →
        </Link>
      </div>
    </div>
  );
}
