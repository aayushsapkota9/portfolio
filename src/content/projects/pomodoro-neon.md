---
title: Pomodoro Neon
tagline: A focus timer that pulls your real tasks from Google, not a fresh empty list
kind: personal
status: live
year: 2025
role: Solo
stack: ['React', 'TypeScript', 'Google API', 'Tailwind', 'Vercel']
cover: ../../assets/projects/pomodoro-neon.jpg
url: https://pomodoro-neon-xi.vercel.app/
order: 8
gallery:
  - src: ../../assets/portfolio-sites/pomodoro-timer/landing.png
    caption: Landing — sign in with Google, or continue as a guest
  - src: ../../assets/portfolio-sites/pomodoro-timer/home-with-google-sync-taska&calandar.png
    caption: Session view with Google Tasks and Calendar synced alongside the timer
  - src: ../../assets/portfolio-sites/pomodoro-timer/custom-backgrounds.png
    caption: Custom backgrounds and ambience per session
---

## The problem

Every Pomodoro app asks you to retype your to-do list into it. That list immediately drifts from
the one you actually keep, so within a week you're maintaining two and trusting neither.

## What I built

A timer that reads the task list you already have.

- **Google Tasks and Calendar sync** — your real tasks and today's events sit next to the timer,
  so a session is started against something that already exists.
- **Guest mode** — the timer works fully without signing in; Google auth is only needed for sync.
- **Custom backgrounds and ambience** — session environments you can set per focus block.

## Notes

A personal tool that got out of hand slightly. The sync is one-way by design — it reads your
tasks and never writes back, because a focus timer silently editing your task list is a bad
surprise to ship.
