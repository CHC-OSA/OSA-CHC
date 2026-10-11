import { useParams } from "react-router";
import { FiArrowRight, FiCamera, FiGrid, FiHeart, FiLayers } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import Button from "../components/ui/Button";
import ClassroomGrid from "../components/building/ClassroomGrid";
import ProgressBar from "../components/building/ProgressBar";
import SiteUpdates from "../components/building/SiteUpdates";
import { CONTACT_INFO } from "../data/constants";
import { PHASE_STATUS_LABELS, getClassroomStats, getClassroomsByPhase, getPhaseById, getSiteUpdates } from "../data/building";
import "../styles/building.css";

const BACK = { to: "/building", label: "கட்டடத் திட்டத்திற்குத் திரும்பு" };

export default function BuildingPhase() {
  const { phaseId } = useParams();
  const phase = getPhaseById(phaseId);

  if (!phase) {
    return <PageHero back={BACK} title="இந்தக் கட்டம் கிடைக்கவில்லை." compact />;
  }

  const stats = getClassroomStats(phase.id);
  const scope = [
    { value: phase.scope.classrooms, label: "வகுப்பறைகள்" },
    { value: phase.scope.staircases, label: "படிக்கட்டுத் தொகுதி" },
    { value: phase.scope.washrooms, label: "கழிவறைத் தொகுதிகள்" },
  ].filter((item) => item.value > 0);

  return (
    <>
      <PageHero back={BACK} eyebrow={`கட்டம் ${phase.id}`} title={phase.title} lead={phase.summary}>
        <div className="page-hero-chips">
          <span className={phase.status === "ongoing" ? "chip chip-gold" : "chip"}>{PHASE_STATUS_LABELS[phase.status]}</span>
          {phase.donationsOpen && <span className="chip chip-gold">முன்பதிவுகள் ஏற்றுக்கொள்ளப்படுகின்றன</span>}
        </div>
      </PageHero>

      <div className="container page-body page-stack">
        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiLayers />
            </span>
            இக்கட்டத்தில் அமைக்கப்படுபவை
          </h2>
          <ul className="scope-list">
            {scope.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong> {item.label}
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiGrid />
            </span>
            வகுப்பறைகளின் தற்போதைய நிலை
          </h2>
          <div className="build-summary">
            <ProgressBar label="கட்டுமானம் பூர்த்தியான வகுப்பறைகள்" value={stats.completed} total={stats.total} />
            <ProgressBar label="நிதி திரட்டப்பட்டுள்ள வகுப்பறைகள்" value={stats.booked} total={stats.total} />
          </div>
          <ClassroomGrid classrooms={getClassroomsByPhase(phase.id)} />
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiCamera />
            </span>
            கட்டுமானப் பணிகளின் புகைப்படங்கள்
          </h2>
          <SiteUpdates updates={getSiteUpdates(phase.id)} />
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiHeart />
            </span>
            நன்கொடைகள்
          </h2>
          {phase.donationsOpen && (
            <p className="build-note">
              இக்கட்டத்திற்கான வகுப்பறை முன்பதிவுகள் தற்போது ஏற்றுக்கொள்ளப்படுகின்றன. முன்பதிவு நடவடிக்கைகள் யாவும் சங்கத்தின் பொறுப்புக் குழுக்களினால் நேரடியாக முன்னெடுக்கப்படுகின்றன. மேலதிக விபரங்களுக்கு{" "}
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>{CONTACT_INFO.phone}</a> எனும் தொலைபேசி இலக்கத்தினூடாகவோ <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a> எனும் மின்னஞ்சல் முகவரியினூடாகவோ
              தொடர்பு கொள்ளுமாறு அன்புடன் கேட்டுக்கொள்கின்றோம்.
            </p>
          )}
          <div className="build-actions">
            <Button as="link" to={`/building/phase/${phase.id}/donors`} variant="primary">
              நன்கொடையாளர் விபரங்களும் பற்றுச்சீட்டுகளும் <FiArrowRight aria-hidden="true" />
            </Button>
            {phase.donationsOpen && (
              <Button as="link" to="/contact" variant="secondary">
                தொடர்பு கொள்ள
              </Button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
