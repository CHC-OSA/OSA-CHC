import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import PlaceholderImage from "../ui/PlaceholderImage";
import Lightbox from "../ui/Lightbox";

export default function SiteUpdates({ updates }) {
  // { update, index } of the photo open in the lightbox.
  const [open, setOpen] = useState(null);

  if (updates.length === 0) {
    return <p className="text-muted" style={{ margin: 0 }}>கட்டுமானப் பணிகளின் புகைப்படங்கள் விரைவில் பதிவேற்றப்படும்.</p>;
  }

  return (
    <div className="site-updates">
      {updates.map((update, u) => (
        <div key={update.date}>
          <p className="site-update-head">
            <FiCalendar aria-hidden="true" /> {update.label}
            {update.caption && <span> — {update.caption}</span>}
          </p>
          <div className="media-grid">
            {update.photos.map((photo, i) => (
              <button key={photo} type="button" className="media-tile" aria-label={`${update.label} புகைப்படம் ${i + 1}`} onClick={() => setOpen({ update: u, index: i })}>
                <PlaceholderImage aspectRatio="3/2" src={photo} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      ))}
      {open && (
        <Lightbox
          photos={updates[open.update].photos}
          index={open.index}
          alt={`கட்டுமானத் தளம் ${updates[open.update].label}`}
          onChange={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
