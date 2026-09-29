import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"filename" varchar,
  	"size_bytes" numeric,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "site_migrations_id" integer;
  CREATE INDEX "site_migrations_updated_at_idx" ON "site_migrations" USING btree ("updated_at");
  CREATE INDEX "site_migrations_created_at_idx" ON "site_migrations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_migrations_fk" FOREIGN KEY ("site_migrations_id") REFERENCES "public"."site_migrations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_site_migrations_id_idx" ON "payload_locked_documents_rels" USING btree ("site_migrations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_migrations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_migrations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_site_migrations_fk";
  
  DROP INDEX "payload_locked_documents_rels_site_migrations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "site_migrations_id";`)
}
