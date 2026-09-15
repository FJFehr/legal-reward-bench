# Legal Reward Bench — project page

A single-page academic project site for *"Building Legal Reward Models for
Grounding and Abstention"* (Franzone, Noël, Wang, Torr, Fehr — University of
Oxford / Devoteam / OXAI), ported from the
[When Rubrics Fail](https://github.com/FJFehr/when-rubrics-fail) project
page template.

Plain HTML/CSS/vanilla JS, no build step, deployable as-is on GitHub Pages.
Built as a reusable template: `index.html` is the layout/styling shell, and
everything you'd actually want to edit — prose, figures, authors, links,
citation, table rows — lives in separate content files that get loaded
into it at page load. No compiling: edit a content file, save, refresh.

## Status

Live at **https://fjfehr.github.io/legal-reward-bench/**, deployed via
GitHub Pages from this repo's `main` branch (root), first pushed
2026-09-10. All the structural/visual decisions from the porting process
are resolved: colour palette uses the paper's own figure palette
(gold/steel-blue/brown-orange, see `static/js/theme.js`); the Code button
deliberately points at `github.com/oxai/legal-reward-bench` — different
from this repo's own git remote (`FJFehr/legal-reward-bench`), a
confirmed divergence between "where the site is hosted" and "where the
code is presented as living," not an oversight; the Method section keeps
a table of the paper's failure-type example pairs (Refusal / Faithfulness
/ Correctness / Completeness); site title is the paper's own ("Building
Legal Reward Models for Grounding and Abstention", short form
"LegalRewardBench"). `static/images/og-image.png` (1200×630 social-card
preview) is generated: title, authors, and the pipeline diagram, centred,
on the site's own palette.

The paper is on arXiv now (**[2609.14739](https://arxiv.org/abs/2609.14739)**,
submitted 2026-09-13) — that's the primary citation (`citation.bib`,
`links.yaml`'s `arxiv` link, `index.html`'s `citation_pdf_url`/
`citation_arxiv_id`/`citation_publication_date` are all wired to it).
`Legal_Reward_Modelling/paper.pdf` (the PMLR/ICML camera-ready) stays
committed for reference but isn't cited from — deliberate, not an
oversight. Only a DOI remains genuinely open; search `index.html` for
`TODO` if one gets assigned later (e.g. via the ICML proceedings or a
Zenodo archive).

## File structure

