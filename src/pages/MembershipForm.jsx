import { useState } from "react";
import { FiAlertCircle, FiArrowRight, FiAward, FiBookOpen, FiCheck, FiList, FiMail, FiPhone, FiUser } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import Field, { LabelText } from "../components/ui/Field";
import SegmentedControl from "../components/ui/SegmentedControl";
import Button from "../components/ui/Button";
import { CONTACT_INFO } from "../data/constants";
import "../styles/membership.css";

// Google Apps Script web app that writes to the membership Google Sheet — see apps-script/membership/README.md
const SCRIPT_URL = import.meta.env.VITE_MEMBERSHIP_SCRIPT_URL;
const scriptReady = Boolean(SCRIPT_URL) && !SCRIPT_URL.includes("REPLACE_ME");

const LIFETIME_FEE = "ரூபா 1000.00";

// The association's official registration process (பதிவு செய்யும் முறை).
const PROCESS_STEPS = [
  "இப்பக்கத்திலுள்ள விண்ணப்பப் படிவத்தைப் பூர்த்தி செய்து சமர்ப்பிக்கவும்.",
  "உங்கள் உறுப்பினர் விண்ணப்பம் OSTA மூலம் சரிபார்க்கப்படும்.",
  "சரிபார்ப்பு நிறைவடைந்த பின்னர் மட்டுமே கட்டணம் செலுத்துவதற்கான தகவல்கள் வழங்கப்படும்.",
  "அதன் பின்னர் ரூ. 1,000/- உறுப்பினர் கட்டணத்தை செலுத்தலாம்.",
];
const MIN_YEAR = 1900;
const CURRENT_YEAR = new Date().getFullYear();
const TODAY = new Date().toLocaleDateString("en-CA"); // local YYYY-MM-DD, same format as <input type="date">

// Sri Lankan school grades 1–13; grade 11 ends with the O/L exam and grade 13 with the A/L exam.
const GRADES = Array.from({ length: 13 }, (_, i) => {
  const exam = { 11: " — க.பொ.த (சா/த)", 13: " — க.பொ.த (உ/த)" }[i + 1] || "";
  return { value: String(i + 1), label: `${i + 1}ஆம் வகுப்பு${exam}` };
});

// Keys are in page order, so the first invalid one is the first on screen.
const initialState = {
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
  email: "",
  admitNo: "",
  joinedYear: "",
  joinedGrade: "",
  leftYear: "",
  leftGrade: "",
  proof: "",
  membershipType: "", // "lifetime" once the tick box is ticked
  emailConsent: "",
  website: "", // honeypot — hidden from people, bots fill it in
};

const REQUIRED = [
  "name", "gender", "marital", "dob", "nic", "occupation", "homeAddress", "phone", "email",
  "admitNo", "joinedYear", "joinedGrade", "leftYear", "leftGrade", "membershipType", "emailConsent",
];

const MESSAGES = {
  required: "இந்த வினா கட்டாயமானது.",
  dob: "சரியான பிறந்த திகதியை உள்ளிடவும்.",
  nic: "சரியான அடையாள அட்டை இலக்கத்தை உள்ளிடவும் — எ.கா. 636835640V அல்லது 200328805624.",
  email: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும் — எ.கா. name@email.com.",
  phone: "சரியான தொலைபேசி இலக்கத்தை உள்ளிடவும் — எ.கா. +94 77 123 4567.",
  admitNo: "சேர்விலக்கம் அதிகபட்சம் 5 இலக்கங்கள் மட்டுமே.",
  year: `${MIN_YEAR} – ${CURRENT_YEAR} இடையிலான ஆண்டை உள்ளிடவும்.`,
  joinedAfterBirth: "பிறந்த ஆண்டுக்குப் பின்னரான ஆண்டாக இருக்க வேண்டும்.",
  leftAfterJoined: "சேர்ந்த ஆண்டுக்கு முந்தைய ஆண்டாக இருக்க முடியாது.",
  leftGradeAfterJoined: "சேர்ந்த வகுப்பை விடக் குறைந்த வகுப்பாக இருக்க முடியாது.",
  fixErrors: "பிழைகளைத் திருத்திய பின் மீண்டும் சமர்ப்பிக்கவும்.",
  unavailable: `விண்ணப்பப் படிவம் தற்போது கிடைக்கவில்லை`,
  failed: "விண்ணப்பத்தை அனுப்புவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
};

