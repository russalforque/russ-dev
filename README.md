# russ-dev

[![CI](https://github.com/russalforque/russ-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/russalforque/russ-dev/actions/workflows/ci.yml)

Portfolio site for Rhazel Alforque, a full-stack developer in Cebu City, Philippines.

Live: https://russ-dev-t86v.vercel.app

## Stack

React 19, TypeScript, Vite and Tailwind CSS v4. It is a static single-page site: no server, no database, no
analytics.

## Design decisions

- **One data file.** Everything on the page comes from `src/data/portfolioData.ts`. Components only lay it out.
- **Links, not scripts.** Navigation is plain anchors, so every section and every project write-up has a URL
  (`/#studex`). Certificates open as ordinary image links, and long write-up text sits in a native `<details>`.
  There are no modals to trap focus in and nothing to break if a script fails.
- **Small runtime.** The only runtime dependencies in use are React and an icon set. Motion, sound, a command
  palette and a GitHub calendar widget were removed.
- **Checked in CI.** Each push is type-checked, the content is tested, the site is built, and a browser smoke test
  runs against the production build.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # type check
npm test         # content tests (Node's built-in test runner, needs Node 22.18 or later)
npm run build    # production build in dist/
```

Browser smoke test (optional locally, always run in CI):

```bash
npm install --no-save playwright && npx playwright install chromium
npm run build && npx vite preview --port 4173 &
node tests/smoke.mjs
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/data/portfolioData.ts` | All page content: projects, experience, education, skills, training |
| `src/components/` | One component per page section |
| `src/index.css` | Design tokens (colors, fonts) and shared styles |
| `public/assets/` | Résumé PDF, profile photo, certificate images |
| `tests/content.test.ts` | Checks on the data: unique ids, valid links, files exist, skills line up |
| `tests/smoke.mjs` | Browser checks on the built site: renders, no overflow, filter, theme, menu |

## Updating content

- **Add a project:** add an entry to `projects` in `src/data/portfolioData.ts`. Set `featured: true` to give it a
  full write-up under "Selected work"; featured projects need `architecture` (the layers, top to bottom) and
  `decisions` (each with a link to the code that backs it up).
- **Add a screenshot:** put the image in `public/assets/projects/` and set `image: "/assets/projects/<file>"`.
- **Skills:** names in a project's `technologies` must match the names in the skills list for the project counts
  and the skill filter to pick them up. `npm test` fails if something is listed as "familiar" but used on a project.
- **Résumé:** replace `public/assets/Rhazel Alforque Resume.pdf`, keeping the file name.
