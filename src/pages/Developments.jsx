import { DevelopmentCardWithPhoto } from "../components/developments/DevelopmentCard";
import { DEVELOPMENTS } from "../data/developments";

export default function Developments() {
  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        பாடசாலை அபிவிருத்திப் பணிகள்
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 16px" }}>தற்போதைய அபிவிருத்திப் பணிகள்</h1>
      <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 78%, transparent)", margin: "0 0 36px", maxWidth: "62ch" }}>
        பழைய மாணவர் சங்கத்தின் ஆதரவுடன் பாடசாலையில் நடைபெறும் கட்டிட, வசதி மேம்பாட்டுத் திட்டங்களும், அவற்றின் அபிவிருத்தி காலவரைவும் இங்கே காணப்படுகின்றன.
      </p>
      <div className="grid-3">
        {DEVELOPMENTS.map((development) => (
          <DevelopmentCardWithPhoto key={development.id} development={development} />
        ))}
      </div>
    </div>
  );
}
