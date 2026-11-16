# Band Website

A static band website built with Astro, React, Tailwind CSS, and Bun.

## Pages

- **Home** — Full-screen hero with logo and call-to-action links
- **Shows** — Upcoming show dates sourced from `src/data/show-dates.json`
- **Watch** — Embedded YouTube videos sourced from `src/data/videos.json`
- **Gallery** — Photo grid with lightbox viewer
- **Contact** — Contact form placeholder
- **404** — Custom not-found page

## Tech Stack

- [Astro](https://astro.build)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Bun](https://bun.sh)
- [Vercel](https://vercel.com)

## Local Development

Install [mise](https://mise.jdx.dev), then select the project-local Bun canary.
Stable Bun 1.4.4 does not provide the native lint/format commands used here.
No Node.js or npm installation is needed for the project commands.

```sh
mise install
mise exec -- bun --revision
bun install
bun run dev
```

If mise shims are not active in your shell, prefix commands with `mise exec --`.
`mise.toml` selects canary without changing your global runtime defaults.
Commit `bun.lock` after dependency changes; do not generate npm lockfiles.

Open [http://localhost:4321](http://localhost:4321) to view the site.

## Build

```sh
bun run build
bun run preview
```

## Quality Checks

```sh
bun lint
bun lint --fix
bun fmt
bun run check
```

Linting and formatting are Bun's native commands, configured in `bunfig.toml`;
there are no Biome, ESLint, or Prettier dependencies. Astro's dev, build, and
preview CLIs explicitly run under Bun, including commands with Node shebangs.

**Coverage limits:** native `bun lint` checks JavaScript/TypeScript/JSX, not
`.astro`, CSS, or HTML. Native `bun fmt` supports JS/TS/JSX, JSON, CSS, HTML,
Markdown, and TOML, but not `.astro`. Astro templates are compiled during the
build, not linted/formatted by these commands. Full Astro formatting would
require an additional formatter/plugin; this project deliberately keeps
Bun-only tooling instead. Framework dependencies may still use Node-compatible
APIs and include transitive `@types/node`; these run via Bun's compatibility
layer and do not require the Node executable.

## Browser Tests

```sh
bun run test:e2e:install
bun run test:e2e
```

Playwright runs under Bun and launches a separate Chromium browser.

## Deploy

The build produces a static site in `dist/`, with no Node server or Vercel
serverless adapter (and no adapter-provided image optimization or automatic
Web Analytics injection). The existing Speed Insights component still works.
For Vercel, use install command `bun install --frozen-lockfile`,
build command `bun run build`, and output directory `dist`. Other static hosts
work too. Deployment environments must provide Bun; the native lint/format
checks additionally require canary.

## Updating Content

- Edit `src/data/show-dates.json` to add or update show dates.
- Edit `src/data/videos.json` to add or update YouTube videos.
- Replace placeholder images in `public/images/` with real photos.
- Replace the placeholder logo in `public/images/logo.svg` with your real logo.
- Replace the favicon in `public/favicon.svg` with your real favicon.

## Contact Form

The contact form is currently a placeholder. To receive real submissions, connect it to a form backend service such as [Formspree](https://formspree.io), Basin, or Vercel serverless functions.
