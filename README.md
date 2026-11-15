# Heeral Mandolia, portfolio

Next.js (App Router), TypeScript, Tailwind v4. No animation library: reveals, the scroll line and the hero demo are plain CSS and a few lines of React.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content
All copy is in `/content`. You should not need to touch components.

| File | What it controls |
| --- | --- |
| `site.ts` | name, links, hero text, contact line |
| `projects.ts` | every project card and its detail page |
| `clinotrust.ts` | the case study, interactive demo data, evaluation numbers |
| `experience.ts` | Across Medical section, education, awards |
| `research.ts` | CardioTrust FL |
| `skills.ts` | skill groups |
| `notes.ts` + `notes/*.mdx` | note list and post bodies |

Anything unknown is marked `TODO`. See `TODO.md`.

## Resume
`public/Heeral_Mandolia_Resume_Applied_AI.pdf`. Replace the file, keep the name, or change `resume` in `content/site.ts`.

## Deploy to Vercel
1. Push to GitHub.
2. Import the repo at vercel.com/new. Framework is detected as Next.js. No settings needed.
3. Set `url` in `content/site.ts` to the final domain.

Open Graph images are generated per page (`opengraph-image.tsx`).
