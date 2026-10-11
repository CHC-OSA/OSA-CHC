import { useParams } from "react-router";
import { FiHeart } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import DonorList from "../components/building/DonorList";
import { getDonorsByPhase, getPhaseById } from "../data/building";
import "../styles/building.css";

export default function BuildingPhaseDonors() {
  const { phaseId } = useParams();
  const phase = getPhaseById(phaseId);

  if (!phase) {
    return <PageHero back={{ to: "/building", label: "கட்டடத் திட்டத்திற்குத் திரும்பு" }} title="இந்தக் கட்டம் கிடைக்கவில்லை." compact />;
  }

  const donors = getDonorsByPhase(phase.id);

  return (
    <>
      <PageHero
        back={{ to: `/building/phase/${phase.id}`, label: `${phase.title} பக்கத்திற்குத் திரும்பு` }}
        eyebrow={`கட்டம் ${phase.id}`}
        title="நன்கொடையாளர்கள்"
        lead="இக்கட்டத்தின் கட்டுமானப் பணிகளுக்கு நன்கொடை வழங்கிய பெருந்தகைகளின் விபரங்களும் அவற்றுக்கான பற்றுச்சீட்டுகளும்."
      />

      <div className="container page-body">
        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiHeart />
            </span>
            {phase.title} — நன்கொடையாளர் பட்டியல்
          </h2>
          {donors.length > 0 ? (
            <DonorList donors={donors} />
          ) : (
            <p className="text-muted" style={{ margin: 0 }}>
              நன்கொடையாளர் விபரங்கள் விரைவில் பதிவேற்றப்படும்.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
