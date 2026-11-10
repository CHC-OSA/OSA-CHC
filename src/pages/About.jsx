import { Clock01Icon, Flag02Icon, Target02Icon, ViewIcon } from "@hugeicons/core-free-icons";
import Icon from "../components/ui/Icon";
import PageHero from "../components/layout/PageHero";
import PlaceholderImage from "../components/ui/PlaceholderImage";
import TimelineRow from "../components/ui/TimelineRow";
import Card from "../components/ui/Card";
import presidentPhoto from "../assets/Principal.jpg";
import secretaryPhoto from "../assets/Secretary.jpg";

const OBJECTIVES = [
  {
    n: "i.",
    text: "இப்பாடசாலை அன்னையின் சிறப்பியல்புகளையும் பாடசாலையின் பெருமைகளையும் மேம்படுத்துவதற்காக அதிபருக்கு ஆலோசனையும் ஒத்துழைப்பும் வழங்கல்.",
  },
  {
    n: "ii.",
    text: "பாடசாலையின் நடவடிக்கைகளுக்கான நிதி மூலங்களையும் வளங்களையும் வசதிகளையும் அதிபரூடாகக் கிடைக்கச் செய்தல்.",
  },
  {
    n: "iii.",
    text: "பாடசாலையின் உறுப்பினர்களிடையே உணர்வுபூர்வமான நெருங்கிய உறவை மேம்படுத்தல்.",
  },
];

const MILESTONES = [
  { year: "1904", text: "பாடசாலை நிறுவப்பட்டது" },
  { year: "1960", text: "பழைய மாணவர் ஆசிரியர் சங்கம் நிறுவப்பட்டது" },
  { year: "2004", text: "நூற்றாண்டு விழாக் கொண்டாட்டம்" },
  // { year: "2024", text: "பன்னாட்டு பழைய மாணவர் இணைப்பு வலையமைப்பு தொடக்கம்" },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="எம்மைப் பற்றி" title="எமது வரலாறும் நோக்கமும்" />

      <div className="container page-body page-stack">
        <section className="panel">
          <p className="lead">
            1904ஆம் ஆண்டு நிறுவப்பட்ட சாவகச்சேரி இந்துக் கல்லூரி, யாழ்ப்பாண மாவட்டத்தின் மிகப் பழைமையும் புகழும் வாய்ந்த கல்வி நிலையங்களுள் ஒன்றாகும். கடந்த நூற்றியிருபது ஆண்டுகளுக்கும் மேலாக ஆயிரக்கணக்கான மாணவர்களுக்குக் கல்வியை வழங்கி, சமூகத்தின் பல்வேறு துறைகளிலும் சிறந்து விளங்கும் தலைவர்களை இக்கல்லூரி உருவாக்கியுள்ளது. எமது பாடசாலையின் அபிவிருத்திப் பணிகளை முன்னெடுக்கும் பொருட்டும் பழைய மாணவர்களை ஒன்றிணைக்கும் பொருட்டும் எமது பழைய மாணவர் ஆசிரியர் சங்கம் 1960ஆம் ஆண்டு நிறுவப்பட்டது.
          </p>
        </section>

        <div className="grid-2">
          <section className="panel">
            <h2 className="panel-title">
              <span className="icon-badge" aria-hidden="true">
                <Icon icon={ViewIcon} />
              </span>
              தூரநோக்கு
            </h2>
            <blockquote className="vm-quote">&ldquo;அதி சிறந்த பாடசாலையாக உயர்த்துவதற்கான உச்சமான ஒத்துழைப்பு&rdquo;</blockquote>
          </section>
          <section className="panel">
            <h2 className="panel-title">
              <span className="icon-badge" aria-hidden="true">
                <Icon icon={Target02Icon} />
              </span>
              பணிக்கூற்று
            </h2>
            <p className="prose">
              பழைய மாணவர், ஆசிரியர் உறவை வளர்ப்பதனூடாக வாண்மைத்துவ ஆலோசனைகளையும் உதவிகளையும் வழங்கி, ஒருங்கிணைந்து பாடசாலையை வளர்த்தல்.
            </p>
          </section>
        </div>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <Icon icon={Flag02Icon} />
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
              <Icon icon={Clock01Icon} />
            </span>
            வரலாற்றுக் காலவரிசை
          </h2>
          <div className="grid-3">
            {MILESTONES.map((milestone) => (
              <TimelineRow key={milestone.year} year={milestone.year} text={milestone.text} />
            ))}
          </div>
        </section>

        <section className="grid-2 leader">
          <figure className="leader-photo">
            <PlaceholderImage aspectRatio="4/3" src={presidentPhoto} alt="பழைய மாணவர் ஆசிரியர் சங்கத் தலைவர்" />
          </figure>
          <Card
            kicker="தலைவரின் செய்தி"
            title="பழைய மாணவர் ஆசிரியர் சங்கத் தலைவர்"
            body="எமது பாடசாலையின் பெருமையையும் வளர்ச்சியையும் தொடர்ந்து கட்டியெழுப்புவதே எமது சங்கத்தின் பிரதான இலக்காகும். முன்னாள், இந்நாள் மாணவர்களுக்கிடையிலான பிணைப்பும் உங்கள் தொடர்ச்சியான பங்களிப்புமே எமது பாடசாலையை மேன்மேலும் உயர்வடையச் செய்யும்."
            meta="— தலைவர், பழைய மாணவர் ஆசிரியர் சங்கம்"
          />
        </section>

        <section className="grid-2 leader">
          <figure className="leader-photo">
            <PlaceholderImage aspectRatio="4/3" src={secretaryPhoto} alt="பழைய மாணவர் ஆசிரியர் சங்கச் செயலாளர்" />
          </figure>
          <Card
            kicker="செயலாளரின் செய்தி"
            title="பழைய மாணவர் ஆசிரியர் சங்கச் செயலாளர்"
            body="எமது பாடசாலையின் விழுமியங்களையும் பாரம்பரியத்தையும் அடுத்த தலைமுறைக்கும் கையளிப்பதே எமது சங்கத்தின் பிரதான நோக்கமாகும். ஒவ்வோர் உறுப்பினரின் ஆதரவுமே இந்நோக்கத்தை நிறைவேற்ற வழிவகுக்கின்றது."
            meta="— செயலாளர், பழைய மாணவர் ஆசிரியர் சங்கம்"
          />
        </section>
      </div>
    </>
  );
}
