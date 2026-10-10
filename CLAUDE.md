# AI for Academic Libraries - CLAUDE.md

## Project overview

Next.js 14 (App Router) curriculum portal built by Yulia Brusova - a library associate at St. Louis Community College who holds an MLIS from Valdosta State University (2026). The site delivers a curriculum for academic library professionals across three levels, mapped to the ACRL AI Competencies for Academic Library Workers (October 2025) at the sub-competency level and aligned with ALA's Guidance on the Use of Artificial Intelligence in Libraries (2026) and its six core values (Public Good, Intellectual Freedom, Privacy, Sustainability, DEIA, and Labor).

Live site: https://ai-in-academic-libraries.vercel.app  
Local dev: `npm run dev` in this directory

## Stack

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** with custom color tokens (see `tailwind.config.ts`)
- **No database** - all content lives in `content/modules.ts`
- **No auth** - fully public

## Directory structure

```
app/                    # Next.js App Router pages
  about/page.tsx        # About / site mission
  contact/page.tsx      # Contact form page (/contact)
  curriculum/page.tsx   # Full module index
  level/[level]/        # Level landing pages (foundations, applied, advanced)
  module/[slug]/        # Individual module pages
  resources/            # External links / references
  layout.tsx            # Root layout with Nav and Footer
components/
  nav.tsx               # Sticky header - Curriculum > Resources > Professional Development > About > Contact
  footer.tsx
  module-card.tsx
  badges.tsx
  contact-form.tsx      # Contact form - email, subject dropdown, message (Formspree)
content/
  modules.ts            # Single source of truth for all curriculum content
lib/
  types.ts              # TypeScript types for Module, Level, Audience, etc.
public/
  professional-development.html  # Standalone conference directory (152 entries) - has matching nav
  llms.txt                        # AI crawler index - lists all modules and site description for LLMs
```

## Content model

All curriculum data is in `content/modules.ts`. Each `Module` object has:

- `id`, `slug`, `title`, `level`, `audience`, `status`
- `acrlCompetencies` - maps to ACRL competency categories (`ethics`, `knowledge`, `analysis`, `application`)
- `acrlSubCompetencies` - specific sub-competency codes (e.g. `"2.1"`, `"3.1"`)
- `topics` - bullet list shown on the module card
- `objectives` - learning objectives
- `content` - optional rich content object (see below)
- `relatedModules` - slugs of related modules
- `isGap` - marks a planned module not yet written

`content` shape:
```ts
{
  intro: string                              // Opening practitioner-voice paragraph
  sections: { heading: string; body: string }[]  // Main prose sections (6–7 per module)
  practitionerNote?: string                  // Optional personal "from my library" reflection
  summary?: string[]                         // 5–6 bullet takeaways shown at module end
}
```

**Rich text in `body` / `intro`:** rendered by `renderBody` in `app/module/[slug]/page.tsx`. Supported markup: `\n\n` splits paragraphs, `**bold**`, `*italic*`, `[text](url)` and `**[text](url)**` links, and `\n- ` bullet lists. A paragraph beginning with `> ` renders as a red-toned caution callout box (first line is the bold lead, following `\n- ` items become the list) - used for the "prohibited data inputs" rule in Module 04.

Status values: `"published"` | `"coming-soon"`

**Current publish status (July 2026):** All 18 modules published. Module order: 01–05 Foundations, 06–13 Applied (13 = "AI, labor & the library worker"), 14–18 Advanced. Module `id` drives the display number, prev/next navigation, and the `moduleReferences` / `moduleReviewDates` keys, so ids must stay contiguous (1–18) and unique. In-content cross-references use module numbers (e.g. "Module 15" for agentic AI) - update them if modules are renumbered.

**Site name:** "AI for Academic Libraries" everywhere (titles, Open Graph, llms.txt). Page `metadata.title` is just the page name; the layout template appends " · AI for Academic Libraries". The domain stays `ai-in-academic-libraries`.

**Role tracks:** a role's track = modules tagged for that role or `both` (`pathModules()` in `lib/audience.ts`). The home page "Your track" line is computed from it, so retagging a module updates it. The last role picked on /curriculum is remembered on the device (`ail-role-v1`, `lib/role-memory.ts`); a `?role=` link wins. Progress checkmarks stay in `ail-progress-v1` (`lib/progress.ts`).

