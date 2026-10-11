import { Link } from "react-router";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import Icon from "../components/ui/Icon";
import ImageSlider from "../components/ui/ImageSlider";
import StatStrip from "../components/ui/StatStrip";
import Button from "../components/ui/Button";
import { EventCardWithPhoto } from "../components/events/EventCard";
import { getRecentEvents } from "../data/events";
import { DevelopmentCardWithPhoto } from "../components/developments/DevelopmentCard";
import { getRecentDevelopments } from "../data/developments";

const STATS = [
  { value: "1960", label: "நிறுவப்பட்ட ஆண்டு" },
  { value: "470+", label: "பதிவுசெய்த பழைய மாணவர்கள்" },
  { value: "7", label: "நாடுகளில் கிளைகள்" },
  { value: "66", label: "ஆண்டுகாலப் பாரம்பரியம்" },
];

const WHY_JOIN = [
  {
    n: "01",
    title: "பழைய நண்பர்களுடனான மீளிணைவு",
    text: "உங்கள் வகுப்புத் தோழர்களையும் ஆசிரியர்களையும் மீண்டும் சந்திக்கவும், ஆண்டுதோறும் நடைபெறும் ஒன்றுகூடல்களில் பங்குபற்றவும் வாய்ப்புக் கிடைக்கும்.",
  },
  {
    n: "02",
    title: "பாடசாலை அபிவிருத்தியில் பங்களிப்பு",
    text: "புதிய கட்டடங்கள், நூலகம், விளையாட்டு வசதிகள் எனப் பாடசாலையின் வளர்ச்சிக்கு உங்கள் பங்களிப்பை வழங்கலாம்.",
  },
  {
    n: "03",
    title: "சிறப்புச் சலுகைகளும் அறிவிப்புகளும்",
    text: "சங்க நிகழ்வுகள், சிறப்பு வெளியீடுகள் பற்றிய அறிவிப்புகளையும் உறுப்பினர்களுக்கான தனிச் சலுகைகளையும் பெற்றுக்கொள்ளலாம்.",
  },
];

export default function Home() {
  return (
    <div className="home">
      <ImageSlider />

      <div className="container">
        <section className="home-intro">
          <div>
            <span className="eyebrow eyebrow-gold">பழைய மாணவர் ஆசிரியர் சங்கம் — நிறுவப்பட்ட ஆண்டு 1960</span>
            <h1>நினைவுகளால் இணைந்தோம், சேவையால் வளர்கிறோம்.</h1>
            <p className="lead">
              சாவகச்சேரி இந்துக் கல்லூரியின் பழைய மாணவர் ஆசிரியர் சங்கம், உலகெங்கும் வாழும் பழைய மாணவர்களை ஒன்றிணைத்து, எமது பாடசாலையின் தொடர்ச்சியான வளர்ச்சிக்காக உழைத்து வருகின்றது.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {/* <Button as="link" to="/join" variant="primary">உறுப்பினர் பதிவு</Button> */}
              <Button as="link" to="/about" variant="secondary">
                எமது வரலாறு <Icon icon={ArrowRight02Icon} />
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
            <h2 className="section-title">அண்மைய நிகழ்வுகள்</h2>
            <Link to="/events" className="link-arrow">
              அனைத்து நிகழ்வுகள் <Icon icon={ArrowRight02Icon} />
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
            <h2 className="section-title">அண்மைய அபிவிருத்திகள்</h2>
            <Link to="/developments" className="link-arrow">
              அனைத்து அபிவிருத்திகள் <Icon icon={ArrowRight02Icon} />
            </Link>
          </div>
          <div className="grid-3">
            {getRecentDevelopments(3).map((development) => (
              <DevelopmentCardWithPhoto key={development.id} development={development} />
            ))}
          </div>
        </section>

        <section className="page-section">
          <div className="cta-band">
            <div>
              <span className="eyebrow">உறுப்பினர் பதிவு</span>
              <h2>எமது பாரம்பரியத்தின் பங்காளராக இணையவும்.</h2>
            </div>
            <div className="cta-band-actions">
              <Button as="link" to="/join" variant="light">
                இப்போதே பதிவு செய்யுங்கள் <Icon icon={ArrowRight02Icon} />
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
