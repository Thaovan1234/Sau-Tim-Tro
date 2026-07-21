import fs from "node:fs";
import path from "node:path";

function normalizeUrl(u) {
  if (!u || typeof u !== "string") return u;
  if (u.startsWith("//")) return "https:" + u;
  return u;
}

function loadRoomsFromJs(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start < 0 || end < 0) throw new Error("No array in " + filePath);
  return JSON.parse(text.slice(start, end + 1));
}

function dedupeRooms(rooms) {
  // Normalize all image URLs
  for (const r of rooms) {
    r.image = normalizeUrl(r.image);
    r.gallery = (r.gallery || []).map(normalizeUrl).filter(Boolean);
    r.gallery = [...new Set(r.gallery)];
  }

  // Build global unique pool from all images
  const allImages = [];
  for (const r of rooms) {
    if (r.image) allImages.push(r.image);
    for (const g of r.gallery || []) allImages.push(g);
  }
  const uniquePool = [...new Set(allImages)];

  // First pass: keep unique covers, mark conflicts
  const coverOwner = new Map(); // image -> room id
  const needsNewCover = [];

  for (const r of rooms) {
    const img = r.image;
    if (!img) {
      needsNewCover.push(r);
      continue;
    }
    if (!coverOwner.has(img)) {
      coverOwner.set(img, r.id);
    } else {
      needsNewCover.push(r);
    }
  }

  // Free pool = images not currently used as a unique cover
  const freePool = uniquePool.filter((img) => !coverOwner.has(img));
  let freeIdx = 0;
  let reassigned = 0;

  for (const r of needsNewCover) {
    // Prefer unused images from this room's gallery first
    let next = (r.gallery || []).find((g) => g && !coverOwner.has(g));
    if (!next) {
      while (freeIdx < freePool.length && coverOwner.has(freePool[freeIdx])) freeIdx++;
      next = freeIdx < freePool.length ? freePool[freeIdx++] : null;
    }
    if (next) {
      r.image = next;
      coverOwner.set(next, r.id);
      reassigned++;
    }
  }

  // Ensure gallery starts with cover and has up to 6 unique photos from free leftovers + own gallery
  const usedInAnyGallery = new Set();
  // Reserve covers so galleries don't steal exclusive covers of other rooms if possible
  const exclusiveCovers = new Set(coverOwner.keys());

  // Secondary pool for gallery padding: all unique images
  const galleryPool = uniquePool.slice();
  let gIdx = 0;

  for (const r of rooms) {
    const cover = r.image;
    let gallery = (r.gallery || []).filter(Boolean);
    // Keep gallery images that belong reasonably to this listing; dedupe
    gallery = [...new Set(gallery)];
    // Put cover first
    gallery = [cover, ...gallery.filter((x) => x !== cover)];

    // If gallery is too short or shares identical set with many rooms, try to diversify
    // by appending images from pool that aren't exclusive covers of other rooms (except own)
    while (gallery.length < 6 && gIdx < galleryPool.length) {
      const candidate = galleryPool[gIdx++];
      if (!candidate || gallery.includes(candidate)) continue;
      // Prefer non-cover images or this room's cover
      if (exclusiveCovers.has(candidate) && candidate !== cover) continue;
      gallery.push(candidate);
    }

    // Fallback: allow any unique remaining if still short
    while (gallery.length < Math.min(6, uniquePool.length)) {
      const candidate = uniquePool[(rooms.indexOf(r) * 7 + gallery.length) % uniquePool.length];
      if (!gallery.includes(candidate)) gallery.push(candidate);
      else break;
    }

    r.gallery = gallery.slice(0, 6);
    for (const g of r.gallery) usedInAnyGallery.add(g);
  }

  // Stats
  const covers = rooms.map((r) => r.image);
  const uniqueCovers = new Set(covers);
  return { rooms, reassigned, uniqueCovers: uniqueCovers.size, total: rooms.length };
}

function writeJs(filePath, rooms) {
  const body = JSON.stringify(rooms, null, 2);
  const out = `// Automatically generated database of Nhà trọ Văn Minh vacant rooms\nwindow.vanminhRoomsData = ${body};\n`;
  fs.writeFileSync(filePath, out, "utf8");
}

function writeTs(filePath, rooms) {
  const body = JSON.stringify(rooms, null, 2);
  const out = `// Automatically generated database of Nhà trọ Văn Minh vacant rooms
export type CrawledRoom = {
  id: string;
  title: string;
  price: number;
  area: number;
  location: string;
  district: string;
  school: string;
  badge: string;
  specialBadge: string;
  tags: string[];
  priceRange: string;
  image: string;
  gallery: string[];
  description: string;
  capacity: number;
  uniKey: string;
};

export const vanminhRooms: CrawledRoom[] = ${body};
`;
  fs.writeFileSync(filePath, out, "utf8");
}

const root = process.cwd();
const jsPath = path.join(root, "public", "crawled_vanminh_rooms.js");
const tsPath = path.join(root, "src", "lib", "crawled_vanminh_rooms.ts");
const jsAlt = path.join(root, "sautimtro", "public", "crawled_vanminh_rooms.js");
const tsAlt = path.join(root, "sautimtro", "src", "lib", "crawled_vanminh_rooms.ts");

const rooms = loadRoomsFromJs(jsPath);
const beforeCovers = new Set(rooms.map((r) => r.image)).size;
const result = dedupeRooms(rooms);
console.log(`Before unique covers: ${beforeCovers}`);
console.log(`After unique covers: ${result.uniqueCovers}/${result.total}`);
console.log(`Reassigned covers: ${result.reassigned}`);

writeJs(jsPath, result.rooms);
writeTs(tsPath, result.rooms);
if (fs.existsSync(jsAlt)) writeJs(jsAlt, result.rooms);
if (fs.existsSync(tsAlt)) writeTs(tsAlt, result.rooms);
console.log("Wrote deduped room data to public + src (+ sautimtro if present)");
