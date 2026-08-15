export default function StatStrip({ stats }) {
  return (
    <div className="grid-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(30px,3.2vw,42px)",
              color: "var(--color-accent)",
              margin: "0 0 6px",
            }}
          >
            {stat.value}
          </p>
          <p
            style={{
              fontSize: "12.5px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "color-mix(in srgb, var(--color-text) 65%, transparent)",
              margin: 0,
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
