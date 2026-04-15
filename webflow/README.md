# Webflow Injection Kit — joolomee

Self-contained HTML/CSS/JS snippets that port the **joolomee** portfolio's
signature identity (crystal logo, coral brand, custom cursor, marquee, quiz,
i18n) into any Webflow site. Everything here is framework-free — no React,
no Tailwind, no build step. Paste and go.

---

## 1. Global install (do this once)

### 1a. Site Settings → Custom Code → Head Code
Paste the contents of [`head-code.html`](./head-code.html).

What it adds:
- Inter font (Google Fonts)
- Brand color tokens (`--jlm-coral`, `--jlm-bg`, …) as CSS vars
- Core keyframes (`marquee`, `float`, `spin-slow`, `pulse-ring`, `blink-cursor`)
- Utility classes (`.jlm-gradient-text`, `.jlm-card-glow`, `.jlm-grid-dots`,
  `.jlm-spotlight`, `.jlm-glass`, `.jlm-glow-coral`, `.jlm-noise`)
- Custom scrollbar + selection color
- `body { cursor: none }` on fine pointer devices

### 1b. Site Settings → Custom Code → Footer Code
Paste the contents of [`body-code.html`](./body-code.html).

What it adds:
- **Custom cursor** (coral dot + spring-delayed ring, auto-disables on touch)
- **Spotlight** — mouse-tracked radial gradient on any `.jlm-spotlight` section
- **Language switcher** — persists in `localStorage` under `joolomee-lang`,
  supports `pt | en | es | fr | de`, swaps any `[data-i18n="key.path"]` text
- **Noise texture** overlay (fixed, pointer-events none)

---

## 2. Per-section embeds

Drop an **Embed** element from the Add panel and paste one of the files below.
Each embed is fully isolated: scoped class prefix `jlm-…`, inline `<style>`,
inline `<script>`. You can use several on the same page without collisions.

| File | What it is |
| --- | --- |
| [`embeds/crystal-logo.html`](./embeds/crystal-logo.html) | Animated faceted crystal SVG. Size + color configurable via data-attrs. |
| [`embeds/marquee.html`](./embeds/marquee.html) | Dual-row infinite coral marquee (`JOOLOMEE · REMEMBER ME · DESIGN WITH SOUL`). |
| [`embeds/hero.html`](./embeds/hero.html) | Hero block: badge, 3-line gradient headline, CTAs, floating crystal. |
| [`embeds/quiz.html`](./embeds/quiz.html) | 3-question service quiz with 4 result archetypes. i18n-aware. |
| [`embeds/contact-form.html`](./embeds/contact-form.html) | Coral contact form — posts to `data-endpoint`, fallback mailto. |

### Using data-i18n in Webflow elements

Any text element you want translated: add a **Custom Attribute** in Designer:
- Name: `data-i18n`
- Value: dotted key path, e.g. `nav.letsTalk` or `hero.subtitle`

Keys available: see `TRANSLATIONS` at top of `body-code.html`.

---

## 3. Brand tokens (reference)

```
--jlm-bg:        #0a0a0a
--jlm-surface:   #111111
--jlm-border:    #1e1e1e
--jlm-fg:        #f5f5f5
--jlm-muted:     #8a8a8a
--jlm-coral:     #E8787A   ← primary accent
--jlm-coral-lt:  #F2A5A7
--jlm-coral-dk:  #C45A5C
```

---

## 4. Testing locally

Open any of the `embeds/*.html` files directly in a browser — each is a
complete document that renders standalone. The head/body code files assume
they're injected into a page that already has a `<head>` and `<body>`.
