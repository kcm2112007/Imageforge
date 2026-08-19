# ImageForge — Single-File Edition

**Powerful Image Tools. Private by Design.**

This is the consolidated version of ImageForge: the entire site — home page,
tool directory, all 5 tools, and every legal/info page — lives in **one
`index.html`**, styled by **one `style.css`**, and powered by **one
`script.js`**. Functionally it's identical to the multi-page version: same
tools, same design, same privacy guarantees, same social links. Only the
file structure is different.

## Files

```
imageforge-single/
├── index.html      ← every page of the site, as hash-routed sections
├── style.css        ← the entire design system + single-page routing rules
├── script.js         ← theme, nav, search, router, and all 5 tools
└── assets/
    ├── logo.svg, favicon.ico, favicon-16.png, favicon-32.png
    ├── apple-touch-icon.png, og-image.png
    └── icons/icon-192.png, icons/icon-512.png
```

That's 3 code files total (plus small binary icon assets, which aren't
HTML/CSS/JS).

## How navigation works

There's only one HTML page. Clicking any nav link, footer link, or tool
card changes the URL hash (e.g. `#compressor`, `#about`) instead of loading
a new file. `script.js` listens for `hashchange`, shows the matching
`<section class="page-section" id="page-KEY">`, hides the rest, and updates
the active nav state and document title — a lightweight router with no
framework and no page reloads.

Direct links still work: opening `index.html#cropper` takes a visitor
straight to the Image Cropper.

## The 5 tools (identical functionality to the multi-page version)

- 🗜️ **Compressor** — `#compressor`
- 📐 **Resizer** — `#resizer`
- 🔄 **Converter** — `#converter`
- 🧹 **Background Remover** — `#background-remover` (loads the on-device AI
  model from a CDN only when you click "Remove Background" — your photo is
  never uploaded)
- ✂️ **Cropper** — `#cropper`

Each tool's internal element IDs were namespaced (e.g. `dropzone_cmp`,
`dropzone_rsz`) so all five tools can safely live in the same DOM at once
without ID collisions, even though only one is visible at a time.

## Local development

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying to GitHub Pages

Same as the multi-page version: push these files to a repo and enable
Pages on the `main` branch, root folder. No service worker is included in
this edition to keep it to exactly three code files — the browser tab still
works great without one.

## Social links & contact

Edit the `SOCIAL_LINKS` object near the top of `script.js` to change
profile URLs. Contact email: **selope8962@toooby.com**.

## License

© 2026 ImageForge. All rights reserved.
