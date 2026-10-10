# russ-dev

Portfolio site for Rhazel Alforque, a full-stack developer in Cebu City, Philippines.

Live: https://russ-dev-t86v.vercel.app

## Stack

React 19, TypeScript, Vite and Tailwind CSS v4. It is a static site: there is no server and no database.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run lint     # type check
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/data/portfolioData.ts` | All page content: projects, experience, education, skills, training |
| `src/data/apps.ts` | Downloadable apps (Studex) |
| `src/components/` | One component per page section |
| `src/index.css` | Design tokens (colors, fonts) and shared styles |
| `public/assets/` | Résumé PDF, profile photo, certificate images |

## Updating content

- **Add a project:** add an entry to `projects` in `src/data/portfolioData.ts`. Set `featured: true` to show it in
  full under "Selected work", and fill `proves` with two to four specific things the project is evidence of.
- **Add a screenshot:** put the image in `public/assets/projects/` and set `image: "/assets/projects/<file>"` on the
  project. Featured projects show it above their write-up.
- **Skills:** names in a project's `technologies` must match the names in `technologies` (the skills list) for the
  project counts and the skill filter to pick them up.
- **Résumé:** replace `public/assets/Rhazel Alforque Resume.pdf`, keeping the file name.
