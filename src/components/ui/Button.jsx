import { Link } from "react-router";

function classes(variant, pill, block, className) {
  return [
    "btn",
    variant && `btn-${variant}`,
    pill && "btn-pill",
    block && "btn-block",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button({
  as = "button",
  variant = "primary",
  pill = false,
  block = false,
  className,
  children,
  to,
  href,
  ...rest
}) {
  const cls = classes(variant, pill, block, className);

  if (as === "link") {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={rest.type || "button"} className={cls} {...rest}>
      {children}
    </button>
  );
}
