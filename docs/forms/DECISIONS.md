# Forms: Design Decisions

Why forms are built the way they are. Each entry records a choice, the options considered and the reason, so nobody has to guess later or re-argue a settled question. **Add a new entry when you make a choice between options. Don't rewrite old ones;** if a decision is reversed, add a new entry that says it replaces the old one.

Template:

```markdown
## D-00X — Title (YYYY-MM-DD)

**Status:** Accepted | Replaced by D-00Y
**Context:** What problem or question came up.
**Options:** The alternatives considered.
**Decision:** What we chose.
**Why:** The reasons, including trade-offs we accepted.
```

---

## D-001 — Build forms in the Payload admin with the Form Builder plugin (2026-09-24)

**Status:** Accepted

**Context:** The site needs three contact forms now and "many other forms" later. The team is new to Next.js and Payload.

**Options:**
1. **Forms in code:** each form's fields defined in a TypeScript file, plus a custom collection for submissions. This was the first version.
2. **Payload Form Builder plugin:** forms are built in the admin, and every submission goes to one shared collection.

**Decision:** Option 2.

**Why:**
- A new form or a field change is made in the admin: no code, no new collection and no migration per form.
- Non-developers can change labels, required fields, thank-you messages and notification emails.
- Per-form notification emails come built in.
- It's Payload's official, maintained approach.
- Trade-offs we accepted: a bit more setup, more database tables, and custom checks limited to what `submitForm` supports.

## D-002 — Save submissions through a validating server action, and block public API creation (2026-09-24)

**Status:** Accepted

**Context:** Out of the box, the plugin lets anyone create Form Submissions through the REST or GraphQL API, and it doesn't check values against the form (its own code has a TODO for this).

**Options:**
1. Submit from the browser straight to `POST /api/form-submissions` (the plugin's default).
2. Submit to a Next.js server action that checks everything, and turn off public API creation.

**Decision:** Option 2 (`src/lib/submitForm.ts`, and `formSubmissionOverrides.access.create` limited to admins).

**Why:** Submissions are checked on the server against the form's real settings: required fields, formats, dropdown options and lengths. Bots can't skip the checks or the honeypot by calling the API directly. Server actions are also the recommended Next.js way to handle forms: no hand-written API routes, and errors come back to the form as they happen.

## D-003 — Pages find forms by a `slug` field, not by ID or title (2026-09-24)

**Status:** Accepted

**Context:** The plugin's forms only have a title and a database ID.

**Decision:** Add a unique `slug` field to Forms, and have pages call `getFormBySlug('…')`.

**Why:** Database IDs differ between dev and production, and titles are for people and may change. A slug is stable, readable in code, and the same in every environment.

## D-004 — Contact pages render on each request, with the form data cached (2026-09-24)

**Status:** Accepted

**Context:** The Docker build has no database connection (see the `Dockerfile` and `layout.tsx` history), but form pages need form data.

**Decision:** Form pages use `export const dynamic = 'force-dynamic'`. The form data itself is cached with `unstable_cache` under the `forms` tag, and a Forms hook clears that tag whenever a form is saved or deleted.

**Why:** The build keeps working without a database, pages stay fast because the data is cached, and admin edits show up straight away.

## D-005 — Keep the plugin's textarea block but add a `rows` setting (2026-09-24)

**Status:** Accepted

**Context:** The designs need a one-line Message box on some forms and a tall one on others (Trade Inquiry). The plugin's textarea has no height setting.

**Decision:** Replace the textarea block with a copy that has the same settings (name, label, width, default value, required) plus `rows`. It's in `src/plugins/formBuilder.ts`.

**Why:** Editors control the height per form, and no special-case code is needed in the renderer.

## D-006 — Starter forms are created by an idempotent seed, which the production migration calls (2026-09-24)

**Status:** Accepted

**Context:** Pages depend on specific forms existing (by slug) in every environment, but forms are database content.

**Decision:** Define them in `src/seed/contactForms.ts`. Run the seed with `npm run seed:forms` in dev, and call it from the `form_builder` migration so production gets the forms on first deploy. The seed skips any slug that already exists.

**Why:** Every environment gets the forms automatically, and edits made later in the admin are never overwritten.

## D-007 — Save submissions in the admin; no email service for now (2026-09-24)

**Status:** Accepted, to be reviewed when email delivery is needed

**Context:** Notifications should go to shreyanka.b@noveloffice.in, but saving submissions in the admin is enough for now.

**Decision:** The starter forms have notification emails set up, but no email adapter is connected, so Payload only logs the emails.

**Why:** It avoids choosing and configuring an email service before it's needed. Turning email on later only means adding an adapter in `payload.config.ts` (see README → Email notifications). Record that as a new decision when it happens.
