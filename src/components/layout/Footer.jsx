import { Link } from "react-router";
import crest from "../../assets/chc-crest.jpg";
import { CONTACT_INFO } from "../../data/constants";

const QUICK_LINKS = [
  { to: "/about", label: "எங்களைப் பற்றி" },
  { to: "/events", label: "நிகழ்வுகள்" },
  { to: "/developments", label: "அபிவிருத்திகள்" },
  { to: "/join", label: "உறுப்பினராகுங்கள்" },
  { to: "/directory", label: "உறுப்பினர் பட்டியல்" },
  { to: "/gallery", label: "படத்தொகுப்பு" },
];

const SOCIALS = [
  { label: "Facebook", glyph: "f" },
  { label: "YouTube", glyph: "▶" },
  { label: "Instagram", glyph: "◎" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container grid-4" style={{ padding: "52px clamp(20px,4vw,48px) 28px" }}>
        <div>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, marginBottom: 12 }}>
            <img src={crest} alt="CHC crest" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
            சாவகச்சேரி இந்துக் கல்லூரி OSA
          </span>
          <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "color-mix(in srgb, var(--color-bg) 72%, transparent)", margin: 0, maxWidth: "32ch", fontStyle: "italic" }}>
            &ldquo;நலம் நாடுக, அறம் புரிக, புகழ் ஒளிர்க&rdquo;
          </p>
        </div>

        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-2)", margin: "0 0 14px" }}>
            விரைவு இணைப்புகள்
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {QUICK_LINKS.map((link) => (
              <Link key={link.to} to={link.to} style={{ fontSize: "13.5px" }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-2)", margin: "0 0 14px" }}>
            தொடர்பு
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: "13.5px", color: "color-mix(in srgb, var(--color-bg) 85%, transparent)" }}>
            <span>{CONTACT_INFO.address}</span>
            <span>{CONTACT_INFO.phone}</span>
            <span>{CONTACT_INFO.email}</span>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-2)", margin: "0 0 14px" }}>
            பின்தொடருங்கள்
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {SOCIALS.map((social) => (
              <a key={social.label} href="#" aria-label={social.label} className="social-icon">
                {social.glyph}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom" style={{ padding: "20px clamp(20px,4vw,48px)" }}>
        © 2026 பழைய மாணவர் சங்கம். அனைத்து உரிமைகளும் காக்கப்பட்டவை.
      </div>
    </footer>
  );
}
