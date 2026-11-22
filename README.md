# blog

Personal blog of **genckazo**. Landing page is a large monochrome ASCII-art
wardrobe (Narnia-style); click the doors and they slide open into the blog,
which is styled like an e-reader: paperish textured background, serif reading
column, low-glare palette, responsive on mobile.

- **Free hosting:** GitHub Pages — <https://genckazo.github.io/blog/> (no paid
  services anywhere)
- **Free address:** this repo (`genckazo/blog`) is served by GitHub Pages at
  `https://genckazo.github.io/blog/`. To get the root address
  `https://genckazo.github.io/` instead, rename the repo to
  `genckazo.github.io` and set `base: '/'` in `astro.config.mjs`.
- **Content:** plain Markdown files in `src/content/blog/` — no database, no CMS.

## Stack

[Astro](https://astro.build) (static site generator) + Markdown content
collections. Chosen because it is free, builds to 100% static HTML, is
Markdown-native (posts are `.md` files in the repo), and deploys for free to
GitHub Pages via GitHub Actions. No paid anything.

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321/blog/
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

## Pages

| Page | Route (on the deployed site) |
|---|---|
| Entrance (ASCII wardrobe doors) | `https://genckazo.github.io/blog/` |
| Blog — post list | `https://genckazo.github.io/blog/posts/` |
| Individual post | `https://genckazo.github.io/blog/posts/<slug>/` |
| Projects | `https://genckazo.github.io/blog/projects/` |
| About | `https://genckazo.github.io/blog/about/` |

(The `/blog/` prefix comes from the repo name; see above for the root-URL option.)

## Write a post

Add `src/content/blog/my-post.md`:

```md
---
title: "My post"
date: 2026-11-22
excerpt: "One-line summary shown in the list."
tags: [notes]
---

Body in Markdown.
```

Commit and push to `main` (or merge a PR) — the site rebuilds and redeploys
automatically. Set `draft: true` to hide a post.

## Free deployment (GitHub Pages)

1. Workflow `.github/workflows/deploy.yml` builds the site on every push to
   `main` and deploys `dist/` with the official `actions/deploy-pages` action.
2. Enable Pages once: repo **Settings → Pages → Build and deployment →
   Source → "GitHub Actions"** (equivalently:
   `gh api -X PUT repos/genckazo/blog/pages -f build_type=workflow`).
3. Merge to `main` → the workflow runs → the site is live at
   **<https://genckazo.github.io/blog/>**.

CI (`.github/workflows/ci.yml`) runs `npm ci && npm run build` on every pull
request so PRs are checked before merge.

## Design variations

The first working version ships with switchable variants so the look can be
iterated: open the entrance with `?door=panel` (default), `?door=louver`, or
`?door=window`, and any reading page with `?texture=subtle|standard|strong`
(default `standard`). See [docs/variations.md](docs/variations.md) with
screenshots in [docs/screenshots/](docs/screenshots/).

## Repo layout

```
src/pages/index.astro          entrance: ASCII wardrobe doors, click to enter
src/data/doors.ts              generated door art (3 variants, 3 layers each)
src/pages/posts/               blog list + [...slug] post pages
src/pages/projects.astro       projects
src/pages/about.astro          about
src/layouts/Layout.astro       e-reader page shell (header/nav/footer)
src/styles/global.css          e-ink paper theme (palette, grain, type)
src/content/blog/*.md          posts (Markdown)
.github/workflows/             CI (PR) + Pages deploy (main)
docs/screenshots/              screenshots used in the PR
docs/variations.md             design variations for review
```
