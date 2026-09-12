import { useEffect, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import entranceGate from "../../assets/entrance-gate.jpg";
import technologicalFaculty from "../../assets/technological-faculty.jpg";
import facultyBlockRow from "../../assets/faculty-block-row.jpg";
import schoolRoadside from "../../assets/school-roadside.jpg";
import founderStatue from "../../assets/founder-statue.jpg";
import schoolFrontageDusk from "../../assets/school-frontage-dusk.jpg";

const SLIDES = [
  { id: "slide-school-frontage-dusk", caption: "பாடசாலை முகப்பு", image: schoolFrontageDusk },
  { id: "slide-founder-statue", caption: "ஸ்தாபகரின் சிலை", image: founderStatue, objectPosition: "center top" },
  { id: "slide-entrance-gate", caption: "பாடசாலை நுழைவாயில்", image: entranceGate },
  { id: "slide-technological-faculty", caption: "தொழில்நுட்பபீடக் கட்டிடம்", image: technologicalFaculty },
  { id: "slide-school-roadside", caption: "பாடசாலை முகப்பு - வீதி நோக்கு", image: schoolRoadside },
  { id: "slide-faculty-block-row", caption: "தொழில்நுட்பபீடம் மற்றும் அருகாமைக் கட்டிடங்கள்", image: facultyBlockRow },
];

const AUTOPLAY_MS = 4500;

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
            objectPosition: slide.objectPosition || "center",
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
