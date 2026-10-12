# Rhazel Alforque — Portfolio

Personal portfolio of Rhazel Alforque, full-stack developer in Cebu City. Built with React 19, Tailwind CSS 4, Motion and Vite, served by a small Express server.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build and deploy

```bash
npm run build      # client to dist/, server to dist/server.cjs
npm start          # serves the built site from dist/
```

Set `PORT` to change the port (default 3000).

## Editing content

- Projects, experience, skills and certifications: `src/data/portfolioData.ts`
- Downloadable apps (Shop section): `src/data/apps.ts`
- Résumé PDF, certificate images, app icons: `public/assets/`

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Ctrl/⌘ K` or `?` | Command palette |
| `~` | Terminal |
| `P` / `C` | Jump to projects / contact |
| `D` | Toggle dark mode |
| `G` | Open GitHub |
