---
title: SplitEasy
tagline: Itemised bill splitting that produces a receipt people actually accept
kind: personal
status: live
year: 2026
role: Solo
stack: ['REACT', 'TYPESCRIPT', 'TAILWIND', 'VERCEL']
cover: ../../assets/projects/spliteasy.jpg
order: 10
gallery:
  - src: ../../assets/portfolio-sites/bill-split/home.png
    caption: Assign each line item to the people who shared it; totals settle live
  - src: ../../assets/portfolio-sites/bill-split/genreatedtemplate.png
    caption: The generated summary — who owes what, itemised, ready to share
---

## The problem

Splitting a group bill evenly is easy and wrong. Splitting it correctly means tracking who had
what, dividing shared items, and applying tax proportionally — which is enough arithmetic that
everyone gives up and rounds, and one person quietly overpays every time.

## What I built

A splitter that does the itemised version without the arithmetic.

- **Per-item assignment** — tag each line to one person or split it across several; quantities
  and shared portions are handled explicitly.
- **Proportional tax and charges** — service charge and VAT distribute by each person's actual
  share rather than by headcount.
- **Shareable summary** — generates a clean "who owes what" breakdown, itemised per person, that
  can be dropped into a group chat and immediately understood.

## Notes

The generated summary matters more than the calculator. The point of friction was never the
maths, it was convincing five people the number is fair — so the output is designed to be
auditable at a glance.
