# Content Guide — Adding Events, Developments & Gallery Photos

This is a step-by-step guide for adding new entries to the **Events** tab, the **Developments** tab, and the **Gallery** page, including how to add photos. No coding knowledge is required beyond carefully editing the files below.

There is no admin panel — content lives directly in three JavaScript data files inside the project:

| Tab | Data file | What it's for |
|---|---|---|
| Events (`/events`) | `src/data/events.js` | One-off happenings: ceremonies, reunions, awards, announcements, news |
| Developments (`/developments`) | `src/data/developments.js` | Ongoing infrastructure/construction projects, tracked with a status and a dated progress timeline |
| Gallery (`/gallery`) | `src/data/gallery.js` | A simple photo wall — no dates or write-ups, just photos with a short caption each |

These are **not interchangeable** — a school building project belongs in Developments (so it gets a status badge and timeline); a one-time event or announcement belongs in Events; a photo with no story to tell belongs in the Gallery.

After making any change below, always preview it locally before considering it "published":

```bash
npm run dev
```

Then open `http://localhost:5173` and check the page you edited.

> **Important — always `import` photos, never type a raw `/src/...` path as a string.** A path like `image: "/src/assets/events/foo/1.jpg"` happens to *look* correct when you run `npm run dev`, but it silently breaks once the site is built for production (`npm run build`) — the photo just won't exist on the live site. Always add an `import` line at the top of the file and reference the imported variable instead (shown in every example below). Run `npm run build` before publishing to catch this kind of mistake.

---

## 1. Adding a new Event

Open `src/data/events.js`. It exports one array called `EVENTS`. Each event is an object with these fields:

| Field | Required | Description |
|---|---|---|
| `id` | Yes | A short, unique, URL-safe identifier — **lowercase English letters, numbers, and hyphens only, no spaces**. This becomes the page URL (`/events/<id>`) and, if you add photos, the name of the photo folder (see §2). Example: `"annual-sports-day-2027"`. |
| `kicker` | Yes | A short label shown above the title (e.g. `"நிகழ்வு"`, `"சாதனை"`, `"அறிவிப்பு"`, `"செய்தி"`, `"நன்கொடை"`). Free text — pick whatever best describes the entry. |
| `title` | Yes | The headline, shown on the card and detail page. |
| `body` | Yes | A 1–2 sentence summary, shown on the card. |
| `meta` | Yes | A short date or status line shown on the card (e.g. `"2026 டிசம்பர் 06"` or `"விண்ணப்பம் திறந்துள்ளது"`). Free text, not a strict date field. |
| `long` | Yes | The full paragraph shown on the event's own detail page. |
| `image` | No | Cover photo for the card — see §2. |
| `gallery` | No | Up to 3 photos for the detail page — see §2. |

**Where in the array to add it:** the array order controls what shows first. The homepage "recent" strip always shows the **first 3 entries** in the array, and the `/events` listing page shows them in the same order. So **add new events at the very top of the array** (right after `export const EVENTS = [`) to keep the newest content first.

**Template — copy, fill in, and paste at the top of the array:**

```js
{
  id: "your-short-id-here",
  kicker: "நிகழ்வு",
  title: "தலைப்பு இங்கே",
  body: "ஓரிரு வாக்கியச் சுருக்கம் இங்கே.",
  meta: "2026 டிசம்பர் 25",
  long: "முழு விபரம் இங்கே — ஒரு பத்தி அளவு.",
},
```

---

## 2. Adding photos to an Event

Photos are **optional**. If you skip this section, the card and detail page simply show a gray placeholder box instead — nothing breaks. (`foundation-stone-2026` and `book-donation-2026` in the current file are real, working examples you can copy the pattern from.)

**Step 1 — create a folder for this event's photos**, named exactly after the event's `id`:

```
src/assets/events/<event-id>/
```

Example, for `id: "annual-sports-day-2027"`:

```
src/assets/events/annual-sports-day-2027/cover.jpg
src/assets/events/annual-sports-day-2027/photo-1.jpg
src/assets/events/annual-sports-day-2027/photo-2.jpg
src/assets/events/annual-sports-day-2027/photo-3.jpg
```

- `cover.jpg` is used on the event card in the `/events` list (16:10 ratio looks best — e.g. 1600×1000px).
- `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg` are used in the 3-photo gallery on the event's own detail page (roughly 4:3 looks best). You can add 1, 2, or 3 of these — any you skip just show a placeholder in that slot.
- Use `.jpg`, `.png`, or `.webp`. Keep each file under ~1MB (compress large phone photos first) — they get bundled into the website.

**Step 2 — import the photos at the top of `src/data/events.js`**, above `export const EVENTS = [`:

```js
import sportsCover from "../assets/events/annual-sports-day-2027/cover.jpg";
import sportsPhoto1 from "../assets/events/annual-sports-day-2027/photo-1.jpg";
import sportsPhoto2 from "../assets/events/annual-sports-day-2027/photo-2.jpg";
```

**Step 3 — reference them in the event object:**

