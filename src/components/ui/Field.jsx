export default function Field({ label, id, type = "text", rows, className, style, ...rest }) {
  const cls = ["field", className].filter(Boolean).join(" ");

  return (
    <div className={cls} style={style}>
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea className="input" id={id} rows={rows || 2} {...rest} />
      ) : (
        <input className="input" id={id} type={type} {...rest} />
      )}
    </div>
  );
}
