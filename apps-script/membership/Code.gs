/**
 * OSA membership form — Google Apps Script web app.
 *
 * Receives JSON POSTs from the website's /join page and stores each application
 * as a row in the bound Google Sheet — old students and teachers in separate tabs.
 * See ./README.md for setup and redeploy steps.
 */

// Optional: address that gets an email for every new application ("" = off).
const NOTIFY_EMAIL = "chcosaregistration@gmail.com";

const MIN_YEAR = 1900;

// How long a submission id is remembered, to ignore a resend of the same application (6 hours, the cache's limit).
const CACHE_SECONDS = 21600;

// [payload key, sheet header, required]. Headers use the same Tamil wording as the form labels.
const PERSONAL_FIELDS = [
  ["name", "முழுப்பெயர்", true],
  ["gender", "பால்", true],
  ["marital", "குடிசார்நிலை", true],
  ["dob", "பிறந்த திகதி", true],
  ["nic", "தேசிய அடையாள அட்டை இல.", true],
];
const CONTACT_FIELDS = [
  ["homeAddress", "சொந்த முகவரி", true],
  ["tempAddress", "தற்காலிக முகவரி", false],
  ["officeAddress", "அலுவலக முகவரி", false],
  ["phone", "தொலைபேசி இல. (WhatsApp)", true],
  ["email", "மின்னஞ்சல் முகவரி", true],
];
const MEMBERSHIP_FIELDS = [
  ["membershipType", "அங்கத்துவ வகை", true],
  ["emailConsent", "மின்னஞ்சல் தொடர்பாடலுக்கு ஒப்புதல்", true],
];

// One entry per applicant type (the website sends it as applicantType). Old students and teachers answer
// different questions, so each type has its own field list and its own sheet tab.
// `ranges` are [start, end] pairs where the end can't be lower than the start.
// Mirrored from src/pages/MembershipForm.jsx (HIDDEN).
const FORMS = {
  student: {
    label: "Old student",
    sheet: "Applications",
    fields: PERSONAL_FIELDS.concat(
      [["occupation", "தொழில்", true]],
      CONTACT_FIELDS,
      [
        ["admitNo", "கல்லூரி சேர்விலக்கம்", false],
        ["joinedYear", "சேர்ந்த ஆண்டு", true],
        ["joinedGrade", "சேர்ந்த வகுப்பு", true],
        ["leftYear", "கடைசியாகப் படித்த ஆண்டு", true],
        ["leftGrade", "கடைசியாகப் படித்த வகுப்பு", true],
        ["proof", "கல்வி கற்றதற்கான வேறு ஆதாரம்", false],
      ],
      MEMBERSHIP_FIELDS
    ),
    ranges: [["joinedYear", "leftYear"], ["joinedGrade", "leftGrade"]],
    summary: (v) => "Admission no.: " + (v.admitNo || "—"),
  },
  teacher: {
    label: "Teacher",
    sheet: "Teacher Applications",
    fields: PERSONAL_FIELDS.concat(
      CONTACT_FIELDS,
      [
        ["serviceFrom", "சேவை தொடங்கிய ஆண்டு", true],
        ["serviceTo", "சேவை முடிவடைந்த ஆண்டு", true],
      ],
      MEMBERSHIP_FIELDS
    ),
    ranges: [["serviceFrom", "serviceTo"]],
    summary: (v) => "Service period: " + v.serviceFrom + " – " + v.serviceTo,
  },
};

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
  serviceFrom: isValidYear_,
  serviceTo: isValidYear_,
  membershipType: (v) => v === "lifetime",
  emailConsent: (v) => v === "yes" || v === "no",
};

