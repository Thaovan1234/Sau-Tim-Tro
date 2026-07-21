/**
 * Build the production static site from Xem_Trang_Web.html so Vercel
 * serves the exact prototype (not the partial React port).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcHtml = path.join(rootDir, "Xem_Trang_Web.html");
const publicDir = path.join(rootDir, "public");
const outHtml = path.join(publicDir, "index.html");
const assetsSrc = path.join(rootDir, "src", "assets");
const assetsOut = path.join(publicDir, "assets");

const requiredAssets = [
  "worm-mascot.png",
  "caterpillar.png",
  "drone-view.png",
  "map-bg.png",
  "fpt-university.jpg",
  "room-card-1.png",
  "room-card-2.png",
  "room-card-3.png",
  "room-card-4.png",
];

if (!fs.existsSync(srcHtml)) {
  console.error("Missing Xem_Trang_Web.html at repo root");
  process.exit(1);
}

fs.mkdirSync(assetsOut, { recursive: true });

for (const file of requiredAssets) {
  const from = path.join(assetsSrc, file);
  const to = path.join(assetsOut, file);
  if (!fs.existsSync(from)) {
    console.warn(`Skip missing asset: ${file}`);
    continue;
  }
  fs.copyFileSync(from, to);
}

// Also mirror a few public root assets used by the prototype
const publicRootAssets = ["pass_do_hero_mascot.png", "drone-view.png", "fpt-university.jpg"];
for (const file of publicRootAssets) {
  const from = path.join(publicDir, file);
  const assetCopy = path.join(assetsOut, file);
  if (fs.existsSync(from) && !fs.existsSync(assetCopy)) {
    fs.copyFileSync(from, assetCopy);
  }
}

let html = fs.readFileSync(srcHtml, "utf8");

// Rewrite local/dev paths so they work when public/ is the web root
html = html
  .replaceAll("src/assets/", "/assets/")
  .replaceAll("public/crawled_images/", "/crawled_images/")
  .replaceAll('src="crawled_vanminh_rooms.js"', 'src="/crawled_vanminh_rooms.js"')
  .replaceAll("src='crawled_vanminh_rooms.js'", "src='/crawled_vanminh_rooms.js'")
  .replaceAll('src="pass_do_hero_mascot.png"', 'src="/pass_do_hero_mascot.png"')
  .replaceAll("src='pass_do_hero_mascot.png'", "src='/pass_do_hero_mascot.png'");

// Ensure title encoding is fine and mark as production entry
if (!html.includes("data-site-source")) {
  html = html.replace(
    "<html",
    '<html data-site-source="Xem_Trang_Web.html"',
  );
}

fs.writeFileSync(outHtml, html, "utf8");

const sizeKb = Math.round(fs.statSync(outHtml).size / 1024);
console.log(`Prepared public/index.html (${sizeKb} KB) + /assets/* from Xem_Trang_Web.html`);
