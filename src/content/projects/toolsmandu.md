---
title: ToolsMandu
tagline: A digital-subscription storefront for Nepal, plus the console that runs it
kind: client
status: archived
year: 2024
role: Full-stack engineer
stack: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind', 'Vercel']
cover: ../../assets/projects/toolsmandu.jpg
url: https://web.archive.org/web/20260215191137/https://www.toolsmandu.com/
featured: true
order: 3
gallery:
  - src: ../../assets/portfolio-sites/toolsmandu/home.png
    caption: Storefront — campaign banners, recently added items, and running deals
  - src: ../../assets/portfolio-sites/toolsmandu/category.png
    caption: Category browsing with NPR pricing and discount badges
  - src: ../../assets/portfolio-sites/toolsmandu/product-page.png
    caption: Product page with plan selection and a notify-me flow when stock runs out
  - src: ../../assets/portfolio-sites/toolsmandu/register.png
    caption: Registration built around a WhatsApp number, not just an email address
  - src: ../../assets/portfolio-sites/toolsmandu-admin/admin-dashboard-r3.png
    caption: Admin — order status, fulfilment rate, and empty-credential alerts
  - src: ../../assets/portfolio-sites/toolsmandu-admin/admin-products-r3.png
    caption: Admin — product and plan management
  - src: ../../assets/portfolio-sites/toolsmandu-admin/admin-tickets-r3.png
    caption: Admin — support tickets routed by type, joined to the order they concern
---

## The problem

Buying Canva Pro, Adobe CC, or a VPN subscription from Nepal is awkward: international cards are
a barrier, prices are quoted in dollars, and most support happens over WhatsApp rather than email.
A generic storefront template gets all three of those wrong.

Behind the counter the problem is different. Selling digital licences means the "inventory" is a
pool of credentials that must be issued once, never twice, and replaced when a provider rotates
them. Fulfilment failures are invisible until a customer complains — by which time the review is
already written.

## What I built

A storefront and an operations console, designed as one system.

**The shop**

- **NPR-native pricing** with per-plan durations and discount badges, rather than converted
  dollar amounts.
- **WhatsApp-first accounts** — registration is keyed to a verified WhatsApp number, because
  that is where the customer expects delivery and support to happen.
- **Notify-me on restock** — digital licences go out of stock in a way physical goods don't, so
  the product page captures demand instead of losing it.
- **Category and campaign merchandising** — banners, "recently added", and time-boxed deals.

**The console**

- **Credential inventory** — tracks which licence keys are unissued, issued, or expired, and
  raises an explicit alert before a product's pool runs dry.
- **Order pipeline** — fulfilled, pending, and cancelled states with the fulfilment rate charted
  over time, so a stalled provider shows up as a trend rather than a surprise.
- **Support tickets** — categorised by type and joined to the order they concern, so an agent
  isn't asking the customer to re-explain.
- **Reporting** — revenue, customer counts, and product-level movement.

## Notes

Keeping the two halves in one codebase meant the stock state a customer sees and the credential
pool an operator manages are the same object, not two systems kept in sync by hope.

The site is no longer running; the link points at an archived capture.