// Old NIC: YY + DDD + 4 digits + V/X (636835640V). New NIC: YYYY + DDD + 5 digits (200328805624).
// DDD is the day of the birth year, plus 500 for women. Mirrored in apps-script/membership/Code.gs.
function isValidNic(nic) {
  const match = /^\d{2}(\d{3})\d{4}[VX]$/.exec(nic) || /^\d{4}(\d{3})\d{5}$/.exec(nic);
  if (!match) return false;
  const day = Number(match[1]);
  return (day >= 1 && day <= 366) || (day >= 501 && day <= 866);
}

function isValidPhone(v) {
  const digits = v.replace(/\D/g, "").length;
  return /^\+?[\d\s-]+$/.test(v) && digits >= 9 && digits <= 15;
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isValidYear = (v) => /^\d{4}$/.test(v) && Number(v) >= MIN_YEAR && Number(v) <= CURRENT_YEAR;

function validate(form) {
  const errors = {};
  for (const key of REQUIRED) if (!form[key].trim()) errors[key] = MESSAGES.required;

  const birthYear = Number(form.dob.slice(0, 4));
  if (form.dob && (form.dob > TODAY || birthYear < MIN_YEAR)) errors.dob = MESSAGES.dob;
  if (form.nic && !isValidNic(form.nic)) errors.nic = MESSAGES.nic;
  if (form.email && !isValidEmail(form.email.trim())) errors.email = MESSAGES.email;
  if (form.phone.trim() && !isValidPhone(form.phone.trim())) errors.phone = MESSAGES.phone;
  if (form.admitNo && !/^\d{1,5}$/.test(form.admitNo)) errors.admitNo = MESSAGES.admitNo;

  for (const key of ["joinedYear", "leftYear"]) {
    if (form[key] && !isValidYear(form[key])) errors[key] = MESSAGES.year;
  }
  if (!errors.joinedYear && !errors.dob && form.dob && Number(form.joinedYear) <= birthYear) {
    errors.joinedYear = MESSAGES.joinedAfterBirth;
  }
  if (!errors.joinedYear && !errors.leftYear && Number(form.leftYear) < Number(form.joinedYear)) {
    errors.leftYear = MESSAGES.leftAfterJoined;
  }
  if (form.joinedGrade && form.leftGrade && Number(form.leftGrade) < Number(form.joinedGrade)) {
    errors.leftGrade = MESSAGES.leftGradeAfterJoined;
  }
  return errors;
}

// These cap the length themselves; a maxLength attribute would truncate pasted "2003 2880 5624" before the spaces are stripped.
const digitsOnly = (max) => (v) => v.replace(/\D/g, "").slice(0, max);
const nicInput = (v) => v.toUpperCase().replace(/[^0-9VX]/g, "").slice(0, 12);

function GradeOptions() {
  return (
    <>
      <option value="" disabled>
        வகுப்பைத் தெரிவு செய்யவும்
      </option>
      {GRADES.map((grade) => (
        <option key={grade.value} value={grade.value}>
          {grade.label}
        </option>
      ))}
    </>
  );
}

function focusField(key) {
  const el = document.getElementById(`f-${key}`) || document.querySelector(`input[name="${key}"]`);
  if (!el) return;
  el.focus({ preventScroll: true });
  (el.closest(".field") || el).scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function MembershipForm() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false); // show field errors only after the first submit attempt
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const errors = submitted ? validate(form) : {};
  const hasErrors = Object.keys(errors).length > 0;

  const setField = (key, clean) => (e) => {
    const value = clean ? clean(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };
  const setChoice = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const fail = (message) => {
    setStatus("error");
    setErrorMessage(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setStatus("idle");

    const found = validate(form);
    const firstInvalid = Object.keys(initialState).find((key) => found[key]);
    if (firstInvalid) return focusField(firstInvalid);
    if (!scriptReady) return fail(MESSAGES.unavailable);

    setStatus("sending");
    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        // text/plain keeps this a "simple" request, so the browser skips the CORS preflight Apps Script can't answer.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!result.ok) throw new Error(result.error);

      setStatus("success");
      setForm(initialState);
      setSubmitted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      fail(MESSAGES.failed);
    }
  };

  const filled = REQUIRED.filter((key) => form[key].trim()).length;
  const lifetimeChecked = form.membershipType === "lifetime";
  const invalidClass = (key) => `field apply-span-2${errors[key] ? " is-invalid" : ""}`;

  return (
    <div className="apply">
      <PageHero eyebrow="உறுப்பினர் பதிவு" title="பழைய மாணவர் சங்க உறுப்புரிமை விண்ணப்பம்" lead="யா/சாவகச்சேரி இந்துக்கல்லூரி">
        <div className="page-hero-chips">
          <span className="chip">
            <FiList aria-hidden="true" /> 4 பகுதிகள் · 18 வினாக்கள்
          </span>
          <span className="chip chip-gold">ஆயுட்சந்தா — {LIFETIME_FEE}</span>
        </div>
      </PageHero>

      <div className="container page-body">
        {status === "success" ? (
          <div className="panel apply-success" role="status">
            <span className="apply-success-icon" aria-hidden="true">
              <FiCheck />
            </span>
            <h2>நன்றி! உங்கள் விண்ணப்பம் பெறப்பட்டது.</h2>
            <p>
              உங்கள் உறுப்பினர் விண்ணப்பம் OSTA மூலம் சரிபார்க்கப்படும். சரிபார்ப்பு நிறைவடைந்த பின்னர் கட்டணம் செலுத்துவதற்கான தகவல்கள் வழங்கப்படும்.
            </p>
            <Button as="link" to="/" variant="secondary" className="apply-success-btn">
              முகப்புக்குத் திரும்பு
            </Button>
          </div>
        ) : (
          <div className="apply-layout">
            <form className="apply-form" onSubmit={handleSubmit} noValidate>
              <Section step={1} icon={FiUser} title="தனிப்பட்ட விபரங்கள்" subtitle="உங்களைப் பற்றிய அடிப்படைத் தகவல்கள்">
                <Field label="1. முழுப்பெயர் *" id="f-name" className="apply-span-2" value={form.name} onChange={setField("name")} error={errors.name} required />

                <div className={`field${errors.gender ? " is-invalid" : ""}`}>
                  <label id="gender-label"><LabelText text="2. பால் *" /></label>
                  <SegmentedControl
                    name="gender"
                    labelId="gender-label"
                    value={form.gender}
                    onChange={setChoice("gender")}
                    options={[
                      { value: "male", label: "ஆண்" },
                      { value: "female", label: "பெண்" },
                    ]}
                  />
                  {errors.gender && <p className="field-error">{errors.gender}</p>}
                </div>

                <Field label="3. குடிசார்நிலை (மணமானவர் / மணமாகாதவர்) *" id="f-marital" value={form.marital} onChange={setField("marital")} error={errors.marital} required />
                <Field label="4. பிறந்த திகதி *" id="f-dob" type="date" max={TODAY} value={form.dob} onChange={setField("dob")} error={errors.dob} required />
                <Field label="5. தேசிய அடையாள அட்டை இல. *" id="f-nic" autoCapitalize="characters" value={form.nic} onChange={setField("nic", nicInput)} error={errors.nic} required />
                <Field label="6. தொழில் *" id="f-occupation" className="apply-span-2" value={form.occupation} onChange={setField("occupation")} error={errors.occupation} required />
              </Section>

              <Section step={2} icon={FiPhone} title="தொடர்பு விபரங்கள்" subtitle="உங்களைத் தொடர்பு கொள்வதற்கான விபரங்கள்">
                <Field label="7. சொந்த முகவரி *" id="f-homeAddress" className="apply-span-2" type="textarea" rows={2} value={form.homeAddress} onChange={setField("homeAddress")} error={errors.homeAddress} required />
                <Field label="தற்காலிக முகவரி" id="f-tempAddress" type="textarea" rows={2} placeholder="(இருப்பின் மட்டும்)" value={form.tempAddress} onChange={setField("tempAddress")} />
                <Field label="8. அலுவலக முகவரி" id="f-officeAddress" type="textarea" rows={2} placeholder="(இருப்பின் மட்டும்)" value={form.officeAddress} onChange={setField("officeAddress")} />
                <Field label="9. தொலைபேசி இல. (WhatsApp இலக்கம் விரும்பத்தக்கது) *" id="f-phone" type="tel" value={form.phone} onChange={setField("phone")} error={errors.phone} required />
                <Field label="10. மின்னஞ்சல் முகவரி *" id="f-email" type="email" value={form.email} onChange={setField("email")} error={errors.email} required />
              </Section>

              <Section step={3} icon={FiBookOpen} title="கல்லூரி விபரங்கள்" subtitle="இக்கல்லூரியில் நீங்கள் கல்வி கற்ற விபரங்கள்">
                <Field label="11. கல்லூரி சேர்விலக்கம் *" id="f-admitNo" inputMode="numeric" value={form.admitNo} onChange={setField("admitNo", digitsOnly(5))} error={errors.admitNo} required />
                <Field label="12. கல்லூரியில் சேர்ந்த ஆண்டு *" id="f-joinedYear" className="apply-row-start" inputMode="numeric" value={form.joinedYear} onChange={setField("joinedYear", digitsOnly(4))} error={errors.joinedYear} required />
                <Field label="13. கல்லூரியில் சேர்ந்த வகுப்பு *" id="f-joinedGrade" type="select" value={form.joinedGrade} onChange={setField("joinedGrade")} error={errors.joinedGrade} required>
                  <GradeOptions />
                </Field>
                <Field label="14. கல்லூரியில் கடைசியாகப் படித்த ஆண்டு *" id="f-leftYear" inputMode="numeric" value={form.leftYear} onChange={setField("leftYear", digitsOnly(4))} error={errors.leftYear} required />
                <Field label="15. கல்லூரியில் கடைசியாகப் படித்த வகுப்பு *" id="f-leftGrade" type="select" value={form.leftGrade} onChange={setField("leftGrade")} error={errors.leftGrade} required>
                  <GradeOptions />
                </Field>
                <Field label="16. இக்கல்லூரியில் கல்வி கற்றதை உறுதி செய்யும் வேறு ஆதாரம்" id="f-proof" className="apply-span-2" type="textarea" rows={2} placeholder="(இருப்பின் மட்டும்)" value={form.proof} onChange={setField("proof")} />
              </Section>

              <Section step={4} icon={FiAward} title="அங்கத்துவம்" subtitle="அங்கத்துவ வகையும் தொடர்பாடல் விருப்பமும்">
                <div className={invalidClass("membershipType")}>
                  <label htmlFor="f-membershipType"><LabelText text="17. அங்கத்துவ வகை *" /></label>
                  <label className={`apply-option${lifetimeChecked ? " is-checked" : ""}${errors.membershipType ? " is-invalid" : ""}`}>
                    <input
                      type="checkbox"
                      id="f-membershipType"
                      checked={lifetimeChecked}
                      onChange={(e) => setChoice("membershipType")(e.target.checked ? "lifetime" : "")}
                      aria-invalid={errors.membershipType ? true : undefined}
                      aria-describedby={errors.membershipType ? "f-membershipType-error" : undefined}
                    />
                    <span className="apply-option-box" aria-hidden="true">
                      <FiCheck />
                    </span>
                    <span className="apply-option-text">
                      <span className="apply-option-title">
                        <strong>ஆயுட்காலம்</strong>
                        <span className="apply-option-price">{LIFETIME_FEE}</span>
                      </span>
                      <small>உறுதிப்படுத்த இப்பெட்டியைத் தெரிவு செய்யவும்</small>
                    </span>
                  </label>
                  {errors.membershipType && (
                    <p className="field-error" id="f-membershipType-error">
                      {errors.membershipType}
                    </p>
                  )}
                </div>

                <div className={invalidClass("emailConsent")}>
                  <label id="consent-label"><LabelText text="18. அதிகாரப்பூர்வத் தொடர்பாடலுக்கான ஊடகமாக மின்னஞ்சலைப் பயன்படுத்துவதை ஏற்றுக்கொள்ளுகிறேன். *" /></label>
                  <SegmentedControl
                    name="emailConsent"
                    labelId="consent-label"
                    value={form.emailConsent}
                    onChange={setChoice("emailConsent")}
                    options={[
                      { value: "yes", label: "ஆம்" },
                      { value: "no", label: "இல்லை" },
                    ]}
                  />
                  {errors.emailConsent && <p className="field-error">{errors.emailConsent}</p>}
                </div>
              </Section>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={setField("website")}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div className="apply-submit">
                <p className="apply-required-note">
                  <span className="req">*</span> குறியிடப்பட்டவை கட்டாயமான வினாக்கள்
                </p>
                <Button type="submit" variant="primary" className="apply-submit-btn" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <span className="apply-spinner" aria-hidden="true" /> சமர்ப்பிக்கிறது…
                    </>
                  ) : (
                    <>
                      விண்ணப்பத்தைச் சமர்ப்பி <FiArrowRight aria-hidden="true" />
                    </>
                  )}
                </Button>
                {(hasErrors || status === "error") && (
                  <p role="alert" className="alert alert-error">
                    <FiAlertCircle aria-hidden="true" />
                    <span>{hasErrors ? MESSAGES.fixErrors : errorMessage}</span>
                  </p>
                )}
              </div>
            </form>

            <aside className="apply-aside">
              <div className="panel apply-summary">
                <p className="apply-summary-label">ஆயுட்கால அங்கத்துவக் கட்டணம்</p>
                <p className="apply-summary-price">{LIFETIME_FEE}</p>

                <div className="apply-progress">
                  <div className="apply-progress-head">
                    <span>கட்டாய வினாக்கள்</span>
                    <span>
                      {filled} / {REQUIRED.length}
                    </span>
                  </div>
                  <div
                    className="apply-progress-track"
                    role="progressbar"
                    aria-label="கட்டாய வினாக்கள்"
                    aria-valuemin={0}
                    aria-valuemax={REQUIRED.length}
                    aria-valuenow={filled}
                  >
                    <div className="apply-progress-bar" style={{ width: `${(filled / REQUIRED.length) * 100}%` }} />
                  </div>
                </div>

                <h2 className="apply-process-title">பதிவு செய்யும் முறை</h2>
                <ol className="apply-process">
                  {PROCESS_STEPS.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ol>
              </div>

              <p className="apply-help">
                <FiMail aria-hidden="true" />
                <span>
                  மேலதிக தொடர்புகளுக்கு <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                </span>
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ step, icon: Icon, title, subtitle, children }) {
  const headingId = `apply-section-${step}`;
  return (
    <section className="panel apply-section" aria-labelledby={headingId}>
      <header className="apply-section-head">
        <span className="icon-badge" aria-hidden="true">
          <Icon />
        </span>
        <div>
          <span className="apply-section-step">பகுதி {step} / 4</span>
          <h2 id={headingId}>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </header>
      <div className="apply-grid">{children}</div>
    </section>
  );
}
