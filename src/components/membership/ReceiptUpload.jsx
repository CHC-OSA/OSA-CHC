import { useRef, useState } from "react";
import { Link } from "react-router";
import { AlertCircleIcon, ArrowRight02Icon, CloudUploadIcon, Delete02Icon, Image01Icon, InformationCircleIcon, Invoice03Icon, Mail01Icon, Pdf01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import Icon from "../ui/Icon";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { CONTACT_INFO } from "../../data/constants";
import { RECEIPT_SCRIPT_URL, newSubmissionId, receiptScriptReady, sendWithRetry } from "./script";

// A 5 MB file takes a while to go up on a phone connection, so this waits longer than the application form.
const UPLOAD_TIMEOUT_MS = 60000;
const UPLOAD_ATTEMPTS = 2;

// Mirrored in apps-script/receipts/Code.gs (FILE_TYPES, MAX_BYTES).
const MAX_BYTES = 5 * 1024 * 1024;
const FILE_TYPES = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const ACCEPT = Object.keys(FILE_TYPES).join(",") + ",.pdf,.jpg,.jpeg,.png,.webp";

// The association emails each applicant a reference number (உசாத்துணை இலக்கம்) once the application is checked.
// Its exact format isn't fixed yet, so this allows letters, digits, "/" and "-" (e.g. OSA/2026/0123).
// Mirrored in apps-script/receipts/Code.gs (isValidReferenceNo_).
const isValidReferenceNo = (v) => /^[A-Z0-9][A-Z0-9/-]{0,19}$/.test(v);
const referenceNoInput = (v) => v.toUpperCase().replace(/[^A-Z0-9/-]/g, "").slice(0, 20);

const TODAY = new Date().toLocaleDateString("en-CA");

// Shown above the form. The committee only accepts a payment whose bank Remarks carry the reference number.
const GUIDE_STEPS = [
  "விண்ணப்பம் சரிபார்க்கப்பட்ட பின்னர், ஒவ்வொரு விண்ணப்பதாரருக்கும் உசாத்துணை இலக்கம் ஒன்று மின்னஞ்சல் மூலம் அனுப்பப்படும்.",
  "உறுப்புரிமைக் கட்டணத்தைச் செலுத்தும்போது, வங்கி வைப்புச்சீட்டின் அல்லது இணையவழிப் பணப் பரிமாற்றத்தின் Remarks பகுதியில் இவ்வுசாத்துணை இலக்கத்தைக் குறிப்பிடவும்.",
  "அதே உசாத்துணை இலக்கத்தைக் கீழுள்ள படிவத்தில் உள்ளிட்டு, பற்றுச்சீட்டைப் பதிவேற்றவும்.",
];

const MESSAGES = {
  required: "இவ்விபரம் கட்டாயமானது.",
  referenceNo: "சரியான உசாத்துணை இலக்கத்தை உள்ளிடவும்.",
  paidOn: "சரியான திகதியை உள்ளிடவும்.",
  fileType: "PDF, JPG அல்லது PNG கோப்பை மாத்திரம் பதிவேற்றவும்.",
  fileSize: "கோப்பின் அளவு 5 MB இற்குக் குறைவாக இருக்க வேண்டும்.",
  fixErrors: "தவறுகளைத் திருத்திய பின்னர் மீண்டும் சமர்ப்பிக்கவும்.",
  unavailable: "பற்றுச்சீட்டுப் பதிவேற்றம் தற்போது செயற்பாட்டில் இல்லை.",
  failed: "பற்றுச்சீட்டைப் பதிவேற்றுவதில் தவறு ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும்.",
  network: "இணைய இணைப்பில் சிக்கல் உள்ளது. இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
};

const initialState = { name: "", referenceNo: "", paidOn: "" };

function fileError(file) {
  if (!file) return MESSAGES.required;
  if (!FILE_TYPES[file.type]) return MESSAGES.fileType;
  if (file.size > MAX_BYTES) return MESSAGES.fileSize;
  return "";
}

function validate(form, file) {
  const errors = {};
  for (const key of Object.keys(initialState)) if (!form[key].trim()) errors[key] = MESSAGES.required;
  if (form.referenceNo && !isValidReferenceNo(form.referenceNo)) errors.referenceNo = MESSAGES.referenceNo;
  if (form.paidOn && form.paidOn > TODAY) errors.paidOn = MESSAGES.paidOn;
  const fileProblem = fileError(file);
  if (fileProblem) errors.file = fileProblem;
  return errors;
}

// The file goes to the script as base64 inside the JSON body (the script can't take multipart uploads).
function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const formatSize = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

export default function ReceiptUpload() {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionId, setSubmissionId] = useState(newSubmissionId);
  const fileInput = useRef(null);

  const errors = submitted ? validate(form, file) : {};
  const hasErrors = Object.keys(errors).length > 0;

  const setField = (key, clean) => (e) => {
    const value = clean ? clean(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const pickFile = (picked) => {
    if (!picked) return;
    setFile(picked);
    setSubmissionId(newSubmissionId()); // a different file is a different submission
  };
  const removeFile = () => {
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const fail = (message) => {
    setStatus("error");
    setErrorMessage(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setStatus("idle");

    const found = validate(form, file);
    const firstInvalid = ["name", "referenceNo", "paidOn", "file"].find((key) => found[key]);
    if (firstInvalid) {
      const el = document.getElementById(`r-${firstInvalid}`);
      el?.focus({ preventScroll: true });
      (el?.closest(".field") || el)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!receiptScriptReady) return fail(MESSAGES.unavailable);

    setStatus("sending");
    let fileData;
    try {
      fileData = await readAsBase64(file);
    } catch (err) {
      console.error("Receipt upload: could not read the file.", err);
      return fail(MESSAGES.failed);
    }

    const body = JSON.stringify({
      formType: "receipt",
      name: form.name.trim(),
      referenceNo: form.referenceNo,
      paidOn: form.paidOn,
      fileName: file.name,
      mimeType: file.type,
      fileData,
      submissionId,
    });
    const result = await sendWithRetry(RECEIPT_SCRIPT_URL, body, { timeoutMs: UPLOAD_TIMEOUT_MS, attempts: UPLOAD_ATTEMPTS, label: "Receipt upload" });

    if (!result) return fail(MESSAGES.network);
    if (!result.ok) {
      console.error("Receipt upload: the script refused the receipt.", result);
      // Fields that aren't on this form mean the URL points at the wrong script (e.g. the membership one).
      const ownFields = (result.fields || []).filter((key) => key === "file" || key in initialState);
      return fail(ownFields.length ? MESSAGES.fixErrors : MESSAGES.failed);
    }

    setStatus("success");
    setForm(initialState);
    removeFile();
    setSubmissionId(newSubmissionId());
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "success") {
    return (
      <div className="panel apply-success" role="status">
        <span className="apply-success-icon" aria-hidden="true">
          <Icon icon={Tick02Icon} />
        </span>
        <h2>நன்றி. உங்கள் பற்றுச்சீட்டு கிடைக்கப்பெற்றுள்ளது.</h2>
        <p>கட்டணம் சரிபார்க்கப்பட்ட பின்னர் உங்கள் உறுப்புரிமை உறுதிப்படுத்தப்பட்டு மின்னஞ்சல் மூலம் அறிவிக்கப்படும்.</p>
        <Button as="link" to="/" variant="secondary" className="apply-success-btn">
          முகப்புக்குத் திரும்பவும்
        </Button>
      </div>
    );
  }

  const isPdf = file?.type === "application/pdf";

  return (
    <div className="receipt-page">
      <section className="panel receipt-guide" aria-labelledby="receipt-guide-title">
        <header className="apply-section-head">
          <span className="icon-badge" aria-hidden="true">
            <Icon icon={InformationCircleIcon} />
          </span>
          <div>
            <span className="apply-section-step">பதிவேற்றுவதற்கு முன்</span>
            <h2 id="receipt-guide-title">அறிவுறுத்தல்கள்</h2>
          </div>
        </header>
        <ol className="apply-process">
          {GUIDE_STEPS.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
        <p className="receipt-warning" role="note">
          <Icon icon={AlertCircleIcon} />
          <span>
            <strong>Remarks பகுதியில் உசாத்துணை இலக்கம் குறிப்பிடப்படாத பற்றுச்சீட்டுகள் செல்லுபடியற்றவையாகக் கருதப்படும்.</strong>
          </span>
        </p>
        <p className="receipt-guide-note">
          உசாத்துணை இலக்கம் இன்னும் கிடைக்கப்பெறாதவர்கள் முதலில் <Link to={{ search: "?view=register" }}>உறுப்பினர் பதிவு</Link> மூலம் விண்ணப்பிக்கவும்.
        </p>
      </section>

      <form className="apply-form" onSubmit={handleSubmit} noValidate>
        <section className="panel apply-section" aria-labelledby="receipt-section">
          <header className="apply-section-head">
            <span className="icon-badge" aria-hidden="true">
              <Icon icon={Invoice03Icon} />
            </span>
            <div>
              <span className="apply-section-step">கட்டணம் செலுத்தியவர்களுக்கு</span>
              <h2 id="receipt-section">பற்றுச்சீட்டுப் பதிவேற்றம்</h2>
              <p>மின்னஞ்சலில் வழங்கப்பட்ட உசாத்துணை இலக்கத்துடன் கட்டணப் பற்றுச்சீட்டைப் பதிவேற்றவும்</p>
            </div>
          </header>

          <div className="apply-grid">
            <Field label="1. முழுப்பெயர் *" id="r-name" className="apply-span-2" value={form.name} onChange={setField("name")} error={errors.name} required />
            <Field
              label="2. உசாத்துணை இலக்கம் *"
              id="r-referenceNo"
              autoCapitalize="characters"
              value={form.referenceNo}
              onChange={setField("referenceNo", referenceNoInput)}
              error={errors.referenceNo}
              required
            />
            <Field label="3. கட்டணம் செலுத்திய திகதி *" id="r-paidOn" type="date" max={TODAY} value={form.paidOn} onChange={setField("paidOn")} error={errors.paidOn} required />

            <div className={`field apply-span-2${errors.file ? " is-invalid" : ""}`}>
              <label htmlFor="r-file">
                4. கட்டணப் பற்றுச்சீட்டு <span className="req" aria-hidden="true">*</span>
              </label>
              {file ? (
                <div className="receipt-file">
                  <span className="receipt-file-icon" aria-hidden="true">
                    <Icon icon={isPdf ? Pdf01Icon : Image01Icon} />
                  </span>
                  <span className="receipt-file-text">
                    <strong>{file.name}</strong>
                    <small>{formatSize(file.size)}</small>
                  </span>
                  <button type="button" className="receipt-file-remove" onClick={removeFile} aria-label="கோப்பை நீக்கவும்">
                    <Icon icon={Delete02Icon} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="r-file"
                  className={`receipt-drop${dragging ? " is-dragging" : ""}${errors.file ? " is-invalid" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    pickFile(e.dataTransfer.files?.[0]);
                  }}
                >
                  <Icon icon={CloudUploadIcon} />
                  <strong>கோப்பைத் தெரிவு செய்யவும்</strong>
                  <small>PDF, JPG அல்லது PNG — ஆகக்கூடியது 5 MB</small>
                </label>
              )}
              <input
                ref={fileInput}
                type="file"
                id="r-file"
                className="receipt-input"
                accept={ACCEPT}
                aria-invalid={errors.file ? true : undefined}
                aria-describedby={errors.file ? "r-file-error" : undefined}
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
              {errors.file && (
                <p className="field-error" id="r-file-error">
                  {errors.file}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="apply-submit">
          <p className="apply-required-note">
            <span className="req">*</span> குறியிடப்பட்டவை கட்டாயமான விபரங்கள்
          </p>
          <Button type="submit" variant="primary" className="apply-submit-btn" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <span className="apply-spinner" aria-hidden="true" /> பதிவேற்றப்படுகிறது…
              </>
            ) : (
              <>
                பற்றுச்சீட்டைச் சமர்ப்பிக்கவும் <Icon icon={ArrowRight02Icon} />
              </>
            )}
          </Button>
          {(hasErrors || status === "error") && (
            <p role="alert" className="alert alert-error">
              <Icon icon={AlertCircleIcon} />
              <span>{hasErrors ? MESSAGES.fixErrors : errorMessage}</span>
            </p>
          )}
        </div>

        <p className="apply-help">
          <Icon icon={Mail01Icon} />
          <span>
            மேலதிக விபரங்களுக்கு <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
          </span>
        </p>
      </form>
    </div>
  );
}
