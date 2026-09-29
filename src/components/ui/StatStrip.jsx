export default function StatStrip({ stats }) {
  return (
    <div className="stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat">
          <p className="stat-value">{stat.value}</p>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
