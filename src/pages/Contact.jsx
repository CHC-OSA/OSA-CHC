import PlaceholderImage from "../components/ui/PlaceholderImage";
import ContactForm from "../components/forms/ContactForm";
import { CONTACT_INFO } from "../data/constants";

export default function Contact() {
  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        தொடர்பு
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 36px" }}>எங்களைத் தொடர்பு கொள்ளுங்கள்</h1>

      <div className="grid-2">
        <div>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: "0 0 6px" }}>முகவரி</h4>
            <p style={{ margin: 0, fontSize: 15, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
              {CONTACT_INFO.address}
            </p>
          </div>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: "0 0 6px" }}>தொலைபேசி</h4>
            <p style={{ margin: 0, fontSize: 15, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
              {CONTACT_INFO.phone}
            </p>
          </div>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: "0 0 6px" }}>மின்னஞ்சல்</h4>
            <p style={{ margin: 0, fontSize: 15, color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
              {CONTACT_INFO.email}
            </p>
          </div>
          <figure className="grayscale" style={{ margin: "24px 0 0" }}>
            <PlaceholderImage aspectRatio="16/10" caption="இருப்பிட வரைபடம்" />
          </figure>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
