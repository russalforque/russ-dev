/**
 * Browser smoke test. Runs against the production build (`npm run build`, then
 * `npx vite preview --port 4173`) and checks the things a type checker cannot:
 * the page renders without errors, nothing overflows on a phone, and the few
 * interactive parts (skill filter, theme, mobile menu) do what they say.
 *
 * Playwright is installed by CI on the fly, so it is not a dependency of the site.
 * To run locally: npm i --no-save playwright && npx playwright install chromium
 *                 npm run build && npx vite preview --port 4173 & node tests/smoke.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4173/';
const failures = [];

function check(ok, message) {
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${message}`);
  if (!ok) failures.push(message);
}

async function waitForServer(page) {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      await page.goto(BASE, { waitUntil: 'load' });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`No server answered at ${BASE}`);
}

const overflows = (page) => page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
const inViewport = (page, selector) =>
  page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const { top } = el.getBoundingClientRect();
    return top >= 0 && top < window.innerHeight;
  }, selector);

const browser = await chromium.launch();

try {
  // ---------- Desktop ----------
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await desktop.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(`page error: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console error: ${message.text()}`);
  });

  await waitForServer(page);
  await page.waitForSelector('h1');

  check((await page.locator('h1').innerText()).includes('Rhazel'), 'the name is the page heading');
  check((await page.locator('h1').count()) === 1, 'there is exactly one h1');
  check((await page.title()).includes('Rhazel Alforque'), 'the document title names the person');

  const writeUps = await page.locator('#projects article').count();
  check(writeUps >= 3, `selected work shows write-ups (${writeUps})`);
  check((await page.locator('#more-projects li[id]').count()) >= 1, 'more projects are listed');

  // Every in-page link must point at something that exists.
  const brokenAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute('href'))
      .filter((href) => href.length > 1 && !document.getElementById(href.slice(1))),
  );
  check(brokenAnchors.length === 0, `in-page links resolve ${brokenAnchors.length ? `(broken: ${brokenAnchors.join(', ')})` : ''}`);

  // External links open in a new tab safely.
  const unsafe = await page.evaluate(() =>
    [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !a.rel.includes('noopener')).map((a) => a.href),
  );
  check(unsafe.length === 0, 'links that open a new tab use rel="noopener"');

  // Images have alt text (empty alt is fine for decoration, a missing attribute is not).
  const missingAlt = await page.locator('img:not([alt])').count();
  check(missingAlt === 0, 'every image has an alt attribute');

  // Nav anchors move the page and update the URL.
  await page.locator('header nav a[href="#experience"]').click();
  await page.waitForFunction(() => location.hash === '#experience');
  check(await inViewport(page, '#experience'), 'the Experience nav link scrolls to its section');

  // Deep link straight to one write-up.
  await page.goto(`${BASE}#swiftwash`, { waitUntil: 'load' });
  await page.waitForSelector('#swiftwash');
  await page.waitForTimeout(300);
  check(await inViewport(page, '#swiftwash'), 'a link to /#swiftwash lands on that write-up');

  // The background of a write-up is collapsed until asked for.
  const details = page.locator('#swiftwash details');
  check((await details.getAttribute('open')) === null, 'write-up background starts collapsed');
  await details.locator('summary').click();
  check((await details.getAttribute('open')) !== null, 'write-up background opens on click');

  // Skill filter: the number on the button is the number of projects shown.
  const skill = page.locator('#stack button', { hasText: 'SQL Server' }).first();
  const promised = Number((await skill.locator('span[aria-hidden="true"]').innerText()).trim());
  await skill.click();
  await page.waitForSelector('#projects [role="status"]');
  const shown = (await page.locator('#projects article').count()) + (await page.locator('#more-projects li[id]').count());
  check(shown === promised, `the SQL Server filter shows the ${promised} projects it promises (got ${shown})`);
  check((await skill.getAttribute('aria-pressed')) === 'true', 'the active skill is marked as pressed');
  await page.locator('#projects [role="status"] button').click();
  check((await page.locator('#projects article').count()) === writeUps, 'clearing the filter restores every write-up');

  // Theme: toggles, and survives a reload without flashing back.
  const wasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  await page.locator('#nav-theme-btn').click();
  check((await page.evaluate(() => document.documentElement.classList.contains('dark'))) === !wasDark, 'the theme button switches theme');
  await page.reload({ waitUntil: 'load' });
  check((await page.evaluate(() => document.documentElement.classList.contains('dark'))) === !wasDark, 'the chosen theme survives a reload');

  check(!(await overflows(page)), 'no horizontal overflow at 1440px');
  check(errors.length === 0, `no errors in the console ${errors.length ? `(${errors.join(' | ')})` : ''}`);
  await desktop.close();

  // ---------- Phone ----------
  for (const width of [320, 390, 768]) {
    const context = await browser.newContext({ viewport: { width, height: 800 }, reducedMotion: 'reduce' });
    const phone = await context.newPage();
    await phone.goto(BASE, { waitUntil: 'load' });
    await phone.waitForSelector('h1');
    check(!(await overflows(phone)), `no horizontal overflow at ${width}px`);

    if (width === 390) {
      const menuButton = phone.locator('#nav-menu-btn');
      check((await menuButton.getAttribute('aria-expanded')) === 'false', 'the mobile menu starts closed');
      await menuButton.click();
      check(await phone.locator('#mobile-nav').isVisible(), 'the menu button opens the mobile menu');
      await phone.locator('#mobile-nav a[href="#contact"]').click();
      await phone.waitForFunction(() => location.hash === '#contact');
      check((await phone.locator('#mobile-nav').count()) === 0, 'choosing a section closes the mobile menu');
      check(await phone.getByRole('link', { name: 'Résumé' }).first().isVisible(), 'the résumé link is visible on a phone');
    }
    await context.close();
  }
} catch (error) {
  failures.push(`the smoke test crashed: ${error.message}`);
  console.error(error);
} finally {
  await browser.close();
}

if (failures.length > 0) {
  // GitHub Actions turns these into annotations on the run.
  for (const failure of failures) console.log(`::error title=Smoke test::${failure}`);
  process.exit(1);
}
console.log('\nAll smoke checks passed.');
