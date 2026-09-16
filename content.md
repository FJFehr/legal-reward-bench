<!--
============================================================================
PAGE CONTENT — edit this file to change the page's prose or figures.

This is the file to edit for day-to-day wording changes. No build step,
no compiling by hand: edit this file, save, refresh the browser (served
over http(s), not file://; see README.md "How to preview locally"). The
actual "compiler" is static/js/content.js, which fetches this file and
converts it to HTML in the browser at page load.

This file is plain, standard Markdown throughout — headings, **bold**,
*italic*, `code`, [link text](url) links, numbered lists, and ![alt](src)
images all mean exactly what they mean in any Markdown file (links open
in a new tab). The only non-prose bit is an invisible HTML comment before
each block (see the real ones starting at "slot:" below), telling
content.js which element on the page that block belongs to. HTML comments
are ordinary, valid Markdown — any renderer (including GitHub's own
preview) just hides them, so this file reads as normal prose, not a
custom format. Don't rename a slot's name unless you also update the
matching `data-md="name"` / `data-md-img="name"` attribute in index.html.
Don't delete a slot comment; if you want a section empty, leave a single
space after it.

A heading's level (#, ##, ###) doesn't matter for slots that land in an
existing <h1>/<h2>/<h3> on the page — the target element already sets the
real heading level, so content.js just strips the "#"s and keeps the
text. Feel free to still write "##" etc. for readability; it's optional.

An image slot (one ending in "-image", e.g. "finding-2b-image") can add up
to two further optional lines, in either order:
  "position: left" / "right" / "center" — "center" (the default, today's
    layout for most figures) keeps it centred at full width; "left"/
    "right" floats it with body text wrapping alongside.
  "width: NN%" — shrinks the figure to that fraction of the page's usual
    prose width, still centred (unset = full prose width).

Any slot's prose can also colour a short label to match a series in a
nearby chart, e.g. a figure caption naming its legend: {{#RRGGBB|label}}
renders label in that exact hex colour (see finding-2b-caption for a
worked example against static/images/colours.txt). Use it sparingly --
it's for matching a plot's own colours, not general text styling.

ORDER: the page follows this file. There is a second kind of marker,
written like a slot marker but saying "section:" instead, before each
top-level section. Move one of those markers — together with everything
under it, up to the next "section:" marker — to a new place in this file,
save, refresh, and that part of the page moves too. The hero
(title/authors/links) always stays first and the footer always stays
last; everything between them is ordered by this file. Each "section:"
name matches a `data-section-group="name"` in index.html, and one name
can cover several <section> tags (Overview covers three, which is why its
TL;DR, figure and Key Takeaways always travel together).

Each takeaway-N (in Key Takeaways) is a link to the matching finding-N-title
(in Results) -- index.html wraps it in <a href="#finding-N-title">-- so it
should use the same name as that finding: copy its text here, minus the
leading "N. " (a literal "1. " etc. at the very start of a block is read as
an ordered-list marker by content.js, not plain text).

Every heading and paragraph must sit under its own marker; "slot:" and
"section:" comments are the only ones content.js recognises. Loose text
between two markers becomes part of whichever block it falls inside -- a
stray "### Something" line, for instance, renders as the literal text
"### Something" in the previous block rather than as a heading. Likewise,
a numbered list only renders as a real list if EVERY line in its block is
a "1. "-style item; one extra paragraph in the same block turns the whole
thing back into plain paragraphs.

Structured/tabular or logic-tied content does NOT live here:
  - Author names, links, affiliation, correspondence -> authors.yaml
  - arXiv / Code / Dataset links                      -> links.yaml
  - BibTeX citation                                   -> citation.bib
  - Preference-pair example table                     -> taxonomy.md
  - Title, fonts, colours, sizes                       -> static/js/theme.js
    (the <h1> paper title and nav wordmark are rendered from THEME.title,
    but are also duplicated in <title>/OpenGraph/Highwire meta tags and
    citation.bib, which must remain static — update those by hand too.)

Source: this content is drawn from Legal_Reward_Modelling/arxiv_release.tex
(the ICML 2026 camera-ready). Numbers and claims below are transcribed or
closely paraphrased from that file — check it before editing findings or
figures.

Note on the Method section's three subsections: on the page they appear in
the order Source Dataset, Pipeline, Preference Pair Examples -- but their
slot names (method-validation-*, method-pipeline-*, taxonomy-*) don't
follow that order, and don't match their visible headings either. Both are
carried over unchanged from the template's own internal wiring (see
index.html's <h3 data-md="..."> elements, which is what actually decides
page order for slots within one section -- content.md's own top-to-bottom
order here does NOT drive layout the way it does for whole sections via
"section:" markers). Move an element in index.html, not this file, to
reorder these three again.

Note on Results: only takeaways 2 and 3 ("Sensitive to Reward-Hacking",
"Cross-Jurisdiction Generalisation") have a matching finding here.
Takeaway 1 ("Grounded Legal Reward Models") links up to Methodology
(#method-title) instead, since that point IS the methodology -- see
index.html's Key Takeaways section for the takeaway-1 anchor's href.
============================================================================
-->

<!-- section: overview -->

<!-- slot: tldr -->
**TL;DR.** Legal AI should answer from the evidence it is given and abstain when that evidence is insufficient. We introduce **LEGALREWARDBENCH** and a framework for turning legal question answering data into contextual preference pairs. We find that **preference-data construction matters**, with length balancing improving grounded legal evaluation and evidence that **contextual grounding can transfer across legal jurisdictions**.

<!-- slot: problem-title -->
## From Legal QA to Preference Pairs

<!-- slot: problem-caption -->
**Legal preference-pair construction framework.** Starting from Legal RAG Bench triples (gold passage, question, answer), we construct retrieved-context variants to control answerability and retrieval noise, generate candidate responses with open-weight LLMs, label them along four contextual dimensions with judge models, and apply a preference rule to produce contextual preference pairs for reward-model training and evaluation.

<!-- slot: problem-image-light -->
![Animated pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/legal-reward-pipeline.gif)

<!-- slot: problem-image-dark -->
![Animated pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/legal-reward-pipeline-dark.gif)

<!-- slot: takeaways-title -->
## Takeaways

<!-- slot: takeaway-1 -->
**A Framework and Benchmark for Grounded Legal Reward Modelling** We introduce LEGALREWARDBENCH alongside a general framework for transforming existing legal question answering datasets into contextual preference data under noisy and insufficient retrieval.

<!-- slot: takeaway-2 -->
**Preference-Data Construction Matters.** Naturally generated preference pairs can contain systematic response-length asymmetries. Length-balanced augmentation reduces these artefacts and improves grounded legal evaluation.

<!-- slot: takeaway-3 -->
**Cross-Jurisdiction Generalisation.** Models refined primarily on Victorian criminal law improve grounded evaluation on two external US legal benchmarks, providing evidence that contextual grounding can transfer beyond the source jurisdiction.


<!-- section: method -->

<!-- slot: method-title -->
## A Framework for Grounded Legal Reward Modelling

<!-- slot: method-intro -->

We introduce **LEGALREWARDBENCH (LRB)** alongside a general framework for transforming existing legal question answering datasets into contextual preference data. The framework constructs noisy and insufficient retrieval contexts, generates candidate responses, evaluates their grounding, and converts them into preference pairs for reward-model training and evaluation.

<!-- slot: method-validation-title -->

### LEGALREWARDBENCH

<!-- slot: method-closing -->

LEGALREWARDBENCH is constructed from Legal RAG Bench, using 100 expert-written questions over 4,876 passages from the Victorian Criminal Charge Book. The resulting 1,220 contextual preference pairs cover answerable and unanswerable retrieval settings and are split into 940 training, 124 development, and 156 test examples

<!-- slot: method-pipeline-title -->
### From Legal QA to Preference Pairs

<!-- slot: method-image-light -->

![Pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/figure-pipeline.png)

<!-- slot: method-image-dark -->

![Pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/figure-pipeline-dark.png)

<!-- slot: method-figcaption -->

**Legal preference-pair construction framework.** Starting from Legal RAG Bench triples (gold passage, question, answer), we construct retrieved contexts, generate candidate responses with open-weight LLMs, and label them along four contextual dimensions using GPT-OSS-120B. We validate preference construction with three additional LLM judges, reaching **94.9% agreement on preference direction**, before constructing contextual preference pairs for training and evaluation.

<!-- slot: method-pipeline-body -->

Rather than manually corrupting reference answers, we let failure modes emerge naturally from the model panel: responses may abstain, omit important qualifications, introduce unsupported claims, or reach incorrect conclusions. For answerable contexts, responses are compared by **answer behaviour, faithfulness, correctness, and completeness**. For unanswerable contexts, **abstention is preferred over an attempted answer**. Across 100 questions and six retrieval variants, this produces 1,220 strict preference pairs.

<!-- slot: taxonomy-title -->
### Preference Pair Examples

<!-- slot: taxonomy-intro -->

Representative examples of the four preference dimensions, showing a **preferred** and **rejected** response for refusal, faithfulness, correctness, and completeness.
<!-- section: results -->

<!-- slot: finding-2-title -->
### Preference-Data Construction Matters

<!-- slot: finding-2-body -->
Simply adding legal preference data does not consistently improve grounded evaluation. Naturally generated preference pairs can contain systematic response-length asymmetries, which can confound the contextual preference the model is intended to learn. **Length-balanced augmentation** reduces these asymmetries and improves grounded legal evaluation, with the strongest results coming from combining length-balanced legal and general contextual preference data.

<!-- slot: finding-2b-caption -->
**LEGALREWARDBENCH performance for Ministral-8B.** DPO refinement on CJB improves performance on LRB, while combining CJB with the original LRB preference data is limited by response-length asymmetries. **Length-balanced augmentation produces the strongest performance across evaluation dimensions.** Legend: {{#888888|Baseline}}, {{#4472C4|CJB-only}}, {{#B4A7D6|CJB+LRB}}, {{#D4A017|CJB+LRB+Length Augmentation}}.

<!-- slot: finding-2b-image-light -->
![Radar chart comparing four Ministral-8B training conditions on LegalRewardBench (overall accuracy, refusal answerable/unanswerable, completeness, correctness, faithfulness): Baseline (grey), CJB-only DPO (blue), CJB+LRB (light purple), and CJB+LRB with length-balanced augmentation (gold). The length-balanced-augmentation condition forms the largest or joint-largest polygon on most dimensions, while the baseline collapses sharply on faithfulness.](static/images/spider_lrbv2_n4.svg)
width: 75%

<!-- slot: finding-2b-image-dark -->
![Radar chart comparing four Ministral-8B training conditions on LegalRewardBench (overall accuracy, refusal answerable/unanswerable, completeness, correctness, faithfulness): Baseline (grey), CJB-only DPO (blue), CJB+LRB (light purple), and CJB+LRB with length-balanced augmentation (gold). The length-balanced-augmentation condition forms the largest or joint-largest polygon on most dimensions, while the baseline collapses sharply on faithfulness.](static/images/spider_lrbv2_n4_dark.svg)
width: 75%

<!-- slot: finding-2b-body -->
The key issue is not simply how much preference data is used, but how that data is constructed. Naturally generated pairs can contain response-length asymmetries: abstentions are often shorter than substantive answers, while complete responses may be longer than incomplete ones. Under sequence scoring, these differences can "reward hack" or confound the intended preference. **Length-balanced augmentation reduces this confound, helping the evaluation better reflect grounding rather than response length.**

<!-- slot: finding-3-title -->
### Cross-Jurisdiction Generalisation

<!-- slot: finding-3-body -->
We test whether contextual grounding learned primarily from Victorian criminal law transfers to two external US legal benchmarks: **Housing Statute QA**, grounded in US state housing statutes, and **Bar Exam QA**, grounded in US caselaw. Transfer is positive but uneven. For Ministral-8B, contextual refinement improves Housing Statute QA from **54.2% to 70.4%**, while Bar Exam QA improves from **56.4% to 60.7%**. The stronger result on the statute-grounded task, alongside more limited gains on Bar Exam QA and across other models, provides evidence that **contextual grounding can transfer beyond the source jurisdiction**, while suggesting that it may transfer more readily than jurisdiction-specific legal reasoning.

<!-- section: beyond -->

<!-- slot: implications-title -->
## Implications

<!-- slot: implications-list -->

**Contextual grounding appears to be a transferable behaviour.** Improvements across general and legal settings, together with cross-jurisd iction results, provide evidence that contextual grounding can extend beyond the source domain. The stronger transfer on statute-grounded tasks suggests that grounding may transfer more readily than jurisdiction-specific legal reasoning.

**Preference-data construction is part of the modelling problem.** Naturally generated preference pairs can contain structural artefacts, such as response-length asymmetries, that confound the behaviours reward models are intended to learn and evaluate. Preference-data construction and reward scoring therefore need to be considered alongside model training itself.

**Legal-expert validation is an important next step.** Agreement across multiple LLM judges provides evidence that preference construction is robust across annotators, but it does not replace direct validation by legal experts. Future work should bring lawyers into the validation loop to assess a representative subset of responses and preferences.

**Better reward evaluation is not yet better generation.** Our experiments test whether reward models prefer grounded responses over plausible but unsupported alternatives, rather than whether the refined models themselves generate better legal answers. The next step is to test whether these improvements translate into grounded generation in end-to-end legal RAG systems.

<!-- section: cite -->

<!-- slot: cite-title -->
## Citation (BibTeX)

<!-- slot: bibtex-note -->
An earlier version of this work was presented at the [ICML 2026 AI4Law Workshop](https://icml.cc/virtual/2026/80644). For further details, visit the [ICML page](https://icml.cc/virtual/2026/80644).

<!-- slot: footer-note -->
Build your own pretty project pages 💅 [**paper-page**](https://github.com/FJFehr/paper-page) and gorgeous GIFs 🎬 [**gifit2me**](https://github.com/FJFehr/gifit2me).