```
index.html                  Layout, CSS (theme tokens + styling), static
                             SEO / OpenGraph / Twitter / Google Scholar
                             (Highwire) meta tags, and empty containers
                             marked data-md="slot-name" / data-md-img=
                             "slot-name" that content.md gets loaded into.
content.md                  ALL of the page's prose (TL;DR, findings,
                             method, results, etc.) and each figure's
                             image path/alt text/placement. EDIT THIS for
                             wording or figure changes.
authors.yaml                 Author names + links, affiliation, and the
                             corresponding-author placeholder. EDIT THIS
                             for author changes.
links.yaml                   arXiv / Code / Dataset links and the OG
                             image path. EDIT THIS for link changes.
citation.bib                 The BibTeX citation, as a real .bib file.
                             EDIT THIS for citation changes.
static/js/theme.js           Title, fonts, font sizes, layout, and the
                             light/dark colour palette. EDIT THIS to
                             re-title or re-skin the page.
taxonomy.md                  A generic Markdown table, rendered wherever
                             index.html points a `data-md-table` at it
                             (currently the Method section's table).
                             Holds the paper's failure-type example pairs
                             (Refusal / Faithfulness / Correctness /
                             Completeness).
static/js/content.js        Fetches content.md, does the (small, custom)
                             Markdown-to-HTML conversion, and fills in
                             every data-md / data-md-img element. Template
                             logic — shouldn't need editing for a content
                             update.
static/js/tables.js          Generic engine: fetches any Markdown table
                             file referenced by a `data-md-table="..."`
                             attribute (taxonomy.md today) and renders it
                             as a styled <table>. Not specific to any one
                             table — see "How to add a table" below.
                             Template logic.
static/js/yaml-lite.js       Parses authors.yaml / links.yaml (a small,
                             restricted YAML subset — see below). Template
                             logic.
static/js/main.js           Fetches authors.yaml / links.yaml / citation.bib
                             and renders them (plus the title from theme.js)
                             into the page; theme toggle; smooth-scroll nav
                             with scroll-spy; scroll progress bar; copy-to-
                             clipboard for BibTeX. Template logic.
static/images/               figure-cjb-spider.png, figure-lrb-spider.png
                             — exported from Legal_Reward_Modelling/figures/,
                             copied as-is, already in the paper's own
                             palette (opaque, same on both themes). Plus
                             two theme-swapped pairs (light/dark, toggled
                             via the .theme-only-light/.theme-only-dark
                             pattern also used for the OxAI logo):
                             legal-reward-pipeline(-dark).gif, the animated
                             Overview pull figure, and figure-pipeline(-dark).png,
                             a static render of the same diagram used as the
                             Methodology Pipeline figure -- rendered directly
                             from the source SVG via gifit2me's own
                             `--preview --preview-at <ms>` flag rather than
                             extracted from the GIF, which looked visibly
                             dithered from the GIF's 256-colour palette.
                             Both transparent-canvas, so ink colour (not a
                             painted background) is what changes between
                             themes. Both generated by the gifit2me CLI
                             (~/Projects/gifit2me) from a diagrams.net SVG
                             export; see that tool's own README for
                             re-rendering. Plus og-image.png (1200×630),
                             the social-card preview -- rendered via
                             headless Chrome from a one-off HTML/CSS layout
                             (not kept in the repo; see "How to replace
                             figures" below to regenerate it).
static/logos/                oxford.svg, oxai_logo_final(.png/_black.png),
                             oxai_logo_text_black.png, github.svg,
                             huggingface.png, arxiv.svg — carried over
                             unchanged from the template since this paper
                             shares the same Oxford/OxAI affiliation. See
                             static/logos/README.md for provenance.
Legal_Reward_Modelling/       The paper's LaTeX source (arxiv_release.tex),
                             the compiled paper.pdf, and figures/ — included
                             for reference and as the source of truth for
                             content and figure re-exports. Not part of the
                             rendered page itself.
```

