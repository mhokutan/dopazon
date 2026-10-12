---
name: web-design-guidelines
description: Review UI code against the Web Interface Guidelines (accessibility, focus, forms, motion, typography, layout, performance). Use when asked to "review my UI", "audit design", "review UX", "check accessibility" or "check my site against best practices".
argument-hint: <file-or-pattern>
---

# Web Interface Guidelines review

Review files against the rules in `command.md`, which sits next to this file.

This is a local wrapper around Vercel's `web-design-guidelines` skill. The
upstream skill fetches `command.md` from GitHub on every run; here the rules
are vendored at a pinned commit (see `.claude/skills/THIRD_PARTY_NOTICES.md`)
so a review never depends on, or changes with, a remote file.

## Steps

1. Read `command.md` in this skill's folder. It holds every rule and the
   required output format. Do not fetch it from the network.
2. Read the files the user named. If none were named, ask which files.
3. Check them against every rule.
4. Report findings in the terse `file:line` format `command.md` specifies.

## Notes for this project

Dopazon is plain HTML + vanilla JS. Some rules are written with React in mind
(`<Link>`, component props): apply their intent to the equivalent HTML
(`<a href>`, native `<button>`, `aria-*`), and skip rules that only make sense
inside a framework instead of reporting them.
