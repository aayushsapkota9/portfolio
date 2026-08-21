---
title: Krishi Connect
tagline: A national agriculture platform putting extension services in farmers' hands
kind: client
status: live
year: 2025
role: Full-stack engineer
stack: ['NEXT.JS', 'NESTJS', 'POSTGRESQL', 'DOCKER', 'AWS']
cover: ../../assets/projects/krishi-connect-dashboard.jpg
url: https://play.google.com/store/apps/details?id=app.krishiconnect
featured: true
order: 1
gallery:
  - src: ../../assets/portfolio-sites/krishi/dashboard-r2.png
    caption: Dashboard — cooperative, farmer, and specialist counts with year-on-year yield comparison
  - src: ../../assets/portfolio-sites/krishi/crop-calandar.png
    caption: Crop calendar — sowing and harvest windows for every crop, by Nepali month
  - src: ../../assets/portfolio-sites/krishi/fertilizer-calculation.png
    caption: Fertilizer calculator — converts plot area and crop into exact DAP/Urea/MOP quantities
  - src: ../../assets/portfolio-sites/krishi/comprehensive-business-pdf-geneation.png
    caption: Generated multi-year business plan, export-ready as a PDF
  - src: ../../assets/portfolio-sites/krishi/cost-sheets.png
    caption: Cost sheets broken into fixed capital, working capital, and operating expense
  - src: ../../assets/portfolio-sites/krishi/rabc.png
    caption: Role-based access control across farmers, experts, officers, and admins
---

## The problem

Agricultural extension advice in Nepal lives in PDFs, notice boards, and the heads of a
small number of officers. A farmer deciding *when to sow*, *how much fertilizer to buy*, or
*whether a crop plan is financially viable* has no reliable way to get that answer — and the
officers who do know it spend their days re-answering the same questions by hand.

## What I built

A bilingual platform that turns that institutional knowledge into tools a farmer can actually use.

- **Crop calendar** — sowing and harvest windows for every registered crop, mapped to the Nepali
  calendar rather than the Gregorian one, so the advice matches how farmers actually plan.
- **Fertilizer calculator** — takes plot area and crop type and returns exact DAP, Urea, and MOP
  quantities, replacing a conversion table most people got wrong.
- **Business-plan generator** — collects a farm's inputs and produces a multi-year plan with
  fixed-capital, working-capital, and operating-expense cost sheets, exported as a PDF the farmer
  can take to a bank for a loan.
- **Agro-firm KYC and RBAC** — registration and verification flows with distinct permission sets
  for farmers, experts, officers, and administrators.
- **Publications, news, and notices** — a managed library of crop, disease, and livestock guidance.

## Notes

The whole interface is Nepali-first. Dates, numerals, and the crop taxonomy follow local
convention rather than being translated after the fact — which sounds like a detail and turned
out to be the difference between the tool being used and being ignored.
