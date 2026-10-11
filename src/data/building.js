import modelImage from "../assets/building/model.jpg";

// Receipts: src/assets/building/receipts/phase-<n>/<file>. Site photos: src/assets/building/updates/phase-<n>/<YYYY-MM-DD>/<file>.
// Both folders are picked up automatically — no per-photo imports.
const receiptFiles = import.meta.glob("../assets/building/receipts/*/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" });
const updateFiles = import.meta.glob("../assets/building/updates/*/*/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" });

export const BUILDING = {
  title: "புதிய மூன்று மாடிக் கட்டடத் தொகுதி",
  lead: "30 வகுப்பறைகளை உள்ளடக்கிய புதிய மூன்று மாடிக் கட்டடத் தொகுதியானது 3 கட்டங்களாக அமைக்கப்பட்டு வருகின்றது.",
  overview: [
    "சாவகச்சேரி இந்துக் கல்லூரியில் 3 மாடிகளையும் 30 வகுப்பறைகளையும் கொண்டமைந்த புதிய கட்டடத் தொகுதிக்கான அடிக்கல் 09.04.2026 அன்று சம்பிரதாயபூர்வமாக நாட்டப்பட்டது. இதன் கட்டுமானப் பணிகள் 3 கட்டங்களாக முன்னெடுக்கப்பட்டு வருகின்றன.",
    "கல்லூரியின் பழைய மாணவர்களினதும் நலன்விரும்பிகளினதும் பெருமனதுடனான பங்களிப்பினால் இத்திட்டம் நிறைவேற்றப்பட்டு வருகின்றது. கட்டுமானப் பணிகளின் தற்போதைய நிலை, நிதி திரட்டப்பட்டுள்ள வகுப்பறைகள் மற்றும் நன்கொடை விபரங்கள் என்பன இப்பக்கத்தில் காலத்துக்குக் காலம் இற்றைப்படுத்தப்படும்.",
  ],
  image: modelImage,
  foundationEventId: "foundation-stone-2026",
};

// Money summary shown on the main page. Amounts are whole rupees; `updatedOn` is YYYY-MM-DD — change it whenever the amounts change.
// SAMPLE FIGURES — replace with the real amounts before publishing.
export const FUNDS = {
  collected: 12500000,
  spent: 8750000,
  updatedOn: "2026-10-11",
};

export const FLOOR_LABELS = ["தரைத் தளம்", "முதலாம் மாடி", "இரண்டாம் மாடி"];

export const PHASE_STATUS_LABELS = {
  ongoing: "கட்டுமானப் பணிகள் நடைபெறுகின்றன",
  completed: "பூர்த்தியடைந்துள்ளது",
  planned: "திட்டமிடப்பட்டுள்ளது",
};

// Short forms for the phase cards, where the tag shares a row with the "கட்டம் n" label.
export const PHASE_STATUS_SHORT_LABELS = {
  ongoing: "நடைபெறுகின்றது",
  completed: "பூர்த்தியானது",
  planned: "திட்டமிடப்பட்டுள்ளது",
};

export const PHASE_STATUS_TAG_CLASS = {
  ongoing: "tag-accent-2",
  completed: "tag-accent",
  planned: "tag-outline",
};

export const CONSTRUCTION_LABELS = {
  pending: "கட்டுமானம் ஆரம்பிக்கப்படவில்லை",
  ongoing: "கட்டுமானம் நடைபெறுகின்றது",
  completed: "கட்டுமானம் பூர்த்தி",
};

// `bays` is the phase's slice of the 10 classrooms on each floor, left to right as in the model picture.
// `updateCaptions` is optional: { "2026-10-01": "ஒரு வரி விளக்கம்" }.
export const PHASES = [
  {
    id: 1,
    title: "முதலாம் கட்டம்",
    status: "ongoing",
    donationsOpen: false,
    summary: "9 வகுப்பறைகள், ஒரு படிக்கட்டுத் தொகுதி மற்றும் 3 கழிவறைத் தொகுதிகளை உள்ளடக்கியது. அத்திவாரப் பணிகள் பூர்த்தியடைந்து, கட்டுமானப் பணிகள் தற்போது முன்னெடுக்கப்பட்டு வருகின்றன.",
    scope: { classrooms: 9, staircases: 1, washrooms: 3 },
    bays: [1, 2, 3],
    updateCaptions: {},
  },
  {
    id: 2,
    title: "இரண்டாம் கட்டம்",
    status: "planned",
    donationsOpen: true,
    summary: "12 வகுப்பறைகளையும் ஒரு படிக்கட்டுத் தொகுதியையும் உள்ளடக்கியது. இக்கட்டத்திற்கான வகுப்பறை முன்பதிவுகள் தற்போது ஏற்றுக்கொள்ளப்படுகின்றன.",
    scope: { classrooms: 12, staircases: 1, washrooms: 0 },
    bays: [4, 5, 6, 7],
    updateCaptions: {},
  },
  {
    id: 3,
    title: "மூன்றாம் கட்டம்",
    status: "planned",
    donationsOpen: false,
    summary: "9 வகுப்பறைகளையும் 3 கழிவறைத் தொகுதிகளையும் உள்ளடக்கியது.",
    scope: { classrooms: 9, staircases: 0, washrooms: 3 },
    bays: [8, 9, 10],
    updateCaptions: {},
  },
];

