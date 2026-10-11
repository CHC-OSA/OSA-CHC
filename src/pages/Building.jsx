import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import { HugeiconsIcon } from "@hugeicons/react";
import { DashboardSquare01Icon, MoneyBag02Icon, School01Icon } from "@hugeicons/core-free-icons";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import FundSummary from "../components/building/FundSummary";
import ClassroomGrid from "../components/building/ClassroomGrid";
import ProgressBar from "../components/building/ProgressBar";
import PhaseCard from "../components/building/PhaseCard";
import { BUILDING, CLASSROOMS, FUNDS, PHASES, getClassroomStats } from "../data/building";
import "../styles/building.css";

export default function Building() {
  const stats = getClassroomStats();

  return (
    <>
      <PageHero eyebrow="கட்டுமானத் திட்டம்" title={BUILDING.title} lead={BUILDING.lead}>
        <div className="page-hero-chips">
          <span className="chip chip-gold">3 மாடிகள்</span>
          <span className="chip">{stats.total} வகுப்பறைகள்</span>
          <span className="chip">{PHASES.length} கட்டங்கள்</span>
        </div>
      </PageHero>

      <div className="container page-body page-stack">
        <figure className="media-rounded" style={{ margin: 0, boxShadow: "var(--shadow-md)" }}>
          <PlaceholderImage aspectRatio="16/9" caption="கட்டடத்தின் மாதிரித் தோற்றம்" src={BUILDING.image} alt="புதிய மூன்று மாடிக் கட்டடத்தின் மாதிரித் தோற்றம்" />
        </figure>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <HugeiconsIcon icon={School01Icon} size={22} strokeWidth={1.8} />
            </span>
            திட்டம் பற்றிய அறிமுகம்
          </h2>
          {BUILDING.overview.map((paragraph) => (
            <p key={paragraph} className="build-note">
              {paragraph}
            </p>
          ))}
          <Link to={`/events/${BUILDING.foundationEventId}`} className="link-arrow">
            அடிக்கல் நாட்டும் விழா <FiArrowRight aria-hidden="true" />
          </Link>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <HugeiconsIcon icon={MoneyBag02Icon} size={22} strokeWidth={1.8} />
            </span>
            நிதி நிலைமை
          </h2>
          <FundSummary funds={FUNDS} />
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <HugeiconsIcon icon={DashboardSquare01Icon} size={22} strokeWidth={1.8} />
            </span>
            வகுப்பறைகளின் தற்போதைய நிலை
          </h2>
          <div className="build-summary">
            <ProgressBar label="கட்டுமானம் பூர்த்தியான வகுப்பறைகள்" value={stats.completed} total={stats.total} />
            <ProgressBar label="நிதி திரட்டப்பட்டுள்ள வகுப்பறைகள்" value={stats.booked} total={stats.total} />
          </div>
          <ClassroomGrid classrooms={CLASSROOMS} />
        </section>

        <section>
          <div className="section-head">
            <h2 className="section-title">கட்டுமானக் கட்டங்கள்</h2>
          </div>
          <div className="grid-3">
            {PHASES.map((phase) => (
              <PhaseCard key={phase.id} phase={phase} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
