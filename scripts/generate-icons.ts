/**
 * generate-icons.ts — renders the "AI" logo mark (the green square in the nav) to PNG files.
 *
 * Usage: npx tsx scripts/generate-icons.ts
 *
 * Output:
 *   app/icon.png                     browser tab icon
 *   app/apple-icon.png               iPhone/iPad home screen (180, full square; iOS rounds it)
 *   public/icons/icon-192.png        rounded square, transparent corners
 *   public/icons/icon-512.png        rounded square, transparent corners
 *   public/icons/icon-maskable-512.png  full square, mark kept inside Android's safe zone
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Same values as .logo-mark in app/globals.css and the nav (w-8 h-8 rounded-lg, text-sm bold).
const GRADIENT = "linear-gradient(150deg, #14876a, #0F6E56 55%, #0b5745)";
const RADIUS = 8 / 32;
const TEXT = 14 / 32;

type Icon = { file: string; size: number; rounded: boolean; textScale: number };

const icons: Icon[] = [
  { file: "app/icon.png", size: 96, rounded: true, textScale: TEXT * 1.15 },
  { file: "app/apple-icon.png", size: 180, rounded: false, textScale: TEXT },
  { file: "public/icons/icon-192.png", size: 192, rounded: true, textScale: TEXT },
  { file: "public/icons/icon-512.png", size: 512, rounded: true, textScale: TEXT },
  { file: "public/icons/icon-maskable-512.png", size: 512, rounded: false, textScale: TEXT * 0.8 },
];

function html({ size, rounded, textScale }: Icon) {
  return `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=block" rel="stylesheet">
<style>
  html, body { margin: 0; background: transparent; }
  .mark {
    width: ${size}px; height: ${size}px;
    border-radius: ${rounded ? Math.round(size * RADIUS) : 0}px;
    background: ${GRADIENT};
    box-shadow: ${size <= 96 ? "inset 0 2px 0 rgba(255,255,255,.2)" : "none"};
    display: flex; align-items: center; justify-content: center;
    color: #fff; font: 700 ${Math.round(size * textScale)}px/1 Inter, system-ui, sans-serif;
    letter-spacing: -0.01em;
  }
</style></head><body><div class="mark">AI</div></body></html>`;
}

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const icon of icons) {
    await page.setViewport({ width: icon.size, height: icon.size, deviceScaleFactor: 1 });
    await page.setContent(html(icon), { waitUntil: "load" });
    const hasInter = await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check('700 16px "Inter"');
    });
    if (!hasInter) throw new Error("Inter did not load - check the network and retry.");
    const out = path.join(ROOT, icon.file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await page.screenshot({ path: out as `${string}.png`, omitBackground: true });
    console.log(`Saved ${icon.file} (${icon.size}×${icon.size})`);
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
