import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import ProgressBar from "./ProgressBar";
import { PHASE_STATUS_SHORT_LABELS, PHASE_STATUS_TAG_CLASS, getClassroomStats } from "../../data/building";

export default function PhaseCard({ phase }) {
  const to = `/building/phase/${phase.id}`;
  const stats = getClassroomStats(phase.id);

  return (
    <article className="card card-hover">
      <div className="card-row phase-card-row">
        <span className="card-kicker">கட்டம் {phase.id}</span>
        <span className={`tag ${PHASE_STATUS_TAG_CLASS[phase.status]}`}>{PHASE_STATUS_SHORT_LABELS[phase.status]}</span>
      </div>
      <h3 className="card-title">
        <Link to={to}>{phase.title}</Link>
      </h3>
      <p className="card-body">{phase.summary}</p>
      {phase.donationsOpen && <span className="tag tag-accent phase-card-open">முன்பதிவுகள் ஏற்றுக்கொள்ளப்படுகின்றன</span>}
      <ProgressBar label="கட்டுமானம் பூர்த்தியான வகுப்பறைகள்" value={stats.completed} total={stats.total} />
      <ProgressBar label="நிதி திரட்டப்பட்டுள்ள வகுப்பறைகள்" value={stats.booked} total={stats.total} />
      <div className="card-footer">
        <Link to={to} className="link-arrow">
          மேலதிக விபரங்கள் <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
