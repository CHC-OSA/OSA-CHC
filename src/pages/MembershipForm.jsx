import { useState } from "react";
import Field from "../components/ui/Field";
import SegmentedControl from "../components/ui/SegmentedControl";
import Button from "../components/ui/Button";
import { MEMBERSHIP_GOOGLE_FORM_URL } from "../data/constants";

const initialState = {
  email: "",
  name: "",
  gender: "",
  marital: "",
  dob: "",
  nic: "",
  occupation: "",
  homeAddress: "",
  tempAddress: "",
  officeAddress: "",
  phone: "",
  fax: "",
  email2: "",
  admitNo: "",
  joined: "",
  left: "",
  proof: "",
  membershipType: "lifetime",
  notify: "",
};

export default function MembershipForm() {
  const [form, setForm] = useState(initialState);
  const [receiptName, setReceiptName] = useState("");

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const openGoogleForm = () => {
    window.open(MEMBERSHIP_GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container-narrow" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        உறுப்பினர் பதிவு
      </span>
      <h1 style={{ fontSize: "clamp(26px,3.2vw,36px)", margin: "0 0 10px" }}>
        யா/சாவகச்சேரி இந்துக்கல்லூரி — பழைய மாணவர் சங்க உறுப்புரிமை விண்ணப்பம்
      </h1>
      <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 75%, transparent)", margin: "0 0 18px" }}>
        உறுப்பினராகப் பதிவு செய்ய, கீழே உள்ள பொத்தானை அழுத்தி வெளியில் உள்ள Google படிவத்தை நிரப்பவும்.
      </p>
      <div className="card" style={{ margin: "18px 0 28px", background: "var(--color-accent-2-100)" }}>
        <p className="card-body" style={{ margin: 0, fontWeight: 700 }}>
          கவனிப்பு: வருடாந்த சந்தா — ரூபா 50.00 &nbsp;|&nbsp; ஆயுட்சந்தா — ரூபா 500.00
        </p>
      </div>

      <Button variant="primary" block style={{ marginTop: 8 }} onClick={openGoogleForm}>
        Google படிவத்திற்குச் செல்ல →
      </Button>
    </div>

    // <div className="container-narrow" style={{ padding: "56px clamp(20px,4vw,48px) 80px" }}>
    //   <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
    //     உறுப்பினர் பதிவு
    //   </span>
    //   <h1 style={{ fontSize: "clamp(26px,3.2vw,36px)", margin: "0 0 10px" }}>
    //     யா/சாவகச்சேரி இந்துக்கல்லூரி — பழைய மாணவர் சங்க உறுப்புரிமை விண்ணப்பம்
    //   </h1>
    //   <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 75%, transparent)", margin: "0 0 18px" }}>
    //     கீழே உள்ள விபரங்களை நிரப்புவது, வெளியில் உள்ள Google படிவத்தில் நீங்கள் நிரப்ப வேண்டியவற்றை முன்கூட்டியே தயார் செய்ய உதவும்.
    //   </p>
    //   <div className="card" style={{ margin: "18px 0 28px", background: "var(--color-accent-2-100)" }}>
    //     <p className="card-body" style={{ margin: 0, fontWeight: 700 }}>
    //       கவனிப்பு: வருடாந்த சந்தா — ரூபா 50.00 &nbsp;|&nbsp; ஆயுட்சந்தா — ரூபா 500.00
    //     </p>
    //   </div>
    //   <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 32px" }}>
    //     * குறியிடப்பட்டவை கட்டாயமான வினாக்கள்
    //   </p>

    //   <div style={{ display: "grid", gap: 22 }}>
    //     <Field label="மின்னஞ்சல் முகவரி *" id="f-email" type="email" placeholder="name@email.com" value={form.email} onChange={setField("email")} />
    //     <Field label="1. முழுப்பெயர் *" id="f-name" placeholder="எ.கா. குமார் சிவகுமார்" value={form.name} onChange={setField("name")} />

    //     <div className="field">
    //       <label id="gender-label">2. பால் *</label>
    //       <SegmentedControl
    //         name="gender"
    //         labelId="gender-label"
    //         value={form.gender}
    //         onChange={(v) => setForm((f) => ({ ...f, gender: v }))}
    //         options={[
    //           { value: "male", label: "ஆண்" },
    //           { value: "female", label: "பெண்" },
    //         ]}
    //       />
    //     </div>

    //     <Field label="3. குடிசார்நிலை *" id="f-marital" placeholder="எ.கா. மணமானவர் / மணமாகாதவர்" value={form.marital} onChange={setField("marital")} />
    //     <Field label="4. பிறந்த திகதி *" id="f-dob" type="date" value={form.dob} onChange={setField("dob")} />
    //     <Field label="5. தேசிய அடையாள அட்டை இல. *" id="f-nic" placeholder="200012345678" value={form.nic} onChange={setField("nic")} />
    //     <Field label="6. தொழில் *" id="f-occ" placeholder="எ.கா. பொறியியலாளர்" value={form.occupation} onChange={setField("occupation")} />

    //     <Field label="7. சொந்த முகவரி *" id="f-addr" type="textarea" rows={2} placeholder="வீட்டு இலக்கம், தெரு, நகரம்" value={form.homeAddress} onChange={setField("homeAddress")} />
    //     <Field label="தற்காலிக முகவரி" id="f-taddr" type="textarea" rows={2} placeholder="(இருப்பின் மட்டும்)" value={form.tempAddress} onChange={setField("tempAddress")} />
    //     <Field label="8. அலுவலக முகவரி" id="f-oaddr" type="textarea" rows={2} placeholder="(இருப்பின் மட்டும்)" value={form.officeAddress} onChange={setField("officeAddress")} />

    //     <Field label="9. தொலைபேசி இல. *" id="f-phone" placeholder="+94 7X XXX XXXX" value={form.phone} onChange={setField("phone")} />
    //     <Field label="10. தொலைநகல் இல." id="f-fax" placeholder="(இருப்பின் மட்டும்)" value={form.fax} onChange={setField("fax")} />
    //     <Field label="11. மின்னஞ்சல் முகவரி *" id="f-email2" type="email" placeholder="name@email.com" value={form.email2} onChange={setField("email2")} />
    //     <Field label="12. கல்லூரி சேர்விலக்கம் *" id="f-admitno" placeholder="சேர்வு இலக்கம் / விலக்க இலக்கம்" value={form.admitNo} onChange={setField("admitNo")} />
    //     <Field label="13. சேர்ந்த ஆண்டு & வகுப்பு *" id="f-joined" placeholder="எ.கா. 1998 — 6ஆம் வகுப்பு" value={form.joined} onChange={setField("joined")} />
    //     <Field label="14. கடைசியாகப் படித்த வகுப்பு & ஆண்டு *" id="f-left" placeholder="எ.கா. க.பொ.த (உ/த) — 2010" value={form.left} onChange={setField("left")} />
    //     <Field label="15. இக்கல்லூரியில் கல்வி கற்றதை உறுதி செய்யும் வேறு ஆதாரம்" id="f-proof" type="textarea" rows={2} placeholder="(இருப்பின் மட்டும்)" value={form.proof} onChange={setField("proof")} />

    //     <div className="field" style={{ marginBottom: 0 }}>
    //       <label id="mtype-label">16. அங்கத்துவ வகை *</label>
    //       <SegmentedControl
    //         name="mtype"
    //         labelId="mtype-label"
    //         value={form.membershipType}
    //         onChange={(v) => setForm((f) => ({ ...f, membershipType: v }))}
    //         options={[
    //           { value: "yearly", label: "வருடாந்தம் (ரூபா 50.00)" },
    //           { value: "lifetime", label: "ஆயுட்காலம் (ரூபா 500.00)" },
    //         ]}
    //       />
    //     </div>

    //     <div className="field">
    //       <label htmlFor="f-receipt">17. அங்கத்துவ கட்டண ரசீது *</label>
    //       <input
    //         className="input"
    //         id="f-receipt"
    //         type="file"
    //         accept="image/*"
    //         onChange={(e) => setReceiptName(e.target.files?.[0]?.name || "")}
    //       />
    //       {receiptName && (
    //         <p className="text-muted" style={{ fontSize: 12, margin: "6px 0 0" }}>
    //           தெரிவு செய்யப்பட்டது: {receiptName}
    //         </p>
    //       )}
    //     </div>

    //     <div className="field" style={{ marginBottom: 0 }}>
    //       <label id="notify-label">18. வருடாந்த கூட்டத்துக்கான அழைப்பை மின்னஞ்சல் மூலமாக பெற சம்மதிக்கின்றேன். *</label>
    //       <SegmentedControl
    //         name="notify"
    //         labelId="notify-label"
    //         value={form.notify}
    //         onChange={(v) => setForm((f) => ({ ...f, notify: v }))}
    //         options={[
    //           { value: "yes", label: "ஆம்" },
    //           { value: "no", label: "இல்லை" },
    //         ]}
    //       />
    //     </div>
    //   </div>

    //   <Button variant="primary" block style={{ marginTop: 32 }} onClick={openGoogleForm}>
    //     Google படிவத்திற்குச் செல்ல →
    //   </Button>
    // </div>
    
  );
}
