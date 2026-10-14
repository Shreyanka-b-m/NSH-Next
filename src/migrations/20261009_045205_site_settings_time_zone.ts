import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_time_zone" AS ENUM('America/Chicago', 'Asia/Kolkata');
  ALTER TABLE "site_settings" ADD COLUMN "time_zone" "enum_site_settings_time_zone" DEFAULT 'America/Chicago' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "time_zone";
  DROP TYPE "public"."enum_site_settings_time_zone";`)
}
