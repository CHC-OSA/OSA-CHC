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
    "கல்லூரியின் பழைய மாணவர்களினதும் நலன்விரும்பிகளினதும் பெருமனதுடனான பங்களிப்பினால் இத்திட்டம் நிறைவேற்றப்பட்டு வருகின்றது. திட்டத்தின் முன்னேற்றமும் நிதி சேகரிப்பு விபரங்களும் கட்டுமானப் பணிகள் தொடர்பான அண்மைய தகவல்களும் இப்பக்கத்தில் காலத்துக்குக் காலம் இற்றைப்படுத்தப்படும்.",
  ],
  image: modelImage,
  foundationEventId: "foundation-stone-2026",
};

// Money summary shown on the main page, copied from the treasurer's project snapshot. Amounts are in rupees and may
// have cents; `updatedOn` is the snapshot date as YYYY-MM-DD and is shown under the totals.
// donations + interest = total funds; total funds - spent = balance in hand.
export const FUNDS = {
  donations: 70377777.22,
  interest: 8872609.06, // savings and fixed-deposit interest, after withholding tax
  spent: 25988544.56,
  updatedOn: "2026-10-27",
};

// Committees appointed for the building project, in the order the committee sent them.
// `role` is the position within the committee; `note` is the member's designation or other office (optional).
// Technical committee names and designations are in English on purpose: the Tamil terms are not widely used.
export const PROJECT_COORDINATOR = {
  title: "செயற்திட்ட ஒருங்கிணைப்பாளர்",
  name: "திரு. ந. ஜதுர்சன்",
  note: "உறுப்பினர், பழைய மாணவர் சங்கம்",
};

export const COMMITTEES = [
  {
    id: "procurement",
    title: "செயற்திட்ட பெறுகைக்குழு",
    members: [
      { name: "திரு. ந. சர்வேஸ்வரன்", role: "தலைவர்", note: "அதிபர், சாவகச்சேரி இந்துக் கல்லூரி" },
      { name: "திரு. ஆ. தங்கவேலு", role: "உறுப்பினர்", note: "செயலாளர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. பு. குகானந்தன்", role: "உறுப்பினர்", note: "செயலாளர், பாடசாலை அபிவிருத்திச் சங்கம்" },
    ],
  },
  {
    id: "technical",
    title: "தொழில்நுட்ப குழு",
    members: [
      { name: "C. Eng. T. Jegananthan", role: "தலைவர்", note: "Chartered Engineer" },
      { name: "C. Eng. K. Thirukumar", role: "உறுப்பினர்", note: "Chartered Engineer" },
      { name: "C. Acc. T. Kalaiselvan", role: "உறுப்பினர்", note: "Chartered Accountant" },
      { name: "K. Sayanthan", role: "உறுப்பினர்", note: "Senior Lawyer" },
      { name: "C. Eng. S. Kanarajan", role: "உறுப்பினர்", note: "Chartered Engineer" },
      { name: "C. Eng. T. Kobiram", role: "உறுப்பினர்", note: "Chartered Engineer" },
      { name: "Eng. S. Sinthujan", role: "உறுப்பினர்", note: "Engineer" },
    ],
  },
  {
    id: "finance",
    title: "நிதிக் குழு",
    members: [
      { name: "திரு. க. முரளி", role: "தலைவர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. பொ. மனோகரன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. க. தர்சன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. யோ. அர்ச்சுனன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. க. எழிலாதவன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
    ],
  },
  {
    id: "audit",
    title: "கணக்காய்வுக் குழு",
    members: [
      { name: "கலாநிதி வி. சிறீதரன்", role: "தலைவர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. க. தசீதரன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. சு. சுமன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. வ. கௌசிகன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
      { name: "திரு. ஆ. செந்தூரன்", role: "உறுப்பினர்", note: "உறுப்பினர், பழைய மாணவர் சங்கம்" },
    ],
  },
];

// Set to true once the donor lists and receipts are ready to publish; until then the button is disabled.
export const DONOR_LISTS_PUBLISHED = false;

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
  completed: "கட்டுமானம் பூர்த்தியடைந்துள்ளது",
};

// `bays` is the phase's slice of the 10 classrooms on each floor, left to right as in the model picture.
// `funded` is how many of the phase's classrooms have their funds raised; they are ticked in number order.
// `floorConstruction` (optional) overrides the phase status for a whole floor: { 0: ground, 1: first, 2: second }.
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
    funded: 9,
    // The second floor (இரண்டாம் மாடி) has not been started yet; the first floor is under construction.
    floorConstruction: { 2: "pending" },
    updateCaptions: {},
  },
  {
    id: 2,
    title: "இரண்டாம் கட்டம்",
    status: "planned",
    donationsOpen: true,
    summary: "12 வகுப்பறைகளையும் ஒரு படிக்கட்டுத் தொகுதியையும் உள்ளடக்கியது. இக்கட்டத்திற்கான நிதிப்பங்களிப்பு முன்பதிவுகள் தற்போது ஏற்றுக்கொள்ளப்படுகின்றன.",
    scope: { classrooms: 12, staircases: 1, washrooms: 0 },
    bays: [4, 5, 6, 7],
    funded: 7,
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
    funded: 0,
    updateCaptions: {},
  },
];

// The only place to edit a single classroom. Key is the classroom number shown on the site: numbered phase by phase
// (Phase 1 = 1–9, Phase 2 = 10–21, Phase 3 = 22–30), ground floor first, left to right.
// Usually leave this empty and change a phase's `funded` count instead. `booked: true / false` overrides that count; `construction` overrides the phase default ("pending" | "ongoing" | "completed").
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
        construction: phase.floorConstruction?.[floor] ?? (phase.status === "planned" ? "pending" : phase.status),
        booked: number - firstNumber < (phase.funded ?? 0),
        ...CLASSROOM_OVERRIDES[number],
      };
    })
  );
});

// Per phase, newest first. `receipt` is a file name inside src/assets/building/receipts/phase-<n>/.
// { name: "திரு. க. பெயர்", date: "2026 ஐப்பசி 10", amount: 500000, receipt: "001.jpg" }
const DONORS = {
  1: [],
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

// Digits only, with cents when the amount has them: 79250386.28 → "79,250,386.28".
export const formatAmount = (amount) =>
  amount.toLocaleString("en-LK", { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 });

export const formatRupees = (amount) => `ரூபா ${formatAmount(amount)}`;

// Sums in cents so that adding and subtracting rupee amounts does not pick up floating-point dust.
export const addRupees = (...amounts) => Math.round(amounts.reduce((sum, amount) => sum + Math.round(amount * 100), 0)) / 100;

export const formatDate = (isoDate) => isoDate.split("-").reverse().join(".");
