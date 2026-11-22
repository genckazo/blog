---
title: "Through the wardrobe: why this site has doors"
date: 2026-11-22
excerpt: "This blog starts behind a pair of ASCII wardrobe doors. A short note on why the front page is a wardrobe, and what is on the other side."
tags: [meta, design]
---

Every site needs a front door. Most of them are navbars. I wanted mine to be
an actual door.

So the landing page of this blog is a large ASCII-art rendering of a pair of
wardrobe doors, drawn in plain monochrome characters. Click them and they
slide open; step through and you are in the reading room. No loading spinner,
no hero image — just ink on paper.

## Why a wardrobe

Because a blog is a small world you step into, the way a wardrobe is a small
world you step into. The entrance is deliberately theatrical and the inside is
deliberately quiet. That contrast is the whole design: the door can be as loud
as it wants, as long as the reading is calm.

## What is on the other side

- A **post list** set like the table of contents of an e-reader.
- **Individual posts** in a paperish, e-ink column — serif type, generous
  line height, a faint grain, and a low-glare palette.
- **Projects** and an **About** page, in the same quiet style.

Everything is plain Markdown in this repository. There is no database and no
CMS: a new post is a new `.md` file in `src/content/blog/`, and GitHub Actions
rebuilds and redeploys the site for free on GitHub Pages.

> "The thing about a wardrobe is that once you are through, you are somewhere
> else entirely." — paraphrasing the obvious

If you are reading this on the deployed site, the doors worked. Welcome in.
