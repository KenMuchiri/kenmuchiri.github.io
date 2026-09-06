# kenmuchiri.github.io

Personal site of Ken Muchiri — founder & CEO of [AlphaAI](https://alphaai.co.ke).

Vanilla HTML/CSS/JS, no build step. Design system lives in `src/main.css` and `src/main.js`.

## Structure

- `/` — Home
- `/about/` — Bio
- `/portfolio/` — Flagship AI products (AlphaAI) + prior web development work
- `/services/` — Advisory, technical leadership, speaking
- `/blog/` — Writing
- `/contact/` — Contact form (Formspree)
- `/work/` — Redirects to `/portfolio/`

## Local preview

No build step required — open `index.html` directly, or serve the folder with any static file server (paths are root-relative, so a local server works better than `file://`).

## Image sandbox deployment

The image sandbox uses the serverless function in `netlify/functions/`, so deploy this site through Netlify (or move the same function to another function-capable host). Add `HF_TOKEN` as a server-side environment variable in the hosting dashboard. Do not put the token in `index.html`, `main.js`, or any other public file.
