import PlaceholderImage from "../components/ui/PlaceholderImage";
import TimelineRow from "../components/ui/TimelineRow";
import Card from "../components/ui/Card";
import presidentPhoto from "../assets/Principal.jpg";
import secretaryPhoto from "../assets/Secretary.jpg";

const OBJECTIVES = [
  {
    n: "i.",
    text: "இப்பாடசாலை அன்னையின் சிறப்பியல்புகளையும், பாடசாலையின் பெருமைகளையும், மேம்படுத்துவதற்காக அதிபருக்கு ஆலோசனையும், ஒத்துழைப்பும் வழங்கல்.",
  },
  {
    n: "ii.",
    text: "பாடசாலையின் நடவடிக்கைகளுக்கான நிதி மூலங்களையும் வளங்கள், வசதிகளையும் அதிபரூடாக கிடைக்கச் செய்தல்.",
  },
  {
    n: "iii.",
    text: "பாடசாலையின் உறுப்பினர்களிற்கிடையில் உணர்வு பூர்வமான நெருங்கிய உறவை மேம்படுத்தல்.",
  },
];

const MILESTONES = [
  { year: "1904", text: "பாடசாலை நிறுவப்பட்டது" },
  { year: "1960", text: "பழைய மாணவர் சங்கம் ஆரம்பிக்கப்பட்டது" },
  { year: "2004", text: "நூற்றாண்டு விழா கொண்டாட்டம்" },
  // { year: "2024", text: "பன்னாட்டு பழைய மாணவர் இணைப்பு வலையமைப்பு தொடக்கம்" },
];

export default function About() {
  return (
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 72px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        எங்களைப் பற்றி
      </span>
      <h1 style={{ fontSize: "clamp(30px,4vw,46px)", margin: "0 0 24px", maxWidth: "18ch" }}>
        எமது வரலாறும் நோக்கமும்
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: "72ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)", margin: "0 0 40px" }}>
        1904 ஆம் ஆண்டு நிறுவப்பட்ட சாவகச்சேரி இந்துக் கல்லூரி, யாழ்ப்பாண மாவட்டத்தின் மிகவும் பழமையான மற்றும் புகழ்பெற்ற கல்வி நிலையங்களில் ஒன்றாகும். கடந்த நூற்றியிருபது ஆண்டுகளுக்கும் மேலாக, ஆயிரக்கணக்கான மாணவர்களுக்குக் கல்வி வழங்கி, சமூகத்தின் பல்வேறு துறைகளிலும் சிறந்து விளங்கும் தலைவர்களை உருவாக்கியுள்ளது. எமது பாடசாலையின் அபிவிருத்தி பணிகளை முன்னெடுக்கும் பொருட்டும் பழைய மாணவர்களை ஒன்றிணைக்கும் பொருட்டும் எமது பழைய மாணவர் சங்கமானது 1957 இல் ஸ்தாபிக்கப்பட்டது.
      </p>

      <hr className="hr" />

      <section style={{ padding: "0 0 48px" }}>
        <div className="grid-2" style={{ marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 22, letterSpacing: "-0.01em", color: "var(--color-accent-700)", margin: "0 0 12px", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
              தூரநோக்கு
            </p>
            <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
              &ldquo;அதி சிறந்த பாடசாலையாக உயர்த்துவதற்கான உச்சமான ஒத்துழைப்பு&rdquo;
            </blockquote>
          </div>
          <div>
            <p style={{ fontSize: 22, letterSpacing: "-0.01em", color: "var(--color-accent-700)", margin: "0 0 12px", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
              பணிக்கூற்று
            </p>
            <p style={{ fontSize: "15.5px", lineHeight: 1.7, margin: 0, color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>
              பழைய மாணவர் ஆசிரியரின் உறவை வளர்ப்பதன் ஊடாக வாண்மைத்துவ ஆலோசனைகளையும் உதவிகளையும் வழங்கி ஒருங்கிணைந்து பாடசாலையை வளர்த்தல்.
            </p>
          </div>
        </div>

        <p style={{ fontSize: 22, letterSpacing: "-0.01em", color: "var(--color-accent-700)", margin: "0 0 16px", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
          நோக்கங்கள்
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          {OBJECTIVES.map((item) => (
            <div key={item.n} style={{ display: "flex", gap: 12 }}>
              <span style={{ fontWeight: 700, color: "var(--color-accent)" }}>{item.n}</span>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr" />

      <section style={{ padding: "32px 0" }}>
        <p style={{ fontSize: 22, letterSpacing: "-0.01em", color: "var(--color-accent-700)", margin: "0 0 24px", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
          முக்கிய கால கட்டங்கள்
        </p>
        {MILESTONES.map((milestone, i) => (
          <TimelineRow
            key={milestone.year}
            year={milestone.year}
            text={milestone.text}
            borderBottom={i === MILESTONES.length - 1}
          />
        ))}
      </section>

      <section className="grid-2" style={{ alignItems: "center", padding: "44px 0 12px" }}>
        <figure style={{ margin: 0 }}>
          <PlaceholderImage aspectRatio="4/3" src={presidentPhoto} alt="பழைய மாணவர் சங்கத் தலைவர்" />
        </figure>
        <Card
          kicker="தலைவரின் செய்தி"
          kickerColor="var(--color-accent-2-700)"
          title="பழைய மாணவர் சங்கத் தலைவர்"
          body="எமது பாடசாலையின் மதிப்புகளையும் பாரம்பரியத்தையும் அடுத்த தலைமுறைக்கும் கொண்டு செல்வதே எமது சங்கத்தின் முதன்மையான நோக்கம். ஒவ்வொரு உறுப்பினரின் ஆதரவும் இதை மெய்யாக்குகிறது."
          meta="— தலைவர், பழைய மாணவர் சங்கம்"
        />
      </section>

      <section className="grid-2" style={{ alignItems: "center", padding: "44px 0 12px" }}>
        <figure style={{ margin: 0 }}>
          <PlaceholderImage aspectRatio="4/3" src={secretaryPhoto} alt="பழைய மாணவர் சங்க செயலாளர்" />
        </figure>
        <Card
          kicker="செயலாளரின் செய்தி"
          kickerColor="var(--color-accent-2-700)"
          title="பழைய மாணவர் சங்க செயலாளர்"
          body="எமது பாடசாலையின் மதிப்புகளையும் பாரம்பரியத்தையும் அடுத்த தலைமுறைக்கும் கொண்டு செல்வதே எமது சங்கத்தின் முதன்மையான நோக்கம். ஒவ்வொரு உறுப்பினரின் ஆதரவும் இதை மெய்யாக்குகிறது."
          meta="— செயலாளர், பழைய மாணவர் சங்கம்"
        />
      </section>
    </div>
  );
}
