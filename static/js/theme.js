/**
 * ============================================================================
 * THEME CONFIGURATION
 * ============================================================================
 * The single file to edit to re-title or re-skin this template for a new
 * paper/project: title, fonts, font sizes, layout, and the light/dark
 * colour palette. Loaded before everything else (see index.html's <head>)
 * and applied via applyTheme() below, which maps these values onto the CSS
 * custom properties declared under "THEME TOKENS" in index.html's <style>
 * block -- every rule in that stylesheet reads colours/fonts/sizes only
 * from those variables, so changing a value here re-skins the whole page.
 *
 * applyTheme(mode) is called twice: once from the pre-paint THEME BOOTSTRAP
 * script in index.html's <head> (so colours are correct before first
 * paint, same as the light/dark attribute itself), and again from the
 * theme-toggle handler in static/js/main.js (so toggling actually
 * recolours the page -- without this second call the values set at boot
 * would never change again, since an inline style wins over the
 * stylesheet's own [data-theme="dark"] rule regardless of the attribute).
 *
 * The static :root / [data-theme="dark"] blocks in index.html's <style>
 * block are left untouched as fallback defaults for the case where
 * JavaScript is disabled (already a heavily degraded experience for this
 * page -- see the <noscript> banner). THEME below is the real source of
 * truth whenever JS runs.
 * ============================================================================
 */

const THEME = {
  // Paper title. `full` is used for the hero <h1> and the browser tab
  // title; `short` is the nav-bar wordmark -- keep it brief. The SEO/
  // OpenGraph/Twitter/Highwire <meta> tags in index.html's <head>, and the
  // BibTeX title in citation.bib, must stay static HTML/data (crawlers and
  // BibTeX don't run JS) -- update those by hand to match if you change
  // this. See the top-of-file comment in index.html.
  title: {
    full: "Building Legal Reward Models for Grounding and Abstention",
    short: "LegalRewardBench",
  },

  fonts: {
    serif: 'ui-serif, Georgia, "Iowan Old Style", "Times New Roman", serif',
    sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace',
  },

  fontSizes: {
    heroTitle: "clamp(1.7rem, 3.4vw, 2.5rem)", // the <h1>
    body: "17px",
    bodyMobile: "16px", // <= 480px
  },

  layout: {
    contentWidth: "900px",
    // Shared width for body paragraphs and their figures, so a figure
    // never reads wider than the text around it (both are centred at
    // this width inside the wider contentWidth page wrap).
    proseWidth: "700px",
    radius: "10px",
    radiusPill: "999px",
  },

  // Light/dark colour palettes. `primary`/`secondary`/`accent` are each a
  // {dark, mid, light, text} tone quad used throughout the page (callouts,
  // stats, taxonomy rows, links): "dark" = borders/large bold text, "mid" =
  // fill tone, "light" = background tint, "text" = a darkened/lightened
  // variant used for small body text so it clears WCAG AA (4.5:1) contrast.
  // `primary.text` also colours links and focus rings. Defaults below are
  // this paper's own figure palette (Legal_Reward_Modelling/arxiv_release.tex,
  // "COLOUR PALETTE"): primary = PrimaryGold #DEB73F, secondary =
  // SteelBlue #6F95C4, accent = BrownOrange #D08A52. Background/surface/
  // text/border/rule neutrals are carried over unchanged from the "When
  // Rubrics Fail" template for cross-site consistency; every "dark"/"text"
  // tone below was derived from the base hex by darkening (light mode) or
  // desaturating (dark mode) until it cleared WCAG AA against that
  // background (verified with a contrast-ratio script, not eyeballed).
  colors: {
    light: {
      background: "#F5F0E6",
      surface: "#FBF7EF",
      text: "#2A2521",
      textMuted: "#6E6759",
      border: "#DED4C0",
      rule: "#C9BC9E",
      linkHover: "#57450F",
      primary: { dark: "#A5831C", mid: "#DEB73F", light: "#FAF3E0", text: "#826816" },
      secondary: { dark: "#648DC0", mid: "#6F95C4", light: "#E8EEF6", text: "#436EA4" },
      accent: { dark: "#C87736", mid: "#D08A52", light: "#F7ECE3", text: "#9C5D2A" },
    },
    dark: {
      background: "#1E1A16",
      surface: "#28231E",
      text: "#EDE6D8",
      textMuted: "#A79C8A",
      border: "#3A332B",
      rule: "#453D33",
      linkHover: "#E5C565",
      // Dark mode reuses the paper's brighter "mid" tones for both borders
      // and dark, and swaps the pastel "light" tints for desaturated dark
      // equivalents rather than the literal light-theme hex values, which
      // would be jarring.
      primary: { dark: "#DEB73F", mid: "#DEB73F", light: "#584922", text: "#C8AC55" },
      secondary: { dark: "#6F95C4", mid: "#6F95C4", light: "#363F4A", text: "#7B96B8" },
      accent: { dark: "#D08A52", mid: "#D08A52", light: "#533C28", text: "#BE8C64" },
    },
  },
};

// Applies THEME's fonts/layout/colours for `mode` ("light" or "dark") as
// inline CSS custom properties on <html> -- these map 1:1 onto the
// variable names declared under "THEME TOKENS" in index.html's <style>
// block. See the file header above for when this is called.
function applyTheme(mode) {
  const root = document.documentElement.style;
  const c = THEME.colors[mode] || THEME.colors.light;
  const set = function (name, value) {
    root.setProperty(name, value);
  };

  set("--color-bg", c.background);
  set("--color-surface", c.surface);
  set("--color-text", c.text);
  set("--color-text-muted", c.textMuted);
  set("--color-border", c.border);
  set("--color-rule", c.rule);
  set("--color-link", c.primary.text);
  set("--color-link-hover", c.linkHover);
  set("--color-focus", c.primary.text);

  set("--green-dark", c.primary.dark);
  set("--green-mid", c.primary.mid);
  set("--green-light", c.primary.light);
  set("--green-text", c.primary.text);
  set("--purple-dark", c.secondary.dark);
  set("--purple-mid", c.secondary.mid);
  set("--purple-light", c.secondary.light);
  set("--purple-text", c.secondary.text);
  set("--orange-dark", c.accent.dark);
  set("--orange-mid", c.accent.mid);
  set("--orange-light", c.accent.light);
  set("--orange-text", c.accent.text);

  set("--font-serif", THEME.fonts.serif);
  set("--font-sans", THEME.fonts.sans);
  set("--font-mono", THEME.fonts.mono);
  set("--font-size-hero-title", THEME.fontSizes.heroTitle);
  set("--font-size-body", THEME.fontSizes.body);
  set("--font-size-body-mobile", THEME.fontSizes.bodyMobile);

  set("--content-width", THEME.layout.contentWidth);
  set("--prose-width", THEME.layout.proseWidth);
  set("--radius", THEME.layout.radius);
  set("--radius-pill", THEME.layout.radiusPill);
}
