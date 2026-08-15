export default function PlaceholderImage({
  shape = "rect",
  aspectRatio = "4/3",
  caption,
  src,
  alt,
  className,
  style,
  ...rest
}) {
  if (src) {
    const cls = ["photo-image", `shape-${shape}`, className].filter(Boolean).join(" ");
    return (
      <img
        src={src}
        alt={alt || caption || ""}
        className={cls}
        style={{ aspectRatio, width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
        {...rest}
      />
    );
  }

  const cls = ["placeholder-image", `shape-${shape}`, className].filter(Boolean).join(" ");

  return (
    <div
      className={cls}
      style={{ aspectRatio, width: "100%", ...style }}
      role="img"
      aria-label={caption}
      {...rest}
    >
      <span>{caption}</span>
    </div>
  );
}
