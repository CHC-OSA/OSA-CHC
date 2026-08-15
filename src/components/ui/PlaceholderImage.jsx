export default function PlaceholderImage({
  shape = "rect",
  aspectRatio = "4/3",
  caption,
  className,
  style,
  ...rest
}) {
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
