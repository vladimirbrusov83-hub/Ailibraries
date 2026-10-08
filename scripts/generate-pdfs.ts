/**
 * generate-pdfs.ts — one branded PDF per curriculum module.
 *
 * Renders each module to HTML (reusing the site's exact renderInline/renderBody
 * markdown logic from app/module/[slug]/page.tsx) and prints it with Puppeteer,
 * so PDF typography/colors match the live site.
 *
 * Usage:
 *   npm run generate-pdfs        # all modules
 *   npx tsx scripts/generate-pdfs.ts 1   # only module id 1 (for spot-checking)
 *
 * Output: public/pdfs/module-##-slug.pdf
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import {
  modules,
  levelMeta,
  acrlCompetencyMeta,
  moduleReviewDates,
} from "../content/modules";
import { moduleReferences } from "../content/references";
import type { Level, Audience } from "../lib/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "pdfs");
const SITE_URL = "ai-in-academic-libraries.vercel.app";
const BRAND = "AI for Academic Libraries";
const AUTHOR = "Yulia Brusova";
const LICENSE = "Licensed under CC BY-NC-SA 4.0";

// Brand accent per level (from tailwind.config.ts).
const levelAccent: Record<Level, string> = {
  foundations: "#0F6E56",
  applied: "#185FA5",
  advanced: "#854F0B",
};

// Audience tag labels (from components/badges.tsx).
const audienceLabel: Record<Audience, string> = {
  practicing: "Practicing Librarian",
  digital: "Digital Librarian",
  both: "All Librarians",
};

// ── HTML escaping ────────────────────────────────────────────────────────────
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function attr(s: string): string {
  return esc(s).replace(/"/g, "&quot;");
}

// ── Ported from app/module/[slug]/page.tsx (branch order is load-bearing) ─────
function renderInline(text: string): string {
  const parts = text.split(
    /(\*\*\[[^\]]+\]\(https?:\/\/[^)]+\)\*\*|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g,
  );
  return parts
    .map((part) => {
      if (part.startsWith("**[")) {
        const m = part.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
        if (m)
          return `<strong><a href="${attr(m[2])}">${esc(m[1])}</a></strong>`;
      }
      if (part.startsWith("**") && part.endsWith("**"))
        return `<strong>${esc(part.slice(2, -2))}</strong>`;
      if (part.startsWith("*") && part.endsWith("*"))
        return `<em>${esc(part.slice(1, -1))}</em>`;
      if (part.startsWith("[")) {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) return `<a href="${attr(m[2])}">${esc(m[1])}</a>`;
      }
      return esc(part);
    })
    .join("");
}

function renderBody(text: string): string {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return paragraphs
    .map((para) => {
      if (para.startsWith("> ")) {
        const inner = para.replace(/^> ?/gm, "");
        const segs = inner.split("\n- ");
        const head = segs[0]
          ? `<p class="callout-head">${renderInline(segs[0])}</p>`
          : "";
        const list =
          segs.length > 1
            ? `<ul>${segs
                .slice(1)
                .map((it) => `<li>${renderInline(it)}</li>`)
                .join("")}</ul>`
            : "";
        return `<aside class="callout">${head}${list}</aside>`;
      }
      if (para.includes("\n- ")) {
        const parts = para.split("\n- ");
        const lead = parts[0] ? `<p>${renderInline(parts[0])}</p>` : "";
        const list = `<ul>${parts
          .slice(1)
          .map((it) => `<li>${renderInline(it)}</li>`)
          .join("")}</ul>`;
        return `<div class="list-block">${lead}${list}</div>`;
      }
      return `<p>${renderInline(para)}</p>`;
    })
    .join("");
}

// ── Integrity: catch markdown markers the parser failed to consume ────────────
function findLeakedMarkers(html: string): string[] {
  const leaks: string[] = [];
  if (/\*\*/.test(html)) leaks.push("unparsed ** (bold)");
  if (/\]\(https?:\/\//.test(html)) leaks.push("unparsed ](url) (link)");
  if (/(^|\n)- /.test(html)) leaks.push("unparsed '- ' (bullet)");
  return leaks;
}

