export default function DevelopmentTimeline({ entries }) {
  return (
    <div className="timeline">
      {entries.map((entry) => (
        <div key={`${entry.date}-${entry.label}`} className="timeline-item">
          <span className="timeline-dot" />
          <p className="timeline-date">{entry.date}</p>
          <h3 className="timeline-label">{entry.label}</h3>
          <p className="timeline-text">{entry.description}</p>
        </div>
      ))}
    </div>
  );
}
