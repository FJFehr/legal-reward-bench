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
**TL;DR.** Reward models for retrieval-augmented legal QA are usually optimised for fluency and helpfulness, not for whether an answer is actually grounded in the retrieved evidence — or for recognising when the evidence is insufficient and the model should simply abstain. We introduce **LegalRewardBench (LRB)**, a 1,220-pair legal contextual reward-modelling benchmark built from Victorian Criminal Charge Book QA, and benchmark 15 open-weight reward models (0.5B–9B) on it alongside ContextualJudgeBench (CJB). Contextual DPO refinement improves grounded legal evaluation by up to **+25.6pp** over baseline reward models, and models trained mainly on Victorian criminal law transfer to external US legal benchmarks, improving Housing Statute QA by **+16.2pp**.

<!-- slot: problem-title -->
## From Legal QA to Preference Pairs

<!-- slot: problem-caption -->
Legal preference-pair construction pipeline. Starting from Legal RAG Bench triples (gold passage, question, answer), we build six retrieved-context variants to control answerability and retrieval noise, generate candidate responses with four open-weight LLMs, label them along four contextual dimensions with a judge models, then apply a hierarchical preference rule to produce contextual preference pairs for reward-model training and evaluation.

<!-- slot: problem-image-light -->
![Animated pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/legal-reward-pipeline.gif)

<!-- slot: problem-image-dark -->
![Animated pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/legal-reward-pipeline-dark.gif)

<!-- slot: takeaways-title -->
## Key Takeaways

<!-- slot: takeaway-1 -->
**Grounded Legal Reward Models.** Legal AI needs retrieval-augmented grounding *and* reward models that actually reward it — so we built LegalRewardBench (LRB) and the pipeline used to create it.

<!-- slot: takeaway-2 -->
**Sensitive to Reward-Hacking.** Naive preference data lets reward models exploit response-length shortcuts instead of learning to ground; length-balanced augmentation closes that gap and lets contextual DPO refinement deliver its full value.

<!-- slot: takeaway-3 -->
**Cross-Jurisdiction Generalisation.** Reward models trained mainly on Victorian criminal law still improve grounded evaluation on external US legal benchmarks, gaining up to +16.2pp on Housing Statute QA.


<!-- section: method -->

<!-- slot: method-title -->
## Methodology

<!-- slot: method-intro -->

Grounded legal generation needs two things working together: retrieval-augmented generation (RAG) to supply the statutes, case law, and other evidence a response should be based on, and a reward model that can actually tell whether a response uses that evidence faithfully — or should abstain when the evidence is insufficient. Existing reward models are trained on general-purpose preference data that rewards helpfulness and fluency, not grounding, so they transfer poorly to this setting. We address this by introducing **LegalRewardBench (LRB)**: a 1,220-pair contextual reward-modelling benchmark converting legal QA triples into structured preference pairs that capture refusal, faithfulness, correctness, and completeness, and benchmark 15 open-weight reward models (0.5B–9B) on it. The pipeline below has four stages: context construction, answer generation, response annotation, and preference-pair construction.

<!-- slot: method-validation-title -->

### Source Dataset

<!-- slot: method-closing -->

LegalRewardBench is built on **Legal RAG Bench**, which contains 100 expert-written questions over a corpus of 4,876 passages from the Victorian Criminal Charge Book. Each question is paired with a supporting passage and a long-form reference answer, and questions were designed to be lexically dissimilar from their supporting evidence — so the task tests semantic retrieval and grounded reasoning rather than keyword matching. LRB's 1,220 preference pairs split into 940 training, 124 development, and 156 test examples.

<!-- slot: method-pipeline-title -->
### Pipeline

<!-- slot: method-image-light -->

![Pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/figure-pipeline.png)

<!-- slot: method-image-dark -->

![Pipeline diagram: a source dataset of gold passage, question, and answer triples flows into context construction (answerable contexts with gold passage plus distractors, or unanswerable contexts with only distractors), then answer generation by four LLMs (DeepSeek-3.2, Qwen-3, Mistral-3, GLM-5), then response annotation by a GPT-OSS-120B judge scoring answered/faithful/correct/complete, and finally preference-pair construction producing a preferred and a rejected response.](static/images/figure-pipeline-dark.png)

<!-- slot: method-figcaption -->

For each source triple, six retrieved-context variants (three answerable, three unanswerable, varying the distractor source across random sampling, BM25, and Nomic semantic retrieval) test grounded answering under retrieval noise and abstention under insufficient evidence. Four open-weight LLMs (Qwen 3 32B, DeepSeek V3.2, GLM-5, Ministral 3 14B) generate candidate responses; GPT-OSS-120B labels each along answer behaviour, faithfulness, correctness, and completeness; a hierarchical rule then converts labelled responses into preference pairs.

<!-- slot: method-pipeline-body -->

Rather than manually corrupting a reference answer to build the rejected response, we let failure modes emerge from the model panel itself: a candidate may abstain, answer correctly, omit a material qualification, introduce an unsupported claim, or reach a conclusion contradicted by the retrieved passages. Within each (context, question) cell, every pair of labelled responses is compared under a hierarchy — answer behaviour, then faithfulness, then correctness, then completeness for answerable contexts (with the reverse priority, abstention preferred, for unanswerable ones). Applied to 100 questions and six retrieval variants, this yields 3,600 unordered comparisons, of which 1,220 produce a strict preference and become the benchmark.

