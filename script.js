/* =========================================================================
   ImageForge — script.js (single-file edition)
   Shared site behaviour: theme switching, mobile nav, social links,
   global search, hash-based page routing, and utility helpers used by
   every tool below. All five tools live in this one file, each scoped
   inside its own IIFE so their internals never collide.
   ========================================================================= */

/* ---------------------------------------------------------------------
   SOCIAL MEDIA CONFIGURATION
   Leave a value as an empty string "" to hide that icon everywhere on
   the site (header, footer, About page, Contact page).
--------------------------------------------------------------------- */
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/goodx_official?igsh=MjViOTB0M3o5OHN6",
  facebook: "https://www.facebook.com/share/19CAzUUMcJ/",
  youtube: "",
  linkedin: "",
  github: "https://kcm2112007.github.io/KalicharanMurmu-/",
  twitter: "",
  telegram: "",
  whatsapp: "https://whatsapp.com/channel/0029VbDU9dmEQIameOnw2R47"
};

const SOCIAL_ICONS = {
  instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.07 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.25.07-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.24-1.97.4-2.43A4.9 4.9 0 0 1 3.82 3a4.9 4.9 0 0 1 1.77-1.15c.46-.16 1.26-.35 2.43-.4C9.4 2.2 9.8 2.2 12 2.2zm0 3.03a6.77 6.77 0 1 0 0 13.54 6.77 6.77 0 0 0 0-13.54zm0 11.17a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8zm7.03-11.44a1.58 1.58 0 1 1-3.16 0 1.58 1.58 0 0 1 3.16 0z"/>',
  facebook: '<path d="M13.5 21v-7.7h2.6l.4-3h-3v-1.93c0-.87.24-1.46 1.5-1.46h1.6V4.2c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4.02V10.3H7.7v3h2.66V21h3.14z"/>',
  youtube: '<path d="M21.6 7.2s-.21-1.5-.87-2.16c-.83-.87-1.76-.87-2.19-.92C15.44 4 12 4 12 4h-.01s-3.44 0-6.54.12c-.43.05-1.36.05-2.19.92C2.6 5.7 2.4 7.2 2.4 7.2S2.19 8.95 2.19 10.7v1.6c0 1.75.21 3.5.21 3.5s.21 1.5.86 2.16c.83.87 1.92.84 2.4.94 1.75.17 7.34.21 7.34.21s3.44 0 6.54-.12c.43-.05 1.36-.05 2.19-.92.65-.66.87-2.16.87-2.16s.2-1.75.2-3.5v-1.6c0-1.75-.2-3.5-.2-3.5zM9.95 14.55V8.85l5.6 2.86-5.6 2.84z"/>',
  linkedin: '<path d="M6.94 8.5H3.56V20.4h3.38V8.5zM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.45 20.4h-3.37v-6.24c0-1.49-.03-3.4-2.07-3.4-2.08 0-2.4 1.62-2.4 3.3v6.34H9.24V8.5h3.24v1.62h.05c.45-.86 1.56-1.77 3.2-1.77 3.42 0 4.05 2.25 4.05 5.18v6.87z"/>',
  twitter: '<path d="M21 5.8c-.66.3-1.36.5-2.1.6a3.65 3.65 0 0 0 1.6-2.02c-.7.42-1.48.72-2.31.89A3.63 3.63 0 0 0 11.9 8.6c0 .28.03.56.09.83A10.3 10.3 0 0 1 4.4 5.15a3.63 3.63 0 0 0 1.12 4.85c-.6-.02-1.16-.18-1.65-.46v.05c0 1.77 1.26 3.25 2.94 3.58-.31.09-.63.13-.96.13-.24 0-.46-.02-.68-.06.47 1.45 1.82 2.5 3.42 2.53A7.3 7.3 0 0 1 3 17.54a10.3 10.3 0 0 0 5.58 1.63c6.7 0 10.36-5.55 10.36-10.36l-.01-.47A7.4 7.4 0 0 0 21 5.8z"/>',
  github: '<path d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.32.68.94.68 1.9v2.82c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
  telegram: '<path d="M21.9 4.6 3.3 11.9c-1.27.5-1.26 1.2-.23 1.51l4.77 1.49 1.83 5.6c.22.6.38.84.77.84.36 0 .53-.16.75-.38l1.8-1.75 4.68 3.45c.86.48 1.48.23 1.7-.8l3.06-14.4c.32-1.36-.5-1.98-1.53-1.86z"/>',
  whatsapp: '<path d="M17.5 14.4c-.28-.14-1.66-.82-1.92-.9-.26-.1-.44-.14-.63.14-.18.28-.72.9-.88 1.08-.16.19-.32.2-.6.07-.28-.14-1.18-.44-2.24-1.4-.83-.73-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.18-.28.28-.46.1-.19.05-.35-.02-.49-.07-.14-.63-1.53-.87-2.1-.23-.55-.46-.47-.63-.48-.16 0-.35-.01-.53-.01-.19 0-.5.07-.76.35-.26.28-1 1-1 2.42 0 1.43 1.03 2.8 1.17 3 .14.19 2.03 3.1 4.92 4.34.69.3 1.22.48 1.64.6.69.22 1.31.19 1.8.11.55-.08 1.66-.68 1.9-1.33.23-.65.23-1.2.16-1.32-.07-.13-.25-.2-.53-.34zM12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.28A9.8 9.8 0 1 0 12 2.2z"/>'
};

const SOCIAL_LABELS = {
  instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", linkedin: "LinkedIn",
  twitter: "X (Twitter)", github: "GitHub", telegram: "Telegram", whatsapp: "WhatsApp"
};

/* ---------------------------------------------------------------------
   THEME (light / dark / system) — persisted in localStorage
--------------------------------------------------------------------- */
const ThemeManager = {
  key: "imageforge-theme",
  init() {
    const saved = localStorage.getItem(this.key) || "system";
    this.apply(saved);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if ((localStorage.getItem(this.key) || "system") === "system") this.apply("system");
    });
    document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
      btn.addEventListener("click", () => this.cycle());
    });
  },
  resolvedTheme(mode) {
    if (mode === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return mode;
  },
  apply(mode) {
    const resolved = this.resolvedTheme(mode);
    document.documentElement.setAttribute("data-theme", resolved);
    localStorage.setItem(this.key, mode);
    document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
      btn.setAttribute("aria-label", `Theme: ${mode}. Click to change.`);
      btn.setAttribute("title", `Theme: ${mode} (click to cycle)`);
    });
  },
  cycle() {
    const order = ["light", "dark", "system"];
    const current = localStorage.getItem(this.key) || "system";
    const next = order[(order.indexOf(current) + 1) % order.length];
    this.apply(next);
  }
};
ThemeManager.init();

/* ---------------------------------------------------------------------
   MOBILE NAV
--------------------------------------------------------------------- */
document.querySelectorAll("[data-hamburger]").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = document.querySelector("[data-mobile-nav]");
    if (!panel) return;
    const isOpen = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
});
document.querySelectorAll("[data-mobile-nav] a").forEach(a => {
  a.addEventListener("click", () => {
    const panel = document.querySelector("[data-mobile-nav]");
    if (panel) { panel.classList.remove("open"); document.body.style.overflow = ""; }
  });
});

/* ---------------------------------------------------------------------
   SOCIAL ICON RENDERING — injects into any [data-social-container]
--------------------------------------------------------------------- */
function renderSocialIcons() {
  document.querySelectorAll("[data-social-container]").forEach(container => {
    const active = Object.entries(SOCIAL_LINKS).filter(([, url]) => url && url.trim() !== "");
    if (active.length === 0) { container.style.display = "none"; return; }
    container.innerHTML = active.map(([key, url]) => `
      <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${SOCIAL_LABELS[key]}">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SOCIAL_ICONS[key]}</svg>
      </a>`).join("");
  });
}
renderSocialIcons();

