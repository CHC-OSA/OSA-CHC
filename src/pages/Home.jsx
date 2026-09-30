import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import ImageSlider from "../components/ui/ImageSlider";
import StatStrip from "../components/ui/StatStrip";
import Button from "../components/ui/Button";
import { EventCardWithPhoto } from "../components/events/EventCard";
import { getRecentEvents } from "../data/events";
import { DevelopmentCardWithPhoto } from "../components/developments/DevelopmentCard";
import { getRecentDevelopments } from "../data/developments";

const STATS = [
  { value: "1960", label: "ஸ்தாபிக்கப்பட்ட ஆண்டு" },
  { value: "470+", label: "பதிவுசெய்த பழைய மாணவர்கள்" },
  { value: "7", label: "நாடுகளில் கிளைகள்" },
  { value: "66", label: "ஆண்டுகால பாரம்பரியம்" },
];

const WHY_JOIN = [
  {
    n: "01",
    title: "பழைய நண்பர்களுடன் இணைப்பு",
    text: "உங்கள் வகுப்பு தோழர்களையும் ஆசிரியர்களையும் மீண்டும் சந்தியுங்கள், ஆண்டுதோறும் நடைபெறும் ஒன்று கூடல்களில் பங்குபற்றுங்கள் .",
  },
  {
    n: "02",
    title: "பாடசாலை அபிவிருத்திகளில் பங்களிப்பு",
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
    <div className="home">
      <ImageSlider />

      <div className="container">
        <section className="home-intro">
          <div>
            <span className="eyebrow eyebrow-gold">பழைய மாணவர் சங்கம் ஸ்தாபிக்கப்பட்டது- 1960</span>
            <h1>நினைவுகளால் இணைந்தோம், சேவையால் வளர்கிறோம்.</h1>
            <p className="lead">
              சாவகச்சேரி இந்துக் கல்லூரியின் பழைய மாணவர் சங்கமானது உலகெங்கும் வாழும் பழைய மாணவர்களை இணைத்து எமது பாடசாலையின் தொடர்ச்சியான வளர்ச்சிக்காக உழைத்து வருகிறது.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {/* <Button as="link" to="/join" variant="primary">உறுப்பினராகுங்கள்</Button> */}
              <Button as="link" to="/about" variant="secondary">
                எமது வரலாறு <FiArrowRight aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div aria-label="புள்ளிவிபரங்கள்">
            <StatStrip stats={STATS} />
          </div>
        </section>

        <section className="page-section">
          <div className="section-head">
            <h2 className="section-title">ஏன் உறுப்பினராக வேண்டும்?</h2>
          </div>
          <div className="grid-3">
            {WHY_JOIN.map((item) => (
              <div key={item.n} className="card">
                <span className="feature-num">{item.n}</span>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-body">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="page-section">
          <div className="section-head">
            <h2 className="section-title">சமீபத்திய செய்திகள்</h2>
            <Link to="/events" className="link-arrow">
              அனைத்தையும் காண <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="grid-3">
            {getRecentEvents(3).map((event) => (
              <EventCardWithPhoto key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section className="page-section">
          <div className="section-head">
            <h2 className="section-title">சமீபத்திய அபிவிருத்திகள்</h2>
            <Link to="/developments" className="link-arrow">
              அனைத்தையும் காண <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="grid-3">
            {getRecentDevelopments(3).map((development) => (
              <DevelopmentCardWithPhoto key={development.id} development={development} />
            ))}
          </div>
        </section>

        {/* <section className="grid-2" style={{ alignItems: "center", padding: "56px 0 64px" }}>
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
        </section> */}

        <section className="page-section">
          <div className="cta-band">
            <div>
              <span className="eyebrow">உறுப்பினர் பதிவு</span>
              <h2>எங்கள் பாரம்பரியத்தில் பங்கு கொள்ளுங்கள்.</h2>
            </div>
            <div className="cta-band-actions">
              <Button as="link" to="/join" variant="light">
                இப்போதே பதிவு செய்யுங்கள் <FiArrowRight aria-hidden="true" />
              </Button>
              <Button as="link" to="/contact" variant="outline-light">
                தொடர்பு
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