// ── Per-module HTML document ─────────────────────────────────────────────────
function buildHtml(mod: (typeof modules)[number]): { html: string; bodyHtml: string } {
  const accent = levelAccent[mod.level];
  const meta = levelMeta[mod.level as Level];
  const refs = moduleReferences[mod.id] ?? [];
  const reviewed = moduleReviewDates[mod.id];
  const num = String(mod.id).padStart(2, "0");

  const objectivesHtml = mod.objectives
    .map(
      (o, i) =>
        `<li><span class="obj-num">${i + 1}</span><span>${esc(o)}</span></li>`,
    )
    .join("");

  const introHtml = mod.content?.intro
    ? `<div class="intro"><p>${esc(mod.content.intro)}</p></div>`
    : "";

  const sectionsHtml = (mod.content?.sections ?? [])
    .map(
      (s) =>
        `<section class="module-section"><h2>${esc(s.heading)}</h2>${renderBody(
          s.body,
        )}</section>`,
    )
    .join("");

  const noteHtml = mod.content?.practitionerNote
    ? `<div class="practitioner"><p class="kicker" style="color:${accent}">Practitioner note</p><p>${renderInline(
        mod.content.practitionerNote,
      )}</p></div>`
    : "";

  const takeawaysHtml =
    mod.content?.summary && mod.content.summary.length
      ? `<div class="takeaways"><p class="kicker">Key takeaways</p><ul>${mod.content.summary
          .map((p) => `<li><span class="dot" style="background:${accent}"></span><span>${renderInline(p)}</span></li>`)
          .join("")}</ul></div>`
      : "";

  const referencesHtml = refs.length
    ? `<section class="references"><h2>References</h2><p class="kicker">APA 7th edition</p><ol>${refs
        .map((r) => {
          const url = r.url
            ? ` <a class="ref-url" href="${attr(r.url)}">${esc(r.url)}</a>`
            : "";
          const note = r.note
            ? `<span class="ref-note">${esc(r.note)}</span>`
            : "";
          return `<li>${renderInline(r.text)}${url}${note}</li>`;
        })
        .join("")}</ol></section>`
    : "";

  const acrlHtml = `<section class="acrl"><h2 class="acrl-title">ACRL AI Competencies covered</h2><div class="chips">${mod.acrlCompetencies
    .map((c) => `<span class="chip">${esc(acrlCompetencyMeta[c].label)}</span>`)
    .join("")}</div><p class="acrl-sub">Sub-competencies: ${esc(
    mod.acrlSubCompetencies.join(", "),
  )} · ACRL AI Competencies (2025)</p></section>`;

  // Everything after the cover — used for the leaked-marker scan.
  const bodyHtml = `${introHtml}${sectionsHtml}${noteHtml}${takeawaysHtml}${referencesHtml}`;

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Module ${String(mod.id).padStart(2, "0")}: ${esc(mod.title)} - AI for Academic Libraries</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap" rel="stylesheet">
<style>
  :root { --accent: ${accent}; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    color: #44403c; font-size: 11pt; line-height: 1.65;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  h1, h2 { color: #1c1917; }
  a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }

  /* ── Cover ── */
  .cover { min-height: 8.7in; display: flex; flex-direction: column; page-break-after: always; }
  .cover-brand { font-size: 10pt; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--accent); }
  .cover-rule { height: 4px; width: 56px; background: var(--accent); border-radius: 2px; margin: 10px 0 0; }
  .cover-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 48px; }
  .tag { font-size: 9pt; font-weight: 600; padding: 4px 12px; border-radius: 999px; }
  .tag-level { color: #fff; background: var(--accent); }
  .tag-aud { color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, #fff); border: 1px solid color-mix(in srgb, var(--accent) 30%, #fff); }
  .cover-num { font-size: 13pt; font-weight: 600; color: #a8a29e; margin: 40px 0 6px; }
  .cover-title { font-size: 34pt; font-weight: 700; line-height: 1.12; margin: 0; color: #1c1917; }
  .cover-desc { font-size: 12pt; color: #57534e; margin-top: 18px; max-width: 34em; line-height: 1.5; }
  .cover-byline { font-size: 11pt; font-weight: 600; color: #292524; margin: 22px 0 0; }
  .cover-meta { font-size: 10pt; color: #78716c; margin-top: 6px; }
  .cover-spacer { flex: 1 1 auto; min-height: 24px; }
  .cover-foot { border-top: 1px solid #e7e5e4; padding-top: 16px; font-size: 9.5pt; color: #78716c; }
  .cover-foot strong { color: #292524; }
  .cover-foot .lic { color: #a8a29e; }

  /* ── Objectives ── */
  .objectives { border: 1px solid color-mix(in srgb, var(--accent) 30%, #fff);
    background: color-mix(in srgb, var(--accent) 8%, #fff); border-radius: 12px; padding: 22px 24px; margin: 4px 0 28px; }
  .objectives .kicker { color: var(--accent); }
  .objectives ul { list-style: none; margin: 0; padding: 0; }
  .objectives li { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 10px; font-size: 10.5pt; color: #44403c; }
  .obj-num { flex: 0 0 auto; width: 20px; height: 20px; border-radius: 999px; background: var(--accent);
    color: #fff; font-size: 8.5pt; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1px; }

  .kicker { font-size: 8.5pt; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #78716c; margin: 0 0 12px; }

  /* ── Body ── */
  .intro { border-left: 4px solid var(--accent); padding: 2px 0 2px 18px; margin: 0 0 26px; font-style: italic; }
  .intro p { margin: 0; color: #44403c; }
  .module-section { margin-bottom: 26px; }
  .module-section h2 { font-size: 16pt; font-weight: 600; margin: 0 0 12px; }
  .module-section p, .list-block p { margin: 0 0 14px; }
  .module-section ul, .list-block ul { margin: 0 0 14px; padding-left: 22px; }
  .module-section li, .list-block li { margin-bottom: 6px; }
  .list-block { margin-bottom: 14px; }
  section, .list-block, .callout, .takeaways, .practitioner { break-inside: avoid-column; }
  h2 { break-after: avoid; }

  /* ── Callout (site's red warning aside) ── */
  .callout { border: 1px solid #fecaca; background: #fef2f2; border-radius: 10px; padding: 14px 18px; margin: 0 0 22px; }
  .callout-head { color: #7f1d1d; font-weight: 600; margin: 0 0 6px; }
  .callout ul { margin: 0; padding-left: 20px; }
  .callout li { color: #44403c; margin-bottom: 4px; }

  /* ── Practitioner note ── */
  .practitioner { border: 1px solid color-mix(in srgb, var(--accent) 30%, #fff);
    background: color-mix(in srgb, var(--accent) 6%, #fff); border-radius: 10px; padding: 16px 18px; margin: 26px 0; }
  .practitioner p:last-child { margin: 0; }

  /* ── Key takeaways ── */
  .takeaways { border: 1px solid #e7e5e4; background: #fafaf9; border-radius: 12px; padding: 20px 24px; margin: 28px 0; }
  .takeaways ul { list-style: none; margin: 0; padding: 0; }
  .takeaways li { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; font-size: 10.5pt; }
  .takeaways .dot { flex: 0 0 auto; width: 7px; height: 7px; border-radius: 999px; margin-top: 7px; }

  /* ── References ── */
  .references { margin-top: 30px; padding-top: 22px; border-top: 1px solid #e7e5e4; }
  .references h2 { font-size: 14pt; font-weight: 600; margin: 0 0 4px; }
  .references ol { padding-left: 20px; margin: 0; }
  .references li { font-size: 10pt; color: #57534e; margin-bottom: 12px; line-height: 1.5; }
  .ref-url { color: #78716c; word-break: break-all; }
  .ref-note { display: block; margin-top: 3px; font-size: 8.5pt; color: #a8a29e; font-style: italic; }

  /* ── ACRL ── */
  .acrl { margin-top: 28px; background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 18px 20px; }
  .acrl-title { font-size: 11pt; font-weight: 600; color: #44403c; margin: 0 0 12px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
  .chip { font-size: 9.5pt; font-weight: 500; background: #fff; border: 1px solid #e7e5e4; color: #44403c; padding: 4px 12px; border-radius: 8px; }
  .acrl-sub { font-size: 9pt; color: #a8a29e; margin: 0; }
</style></head>
<body>
  <div class="cover">
    <div class="cover-brand">${esc(BRAND)}</div>
    <div class="cover-rule"></div>
    <div class="cover-tags">
      <span class="tag tag-level">${esc(meta.label)}</span>
      <span class="tag tag-aud">${esc(audienceLabel[mod.audience])}</span>
    </div>
    <div class="cover-num">Module ${num}</div>
    <h1 class="cover-title">${esc(mod.title)}</h1>
    <p class="cover-desc">${esc(mod.description)}</p>
    <p class="cover-byline">By ${esc(AUTHOR)}</p>
    <p class="cover-meta">${mod.estimatedMinutes} min read${
    reviewed ? ` &middot; Reviewed ${esc(reviewed)}` : ""
  }</p>
    <div class="cover-spacer"></div>
    <div class="cover-foot">
      <div><strong>${esc(BRAND)}</strong> &middot; ${esc(SITE_URL)}</div>
      <div class="lic">&copy; 2026 &middot; ${esc(LICENSE)}</div>
    </div>
  </div>

  <div class="objectives">
    <p class="kicker">What you&rsquo;ll be able to do</p>
    <ul>${objectivesHtml}</ul>
  </div>

  ${bodyHtml}
  ${acrlHtml}
</body></html>`;

  return { html, bodyHtml };
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const onlyArg = process.argv[2];
  const onlyId = onlyArg ? Number(onlyArg) : null;

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const targets = modules
    .filter((m) => m.status === "published")
    .filter((m) => (onlyId ? m.id === onlyId : true))
    .sort((a, b) => a.id - b.id);

  if (!targets.length) {
    console.error(`No modules matched${onlyId ? ` id ${onlyId}` : ""}.`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  const footerTemplate = `<div style="font-size:8px;width:100%;color:#a8a29e;font-family:Inter,system-ui,sans-serif;padding:0 0.9in;display:flex;justify-content:space-between;">
    <span>${SITE_URL}</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;

  const warnings: string[] = [];
  const generated: { file: string; kb: number; pages?: number }[] = [];
  let fontOk = true;

  for (const mod of targets) {
    const { html, bodyHtml } = buildHtml(mod);
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Font check — loud failure if Inter did not load.
    await page.evaluate(() => (document as any).fonts.ready);
    const hasInter = await page.evaluate(() =>
      (document as any).fonts.check('12px "Inter"'),
    );
    if (!hasInter) fontOk = false;

    const file = `module-${String(mod.id).padStart(2, "0")}-${mod.slug}.pdf`;
    const outPath = path.join(OUT_DIR, file);
    await page.pdf({
      path: outPath,
      format: "Letter",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate,
      margin: { top: "0.7in", bottom: "0.7in", left: "0.9in", right: "0.9in" },
    });
    await page.close();

    // ── Integrity checks (step 8) ──
    const issues: string[] = [];
    const leaks = findLeakedMarkers(bodyHtml);
    if (leaks.length) issues.push(...leaks);
    if (!mod.content?.intro) issues.push("missing intro");
    if (!mod.content?.sections?.length) issues.push("no sections");
    else {
      const empty = mod.content.sections.filter((s) => !s.body?.trim()).length;
      if (empty) issues.push(`${empty} empty section body`);
    }
    if (!mod.content?.summary?.length) issues.push("no key takeaways");
    if (!(moduleReferences[mod.id]?.length)) issues.push("no references");

    const kb = Math.round(fs.statSync(outPath).size / 1024);
    if (kb < 20) issues.push(`suspiciously small (${kb} KB)`);

    generated.push({ file, kb });
    if (issues.length)
      warnings.push(`module ${String(mod.id).padStart(2, "0")} (${mod.slug}): ${issues.join("; ")}`);

    console.log(
      `  ✓ ${file}  (${kb} KB${hasInter ? "" : ", ⚠ Inter NOT loaded"})`,
    );
  }

  await browser.close();

  console.log(`\nGenerated ${generated.length} PDF(s) → public/pdfs/`);
  if (!fontOk)
    console.log(
      "\n⚠ WARNING: Inter font did not load — PDFs fell back to a system font and will NOT match the site.",
    );
  if (warnings.length) {
    console.log("\n⚠ Content flags to spot-check:");
    for (const w of warnings) console.log(`   - ${w}`);
  } else {
    console.log("\nNo content-integrity flags. ✓");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