/** Run once from the editor: creates the sheet tabs with their headers and triggers authorization. */
function setup() {
  Object.keys(FORMS).forEach((type) => getSheet_(FORMS[type]));
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: real users never see this field. Pretend success so bots move on.
    if (data.website) return json_({ ok: true });

    // Copies of the site from before the teacher form don't send applicantType.
    const type = data.applicantType || "student";
    if (!Object.prototype.hasOwnProperty.call(FORMS, type)) return reject_("invalid_fields", ["applicantType"]);
    const form = FORMS[type];

    const values = {};
    form.fields.forEach((f) => (values[f[0]] = clean_(data[f[0]])));

    const missing = form.fields.filter((f) => f[2] && !values[f[0]]).map((f) => f[0]);
    if (missing.length) return reject_("missing_fields", missing);

    const invalid = Object.keys(RULES).filter((key) => values[key] && !RULES[key](values[key]));
    form.ranges.forEach((r) => {
      if (!invalid.length && Number(values[r[1]]) < Number(values[r[0]])) invalid.push(r[1]);
    });
    if (invalid.length) return reject_("invalid_fields", invalid);

    // The website resends a submission with the same id when it gets no answer; the id keeps that to one row.
    // Copies of the site from before this don't send one.
    const sentKey = data.submissionId ? "sub:" + clean_(data.submissionId).slice(0, 64) : "";
    const cache = CacheService.getScriptCache();

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = getSheet_(form);
      if (hasApplication_(values)) {
        // A resend of the submission that saved this row is a success; anyone else is told it's already there.
        return sentKey && cache.get(sentKey) ? json_({ ok: true }) : reject_("duplicate", ["name", "nic"]);
      }
      // Remembered before the row is written, so a resend is recognised even when a step after the write fails.
      if (sentKey) cache.put(sentKey, "1", CACHE_SECONDS);

      const row = [new Date()].concat(form.fields.map((f) => asText_(choiceLabel_(f[0], values[f[0]]))));
      const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
      range.setValues([row]);
      // Sheets may show only the date; set the format so the time shows too (in the spreadsheet's time zone).
      range.getCell(1, 1).setNumberFormat("dd/mm/yyyy hh:mm:ss");
      // Write the row before the lock is released, or the next submission would pick the same row number.
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }

    notify_(form, values);

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server_error" });
  }
}

/** Refuses a submission; the field names go to the execution log so a rejection can be traced. */
function reject_(error, fields) {
  console.warn(error + ": " + fields.join(", "));
  return json_({ ok: false, error: error, fields: fields });
}

/**
 * True when an application with the same full name and NIC number is already saved. Both tabs are
 * searched: someone who applied as an old student can't apply again as a teacher.
 */
function hasApplication_(values) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = comparable_(values.name);
  const nic = comparable_(values.nic);
  return Object.keys(FORMS).some((type) => {
    const form = FORMS[type];
    const sheet = ss.getSheetByName(form.sheet);
    const rows = sheet ? sheet.getLastRow() - 1 : 0; // the first row is the header
    if (rows < 1) return false;
    const names = sheet.getRange(2, column_(form, "name"), rows, 1).getValues();
    const nics = sheet.getRange(2, column_(form, "nic"), rows, 1).getValues();
    return nics.some((cell, i) => comparable_(cell[0]) === nic && comparable_(names[i][0]) === name);
  });
}

// A field's column in its applicant type's tab; column 1 is the submission time.
function column_(form, key) {
  return form.fields.findIndex((f) => f[0] === key) + 2;
}

// The same answer typed with different capitals or spacing still counts as the same.
function comparable_(value) {
  return String(value).replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * Emails NOTIFY_EMAIL about a new application. The row is already saved by now, so a mail problem
 * (e.g. the daily sending quota running out) is only logged and never fails the submission.
 */
function notify_(form, values) {
  if (!NOTIFY_EMAIL) return;
  try {
    if (MailApp.getRemainingDailyQuota() < 1) {
      console.warn("Notification email skipped: the daily email quota is used up.");
      return;
    }
    MailApp.sendEmail(
      NOTIFY_EMAIL,
      "New OSA membership application (" + form.label + ") — " + values.name,
      "A new membership application was submitted.\n\nApplicant: " + form.label +
        "\nName: " + values.name +
        "\n" + form.summary(values) +
        "\n\nOpen the sheet (\"" + form.sheet + "\" tab): " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
    );
  } catch (err) {
    console.error(err);
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

// Sri Lankan numbers only: 0765463456, 765463456 or +94 765463456 (the space after +94 is optional).
function isValidPhone_(v) {
  return /^(0[1-9]\d{8}|[1-9]\d{8}|\+94 ?[1-9]\d{8})$/.test(v);
}

function isValidYear_(v) {
  return /^\d{4}$/.test(v) && Number(v) >= MIN_YEAR && Number(v) <= new Date().getFullYear();
}

// The college teaches grades 6–13 (the website sends the grade number).
function isValidGrade_(v) {
  return /^\d{1,2}$/.test(v) && Number(v) >= 6 && Number(v) <= 13;
}

function getSheet_(form) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(form.sheet) || ss.insertSheet(form.sheet);
  if (sheet.getLastRow() === 0) {
    const headers = ["சமர்ப்பித்த நேரம்"].concat(form.fields.map((f) => f[1]));
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
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
