import { useEffect, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import schoolFront from "../../assets/school-front.jpg";
import hBlock from "../../assets/H-block.jpg";
import entrance from "../../assets/Entrance.jpg";

const SLIDES = [
  { id: "slide-school-front", caption: "பாடசாலை முகப்புக் கட்டிடம்", image: schoolFront },
  { id: "slide-h-block", caption: "H-block கட்டிடம்", image: hBlock },
  { id: "slide-entrance", caption: "பாடசாலை நுழைவாயில்", image: entrance },
];

const AUTOPLAY_MS = 2000;

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const goPrev = () => setIndex((current) => (current + SLIDES.length - 1) % SLIDES.length);
  const goNext = () => setIndex((current) => (current + 1) % SLIDES.length);

  return (
    <section
      style={{ position: "relative", width: "100%", aspectRatio: "16/6", overflow: "hidden" }}
      aria-label="பாடசாலைப் புகைப்பட ஸ்லைடர்"
    >
      {SLIDES.map((slide, i) => (
        <PlaceholderImage
          key={slide.id}
          shape="rect"
          caption={slide.caption}
          src={slide.image}
          alt={slide.caption}
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            opacity: i === index ? 1 : 0,
            transition: "opacity .5s",
          }}
        />
      ))}
      <button
        type="button"
        aria-label="முந்தையது"
        onClick={goPrev}
        style={arrowStyle({ left: 16 })}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="அடுத்தது"
        onClick={goNext}
        style={arrowStyle({ right: 16 })}
      >
        →
      </button>
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8 }}>
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`புகைப்படம் ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: i === index ? "var(--color-bg)" : "color-mix(in srgb, var(--color-bg) 45%, transparent)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function arrowStyle(position) {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "2px solid var(--color-bg)",
    background: "color-mix(in srgb, var(--color-text) 40%, transparent)",
    color: "var(--color-bg)",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...position,
  };
}