/* ---------------------------------------------------------------------
   FOOTER YEAR
--------------------------------------------------------------------- */
document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

/* ---------------------------------------------------------------------
   ESCAPE HELPER
--------------------------------------------------------------------- */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================================
   ROUTER — hash-based single-page navigation.
   Every "page" (Home, Tools, each of the 5 tools, About, Contact, Privacy,
   Terms, Disclaimer) is a <section class="page-section" id="page-KEY">
   already present in the DOM. Navigating just toggles which one is visible
   and updates the active states on every nav link / tool-switcher button.
   ========================================================================= */
const ROUTES = ["home", "tools", "compressor", "resizer", "converter", "background-remover", "cropper",
                 "about", "contact", "privacy", "terms", "disclaimer"];
const PAGE_TITLES = {
  "home": "ImageForge — Powerful Image Tools. Private by Design.",
  "tools": "Image Tools — ImageForge",
  "compressor": "Image Compressor — ImageForge",
  "resizer": "Image Resizer — ImageForge",
  "converter": "Image Converter — ImageForge",
  "background-remover": "Background Remover — ImageForge",
  "cropper": "Image Cropper — ImageForge",
  "about": "About ImageForge",
  "contact": "Contact ImageForge",
  "privacy": "Privacy Policy — ImageForge",
  "terms": "Terms of Service — ImageForge",
  "disclaimer": "Disclaimer — ImageForge"
};

function currentRouteFromHash() {
  const raw = (window.location.hash || "#home").replace(/^#/, "");
  if (ROUTES.includes(raw)) return { key: raw, anchor: raw };
  if (raw.startsWith("home")) return { key: "home", anchor: raw };
  // Unknown fragment (e.g. the "#main" skip-link, or any other in-page anchor):
  // stay on whichever page is currently showing instead of forcing a switch to Home.
  const activeSection = document.querySelector(".page-section.active");
  const fallbackKey = activeSection ? activeSection.id.replace(/^page-/, "") : "home";
  return { key: fallbackKey, anchor: raw };
}

function navigate(showScrollToTop = true) {
  const { key, anchor } = currentRouteFromHash();

  document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
  const target = document.getElementById(`page-${key}`);
  if (target) target.classList.add("active");

  document.querySelectorAll("[data-nav]").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(`[data-nav="${key}"]`).forEach(el => el.classList.add("active"));

  if (PAGE_TITLES[key]) document.title = PAGE_TITLES[key];

  // If the hash points at a specific in-page element (e.g. "home-how-it-works"), scroll to it.
  if (anchor && anchor !== key) {
    const el = document.getElementById(anchor);
    if (el) { setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50); return; }
  }
  if (showScrollToTop) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

window.addEventListener("hashchange", () => navigate(true));
document.addEventListener("DOMContentLoaded", () => navigate(false));
// Run once immediately too, in case DOMContentLoaded already fired before this script executed
if (document.readyState !== "loading") navigate(false);

/* ---------------------------------------------------------------------
   HOME HERO DEMO DROPZONE — routes to the Tools page
--------------------------------------------------------------------- */
(function heroDemo() {
  const dz = document.getElementById("heroDropzone");
  if (!dz) return;
  const input = document.getElementById("heroFileInput");
  const browseBtn = document.getElementById("heroBrowseBtn");
  function goToTools() { window.location.hash = "#tools"; }
  if (browseBtn) browseBtn.addEventListener("click", (e) => { e.stopPropagation(); input.click(); });
  dz.addEventListener("click", () => input && input.click());
  if (input) input.addEventListener("change", () => { if (input.files.length) goToTools(); });
  ["dragenter", "dragover"].forEach(evt => dz.addEventListener(evt, e => { e.preventDefault(); dz.classList.add("dragover"); }));
  ["dragleave", "drop"].forEach(evt => dz.addEventListener(evt, e => { e.preventDefault(); dz.classList.remove("dragover"); }));
  dz.addEventListener("drop", (e) => { if (e.dataTransfer.files.length) goToTools(); });
})();

/* ---------------------------------------------------------------------
   TOOL SWITCHER BUTTONS (shown at the top of each tool page)
--------------------------------------------------------------------- */
document.querySelectorAll(".tool-switcher button[data-nav]").forEach(btn => {
  btn.addEventListener("click", () => { window.location.hash = "#" + btn.dataset.nav; });
});

/* ---------------------------------------------------------------------
   CONTACT FORM — builds a mailto: link from the form fields and opens
   the visitor's own email app. No server, no data collection; the
   message is composed and sent entirely from their own mail account.
--------------------------------------------------------------------- */
(function contactForm() {
  const CONTACT_EMAIL = "selope8962@toooby.com";
  const form = document.getElementById("contactForm");
  if (!form) return;
  const errorArea = document.getElementById("contactFormError");

  function showFormError(msg) {
    errorArea.innerHTML = `<div class="alert alert-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg>
      <span>${escapeHtml(msg)}</span></div>`;
  }
  function showFormSuccess(msg) {
    errorArea.innerHTML = `<div class="alert alert-info" role="status">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg>
      <span>${escapeHtml(msg)}</span></div>`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorArea.innerHTML = "";

    const name = form.querySelector("#cfName").value.trim();
    const email = form.querySelector("#cfEmail").value.trim();
    const subject = form.querySelector("#cfSubject").value.trim() || "ImageForge Inquiry";
    const message = form.querySelector("#cfMessage").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) { showFormError("Please enter your name."); form.querySelector("#cfName").focus(); return; }
    if (!email || !emailPattern.test(email)) { showFormError("Please enter a valid email address."); form.querySelector("#cfEmail").focus(); return; }
    if (!message) { showFormError("Please enter a message."); form.querySelector("#cfMessage").focus(); return; }

    const body = `${message}\n\n—\nFrom: ${name} (${email})`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    showFormSuccess("Opening your email app with this message pre-filled, addressed to " + CONTACT_EMAIL + "…");
  });
})();

/* ---------------------------------------------------------------------
   GLOBAL SEARCH — searches the 5 tools by name/keyword, routes via hash
--------------------------------------------------------------------- */
const SEARCH_INDEX = [
  { name: "Image Compressor", url: "compressor", keywords: "compress compressor size shrink optimize jpg png webp" },
  { name: "Image Resizer", url: "resizer", keywords: "resize resizer dimensions pixels scale instagram youtube" },
  { name: "Image Converter", url: "converter", keywords: "convert converter format jpg png webp avif heic" },
  { name: "Background Remover", url: "background-remover", keywords: "background remove remover transparent cutout ai" },
  { name: "Image Cropper", url: "cropper", keywords: "crop cropper rotate flip aspect ratio" }
];

document.querySelectorAll("[data-global-search]").forEach(input => {
  const resultsBox = input.parentElement.querySelector(".search-results");
  function runSearch() {
    const q = input.value.trim().toLowerCase();
    if (!q) { resultsBox.classList.add("hidden"); resultsBox.innerHTML = ""; return; }
    const matches = SEARCH_INDEX.filter(item => item.name.toLowerCase().includes(q) || item.keywords.includes(q));
    resultsBox.classList.remove("hidden");
    resultsBox.innerHTML = matches.length
      ? matches.map(m => `<a href="#${m.url}">${m.name}</a>`).join("")
      : `<div class="empty">No tools found for "${escapeHtml(input.value)}"</div>`;
  }
  input.addEventListener("input", runSearch);
  input.addEventListener("focus", runSearch);
  document.addEventListener("click", (e) => {
    if (!input.parentElement.contains(e.target)) resultsBox.classList.add("hidden");
  });
  resultsBox.addEventListener("click", () => { input.value = ""; resultsBox.classList.add("hidden"); });
});

