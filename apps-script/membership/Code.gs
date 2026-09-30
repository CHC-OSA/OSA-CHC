/**
 * OSA membership form — Google Apps Script web app.
 *
 * Receives JSON POSTs from the website's /join page and stores each application
 * as a row in the bound Google Sheet. See ./README.md for setup and redeploy steps.
 */

// Optional: address that gets an email for every new application ("" = off).
const NOTIFY_EMAIL = "chcosaregistration@gmail.com";

const SHEET_NAME = "Applications";
const MIN_YEAR = 1900;

// [payload key, sheet header, required]. Headers use the same Tamil wording as the form labels.
const FIELDS = [
  ["name", "முழுப்பெயர்", true],
  ["gender", "பால்", true],
  ["marital", "குடிசார்நிலை", true],
  ["dob", "பிறந்த திகதி", true],
  ["nic", "தேசிய அடையாள அட்டை இல.", true],
  ["occupation", "தொழில்", true],
  ["homeAddress", "சொந்த முகவரி", true],
  ["tempAddress", "தற்காலிக முகவரி", false],
  ["officeAddress", "அலுவலக முகவரி", false],
  ["phone", "தொலைபேசி இல. (WhatsApp)", true],
  ["email", "மின்னஞ்சல் முகவரி", true],
  ["admitNo", "கல்லூரி சேர்விலக்கம்", true],
  ["joinedYear", "சேர்ந்த ஆண்டு", true],
  ["joinedGrade", "சேர்ந்த வகுப்பு", true],
  ["leftYear", "கடைசியாகப் படித்த ஆண்டு", true],
  ["leftGrade", "கடைசியாகப் படித்த வகுப்பு", true],
  ["proof", "கல்வி கற்றதற்கான வேறு ஆதாரம்", false],
  ["membershipType", "அங்கத்துவ வகை", true],
  ["emailConsent", "மின்னஞ்சல் தொடர்பாடலுக்கு ஒப்புதல்", true],
];

const HEADERS = ["சமர்ப்பித்த நேரம்"].concat(FIELDS.map((f) => f[1]));

// The website sends these choices as English codes; the sheet shows the Tamil option text instead.
const CHOICE_LABELS = {
  gender: { male: "ஆண்", female: "பெண்" },
  marital: { married: "மணமானவர்", unmarried: "மணமாகாதவர்" },
  membershipType: { lifetime: "ஆயுட்காலம்" },
  emailConsent: { yes: "ஆம்", no: "இல்லை" },
};

// Format checks, mirrored from src/pages/MembershipForm.jsx. Empty optional fields are skipped.
const RULES = {
  gender: (v) => v === "male" || v === "female",
  marital: (v) => v === "married" || v === "unmarried",
  dob: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v),
  nic: isValidNic_,
  phone: isValidPhone_,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
  admitNo: (v) => /^\d{1,5}$/.test(v),
  joinedYear: isValidYear_,
  joinedGrade: isValidGrade_,
  leftYear: isValidYear_,
  leftGrade: isValidGrade_,
  membershipType: (v) => v === "lifetime",
  emailConsent: (v) => v === "yes" || v === "no",
};

/** Run once from the editor: creates the sheet header and triggers authorization. */
function setup() {
  getSheet_();
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: real users never see this field. Pretend success so bots move on.
    if (data.website) return json_({ ok: true });

    const values = {};
    FIELDS.forEach((f) => (values[f[0]] = clean_(data[f[0]])));

    const missing = FIELDS.filter((f) => f[2] && !values[f[0]]).map((f) => f[0]);
    if (missing.length) return json_({ ok: false, error: "missing_fields", fields: missing });

    const invalid = Object.keys(RULES).filter((key) => values[key] && !RULES[key](values[key]));
    if (!invalid.length && Number(values.leftYear) < Number(values.joinedYear)) invalid.push("leftYear");
    if (!invalid.length && Number(values.leftGrade) < Number(values.joinedGrade)) invalid.push("leftGrade");
    if (invalid.length) return json_({ ok: false, error: "invalid_fields", fields: invalid });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const row = [new Date()].concat(FIELDS.map((f) => asText_(choiceLabel_(f[0], values[f[0]]))));
      const sheet = getSheet_();
      const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
      range.setValues([row]);
      // Sheets may show only the date; set the format so the time shows too (in the spreadsheet's time zone).
      range.getCell(1, 1).setNumberFormat("dd/mm/yyyy hh:mm:ss");
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "New OSA membership application — " + values.name,
        "A new membership application was submitted.\n\nName: " + values.name +
          "\nAdmission no.: " + values.admitNo +
          "\n\nOpen the sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
      );
    }

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server_error" });
  }
}

// Old NIC: YY + DDD + 4 digits + V/X (636835640V). New NIC: YYYY + DDD + 5 digits (200328805624).
// DDD is the day of the birth year, plus 500 for women.
function isValidNic_(nic) {
  const match = /^\d{2}(\d{3})\d{4}[VX]$/i.exec(nic) || /^\d{4}(\d{3})\d{5}$/.exec(nic);
  if (!match) return false;
  const day = Number(match[1]);
  return (day >= 1 && day <= 366) || (day >= 501 && day <= 866);
}

function isValidPhone_(v) {
  const digits = v.replace(/\D/g, "").length;
  return /^\+?[\d\s-]+$/.test(v) && digits >= 9 && digits <= 15;
}

function isValidYear_(v) {
  return /^\d{4}$/.test(v) && Number(v) >= MIN_YEAR && Number(v) <= new Date().getFullYear();
}

// The college teaches grades 6–13 (the website sends the grade number).
function isValidGrade_(v) {
  return /^\d{1,2}$/.test(v) && Number(v) >= 6 && Number(v) <= 13;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function choiceLabel_(key, value) {
  return (CHOICE_LABELS[key] && CHOICE_LABELS[key][value]) || value;
}

function clean_(value) {
  return String(value || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, 2000);
}

// Leading apostrophe keeps Sheets from treating input as a formula or number
// (so NICs and years are stored exactly as typed).
function asText_(value) {
  return value ? "'" + value : "";
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