The engine (`index.html`'s structure/CSS and every `static/js/*.js` file)
is what stays fixed and reusable for a different paper — reusing this
template means editing `content.md`/`authors.yaml`/`links.yaml`/
`citation.bib`/`taxonomy.md` (content) and `static/js/theme.js` (style),
never the engine files.

## How to edit the page's text

Edit **`content.md`**. It's a series of blocks, each preceded by an
invisible `<!-- slot: name -->` marker:

```
<!-- slot: tldr -->
**TL;DR.** TODO — one-paragraph summary ...
```

Each block fills one spot on the page — the file's own header comment
explains the convention and lists what lives where instead (authors,
resource links, BibTeX, table rows — see below). content.md is otherwise
plain, standard Markdown: headings, `**bold**`, `*italic*`, `` `code` ``,
`[link text](url)` links (open in a new tab), numbered/bulleted lists, and
`![alt](src)` images all mean exactly what they mean in any Markdown file.

**Figures** are edited in the same file. A block ending in `-image` (e.g.
`<!-- slot: finding-2b-image -->`) holds a standard `![alt](src)` Markdown
image instead of prose — point it at a file under `static/images/` (drop
the new image there first) and update the alt text to describe it. Add an
up to two further optional lines, in either order: `position: left` /
`right` / `center`, to choose where the figure sits (`center`, the
default, keeps it centred at full width; `left`/`right` floats it with
body text wrapping alongside, falling back to centred below ~600px where
there's no room to wrap); and `width: NN%`, to shrink the figure to that
fraction of the page's usual prose width, still centred (unset = full
prose width — e.g. the failure-type table's figures are full width, but
`finding-2b-image` uses `width: 50%` to sit smaller since it's a single
compact radar chart next to a full paragraph of text).

Don't rename a `<!-- slot: name -->` unless you also rename the matching
`data-md="slot-name"` (or `data-md-img="slot-name"`) attribute in
`index.html` — that's how `static/js/content.js` knows which element on the
page each block belongs to.

## How to reorder the page's sections

`content.md` also decides the order the sections appear in. A second kind
of marker, `<!-- section: name -->`, sits before each top-level section.
To move a section, cut its `<!-- section: ... -->` marker **plus
everything under it** (up to the next `<!-- section: ... -->` marker) and
paste it somewhere else in the file. Save, refresh, and the page follows —
no other file to touch. The hero (title/authors/resource links) is always
first and the footer is always last; everything between them is ordered by
`content.md`. See `content.md`'s own header comment for the full mechanics
(including how one `section:` name can cover several `<section>` tags).

## How to edit metadata

**Authors, affiliation, correspondence** — edit `authors.yaml`. Each
author entry has a `url` field; leave it `null` until you have a real
personal/Scholar link (the page renders unlinked authors as plain text
rather than fabricate a destination).

**Resource links, OG image** — edit `links.yaml`. Each resource link
(`arxiv`, `code`, `dataset`) renders as a working button when set. `code`
and `dataset` show a disabled "coming soon" button when `null`; `arxiv`
shows only its logo (no caption), disabled, when `null`.

**Page description (search snippets, link previews)** — edit
`links.yaml`'s `description` field. Like `ogImage` just above it in that
file, this is a reference copy, not a live source: social-card scrapers
(Slack, Twitter/X, LinkedIn, Facebook) and most search engines fetch the
raw page HTML without running JavaScript, so the actual, effective text
lives as static HTML in three places in `index.html`'s `<head>` —
`meta name="description"`, `og:description`, `twitter:description` — and
has to be copied there by hand after editing `links.yaml`. Unlike the
paper title (which is at least live-rendered into the page's visible
`<h1>` from `static/js/theme.js`), this description has no on-page
rendering anywhere, so there's no way to make one edit apply everywhere
without breaking what these tags are for.

**Citation (BibTeX)** — edit `citation.bib`, a real, standalone `.bib`
file. It's fetched as plain text and dropped straight into the page's
citation block — no parsing, so anything valid there renders as-is.
Now a real arXiv entry (`eprint`/`archivePrefix`/`primaryClass`/`url` for
2609.14739) rather than a placeholder. The note shown just above the
citation block (`content.md`'s `bibtex-note` slot) mentions that an
earlier version was presented at the AI for Law Workshop @ ICML 2026.

`authors.yaml` and `links.yaml` are parsed by `static/js/yaml-lite.js`, a
small hand-rolled parser supporting a **restricted YAML subset** (not full
YAML): 2-space indentation per level; `#` outside quotes starts a comment;
`key: value` (the separator is a colon followed by a space, so a bare
colon inside a value, e.g. a URL, is safe); scalars are `null`/`~`/empty →
null, `true`/`false` → boolean, quoted or bare text → string; a `key:`
with no inline value starts a nested map or a `- ` list on the following
more-indented lines. No flow style (`[a, b]`), no multiline block scalars
(`|`/`>`), no anchors/aliases. Match the existing files' style and you
won't hit these limits.

**Table content** — edit `taxonomy.md`, a standard Markdown table (see
"How to add a table" below). Add, remove, or reorder rows/columns freely;
the page picks up whatever columns are there.

## How to add a table

Any table on the page is rendered by the generic `static/js/tables.js` from
a plain Markdown file, the same way `content.js` renders `content.md`. To
add a new table anywhere:

1. Write a standard GitHub-Flavored-Markdown table in its own `.md` file
   (a header row, a `---` separator row, then one row per line). Supported
   cell formatting: `**bold**`, `*italic*`, `~~strikethrough~~`, `` `code` ``
   — escape a literal `|` inside a cell as `\|`.
2. In `index.html`, add an empty `<table data-md-table="your-file.md"></table>`
   wherever you want it (wrap it in `<div class="table-scroll">...</div>`
   too, for horizontal-scroll on narrow screens).
3. That's it — `tables.js` fetches the file, builds the `<thead>`/`<tbody>`,
   and applies the page's table styling automatically. No JavaScript to
   write, no column count or structure to declare anywhere.

**SEO and citation meta tags** — these live directly in `index.html`'s
`<head>`, not in content.md or the data files, because citation indexers
(Google Scholar) and most social-card scrapers don't execute JavaScript.
Every open TODO is marked with an HTML comment — search `index.html` for
`TODO` to find them all. The `<h1>` paper title and the nav wordmark are
rendered by `main.js` from `static/js/theme.js` (`THEME.title`) — but are
*also* duplicated in the meta tags above and in `citation.bib`'s `title`
field, for the same "crawlers/BibTeX don't run JS" reason, so those still
need updating by hand.

**Title, fonts, sizes, colour palette (light/dark)** — edit
`static/js/theme.js`, the one file to change to re-title or re-skin this
template. It holds `title.full`/`.short`, `fonts.serif`/`.sans`/`.mono`,
`fontSizes.heroTitle`/`.body`/`.bodyMobile`, `layout.*`, and
`colors.light`/`.dark` — each with `background`/`surface`/`text`/etc. and
three highlight triads, `primary`/`secondary`/`accent`, each a `{dark, mid,
light, text}` tone quad: dark = borders/large text, mid = fill tone,
light = background tint, `text` = a WCAG-AA-safe variant for small body
text. Uses the palette already defined in
`Legal_Reward_Modelling/arxiv_release.tex`: primary = gold `#DEB73F`,
secondary = steel blue `#6F95C4`, accent = brown-orange `#D08A52` (the
`--green-`/`--purple-`/`--orange-` custom-property *names* in index.html
are carried over unchanged from the template, but every literal value is
this paper's own). Every `dark`/`text` tone was derived from those base
hex values by darkening (light mode) or desaturating (dark mode) until it
cleared WCAG AA against the background, verified with a contrast-ratio
script rather than eyeballed. `applyTheme()` in that same file maps these onto the CSS
custom properties declared under `THEME TOKENS` in `index.html`'s `<style>`
block — those literal values are left in place only as a fallback for the
(already heavily degraded) no-JS case; `theme.js` is what actually re-skins
the page.

## How to replace figures

Prefer editing `content.md` (see above) — it points each `<img>` at its
file and holds the alt text, so most figure swaps need no HTML changes.

Source figures for this paper live in `Legal_Reward_Modelling/figures/`:
a methodology pipeline diagram (`legal_reward_modelling-Methodology_v6.pdf`)
and two spider plots (`spider_cjb_mean (1).png`, `spider_lrbv2.png`). For a
PDF source: `pdftoppm -png -r 400 <file>.pdf <out>` then downscale to
~1800px wide; drop the result in `static/images/` and update the matching
`src:`/`alt:` lines in `content.md`.

`static/images/og-image.png` is a generated preview (title, short name,
authors, Oxford/OXAI logos, on the site's own light-theme palette), 1200×630,
for social card previews. To regenerate after a title/author/palette
change: write a standalone HTML file (inline `<style>`, no external
assets beyond `static/logos/*` — see any current commit's version of this
file, or rebuild from the values in `static/js/theme.js` and
`authors.yaml`) sized to exactly `1200x630`, then screenshot it:

```bash
google-chrome --headless=new --disable-gpu \
  --screenshot=static/images/og-image.png \
  --window-size=1200,630 \
  "file://$(pwd)/og-image-src.html"
```

(Any Chromium-based browser's `--headless` mode works the same way.)
Delete the source HTML afterwards -- it's a one-off render input, not
something the page loads.

## How to preview locally

No build step — but `content.md`, `authors.yaml`, `links.yaml`,
`citation.bib`, and `taxonomy.md` are all loaded via `fetch()`, which
browsers block on the `file://` scheme, so open the page over `http://`,
not by double-clicking `index.html`:

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static file server works equally well (`npx serve`, etc.).

## How to deploy via GitHub Pages

Already done for this repo (see "Status" above) — Pages is enabled,
serving from `main` at the root. For reference, or to redeploy elsewhere
(a fork, an org transfer, etc.):

1. Push the repository to GitHub.
2. In the repo's **Settings → Pages**, set **Source** to "Deploy from a
   branch", pick the branch (e.g. `main`) and the root (`/`) folder. (Or,
   equivalently: `gh api -X POST repos/<owner>/<repo>/pages -f
   "source[branch]=main" -f "source[path]=/"`.)
3. GitHub Pages serves `index.html` at
   `https://<user-or-org>.github.io/<repo>/` (or a custom domain).
4. If the URL changed, update the canonical / `og:url` /
   `og:image` / `citation_abstract_html_url` values in `index.html`'s
   `<head>` to match.