<!-- slot: taxonomy-title -->
### Preference Pair Examples

<!-- slot: taxonomy-intro -->

Representative examples of the four failure types the benchmark targets — refusal, faithfulness, correctness, and completeness — each showing a preferred response alongside the rejected response it's compared against.

<!-- section: results -->

<!-- slot: results-title -->
## Results

<!-- slot: finding-2-title -->
### Sensitive to Reward-Hacking

<!-- slot: finding-2-body -->
Evaluating 14 open-weight instruction-tuned models plus specialist reward models on ContextualJudgeBench, overall performance remains only marginally above random chance, with no baseline consistently outperforming the others across grounding dimensions. Most models show a strong preference for shorter responses — high conciseness accuracy, but substantially weaker completeness and refusal behaviour. Among the baselines, Ministral-8B achieves the strongest balance across faithfulness, completeness, and refusal despite its modest scale. Contextual DPO refinement on top of it improves grounded evaluation across dimensions, particularly refusal behaviour under insufficient retrieval conditions — DPO adds real value when the underlying preference signal is sound.

<!-- slot: finding-2b-caption -->
LegalRewardBench, per-dimension accuracy for Ministral-8B. DPO refinement on CJB alone (blue) transfers strongly to LRB; naively combining CJB and LRB (pink) is limited by length artefacts in the legal preference data; length-balanced augmentation (gold) substantially improves performance.

<!-- slot: finding-2b-image -->
![Radar chart comparing four Ministral-8B training conditions on LegalRewardBench (overall accuracy, refusal answerable/unanswerable, completeness, correctness, faithfulness): Baseline (grey), CJB-only DPO (blue), CJB+LRB (pink), and CJB+LRB with length-balanced augmentation (gold). The length-balanced-augmentation condition forms the largest polygon on every dimension, especially refusal.](static/images/figure-lrb-spider.png)
width: 75%

<!-- slot: finding-2b-body -->
But the underlying signal isn't always sound: simply combining CJB with LRB's original pairs doesn't reliably help further, despite training on more data. Inspection revealed systematic response-length asymmetries in refusal pairs — abstentions are much shorter than substantive answers — and under sequence log-probability scoring, a reward model can **reward-hack** this shortcut, learning to prefer shorter responses rather than genuinely grounded ones. A length-balanced augmentation strategy that rewrites refusal and negative responses to better match preferred-response length closes this gap: combined with CJB, it takes Ministral-8B to **84.9%** overall accuracy, a **+25.6pp** improvement over baseline, confirming that DPO's gains were being masked by an exploitable artefact rather than a ceiling on what contextual alignment can do.

<!-- slot: finding-3-title -->
### Cross-Jurisdiction Generalisation

<!-- slot: finding-3-body -->
We test whether reward models trained primarily on Victorian criminal law generalise to two US legal reasoning benchmarks from the Stanford RegLab suite: **Bar Exam QA** (Multistate Bar Examination questions over US caselaw) and **Housing Statute QA** (yes/no questions over US state housing statutes) — both substantially different from the training distribution. Despite this domain shift, DPO-refined Ministral-8B improves on both: **+16.2pp** on Housing Statute QA (54.2% → 70.4%), comparable to its in-domain CJB gains, and a smaller but positive +4.3pp on Bar Exam QA. Gains don't scale uniformly with model size — refined Ministral-8B substantially outperforms larger Qwen3.5 models on Housing Statute QA — indicating that contextual alignment drives grounded evaluation more than parameter count alone.

<!-- section: beyond -->

<!-- slot: implications-title -->
## Implications

<!-- slot: implications-list -->

**Groundedness looks like a transferable behaviour, not just memorised legal knowledge.** Contextual preference optimisation improves reliability under noisy and insufficient retrieval across both general (CJB) and legal (LRB) settings, and the cross-jurisdiction results suggest this holds even outside the training domain — relevant wherever reliable abstention matters more than a confident but unsupported answer.

**Evaluation design can obscure real progress.** Response-length asymmetries in refusal data distorted sequence-log-probability scoring badly enough to mask genuine gains in grounded behaviour; length-balanced augmentation recovered them. Some of the field's apparent limitations in legal reward modelling may be artefacts of benchmark construction rather than an absence of learnable signal.

**Trustworthy legal AI may not require frontier-scale systems.** The strongest results here come from targeted contextual alignment of relatively small open-weight models (0.5B–9B), not larger general-purpose ones — suggesting a practical, reproducible path for grounded legal evaluation without frontier-scale compute.

<!-- section: cite -->

<!-- slot: cite-title -->
## Citation (BibTeX)

<!-- slot: bibtex-note -->
An earlier version of this work was presented at the AI for Law Workshop @ ICML 2026

<!-- slot: footer-note -->
Pipeline figures animated with [gifit2me](https://github.com/FJFehr/gifit2me). [Page source](https://github.com/FJFehr/legal-reward-bench).

