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

## 3b. Exact layout specification

Measured from the running site and its source. These are the real values — use
them when extending a section so new work matches what is already there.

### Breakpoints

Tailwind defaults, unmodified (`styles.css` overrides no `--breakpoint-*`):

```
sm 640px    md 768px    lg 1024px    xl 1280px
```

What actually changes at each:

| At | What happens |
|---|---|
| `sm` | gutters 20px → 32px; header 80px → 96px tall; hero eyebrow margin grows; contact email 20px → 30px; drawer padding 20px → 40px |
| `md` | Dual Entry splits to 2 columns; gallery goes 1 → 2 columns; drawer narrows to `80vw`; drawer sections become the 2-col zig-zag |
| `lg` | gutters → 48px; gallery becomes the 12-col grid; Profile splits into 2 columns; **card and gateway overlays switch from always-visible to hover-only**; custom dot cursor activates |

Below `lg` there is no hover state anywhere — every overlay is permanently
visible. That is a deliberate touch accommodation, not an oversight.

### Container and gutter rhythm

```
max-w-[1600px] mx-auto          every section's inner wrapper
px-5 → sm:px-8 → lg:px-12       20px → 32px → 48px page gutters
```

Exceptions: the drawer body is `max-w-[1100px]` with `px-5 → sm:px-10`, and
Profile uses percentage padding `px-5 → sm:px-12 → lg:px-[10%]` because its two
halves are independent full-bleed panels rather than content inside the 1600px
column.

### Vertical rhythm

| Section | Height | Padding |
|---|---|---|
| Header | `h-20 → sm:h-24` | — |
| Hero | `min-h-[92svh]` | `pt-24` |
| Dual Entry | `min-h-[76svh]` | gateway `min-h-[58svh] → md:min-h-[76svh]` |
| Work | auto | `py-28 → sm:py-40` |
| Profile | `min-h-screen` | `py-24` |
| Contact | `min-h-screen` | `py-24` |

Note `svh` (small viewport height) rather than `vh` — the correct choice for
mobile browsers with collapsing toolbars.

### z-index map

```
z-[100]   custom dot cursor
z-[90]    drawer panel
z-[80]    drawer backdrop
z-50      sticky header
z-40      back-to-top button
z-10      drawer's sticky close bar (scoped inside the drawer)
--------  page content
-z-10     ambient glow + glow dots
-z-20     hero background scrim (bg-background/85)
-z-30     hero background photo
```

The hero's negative layers only work because the section carries `isolate`,
creating a local stacking context. `#work` and `#contact` carry `isolate` too,
for the same reason — their `GlowDots` sit at `-z-10`.

### Header

```
grid grid-cols-[minmax(0,1fr)_auto] items-center
```

Left cell: `HT` serif monogram + "MULTIDISCIPLINARY DESIGNER" (hidden below
`sm`), `gap-3`, baseline-aligned. Right cell: nav, `gap-5 → sm:gap-9`. The
`minmax(0,1fr)` on the left is what stops the monogram from pushing the nav
off-screen on narrow viewports.

Scrolled state adds `border-b border-border bg-surface-strong backdrop-blur-xl`
over a 500ms transition, at `scrollY > innerHeight * 0.7`.

### Hero

```
mb-8 sm:mb-12     eyebrow
max-w-[1300px]    h1 — caps line length independently of the 1600px container
mt-12 sm:mt-16    grid below the h1
grid gap-8  sm:grid-cols-[1fr_1fr]  lg:grid-cols-[2fr_1fr]
max-w-md          the sub-headline paragraph
```

The sub-headline sits in the **right** cell; the left cell is an empty `<span/>`.
That is how the paragraph gets pushed right without absolute positioning. At `lg`
the ratio becomes `2fr 1fr`, pushing it further right still.

"EXPLORE ↓" is absolutely positioned `bottom-8 left-5 → sm:left-8 → lg:left-12`
so it lines up with the page gutter.

### Dual Entry gateways

```
grid min-h-[76svh] md:grid-cols-2                              the section
group relative min-h-[58svh] md:min-h-[76svh] overflow-hidden  each gateway
```

Stacked below `md`, side by side above. Each is an `<a>`, so the whole panel is
one click target.

- Image: `absolute inset-0 h-full w-full object-cover`, zoom `duration-[1800ms] ease-out` → `scale(1.06)`
- Scrim: `bg-gradient-to-t from-background/95 via-background/20 to-background/10`
- Content: `absolute inset-x-0 bottom-0 p-7 → sm:p-10 → lg:p-12`
- Meta row: `mb-5 flex items-center justify-between` — number left, discipline right
- Title row: `flex items-end justify-between gap-4`, `MoveUpRight h-7 w-7` which
  shifts `-translate-y-1 translate-x-1` on hover

