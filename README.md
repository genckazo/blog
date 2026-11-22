# blog

Personal blog of **genckazo**, styled like a reading app: warm paper, serif
book pages, a reading-list index, and a Display panel (Paper / Dusk / Ink
themes + Light, Contrast, Warmth, Grain sliders). Posts are plain Markdown
files — no database, no CMS.

- **Free hosting:** GitHub Pages — <https://genckazo.github.io/blog/> (no paid
  services anywhere)
- **Free address:** this repo (`genckazo/blog`) is served by GitHub Pages at
  `https://genckazo.github.io/blog/`. To get the root address
  `https://genckazo.github.io/` instead, rename the repo to
  `genckazo.github.io` and set `base: '/'` in `astro.config.mjs`.
- **Content:** plain Markdown files in `src/content/blog/`.

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
| Landing (minimal typographic page) | `https://genckazo.github.io/blog/` |
| Blog — reading list | `https://genckazo.github.io/blog/posts/` |
| Individual post (book style) | `https://genckazo.github.io/blog/posts/<slug>/` |
| Projects | `https://genckazo.github.io/blog/projects/` |
| About | `https://genckazo.github.io/blog/about/` |

(The `/blog/` prefix comes from the repo name; see above for the root-URL option.)

## Look & feel

- **Landing**: an empty page with a single "Enter the blog" link — nothing else.
- **Reading pages**: warm paper background with a subtle grain (inline SVG
  `feTurbulence`), near-black ink, serif body with indented paragraphs at
  1.78 line height, sans-serif UI chrome, hairline dividers, no shadows.
- **Display panel** (floating "Display" button, bottom right): Paper / Dusk /
  Ink theme chips + Light / Contrast / Warmth / Grain sliders. Settings persist
  in `localStorage`. `?texture=subtle|standard|strong` on any URL overrides
  the grain level once.
- All colors/texture live in CSS custom properties in `:root` in
  `src/styles/global.css` — tweak the vibe in a single file.
- Brief paper-colored flash on page load, like an e-ink screen refresh
  (disabled under `prefers-reduced-motion`).
- Responsive: single column under 560px, texture stays subtle on phones.

## Write a post

Add `src/content/blog/my-post.md`:

```md
---
title: "My post"
date: 2026-11-22
excerpt: "One-line summary shown in the reading list."
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
   `gh api -X POST repos/genckazo/blog/pages -f build_type=workflow`).
3. Merge to `main` → the workflow runs → the site is live at
   **<https://genckazo.github.io/blog/>**.

CI (`.github/workflows/ci.yml`) runs `npm ci && npm run build` on every pull
request so PRs are checked before merge.

## Design variations

See [docs/variations.md](docs/variations.md) — theme variants (Paper / Dusk /
Ink) and grain levels, with screenshots in [docs/screenshots/](docs/screenshots/).

## Repo layout

```
src/pages/index.astro          minimal typographic landing page
src/pages/posts/               reading-list index + [...slug] book-style posts
src/pages/projects.astro       projects (cards)
src/pages/about.astro          about
src/layouts/Layout.astro       page shell + Display settings panel (theme engine)
src/styles/global.css          paper/ink theme, all colors in :root custom properties
src/content/blog/*.md          posts (Markdown)
.github/workflows/             CI (PR) + Pages deploy (main)
docs/screenshots/              screenshots used in the PR
docs/variations.md             design variations for review
```
