import { FiCheck } from "react-icons/fi";
import { CONSTRUCTION_LABELS, FLOOR_LABELS, PHASES } from "../../data/building";

const FLOORS_TOP_DOWN = [2, 1, 0];

// The building's front, classrooms only: one row per floor, one block per phase.
export default function ClassroomGrid({ classrooms }) {
  const phases = PHASES.filter((phase) => classrooms.some((room) => room.phase === phase.id));

  return (
    <div className="room-grid-wrap">
      <div className="room-grid-scroll">
        <div className="room-grid" style={{ minWidth: 130 + (classrooms.length / 3) * 40 }}>
          <div className="room-floors" aria-hidden="true">
            {FLOORS_TOP_DOWN.map((floor) => (
              <span key={floor}>{FLOOR_LABELS[floor]}</span>
            ))}
          </div>
          {phases.map((phase) => (
            <div key={phase.id} className="room-phase" style={{ flexGrow: phase.bays.length }}>
              <p className="room-phase-title">{phase.title}</p>
              <div className="room-cells" style={{ gridTemplateColumns: `repeat(${phase.bays.length}, minmax(0, 1fr))` }}>
                {FLOORS_TOP_DOWN.flatMap((floor) =>
                  classrooms
                    .filter((room) => room.phase === phase.id && room.floor === floor)
                    .map((room) => {
                      const label = `வகுப்பறை ${room.number} — ${FLOOR_LABELS[room.floor]} — ${CONSTRUCTION_LABELS[room.construction]} — ${
                        room.booked ? "நிதி திரட்டப்பட்டுள்ளது" : "நிதி திரட்டப்படவில்லை"
                      }`;
                      return (
                        <div key={room.id} className={`room room-${room.construction}${room.booked ? " is-booked" : ""}`} role="img" aria-label={label} title={label}>
                          {room.number}
                          {room.booked && (
                            <span className="room-booked" aria-hidden="true">
                              <FiCheck />
                            </span>
                          )}
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="room-legend">
        <li>
          <span className="room room-pending" aria-hidden="true" /> {CONSTRUCTION_LABELS.pending}
        </li>
        <li>
          <span className="room room-ongoing" aria-hidden="true" /> {CONSTRUCTION_LABELS.ongoing}
        </li>
        <li>
          <span className="room room-completed" aria-hidden="true" /> {CONSTRUCTION_LABELS.completed}
        </li>
        <li>
          <span className="room-booked" aria-hidden="true">
            <FiCheck />
          </span>{" "}
          நிதி திரட்டப்பட்டுள்ளது
        </li>
      </ul>
    </div>
  );
}
