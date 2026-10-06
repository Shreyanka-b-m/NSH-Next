import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "properties" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "properties" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "properties" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "properties" ADD CONSTRAINT "properties_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "properties_meta_meta_image_idx" ON "properties" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "properties" DROP CONSTRAINT "properties_meta_image_id_media_id_fk";
  
  DROP INDEX "properties_meta_meta_image_idx";
  ALTER TABLE "properties" DROP COLUMN "meta_title";
  ALTER TABLE "properties" DROP COLUMN "meta_description";
  ALTER TABLE "properties" DROP COLUMN "meta_image_id";`)
}