```js
{
  id: "annual-sports-day-2027",
  kicker: "நிகழ்வு",
  title: "விளையாட்டு விழா 2027",
  body: "...",
  meta: "2027 அக்டோபர் 20",
  long: "...",
  image: sportsCover,
  gallery: [sportsPhoto1, sportsPhoto2],
},
```

---

## 3. Adding a new Development

Open `src/data/developments.js`. It exports one array called `DEVELOPMENTS`. Each development is an object with these fields:

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Same rules as Events — short, unique, lowercase-hyphenated, English only. Becomes `/developments/<id>` and the photo folder name. |
| `kicker` | Yes | A short category label (e.g. `"கல்வி உட்கட்டமைப்பு"`, `"நலவாழ்வு"`). |
| `title` | Yes | The project name. |
| `status` | Yes | **Must be exactly one of:** `"ongoing"`, `"completed"`, or `"planned"` (these three values only — anything else will show a broken badge). |
| `summary` | Yes | A 1–2 sentence description shown on the card and detail page. |
| `timeline` | Yes | An array of progress updates, oldest first (see below). |
| `image` | No | Cover/banner photo — see §4. |

Each entry in `timeline` is an object:

```js
{
  date: "2026 சனவரி 20",
  label: "அடிக்கல் நாட்டல் விழா",
  description: "ஒரு வாக்கிய விளக்கம் இங்கே.",
}
```

Add new timeline entries to the **end** of a development's `timeline` array (oldest → newest), since the detail page shows them in that order and the card shows the *last* entry as the "latest update."

**Where in the `DEVELOPMENTS` array to add a brand-new project:** same rule as Events — add it at the top so it appears first in the homepage "recent" strip and the `/developments` listing.

**Template for a brand-new development:**

```js
{
  id: "your-short-id-here",
  kicker: "வகைப்பாடு இங்கே",
  title: "திட்டத்தின் பெயர்",
  status: "planned",
  summary: "ஓரிரு வாக்கியச் சுருக்கம் இங்கே.",
  timeline: [
    {
      date: "2026 டிசம்பர் 01",
      label: "திட்டம் அறிமுகப்படுத்தப்பட்டது",
      description: "ஒரு வாக்கிய விளக்கம் இங்கே.",
    },
  ],
},
```

---

## 4. Adding a photo to a Development

Same idea as Events, but a development only ever has **one** photo, which is reused as both the card thumbnail and the wide detail-page banner.

**Step 1 — create the folder:**

```
src/assets/developments/<development-id>/cover.jpg
```

Aim for a wide image (roughly 21:9, e.g. 2100×900px) since it's also used as the full-width banner on the detail page.

**Step 2 — import it at the top of `src/data/developments.js`:**

```js
import scienceLabCover from "../assets/developments/science-lab/cover.jpg";
```

**Step 3 — add it to the entry:**

```js
{
  id: "science-lab",
  ...
  image: scienceLabCover,
},
```

---

## 5. Adding to the Gallery

The Gallery (`/gallery`) is simpler than Events/Developments — just a grid of photos with a caption each, no detail page, no dates, no status.

Open `src/data/gallery.js`. It exports one array called `GALLERY_PHOTOS`:

| Field | Required | Description |
|---|---|---|
| `id` | Yes | A short, unique, lowercase-hyphenated identifier. Used as the React key and as the recommended photo filename (see below) — doesn't appear in any URL. |
| `caption` | Yes | The short text shown under the photo. |
| `image` | No | The photo itself — omit it and a gray placeholder box shows instead. |

There's no "recent" slicing here — every entry in the array always shows, in array order. Add new photos wherever you like; putting them at the top keeps the newest photos first.

**Step 1 — add the photo file.** Unlike Events/Developments, a Gallery entry is just one photo, so no per-entry folder is needed — drop it straight into a shared folder, named after the `id`:

```
src/assets/gallery/<photo-id>.jpg
```

Example: `src/assets/gallery/founders-day-2027.jpg`. Aim for roughly 4:3 (e.g. 1200×900px), under ~1MB.

**Step 2 — import it at the top of `src/data/gallery.js`:**

```js
import foundersDay from "../assets/gallery/founders-day-2027.jpg";
```

**Step 3 — add an entry:**

```js
export const GALLERY_PHOTOS = [
  {
    id: "founders-day-2027",
    caption: "நிறுவனர் தினம் 2027",
    image: foundersDay,
  },
  // ...existing photos
];
```

---

## 6. Before you're done

- Run `npm run dev` and check:
  - The new entry shows up correctly on `/events`, `/developments`, or `/gallery`.
  - For Events/Developments, its detail page (`/events/<id>` or `/developments/<id>`) opens and looks right.
  - If you added photos, they appear as real images, not gray placeholder boxes.
- **Run `npm run build` and make sure it finishes without errors** — this is the step that actually catches broken image paths (a raw string path can look fine in `npm run dev` and still be broken; see the warning near the top of this guide).
- Double-check your `id` is unique within its file and uses only lowercase letters, numbers, and hyphens.
