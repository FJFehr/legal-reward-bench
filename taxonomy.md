<!--
============================================================================
TABLE CONTENT

A standard GitHub-Flavored-Markdown table: a header row, a "---" separator
row, then one row per line. Any renderer (GitHub's own preview included)
displays this as a normal table. static/js/tables.js is the generic engine
that reads a file like this one and turns it into a styled <table> on the
page -- see that file's own header comment for how to point a table
anywhere on the page at a markdown file of its own; nothing in the engine
is specific to any one table's content.

Inline formatting inside a cell: **bold**, *italic*, ~~strikethrough~~,
`code` -- the same subset content.md uses. A literal "|" inside a cell
must be escaped as "\|" so it isn't read as a column break.

Content below is transcribed from the paper's own Table 1 ("Legal
preference pairs", Legal_Reward_Modelling/arxiv_release.tex), in the same
order. These are representative examples of the four failure types the
benchmark's hierarchical preference rule targets -- not the taxonomy's
full row set (this benchmark's failure types are a fixed set of four
dimensions, not an enumerated taxonomy the way "When Rubrics Fail"'s
13-row clinical error taxonomy was, so this table is shorter by design).
============================================================================
-->

| Failure Type | Question | Preferred Response | Rejected Response |
| --- | --- | --- | --- |
| **Refusal** | What sentence was imposed on the accused? | "The provided context is insufficient to answer this question." | "The accused was sentenced to five years imprisonment." |
| **Faithfulness** | Which Act introduced cyberstalking offences? | "The Crimes (Stalking) Act 2003 introduced cyberstalking offences." | "The Crimes Amendment Act 2001 introduced cyberstalking offences." |
| **Correctness** | Does Victoria protect against double jeopardy? | "Yes. Victoria protects against double jeopardy." | "No. Victoria does not recognise double jeopardy protections." |
| **Completeness** | Must jurors be excused after seeing pre-trial publicity? | "No. Judges can usually address prejudice through directions to the jury." | "No." |
