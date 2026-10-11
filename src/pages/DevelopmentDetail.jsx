import { useParams } from "react-router";
import { Clock01Icon } from "@hugeicons/core-free-icons";
import Icon from "../components/ui/Icon";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import DevelopmentTimeline from "../components/developments/DevelopmentTimeline";
import { STATUS_LABELS, getDevelopmentById } from "../data/developments";

const BACK = { to: "/developments", label: "அபிவிருத்திகளுக்குத் திரும்பவும்" };

export default function DevelopmentDetail() {
  const { id } = useParams();
  const development = getDevelopmentById(id);

  if (!development) {
    return <PageHero back={BACK} title="இப்பணியைக் காண முடியவில்லை." compact />;
  }

  return (
    <>
      <PageHero back={BACK} eyebrow={development.kicker} title={development.title} lead={development.long ?? development.summary}>
        <div className="page-hero-chips">
          <span className={development.status === "ongoing" ? "chip chip-gold" : "chip"}>{STATUS_LABELS[development.status]}</span>
        </div>
      </PageHero>

      <div className="container page-body page-stack">
        <figure className="media-rounded" style={{ boxShadow: "var(--shadow-md)" }}>
          <PlaceholderImage aspectRatio="21/9" caption="அபிவிருத்திப் பணியிடப் புகைப்படம்" src={development.image} alt={development.title} />
        </figure>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <Icon icon={Clock01Icon} />
            </span>
            அபிவிருத்திக் காலவரிசை
          </h2>
          <DevelopmentTimeline entries={development.timeline} />
        </section>
      </div>
    </>
  );
}