**Logo icons:** `npx tsx scripts/generate-icons.ts` renders the "AI" mark to `app/icon.png` (tab icon), `app/apple-icon.png` and `public/icons/*` (192, 512, maskable 512).

**QR code:** `components/site-qr-code.tsx` builds the code from `SITE_URL` at build time (`lib/qr.ts`, `qrcode` package); no QR script ships to the browser.

## Curriculum levels

| Level | Tailwind token | Description |
|-------|---------------|-------------|
| `foundations` | `forest` (#0F6E56) | Level 1 - conceptual foundations |
| `applied` | `navy` (#185FA5) | Level 2 - practical workflows |
| `advanced` | `amber` (#854F0B) | Level 3 - automation, vibe coding, agentic AI |

## Writing voice

Content is written in Yulia's practitioner voice. Key style markers to preserve:

- **First person** - "I have found," "In my practice," "At my community college library"
- **Long prose paragraphs** - no bullet points inside section bodies; everything in full sentences
- **"For example:" construction** - used frequently mid-paragraph to make abstract points concrete
- **"Such" as a callback pronoun** - "Such a workflow...," "Such a distinction..."
- **"In order to..."** - preferred over "To..." for formal transitions
- **"Additionally" / "Furthermore"** - paragraph-level transitions
- **Professional boundary statements** - each section ends with a clear statement about where human judgment remains irreplaceable
- **No hedging** - confident declarative voice; "The model does not..." not "The model may not..."

Do not flatten this into generic AI writing. Preserve the practitioner perspective when editing module content. The `practitionerNote` field is always personal and specific - a real story, not a general observation.

## Key conventions

- All module content edits go in `content/modules.ts` - never duplicate data elsewhere
- Page metadata (`title`, `description`) lives in each `page.tsx` file via `export const metadata`
- Color tokens come from `tailwind.config.ts` - use `forest`, `navy`, `amber` classes, not raw hex
- `SITE_URL` is read from `process.env.NEXT_PUBLIC_SITE_URL` with fallback to the Vercel URL
- No comments needed - types and naming are self-documenting

## Common tasks

**Publish a module:** Find the module in `content/modules.ts`, change `status: "coming-soon"` → `status: "published"`, add the full `content` block with `intro`, `sections[]`, `practitionerNote`, and `summary[]`. Run `npm run build` before pushing.

**Write a new module:** Follow the 6-section prose structure used in modules 09–11. Research the topic first, then write in Yulia's voice. Target ~3,500–4,500 words of content, ~20 min reading time. Always do `npm run build` to verify TypeScript before committing.

**Close a published module (revert to coming-soon):** Change `status: "published"` → `status: "coming-soon"`. Content is preserved.

**Edit About page:** `app/about/page.tsx` - also update the `metadata.description` to stay in sync.

**Add a resource:** `app/resources/page.tsx` (static list, no data file).

**Contact form:** `components/contact-form.tsx` - Formspree endpoint is hardcoded (`https://formspree.io/f/maqzoyoq`). Fields: email, subject (dropdown), message. Used on `/contact` page and homepage bottom section. Apostrophes in JSX must use `&apos;` (ESLint enforces this).

**Nav order:** Curriculum → Resources → Professional Development → About → Contact. Professional Development is a static HTML page (`public/professional-development.html`) inserted between Resources and About in both desktop and mobile menus via `navLinks.slice(0,2)` / `navLinks.slice(2)` split in `nav.tsx`.

**Professional development page:** `public/professional-development.html` - standalone HTML, not a Next.js route. Has its own matching nav (logo, all links, Start Learning CTA, mobile hamburger). Edit this file directly; no build step needed. Conference data is one `const CONFERENCES = [...]` array; add entries with the `/update-conferences` skill (never hand-edit). **Past vs. upcoming is computed at load time** (`isPast(c)` → `(dateEnd || dateSort) < today`) - there is no stored `past` field. Optional per-entry fields: `dateEnd` (YYYY-MM-DD, keeps multi-day events "Upcoming" until they end), `urlNote` (shown when `urlVerified` is false). Bump the footer "Last updated" date when the data changes.

**Update llms.txt:** `public/llms.txt` - edit directly when modules are published or coming-soon status changes. List only published module URLs; note coming-soon modules without links.

**Run locally:**
```bash
npm run dev     # http://localhost:3000
npm run build   # verify no type errors before pushing
```
