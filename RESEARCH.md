# Research: how to teach Greek roots and ideas to a busy team

Gathered 2026-10-30. Sources were checked through search results or by fetching the page, but not every paper was read in full. Where the evidence is weak, this file says so.

## What the evidence says

| Finding | Strength | Source |
|---|---|---|
| Practice tests (retrieval) and spacing reviews out over time are the two highest-value study methods. Rereading and highlighting are low value. | Strong | Dunlosky et al. 2013, [APS summary](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html) |
| Retrieval practice beats restudy by about 0.5 standard deviations on average. | Strong | Rowland 2014 meta-analysis (159 articles), secondary summary |
| Mixing similar-looking items (interleaving) helps, especially when they're easy to confuse (phil/phob, -logy/-nomy). | Moderate | Brunmair & Richter 2019, [PubMed](https://pubmed.ncbi.nlm.nih.gov/31556629/) |
| Guessing before you're taught (even when wrong) improves later learning. | Moderate | Kornell, Hays & Bjork 2009, [Scientific American](https://www.scientificamerican.com/article/getting-it-wrong/) |
| Teaching word parts (morphology) improves vocabulary, effect about 0.3 for school-age learners. It works better mixed with other teaching than taught alone. | Moderate (kids). **Weak for adults**: only small studies. | Goodwin & Ahn 2013; 2024 meta-analysis, [Springer](https://link.springer.com/article/10.1007/s10648-024-09953-3); [adult study](https://ejournal.ukm.my/3l/article/view/7834) |
| Stories are easier to understand and remember than plain explanations. | Strong | [Meta-analysis, 33,000+ people](https://pubmed.ncbi.nlm.nih.gov/33410100/) |
| Duolingo's own scheduler (half-life regression) cut prediction error about 45% and raised daily engagement 12%. | Strong for engagement | [Duolingo HLR](https://github.com/duolingo/halflife-regression) |
| Reaching a 7-day streak goes with 3.6x higher course completion (correlation). Allowing two streak freezes raised daily actives without more days off. | Moderate (company data) | [Duolingo blog](https://blog.duolingo.com/how-duolingo-streak-builds-habit) |
| Gamification helps learning (g ≈ 0.49), motivation (0.36) and behavior (0.25). Competition combined with collaboration works best. | Moderate | Sailer & Homner 2020, [Springer](https://link.springer.com/article/10.1007/s10648-019-09498-w) |
| Engagement doesn't prove learning: ~60 minutes of Duolingo gave a very small test-score gain. | Moderate | [LMU study](https://digitalcommons.lmu.edu/econ_fac/69) |
| Hard streaks and public leagues can cause stress and quitting. | Weak (small qualitative studies) | [Decision Lab](https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification) |
| No good evidence for a "best" session length. 2-5 minutes is a convention. | No evidence either way | Microlearning reviews |

## Design rules we took from it, and how the app follows each

| Rule | In the app |
|---|---|
| Short sessions | A lesson is 3 items: about 7-9 graded questions, roughly 3 minutes. |
| Guess first | Each lesson opens with "Take a guess" on a word you haven't been taught. No penalty. |
| Teach a root with its word family | Each intro card shows the root, real Greek spelling, meaning, a Texas example and 2 example words. |
| Test transfer to unseen words | Every root lesson has at least 2 "New word: decode it" questions on words held back from the intro. The tests check this. |
| Retrieval, not rereading | Every intro card is followed right away by a question. Missed questions come back at the end. |
| Spaced review | Leitner boxes at 1, 3, 7, 14 and 30 days. A miss drops the item back to box 1. Practice serves what's due. |
| Interleave look-alikes | Wrong answers come mostly from the same unit, and each lesson ends with 1-2 older items that are due. |
| Stories and local hooks | Every item has a Texas example. Every idea has a short story and a "use it at work" line. |
| Don't over-apply roots | The "Is it Greek? Texas Edition" unit (rodeo, maverick, barbecue) and one Greek-or-not question in every unit roundup. |
| No punishment | No hearts and no lives. Weekends never break a streak, you get one free freeze a week, and another every 7 days (max 2). |
| Competition plus collaboration, opt-in | The team board is opt-in, resets every Monday, and leads with a shared team goal before the ranking. |
| Measure learning, not just clicks | Accuracy and per-item right/wrong counts are stored per person. A delayed unseen-word test is listed below as a next step. |

## Open questions and next steps
- **Measure learning.** Add a short "checkup" quiz on unseen words two weeks after someone starts, to see if decoding actually improved.
- **Better scheduler.** Leitner is simple. With a few weeks of data, switch to FSRS (the `ts-fsrs` library), which needs fewer reviews for the same recall.
- **Texas humor is a bet.** No solid evidence that humor helps. Ask the team which hooks they remember.
