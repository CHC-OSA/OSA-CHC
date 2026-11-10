// The /join page talks to two separate Google Apps Script web apps, so applications and receipts never mix:
// - membership applications → apps-script/membership (VITE_MEMBERSHIP_SCRIPT_URL)
// - payment receipts        → apps-script/receipts   (VITE_RECEIPT_SCRIPT_URL)
const isSet = (url) => Boolean(url) && !url.includes("REPLACE_ME");

export const MEMBERSHIP_SCRIPT_URL = import.meta.env.VITE_MEMBERSHIP_SCRIPT_URL;
export const RECEIPT_SCRIPT_URL = import.meta.env.VITE_RECEIPT_SCRIPT_URL;
export const membershipScriptReady = isSet(MEMBERSHIP_SCRIPT_URL);
export const receiptScriptReady = isSet(RECEIPT_SCRIPT_URL);

// Identifies one submission: the script saves it once, even when it's sent again after an answer got lost.
export const newSubmissionId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Posts a JSON body and returns the script's reply; throws when there is none (offline, timed out, Google error page).
async function postToScript(url, body, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      // text/plain keeps this a "simple" request, so the browser skips the CORS preflight Apps Script can't answer.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      signal: controller.signal,
    });
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Sends the body up to `attempts` times. Only a lost answer or a server error can go better on another try.
export async function sendWithRetry(url, body, { timeoutMs, attempts, label }) {
  let result;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      result = await postToScript(url, body, timeoutMs);
    } catch (err) {
      result = undefined;
      console.error(`${label}: no answer from the script.`, err);
    }
    if (result && result.error !== "server_error") break;
  }
  return result;
}
