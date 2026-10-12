# Third-party skills

These skills were copied from public repositories at the commits below and are
redistributed under their original licenses. Each folder keeps its license file.
Fetched and reviewed 2026-10-12 (network calls, exec, prompt-injection patterns).

| Folder | Source | Commit | License |
|---|---|---|---|
| frontend-design | github.com/anthropics/skills — skills/frontend-design | dbd4588f9e1033efb41dad4bef2f7947c8993d44 | Apache-2.0 (LICENSE.txt) |
| webapp-testing | github.com/anthropics/skills — skills/webapp-testing | dbd4588f9e1033efb41dad4bef2f7947c8993d44 | Apache-2.0 (LICENSE.txt) |
| accessibility, best-practices, core-web-vitals, performance, seo, web-quality-audit | github.com/addyosmani/web-quality-skills — skills/* | afa8da942115f2961fdbfa80807ea0b232ff6c00 | MIT (LICENSE) |
| supabase, supabase-postgres-best-practices | github.com/supabase/agent-skills — skills/* | c9be0e931b7930f7d02126d04774d904c381e7d7 | MIT (LICENSE) |
| sentry-security-review | github.com/getsentry/skills — skills/security-review | d18b7aa8ba878354e5c348310230e652f7690f9c | Apache-2.0 (LICENSE-APACHE-2.0); reference material CC BY-SA 4.0 (LICENSE) |
| cro, analytics | github.com/coreyhaines31/marketingskills — skills/* | 1efedbc5148b54b2f0f6c6c9fe0be62e151c7fff | MIT (LICENSE) |
| web-design-guidelines/command.md | github.com/vercel-labs/web-interface-guidelines — command.md | 434b7f91364665f2f733b310ec54809bf8f37937 | MIT (LICENSE) |

Local modifications:
- `sentry-security-review`: frontmatter `name` changed from `security-review`
  to avoid colliding with Claude Code's built-in `/security-review`. Content
  unchanged. Changes to its CC BY-SA reference files must stay CC BY-SA.
- `web-design-guidelines/SKILL.md`: rewritten locally. The upstream wrapper
  (github.com/vercel-labs/agent-skills, MIT per its README) fetched the rules
  from GitHub on every run; this one reads the vendored `command.md`.
- `cro`, `analytics`: upstream `evals/` folders omitted.

To update a skill: re-fetch at a new commit, re-run the same review, update
this table.