// The only place to edit a single classroom. Key is the classroom number shown on the site: numbered phase by phase
// (Phase 1 = 1–9, Phase 2 = 10–21, Phase 3 = 22–30), ground floor first, left to right.
// `booked: true` marks it as booked; `construction` overrides the phase default ("pending" | "ongoing" | "completed").
// Who booked a classroom is deliberately not recorded here — the site only shows booked / not booked.
const CLASSROOM_OVERRIDES = {
  // 10: { booked: true },
  // 1: { construction: "completed" },
};

export const CLASSROOMS = PHASES.flatMap((phase, p) => {
  const firstNumber = PHASES.slice(0, p).reduce((sum, earlier) => sum + earlier.bays.length * 3, 0) + 1;
  return [0, 1, 2].flatMap((floor) =>
    phase.bays.map((bay, i) => {
      const number = firstNumber + floor * phase.bays.length + i;
      return {
        id: `F${floor}-B${bay}`,
        floor,
        bay,
        number,
        phase: phase.id,
        construction: phase.status === "planned" ? "pending" : phase.status,
        booked: false,
        ...CLASSROOM_OVERRIDES[number],
      };
    })
  );
});

// Per phase, newest first. `receipt` is a file name inside src/assets/building/receipts/phase-<n>/.
// { name: "திரு. க. பெயர்", date: "2026 ஐப்பசி 10", amount: 500000, receipt: "001.jpg" }
const DONORS = {
  // SAMPLE DONORS — replace with the real donors and receipts before publishing.
  1: [
    { name: "மாதிரி நன்கொடையாளர் 1", date: "2026 ஐப்பசி 10", amount: 500000, receipt: "sample-001.jpeg" },
    { name: "மாதிரி நன்கொடையாளர் 2", date: "2026 ஐப்பசி 09", amount: 250000, receipt: "sample-002.jpeg" },
  ],
  2: [],
  3: [],
};

export const getPhaseById = (id) => PHASES.find((phase) => phase.id === Number(id));

export const getClassroomsByPhase = (phaseId) => CLASSROOMS.filter((room) => room.phase === phaseId);

export function getClassroomStats(phaseId) {
  const rooms = phaseId ? getClassroomsByPhase(phaseId) : CLASSROOMS;
  return {
    total: rooms.length,
    completed: rooms.filter((room) => room.construction === "completed").length,
    booked: rooms.filter((room) => room.booked).length,
  };
}

export const getDonorsByPhase = (phaseId) =>
  (DONORS[phaseId] ?? []).map((donor) => ({
    ...donor,
    receipt: donor.receipt ? Object.entries(receiptFiles).find(([path]) => path.endsWith(`/phase-${phaseId}/${donor.receipt}`))?.[1] : undefined,
  }));

// One entry per dated folder, newest first.
export function getSiteUpdates(phaseId) {
  const phase = getPhaseById(phaseId);
  const byDate = {};
  for (const [path, url] of Object.entries(updateFiles)) {
    const [folder, date, name] = path.split("/").slice(-3);
    if (folder === `phase-${phaseId}`) (byDate[date] ??= []).push({ name, url });
  }
  return Object.entries(byDate)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, files]) => ({
      date,
      label: formatDate(date),
      caption: phase?.updateCaptions?.[date],
      photos: [...new Set(files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })).map((file) => file.url))],
    }));
}

export const formatRupees = (amount) => `ரூ. ${amount.toLocaleString("en-LK")}`;

export const formatDate = (isoDate) => isoDate.split("-").reverse().join(".");
