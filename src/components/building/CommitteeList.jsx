import { UserGroupIcon, UserIcon } from "@hugeicons/core-free-icons";
import Icon from "../ui/Icon";

// The project's committees, one card each with the chair first, then the coordinator in a highlighted strip.
export default function CommitteeList({ coordinator, committees }) {
  return (
    <>
      <div className="grid-2 committee-grid">
        {committees.map((committee) => (
          <article key={committee.id} className="committee-card">
            <h3 className="committee-title">
              <Icon icon={UserGroupIcon} />
              <span className="committee-title-text">{committee.title}</span>
              <span className="committee-count">{committee.members.length} பேர்</span>
            </h3>
            <ol className="committee-members">
              {committee.members.map((member) => (
                <li key={member.name} className={member.role === "தலைவர்" ? "is-chair" : undefined}>
                  <div className="committee-member-head">
                    <span className="committee-name">{member.name}</span>
                    {member.role === "தலைவர்" && <span className="tag tag-accent-2">தலைவர்</span>}
                  </div>
                  {member.note && <p className="committee-note">{member.note}</p>}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      <div className="committee-coordinator">
        <span className="icon-badge" aria-hidden="true">
          <Icon icon={UserIcon} />
        </span>
        <div>
          <p className="committee-coordinator-label">{coordinator.title}</p>
          <p className="committee-name">{coordinator.name}</p>
          {coordinator.note && <p className="committee-note">{coordinator.note}</p>}
        </div>
      </div>
    </>
  );
}
