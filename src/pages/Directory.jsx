import { FiUser, FiUsers } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import presidentPhoto from "../assets/PrincipalCommittee.jpeg";
import secretaryPhoto from "../assets/SecretaryCommittee.jpeg";
import vicePresidentPhoto from "../assets/vicepresident.jpeg"

const COMMITTEE = [
  { id: "committee-president", name: "திரு. ந.சர்வேஸ்வரன்", role: "தலைவர்", photo: presidentPhoto },
  { id: "committee-vp", name: "திரு. கி. ராகுலன்", role: "துணைத் தலைவர்", photo: vicePresidentPhoto },
  { id: "committee-secretary", name: "திரு. ஆ.தங்கவேலு", role: "செயலாளர்", photo: secretaryPhoto },
  { id: "committee-assistant-secretary", name: "திரு.சு.சுமன்", role: "துணை செயலாளர்"},
  { id: "committee-treasurer", name: "திரு. க.முரளி", role: "பொருளாளர்" },
];

const MEMBERS = [
  { id: "committee-member-1", name: "திரு.வ.கௌசிகன்" },
  { id: "committee-member-2", name: "பு.குகானந்தன்" },
  { id: "committee-member-3", name: "க.தர்சன்" },
  { id: "committee-member-4", name: "ந.ஜதுர்சன்" },
  { id: "committee-member-5", name: "சி.கமலரூபன்" },
  { id: "committee-member-6", name: "க.எழில்ஆதவன்" },
  { id: "committee-member-7", name: "யோ.ஜவாஸ்கர்" },
  { id: "committee-member-8", name: "யோ.அர்ச்சுனன்" },
  { id: "committee-member-9", name: "பொ.மனோகரன்" },
  { id: "committee-member-10", name: "சு.அயூசனா" },
];

const DECADES = [
  { range: "1980–1989", count: "340+ உறுப்பினர்கள்" },
  { range: "1990–1999", count: "610+ உறுப்பினர்கள்" },
  { range: "2000–2009", count: "890+ உறுப்பினர்கள்" },
];

export default function Directory() {
  return (
    <>
      <PageHero
        eyebrow="உறுப்பினர் பட்டியல்"
        title="பழைய மாணவர் பட்டியல்"
        lead="முழுமையான பழைய மாணவர் பட்டியலை பதிவுசெய்த உறுப்பினர்கள் மட்டுமே பார்வையிட முடியும்."
      />

      <div className="container page-body page-stack">
        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiUsers />
            </span>
            நிர்வாகக் குழு
          </h2>
          <div className="people">
            {COMMITTEE.map((member) => (
              <div key={member.id} className="person">
                <div className="person-avatar">
                  {member.photo ? <img src={member.photo} alt={member.name} /> : <FiUser aria-hidden="true" />}
                </div>
                <p className="person-name">{member.name}</p>
                <span className="tag tag-accent">{member.role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <span className="icon-badge" aria-hidden="true">
              <FiUser />
            </span>
            உறுப்பினர்கள்
          </h2>
          <ol className="members">
            {MEMBERS.map((member, index) => (
              <li key={member.id}>
                <span className="members-num">{index + 1}</span>
                {member.name}
              </li>
            ))}
          </ol>
        </section>

        {/* <div className="grid-3" style={{ marginBottom: 36 }}>
          {DECADES.map((decade) => (
            <Card key={decade.range} kicker={decade.range} title={decade.count} kickerColor="var(--color-accent-2-700)" style={{ opacity: 0.55, position: "relative" }}>
              <p className="card-body is-redacted">●●●●●●● ●●●●●● ●●●●●●●●</p>
            </Card>
          ))}
        </div> */}

        {/* <Card
          elevation="md"
          kicker="உறுப்பினர்கள் மட்டும்"
          kickerColor="var(--color-accent-2-700)"
          title="முழு பட்டியலைப் பார்க்க உறுப்பினராகுங்கள்"
          body="பெயர், தொகுதி, தொழில் மற்றும் தொடர்பு விபரங்களுடன் கூடிய முழு பழைய மாணவர் பட்டியலை அணுக, உறுப்பினராக பதிவு செய்யவும்."
          style={{ maxWidth: 520, textAlign: "left" }}
        >
          <Button as="link" to="/join" variant="primary" style={{ marginTop: 8 }}>
            உறுப்பினராகுங்கள்
          </Button>
        </Card> */}
      </div>
    </>
  );
}
