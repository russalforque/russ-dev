/**
 * Content checks. Everything on the page comes from src/data/portfolioData.ts,
 * so these catch the mistakes that are easy to make when editing it:
 * a skill name that no longer matches, a link to the wrong repository,
 * an image path that is not in public/.
 *
 * Run with: npm test
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { portfolioData } from '../src/data/portfolioData.ts';

const { projects, technologies, familiar, certifications, experience, education } = portfolioData;
const featured = projects.filter((p) => p.featured);
const inPublic = (path: string) => existsSync(new URL(`../public${decodeURI(path)}`, import.meta.url));

function assertHttps(url: string, what: string) {
  const parsed = new URL(url); // throws on a malformed URL
  assert.equal(parsed.protocol, 'https:', `${what} must be https: ${url}`);
}

test('project ids are unique and usable as page anchors', () => {
  const ids = projects.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate project id');
  for (const id of ids) assert.match(id, /^[a-z][a-z0-9-]*$/, `"${id}" is not a safe anchor`);
});

test('every project says what it is and what it is built with', () => {
  for (const p of projects) {
    assert.ok(p.title.trim(), `${p.id} has no title`);
    assert.ok(p.tagline.trim(), `${p.id} has no tagline`);
    assert.ok(p.technologies.length > 0, `${p.id} lists no technologies`);
    assert.equal(new Set(p.technologies).size, p.technologies.length, `${p.id} repeats a technology`);
  }
});

test('every project can be opened or explains why not', () => {
  for (const p of projects) {
    assert.ok(p.githubUrl || p.liveUrl || p.sourceNote, `${p.id} has no link and no source note`);
  }
});

test('featured projects have a write-up', () => {
  assert.ok(featured.length > 0, 'nothing is featured');
  for (const p of featured) {
    assert.ok((p.architecture?.length ?? 0) >= 2, `${p.id} needs an architecture of at least two layers`);
    assert.ok((p.decisions?.length ?? 0) >= 2, `${p.id} needs at least two decisions`);
  }
});

test('project links are well-formed https URLs', () => {
  for (const p of projects) {
    for (const url of [p.liveUrl, p.githubUrl, p.download?.href, ...(p.links ?? []).map((l) => l.href)]) {
      if (url) assertHttps(url, `${p.id} link`);
    }
  }
});

test('code links point into the same repository as the project', () => {
  for (const p of featured) {
    for (const d of p.decisions ?? []) {
      assert.equal(Boolean(d.codeHref), Boolean(d.codeLabel), `${p.id}: "${d.title}" needs both a label and a link`);
      if (!d.codeHref) continue;
      assertHttps(d.codeHref, `${p.id} code link`);
      assert.ok(p.githubUrl, `${p.id} has a code link but no githubUrl`);
      assert.ok(d.codeHref.startsWith(`${p.githubUrl}/`), `${p.id}: "${d.title}" links outside ${p.githubUrl}`);
    }
  }
});

test('skills are listed once', () => {
  const all = [...technologies.flatMap((g) => g.items), ...familiar];
  const seen = new Set<string>();
  for (const skill of all) {
    assert.ok(!seen.has(skill.toLowerCase()), `"${skill}" is listed twice`);
    seen.add(skill.toLowerCase());
  }
});

test('a skill is not both "familiar" and used on a project', () => {
  const used = new Set(projects.flatMap((p) => p.technologies.map((t) => t.toLowerCase())));
  for (const skill of familiar) {
    assert.ok(!used.has(skill.toLowerCase()), `"${skill}" is used on a project, so it belongs in the main skills list`);
  }
});

test('the core stack in the headline is backed by projects', () => {
  const count = (tech: string) => projects.filter((p) => p.technologies.includes(tech)).length;
  for (const tech of ['C#', 'ASP.NET Core', 'SQL Server', 'React', 'TypeScript']) {
    assert.ok(count(tech) >= 2, `${tech} is in the headline but on fewer than two projects`);
    assert.ok(technologies.some((g) => g.items.includes(tech)), `${tech} is missing from the skills list`);
  }
});

test('files referenced from the data exist in public/', () => {
  assert.ok(inPublic(`/assets/${portfolioData.resumeDownloadName}`), 'résumé PDF is missing');
  for (const cert of certifications) assert.ok(inPublic(cert.image), `missing certificate image ${cert.image}`);
  for (const p of projects) if (p.image) assert.ok(inPublic(p.image), `missing screenshot ${p.image}`);
});

test('experience and education are complete', () => {
  assert.ok(experience.length > 0 && education.length > 0);
  for (const e of experience) assert.ok(e.period && e.title && e.organization && e.keyPoints.length > 0);
  for (const e of education) assert.ok(e.period && e.degree && e.school);
});

test('contact details are well-formed', () => {
  assert.match(portfolioData.email, /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  assertHttps(portfolioData.github, 'GitHub');
  assertHttps(portfolioData.linkedin, 'LinkedIn');
});
