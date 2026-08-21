# Portfolio Build Plan — "reubence.com" visual system, rebuilt in Astro

Design system reverse-engineered from the live site (computed styles + CSSOM dump on 2026-08-21).
Target stack: **Astro 7 + Tailwind v4** (the repo already has Astro 7; the reference site is
Next.js 14 + Tailwind 3 + shadcn, but every token below is framework-agnostic).

> **Content note:** this plan clones the *visual system* (tokens, card treatment, grid, motion).
> Copy is placeholder — swap in your own bio, projects, photos, and wordmark. Don't ship their
> photography or case-study text.

---

## 1. Extracted design spec

### 1.1 Color tokens (verbatim from the live site)

| Role | Value | Where it's used |
|---|---|---|
| `background` | `#ffffff` | page |
| `ink` (foreground) | `#2f2f2f` — `hsl(0 0% 18.4%)` | headings, wordmark, body strong |
| `muted` | `#767676` | paragraph body, sub-labels, logo row |
| `faint` | `#afb9c9` | decorative skeleton lines, dotted UI in cards |
| `border` | `#d7dde4` | buttons, dividers |
| `border-card` | `rgba(215,221,228,0.6)` | the fancy-card 1px border |
| `hairline` | `rgba(118,118,118,0.31)` (`#76767650`) | in-card dividers |
| `slate` | `#77818f` | secondary icon fills |
| `accent` | `#f97316` (orange-500) | eyebrow labels, inline links, hover |
| `accent-wash` | `#fff3e6` | card hover gradient end-stop |
| `card` | `#fcfcfc` | card base (then overridden by gradient) |
| `card-grad-from` | `#f7f7f7` | card gradient top |
| `card-grad-to` | `#ffffff` | card gradient bottom |

shadcn variables the site still carries (keep if you want shadcn components later):

```
--background 0 0% 100%      --foreground 0 0% 18.4%
--muted 210 40% 96.1%       --muted-foreground 215.4 16.3% 46.9%
--border 214.3 31.8% 91.4%  --input 214.3 31.8% 91.4%
--card 0 0% 100%            --card-foreground 0 0% 18.4%
--primary 0 0% 18.4%        --primary-foreground 210 40% 98%
--ring 215 20.2% 65.1%      --radius 0.5rem
```

### 1.2 The signature card — `.fancy-card`

This is the whole look. Exact rule from their stylesheet:

```css
.fancy-card {
  border-radius: 32px;
  border: 1px solid rgba(215, 221, 228, 0.6);
  background: linear-gradient(#f7f7f7, #ffffff);
  box-shadow:
    inset 0  -3px 0  0   rgba(0, 0, 0, 0.05),  /* bottom lip            */
    inset 0   0   0  2px #ffffff,              /* white inner ring      */
    inset 0   4px 2px 0   rgba(0, 0, 0, 0.06), /* top inner shade       */
    inset 0   0   24px 4px rgba(0, 0, 0, 0.04),/* soft inner vignette   */
    0        1px 3px 0   rgba(0, 0, 0, 0.12);  /* single outer drop     */
}
/* hover — only the gradient end-stop changes, to a warm cream */
.fancy-card-hover:hover,
.group:hover .group-hover\:fancy-card-hover {
  cursor: pointer;
  background: linear-gradient(#f7f7f7, #fff3e6);
}
```

Five inset shadows + one outer is what makes it read as a physical, slightly-inflated tile
rather than a flat Tailwind card. Do not simplify it to `shadow-lg`.

### 1.3 Radius scale

| Token | Value | Used for |
|---|---|---|
| `rounded-card` | `32px` (2rem) | every fancy-card |
| `rounded-3xl` | `24px` | inner panels, pill buttons, work-card image well |
| `rounded-frame` | `28px` | photo frame inside the photo card (`p-1.5` inset frame) |
| `rounded-2xl` | `16px` | experiment card hit-area, small chips |
| `rounded-xl` | `12px` | decorative skeleton boxes |
| `rounded-full` | `9999px` | "Good evening!" badge, dots, avatar |

Nesting rule they follow: outer `32px` → `p-1.5` (6px) → inner `28px`. Keeps the concentric
curve continuous (outer radius − padding = inner radius).

### 1.4 Typography

Three families, each with one job:

| Family | Role | Specimens |
|---|---|---|
| **Cabinet Grotesk** (`font-display`) | wordmark only | `h1`: 100px mobile → 180px xl, weight 500/600, `leading-none`, `tracking-tighter` (measured `-9px` at 180px ≈ `-0.05em`) |
| **Satoshi** (`font-satoshi`) | eyebrows, labels, badges | uppercase, `font-bold`/`semibold`, `tracking-wide` (0.45px), 13–16px |
| **Inter Tight** (`font-sans`) | all body + headings | `p`: 18px / 32px / weight 500 / `#767676` · `h3`: 26px / 26px / weight 500 / `#2f2f2f` · card title `text-3xl font-medium leading-none` |

Sources: Cabinet Grotesk + Satoshi from [Fontshare](https://fontshare.com) (free, self-host the
woff2). Inter Tight via `@fontsource-variable/inter-tight`.

macOS quirk they ship (worth copying): Satoshi's bold weights render poorly in Safari, so they
swap to system UI there —

```css
@supports (-webkit-hyphens: none) {
  .font-satoshi.font-bold     { font-family: -apple-system, BlinkMacSystemFont, system-ui !important; font-weight: 800 !important; }
  .font-satoshi.font-semibold { font-family: -apple-system, BlinkMacSystemFont, system-ui !important; font-weight: 600 !important; }
}
```

### 1.5 Layout grid

- `<main>` has `px-10` (40px gutters), no max-width.
- Every row is `mx-auto grid max-w-8xl grid-cols-12`, where `max-w-8xl = 90rem (1440px)`.
- Column gap `gap-x-12` (48px) from `xs` up; row gap `gap-y-6` (24px) → `gap-y-10` (40px).
- Custom breakpoints: **`xs: 475px`**, plus one-off `min-[896px]` and `min-[1104px]`
  arbitrary breakpoints for the 3-column shuffle.

### 1.6 Page structure (5 rows + 1 fixed toast)

```
<main class="px-10">
  header  grid-cols-12 ................. wordmark (col-span-4) | spacer | "Recent favorite" card (col-span-6, md+)
  row 1   grid-cols-12 gap-y-10 ........ Bio card (xl:col-span-4, order-1)
                                         Photo card (xl:col-span-4, order-2)
                                         Experiments stack (xl:col-span-4, order-3)
  row 2   grid-cols-12 my-10 ........... Articles card (xl:col-span-8, order-1)
                                         "I've contributed to" logo panel (xl:col-span-4, order-2)
  row 3   grid-cols-12 ................. Eyebrow + grid-cols-6 gap-12 → 3 work cards (lg:col-span-2)
  footer  py-12 ........................ full-width fancy-card: contact CTA + social links
</main>
<div class="fancy-card fixed bottom-12 left-0 lg:bottom-20 lg:left-10 z-50"> dismissible note </div>
```

Order swapping is the trick that makes it work on tablet: on `md` the bio and photo sit
side-by-side (`md:col-span-6` / `md:col-span-5`) and experiments drop below full-width; at `xl`
all three become equal thirds.

### 1.7 Motion

- Cards: `transform-gpu`, `active:translate-y-0.5` on press, background gradient transition on hover.
- Buttons: inner label `group-hover/button:-translate-y-0.5` + `text-[#767676] → text-[#2f2f2f]`.
- Logos: `hover:scale-110 hover:text-orange-500 transition-all duration-200 ease-in-out`.
- Wordmark: each letter is its own `<h1>` `inline-block` — so it can be animated per-glyph on load.

---

## 2. Target file tree

```
portfolio/
├─ astro.config.mjs                 # + @tailwindcss/vite
├─ src/
│  ├─ styles/global.css             # tokens, fonts, .fancy-card
│  ├─ layouts/Base.astro
│  ├─ components/
│  │  ├─ ui/Card.astro              # the fancy-card primitive
│  │  ├─ ui/Eyebrow.astro           # orange uppercase section label + icon
│  │  ├─ ui/PillButton.astro        # 24px-radius outlined button
│  │  ├─ Wordmark.astro
│  │  ├─ BioCard.astro
│  │  ├─ NowPlayingCard.astro
│  │  ├─ PhotoCard.astro
│  │  ├─ ExperimentCard.astro
│  │  ├─ ArticlesCard.astro
│  │  ├─ LogoPanel.astro
│  │  ├─ WorkCard.astro
│  │  ├─ SiteFooter.astro
│  │  └─ Toast.astro
│  ├─ content.config.ts             # works + articles collections
│  ├─ content/
│  │  ├─ works/*.md
│  │  └─ articles/*.md
│  ├─ data/site.ts                  # bio, links, experiments, logos
│  └─ pages/
│     ├─ index.astro
│     ├─ articles/index.astro
│     └─ work/[...slug].astro
└─ public/fonts/                    # Satoshi + Cabinet Grotesk woff2
```