/* =========================================================================
   SHARED UTILITIES used by every tool below (compressor, resizer, etc.)
   ========================================================================= */
const IF = window.IF = {};
IF.escapeHtml = escapeHtml;
IF.ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
IF.MAX_FILE_SIZE = 60 * 1024 * 1024; // 60 MB safety ceiling per image
IF.MAX_DIMENSION = 12000; // px safety ceiling

IF.formatBytes = function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const val = bytes / Math.pow(1024, i);
  return `${val >= 100 ? Math.round(val) : val.toFixed(1)} ${units[i]}`;
};

IF.validateImageFile = function validateImageFile(file, opts = {}) {
  const accepted = opts.acceptedTypes || IF.ACCEPTED_TYPES;
  if (!file) return { ok: false, error: "No file was selected." };
  if (!accepted.includes(file.type)) {
    return { ok: false, error: `"${file.name}" isn't a supported format. Please select a JPG, PNG or WebP image.` };
  }
  if (file.size > (opts.maxSize || IF.MAX_FILE_SIZE)) {
    return { ok: false, error: `"${file.name}" is too large (${IF.formatBytes(file.size)}). Please select a file under ${IF.formatBytes(opts.maxSize || IF.MAX_FILE_SIZE)}.` };
  }
  if (file.size === 0) {
    return { ok: false, error: `"${file.name}" appears to be empty or corrupted.` };
  }
  return { ok: true };
};

IF.loadImage = function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > IF.MAX_DIMENSION || img.naturalHeight > IF.MAX_DIMENSION) {
        URL.revokeObjectURL(url);
        reject(new Error(`Image dimensions (${img.naturalWidth}×${img.naturalHeight}) exceed the ${IF.MAX_DIMENSION}px safety limit.`));
        return;
      }
      resolve({ img, url });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`"${file.name}" could not be read. It may be corrupted or in an unsupported format.`));
    };
    img.src = url;
  });
};

IF.drawToCanvas = function drawToCanvas(img, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
};

IF.canvasToBlob = function canvasToBlob(canvas, type = "image/png", quality = 0.92) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error("The browser could not export this image format."));
    }, type, quality);
  });
};

IF.canEncode = function canEncode(mimeType) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 2; canvas.height = 2;
    const dataUrl = canvas.toDataURL(mimeType);
    return dataUrl.indexOf(`data:${mimeType}`) === 0;
  } catch (e) {
    return false;
  }
};

IF.downloadBlob = function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};

IF.buildFilename = function buildFilename(originalName, suffix, ext) {
  const base = originalName.replace(/\.[^.]+$/, "");
  return `${base}${suffix ? "-" + suffix : ""}.${ext}`;
};

IF.extForMime = function extForMime(mime) {
  return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" }[mime] || "img";
};

IF.wireDropzone = function wireDropzone(dropzoneEl, inputEl, onFiles) {
  dropzoneEl.addEventListener("click", () => { inputEl.click(); });
  dropzoneEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputEl.click(); }
  });
  inputEl.addEventListener("change", () => {
    if (inputEl.files.length) onFiles(Array.from(inputEl.files));
    inputEl.value = "";
  });
  ["dragenter", "dragover"].forEach(evt => {
    dropzoneEl.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); dropzoneEl.classList.add("dragover"); });
  });
  ["dragleave", "drop"].forEach(evt => {
    dropzoneEl.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); dropzoneEl.classList.remove("dragover"); });
  });
  dropzoneEl.addEventListener("drop", (e) => {
    const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith("image/"));
    if (files.length) onFiles(files);
  });
};

IF.debounce = function debounce(fn, wait = 150) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
};

/* =========================================================================
   TOOL 1 — IMAGE COMPRESSOR
   ========================================================================= */

/* =========================================================================
   ImageForge — Image Compressor
   Compresses JPG/PNG/WebP images locally using the Canvas API.
   ========================================================================= */
