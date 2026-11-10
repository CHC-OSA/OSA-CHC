/**
 * OSA membership payment receipts — Google Apps Script web app.
 *
 * Receives JSON POSTs from the website's /join?view=receipt page. It is kept separate from the
 * membership application script (apps-script/membership), with its own sheet and its own URL.
 * Each receipt file is saved in the Drive folder "receipts", and each upload is a row in the bound sheet.
 * See ./README.md for setup and redeploy steps.
 */

// Optional: address that gets an email for every uploaded receipt ("" = off).
const NOTIFY_EMAIL = "chcosaregistration@gmail.com";

// The Drive folder (in the script owner's My Drive) that receives the files. Found by name, or created.
const FOLDER_NAME = "receipts";

const SHEET_NAME = "Payment Receipts";

// [payload key, sheet header]. Headers use the same Tamil wording as the form labels.
const FIELDS = [
  ["name", "முழுப்பெயர்"],
  ["referenceNo", "உசாத்துணை இலக்கம்"],
  ["paidOn", "கட்டணம் செலுத்திய திகதி"],
  ["fileUrl", "பற்றுச்சீட்டு"],
];

// Mirrored from src/components/membership/ReceiptUpload.jsx (MAX_BYTES, FILE_TYPES).
const MAX_BYTES = 5 * 1024 * 1024;
const FILE_TYPES = { "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

// How long a submission id is remembered, to ignore a resend of the same upload (6 hours, the cache's limit).
const CACHE_SECONDS = 21600;

/** Run once from the editor: creates the sheet tab and finds or creates the "receipts" folder, and triggers authorization. */
function setup() {
  getSheet_();
  console.log("Receipts folder: " + getFolder_().getUrl());
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: real users never see this field. Pretend success so bots move on.
    if (data.website) return json_({ ok: true });

    const values = {
      name: clean_(data.name),
      referenceNo: clean_(data.referenceNo).toUpperCase(),
      paidOn: clean_(data.paidOn),
    };
    const missing = Object.keys(values).filter((key) => !values[key]);
    if (!data.fileData) missing.push("file");
    if (missing.length) return reject_("missing_fields", missing);

    const invalid = [];
    if (!isValidReferenceNo_(values.referenceNo)) invalid.push("referenceNo");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.paidOn)) invalid.push("paidOn");
    const ext = FILE_TYPES[data.mimeType];
    if (!ext) invalid.push("file");
    if (invalid.length) return reject_("invalid_fields", invalid);

    const bytes = Utilities.base64Decode(String(data.fileData));
    if (bytes.length > MAX_BYTES) return reject_("invalid_fields", ["file"]);

    // The website resends an upload with the same id when it gets no answer; the id keeps that to one file.
    const sentKey = data.submissionId ? "rcpt:" + clean_(data.submissionId).slice(0, 64) : "";
    const cache = CacheService.getScriptCache();

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (sentKey && cache.get(sentKey)) return json_({ ok: true });

      // e.g. "OSA-2026-0123 — S. Kumar — 20261110-143005.pdf"
      const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss");
      const fileName = values.referenceNo.replace(/\//g, "-") + " — " + values.name + " — " + stamp + "." + ext;
      values.fileUrl = getFolder_().createFile(Utilities.newBlob(bytes, data.mimeType, fileName)).getUrl();
      if (sentKey) cache.put(sentKey, "1", CACHE_SECONDS);

      const sheet = getSheet_();
      const row = [new Date()].concat(FIELDS.map((f) => (f[0] === "fileUrl" ? values.fileUrl : asText_(values[f[0]]))));
      const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
      range.setValues([row]);
      // Sheets may show only the date; set the format so the time shows too (in the spreadsheet's time zone).
      range.getCell(1, 1).setNumberFormat("dd/mm/yyyy hh:mm:ss");
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }

    notify_(values);
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

// The reference number emailed to each applicant. Its format isn't fixed yet:
// letters, digits, "/" and "-", up to 20 characters (e.g. OSA/2026/0123).
function isValidReferenceNo_(v) {
  return /^[A-Z0-9][A-Z0-9/-]{0,19}$/.test(v);
}

// The folder's id is remembered after the first lookup, so renaming or moving the folder later is fine.
function getFolder_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("RECEIPT_FOLDER_ID");
  if (id) {
    try {
      return DriveApp.getFolderById(id);
    } catch (err) {
      console.warn("Receipts folder " + id + " not found; looking it up by name again.");
    }
  }
  const found = DriveApp.getRootFolder().getFoldersByName(FOLDER_NAME);
  const folder = found.hasNext() ? found.next() : DriveApp.createFolder(FOLDER_NAME);
  props.setProperty("RECEIPT_FOLDER_ID", folder.getId());
  return folder;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    const headers = ["பதிவேற்றிய நேரம்"].concat(FIELDS.map((f) => f[1]));
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

/** The file and row are already saved by now, so a mail problem is only logged and never fails the upload. */
function notify_(values) {
  if (!NOTIFY_EMAIL) return;
  try {
    if (MailApp.getRemainingDailyQuota() < 1) {
      console.warn("Notification email skipped: the daily email quota is used up.");
      return;
    }
    MailApp.sendEmail(
      NOTIFY_EMAIL,
      "New OSA membership payment receipt — " + values.referenceNo + " — " + values.name,
      "A payment receipt was uploaded.\n\nName: " + values.name +
        "\nReference no.: " + values.referenceNo +
        "\nPaid on: " + values.paidOn +
        "\nReceipt: " + values.fileUrl +
        "\n\nOpen the sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
    );
  } catch (err) {
    console.error(err);
  }
}

function clean_(value) {
  return String(value || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, 200);
}

// Leading apostrophe keeps Sheets from treating input as a formula or number.
function asText_(value) {
  return value ? "'" + value : "";
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
