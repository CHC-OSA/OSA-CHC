import { FiClock, FiEye, FiFlag, FiTarget } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
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
    <>
      <PageHero eyebrow="எங்களைப் பற்றி" title="எமது வரலாறும் நோக்கமும்" />

      <div className="container page-body page-stack">
        <section className="panel">
          <p className="lead">
            1904 ஆம் ஆண்டு நிறுவப்பட்ட சாவகச்சேரி இந்துக் கல்லூரி, யாழ்ப்பாண மாவட்டத்தின் மிகவும் பழமையான மற்றும் புகழ்பெற்ற கல்வி நிலையங்களில் ஒன்றாகும். கடந்த நூற்றியிருபது ஆண்டுகளுக்கும் மேலாக, ஆயிரக்கணக்கான மாணவர்களுக்குக் கல்வி வழங்கி, சமூகத்தின் பல்வேறு துறைகளிலும் சிறந்து விளங்கும் தலைவர்களை உருவாக்கியுள்ளது. எமது பாடசாலையின் அபிவிருத்தி பணிகளை முன்னெடுக்கும் பொருட்டும் பழைய மாணவர்களை ஒன்றிணைக்கும் பொருட்டும் எமது பழைய மாணவர் சங்கமானது 1960 இல் ஸ்தாபிக்கப்பட்டது.
          </p>
        </section>

        <div className="grid-2">
          <section className="panel">
            <h2 className="panel-title">
              <span className="icon-badge" aria-hidden="true">
                <FiEye />
              </span>
              தூரநோக்கு
            </h2>
            <blockquote className="vm-quote">&ldquo;அதி சிறந்த பாடசாலையாக உயர்த்துவதற்கான உச்சமான ஒத்துழைப்பு&rdquo;</blockquote>
          </section>
          <section className="panel">
            <h2 className="panel-title">
              <span className="icon-badge" aria-hidden="true">
                <FiTarget />
              </span>
              பணிக்கூற்று
            </h2>
            <p className="prose">
              பழைய மாணவர் ஆசிரியரின் உறவை வளர்ப்பதன் ஊடாக வாண்மைத்துவ ஆலோசனைகளையும் உதவிகளையும் வழங்கி ஒருங்கிணைந்து பாடசாலையை வளர்த்தல்.
            </p>
          </section>
        </div>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiFlag />
            </span>
            நோக்கங்கள்
          </h2>
          <ol className="objectives">
            {OBJECTIVES.map((item) => (
              <li key={item.n}>
                <span className="objectives-num">{item.n}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiClock />
            </span>
            முக்கிய கால கட்டங்கள்
          </h2>
          <div className="grid-3">
            {MILESTONES.map((milestone) => (
              <TimelineRow key={milestone.year} year={milestone.year} text={milestone.text} />
            ))}
          </div>
        </section>

        <section className="grid-2 leader">
          <figure className="leader-photo">
            <PlaceholderImage aspectRatio="4/3" src={presidentPhoto} alt="பழைய மாணவர் சங்கத் தலைவர்" />
          </figure>
          <Card
            kicker="தலைவரின் செய்தி"
            title="பழைய மாணவர் சங்கத் தலைவர்"
            body="எமது பாடசாலையின் பெருமையையும் வளர்ச்சியையும் தொடர்ந்து கட்டியெழுப்புவதே எமது சங்கத்தின் பிரதான இலக்காகும். எமது முன்னாளினதும் இந்நாளினதும் பிணைப்பும், உங்களின் தொடர்ச்சியான பங்களிப்புமே எமது பாடசாலையை புதிய உயரங்களுக்கு கொண்டு செல்லும்."
            meta="— தலைவர், பழைய மாணவர் சங்கம்"
          />
        </section>

        <section className="grid-2 leader">
          <figure className="leader-photo">
            <PlaceholderImage aspectRatio="4/3" src={secretaryPhoto} alt="பழைய மாணவர் சங்க செயலாளர்" />
          </figure>
          <Card
            kicker="செயலாளரின் செய்தி"
            title="பழைய மாணவர் சங்க செயலாளர்"
            body="எமது பாடசாலையின் மதிப்புகளையும் பாரம்பரியத்தையும் அடுத்த தலைமுறைக்கும் கொண்டு செல்வதே எமது சங்கத்தின் முதன்மையான நோக்கம். ஒவ்வொரு உறுப்பினரின் ஆதரவும் இதை மெய்யாக்குகிறது."
            meta="— செயலாளர், பழைய மாணவர் சங்கம்"
          />
        </section>
      </div>
    </>
  );
}
