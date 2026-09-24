// Usage: npm run seed:forms — creates the contact forms in the database from .env (skips existing).
import { getPayload } from 'payload'
import config from '../payload.config'
import { seedContactForms } from '../seed/contactForms'

const payload = await getPayload({ config })
await seedContactForms(payload)
process.exit(0)
