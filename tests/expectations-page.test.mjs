import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(
  new URL('../src/pages/expectations.astro', import.meta.url),
  'utf8',
);
const homePage = await readFile(
  new URL('../src/pages/index.astro', import.meta.url),
  'utf8',
);
const footer = await readFile(
  new URL('../src/components/SiteFooter.astro', import.meta.url),
  'utf8',
);

test('offers an accessible audience switch between business and developer views', () => {
  assert.match(page, /role="tablist"/);
  assert.match(page, /id="business-owner-tab"[^>]*role="tab"/);
  assert.match(page, /id="developer-tab"[^>]*role="tab"/);
  assert.match(page, /id="business-owner-panel"[^>]*role="tabpanel"/);
  assert.match(page, /id="developer-panel"[^>]*role="tabpanel"/);
  assert.match(page, /aria-selected/);
  assert.match(page, /function activateView/);
});

test('keeps the business view focused on systems a business can hire for', () => {
  assert.match(page, /Business owner/i);
  assert.match(page, /Restaurant & bookings/i);
  assert.match(page, /Retail, POS & accounting/i);
  assert.match(page, /Online shop & payments/i);
  assert.match(page, /Community & field services/i);
  assert.match(page, /AI & chatbot integration/i);
  assert.match(page, /Company presence/i);
  assert.match(page, /Table booking/i);
  assert.match(page, /payment integration/i);
  assert.match(page, /document generation/i);
  assert.match(page, /customer questions, leads, and appointment requests/i);
  assert.match(page, /bilingual content and clear service positioning/i);
});

test('uses a simple three-path developer scope map in the shared site language', () => {
  assert.match(page, /Comfortable owning/i);
  assert.match(page, /Can contribute with guidance/i);
  assert.match(page, /Learning & boundaries/i);
  assert.match(page, /architecture review/i);
  assert.match(page, /Focused production features/i);
  assert.match(page, /Gemini API|OpenAI API/i);
  assert.match(page, /Not the right solo owner/i);
  assert.match(page, /import Card/);
  assert.match(page, /fancy-card/);
});

test('uses an editorial field-guide layout instead of one uniform card grid', () => {
  assert.match(page, /expectation-stage/);
  assert.match(page, /fit-signal/);
  assert.match(page, /business-system__visual/);
  assert.match(page, /scope-rail/);
});

test('grounds the expanded business and developer views in real project evidence', () => {
  assert.match(page, /Restaurant & bookings/i);
  assert.match(page, /Retail, POS & accounting/i);
  assert.match(page, /Community & field services/i);
  assert.match(page, /Nepal House/i);
  assert.match(page, /Kirana Books/i);
  assert.match(page, /Starlight/i);
  assert.match(page, /Krishi Connect/i);
  assert.match(page, /project evidence/i);
  assert.match(page, /import \{ Image \} from ["']astro:assets["']/);
});

test('separates product ownership from deployment guidance with deliberate card spacing', () => {
  assert.match(page, /Krishi Connect and ToolsMandu — user journeys, dashboards and frontend\/backend feature work/i);
  assert.match(page, /The production deployment of Krishi Connect and ToolsMandu/i);
  assert.match(page, /\.scope-rail\s*\{[^}]*margin-top: 3\.5rem;/);
  assert.match(page, /\.scope-step__card\s*\{[^}]*padding: 2rem 2\.25rem;/);
  assert.match(page, /\.business-system__action\s*\{[^}]*margin-top: 1\.5rem;/);
});

test('gives visitors a clear expectations entry point from the home page and footer', () => {
  assert.match(homePage, /href="\/expectations"/);
  assert.match(homePage, /Expectations|Quick fit check/i);
  assert.match(
    footer,
    /<li>\s*<a\s+href="\/expectations"[\s\S]*?class="group\/row flex items-baseline justify-between gap-6 py-3"[\s\S]*?<span[^>]*>\s*Expectations\s*<\/span>[\s\S]*?Quick fit/,
  );
  assert.doesNotMatch(footer, /Project fit/);
  assert.doesNotMatch(footer, /rounded-2xl border border-line px-4 py-3/);
});

test('uses the site entrance wave and a replayable panel transition on expectations', () => {
  assert.match(page, /class="expectation-copy rise"/);
  assert.match(page, /fit-signal fancy-card rise/);
  assert.match(page, /class="view-switcher rise"/);
  assert.match(page, /is-entering/);
  assert.match(page, /\.audience-panel\.is-entering\s*\{[^}]*animation: panel-in/);
});
