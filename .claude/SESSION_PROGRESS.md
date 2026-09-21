# Session Progress — Hadeera Tariq Portfolio

Working notes for the migration off Lovable and the completion of the site.
Last updated: 2026-09-21.

---

## 0. Goal

Take this portfolio off Lovable entirely — remove every Lovable dependency and
reference, host it somewhere else, then finish the parts of the site that were
never really built.

Working branch: `remove-lovable` (cut from `main` @ `4b5b498`).

---

## 1. What this project is

A **single-page, single-route** portfolio site. Everything renders from
`src/routes/index.tsx` (419 lines); navigation is anchor-scroll within that one
page. There is no `/work/:slug`, no about page, no CMS, no data fetching.

**Stack:** TanStack Start (SSR React) · Vite 8 · React 19 · Tailwind v4 ·
TypeScript (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) ·
shadcn/ui (Radix) · lucide-react icons.

```
src/start.ts            server middleware — error wrapper + CSRF for server fns
src/server.ts           SSR fetch handler; unwraps h3's swallowed 500s
src/router.tsx          router + React Query client in route context (QC unused)
src/routes/__root.tsx   <html> shell, head meta/links, 404 + error boundary
src/routes/index.tsx    THE ENTIRE WEBSITE
src/components/project-drawer.tsx   right-side project detail panel
src/routeTree.gen.ts    auto-generated — never hand-edit
src/styles.css          all design tokens + keyframes (126 lines)
```

`src/components/ui/*` is ~50 stock shadcn components. **Only `button.tsx` is
actually used** by the site. The rest is unused scaffolding.

React Query is wired up but never used — nothing fetches anything at runtime.
This is what makes full static prerendering viable (see §6).

---

## 2. Design system (`src/styles.css`)

Tokens are **oklch** CSS variables mapped into Tailwind v4 via `@theme inline`.

| Token | oklch | ≈ hex | Used for |
|---|---|---|---|
| `background` | `0.195 0.009 250` | **#13161A** Deep Graphite | page base |
| `foreground` | `0.95 0.012 245` | **#EDF1F5** Mist White | primary text |
| `primary`/`accent`/`ring` | `0.79 0.055 235` | **#A2C2D6** Ice Blue | eyebrows, active tab, hover, icons, glow |
| `secondary` | `0.245 0.014 250` | ~#1C2026 | Profile left panel |
| `surface` | `0.225 0.012 250` | ~#191D22 | Profile right panel, card bg |
| `surface-strong` | `0.245 … / 0.82` | translucent | glass header, back-to-top, drawer close |
| `muted-foreground` | `0.68 0.018 245` | ~#9AA3AC | metadata, dates |
| `ink-soft` | `0.8 0.014 245` | ~#B8C0C8 | body paragraphs |
| `border`/`input` | foreground @ 14%/18% | — | hairlines |

Radii are near-zero (`sm .125rem / md .25rem / lg .375rem`) and **the portfolio
itself uses none of them** — every card, image and button is a sharp rectangle.
They exist only for the shadcn components.

### Typography

Two Google Fonts, `<link>`-loaded in `__root.tsx`:

```
DM Sans          300;400;500;600   --font-sans     body, nav, ALL section headings
Instrument Serif ital@0;1          --font-display  used in only 4 places
```

The display serif appears **only** in: the `HT` monogram, the two Gateway titles,
project card titles, and the drawer's project title. Every large heading is
`font-sans font-normal`. This is deliberate and already decided —
`roadmap.md` records "Use regular-weight sans-serif for the unified section
headings" as done. It diverges from the original brief in `README.md` (which
asked for PP Editorial New / Ogg + Inter); **the current sans-led state is the
newer decision and should be preserved.**

| Element | Size |
|---|---|
| Hero h1 / Contact h2 | `clamp(3.25rem, 8vw, 8rem)`, `leading-[0.92]` |
| Work h2 | `clamp(1.75rem, 3.5vw, 3.5rem)` |
| Profile h2 | `clamp(1.25rem, 2.5vw, 2.25rem)` |
| Gateway titles | `text-5xl → 7xl` (serif) |
| Card titles | `text-3xl → 4xl` (serif) |
| Eyebrow labels | `10px` uppercase `tracking-[0.25em]` Ice Blue |
| Nav links | `11px` uppercase `tracking-[0.18em]` |

The **eyebrow** — tiny uppercase Ice Blue label above every heading — is the
signature repeated device. It appears 9 times and is what unifies the sections.

**Layout constant:** `max-w-[1600px]` centered, gutters `px-5 → sm:px-8 → lg:px-12`.
Exceptions: drawer (`max-w-[1100px]`), Profile (`lg:px-[10%]`).

