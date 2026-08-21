---
title: Kirana Books
tagline: Double-entry accounting, POS, and production runs for a mill and retail shop
kind: product
status: in-progress
year: 2026
role: Solo — full-stack
stack: ['NEXT.JS', 'TYPESCRIPT', 'POSTGRESQL', 'DOCKER']
cover: ../../assets/projects/kirana-books.jpg
featured: true
order: 4
gallery:
  - src: ../../assets/portfolio-sites/accounts/dashboard.png
    caption: Dashboard — revenue, customer activity, and account health at a glance
  - src: ../../assets/portfolio-sites/accounts/pos.png
    caption: Counter POS — product search, batch selection, split tender, instant receipt
  - src: ../../assets/portfolio-sites/accounts/trial-balance.png
    caption: Trial balance, generated from the ledger rather than maintained by hand
  - src: ../../assets/portfolio-sites/accounts/journal-voucheer.png
    caption: Day book with dual BS/AD dating on every voucher
  - src: ../../assets/portfolio-sites/accounts/bill.png
    caption: Purchase bill entry with per-line VAT, discount, and batch tracking
  - src: ../../assets/portfolio-sites/accounts/hoome.png
    caption: The public storefront the same catalogue feeds
---

## The problem

Small Nepali retailers and mills are stuck between two bad options: paper ledgers that cannot
produce a trial balance, or foreign accounting software that has never heard of the Bikram Sambat
calendar, Nepali VAT rules, or the idea that one business both mills raw grain and sells it
across a counter.

## What I built

A single system covering the whole business, built around a real double-entry ledger rather than
a transaction log with reports bolted on.

- **Accounting** — journal vouchers, day book, account ledger, trial balance, and profit & loss,
  all derived from the ledger. Every voucher carries both BS and AD dates.
- **Point of sale** — counter billing with product search, batch selection, per-line VAT and
  discount, split tender across cash/bank/credit, and printed receipts.
- **Purchase and sales cycle** — quote requests, purchase bills, invoices, payments, and refunds
  linked end to end so a payment settles against specific invoices.
- **Inventory and production** — raw material to finished goods, with production runs, packaging,
  and per-run efficiency, which is what a mill actually needs and generic retail software lacks.
- **Cash & bank** — reconciliation across physical cash boxes, bank accounts, and cheques.
- **Public storefront** — the same catalogue drives a customer-facing shop.

## Notes

The interesting constraint was the dual calendar. Nepali businesses file against the BS fiscal
year but transact with suppliers on AD dates, so every date in the system is stored once and
projected into both — and every report boundary has to respect the BS year, not the Gregorian one.
