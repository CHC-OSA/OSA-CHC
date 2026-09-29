// Shows a trailing " *" as a styled marker; the input's `required` attribute is what screen readers announce.
export function LabelText({ text }) {
  if (typeof text !== "string" || !text.endsWith(" *")) return text;
  return (
    <>
      {text.slice(0, -2)}{" "}
      <span className="req" aria-hidden="true">
        *
      </span>
    </>
  );
}

export default function Field({ label, id, type = "text", rows, className, style, error, children, ...rest }) {
  const cls = ["field", className].filter(Boolean).join(" ");
  const errorId = error ? `${id}-error` : undefined;
  const inputProps = { className: "input", id, "aria-invalid": error ? true : undefined, "aria-describedby": errorId, ...rest };

  return (
    <div className={cls} style={style}>
      <label htmlFor={id}>
        <LabelText text={label} />
      </label>
      {type === "textarea" ? (
        <textarea rows={rows || 2} {...inputProps} />
      ) : type === "select" ? (
        <select {...inputProps}>{children}</select>
      ) : (
        <input type={type} {...inputProps} />
      )}
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
