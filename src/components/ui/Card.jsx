export default function Card({ kicker, kickerColor, title, body, meta, elevation, className, children, ...rest }) {
  const cls = ["card", elevation && `elev-${elevation}`, className].filter(Boolean).join(" ");

  return (
    <div className={cls} {...rest}>
      {kicker && (
        <div className="card-kicker" style={kickerColor ? { color: kickerColor } : undefined}>
          {kicker}
        </div>
      )}
      {title && <div className="card-title">{title}</div>}
      {body && <p className="card-body">{body}</p>}
      {meta && (
        <div className="card-meta">
          <span>{meta}</span>
        </div>
      )}
      {children}
    </div>
  );
}
