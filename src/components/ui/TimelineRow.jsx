export default function TimelineRow({ year, text }) {
  return (
    <div className="milestone">
      <span className="milestone-year">{year}</span>
      <p className="milestone-text">{text}</p>
    </div>
  );
}
