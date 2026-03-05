import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_versions_processing_time_values_min_unit" AS ENUM('minutes', 'hours', 'days', 'weeks', 'months', 'years');
  CREATE TYPE "public"."enum_versions_processing_time_values_max_unit" AS ENUM('minutes', 'hours', 'days', 'weeks', 'months', 'years');
  CREATE TABLE "versions_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "versions_products_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"price" numeric NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "versions" ADD COLUMN "processing_time_values_min_value" numeric;
  ALTER TABLE "versions" ADD COLUMN "processing_time_values_min_unit" "enum_versions_processing_time_values_min_unit";
  ALTER TABLE "versions" ADD COLUMN "processing_time_values_max_value" numeric;
  ALTER TABLE "versions" ADD COLUMN "processing_time_values_max_unit" "enum_versions_processing_time_values_max_unit";
  ALTER TABLE "versions_products" ADD CONSTRAINT "versions_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_products_locales" ADD CONSTRAINT "versions_products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "versions_products_order_idx" ON "versions_products" USING btree ("_order");
  CREATE INDEX "versions_products_parent_id_idx" ON "versions_products" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_products_locales_locale_parent_id_unique" ON "versions_products_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "versions_products" CASCADE;
  DROP TABLE "versions_products_locales" CASCADE;
  ALTER TABLE "versions" DROP COLUMN "processing_time_values_min_value";
  ALTER TABLE "versions" DROP COLUMN "processing_time_values_min_unit";
  ALTER TABLE "versions" DROP COLUMN "processing_time_values_max_value";
  ALTER TABLE "versions" DROP COLUMN "processing_time_values_max_unit";
  DROP TYPE "public"."enum_versions_processing_time_values_min_unit";
  DROP TYPE "public"."enum_versions_processing_time_values_max_unit";`)
}