(function () {
  "use strict";

  const dropzone = document.getElementById("dropzone_cmp");
  const fileInput = document.getElementById("fileInput_cmp");
  const controlsPanel = document.getElementById("controlsPanel_cmp");
  const fileListEl = document.getElementById("fileList_cmp");
  const errorArea = document.getElementById("errorArea_cmp");
  const qualityRange = document.getElementById("qualityRange_cmp");
  const qualityValue = document.getElementById("qualityValue_cmp");
  const formatSelect = document.getElementById("formatSelect_cmp");
  const targetSizeInput = document.getElementById("targetSize_cmp");
  const compressBtn = document.getElementById("compressBtn_cmp");
  const downloadAllBtn = document.getElementById("downloadAllBtn_cmp");
  const resetBtn = document.getElementById("resetBtn_cmp");
  const progressTrack = document.getElementById("progressTrack_cmp");
  const progressFill = document.getElementById("progressFill_cmp");

  /** @type {{id:number,file:File,img:HTMLImageElement,url:string,status:string,resultBlob:Blob|null,resultUrl:string|null,outMime:string}[]} */
  let items = [];
  let nextId = 1;

  qualityRange.addEventListener("input", () => { qualityValue.textContent = qualityRange.value + "%"; });

  function showError(msg) {
    errorArea.innerHTML = `<div class="alert alert-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg>
      <span>${IF.escapeHtml(msg)}</span></div>`;
  }
  function clearError() { errorArea.innerHTML = ""; }

  IF.wireDropzone(dropzone, fileInput, handleFiles);

  async function handleFiles(files) {
    clearError();
    const errors = [];
    for (const file of files) {
      const check = IF.validateImageFile(file);
      if (!check.ok) { errors.push(check.error); continue; }
      try {
        const { img, url } = await IF.loadImage(file);
        items.push({ id: nextId++, file, img, url, status: "ready", resultBlob: null, resultUrl: null, outMime: file.type });
      } catch (e) {
        errors.push(e.message);
      }
    }
    if (errors.length) showError(errors.join(" "));
    if (items.length) {
      controlsPanel.classList.remove("hidden");
      renderList();
    }
  }

  function renderList() {
    fileListEl.innerHTML = items.map(renderItem).join("");
    items.forEach(it => {
      const dl = document.getElementById(`dl-cmp-${it.id}`);
      const rm = document.getElementById(`rm-cmp-${it.id}`);
      if (dl) dl.addEventListener("click", () => downloadItem(it));
      if (rm) rm.addEventListener("click", () => removeItem(it.id));
    });
  }

  function renderItem(it) {
    const sizeInfo = it.status === "done"
      ? `<span class="badge badge-success">-${it.savingsPct}%</span> ${IF.formatBytes(it.file.size)} → ${IF.formatBytes(it.resultBlob.size)}`
      : it.status === "error"
        ? `<span class="badge badge-error">Failed</span> ${IF.escapeHtml(it.error || "")}`
        : `${IF.formatBytes(it.file.size)} &middot; ready to compress`;
    return `<div class="file-item" data-id="${it.id}">
      <img class="file-thumb" src="${it.url}" alt="">
      <div class="file-meta">
        <div class="name">${IF.escapeHtml(it.file.name)}</div>
        <div class="sub">${sizeInfo}</div>
      </div>
      <div class="file-actions">
        ${it.status === "done" ? `<button id="dl-cmp-${it.id}" class="btn btn-success btn-sm" type="button">Download</button>` : ""}
        <button id="rm-cmp-${it.id}" type="button" aria-label="Remove ${IF.escapeHtml(it.file.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>`;
  }

  function removeItem(id) {
    const it = items.find(x => x.id === id);
    if (it) { URL.revokeObjectURL(it.url); if (it.resultUrl) URL.revokeObjectURL(it.resultUrl); }
    items = items.filter(x => x.id !== id);
    renderList();
    if (!items.length) controlsPanel.classList.add("hidden");
  }

  /** Compress a single item, optionally hunting for a target size via bisection */
  async function compressItem(it) {
    const chosenFormat = formatSelect.value === "same" ? it.file.type : formatSelect.value;
    const outMime = IF.canEncode(chosenFormat) ? chosenFormat : "image/jpeg";
    const canvas = IF.drawToCanvas(it.img, it.img.naturalWidth, it.img.naturalHeight);
    const baseQuality = Number(qualityRange.value) / 100;
    const targetKB = Number(targetSizeInput.value) || 0;

    let blob;
    if (outMime === "image/png") {
      // PNG is lossless — quality slider doesn't apply the same way
      blob = await IF.canvasToBlob(canvas, "image/png");
    } else if (targetKB > 0) {
      blob = await bisectToTarget(canvas, outMime, targetKB * 1024, baseQuality);
    } else {
      blob = await IF.canvasToBlob(canvas, outMime, baseQuality);
    }

    it.resultBlob = blob;
    it.outMime = outMime;
    it.resultUrl = URL.createObjectURL(blob);
    it.savingsPct = Math.max(0, Math.round((1 - blob.size / it.file.size) * 100));
    it.status = "done";
  }

  async function bisectToTarget(canvas, mime, targetBytes, startQuality) {
    let lo = 0.05, hi = 1.0, best = null;
    for (let i = 0; i < 7; i++) {
      const q = i === 0 ? startQuality : (lo + hi) / 2;
      const blob = await IF.canvasToBlob(canvas, mime, q);
      if (!best || Math.abs(blob.size - targetBytes) < Math.abs(best.size - targetBytes)) best = blob;
      if (blob.size > targetBytes) hi = q; else lo = q;
    }
    return best;
  }

  compressBtn.addEventListener("click", async () => {
    if (!items.length) return;
    clearError();
    compressBtn.disabled = true;
    progressTrack.classList.remove("hidden");
    progressFill.style.width = "0%";
    let done = 0;
    for (const it of items) {
      try {
        await compressItem(it);
      } catch (e) {
        it.status = "error";
        it.error = "Compression failed for this image.";
      }
      done++;
      progressFill.style.width = Math.round((done / items.length) * 100) + "%";
      renderList();
      // yield to keep UI responsive on large batches
      await new Promise(r => setTimeout(r, 0));
    }
    compressBtn.disabled = false;
    downloadAllBtn.disabled = !items.some(it => it.status === "done");
    setTimeout(() => progressTrack.classList.add("hidden"), 600);
    fileListEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  function downloadItem(it) {
    const ext = IF.extForMime(it.outMime);
    IF.downloadBlob(it.resultBlob, IF.buildFilename(it.file.name, "compressed", ext));
  }

  downloadAllBtn.addEventListener("click", () => {
    items.filter(it => it.status === "done").forEach((it, i) => {
      setTimeout(() => downloadItem(it), i * 250); // stagger to avoid browser download blocking
    });
  });

  resetBtn.addEventListener("click", () => {
    items.forEach(it => { URL.revokeObjectURL(it.url); if (it.resultUrl) URL.revokeObjectURL(it.resultUrl); });
    items = [];
    fileListEl.innerHTML = "";
    controlsPanel.classList.add("hidden");
    downloadAllBtn.disabled = true;
    clearError();
  });
})();

/* =========================================================================
   TOOL 2 — IMAGE RESIZER
   ========================================================================= */
/* =========================================================================
   ImageForge — Image Resizer
   Resizes JPG/PNG/WebP images locally using the Canvas API.
   ========================================================================= */
(function () {
  "use strict";

  const dropzone = document.getElementById("dropzone_rsz");
  const fileInput = document.getElementById("fileInput_rsz");
  const controlsPanel = document.getElementById("controlsPanel_rsz");
  const fileListEl = document.getElementById("fileList_rsz");
  const errorArea = document.getElementById("errorArea_rsz");
  const presetGrid = document.getElementById("presetGrid_rsz");
  const unitSelect = document.getElementById("unitSelect_rsz");
  const widthInput = document.getElementById("widthInput_rsz");
  const heightInput = document.getElementById("heightInput_rsz");
  const lockAspect = document.getElementById("lockAspect_rsz");
  const resizeBtn = document.getElementById("resizeBtn_rsz");
  const downloadAllBtn = document.getElementById("downloadAllBtn_rsz");
  const resetBtn = document.getElementById("resetBtn_rsz");
  const progressTrack = document.getElementById("progressTrack_rsz");
  const progressFill = document.getElementById("progressFill_rsz");

  let items = [];
  let nextId = 1;
  let baseAspect = null; // aspect ratio of the first loaded image, used for % / lock calc

  function showError(msg) {
    errorArea.innerHTML = `<div class="alert alert-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg>
      <span>${IF.escapeHtml(msg)}</span></div>`;
  }
  function clearError() { errorArea.innerHTML = ""; }

  IF.wireDropzone(dropzone, fileInput, handleFiles);

  async function handleFiles(files) {
    clearError();
    const errors = [];
    for (const file of files) {
      const check = IF.validateImageFile(file);
      if (!check.ok) { errors.push(check.error); continue; }
      try {
        const { img, url } = await IF.loadImage(file);
        items.push({ id: nextId++, file, img, url, status: "ready", resultBlob: null, resultUrl: null, newW: 0, newH: 0 });
        if (!baseAspect) {
          baseAspect = img.naturalWidth / img.naturalHeight;
          widthInput.value = img.naturalWidth;
          heightInput.value = img.naturalHeight;
        }
      } catch (e) {
        errors.push(e.message);
      }
    }
    if (errors.length) showError(errors.join(" "));
    if (items.length) { controlsPanel.classList.remove("hidden"); renderList(); }
  }

  // ---- Presets ----
  presetGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".preset-btn");
    if (!btn) return;
    presetGrid.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.dataset.custom) { widthInput.focus(); return; }
    unitSelect.value = "px";
    widthInput.value = btn.dataset.w;
    heightInput.value = btn.dataset.h;
  });

  // ---- Aspect lock ----
  widthInput.addEventListener("input", () => {
    if (unitSelect.value === "pct") { heightInput.value = widthInput.value; return; }
    if (lockAspect.checked && baseAspect) {
      heightInput.value = Math.round(Number(widthInput.value) / baseAspect) || "";
    }
  });
  heightInput.addEventListener("input", () => {
    if (unitSelect.value === "pct") { widthInput.value = heightInput.value; return; }
    if (lockAspect.checked && baseAspect) {
      widthInput.value = Math.round(Number(heightInput.value) * baseAspect) || "";
    }
  });
  unitSelect.addEventListener("change", () => {
    if (!items.length) return;
    const first = items[0];
    if (unitSelect.value === "pct") {
      widthInput.value = 100; heightInput.value = 100;
      heightInput.readOnly = true;
      heightInput.title = "Percent mode scales both dimensions together, so this always matches Width.";
    } else {
      widthInput.value = first.img.naturalWidth; heightInput.value = first.img.naturalHeight;
      heightInput.readOnly = false;
      heightInput.removeAttribute("title");
    }
  });

  function renderList() {
    fileListEl.innerHTML = items.map(renderItem).join("");
    items.forEach(it => {
      const dl = document.getElementById(`dl-rsz-${it.id}`);
      const rm = document.getElementById(`rm-rsz-${it.id}`);
      if (dl) dl.addEventListener("click", () => downloadItem(it));
      if (rm) rm.addEventListener("click", () => removeItem(it.id));
    });
  }

  function renderItem(it) {
    const info = it.status === "done"
      ? `<span class="badge badge-success">Resized</span> ${it.img.naturalWidth}&times;${it.img.naturalHeight} → ${it.newW}&times;${it.newH} &middot; ${IF.formatBytes(it.resultBlob.size)}`
      : it.status === "error"
        ? `<span class="badge badge-error">Failed</span> ${IF.escapeHtml(it.error || "")}`
        : `${it.img.naturalWidth}&times;${it.img.naturalHeight} &middot; ${IF.formatBytes(it.file.size)}`;
    return `<div class="file-item" data-id="${it.id}">
      <img class="file-thumb" src="${it.url}" alt="">
      <div class="file-meta">
        <div class="name">${IF.escapeHtml(it.file.name)}</div>
        <div class="sub">${info}</div>
      </div>
      <div class="file-actions">
        ${it.status === "done" ? `<button id="dl-rsz-${it.id}" class="btn btn-success btn-sm" type="button">Download</button>` : ""}
        <button id="rm-rsz-${it.id}" type="button" aria-label="Remove ${IF.escapeHtml(it.file.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>`;
  }

  function removeItem(id) {
    const it = items.find(x => x.id === id);
    if (it) { URL.revokeObjectURL(it.url); if (it.resultUrl) URL.revokeObjectURL(it.resultUrl); }
    items = items.filter(x => x.id !== id);
    renderList();
    if (!items.length) { controlsPanel.classList.add("hidden"); baseAspect = null; }
  }

  function computeTargetSize(it) {
    const unit = unitSelect.value;
    if (unit === "pct") {
      const pct = Math.max(1, Number(widthInput.value) || 100) / 100;
      return { w: it.img.naturalWidth * pct, h: it.img.naturalHeight * pct };
    }
    let w = Number(widthInput.value) || it.img.naturalWidth;
    let h = Number(heightInput.value) || it.img.naturalHeight;
    if (lockAspect.checked) {
      const ratio = it.img.naturalWidth / it.img.naturalHeight;
      h = Math.round(w / ratio);
    }
    return { w, h };
  }

  async function resizeItem(it) {
    const { w, h } = computeTargetSize(it);
    if (w < 1 || h < 1 || w > IF.MAX_DIMENSION || h > IF.MAX_DIMENSION) {
      throw new Error(`Target size ${Math.round(w)}×${Math.round(h)} is out of range.`);
    }
    const canvas = IF.drawToCanvas(it.img, w, h);
    const mime = IF.canEncode(it.file.type) ? it.file.type : "image/png";
    const quality = mime === "image/jpeg" || mime === "image/webp" ? 0.92 : undefined;
    const blob = await IF.canvasToBlob(canvas, mime, quality);
    it.resultBlob = blob;
    it.resultUrl = URL.createObjectURL(blob);
    it.newW = canvas.width;
    it.newH = canvas.height;
    it.status = "done";
  }

  resizeBtn.addEventListener("click", async () => {
    if (!items.length) return;
    clearError();
    resizeBtn.disabled = true;
    progressTrack.classList.remove("hidden");
    progressFill.style.width = "0%";
    let done = 0;
    for (const it of items) {
      try { await resizeItem(it); }
      catch (e) { it.status = "error"; it.error = e.message; }
      done++;
      progressFill.style.width = Math.round((done / items.length) * 100) + "%";
      renderList();
      await new Promise(r => setTimeout(r, 0));
    }
    resizeBtn.disabled = false;
    downloadAllBtn.disabled = !items.some(it => it.status === "done");
    setTimeout(() => progressTrack.classList.add("hidden"), 600);
    fileListEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  function downloadItem(it) {
    const ext = IF.extForMime(it.resultBlob.type);
    IF.downloadBlob(it.resultBlob, IF.buildFilename(it.file.name, `${it.newW}x${it.newH}`, ext));
  }

  downloadAllBtn.addEventListener("click", () => {
    items.filter(it => it.status === "done").forEach((it, i) => setTimeout(() => downloadItem(it), i * 250));
  });

  resetBtn.addEventListener("click", () => {
    items.forEach(it => { URL.revokeObjectURL(it.url); if (it.resultUrl) URL.revokeObjectURL(it.resultUrl); });
    items = [];
    baseAspect = null;
    fileListEl.innerHTML = "";
    controlsPanel.classList.add("hidden");
    downloadAllBtn.disabled = true;
    presetGrid.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    clearError();
  });
})();

