import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const SWIPE_PX = 50;

// Full-screen viewer for one photo out of `photos`; the parent owns `index` and unmounts this to close it.
export default function Lightbox({ photos, index, alt, onChange, onClose }) {
  const count = photos.length;
  const touchStartX = useRef(null);
  const closeRef = useRef(null);

  const go = (step) => onChange((index + step + count) % count);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onChange((index - 1 + count) % count);
      else if (e.key === "ArrowRight") onChange((index + 1) % count);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [index, count, onChange, onClose]);

  // Lock the page behind the viewer, and hand focus back to the photo that opened it.
  useEffect(() => {
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const moved = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (count > 1 && Math.abs(moved) > SWIPE_PX) go(moved < 0 ? 1 : -1);
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      <img key={photos[index]} src={photos[index]} alt={`${alt} — ${index + 1}`} className="lightbox-image" />
      <button type="button" className="slider-arrow lightbox-close" aria-label="மூடு" ref={closeRef} onClick={onClose}>
        <FiX aria-hidden="true" />
      </button>
      {count > 1 && (
        <>
          <button type="button" className="slider-arrow slider-prev" aria-label="முந்தையது" onClick={() => go(-1)}>
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="slider-arrow slider-next" aria-label="அடுத்தது" onClick={() => go(1)}>
            <FiChevronRight aria-hidden="true" />
          </button>
        </>
      )}
      <span className="lightbox-count">
        {index + 1} / {count}
      </span>
    </div>
  );
}
