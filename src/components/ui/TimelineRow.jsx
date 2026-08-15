export default function TimelineRow({ year, text, borderBottom = false }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px minmax(0,1fr)",
        gap: 24,
        alignItems: "baseline",
        padding: "22px 0",
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
