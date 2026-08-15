import { Link } from "react-router";
import ImageSlider from "../components/ui/ImageSlider";
import StatStrip from "../components/ui/StatStrip";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import Button from "../components/ui/Button";
import { EventCard } from "../components/events/EventCard";
import { getRecentEvents } from "../data/events";
import { DevelopmentCard } from "../components/developments/DevelopmentCard";
import { getRecentDevelopments } from "../data/developments";

const STATS = [
  { value: "1904", label: "ஸ்தாபிக்கப்பட்ட ஆண்டு" },
  { value: "470+", label: "பதிவுசெய்த பழைய மாணவர்கள்" },
  { value: "45", label: "நாடுகளில் வாழும் உறுப்பினர்கள்" },
  { value: "122", label: "ஆண்டுகால பாரம்பரியம்" },
];

const WHY_JOIN = [
  {
    n: "01",
    title: "பழைய நண்பர்களுடன் இணைப்பு",
    text: "உங்கள் வகுப்பு தோழர்களையும் ஆசிரியர்களையும் மீண்டும் சந்தியுங்கள், ஆண்டுதோறும் நடைபெறும் மறுசந்திப்பு நிகழ்வுகளில் பங்குபற்றுங்கள் .",
  },
  {
    n: "02",
    title: "பாடசாலை மேம்பாட்டில் பங்களிப்பு",
    text: "புதிய கட்டிடங்கள், நூலகம், விளையாட்டு வசதிகள் என பாடசாலையின் வளர்ச்சிக்கு உங்கள் பங்களிப்பை வழங்குங்கள் .",
  },
  {
    n: "03",
    title: "சிறப்பு சலுகைகளும் அறிவிப்புகளும்",
    text: "சங்க நிகழ்வுகள், சிறப்பு வெளியீடுகள் மற்றும் உறுப்பினர்களுக்கான தனிச் சலுகைகளைப் பெறுங்கள்.",
  },
];

export default function Home() {
  return (
    <div>
      <ImageSlider />

      <div className="container">
        <section style={{ padding: "64px 0 48px" }}>
          <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-2-700)", marginBottom: 14 }}>
            பழைய மாணவர் சங்கம் ஸ்தாபிக்கப்பட்டது- 1904
          </span>
          <h1 style={{ fontSize: "clamp(34px,5vw,58px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 20px", maxWidth: "16ch" }}>
            நினைவுகளால் இணைந்தோம், சேவையால் வளர்கிறோம்.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, maxWidth: "58ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)", margin: "0 0 28px" }}>
            சாவகச்சேரி இந்துக் கல்லூரியின் பழைய மாணவர் சங்கமானது உலகெங்கும் வாழும் பழைய மாணவர்களை இணைத்து எமது பாடசாலையின் தொடர்ச்சியான வளர்ச்சிக்காக உழைக்கிறது.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button as="link" to="/join" variant="primary">உறுப்பினராகுங்கள்</Button>
            <Button as="link" to="/about" variant="ghost">எமது வரலாறு</Button>
          </div>
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section style={{ padding: "44px 0" }} aria-label="புள்ளிவிபரங்கள்">
          <StatStrip stats={STATS} />
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section style={{ padding: "56px 0 40px" }}>
          <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 28 }}>
            ஏன் உறுப்பினராக வேண்டும்?
          </span>
          <div>
            {WHY_JOIN.map((item, i) => (
              <div
                key={item.n}
                className="numbered-row"
                style={{
                  padding: "26px 0",
                  borderTop: "2px solid var(--color-divider)",
                  borderBottom: i === WHY_JOIN.length - 1 ? "2px solid var(--color-divider)" : undefined,
                }}
              >
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14, margin: 0 }}>{item.n}</p>
                <h3 style={{ fontSize: 22, margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 78%, transparent)", margin: 0, maxWidth: "52ch" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "40px 0 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
            <span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
              சமீபத்திய செய்திகள்
            </span>
            <Link to="/events" style={{ cursor: "pointer", fontSize: "13.5px" }}>அனைத்தையும் காண →</Link>
          </div>
          <div className="grid-3">
            {getRecentEvents(3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section style={{ padding: "0px 0 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22 }}>
            <span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
              சமீபத்திய அபிவிருத்திகள்
            </span>
            <Link to="/developments" style={{ cursor: "pointer", fontSize: "13.5px" }}>அனைத்தையும் காண →</Link>
          </div>
          <div className="grid-3">
            {getRecentDevelopments(3).map((development) => (
              <DevelopmentCard key={development.id} development={development} />
            ))}
          </div>
        </section>

        <hr className="hr" style={{ margin: 0 }} />

        <section className="grid-2" style={{ alignItems: "center", padding: "56px 0 64px" }}>
          <div>
            <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
              எமது பாரம்பரியம்
            </span>
            <h2 style={{ fontSize: 30, lineHeight: 1.2, margin: "0 0 14px" }}>1904 முதல் இன்று வரை</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 78%, transparent)", maxWidth: "48ch", margin: 0 }}>
              இலங்கையின் வடபகுதியின் முன்னணிப் பாடசாலைகளில் ஒன்றான சாவகச்சேரி இந்துக் கல்லூரி, தலைமுறை தலைமுறையாக தலைவர்களையும் சிந்தனையாளர்களையும் உருவாக்கி வருகிறது.
            </p>
          </div>
          <figure className="grayscale" style={{ margin: 0 }}>
            <PlaceholderImage aspectRatio="16/10" caption="பாடசாலைக் கட்டிடப் புகைப்படம்" />
          </figure>
        </section>
      </div>

      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)", borderTop: "6px solid var(--color-accent-2)" }}>
        <div className="container" style={{ padding: "56px clamp(20px,4vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <h3 style={{ fontSize: "clamp(26px,3.4vw,38px)", margin: 0, color: "var(--color-bg)", maxWidth: "20ch" }}>
            எங்கள் பாரம்பரியத்தில் பங்குசேருங்கள்.
          </h3>
          <Button as="link" to="/join" variant="ghost" style={{ color: "var(--color-bg)", borderColor: "var(--color-bg)" }}>
            இப்போதே பதிவு செய்யுங்கள்
          </Button>
        </div>
      </section>
    </div>
  );
}
