---
title: DigiPalika
tagline: Digitising a municipality's paper trail — registrations, recommendations, and grants
kind: client
status: live
year: 2025
role: Full-stack engineer
stack: ['NEXT.JS', 'NESTJS', 'POSTGRESQL', 'NGINX', 'LINUX']
cover: ../../assets/projects/digipalika.jpg
order: 2
gallery:
  - src: ../../assets/portfolio-sites/digipalika/darta-chalani.png
    caption: Darta–Chalani — every inbound and outbound document, tracked and numbered
  - src: ../../assets/portfolio-sites/digipalika/dynamic-letters(sifaris).png
    caption: Sifaris builder — templated recommendation letters with live variables
  - src: ../../assets/portfolio-sites/digipalika/rich-text-editor.png
    caption: Letters render onto the municipality's own letterhead before printing
  - src: ../../assets/portfolio-sites/digipalika/grant-management.png
    caption: Grant management with fiscal-year budget tracking
  - src: ../../assets/portfolio-sites/digipalika/user-portal.png
    caption: Citizen portal — file a complaint, request a recommendation, apply for a grant
---

## The problem

A Nepali municipality runs on paper. Every document that enters or leaves the building is
hand-written into a *darta–chalani* register. Every recommendation letter — for a birth
certificate, a marriage, a business registration — is retyped from scratch. When a citizen asks
where their application is, nobody can answer without physically finding the ledger.

## What I built

An internal system for Besisahar Nagarpalika that keeps the municipality's existing workflow
intact but moves it off paper.

- **Darta–Chalani** — inbound and outbound document registration with automatic numbering, so
  the register is searchable instead of chronological-only.
- **Dynamic sifaris letters** — a template builder with typed variables. Staff pick a template,
  fill the fields, and the letter renders onto the municipality's official letterhead ready to
  print. This removed the single largest source of retyping and typos.
- **Business registration, birth and marriage certificates** — structured records replacing
  free-form ledger entries.
- **Grant and project management** — budget allocation and spend tracked against the Nepali
  fiscal year, with reporting per ward.
- **Citizen portal** — residents file complaints, request recommendations, and apply for grants
  without visiting the office.

## Notes

The hardest constraint was that the software could not ask staff to work differently. The
darta–chalani numbering scheme, the letter formats, and the fiscal-year boundaries are all fixed
by regulation, so the system had to model them exactly rather than propose a cleaner abstraction.