### Motion inventory

| Effect | Spec |
|---|---|
| `quiet-rise` | hero entrance, 1s `cubic-bezier(.22,1,.36,1)`, staggered 0/100/220ms |
| `ambient-drift` | 14s drifting radial glow blob behind hero |
| `dot-drift` | 7s, 18 hardcoded glow dots (`glowDots` array), per-dot delay |
| Card image zoom | 1400ms ease-out → `scale(1.045)` |
| Gateway image zoom | 1800ms ease-out → `scale(1.06)` |
| Header glass | triggers at `scrollY > innerHeight * 0.7` |
| Back-to-top | same 0.7vh threshold |
| Custom dot cursor | 10px → 48px over `a, button, [data-cursor]`; `lg:` + `pointer:fine` only; `mix-blend-difference` |
| Skills list | IntersectionObserver slide-in, 50ms stagger |
| Drawer | 700ms slide-in; sections reveal alternating left/right, 900ms |

`prefers-reduced-motion: reduce` kills all animation and smooth scroll.

---

## 3. Page flow

**Fixed overlays:** custom dot cursor · sticky header (`h-20 → sm:h-24`,
transparent → glass past 70vh) · back-to-top (44px, bottom-right).

1. **`#top` Hero** (`min-h-[92svh]`) — z-layered: interior photo `-z-30` →
   `bg-background/85` scrim `-z-20` → ambient glow `-z-10` → glow dots → content.
   Left-aligned (not centered). `Form, Space, and **Visual Precision.**` with the
   second half in Ice Blue. Sub-headline pushed right by an empty grid cell.
2. **`#disciplines` Dual Entry** (`min-h-[76svh]`, 2-col → stacked) — two
   full-bleed image gateways. **Their real job is filtering:** clicking sets
   `filter` to `spatial`/`visual` *and* jumps to `#work`.
3. **`#work` Gallery** — eyebrow + "A considered archive."; three filter tabs
   (active underlined in Ice Blue). Grid is **not** real masonry — a 12-col CSS
   grid with fixed aspect ratios:
   ```
   spatial → lg:col-span-8   wide     → aspect-[16/10]
   visual  → lg:col-span-4   square   → aspect-square
                             portrait → aspect-[4/5]
   mobile 1 col · md 2 cols · lg 12 cols
   plus one hardcoded nudge: filter==="all" && index===2 → lg:col-start-5
   ```
   Cards are borderless full-bleed `object-cover`, `role="button"` + Enter/Space,
   open the drawer. Overlay hidden until hover at `lg`, **always visible below
   `lg`** (correct for touch).
4. **`#profile` Split screen** (`min-h-screen`, 2-col at `lg`) — left
   (`bg-secondary`): method statement, two-column bio, `border-y` block with
   Education (BS Interior Design, University of Home Economics Lahore, exp. 2027)
   and Experience (Interior Designer Intern, Cielo Casa Lahore, Jul–Aug 2025).
   Right (`bg-surface`): "Capabilities" + 7 tools sliding in on scroll.
5. **`#contact` Footer** (`min-h-screen`) — "Let's Collaborate." + huge email link
   (opens a **pre-addressed Gmail compose window**, not `mailto:`) + `© 2026` +
   LinkedIn only.

**Project drawer** — full-width mobile / `md:w-[80vw]` panel from the right over a
blurred backdrop. Locks body scroll, Escape + backdrop close, resets scroll on
open. Sections render in a 2-col alternating zig-zag, each half on its own
IntersectionObserver scoped to the drawer's scroll container.

---

## 4. Assets — the critical distinction

### (a) Real files in `src/assets/*.jpg` — but AI-generated stock

`spatial-01..03`, `visual-01..03`, `studio-portrait.jpg`. Bundled by Vite, work
anywhere — but they are **placeholder imagery**, generated by Lovable. From
`.lovable/plan/architectural-minimalist-designer-portfolio-2026-09-12.md`:
*"Create a cohesive original image set … so the portfolio feels authored rather
than templated."*

**Six of the seven gallery projects are fiction** — Lake House 01, Northline
Editions, House of Stillness, Axis Archive, Nocturne Hotel, Atmospheres 03 have
invented names, invented dates, and drawer content synthesized by `buildDetail()`
recycling the same three images four times with generic boilerplate copy.

`studio-portrait.jpg` is **completely unused** — the original plan wanted a
portrait in the Profile split; the section shipped without one.

### (b) The nine `*.asset.json` files — Lovable-hosted, now vendored ✅

