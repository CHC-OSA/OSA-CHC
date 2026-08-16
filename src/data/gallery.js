export const GALLERY_PHOTOS = [
  { id: "reunion-day-2025", caption: "மறுசந்திப்பு நாள் 2025", photos: [] },
  { id: "sports-day", caption: "விளையாட்டு விழா", photos: [] },
  { id: "graduation-ceremony", caption: "பட்டமளிப்பு விழா", photos: [] },
  { id: "centenary-celebration", caption: "நூற்றாண்டு விழா", photos: [] },
  { id: "old-building-1960s", caption: "பழைய கட்டிடம் — 1960கள்", photos: [] },
  { id: "annual-general-meeting", caption: "ஆண்டு பொது கூட்டம்", photos: [] },
];

export const getGalleryAlbumById = (id) => GALLERY_PHOTOS.find((album) => album.id === id);
