# Forms Changelog

Every change to website forms: code, plugin settings, starter forms, migrations and notification recipients. **Newest first.** For how things work, see [README.md](./README.md). For why, see [DECISIONS.md](./DECISIONS.md).

Content edits made in the admin (e.g. relabelling a field) don't need an entry unless they should also change the seed or the "Current forms" table in the README.

## How to add an entry

Copy this template to the top of the list below:

```markdown
## YYYY-MM-DD — Short title

**What changed:** One or two sentences in plain words.
**Why:** The reason or request behind it.
**Files:** `path/one.ts`, `path/two.tsx`
**Database:** None | Migration `YYYYMMDD_HHMMSS_name` (what it does) | Seed changed
**Admin action needed:** None | e.g. "Run `npm run seed:forms`" / "Answer 'create' to the dev push prompt"
**By:** Name
```

---

## 2026-09-24 — Documentation added

**What changed:** Added `docs/forms/` (this changelog, [README.md](./README.md) and [DECISIONS.md](./DECISIONS.md)), a forms-docs checkbox in the PR template, a docs rule in `CLAUDE.md`, and "see docs" comments at the top of the key form files.
**Why:** Keep a full, beginner-friendly record of how forms work and of every change to them.
**Files:** `docs/forms/*`, `.github/pull_request_template.md`, `CLAUDE.md`, header comments in the form source files
**Database:** None
**Admin action needed:** None
**By:** Shreyanka (with Claude Code)

## 2026-09-24 — Switched to the Payload Form Builder plugin

**What changed:** Forms are now built in the Payload admin (**Forms**) and saved to **Form Submissions**, using `@payloadcms/plugin-form-builder@3.89.0`. One shared `FormRenderer` draws any form, and one `submitForm` server action checks and saves submissions. The three contact forms (`buy-a-home`, `trade-inquiry`, `other-inquiries`) are created by a seed. The earlier hand-coded Inquiries setup (below) was removed.
Details:
- Enabled field types: text, email, textarea, number, select, checkbox, message. Date, country, state and payment are off.
- Forms have an extra `slug` field (unique) so pages can find them.
- Textarea has an extra `rows` setting to control height.
- Public REST/GraphQL creation of submissions is blocked (admins only). The website saves through the validating server action instead.
- Form data is cached under the `forms` tag and cleared automatically when a form is edited.
- Notification emails go to `shreyanka.b@noveloffice.in` (Reply-To is the visitor). No email service is connected yet, so emails are only logged.
- Contact pages now render on each request (`force-dynamic`), because they read from the database and the Docker build has none.

**Why:** Many more forms are planned. With the plugin, new forms and field changes are made in the admin, with no new code or migration per form. See [DECISIONS.md](./DECISIONS.md) (D-001, D-002).
**Files:** `src/plugins/formBuilder.ts`, `src/payload.config.ts`, `src/lib/forms.ts`, `src/lib/submitForm.ts`, `src/components/forms/FormRenderer.tsx`, `src/components/contact/ContactLayout.tsx`, `src/app/(frontend)/{buy-a-home,trade-inquiry,other-inquiries}/page.tsx`, `src/seed/contactForms.ts`, `src/scripts/seedForms.ts`, `src/collections/hooks/revalidateTag.ts`, `src/lib/cacheTags.ts`, `package.json` (plugin and `seed:forms` script)
**Removed:** `src/collections/Inquiries.ts`, `src/lib/inquiryForms.ts`, `src/lib/submitInquiry.ts`, `src/components/contact/InquiryForm.tsx`
**Database:** Migration `20260924_100749_form_builder`. It creates the form and submission tables, creates the three starter forms, and also adds `properties.featured_display_name`, which was pending from an earlier Properties change.
**Admin action needed:** Dev: answer "create" to the push prompts, accept dropping `inquiries`, then run `npm run seed:forms` (done 2026-09-24). Production: nothing, because the migration runs on startup.
**Verified:** All three forms submit end to end in dev. Empty required fields show errors. Direct `POST /api/form-submissions` returns 403.
**By:** Shreyanka (with Claude Code)

## 2026-09-24 — Contact pages with hand-coded forms (superseded the same day, never deployed)

**What changed:** First version of `/buy-a-home`, `/trade-inquiry` and `/other-inquiries`: a shared `ContactLayout` (image left and form right on desktop; image on top on tablet and phone), a custom `Inquiries` collection, form fields defined in code, and a `submitInquiry` server action. The header gained a **Contact** dropdown with the email, the phone and the three pages.
**Why:** The contact pages were needed. The code-defined approach was then replaced by the Form Builder plugin (see above) once it became clear many forms were coming.
**Files:** `src/components/contact/ContactLayout.tsx` (kept), `src/components/layout/Header.tsx`, `src/components/layout/Header.css` (kept); the rest was removed in the entry above.
**Database:** None in production. Its migration was deleted before it was committed. The dev-only `inquiries` table was dropped.
**Admin action needed:** None
**By:** Shreyanka (with Claude Code)
