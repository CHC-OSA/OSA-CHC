import PlaceholderImage from "../components/ui/PlaceholderImage";
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
    <div className="container" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        உறுப்பினர் பட்டியல்
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 12px" }}>பழைய மாணவர் பட்டியல்</h1>
      <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 78%, transparent)", margin: "0 0 36px", maxWidth: "60ch" }}>
        முழுமையான பழைய மாணவர் பட்டியலை பதிவுசெய்த உறுப்பினர்கள் மட்டுமே பார்வையிட முடியும்.
      </p>

      <section style={{ padding: "0 0 36px" }}>
        <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-2-700)", marginBottom: 24 }}>
          நிர்வாகக் குழு
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "var(--space-8)" }}>
          {COMMITTEE.map((member) => (
            <div key={member.id} style={{ textAlign: "center" }}>
              <PlaceholderImage
                shape="circle"
                aspectRatio="1/1"
                caption="புகைப்படம்"
                src={member.photo}
                alt={member.name}
                style={{ width: 100, height: 100, margin: "0 auto 14px" }}
              />
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>{member.name}</p>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--color-accent-700)" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 0 36px" }}>
        <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-2-700)", marginBottom: 24 }}>
          உறுப்பினர்கள்
        </span>
        <div className="grid-3">
          {MEMBERS.map((member, index) => (
            <div key={member.id} style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>{index + 1}. {member.name}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr" style={{ marginBottom: 36 }} />

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
  );
}
