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

```sh
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

## Build

```sh
bun run build
```

## Deploy

Connect this repository to your Vercel account. Vercel will build and deploy the site automatically on every push to the main branch.

## Updating Content

- Edit `src/data/show-dates.json` to add or update show dates.
- Edit `src/data/videos.json` to add or update YouTube videos.
- Replace placeholder images in `public/images/` with real photos.
- Replace the placeholder logo in `public/images/logo.svg` with your real logo.
- Replace the favicon in `public/favicon.svg` with your real favicon.

## Contact Form

The contact form is currently a placeholder. To receive real submissions, connect it to a form backend service such as [Formspree](https://formspree.io), Basin, or Vercel serverless functions.
