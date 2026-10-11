export default function ProgressBar({ label, value, total }) {
  const percent = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="build-progress">
      <div className="build-progress-head">
        <span>{label}</span>
        <span className="build-progress-count">
          {value} / {total}
        </span>
      </div>
      <div className="build-progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={value}>
        <div className="build-progress-bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
