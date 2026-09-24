# Claude Code

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

# Forms documentation

Website forms use the Payload Form Builder plugin and are documented in `docs/forms/`. Read `docs/forms/README.md` before working on forms. In the same change as any edit to form code (`src/plugins/formBuilder.ts`, `src/lib/forms.ts`, `src/lib/submitForm.ts`, `src/components/forms/`, `src/components/contact/`, `src/seed/contactForms.ts`, form pages, or form-related migrations):

- add an entry at the top of `docs/forms/CHANGELOG.md` using its template;
- update `docs/forms/README.md` if behaviour, steps, files or the "Current forms" table changed;
- add an entry to `docs/forms/DECISIONS.md` when choosing between approaches.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
