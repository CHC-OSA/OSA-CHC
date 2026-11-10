# Payment receipts → Google Drive

The receipt upload on `/join?view=receipt` posts to its own Google Apps Script web app ([Code.gs](Code.gs)).
It is kept apart from the membership application script ([../membership](../membership)): it has its own sheet,
its own URL and its own permissions, so the two never mix.

For each upload, the script:

- saves the file (PDF, JPG, PNG or WebP, up to 5 MB) in the Drive folder **`receipts`**, named
  `<reference number> — <name> — <date-time>`;
- adds a row to the `Payment Receipts` tab with the name, reference number (உசாத்துணை இலக்கம்), payment date and a link to the file;
- emails `NOTIFY_EMAIL`, if it is set.

Do this with the association's Google account, the same one that owns the membership sheet.

## One-time setup

1. **Create the sheet.** In Google Drive, create a new Google Sheet, e.g. `OSA Payment Receipts`.
2. **Add the script.** In that sheet, open **Extensions → Apps Script**. Replace the contents of `Code.gs` with [Code.gs](Code.gs) and save.
3. **Authorize.** Pick `setup` in the function dropdown and click **Run**. Google asks for access to Sheets, Drive and email;
   click **Advanced → Go to … (unsafe)** (it's your own unverified script). `setup` creates the `Payment Receipts` tab and
   uses the folder `receipts` in My Drive, creating it if there isn't one. The execution log shows the folder's link.
4. **Deploy.** **Deploy → New deployment** → gear icon → **Web app**, with *Execute as:* **Me** and *Who has access:* **Anyone**.
   Copy the **Web app URL** (it ends in `/exec`).
5. **Connect the website.** Set the URL as `VITE_RECEIPT_SCRIPT_URL`, locally in `.env.local` (restart `npm run dev`
   afterwards) and on Cloudflare Pages for **Production** and **Preview**. Then redeploy the site.

## Changing the script later

After editing `Code.gs`: **Deploy → Manage deployments** → pencil → *Version:* **New version** → **Deploy**. The URL stays the same.

## Privacy

The `receipts` folder and the sheet hold members' payment details. Share them only with committee members,
never with "Anyone with the link".