These were not images, they were JSON pointers to `/__l5e/assets-v1/<uuid>/…`,
**Lovable's private edge route**. Confirmed in
`node_modules/@lovable.dev/vite-tanstack-config`: locally it only resolves via a
proxy plugin that no-ops unless `LOVABLE_PREVIEW_HOST` is set. All nine returned
**404 on localhost** — the hero had no photo and the Landscape card rendered as
broken-image alt text.

These nine are **the only genuine work on the site** — the hero interior plus the
entire Landscape Design project (a real, properly documented 8-stage student
project for a department courtyard in Lahore: site photo, hand-drawn bubble
diagram, dimensioned AutoCAD plan with a 24'-11" planter edge, two V-Ray renders,
serpentine bench, materials detail, stone-and-pebble paving).

**Downloaded and committed 2026-09-21.** All dimensions verified against the
values hardcoded in `index.tsx` — every one matches:

| File | Bytes | Dimensions |
|---|---|---|
| `hero-interior.jpg` | 259,695 | 1920×1280 |
| `landscape-site.jpg` | 299,758 | 1600×1204 |
| `landscape-bubble.jpg` | 677,120 | 1755×1240 |
| `landscape-plan.jpg` | 103,385 | 869×783 |
| `landscape-render-front.webp` | 361,044 | 1920×1452 |
| `landscape-render-court.webp` | 233,138 | 1920×1562 |
| `landscape-seating.jpg` | 529,486 | 1600×898 |
| `landscape-bench-detail.jpg` | 657,884 | 1482×1062 |
| `landscape-paving.jpg` | 651,794 | 1365×1152 |

---

## 5. Lovable removal checklist

