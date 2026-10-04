// Every image in src/assets/gallery/<album-id>/ is picked up automatically, in file-name order — no per-photo imports.
const files = import.meta.glob("../assets/gallery/*/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" });

const LOCAL_PHOTOS = {};
for (const [path, url] of Object.entries(files)) {
  const [albumId, name] = path.split("/").slice(-2);
  (LOCAL_PHOTOS[albumId] ??= []).push({ name, url });
}

const isCover = (file) => /^cover/i.test(file.name);

// Newest first. An album hosted outside the repo sets its own `photos` (and `cover`) as full URLs instead of using a folder.
const ALBUMS = [
  {
    id: "sangamam-2026",
    caption: "இந்துவின் சங்கமம் 2026",
    date: "2026 ஐப்பசி 03",
    coverFit: "contain",
  },
];

export const GALLERY_PHOTOS = ALBUMS.map((album) => {
  const local = (LOCAL_PHOTOS[album.id] ?? []).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  // The build gives byte-identical files one shared URL, so a photo saved twice would otherwise show twice.
  const photos = album.photos ?? [...new Set(local.filter((file) => !isCover(file)).map((file) => file.url))];
  const cover = album.cover ?? local.find(isCover)?.url ?? photos[0];
  return { ...album, cover, photos };
});

export const getGalleryAlbumById = (id) => GALLERY_PHOTOS.find((album) => album.id === id);
