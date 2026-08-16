import officeFrontCover from "../assets/developments/office-front-road-tarring/1.jpg";
import drinkingWaterCover from "../assets/developments/drinking-water-renovation/1.jpg";
import drinkingWaterPhoto1 from "../assets/developments/drinking-water-renovation/2.jpg";
import drinkingWaterPhoto2 from "../assets/developments/drinking-water-renovation/3.jpg";
import drinkingWaterPhoto3 from "../assets/developments/drinking-water-renovation/4.jpg";
import drinkingWaterPhoto4 from "../assets/developments/drinking-water-renovation/5.jpg";


export const STATUS_LABELS = {
  ongoing: "நடைபெறுகிறது",
  completed: "நிறைவுற்றது",
  planned: "திட்டமிடல் கட்டத்தில்",
};

export const STATUS_TAG_CLASS = {
  ongoing: "tag-accent-2",
  completed: "tag-accent",
  planned: "tag-outline",
};

export const DEVELOPMENTS = [
  {
    id: "office-front-road-tarring",
    kicker: "அபிவிருத்தி",
    title: "அலுவலக முன்பகுதி மீள் செப்பனிட்டு தாரிடுதல்",
    status: "completed",
    summary: "நீண்டகாலமாக செப்பனிடப்படாமல் இருந்த அலுவலக முன்பகுதி, பழைய மாணவர் சங்கத்தின் ஏற்பாட்டில் மீள் செப்பனிடப்பட்டு தாரிடப்பட்டுள்ளது.",
    image: officeFrontCover,
    timeline: [
      {
        date: "2025",
        label: "பணி நிறைவும் பாடசாலையிடம் ஒப்படைப்பும்",
        description: "பழைய மாணவரும் பிரபல ஒப்பந்தகாரருமான திரு ச.சாந்தகுமார் (SK Construction) அவர்களின் முழுமையான அனுசரணையில் தாரிடும் பணி சிறப்பாக நிறைவேற்றப்பட்டு பாடசாலையிடம் ஒப்படைக்கப்பட்டது.",
      },
    ],
  },
  {
    id: "drinking-water-renovation",
    kicker: "அபிவிருத்தி",
    title: "குடிநீர் விநியோகப் பகுதி புனரமைப்பு",
    status: "completed",
    summary: "பாடசாலையில் உள்ள குடிநீர் விநியோகப் பகுதியானது சுவிஸ் பழைய மாணவர் சங்கத்தின் நிதி அனுசரணையில் மீளப் புனரமைக்கப்பட்டு மாணவர்களின் பாவனைக்கு வழங்கப்பட்டுள்ளது.",
    image: drinkingWaterCover,
    timeline: [
      {
        date: "2026", 
        label: "புனரமைப்பு பணி நிறைவும் கையளிப்பும்",
        description: "சுவிஸ் பழைய மாணவர் சங்கத்தின் முழுமையான அனுசரணையில் பாடசாலையின் குடிநீர் விநியோகப் பகுதி சிறப்பாக மீளப் புனரமைக்கப்பட்டு மாணவர்களின் பாவனைக்காக கையளிக்கப்பட்டது.",
        photos: [ drinkingWaterPhoto1, drinkingWaterPhoto2, drinkingWaterPhoto3, drinkingWaterPhoto4],
      },
    ],
  }
  // {
  //   id: "science-lab",
  //   kicker: "கல்வி உட்கட்டமைப்பு",
  //   title: "புதிய அறிவியல் ஆய்வுகூடம்",
  //   status: "ongoing",
  //   summary: "மாணவர்களுக்கான நவீன அறிவியல் ஆய்வுகூடக் கட்டிடம் நிர்மாணிக்கப்பட்டு வருகிறது.",
  //   timeline: [
  //     {
  //       date: "2025 நவம்பர் 10",
  //       label: "திட்டம் அங்கீகரிக்கப்பட்டது",
  //       description: "பாடசாலை அபிவிருத்திக் குழுவினால் புதிய அறிவியல் ஆய்வுகூடக் கட்டிடத் திட்டம் அங்கீகரிக்கப்பட்டது.",
  //     },
  //     {
  //       date: "2026 சனவரி 20",
  //       label: "அடிக்கல் நாட்டல் விழா",
  //       description: "பழைய மாணவர் சங்கத் தலைவரின் தலைமையில் அடிக்கல் நாட்டல் நிகழ்வு இடம்பெற்றது.",
  //     },
  //     {
  //       date: "2026 மே 05",
  //       label: "கட்டிட வேலைகள் — 60% நிறைவு",
  //       description: "மேற்கூரை மற்றும் சுவர் வேலைகள் நிறைவடைந்து, மின்சாரப் பொருத்துகைகள் தொடங்கியுள்ளன.",
  //     },
  //     {
  //       date: "2026 ஆகஸ்ட் 01",
  //       label: "உபகரண கொள்வனவு தொடக்கம்",
  //       description: "ஆய்வுகூட மேசைகள், வேதியியல்/உயிரியல் உபகரணங்கள் கொள்வனவு செய்யப்பட்டு வருகின்றன.",
  //     },
  //   ],
  // },
  // {
  //   id: "library-renovation",
  //   kicker: "உட்கட்டமைப்பு",
  //   title: "நூலக புனரமைப்புத் திட்டம்",
  //   status: "ongoing",
  //   summary: "பாடசாலை நூலகத்தை நவீனப்படுத்தும் பணிகள் தொடர்கின்றன.",
  //   timeline: [
  //     {
  //       date: "2025 செப்டம்பர் 01",
  //       label: "நிதி சேகரிப்பு பிரச்சாரம் தொடக்கம்",
  //       description: "பழைய மாணவர் சங்கத்தினால் நூலக நிதி திட்டம் அறிமுகப்படுத்தப்பட்டது.",
  //     },
  //     {
  //       date: "2026 பெப்ரவரி 14",
  //       label: "இருக்கைகளும் அலமாரிகளும் மாற்றியமைக்கப்பட்டன",
  //       description: "பழைய மரச்சாமான்கள் நீக்கப்பட்டு புதிய இருக்கை, வாசிப்பு மேசைகள் பொருத்தப்பட்டன.",
  //     },
  //     {
  //       date: "2026 சூன் 30",
  //       label: "கணினி மூலை சேர்க்கை",
  //       description: "மாணவர்களுக்கான 10 கணினிகளுடன் கூடிய டிஜிட்டல் வாசிப்பு மூலை திறக்கப்பட்டது.",
  //     },
  //   ],
  // },
  // {
  //   id: "water-project",
  //   kicker: "நலவாழ்வு",
  //   title: "சுத்தமான குடிநீர் திட்டம்",
  //   status: "ongoing",
  //   summary: "மாணவர்களுக்கான சுத்தமான குடிநீர் வசதியை உறுதி செய்யும் திட்டம்.",
  //   timeline: [
  //     {
  //       date: "2026 மார்ச் 05",
  //       label: "நீர் வடிகட்டி அமைப்பு பொருத்தப்பட்டது",
  //       description: "பாடசாலையின் முதன்மைக் கட்டிடத்தில் நீர் வடிகட்டி அமைப்பு பொருத்தப்பட்டது.",
  //     },
  //     {
  //       date: "2026 சூன் 20",
  //       label: "விநியோக பொருத்துகைகள் நீட்டிப்பு",
  //       description: "அனைத்து வகுப்பறை மாடிகளுக்கும் குடிநீர் விநியோகக் குழாய்கள் நீட்டிக்கப்பட்டன.",
  //     },
  //   ],
  // },
  // {
  //   id: "it-lab-upgrade",
  //   kicker: "தொழில்நுட்பம்",
  //   title: "கணினி ஆய்வுகூட மேம்படுத்தல்",
  //   status: "completed",
  //   summary: "பழைமையான கணினிகள் நீக்கப்பட்டு புதிய கணினி ஆய்வுகூடம் நிறுவப்பட்டது.",
  //   timeline: [
  //     {
  //       date: "2025 டிசம்பர் 01",
  //       label: "பழைய கணினிகள் அகற்றல்",
  //       description: "20 வருடங்களுக்கு மேலான பழைய கணினிகள் இனங்காணப்பட்டு அகற்றப்பட்டன.",
  //     },
  //     {
  //       date: "2026 சனவரி 15",
  //       label: "புதிய கணினிகள் நிறுவல்",
  //       description: "30 புதிய கணினிகளும் உயர்வேக இணையமும் நிறுவப்பட்டன.",
  //     },
  //     {
  //       date: "2026 பெப்ரவரி 28",
  //       label: "ஆய்வுகூடம் திறந்து வைக்கப்பட்டது",
  //       description: "புதிய கணினி ஆய்வுகூடம் அதிபரால் அதிகாரப்பூர்வமாக திறந்து வைக்கப்பட்டது.",
  //     },
  //   ],
  // },
  // {
  //   id: "sports-complex",
  //   kicker: "விளையாட்டு வசதிகள்",
  //   title: "விளையாட்டு மைதான மேம்பாடு",
  //   status: "planned",
  //   summary: "விளையாட்டு மைதானத்தை சர்வதேச தரத்திற்கு மேம்படுத்தும் திட்டமிடல் நடைபெறுகிறது.",
  //   timeline: [
  //     {
  //       date: "2026 ஏப்ரல் 10",
  //       label: "சாத்தியப்பாட்டு ஆய்வு",
  //       description: "மைதான விரிவாக்கம் மற்றும் ஓடுபாதை அமைப்பு தொடர்பான ஆரம்ப ஆய்வு நடைபெற்றது.",
  //     },
  //     {
  //       date: "2026 சூலை 18",
  //       label: "வடிவமைப்புத் திட்டம் சமர்ப்பணம்",
  //       description: "பொறியியலாளர் குழுவினால் மைதான வடிவமைப்பும் செலவுத் திட்டமும் நிர்வாகக் குழுவிடம் சமர்ப்பிக்கப்பட்டது.",
  //     },
  //   ],
  // },
];

export const getRecentDevelopments = (count = 3) => DEVELOPMENTS.slice(0, count);

export const getDevelopmentById = (id) => DEVELOPMENTS.find((item) => item.id === id);

export const getLatestEntry = (development) => development.timeline[development.timeline.length - 1];
