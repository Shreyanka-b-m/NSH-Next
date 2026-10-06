import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_seo_page" AS ENUM('home', 'about', 'concierge', 'properties', 'buy-a-home', 'trade-inquiry', 'other-inquiries', 'privacy-policy', 'terms-and-conditions', 'cookie-policy');
  CREATE TABLE "page_seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page" "enum_page_seo_page" NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "page_seo_id" integer;
  ALTER TABLE "page_seo" ADD CONSTRAINT "page_seo_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "page_seo_page_idx" ON "page_seo" USING btree ("page");
  CREATE INDEX "page_seo_meta_meta_image_idx" ON "page_seo" USING btree ("meta_image_id");
  CREATE INDEX "page_seo_updated_at_idx" ON "page_seo" USING btree ("updated_at");
  CREATE INDEX "page_seo_created_at_idx" ON "page_seo" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_seo_fk" FOREIGN KEY ("page_seo_id") REFERENCES "public"."page_seo"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_page_seo_id_idx" ON "payload_locked_documents_rels" USING btree ("page_seo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_seo" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_seo" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_page_seo_fk";
  
  DROP INDEX "payload_locked_documents_rels_page_seo_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "page_seo_id";
  DROP TYPE "public"."enum_page_seo_page";`)
}