/* =========================================================================
   TOOL 3 — IMAGE CONVERTER
   ========================================================================= */
/* =========================================================================
   ImageForge — Image Converter
   Converts between JPG/PNG/WebP/AVIF locally using the Canvas API.
   HEIC input relies entirely on native browser decode support — we never
   claim universal HEIC support, since most browsers cannot decode it.
   ========================================================================= */
(function () {
  "use strict";

  const dropzone = document.getElementById("dropzone_cvt");
  const fileInput = document.getElementById("fileInput_cvt");
  const controlsPanel = document.getElementById("controlsPanel_cvt");
  const fileListEl = document.getElementById("fileList_cvt");
  const errorArea = document.getElementById("errorArea_cvt");
  const heicNotice = document.getElementById("heicNotice_cvt");
  const formatSelect = document.getElementById("formatSelect_cvt");
  const avifOption = document.getElementById("avifOption_cvt");
  const avifHint = document.getElementById("avifHint_cvt");
  const qualityField = document.getElementById("qualityField_cvt");
  const qualityRange = document.getElementById("qualityRange_cvt");
  const qualityValue = document.getElementById("qualityValue_cvt");
  const convertBtn = document.getElementById("convertBtn_cvt");
  const downloadAllBtn = document.getElementById("downloadAllBtn_cvt");
  const resetBtn = document.getElementById("resetBtn_cvt");
  const progressTrack = document.getElementById("progressTrack_cvt");
  const progressFill = document.getElementById("progressFill_cvt");

  let items = [];
  let nextId = 1;

  // ---- Feature-detect AVIF encode support (browser-dependent) ----
  const avifSupported = IF.canEncode("image/avif");
  if (!avifSupported) {
    avifOption.disabled = true;
    avifOption.textContent = "AVIF (not supported in this browser)";
    avifHint.textContent = "Your browser can't export AVIF. Try Chrome or Edge for AVIF output.";
  } else {
    avifHint.textContent = "AVIF output is supported in this browser.";
  }

  qualityRange.addEventListener("input", () => { qualityValue.textContent = qualityRange.value + "%"; });
  formatSelect.addEventListener("change", () => {
    qualityField.style.display = formatSelect.value === "image/png" ? "none" : "";
  });

  function showError(msg) {
    errorArea.innerHTML = `<div class="alert alert-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg>
      <span>${IF.escapeHtml(msg)}</span></div>`;
  }
  function clearError() { errorArea.innerHTML = ""; }

  IF.wireDropzone(dropzone, fileInput, handleFiles);

  async function handleFiles(files) {
    clearError();
    const errors = [];
    let sawHeic = false;
    for (const file of files) {
      if (/heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name)) sawHeic = true;
      const check = IF.validateImageFile(file, { acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/heic", "image/heif"] });
      if (!check.ok) { errors.push(check.error); continue; }
      try {
        const { img, url } = await IF.loadImage(file);
        items.push({ id: nextId++, file, img, url, status: "ready", resultBlob: null, resultUrl: null });
      } catch (e) {
        errors.push(`"${file.name}" could not be decoded by your browser. ${/heic|heif/i.test(file.name) ? "HEIC support depends on your browser." : ""}`);
      }
    }
    heicNotice.style.display = sawHeic ? "flex" : "none";
    if (errors.length) showError(errors.join(" "));
    if (items.length) { controlsPanel.classList.remove("hidden"); renderList(); }
  }

  function renderList() {
    fileListEl.innerHTML = items.map(renderItem).join("");
    items.forEach(it => {
      const dl = document.getElementById(`dl-cvt-${it.id}`);
      const rm = document.getElementById(`rm-cvt-${it.id}`);
      if (dl) dl.addEventListener("click", () => downloadItem(it));
      if (rm) rm.addEventListener("click", () => removeItem(it.id));
    });
  }

  function renderItem(it) {
    const fromLabel = (it.file.type || "unknown").replace("image/", "").toUpperCase();
    const info = it.status === "done"
      ? `<span class="badge badge-success">Converted</span> ${fromLabel} → ${IF.extForMime(it.resultBlob.type).toUpperCase()} &middot; ${IF.formatBytes(it.file.size)} → ${IF.formatBytes(it.resultBlob.size)}`
      : it.status === "error"
        ? `<span class="badge badge-error">Failed</span> ${IF.escapeHtml(it.error || "")}`
        : `${fromLabel} &middot; ${IF.formatBytes(it.file.size)}`;
    return `<div class="file-item" data-id="${it.id}">
      <img class="file-thumb" src="${it.url}" alt="">
      <div class="file-meta">
        <div class="name">${IF.escapeHtml(it.file.name)}</div>
        <div class="sub">${info}</div>
      </div>
      <div class="file-actions">
        ${it.status === "done" ? `<button id="dl-cvt-${it.id}" class="btn btn-success btn-sm" type="button">Download</button>` : ""}
        <button id="rm-cvt-${it.id}" type="button" aria-label="Remove ${IF.escapeHtml(it.file.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>`;
  }

  function removeItem(id) {
    const it = items.find(x => x.id === id);
    if (it) { URL.revokeObjectURL(it.url); if (it.resultUrl) URL.revokeObjectURL(it.resultUrl); }
    items = items.filter(x => x.id !== id);
    renderList();
    if (!items.length) controlsPanel.classList.add("hidden");
  }

  async function convertItem(it) {
    const target = formatSelect.value;
    if (target === "image/avif" && !avifSupported) {
      throw new Error("AVIF export isn't supported in this browser.");
    }
    const canvas = IF.drawToCanvas(it.img, it.img.naturalWidth, it.img.naturalHeight);
    const quality = target === "image/png" ? undefined : Number(qualityRange.value) / 100;
    const blob = await IF.canvasToBlob(canvas, target, quality);
    if (!blob.type || blob.type !== target) {
      // Some browsers silently fall back to PNG if the mime isn't supported for encode
      if (target === "image/avif") throw new Error("This browser could not encode AVIF output.");
    }
    it.resultBlob = blob;
    it.resultUrl = URL.createObjectURL(blob);
    it.status = "done";
  }

  convertBtn.addEventListener("click", async () => {
    if (!items.length) return;
    clearError();
    convertBtn.disabled = true;
    progressTrack.classList.remove("hidden");
    progressFill.style.width = "0%";
    let done = 0;
    for (const it of items) {
      try { await convertItem(it); }
      catch (e) { it.status = "error"; it.error = e.message; }
      done++;
      progressFill.style.width = Math.round((done / items.length) * 100) + "%";
      renderList();
      await new Promise(r => setTimeout(r, 0));
    }
    convertBtn.disabled = false;
    downloadAllBtn.disabled = !items.some(it => it.status === "done");
    setTimeout(() => progressTrack.classList.add("hidden"), 600);
    fileListEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  function downloadItem(it) {
    const ext = IF.extForMime(it.resultBlob.type);
    IF.downloadBlob(it.resultBlob, IF.buildFilename(it.file.name, "converted", ext));
  }

  downloadAllBtn.addEventListener("click", () => {
    items.filter(it => it.status === "done").forEach((it, i) => setTimeout(() => downloadItem(it), i * 250));
  });

  resetBtn.addEventListener("click", () => {
    items.forEach(it => { URL.revokeObjectURL(it.url); if (it.resultUrl) URL.revokeObjectURL(it.resultUrl); });
    items = [];
    fileListEl.innerHTML = "";
    controlsPanel.classList.add("hidden");
    downloadAllBtn.disabled = true;
    heicNotice.style.display = "none";
    clearError();
  });
})();

/* =========================================================================
   TOOL 4 — BACKGROUND REMOVER
   (dynamically imports @imgly/background-removal from a CDN only when the
   user clicks Remove Background — never on page load, never the photo itself)
   ========================================================================= */
/* =========================================================================
   ImageForge — Background Remover
   Real, local, in-browser background removal using the open-source
   @imgly/background-removal library (WASM + ONNX Runtime Web). The
   segmentation model is fetched from a public CDN the first time this
   tool is used and then cached by the browser — the user's PHOTO is
   never sent anywhere. The library module itself is only imported when
   the user actually clicks "Remove Background", so nothing downloads
   just from opening this page.
   ========================================================================= */
(function () {
  "use strict";

  const dropzone = document.getElementById("dropzone_bgr");
  const fileInput = document.getElementById("fileInput_bgr");
  const controlsPanel = document.getElementById("controlsPanel_bgr");
  const errorArea = document.getElementById("errorArea_bgr");
  const bgSwatches = document.getElementById("bgSwatches_bgr");
  const customColorInput = document.getElementById("customColorInput_bgr");
  const removeBtn = document.getElementById("removeBtn_bgr");
  const downloadBtn = document.getElementById("downloadBtn_bgr");
  const resetBtn = document.getElementById("resetBtn_bgr");
  const progressWrap = document.getElementById("progressWrap_bgr");
  const progressLabel = document.getElementById("progressLabel_bgr");
  const progressFill = document.getElementById("progressFill_bgr");
  const compareWrap = document.getElementById("compareWrap_bgr");
  const beforeImg = document.getElementById("beforeImg_bgr");
  const afterImg = document.getElementById("afterImg_bgr");

  let currentFile = null;
  let currentImg = null;
  let originalUrl = null;
  let cutoutBlob = null;   // transparent-background PNG straight from the model
  let cutoutUrl = null;
  let selectedBg = "transparent";
  let bgLib = null; // cached dynamic import of the removal library

  function showError(msg) {
    errorArea.innerHTML = `<div class="alert alert-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg>
      <span>${IF.escapeHtml(msg)}</span></div>`;
  }
  function clearError() { errorArea.innerHTML = ""; }

  IF.wireDropzone(dropzone, fileInput, (files) => handleFile(files[0]));

  async function handleFile(file) {
    clearError();
    const check = IF.validateImageFile(file);
    if (!check.ok) { showError(check.error); return; }
    try {
      const { img, url } = await IF.loadImage(file);
      currentFile = file;
      currentImg = img;
      originalUrl = url;
      cutoutBlob = null;
      if (cutoutUrl) { URL.revokeObjectURL(cutoutUrl); cutoutUrl = null; }
      beforeImg.src = url;
      afterImg.src = url;
      compareWrap.classList.add("hidden");
      downloadBtn.disabled = true;
      controlsPanel.classList.remove("hidden");
    } catch (e) {
      showError(e.message);
    }
  }

  // ---- Background swatch selection ----
  bgSwatches.addEventListener("click", (e) => {
    const swatch = e.target.closest(".swatch");
    if (!swatch) return;
    bgSwatches.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
    swatch.classList.add("active");
    selectedBg = swatch.dataset.bg || "custom";
    if (cutoutBlob) applyBackgroundChoice();
  });
  customColorInput.addEventListener("input", () => {
    bgSwatches.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
    customColorInput.parentElement.classList.add("active");
    selectedBg = "custom";
    if (cutoutBlob) applyBackgroundChoice();
  });

  async function loadLibrary() {
    if (bgLib) return bgLib;
    progressWrap.classList.remove("hidden");
    progressLabel.textContent = "Downloading local AI model (first use only)…";
    progressFill.style.width = "10%";
    // Loaded lazily from a public CDN — only the model/library, never the user's photo.
    const mod = await import("https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/dist/index.mjs");
    bgLib = mod;
    return mod;
  }

  removeBtn.addEventListener("click", async () => {
    if (!currentFile) return;
    clearError();
    removeBtn.disabled = true;
    progressWrap.classList.remove("hidden");
    progressLabel.textContent = "Preparing…";
    progressFill.style.width = "5%";
    try {
      const lib = await loadLibrary();
      // The library exposes its main function as the default export (per its own
      // docs: `import removeBackground from "@imgly/background-removal"`), with a
      // same-named export also provided on some builds — support both safely.
      const removeBackground = lib.default || lib.removeBackground;
      if (typeof removeBackground !== "function") {
        throw new Error("The background removal library loaded but didn't expose a usable function.");
      }
      progressLabel.textContent = "Removing background locally…";
      progressFill.style.width = "40%";
      const blob = await removeBackground(currentFile, {
        progress: (key, current, total) => {
          if (total) {
            const pct = Math.min(95, 40 + Math.round((current / total) * 55));
            progressFill.style.width = pct + "%";
            progressLabel.textContent = key && key.includes("fetch")
              ? "Downloading model…" : "Removing background locally…";
          }
        }
      });
      cutoutBlob = blob;
      progressFill.style.width = "100%";
      progressLabel.textContent = "Done";
      await applyBackgroundChoice();
      compareWrap.classList.remove("hidden");
      downloadBtn.disabled = false;
      compareWrap.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {
      showError("Background removal failed to run in this browser. This can happen on very old browsers or with restricted network access to the model CDN. " + (e && e.message ? e.message : ""));
    } finally {
      removeBtn.disabled = false;
      setTimeout(() => progressWrap.classList.add("hidden"), 800);
    }
  });

  /** Composite the transparent cutout over the chosen background (or leave transparent) */
  async function applyBackgroundChoice() {
    if (!cutoutBlob) return;
    const cutoutImg = await blobToImage(cutoutBlob);
    const canvas = document.createElement("canvas");
    canvas.width = cutoutImg.naturalWidth;
    canvas.height = cutoutImg.naturalHeight;
    const ctx = canvas.getContext("2d");

    if (selectedBg === "white") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    else if (selectedBg === "black") { ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    else if (selectedBg === "custom") { ctx.fillStyle = customColorInput.value; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    // "transparent" → leave canvas empty before drawing

    ctx.drawImage(cutoutImg, 0, 0);
    const finalBlob = await IF.canvasToBlob(canvas, "image/png");
    if (cutoutUrl) URL.revokeObjectURL(cutoutUrl);
    cutoutUrl = URL.createObjectURL(finalBlob);
    afterImg.src = cutoutUrl;
    downloadBtn.dataset.ready = "1";
    downloadBtn._blob = finalBlob;
  }

  function blobToImage(blob) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  downloadBtn.addEventListener("click", () => {
    if (!downloadBtn._blob || !currentFile) return;
    IF.downloadBlob(downloadBtn._blob, IF.buildFilename(currentFile.name, "no-bg", "png"));
  });

  resetBtn.addEventListener("click", () => {
    currentFile = null;
    currentImg = null;
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (cutoutUrl) URL.revokeObjectURL(cutoutUrl);
    cutoutBlob = null;
    cutoutUrl = null;
    controlsPanel.classList.add("hidden");
    compareWrap.classList.add("hidden");
    downloadBtn.disabled = true;
    clearError();
  });
})();

/* =========================================================================
   TOOL 5 — IMAGE CROPPER
   ========================================================================= */
/* =========================================================================
   ImageForge — Image Cropper
   Interactive drag/resize crop box, rotate/flip transforms and a live
   preview, all rendered locally with the Canvas API.
   ========================================================================= */
(function () {
  "use strict";

  const dropzone = document.getElementById("dropzone_crp");
  const fileInput = document.getElementById("fileInput_crp");
  const errorArea = document.getElementById("errorArea_crp");
  const editorPanel = document.getElementById("editorPanel_crp");
  const stage = document.getElementById("stage_crp");
  const stageImg = document.getElementById("stageImg_crp");
  const cropBox = document.getElementById("cropBox_crp");
  const ratioGrid = document.getElementById("ratioGrid_crp");
  const rotateLeftBtn = document.getElementById("rotateLeftBtn_crp");
  const rotateRightBtn = document.getElementById("rotateRightBtn_crp");
  const flipHBtn = document.getElementById("flipHBtn_crp");
  const flipVBtn = document.getElementById("flipVBtn_crp");
  const resetTransformBtn = document.getElementById("resetTransformBtn_crp");
  const outFormat = document.getElementById("outFormat_crp");
  const cropSizeLabel = document.getElementById("cropSizeLabel_crp");
  const cropBtn = document.getElementById("cropBtn_crp");
  const downloadBtn = document.getElementById("downloadBtn_crp");
  const resetBtn = document.getElementById("resetBtn_crp");
  const previewWrap = document.getElementById("previewWrap_crp");
  const previewCanvas = document.getElementById("previewCanvas_crp");

  let currentFile = null;
  let baseImg = null;          // original loaded HTMLImageElement
  let workCanvas = null;       // canvas holding current rotated/flipped full-res pixels
  let rotationDeg = 0;         // 0/90/180/270
  let flipH = false, flipV = false;
  let aspectRatio = null;      // number or null (free)
  let box = { x: 40, y: 40, w: 200, h: 150 }; // in displayed CSS px, relative to stage
  let resultBlob = null;

  function showError(msg) {
    errorArea.innerHTML = `<div class="alert alert-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01" stroke-linecap="round"/></svg>
      <span>${IF.escapeHtml(msg)}</span></div>`;
  }
  function clearError() { errorArea.innerHTML = ""; }

  IF.wireDropzone(dropzone, fileInput, (files) => handleFile(files[0]));

  async function handleFile(file) {
    clearError();
    const check = IF.validateImageFile(file);
    if (!check.ok) { showError(check.error); return; }
    try {
      const { img } = await IF.loadImage(file);
      currentFile = file;
      baseImg = img;
      rotationDeg = 0; flipH = false; flipV = false;
      rebuildWorkCanvas();
      editorPanel.classList.remove("hidden");
      previewWrap.classList.add("hidden");
      downloadBtn.classList.add("hidden");
      requestAnimationFrame(() => { resetCropBoxToDefault(); updatePreview(); });
    } catch (e) {
      showError(e.message);
    }
  }

  /** Rebuild the full-resolution working canvas from baseImg + current rotation/flip */
  function rebuildWorkCanvas() {
    const swap = rotationDeg % 180 !== 0;
    const w = swap ? baseImg.naturalHeight : baseImg.naturalWidth;
    const h = swap ? baseImg.naturalWidth : baseImg.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate((rotationDeg * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(baseImg, -baseImg.naturalWidth / 2, -baseImg.naturalHeight / 2);
    ctx.restore();
    workCanvas = canvas;
    stageImg.src = canvas.toDataURL("image/png");
  }

  function scaleFactor() {
    // natural px per displayed css px
    return workCanvas.width / stage.clientWidth;
  }

  function resetCropBoxToDefault() {
    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    let w = stageW * 0.7, h = stageH * 0.7;
    if (aspectRatio) { h = w / aspectRatio; if (h > stageH * 0.9) { h = stageH * 0.9; w = h * aspectRatio; } }
    box = { x: (stageW - w) / 2, y: (stageH - h) / 2, w, h };
    renderBox();
  }

  function renderBox() {
    cropBox.style.left = box.x + "px";
    cropBox.style.top = box.y + "px";
    cropBox.style.width = box.w + "px";
    cropBox.style.height = box.h + "px";
    const sf = scaleFactor();
    const natW = Math.round(box.w * sf);
    const natH = Math.round(box.h * sf);
    cropSizeLabel.textContent = `${natW} × ${natH} px`;
  }

  function clampBox() {
    const stageW = stage.clientWidth, stageH = stage.clientHeight;
    box.w = Math.max(20, Math.min(box.w, stageW));
    box.h = Math.max(20, Math.min(box.h, stageH));
    box.x = Math.max(0, Math.min(box.x, stageW - box.w));
    box.y = Math.max(0, Math.min(box.y, stageH - box.h));
  }

  // ---- Ratio presets ----
  ratioGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".preset-btn");
    if (!btn) return;
    ratioGrid.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const r = btn.dataset.ratio;
    if (r === "free") { aspectRatio = null; }
    else {
      const [a, b] = r.split(":").map(Number);
      aspectRatio = a / b;
    }
    resetCropBoxToDefault();
    updatePreview();
  });

  // ---- Transform buttons ----
  rotateLeftBtn.addEventListener("click", () => { rotationDeg = (rotationDeg + 270) % 360; rebuildWorkCanvas(); requestAnimationFrame(() => { resetCropBoxToDefault(); updatePreview(); }); });
  rotateRightBtn.addEventListener("click", () => { rotationDeg = (rotationDeg + 90) % 360; rebuildWorkCanvas(); requestAnimationFrame(() => { resetCropBoxToDefault(); updatePreview(); }); });
  flipHBtn.addEventListener("click", () => { flipH = !flipH; rebuildWorkCanvas(); requestAnimationFrame(updatePreview); });
  flipVBtn.addEventListener("click", () => { flipV = !flipV; rebuildWorkCanvas(); requestAnimationFrame(updatePreview); });
  resetTransformBtn.addEventListener("click", () => {
    rotationDeg = 0; flipH = false; flipV = false; aspectRatio = null;
    ratioGrid.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    rebuildWorkCanvas();
    requestAnimationFrame(() => { resetCropBoxToDefault(); updatePreview(); });
  });

  // ---- Drag / resize crop box (pointer events cover mouse + touch) ----
  let dragMode = null; // "move" | "nw" | "ne" | "sw" | "se"
  let dragStart = null;

  cropBox.addEventListener("pointerdown", (e) => {
    const handle = e.target.closest(".crop-handle");
    dragMode = handle ? handle.dataset.handle : "move";
    dragStart = { px: e.clientX, py: e.clientY, box: { ...box } };
    cropBox.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  cropBox.addEventListener("pointermove", (e) => {
    if (!dragMode) return;
    const dx = e.clientX - dragStart.px;
    const dy = e.clientY - dragStart.py;
    const start = dragStart.box;

    if (dragMode === "move") {
      box.x = start.x + dx;
      box.y = start.y + dy;
    } else {
      let { x, y, w, h } = start;
      if (dragMode === "se") { w = start.w + dx; h = aspectRatio ? w / aspectRatio : start.h + dy; }
      if (dragMode === "sw") { w = start.w - dx; x = start.x + dx; h = aspectRatio ? w / aspectRatio : start.h + dy; }
      if (dragMode === "ne") { w = start.w + dx; h = aspectRatio ? w / aspectRatio : start.h - dy; y = aspectRatio ? start.y + (start.h - h) : start.y + dy; }
      if (dragMode === "nw") { w = start.w - dx; h = aspectRatio ? w / aspectRatio : start.h - dy; x = start.x + dx; y = aspectRatio ? start.y + (start.h - h) : start.y + dy; }
      box = { x, y, w: Math.max(20, w), h: Math.max(20, h) };
    }
    clampBox();
    renderBox();
    updatePreview();
  });

  function endDrag(e) { dragMode = null; try { cropBox.releasePointerCapture(e.pointerId); } catch (err) {} }
  cropBox.addEventListener("pointerup", endDrag);
  cropBox.addEventListener("pointercancel", endDrag);

  // ---- Keyboard support: arrow keys move the crop box, Shift+arrow resizes it.
  // Without this, the crop box could only be operated with a mouse, touch, or pen.
  cropBox.addEventListener("keydown", (e) => {
    const ARROWS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!ARROWS.includes(e.key)) return;
    e.preventDefault();
    const step = e.shiftKey ? 20 : 10;
    if (e.key === "ArrowLeft") { e.shiftKey ? (box.w = Math.max(20, box.w - step)) : (box.x -= step); }
    if (e.key === "ArrowRight") { e.shiftKey ? (box.w += step) : (box.x += step); }
    if (e.key === "ArrowUp") { e.shiftKey ? (box.h = Math.max(20, box.h - step)) : (box.y -= step); }
    if (e.key === "ArrowDown") { e.shiftKey ? (box.h += step) : (box.y += step); }
    if (e.shiftKey && aspectRatio) { box.h = box.w / aspectRatio; }
    clampBox();
    renderBox();
    updatePreview();
  });

  window.addEventListener("resize", IF.debounce(() => { if (workCanvas) { resetCropBoxToDefault(); updatePreview(); } }, 200));

  // ---- Live preview ----
  const updatePreview = IF.debounce(() => {
    if (!workCanvas) return;
    const sf = scaleFactor();
    const sx = box.x * sf, sy = box.y * sf, sw = box.w * sf, sh = box.h * sf;
    const size = 320;
    previewCanvas.width = size;
    previewCanvas.height = Math.round(size * (sh / sw));
    const ctx = previewCanvas.getContext("2d");
    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    ctx.drawImage(workCanvas, sx, sy, sw, sh, 0, 0, previewCanvas.width, previewCanvas.height);
    previewWrap.classList.remove("hidden");
  }, 60);

  // ---- Crop / export ----
  cropBtn.addEventListener("click", async () => {
    if (!workCanvas) return;
    clearError();
    try {
      const sf = scaleFactor();
      const sx = Math.round(box.x * sf), sy = Math.round(box.y * sf);
      const sw = Math.round(box.w * sf), sh = Math.round(box.h * sf);
      const out = document.createElement("canvas");
      out.width = sw; out.height = sh;
      out.getContext("2d").drawImage(workCanvas, sx, sy, sw, sh, 0, 0, sw, sh);
      const mime = outFormat.value;
      const quality = mime === "image/png" ? undefined : 0.92;
      resultBlob = await IF.canvasToBlob(out, mime, quality);
      downloadBtn.classList.remove("hidden");
      downloadBtn.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {
      showError("Cropping failed. Please try a different image or crop area.");
    }
  });

  downloadBtn.addEventListener("click", () => {
    if (!resultBlob || !currentFile) return;
    const ext = IF.extForMime(resultBlob.type);
    IF.downloadBlob(resultBlob, IF.buildFilename(currentFile.name, "cropped", ext));
  });

  resetBtn.addEventListener("click", () => {
    currentFile = null; baseImg = null; workCanvas = null; resultBlob = null;
    rotationDeg = 0; flipH = false; flipV = false; aspectRatio = null;
    ratioGrid.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    editorPanel.classList.add("hidden");
    previewWrap.classList.add("hidden");
    downloadBtn.classList.add("hidden");
    clearError();
  });
})();
