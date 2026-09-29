# Membership form → Google Sheet

The `/join` page posts each application to a Google Apps Script web app ([Code.gs](Code.gs)).
The script checks the answers again and appends a row to a Google Sheet.
There's no server to host and no public Google Form page that anyone can report.

Do this with the association's Google account (e.g. chcostasecretary@gmail.com), not a personal one.
That way the responses stay with the association.

## One-time setup

1. **Create the sheet.** In Google Drive, create a new Google Sheet, e.g. `OSA Membership Applications`.
2. **Add the script.** In the sheet, open **Extensions → Apps Script**. Replace the contents of `Code.gs` with [Code.gs](Code.gs) from this folder.
   To get an email for each new application, set `NOTIFY_EMAIL` at the top. Then save.
3. **Authorize.** Pick `setup` in the function dropdown and click **Run**. Google will ask for permissions.
   Click **Advanced → Go to … (unsafe)**; the warning appears because it's your own unverified script.
   When `setup` finishes, the sheet has an `Applications` tab with a header row.
   If you ran an older version of `setup` before, delete the old `Applications` tab first so the new columns are created.
4. **Deploy.** Click **Deploy → New deployment**, choose the gear icon, then **Web app**. Use these settings:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**

   Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. **Connect the website.** Set the URL as `VITE_MEMBERSHIP_SCRIPT_URL`:
   - locally, in `.env` (or `.env.development.local`, which only `npm run dev` reads)
   - on Cloudflare Pages, under **Workers & Pages → (project) → Settings → Variables and Secrets → Add**.
     Choose type **Text**, since the URL ends up in the public JS bundle anyway. Add it for **Production**, and for **Preview** too if you test on preview deployments.

   Then redeploy the site (**Deployments → … → Retry deployment**, or push a commit). Vite reads env vars at build time.

## Changing the script later

After you edit `Code.gs`, go to **Deploy → Manage deployments**, click the pencil, set *Version* to **New version**, and click **Deploy**.
The URL stays the same. **Deploy → New deployment** creates a *different* URL, and then you'd have to update the variable in Cloudflare too.

## Privacy

The sheet holds NIC numbers and addresses.
Share it only with committee members, using normal Drive sharing. Never use "Anyone with the link".
