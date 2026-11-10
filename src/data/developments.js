import officeFrontCover from "../assets/developments/office-front-road-tarring/1.jpg";
import drinkingWaterCover from "../assets/developments/drinking-water-renovation/1.jpg";
import drinkingWaterPhoto1 from "../assets/developments/drinking-water-renovation/2.jpg";
import drinkingWaterPhoto2 from "../assets/developments/drinking-water-renovation/3.jpg";
import drinkingWaterPhoto3 from "../assets/developments/drinking-water-renovation/4.jpg";
import drinkingWaterPhoto4 from "../assets/developments/drinking-water-renovation/5.jpg";
import computerDonationCover from "../assets/developments/computer-donation/1.jpg";
import computerDonationPhoto1 from "../assets/developments/computer-donation/2.jpg";
import computerDonationPhoto2 from "../assets/developments/computer-donation/3.jpg";
import groundRenovationCover from "../assets/developments/ground-renovation/1.jpg";
import groundRenovationPhoto1 from "../assets/developments/ground-renovation/2.jpg";


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
    title: "அலுவலக முன்பகுதியைச் செப்பனிட்டுத் தாரிடல்",
    status: "completed",
    summary: "நீண்டகாலமாகச் செப்பனிடப்படாதிருந்த அலுவலக முன்பகுதி, சங்கத்தின் ஏற்பாட்டில் செப்பனிடப்பட்டுத் தாரிடப்பட்டது.",
    long: "நீண்டகாலமாகச் செப்பனிடப்படாதிருந்த அலுவலக முன்பகுதி, பழைய மாணவர் ஆசிரியர் சங்கத்தின் ஏற்பாட்டில் செப்பனிடப்பட்டுத் தாரிடப்பட்டுள்ளது.",
    image: officeFrontCover,
    timeline: [
      {
        date: "2025",
        label: "பணி நிறைவும் பாடசாலையிடம் கையளிப்பும்",
        description: "பழைய மாணவரும் பிரபல ஒப்பந்தகாரருமான திரு. ச. சாந்தகுமார் (SK Construction) அவர்களின் முழுமையான அனுசரணையில் தாரிடும் பணி சிறப்பாக நிறைவேற்றப்பட்டு, பாடசாலையிடம் கையளிக்கப்பட்டது.",
      },
    ],
  },
  {
    id: "drinking-water-renovation",
    kicker: "அபிவிருத்தி",
    title: "குடிநீர் விநியோகப் பகுதிப் புனரமைப்பு",
    status: "completed",
    summary: "பாடசாலையின் குடிநீர் விநியோகப் பகுதி, சுவிஸ் பழைய மாணவர் சங்கத்தின் நிதி அனுசரணையில் புனரமைக்கப்பட்டது.",
    long: "பாடசாலையின் குடிநீர் விநியோகப் பகுதி, சுவிஸ் பழைய மாணவர் சங்கத்தின் நிதி அனுசரணையில் புனரமைக்கப்பட்டு மாணவர்களின் பாவனைக்கு வழங்கப்பட்டுள்ளது.",
    image: drinkingWaterCover,
    timeline: [
      {
        date: "2026", 
        label: "புனரமைப்புப் பணி நிறைவும் கையளிப்பும்",
        description: "சுவிஸ் பழைய மாணவர் சங்கத்தின் முழுமையான அனுசரணையில் பாடசாலையின் குடிநீர் விநியோகப் பகுதி சிறப்பாகப் புனரமைக்கப்பட்டு, மாணவர்களின் பாவனைக்காகக் கையளிக்கப்பட்டது.",
        photos: [ drinkingWaterPhoto1, drinkingWaterPhoto2, drinkingWaterPhoto3, drinkingWaterPhoto4],
      },
    ],
  },
  {
    id: "computer-donation",
    kicker: "அபிவிருத்தி",
    title: "கணினிக் கூடங்களுக்குக் கணினிகளும் சாதனங்களும்",
    status: "completed",
    summary: "சுவிஸ் பழைய மாணவர் சங்கம் ரூபா 12.5 மில்லியன் பெறுமதியான கணினிகளையும் சாதனங்களையும் கல்லூரிக்கு வழங்கியுள்ளது.",
    long: "எமது கல்லூரியின் கணினிக் கூடங்களுக்குரிய 35 முழுமையான கணினிகள், 45 கணினி மத்திய செயலாக்க அலகுகள், 10 மடிக்கணினிகள் உள்ளிட்ட, ரூபா 12.5 மில்லியன் பெறுமதியான தகவல் தொடர்பாடல் தொழில்நுட்பச் சாதனங்களை எமது சுவிஸ் பழைய மாணவர் சங்கம் வழங்கியுள்ளது.",
    image: computerDonationCover,
    timeline: [
      {
        date: "2024 புரட்டாதி 02",
        label: "சாதனங்கள் நிறுவப்பட்டுப் பாவனை ஆரம்பம்",
        description: "சுவிஸ் பழைய மாணவர் சங்கத்தினால் வழங்கப்பட்ட கணினிகளும் ஏனைய சாதனங்களும் கணினிக் கூடங்களில் முழுமையாக நிறுவப்பட்டு, செயற்பட ஆரம்பித்துள்ளன.",
        photos: [computerDonationCover, computerDonationPhoto1, computerDonationPhoto2],
      },
    ],
  },
  {
    id: "ground-renovation",
    kicker: "அபிவிருத்தி",
    title: "மைதானத்தில் உயர் அழுத்த நீர் விசிறித் தொகுதி",
    status: "completed",
    summary: "பொறியியலாளர் றமணன் ஜெயவீரசிங்கம் அவர்களின் அனுசரணையில் மைதானத்திற்கு நீர் விசிறித் தொகுதி நிர்மாணிக்கப்பட்டது.",
    long: "பழைய மாணவரும் நியூசிலாந்தில் வசிக்கும் பொறியியலாளருமான றமணன் ஜெயவீரசிங்கம் (க.பொ.த உ/த 2006) அவர்களின் தன்னார்வ அனுசரணையுடனும் பங்கேற்புடனும் எமது கல்லூரி விளையாட்டு மைதானத்திற்குரிய உயர் அழுத்த நீர் விசிறித் தொகுதி நிர்மாணிக்கப்பட்டு, 08.08.2024 அன்று கல்லூரியிடம் கையளிக்கப்பட்டுள்ளது.",
    image: groundRenovationCover,
    timeline: [
      {
        date: "2024 ஆவணி 08",
        label: "நிர்மாணப் பணி நிறைவும் கையளிப்பும்",
        description: "பொறியியலாளர் றமணன் ஜெயவீரசிங்கம் அவர்களின் அனுசரணையுடனும் பங்கேற்புடனும் நிர்மாணிக்கப்பட்ட உயர் அழுத்த நீர் விசிறித் தொகுதி கல்லூரியிடம் கையளிக்கப்பட்டது.",
        photos: [groundRenovationCover, groundRenovationPhoto1],
      },
    ],
  },
];

export const getRecentDevelopments = (count = 3) => DEVELOPMENTS.slice(0, count);

export const getDevelopmentById = (id) => DEVELOPMENTS.find((item) => item.id === id);

export const getLatestEntry = (development) => development.timeline[development.timeline.length - 1];
