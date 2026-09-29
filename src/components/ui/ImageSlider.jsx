import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
    <section className="slider" aria-label="பாடசாலைப் புகைப்பட ஸ்லைடர்">
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
            transition: "opacity .6s",
          }}
        />
      ))}
      <button type="button" className="slider-arrow slider-prev" aria-label="முந்தையது" onClick={goPrev}>
        <FiChevronLeft aria-hidden="true" />
      </button>
      <button type="button" className="slider-arrow slider-next" aria-label="அடுத்தது" onClick={goNext}>
        <FiChevronRight aria-hidden="true" />
      </button>
      <div className="slider-footer">
        <div className="slider-dots">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`slider-dot${i === index ? " is-active" : ""}`}
              aria-label={`புகைப்படம் ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