| # | Item | Status |
|---|---|---|
| 1 | Download 9 edge-hosted images into `src/assets/` | ✅ done |
| 2 | Rewrite `index.tsx` imports to use real files; delete `*.asset.json` | ✅ done |
| 3 | Delete `src/lib/lovable-error-reporting.ts` + 2 refs in `__root.tsx` | ✅ done |
| 4 | Replace `vite.config.ts` — unpack `@lovable.dev/vite-tanstack-config` | ✅ done |
| 5 | Drop `@lovable.dev/vite-tanstack-config` from `package.json` | ✅ done |
| 6 | Delete `.lovable/` and `AGENTS.md` | ✅ done |
| 7 | Rewrite `README.md` (it was the original Lovable *prompt*) | ✅ done |
| 8 | Decide bun vs npm (`bun.lock` + `bunfig.toml` are Lovable's setup) | ⬜ **open** |

### How the vite config was ported

The wrapper's non-sandbox path was reproduced explicitly in `vite.config.ts`:

```
tailwindcss()                              kept
tsConfigPaths({ projects: [...] })         kept
tanstackStart({ server, importProtection}) kept — importProtection defaults preserved
nitro({ preset })                          kept, build-only, cloudflare-module default
viteReact()                                kept
css.transformer: "lightningcss"            kept (preserves exact CSS output)
resolve.alias @ -> ./src                   kept
resolve.dedupe [react, tanstack query]     kept — prevents duplicate-copy hook bugs
optimizeDeps.include [react runtimes]      kept
```

Deliberately **dropped**: the Lovable asset proxy, the dev SSR/server-fn error
loggers, sandbox port/host forcing, build diagnostics, HMR gate, prerender
shims, the dev-server bridge, and `@tanstack/devtools-vite`. `VITE_*` env
injection was dropped too — nothing in `src/` reads any env var.

`lightningcss` was promoted from a transitive dep of the wrapper to an explicit
`devDependency`.

**Side effect:** the wrapper forced `server.port = 8080`. Without it, dev now
starts on Vite's default **5173**. Nothing depends on the port.

### Verification (all green)

- `npx tsc --noEmit` → clean
- `npm run build` → succeeds, emits a Cloudflare Worker + `.output/public`
- All 15 images fingerprinted into `.output/public`
- Dev server renders hero + gallery; drawer loads all 8 landscape images with
  **zero network failures** (was 9 × 404 before)
- No `lovable` / `__l5e` / `asset.json` strings anywhere outside `bun.lock`

### Line endings

The repo is LF in git, but `core.autocrlf=true` on this machine checks out CRLF,
so Prettier flagged ~5,300 lines. Added `.gitattributes` with `* text=auto eol=lf`
to pin it. **The working tree still needs renormalizing** (`git add --renormalize .`)
— left as its own commit so it doesn't bury the migration diff. Only 6 real lint
warnings exist underneath the noise, all `react-refresh/only-export-components`
(cosmetic, pre-existing).

**#4 is the only non-trivial one.** The Lovable wrapper silently supplies:
TanStack devtools (dev-only, first), `tanstackStart`, `viteReact`, `tailwindcss`,
`tsConfigPaths`, `nitro` (build-only, **`cloudflare-module` preset**), `VITE_*`
env injection, the `@` path alias, React/TanStack dedupe, error-logger plugins,
and sandbox port/host detection. All of it has to be reproduced explicitly or the
build breaks.

The "Made with Lovable" badge on the live site is injected at Lovable's edge —
it disappears on its own once hosting moves. No code change needed.

---

## 6. Hosting

Build currently targets **Cloudflare Workers** (`cloudflare-module` Nitro preset),
so Cloudflare is the lowest-friction destination. Vercel and Netlify both have
TanStack Start presets too.

Because **nothing fetches at runtime**, full static prerender is also viable —
that would allow Cloudflare Pages / Netlify / GitHub Pages with no server at all.
Decision pending.

---

## 7. Known gaps / remaining work (beyond the migration)

1. **Six of seven projects are fake.** The headline gap — the site is a polished
   shell around one real project. *Open question: do Hadeera's other real
   projects exist to fill these slots, or should the gallery be restructured
   around Landscape Design alone?* This changes the layout work substantially.
2. **No portrait in Profile.** `studio-portrait.jpg` unused; the right half of the
   section is mostly empty at desktop width.
3. **Gallery leaves holes at `lg`** — the 8-col card leaves 4 columns empty beside
   it, and the `col-start-5` nudge leaves 4 empty to the left. Intended as
   "stagger", currently reads as gaps.
4. **Capabilities list is invisible without JS** — ships at `opacity-0
   translate-x-16`, only appears when the observer fires, and re-hides when
   scrolled away. SSR output has an empty column.
5. **No `og:image`** — `twitter:card: summary_large_image` is declared with no
   image, so shared links preview blank.
6. **No `sitemap.xml`.**
7. **Duplicated meta** between `__root.tsx` and `index.tsx`, with slightly
   different copy.
8. **Hero image not preloaded or responsive** — a CSS `background-image` on a div,
   one size for all viewports. It is the LCP element.
9. **Contact has LinkedIn only** — the brief called for Behance and Instagram.
10. **`favicon.ico` is a generic 256×256 default** — no `HT` monogram, no
    apple-touch-icon, no manifest.

---

## 8. Local dev notes

```sh
npm run dev      # vite dev — picks 8081 if 8080 is taken
npm run build
npm run lint
```

- **Bun is not installed on this machine**, though the repo ships `bun.lock` +
  `bunfig.toml`. Dependencies were installed with `npm install --no-package-lock`
  so no competing lockfile lands in the repo. Install takes ~17 min.
- Screenshot harness for visual checks lives in the session scratchpad
  (`shot.mjs` / `sections.mjs`, puppeteer-core driving the installed Chrome).

---

## 9. Migration outcome (2026-09-21)

Committed as `d00d36b` on branch `remove-lovable`, 32 files changed.

**Final proof:** `node_modules/@lovable.dev` was physically deleted and both
`npm run build` and `npm run dev` still succeed. The project no longer depends on
Lovable in any form.

Lint went from **5,353 problems → 92** once line endings were fixed. What remains
is pre-existing and cosmetic: 86 `prettier/prettier` errors (the Lovable-authored
`index.tsx` has lines far past the configured `printWidth: 100`) and 6
`react-refresh/only-export-components` warnings. `npm run format` clears all 86 in
one shot, but it rewrites `index.tsx` substantially — **left undone deliberately**
so the migration diff stays readable. Worth doing as its own commit.

### Notes for next session

- **`bun.lock` still lists `@lovable.dev/vite-tanstack-config`.** It is the only
  remaining mention of Lovable in the repo. It resolves when the lockfile is
  regenerated — pending the bun-vs-npm decision (checklist item 8). There is
  currently **no npm lockfile at all**, which is the bigger gap: either commit to
  bun and regenerate `bun.lock`, or run a plain `npm install` and commit
  `package-lock.json`.
- **Cloudflare worker name** auto-derives from the git remote as
  `narcissisticdude2-cpu-hadeeratariqs`. Set it explicitly in the nitro config
  before deploying if that name matters.
- **Visual note:** now that the real Landscape render is actually visible in the
  gallery, it reads noticeably brighter and greener than the moody AI-stock
  images around it. The genuine work currently looks out of place against the
  placeholders — which resolves itself if the placeholders are replaced, but is
  worth watching.
- Dev port moved 8080 → 5173 (Vite default) since the wrapper no longer forces it.
