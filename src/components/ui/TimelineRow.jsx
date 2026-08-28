export default function TimelineRow({ year, text, borderBottom = false }) {
  return (
    <div
      className="timeline-row"
      style={{
        borderTop: "2px solid var(--color-divider)",
        borderBottom: borderBottom ? "2px solid var(--color-divider)" : undefined,
      }}
    >
      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, margin: 0 }}>{year}</p>
      <p style={{ margin: 0, fontSize: "15.5px", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
        {text}
      </p>
    </div>
  );
}
