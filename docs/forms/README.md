# Website Forms

How forms work on the Novel Signature Homes website: how they are built, where the code lives, and how to add or change a form.

> **Keeping this up to date:** any change to form code, form settings in the plugin, or the starter forms must be recorded in [CHANGELOG.md](./CHANGELOG.md). If the change alters how something works, update this guide too. If it's a design choice (the "why"), add it to [DECISIONS.md](./DECISIONS.md). See [Keeping these docs current](#keeping-these-docs-current).

## Contents

1. [The short version](#the-short-version)
2. [How it works](#how-it-works)
3. [Where everything lives](#where-everything-lives)
4. [For content editors: working in the admin](#for-content-editors-working-in-the-admin)
5. [For developers: common tasks](#for-developers-common-tasks)
6. [Validation and security](#validation-and-security)
7. [Caching](#caching)
8. [Database: dev vs production](#database-dev-vs-production)
9. [Email notifications](#email-notifications)
10. [Current forms](#current-forms)
11. [Troubleshooting](#troubleshooting)
12. [Keeping these docs current](#keeping-these-docs-current)
13. [Glossary](#glossary)

---

## The short version

- Forms are **built in the Payload admin** (`/admin` → **Forms**). You don't need code to add a field, change a label, make a field required or change who gets the notification email.
- A website page **loads a form by its slug** (a short ID like `buy-a-home`) and draws it with one shared component, `FormRenderer`.
- When someone submits, a **server action** (`submitForm`) checks the answers against the form's settings and saves them to **Form Submissions** in the admin.
- Saving a submission triggers the **notification email** configured on that form. No email service is connected yet, so emails are only written to the server log (see [Email notifications](#email-notifications)).

This uses Payload's official **Form Builder plugin** (`@payloadcms/plugin-form-builder`).

## How it works

```
 ┌──────────────── Payload admin ─────────────────┐
 │  Forms            (editors build forms here)   │
 │  Form Submissions (every submission lands here)│
 └───────┬───────────────────────────▲────────────┘
         │ 1. page loads form        │ 5. saved (+ notification email)
         │    by slug (cached)       │
 ┌───────▼────────┐          ┌───────┴────────────────┐
 │ Page           │          │ submitForm             │
 │ e.g. /buy-a-home│          │ (server action)        │
 │ getFormBySlug()│          │ 4. checks every answer │
 └───────┬────────┘          │    against the form    │
         │ 2. passes form    └───────▲────────────────┘
 ┌───────▼────────────────────┐      │ 3. visitor submits
 │ FormRenderer (browser)     ├──────┘
 │ draws inputs, shows errors │
 │ and the thank-you message  │
 └────────────────────────────┘
```

Step by step:

1. **The page loads the form.** For example [`src/app/(frontend)/buy-a-home/page.tsx`](../../src/app/(frontend)/buy-a-home/page.tsx) calls `getFormBySlug('buy-a-home')`. If no form has that slug, the page shows a 404.
2. **`FormRenderer` draws it.** It turns each field from the admin into an input, using the site's Tailwind styling. It also adds a hidden "honeypot" field to catch spam bots.
3. **The visitor submits.** The browser sends the answers to the `submitForm` server action. A server action is a function that runs on the server but can be called straight from a form, so no API endpoint is needed.
4. **`submitForm` checks the answers** against the form's own settings: required fields, email and phone format, allowed dropdown choices and length limits. If anything is wrong, the errors go back and appear under each field, and the visitor's answers are kept.
5. **It saves the submission** to Form Submissions. The plugin then prepares the form's notification emails. The visitor sees the form's thank-you message, or is redirected if the form is set to redirect.

## Where everything lives

| What | File | Notes |
|---|---|---|
| Plugin setup | [`src/plugins/formBuilder.ts`](../../src/plugins/formBuilder.ts) | Allowed field types, the notification email, the extra `slug` and textarea `rows` settings, cache hooks and security |
| Plugin registration | [`src/payload.config.ts`](../../src/payload.config.ts) | `plugins: [formBuilder]` |
| Load a form | [`src/lib/forms.ts`](../../src/lib/forms.ts) | `getFormBySlug()` and `getFormById()`, cached |
| Draw a form | [`src/components/forms/FormRenderer.tsx`](../../src/components/forms/FormRenderer.tsx) | Client component that works with any form |
| Handle a submission | [`src/lib/submitForm.ts`](../../src/lib/submitForm.ts) | Server action: checks the answers, saves them, stops bots |
| Contact page layout | [`src/components/contact/ContactLayout.tsx`](../../src/components/contact/ContactLayout.tsx) | Image on the left and form on the right on desktop; image on top on tablet and phone |
| Contact pages | `src/app/(frontend)/buy-a-home`, `trade-inquiry`, `other-inquiries` | Each loads its form by slug |
| Starter forms (seed) | [`src/seed/contactForms.ts`](../../src/seed/contactForms.ts) | Creates the three contact forms if they're missing; never overwrites admin edits |
| Seed command | [`src/scripts/seedForms.ts`](../../src/scripts/seedForms.ts) | `npm run seed:forms` |
| Database migration | [`src/migrations/20260924_100749_form_builder.ts`](../../src/migrations/20260924_100749_form_builder.ts) | Creates the form tables and the starter forms in production |
| Cache hooks | [`src/collections/hooks/revalidateTag.ts`](../../src/collections/hooks/revalidateTag.ts), [`src/lib/cacheTags.ts`](../../src/lib/cacheTags.ts) | Clears cached forms when one is edited |
| Header links | [`src/components/layout/Header.tsx`](../../src/components/layout/Header.tsx) | The Contact dropdown links to the three contact pages |

## For content editors: working in the admin

### Create a new form

1. Go to `/admin` → **Forms** → **Create New**.
2. Fill in:
   - **Title:** the name editors see, e.g. "Newsletter Signup".
   - **Slug** (right-hand sidebar): the short ID the website uses to find the form, e.g. `newsletter`. Use lowercase letters and hyphens. **Don't change the slug of a form that's already on the site**, or that page will show a 404.
   - **Fields:** add one block per input (see the table below).
   - **Submit Button:** the button text. If empty, it says "Submit".
   - **Confirmation Type:** *Message* shows a thank-you message in place of the form. *Redirect* sends the visitor to a URL.
   - **Emails:** who gets notified (see [Email notifications](#email-notifications)).
3. Save. A developer then places the form on a page (a two-line change, see below).

### Field types you can use

| Block | Becomes | Useful settings |
|---|---|---|
| Text | A one-line text box | Name it `phone` and it gets a phone keyboard and phone-number checks |
| Email | An email box | Always checked for a valid email address |
| Textarea | A multi-line box | **Rows** sets the height (1 = one line, 8 = tall) |
| Number | A number box | |
| Select | A dropdown | Add the options; answers must be one of them |
| Checkbox | A tick box | Saved as "Yes" or "No" |
| Message | Text shown inside the form, not an input | Use for notes or instructions |

Every field also has:
- **Name:** the internal key, in lowercase with no spaces, e.g. `businessType`. It appears in submissions and email placeholders. Don't rename a field once submissions exist, because old and new submissions will then use different keys.
- **Label:** what visitors see.
- **Width:** a percentage. Leave it empty for full width, or use `50` for two fields side by side.
- **Required:** the form can't be submitted without it.

Date, Country, State and Payment fields are switched off. A developer can enable them (see [Enable another field type](#enable-another-field-type)).

### Edit an existing form

Open it under **Forms** and save. The website shows the change on the next page load, with no deploy needed.

### Read submissions

Go to `/admin` → **Form Submissions**. Each entry shows which form it came from and every answer. Only logged-in admins can see submissions.

## For developers: common tasks

### Put a form on a page

Any server component can load and render a form:

```tsx
import { notFound } from 'next/navigation'
import FormRenderer from '@/components/forms/FormRenderer'
import { getFormBySlug } from '@/lib/forms'

export const dynamic = 'force-dynamic' // see "Database: dev vs production" below

export default async function NewsletterPage() {
  const form = await getFormBySlug('newsletter')
  if (!form) notFound()

  return <FormRenderer form={form} />
}
```

For a contact-style page with the image and form layout, use `ContactLayout`. Copy [`other-inquiries/page.tsx`](../../src/app/(frontend)/other-inquiries/page.tsx) and change the slug, subtitle, image and intro text.

### Add a starter form that must exist in every environment

Forms made in the admin exist only in the database where they were made: your dev database *or* production, not both. If the code depends on a form (a page loads it by slug), make sure it exists everywhere:

1. Add it to the `contactForms` list in [`src/seed/contactForms.ts`](../../src/seed/contactForms.ts), or to a new seed file.
2. Run `npm run seed:forms` for your dev database.
3. For production, either create it in the production admin with the **same slug**, or create a migration that calls the seed. Run `npm run payload migrate:create <name>`, then call the seed function in `up()`, as [`20260924_100749_form_builder.ts`](../../src/migrations/20260924_100749_form_builder.ts) does.

The seed skips any form whose slug already exists, so it's safe to run more than once and it never overwrites admin edits.

### Enable another field type

In [`src/plugins/formBuilder.ts`](../../src/plugins/formBuilder.ts), set the type to `true` in `fields` (e.g. `date: true`). Then:

1. Run `npm run generate:types` to update `src/payload-types.ts`.
2. Handle the new `blockType` in [`FormRenderer.tsx`](../../src/components/forms/FormRenderer.tsx) (how to draw it) and in [`submitForm.ts`](../../src/lib/submitForm.ts) (how to check it).
3. Create a migration, because this adds database tables: `npm run payload migrate:create <name>`.
4. Record it in [CHANGELOG.md](./CHANGELOG.md).

### Change the styling of all forms

All input styles are in [`FormRenderer.tsx`](../../src/components/forms/FormRenderer.tsx) (the `inputClass` constant and the button classes), so a change there applies to every form on the site.

> Tailwind note: `styles.css` sets global font sizes for `p`, `h2` and `a` outside Tailwind's layers, and those beat Tailwind classes. To override them on those elements, add `!` to the class (e.g. `text-[22px]!`).

### Change the confirmation or redirect behaviour

This is set per form in the admin. `FormRenderer` shows the rich-text **Confirmation Message** in place of the form, or calls `router.push()` to the **Redirect** URL.

## Validation and security

**Checks.** `submitForm` checks every submission on the server against the form's settings from the admin:

| Check | Rule |
|---|---|
| Required | Field must not be empty (a checkbox must be ticked) |
| Length | 200 characters for single-line fields, 5,000 for textareas |
| Email | Must look like `name@domain.tld` |
| Phone | A text field named `phone`: 7–20 characters of digits, spaces, `+ ( ) . -` |
| Number | Must be a number |
| Select | Must be one of the form's options |

Empty optional answers are not saved.

**Bots.** A hidden `website` field (the honeypot) catches bots. People never see it. If it's filled in, the submission is quietly dropped but still shows "success".

**Direct API access is blocked.** By default the plugin lets *anyone* create submissions through the REST or GraphQL API, and it doesn't check the values. We override that in `formSubmissionOverrides.access`, so only logged-in admins can create submissions through the API. The website's `submitForm` action saves on the server, where it has full access, after running the checks above. So the website form is the only public way in.

A direct `POST /api/form-submissions` returns **403**. That's expected.

**What the public can see.** Forms can be read publicly, which the website needs. The notification email settings on a form are hidden from anyone not logged in, and the website only ever loads the fields it needs (see `PublicForm` in `forms.ts`).

## Caching

- `getFormBySlug` and `getFormById` are cached with Next.js `unstable_cache` under the tag `forms`, for up to 10 minutes.
- Saving or deleting a form in the admin runs a hook that clears that tag right away (`revalidateTagHooks(FORMS_TAG)` in the plugin setup), so edits show on the next page load.
- The server log prints `Revalidated cache tag "forms"` when this happens.

## Database: dev vs production

This part catches most people out, so it's worth reading once.

| | Dev (`npm run dev`) | Production (Docker / Coolify) |
|---|---|---|
| Schema changes | **Push mode:** Payload changes your dev database to match the config automatically, and may ask questions in the terminal | **Migrations:** files in `src/migrations/` run automatically on startup (`prodMigrations` in `payload.config.ts`) |
| Starter forms | `npm run seed:forms` | Created by the `form_builder` migration |

**Terminal questions in dev.** When the config changes, `npm run dev` may stop and ask something like *"Is `x` column created or renamed from another column?"*. Choose the **create** option unless you really renamed something. If it warns about data loss, check that nothing important is in the columns being removed. The dev server waits until you answer, and submissions hang in the meantime.

**When you need a migration.** Only for **schema** changes: enabling a field type, adding a setting to a block, or changing the Forms or Form Submissions collections. Creating or editing forms in the admin is just **data** and never needs a migration. To make one:

```bash
npm run payload migrate:create <short_name>   # writes src/migrations/<timestamp>_<short_name>.ts
npm run generate:types                         # updates src/payload-types.ts
```

Commit the migration together with the config change.

**Why the form pages render on each request.** The pages load their form from the database. The Docker build runs without a database, so these pages are marked `force-dynamic` and render on request instead of at build time. The form data is still cached (see [Caching](#caching)), so they stay fast.

## Email notifications

- Each form's **Emails** list in the admin sets who is notified. The starter forms notify **shreyanka.b@noveloffice.in**, with the visitor's address as *Reply-To*. That address is also the fallback (`defaultToEmail`) for forms whose email has no *To* address.
- Subjects and messages can contain placeholders: `{{name}}` inserts the `name` answer, and `{{*:table}}` inserts all answers as a table.
- **No email service is connected yet.** Payload writes each email to the server log instead of sending it. Submissions are still saved in the admin, which is enough for now.
- **To start sending real email**, add an email adapter to `payload.config.ts`, for example `@payloadcms/email-nodemailer` (SMTP) or `@payloadcms/email-resend`, and set a `defaultFromAddress`. No form changes are needed. Record this in the changelog when you do it.

## Current forms

| Slug | Page | Fields (* = required) | Notifies |
|---|---|---|---|
| `buy-a-home` | `/buy-a-home` | Name*, Phone, Email*, Message (1 row) | shreyanka.b@noveloffice.in |
| `trade-inquiry` | `/trade-inquiry` | Name*, Phone, Email*, Type of Business* (`businessType`), Message (optional, 8 rows) | shreyanka.b@noveloffice.in |
| `other-inquiries` | `/other-inquiries` | Name*, Phone, Email*, Message (1 row) | shreyanka.b@noveloffice.in |

All three are reached from the **Contact** dropdown in the header.

> This table shows what the seed creates. Editors can change forms in the admin, so check the admin for the live settings. If a change is permanent, update this table and the seed as well.

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| A form page shows **404** | No form with that slug in this database. Run `npm run seed:forms` (dev) or create it in the admin with the exact slug. |
| An admin edit isn't showing on the site | Look for `Revalidated cache tag "forms"` in the server log. If it's missing, the hook didn't run. It clears on its own within 10 minutes. |
| Submitting hangs forever in dev | The dev server is waiting for an answer to a schema question in its terminal. Answer it (see [Database](#database-dev-vs-production)). |
| "This form is unavailable" | The form was deleted or its ID changed while the page was open. Refresh. |
| No notification email arrives | Expected for now: no email service is connected, so emails are only logged. |
| `POST /api/form-submissions` returns 403 | Expected: direct API creation is blocked on purpose. |
| Code changes don't appear in `npm run dev` | Restart the dev server. Its file watcher can lose track of files edited by some tools (e.g. `sed -i`). |
| A Tailwind class has no effect on a `p`, `h2` or `a` | Global styles in `styles.css` win. Add `!` (e.g. `text-sm!`). |

## Keeping these docs current

These docs track everything done on forms. Whenever you change anything below, update them **in the same commit or PR**:

- Files listed in [Where everything lives](#where-everything-lives)
- Plugin settings, allowed field types, access rules or notification emails
- Starter forms (the seed) or form-related migrations

What to update:

| Change | Update |
|---|---|
| Anything at all | Add an entry to [CHANGELOG.md](./CHANGELOG.md) (newest on top) |
| How something works, or a new step | The matching section of this README |
| A choice between options (the "why") | A new entry in [DECISIONS.md](./DECISIONS.md) |
| Starter form fields or recipients | [Current forms](#current-forms) and `src/seed/contactForms.ts` |

Reminders are built in:
- The PR template (`.github/pull_request_template.md`) has a forms-docs checkbox.
- `CLAUDE.md` tells Claude Code to keep these docs updated.
- The key form files have a comment at the top pointing here.

## Glossary

| Term | Meaning |
|---|---|
| **Payload** | The CMS behind the site. Its admin panel is at `/admin`. |
| **Collection** | A type of content in Payload, like a database table (e.g. Forms, Form Submissions). |
| **Block** | One field inside a form in the admin (Text, Email, Textarea…). |
| **Slug** | A short, URL-friendly ID, e.g. `buy-a-home`. |
| **Server action** | A function marked `'use server'` that runs on the server but can be called straight from a `<form>`. |
| **Seed** | Code that creates starting data (here, the three contact forms). |
| **Migration** | A file that changes the production database structure in a controlled, versioned way. |
| **Push mode** | Dev-only: Payload changes the local database to match the config automatically. |
| **Honeypot** | A hidden field that only bots fill in, used to filter spam. |
| **Revalidate / cache tag** | Next.js caches data under a tag. Revalidating the tag throws away the cached copy. |
