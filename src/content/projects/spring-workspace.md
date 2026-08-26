---
title: Spring Workspace
tagline: A browser code workspace with a real terminal and shareable sessions
kind: personal
status: private
year: 2025
role: Solo — full-stack
stack: ['Spring Boot', 'React', 'Docker', 'WebSocket', 'PostgreSQL']
cover: ../../assets/projects/spring-workspace.jpg
order: 9
gallery:
  - src: ../../assets/portfolio-sites/spring-project/workspace.png
    caption: Editor and terminal — Python executing server-side in an isolated container
  - src: ../../assets/portfolio-sites/spring-project/invite-modal.png
    caption: Share a workspace by email with editor or viewer permissions
  - src: ../../assets/portfolio-sites/spring-project/dashboard.png
    caption: Workspace dashboard
---

## The problem

Sharing runnable code with someone means telling them to install a runtime, clone a repo, and
match your versions. For teaching, interviews, or a quick "does this work for you too?", that
setup cost is larger than the thing being shared.

## What I built

A workspace that runs in the browser and can be handed to someone with a link.

- **Server-side execution** — Python runs in an isolated container per workspace, streamed back
  over a WebSocket, so the terminal behaves like a real one rather than a simulated console.
- **File tree and editor** — a persistent workspace rather than a scratch snippet.
- **Sharing with roles** — invite by email as editor or viewer, so a workspace can be handed out
  without handing over write access.

## Notes

Built on Spring Boot largely to work through container lifecycle and WebSocket streaming
properly. The repository is private.