---

## 3. Code

### 3.1 Install

```bash
pnpm add tailwindcss @tailwindcss/vite @fontsource-variable/inter-tight
```

Download `Satoshi-Variable.woff2` and `CabinetGrotesk-Variable.woff2` from Fontshare into
`public/fonts/`.

### 3.2 `astro.config.mjs`

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://your-domain.com',
  vite: { plugins: [tailwindcss()] },
});
```

### 3.3 `src/styles/global.css` — the whole design system

```css
@import "tailwindcss";
@import "@fontsource-variable/inter-tight";

/* ---------- self-hosted display + label faces ---------- */
@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Variable.woff2") format("woff2-variations");
  font-weight: 300 900;
  font-display: swap;
}
@font-face {
  font-family: "Cabinet Grotesk";
  src: url("/fonts/CabinetGrotesk-Variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-display: swap;
}

/* ---------- tokens ---------- */
@theme {
  --breakpoint-xs: 29.6875rem;          /* 475px, matches the reference */
  --container-8xl: 90rem;               /* max-w-8xl */

  --font-sans:    "Inter Tight Variable", ui-sans-serif, system-ui, sans-serif;
  --font-satoshi: "Satoshi", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Cabinet Grotesk", ui-sans-serif, system-ui, sans-serif;

  --color-ink:         #2f2f2f;
  --color-muted:       #767676;
  --color-faint:       #afb9c9;
  --color-slate:       #77818f;
  --color-line:        #d7dde4;
  --color-line-card:   rgba(215, 221, 228, 0.6);
  --color-hairline:    rgba(118, 118, 118, 0.31);
  --color-accent:      #f97316;
  --color-accent-wash: #fff3e6;
  --color-card:        #fcfcfc;

  --radius-frame: 1.75rem;              /* 28px — inner photo frame */
  --radius-card:  2rem;                 /* 32px — the fancy-card    */

  --shadow-fancy:
    inset 0 -3px 0 0 rgba(0,0,0,.05),
    inset 0 0 0 2px #fff,
    inset 0 4px 2px 0 rgba(0,0,0,.06),
    inset 0 0 24px 4px rgba(0,0,0,.04),
    0 1px 3px 0 rgba(0,0,0,.12);
}

/* ---------- base ---------- */
@layer base {
  html { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
  body {
    background: #fff;
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-feature-settings: "rlig", "calt";
  }
  p { font-size: 1.125rem; line-height: 2rem; font-weight: 500; color: var(--color-muted); }
  h3 { font-size: 1.625rem; line-height: 1.625rem; font-weight: 500; }
}

/* ---------- the signature surface ---------- */
@utility fancy-card {
  border-radius: var(--radius-card);
  border: 1px solid var(--color-line-card);
  background: linear-gradient(#f7f7f7, #ffffff);
  box-shadow: var(--shadow-fancy);
}

/* v4 generates every variant of a @utility for free, so
   `hover:fancy-card-hover` and `group-hover/card:fancy-card-hover`
   both work with no extra CSS. */
@utility fancy-card-hover {
  cursor: pointer;
  background: linear-gradient(#f7f7f7, var(--color-accent-wash));
}

/* ---------- Safari Satoshi fallback (copied from the reference) ---------- */
@supports (-webkit-hyphens: none) {
  .font-satoshi.font-bold,
  .font-satoshi.font-semibold {
    font-family: -apple-system, BlinkMacSystemFont, system-ui !important;
  }
  .font-satoshi.font-bold     { font-weight: 800 !important; }
  .font-satoshi.font-semibold { font-weight: 600 !important; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

### 3.4 `src/components/ui/Card.astro` — the primitive

```astro
---
interface Props {
  as?: string;
  hover?: boolean;          // enable the warm hover wash
  class?: string;
}
const { as: Tag = 'div', hover = false, class: className = '', ...rest } = Astro.props;
---
<Tag
  class:list={[
    'fancy-card transform-gpu',
    hover && 'transition-[background] duration-300 hover:fancy-card-hover active:translate-y-[2px]',
    className,
  ]}
  {...rest}
>
  <slot />
</Tag>
```

Usage: `<Card class="px-7 py-6" hover>…</Card>`

### 3.5 `src/components/ui/Eyebrow.astro`

```astro
---
interface Props { label: string; class?: string }
const { label, class: className = '' } = Astro.props;
---
<div class:list={['ml-2.5 flex items-center space-x-2.5', className]}>
  <slot name="icon">
    <svg class="h-4 w-4 text-accent" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="8" cy="8" r="3.5" />
    </svg>
  </slot>
  <div class="font-satoshi text-sm font-bold uppercase tracking-wide text-accent">{label}</div>
</div>
```

### 3.6 `src/components/ui/PillButton.astro`

```astro
---
interface Props { href: string; class?: string }
const { href, class: className = '' } = Astro.props;
---
<a
  href={href}
  class:list={[
    'group/button inline-flex items-center gap-x-2 whitespace-nowrap rounded-3xl border border-line',
    'px-4 py-3.5 pr-5 text-lg font-medium leading-none text-muted transition-colors',
    'hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
    'active:translate-y-[1px]',
    className,
  ]}
>
  <span class="transition-transform group-hover/button:-translate-y-0.5"><slot /></span>
  <svg class="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" viewBox="0 0 14 14"
       fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
    <path d="M3 11 11 3M5 3h6v6" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</a>
```

### 3.7 `src/components/Wordmark.astro` — per-glyph `h1`

```astro
---
interface Props { text?: string }
const { text = 'aayush.' } = Astro.props;
const letters = [...text];
---
<div class="relative w-fit">
  <div class="flex justify-center">
    {letters.map((ch, i) => (
      <h1
        style={`animation-delay:${i * 40}ms`}
        class="wm inline-block align-baseline font-display text-[100px] font-medium leading-none
               tracking-tighter text-ink drop-shadow-sm xs:font-semibold xl:text-[180px]"
      >{ch}</h1>
    ))}
  </div>

  <!-- greeting badge -->
  <div class="absolute -right-28 -top-2 hidden -translate-y-14 rounded-full bg-accent px-3 pb-2 pt-1
              font-satoshi text-lg font-semibold leading-none tracking-wide text-white xl:block">
    <span class="inline-block text-base" id="greeting">Hello!</span>
  </div>
</div>

<style>
  .wm { animation: rise .6s cubic-bezier(.22,1,.36,1) both; }
  @keyframes rise { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
</style>

<script>
  const h = new Date().getHours();
  const el = document.getElementById('greeting');
  if (el) el.textContent = h < 12 ? 'Good morning!' : h < 18 ? 'Good afternoon!' : 'Good evening!';
</script>
```

### 3.8 `src/components/BioCard.astro`

```astro
---
import Card from './ui/Card.astro';
---
<Card class="flex h-full flex-col justify-between gap-y-4 overflow-clip px-6 py-6 xs:px-7">
  <div class="z-10 space-y-6">
    <p>
      I'm a full-stack engineer helping founders build web experiences that make their
      products stand out.
    </p>
    <p>I specialize in crafting pixel-perfect frontend applications.</p>
    <p>
      Off the clock I dive into <a href="/photos" class="font-medium text-accent">photography</a>,
      geek out on <a href="/gear" class="font-medium text-accent">gadgets</a>, and play
      <a href="/games" class="font-medium text-accent">games</a> like a 12-year-old.
    </p>
  </div>

  <div class="z-10 text-left xs:text-right">
    <div class="mb-2 font-satoshi text-sm font-bold uppercase tracking-wide text-muted">Find me at</div>
    <a href="mailto:you@example.com" class="text-lg font-medium text-ink hover:text-accent">you@example.com</a>
  </div>
</Card>
```

### 3.9 `src/components/ExperimentCard.astro`

```astro
---
import Card from './ui/Card.astro';
interface Props { title: string; tagline: string; href: string }
const { title, tagline, href } = Astro.props;
---
<div class="group/card relative rounded-2xl">
  <a href={href} class="block">
    <Card hover class="relative overflow-hidden px-6 py-5 group-hover/card:fancy-card-hover">
      <div class="text-2xl font-medium leading-none text-ink">{title}</div>
      <div class="mt-1.5 text-base font-medium text-muted">{tagline}</div>
      <!-- decorative skeleton, mirrors the reference's faint UI sketch -->
      <div class="pointer-events-none absolute -right-6 top-4 hidden w-32 space-y-2 opacity-60 sm:block" aria-hidden="true">
        <div class="h-2 w-full rounded-full bg-faint/50"></div>
        <div class="h-2 w-2/3 rounded-full bg-faint/40"></div>
        <div class="h-2 w-5/6 rounded-full bg-faint/30"></div>
      </div>
    </Card>
  </a>
</div>
```

### 3.10 `src/components/PhotoCard.astro` — concentric 32 → 6 → 28 frame

```astro
---
import Card from './ui/Card.astro';
import { Image } from 'astro:assets';
import portrait from '../assets/portrait.jpg';
---
<Card class="relative flex h-full w-full overflow-hidden">
  <div class="absolute bottom-4 left-6 z-50 font-satoshi text-xs font-bold uppercase tracking-wide text-white/90">
    IMG.JPG
  </div>
  <div class="relative flex h-full w-full overflow-hidden rounded-frame border border-ink/30 p-1.5">
    <div class="absolute z-50 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-3xl border border-white/40"></div>
    <Image src={portrait} alt="Portrait" class="h-full w-full rounded-3xl object-cover" widths={[480, 800, 1200]} />
  </div>
</Card>
```

### 3.11 `src/components/WorkCard.astro`

```astro
---
import Card from './ui/Card.astro';
import PillButton from './ui/PillButton.astro';
import { Image } from 'astro:assets';
interface Props {
  title: string; location: string; sector: string;
  summary: string; href: string; cover: ImageMetadata;
}
const { title, location, sector, summary, href, cover } = Astro.props;
---
<div class="group/card relative col-span-6 transition-colors lg:col-span-2">
  <Card class="relative flex h-full flex-col-reverse overflow-hidden group-hover/card:fancy-card-hover">
    <div class="flex h-full w-full flex-grow flex-col items-center justify-between gap-7 p-3">
      <div class="ml-8 w-full">
        <div class="text-3xl font-medium leading-none text-ink">{title}</div>
        <div class="mb-2 mt-1.5 text-lg font-medium leading-normal text-muted">
          <span class="mr-1.5 text-xs">{location}</span>{sector}
        </div>
        <p class="mt-2 flex-1 pr-4 text-lg font-medium leading-normal text-muted">{summary}</p>
      </div>
      <PillButton href={href} class="self-start ml-8">Open case</PillButton>
    </div>

    <div class="relative m-3 flex h-64 flex-grow overflow-hidden rounded-3xl xs:min-h-72">
      <Image src={cover} alt={`${title} cover`} class="h-full w-full object-cover" widths={[400, 800]} />
    </div>
  </Card>
</div>
```

### 3.12 `src/content.config.ts`

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    location: z.string(),      // "IN India"
    sector: z.string(),        // "e-commerce"
    summary: z.string(),
    cover: image(),
    year: z.number(),
    order: z.number().default(0),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    external: z.string().url().optional(),
  }),
});

export const collections = { works, articles };
```

### 3.13 `src/pages/index.astro` — the composition

```astro
---
import Base from '../layouts/Base.astro';
import Wordmark from '../components/Wordmark.astro';
import NowPlayingCard from '../components/NowPlayingCard.astro';
import BioCard from '../components/BioCard.astro';
import PhotoCard from '../components/PhotoCard.astro';
import ExperimentCard from '../components/ExperimentCard.astro';
import ArticlesCard from '../components/ArticlesCard.astro';
import LogoPanel from '../components/LogoPanel.astro';
import WorkCard from '../components/WorkCard.astro';
import Eyebrow from '../components/ui/Eyebrow.astro';
import SiteFooter from '../components/SiteFooter.astro';
import Toast from '../components/Toast.astro';
import { getCollection } from 'astro:content';
import { experiments } from '../data/site';

const works = (await getCollection('works')).sort((a, b) => a.data.order - b.data.order);
---
<Base title="Aayush Sapkota — engineer, builder, photographer">
  <main class="px-4 xs:px-10">

    <!-- ── header ───────────────────────────────────────────── -->
    <header class="mx-auto grid max-w-8xl grid-cols-12 gap-y-6 xs:gap-x-12 xs:gap-y-0">
      <div class="z-50 col-span-10 -mt-10 p-3 xs:col-span-4 xs:mt-0 xs:pt-24 md:pl-0 lg:pt-10">
        <Wordmark />
      </div>
      <div class="col-span-2 min-[896px]:col-span-3"></div>
      <div class="group col-span-10 mb-4 hidden h-fit flex-col items-end justify-end p-8 px-0 text-right
                  xs:mb-8 md:col-span-6 md:flex min-[896px]:col-span-5">
        <NowPlayingCard />
      </div>
    </header>

    <!-- ── row 1: bio · photo · experiments ─────────────────── -->
    <div class="mx-auto grid h-full max-w-8xl grid-cols-12 gap-y-6 xs:gap-x-12 xs:gap-y-10">
      <div class="order-1 col-span-12 h-full md:col-span-6 min-[896px]:col-span-7 xl:col-span-4">
        <BioCard />
      </div>

      <div class="order-2 col-span-12 flex md:col-span-6 min-[896px]:col-span-5 xl:col-span-4">
        <div class="relative flex h-96 w-full xs:h-full"><PhotoCard /></div>
      </div>

      <div class="order-3 col-span-12 flex h-full flex-col gap-6 xl:col-span-4">
        <Eyebrow label="Experiments" />
        <div class="flex h-full flex-col gap-6">
          {experiments.map((e) => <ExperimentCard {...e} />)}
        </div>
      </div>
    </div>

    <!-- ── row 2: articles · logos ──────────────────────────── -->
    <div class="mx-auto my-6 grid max-w-8xl grid-cols-12 gap-y-6 xs:my-10 xs:gap-x-12 xs:gap-y-0">
      <div class="order-1 col-span-12 flex flex-col gap-6 xl:col-span-8">
        <Eyebrow label="Articles" />
        <ArticlesCard />
      </div>
      <div class="order-2 col-span-12 flex flex-col-reverse xs:mt-12 xl:col-span-4 xl:flex-col">
        <LogoPanel />
      </div>
    </div>

    <!-- ── row 3: selected works ────────────────────────────── -->
    <div class="mx-auto grid max-w-8xl grid-cols-12">
      <div class="col-span-12 flex flex-col gap-6">
        <Eyebrow label={`Selected works from ${works[0]?.data.year ?? 2025}`} />
        <div class="grid grid-cols-6 gap-8 xs:gap-12">
          {works.map((w) => <WorkCard {...w.data} href={`/work/${w.id}`} />)}
        </div>
      </div>
    </div>

    <SiteFooter />
  </main>

  <Toast>Projects last refreshed 2025 — more coming soon.</Toast>
</Base>
```

### 3.14 `src/components/Toast.astro`

```astro
---
---
<div id="toast" class="fancy-card fixed bottom-12 left-0 z-50 flex items-end lg:bottom-20 lg:left-10">
  <div class="relative ml-4 max-w-xs rounded-2xl px-2 py-4">
    <button id="toast-x" aria-label="Dismiss" class="absolute right-5 top-4 text-faint transition-colors hover:text-ink">
      <svg class="h-3.5 w-3.5" viewBox="0 0 14 14" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M2 2l10 10M12 2L2 12" stroke-linecap="round" />
      </svg>
    </button>
    <p class="pr-4 text-sm leading-relaxed text-ink"><slot /></p>
  </div>
</div>

<script>
  const t = document.getElementById('toast');
  if (sessionStorage.getItem('toast-dismissed')) t?.remove();
  document.getElementById('toast-x')?.addEventListener('click', () => {
    sessionStorage.setItem('toast-dismissed', '1');
    t?.remove();
  });
</script>
```

### 3.15 `src/layouts/Base.astro`

```astro
---
import '../styles/global.css';
interface Props { title: string; description?: string }
const { title, description = 'Engineer, builder, photographer.' } = Astro.props;
---
<!doctype html>
<html lang="en" class="h-full antialiased">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <link rel="preload" href="/fonts/CabinetGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin />
  </head>
  <body class="h-full">
    <slot />
  </body>
</html>
```

---

## 4. Build order

| Phase | Work | Done when |
|---|---|---|
| **1 — Foundation** | Tailwind v4 wired, fonts self-hosted, `global.css` tokens + `.fancy-card` | A bare `<Card>` renders with the exact 5-inset shadow |
| **2 — Primitives** | `Card`, `Eyebrow`, `PillButton`, `Wordmark` | Visual diff against reference at 1440px is indistinguishable |
| **3 — Content model** | `content.config.ts`, 3 work MDs, 5 article MDs, `data/site.ts` | `getCollection` type-checks |
| **4 — Composition** | All 5 rows of `index.astro`, order-swap classes | Row 1 reflows correctly at 475 / 896 / 1104 / 1280 |
| **5 — Cards** | Bio, NowPlaying, Photo, Experiment, Articles, Work, LogoPanel | Every card has hover wash + press |
| **6 — Detail pages** | `/work/[...slug]`, `/articles` | Case studies render |
| **7 — Footer** | Contact CTA card, socials, colophon | Full-width card, reused across all pages |
| **8 — Polish** | Reduced-motion, focus rings, OG image, `astro check`, Lighthouse ≥ 95 | Ship |

---

## 5. Notable substitutions

| Reference feature | Their approach | Recommended here |
|---|---|---|
| "Recent favorite" music card | Spotify API → last played | Astro endpoint `/api/now-playing.json` hitting Spotify's `recently-played` with a refresh token, or a static entry in `data/site.ts` |
| Photo card | Next `<Image>` | Astro `<Image>` — set `widths` and let Astro emit AVIF/WebP |
| Framer Motion entrances | `motion.div` per section | CSS `@keyframes` + `IntersectionObserver`, or `astro:transitions` — no runtime needed |

---

## 6. Verification checklist

- `pnpm astro check` clean.
- Card shadow matches byte-for-byte: inspect a card, `getComputedStyle(el).boxShadow` should
  return the 5-part inset stack in §1.2.
- Breakpoints 375 / 475 / 768 / 896 / 1104 / 1280 / 1440 all reflow without horizontal scroll.
- Keyboard: every card link reachable, visible focus ring (`ring-accent/40`).
- Lighthouse: LCP < 1.5s (fonts preloaded, hero image `loading="eager"`), CLS 0.


---

## 7. Build log — what shipped

Implemented on 2026-08-21. Deviations from the plan above:

- **Footer map removed** at the user's request. The footer is now a full-width fancy-card
  contact CTA (Cabinet Grotesk headline, email pill, social grid, colophon bar), reused on
  every page. This also dropped the `world-atlas` / `d3-geo` dependency the map would have needed.
- **`z` import** — Astro 7 deprecates the `z` re-export from `astro:content`; `content.config.ts`
  imports from `zod` directly.
- **TypeScript pinned to 6.x** — `astro check` relies on a programmatic API that TypeScript 7's
  native compiler does not expose yet.
- **Placeholder imagery** — `src/assets/*.jpg` are generated abstract compositions in the site
  palette (see `scratchpad/genimg2.py`). Replace with real photography and case-study covers.

Verified: `astro check` 0 errors · `astro build` 10 pages · no horizontal overflow at
390 / 475 / 768 / 896 / 1104 / 1280 / 1440.

### Layout corrections (side-by-side pass against the reference)

Four height/proportion bugs found by comparing renders directly:

| Symptom | Cause | Fix |
|---|---|---|
| Row 1 was 556px vs the reference's ~410 | the portrait's 3:4 intrinsic ratio set the row height (421px wide → 561px tall) | `PhotoCard` image is `absolute inset-0 … object-cover` inside a `relative` frame, so it contributes no intrinsic height; the **bio card** drives the row and the photo crops to fill |
| Experiments column stopped short, leaving dead space | cards sized to content | each `ExperimentCard` wrapper is `flex-1`, the anchor `h-full`, so the three cards stretch to match bio/photo |
| Work card had ~80px of empty space above the button | image wrapper and text block both had `flex-grow` and fought — image squashed 224→162px while text ballooned to 359px | image is `h-60 xs:h-72 shrink-0` (fixed), text block keeps `flex-grow`, button pinned with `mt-auto` |
| Work card CTA read as a small inline chip | used the inline `PillButton` | `PillButton` gained a `block` variant: full-width, `justify-between`, right chevron |

Also added a social-icon row to the bio card footer so the `justify-between` gap reads as
deliberate composition rather than empty space, matching the reference's signature + icons block.

Final row-1 height: **456px** (reference ~410 at a narrower container).