### Gallery

Section header:

```
mb-14 grid gap-10 lg:mb-24 lg:grid-cols-[1fr_2fr] lg:items-end
```

Heading left in the `1fr`, filter tabs right in the `2fr` with `lg:justify-end`.
Tabs are a shadcn `Button variant="ghost"` stripped back to a bare underline:
`h-auto rounded-none border-b px-0 pb-2`; active = `border-primary text-primary`,
inactive = `border-transparent text-muted-foreground`. `aria-pressed` is set.

The grid:

```
grid-cols-1  gap-4        base
md:grid-cols-2            tablet
lg:grid-cols-12 lg:gap-5  desktop
```

Column spans and aspect ratios derive from the project's own `type` and `shape`
fields:

```
type  spatial → lg:col-span-8        shape  wide     → aspect-[16/10]
      visual  → lg:col-span-4               square   → aspect-square
                                            portrait → aspect-[4/5]
```

Plus one hardcoded exception: `filter === "all" && index === 2` also gets
`lg:col-start-5`. That produces the deliberate offset in the default view — and
also the empty gutters noted in §7.3.

Card internals:

- `<img>` carries explicit `width`/`height` (no layout shift) and `loading="lazy"`
- Zoom `duration-[1400ms] ease-out` → `scale(1.045)`
- Overlay: `bg-gradient-to-t from-background/95 via-background/10 to-transparent`,
  `p-5 → md:p-7`, `opacity-100` by default, `lg:opacity-0 lg:group-hover:opacity-100`
- Inner block additionally slides: `lg:translate-y-4 lg:group-hover:translate-y-0`
- Meta `text-[9px] tracking-[0.24em]` — the one place the eyebrow drops to 9px
- Title `font-display text-3xl sm:text-4xl`, with `MoveUpRight h-5 w-5`

