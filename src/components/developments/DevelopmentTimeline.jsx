import PlaceholderImage from "../ui/PlaceholderImage";

export default function DevelopmentTimeline({ entries }) {
  return (
    <div className="timeline">
      {entries.map((entry) => (
        <div key={`${entry.date}-${entry.label}`} className="timeline-item">
          <span className="timeline-dot" />
          <p className="timeline-date">{entry.date}</p>
          <h3 className="timeline-label">{entry.label}</h3>
          <p className="timeline-text">{entry.description}</p>
          {entry.photos?.length ? (
            <div className="timeline-photos">
              {entry.photos.map((photo, i) => (
                <PlaceholderImage key={i} aspectRatio="4/3" src={photo} alt={entry.label} className="timeline-photo" />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
