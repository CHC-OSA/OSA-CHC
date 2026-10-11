import { HugeiconsIcon } from "@hugeicons/react";

// Sized in em so the surrounding CSS font-size controls it; decorative unless aria-hidden is overridden.
export default function Icon({ icon, size = "1em", strokeWidth = 2, ...rest }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} color="currentColor" aria-hidden="true" {...rest} />;
}