Each card is `role="button" tabIndex={0}` with `onKeyDown` handling Enter and
Space (with `preventDefault` on Space so the page doesn't scroll).

### Profile

```
grid min-h-screen lg:grid-cols-2
```

Two independent full-bleed panels, each `flex items-center px-5 py-24 sm:px-12
lg:px-[10%]`, distinguished only by background: left `bg-secondary`, right
`bg-surface`. The tonal step between them is very small by design — it reads as
a seam, not a border.

Left panel, inner `max-w-xl`:

```
mb-10                                eyebrow
h2                                   clamp(1.25rem, 2.5vw, 2.25rem)
mt-12 grid gap-7 sm:grid-cols-2      the two bio paragraphs
mt-14 space-y-10 border-y py-10      Education + Experience block
```

Within each credential: eyebrow → `mt-4 text-2xl sm:text-3xl` value →
`mt-2`/`mt-3` supporting lines at `text-[10px]` uppercase or `text-sm`.

Right panel, inner `w-full max-w-xl`:

```
mb-10                                             eyebrow
space-y-3 pl-4 sm:space-y-4 sm:pl-10 lg:pl-16     the skills stack
text-2xl sm:text-3xl lg:text-4xl font-light       each skill
```

The left indent (`pl-4 → pl-16`) gives the list its offset, and the items slide
in from `translate-x-16` — indent and motion share an axis.

### Contact

```
flex min-h-screen flex-col justify-between
```

The content block is `flex-1 justify-center`; the footer row is pinned to the
bottom by the outer `justify-between`.

```
mb-8                                                       eyebrow
h2                       clamp(3.25rem, 8vw, 8rem)         same scale as hero h1
mt-16 inline-flex w-fit items-center gap-4 border-b pb-3   email link
text-xl sm:text-3xl                                        email size
MoveUpRight h-6 w-6
```

`w-fit` matters — it keeps the underline the width of the text rather than the
full column.

Footer row:

```
mx-auto mt-20 flex w-full max-w-[1600px] flex-col gap-7 border-t pt-7
text-[10px] uppercase tracking-[0.2em]
sm:flex-row sm:items-center sm:justify-between
```

### Project drawer

```
backdrop   fixed inset-0 z-[80] bg-background/70 backdrop-blur-md   500ms fade
panel      fixed inset-y-0 right-0 z-[90] w-full md:w-[80vw]
           overflow-y-auto overscroll-contain
           duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)]
```

`overscroll-contain` stops scroll chaining to the page behind. The closed state
is `pointer-events-none translate-x-full` — the panel stays mounted, so the
slide animates in both directions.

The close bar is `sticky top-0 z-10` with a `from-background via-background/80
to-transparent` gradient, so content scrolls *under* it and stays legible. Its
button is `h-11 w-11` — the same size as the back-to-top control.

Body: `mx-auto max-w-[1100px] px-5 pb-28 sm:px-10`.

The header block uses a **negative** `-mt-10` to pull the title up under the
sticky close bar; `max-w-3xl`, `pb-16 → sm:pb-24`:

```
mb-5                                               eyebrow (project meta)
font-display clamp(2.5rem, 6vw, 5rem) leading-[1]  title
mt-8 max-w-xl text-base sm:text-lg                 overview
```

Sections: `space-y-24 → sm:space-y-36`, each a
`grid items-center gap-8 md:grid-cols-2 md:gap-12`.

The zig-zag is driven by index parity:

```
index % 2 === 0  →  text md:order-1, image md:order-2   (image right)
index % 2 === 1  →  text md:order-2, image md:order-1   (image left)
```

Each half is wrapped in `<Reveal>` with its own IntersectionObserver whose `root`
is the drawer element, not the viewport. Hidden state:

```
side="right"  →  opacity-0 translate-y-8 md:translate-y-0 md:translate-x-20
side="left"   →  opacity-0 translate-y-8 md:translate-y-0 md:-translate-x-20
```

So below `md` both halves rise vertically; at `md` and up they converge
horizontally toward each other. The image half gets `delay={80}` so the text
leads by a beat.

The section heading is `font-sans clamp(1.5rem, 2.6vw, 2.25rem)` — note the
drawer's *project* title is serif while its *section* headings are sans, which
matches the page-level convention.

### Interaction thresholds, in one place

```
scrollY > innerHeight * 0.7   header glass on, back-to-top in
IntersectionObserver          threshold 0.15, rootMargin "0px 0px -10% 0px"  (skills)
IntersectionObserver          threshold 0.2,  rootMargin "0px 0px -8% 0px"   (drawer)
cursor target selector        "a, button, [data-cursor]"
```

Both observers are **stateful, not one-shot** — they set `false` again when the
element leaves. Elements re-animate on every pass, and the skills list is blank
whenever it is off-screen (see §7.4).

### Design principles worth preserving

Reading the whole thing together, five rules hold consistently. New sections
should follow them:

1. **No borders around content.** Images are full-bleed and edge-to-edge. The
   only rules on the page are single hairlines used as *separators*
   (`border-y` in Profile, `border-t` in the footer, `border-b` under the active
   tab and the email link) — never as frames.
2. **One accent, used sparingly.** Ice Blue appears only on eyebrows, the active
   tab, hover states, icons, and the second half of the hero headline. Nothing
   else is coloured.
3. **Text sits at the bottom-left of images.** Every image overlay — gateways and
   cards alike — anchors its content to the bottom edge with the meta row above
   the title and an arrow at the right.
4. **Motion is slow and single-property.** Nothing animates faster than 300ms
   except opacity; image zooms run 1400–1800ms. There are no bounces, no spring
   easings — everything uses `ease-out` or `cubic-bezier(.22,1,.36,1)`.
5. **Sections are full-height and self-contained.** Each one owns its background
   and fills the viewport, so scrolling moves between discrete panels rather than
   through continuous flow.

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
| 8 | Decide bun vs npm (`bun.lock` + `bunfig.toml` were Lovable's setup) | ✅ done — npm |

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

The repo is LF in git, but `core.autocrlf=true` on this machine checked out CRLF,
so Prettier flagged ~5,300 lines. Added `.gitattributes` with `* text=auto eol=lf`
to pin it, and converted the working tree in place. Git recorded **zero** changed
lines, confirming it was purely line endings — the stored blobs were already LF.

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
npm install      # first run takes ~17 min cold
npm run dev      # vite dev on 5173, or the next free port
npm run build    # nitro production build
npm run preview  # serve the production build
npm run lint
npm run format
```

- **The package manager is npm.** `bun.lock` and `bunfig.toml` were Lovable's
  setup and have been deleted; `package-lock.json` is committed. Bun is not
  installed on this machine.
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

- **Package manager settled: npm.** `bun.lock` and `bunfig.toml` deleted,
  `package-lock.json` generated and committed. That also cleared the last
  `@lovable.dev` string in the repo — `grep -ri lovable` now returns nothing.
  The install pruned 12 packages that existed only for the Lovable wrapper.
- **Cloudflare worker name** auto-derives from the git remote as
  `narcissisticdude2-cpu-hadeeratariqs`. Set it explicitly in the nitro config
  before deploying if that name matters.
- **Visual note:** now that the real Landscape render is actually visible in the
  gallery, it reads noticeably brighter and greener than the moody AI-stock
  images around it. The genuine work currently looks out of place against the
  placeholders — which resolves itself if the placeholders are replaced, but is
  worth watching.
- Dev port moved 8080 → 5173 (Vite default) since the wrapper no longer forces it.
