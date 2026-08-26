---
title: Checkmate
tagline: Book an appointment by sending a WhatsApp voice note — and get one back
kind: personal
status: private
year: 2025
role: Solo — built at a hackathon
stack: ['Gemini 2.5', 'Gemini TTS', 'Google Calendar', 'WhatsApp']
cover: ../../assets/projects/checkmate-whatsapp.jpg
repo: https://github.com/aayushsapkota9/CODEFEST-checkmate
order: 11
---

## The problem

Booking an appointment assumes a lot of the person booking: that they can navigate a web form,
type comfortably, and are literate in the language the form is written in. For a large number of
people that is three assumptions too many — but almost everyone already sends voice notes on
WhatsApp.

## What I built

A voice-to-voice appointment platform that lives entirely inside WhatsApp. No app, no form, no
typing.

- **Voice in** — the user sends a voice note. Gemini 2.5 transcribes it and parses the intent out
  of natural speech: who, what, and when, including relative dates like "tomorrow morning".
- **Calendar as the source of truth** — the Google Calendar API handles availability, booking,
  and rescheduling, so the appointment exists in a real calendar rather than a bespoke database.
- **Voice out** — the confirmation is generated with Gemini's text-to-speech and sent back as a
  voice note, closing the loop in the same medium the user started in.

## Notes

Built for the **CFC Chitwan 2025** hackathon.

The interesting part was resisting the urge to add a UI. Every fallback screen we considered
would have quietly reintroduced the literacy and typing requirements the whole thing exists to
remove, so the conversation stays voice-first end to end.
