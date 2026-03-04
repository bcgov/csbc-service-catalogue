import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_versions_eligibility_criteria_employment_values" AS ENUM('employed-full-time', 'employed-part-time', 'self-employed', 'unemployed');
  CREATE TYPE "public"."enum_versions_eligibility_criteria_housing_values" AS ENUM('home-owner', 'renter', 'subsidized-housing', 'temporary-accommodation', 'unhoused');
  CREATE TYPE "public"."enum_versions_eligibility_criteria_relationship_values" AS ENUM('married', 'common-law', 'separated', 'divorced', 'single');
  CREATE TYPE "public"."enum_versions_eligibility_criteria_residency_values" AS ENUM('citizen', 'permanent-resident', 'work-permit', 'student-permit', 'temporary-resident');
  CREATE TABLE "services_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "versions_blocks_form_online" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "versions_blocks_form_online_locales" (
  	"label" varchar,
  	"description" varchar,
  	"api_key" varchar,
  	"form_id" varchar,
  	"url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "versions_blocks_form_download" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "versions_blocks_form_download_locales" (
  	"label" varchar,
  	"description" varchar,
  	"url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "versions_resources_application_support" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "versions_resources_application_support_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "versions_resources_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "versions_resources_legal_locales" (
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "versions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" uuid
  );
  
  ALTER TABLE "versions_blocks_form_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "versions_blocks_form_locales" CASCADE;
  ALTER TABLE "versions_contact_methods_address" RENAME TO "versions_resources_contact_methods_address";
  ALTER TABLE "versions_contact_methods_address_locales" RENAME TO "versions_resources_contact_methods_address_locales";
  ALTER TABLE "versions_contact_methods_email" RENAME TO "versions_resources_contact_methods_email";
  ALTER TABLE "versions_contact_methods_email_locales" RENAME TO "versions_resources_contact_methods_email_locales";
  ALTER TABLE "versions_contact_methods_fax" RENAME TO "versions_resources_contact_methods_fax";
  ALTER TABLE "versions_contact_methods_fax_locales" RENAME TO "versions_resources_contact_methods_fax_locales";
  ALTER TABLE "versions_contact_methods_phone" RENAME TO "versions_resources_contact_methods_phone";
  ALTER TABLE "versions_contact_methods_phone_locales" RENAME TO "versions_resources_contact_methods_phone_locales";
  ALTER TABLE "versions_contact_methods_web" RENAME TO "versions_resources_contact_methods_web";
  ALTER TABLE "versions_contact_methods_web_locales" RENAME TO "versions_resources_contact_methods_web_locales";
  ALTER TABLE "versions_resources" RENAME TO "versions_resources_recommended_reading";
  ALTER TABLE "versions_resources_locales" RENAME TO "versions_resources_recommended_reading_locales";
  ALTER TABLE "versions_resources_contact_methods_address" DROP CONSTRAINT "versions_contact_methods_address_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_address_locales" DROP CONSTRAINT "versions_contact_methods_address_locales_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_email" DROP CONSTRAINT "versions_contact_methods_email_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_email_locales" DROP CONSTRAINT "versions_contact_methods_email_locales_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_fax" DROP CONSTRAINT "versions_contact_methods_fax_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_fax_locales" DROP CONSTRAINT "versions_contact_methods_fax_locales_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_phone" DROP CONSTRAINT "versions_contact_methods_phone_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_phone_locales" DROP CONSTRAINT "versions_contact_methods_phone_locales_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_web" DROP CONSTRAINT "versions_contact_methods_web_parent_id_fk";
  
  ALTER TABLE "versions_resources_contact_methods_web_locales" DROP CONSTRAINT "versions_contact_methods_web_locales_parent_id_fk";
  
  ALTER TABLE "versions_resources_recommended_reading" DROP CONSTRAINT "versions_resources_parent_id_fk";
  
  ALTER TABLE "versions_resources_recommended_reading_locales" DROP CONSTRAINT "versions_resources_locales_parent_id_fk";
  
  DROP INDEX "versions_contact_methods_address_order_idx";
  DROP INDEX "versions_contact_methods_address_parent_id_idx";
  DROP INDEX "versions_contact_methods_address_locales_locale_parent_id_un";
  DROP INDEX "versions_contact_methods_email_order_idx";
  DROP INDEX "versions_contact_methods_email_parent_id_idx";
  DROP INDEX "versions_contact_methods_email_locales_locale_parent_id_uniq";
  DROP INDEX "versions_contact_methods_fax_order_idx";
  DROP INDEX "versions_contact_methods_fax_parent_id_idx";
  DROP INDEX "versions_contact_methods_fax_locales_locale_parent_id_unique";
  DROP INDEX "versions_contact_methods_phone_order_idx";
  DROP INDEX "versions_contact_methods_phone_parent_id_idx";
  DROP INDEX "versions_contact_methods_phone_locales_locale_parent_id_uniq";
  DROP INDEX "versions_contact_methods_web_order_idx";
  DROP INDEX "versions_contact_methods_web_parent_id_idx";
  DROP INDEX "versions_contact_methods_web_locales_locale_parent_id_unique";
  DROP INDEX "versions_resources_order_idx";
  DROP INDEX "versions_resources_parent_id_idx";
  DROP INDEX "versions_resources_locales_locale_parent_id_unique";
  ALTER TABLE "versions_categories" ADD COLUMN "locale" "_locales" NOT NULL;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_age_values_min" numeric;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_age_values_max" numeric;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_employment_values" "enum_versions_eligibility_criteria_employment_values";
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_housing_values" "enum_versions_eligibility_criteria_housing_values";
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_income_household_min" numeric;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_income_household_max" numeric;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_income_personal_min" numeric;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_income_personal_max" numeric;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_relationship_values" "enum_versions_eligibility_criteria_relationship_values";
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_residency_values" "enum_versions_eligibility_criteria_residency_values";
  ALTER TABLE "versions_locales" ADD COLUMN "application_description" jsonb;
  ALTER TABLE "versions_locales" ADD COLUMN "eligibility_criteria_age_description" varchar;
  ALTER TABLE "versions_locales" ADD COLUMN "eligibility_criteria_employment_description" varchar;
  ALTER TABLE "versions_locales" ADD COLUMN "eligibility_criteria_housing_description" varchar;
  ALTER TABLE "versions_locales" ADD COLUMN "eligibility_criteria_income_description" varchar;
  ALTER TABLE "versions_locales" ADD COLUMN "eligibility_criteria_relationship_description" varchar;
  ALTER TABLE "versions_locales" ADD COLUMN "eligibility_criteria_residency_description" varchar;
  ALTER TABLE "services_texts" ADD CONSTRAINT "services_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_blocks_form_online" ADD CONSTRAINT "versions_blocks_form_online_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_blocks_form_online_locales" ADD CONSTRAINT "versions_blocks_form_online_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_blocks_form_online"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_blocks_form_download" ADD CONSTRAINT "versions_blocks_form_download_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_blocks_form_download_locales" ADD CONSTRAINT "versions_blocks_form_download_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_blocks_form_download"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_application_support" ADD CONSTRAINT "versions_resources_application_support_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_application_support_locales" ADD CONSTRAINT "versions_resources_application_support_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_application_support"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_legal" ADD CONSTRAINT "versions_resources_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_legal_locales" ADD CONSTRAINT "versions_resources_legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_rels" ADD CONSTRAINT "versions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_rels" ADD CONSTRAINT "versions_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_texts_order_parent" ON "services_texts" USING btree ("order","parent_id");
  CREATE INDEX "versions_blocks_form_online_order_idx" ON "versions_blocks_form_online" USING btree ("_order");
  CREATE INDEX "versions_blocks_form_online_parent_id_idx" ON "versions_blocks_form_online" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_blocks_form_online_locales_locale_parent_id_unique" ON "versions_blocks_form_online_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_blocks_form_download_order_idx" ON "versions_blocks_form_download" USING btree ("_order");
  CREATE INDEX "versions_blocks_form_download_parent_id_idx" ON "versions_blocks_form_download" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_blocks_form_download_locales_locale_parent_id_uniqu" ON "versions_blocks_form_download_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_application_support_order_idx" ON "versions_resources_application_support" USING btree ("_order");
  CREATE INDEX "versions_resources_application_support_parent_id_idx" ON "versions_resources_application_support" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_application_support_locales_locale_parent" ON "versions_resources_application_support_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_legal_order_idx" ON "versions_resources_legal" USING btree ("_order");
  CREATE INDEX "versions_resources_legal_parent_id_idx" ON "versions_resources_legal" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_legal_locales_locale_parent_id_unique" ON "versions_resources_legal_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_rels_order_idx" ON "versions_rels" USING btree ("order");
  CREATE INDEX "versions_rels_parent_idx" ON "versions_rels" USING btree ("parent_id");
  CREATE INDEX "versions_rels_path_idx" ON "versions_rels" USING btree ("path");
  CREATE INDEX "versions_rels_services_id_idx" ON "versions_rels" USING btree ("services_id");
  ALTER TABLE "versions_resources_contact_methods_address" ADD CONSTRAINT "versions_resources_contact_methods_address_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_address_locales" ADD CONSTRAINT "versions_resources_contact_methods_address_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_contact_methods_address"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_email" ADD CONSTRAINT "versions_resources_contact_methods_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_email_locales" ADD CONSTRAINT "versions_resources_contact_methods_email_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_contact_methods_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_fax" ADD CONSTRAINT "versions_resources_contact_methods_fax_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_fax_locales" ADD CONSTRAINT "versions_resources_contact_methods_fax_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_contact_methods_fax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_phone" ADD CONSTRAINT "versions_resources_contact_methods_phone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_phone_locales" ADD CONSTRAINT "versions_resources_contact_methods_phone_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_contact_methods_phone"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_web" ADD CONSTRAINT "versions_resources_contact_methods_web_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_contact_methods_web_locales" ADD CONSTRAINT "versions_resources_contact_methods_web_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_contact_methods_web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_recommended_reading" ADD CONSTRAINT "versions_resources_recommended_reading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_recommended_reading_locales" ADD CONSTRAINT "versions_resources_recommended_reading_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources_recommended_reading"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "versions_categories_locale_idx" ON "versions_categories" USING btree ("locale");
  CREATE INDEX "versions_resources_contact_methods_address_order_idx" ON "versions_resources_contact_methods_address" USING btree ("_order");
  CREATE INDEX "versions_resources_contact_methods_address_parent_id_idx" ON "versions_resources_contact_methods_address" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_contact_methods_address_locales_locale_pa" ON "versions_resources_contact_methods_address_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_contact_methods_email_order_idx" ON "versions_resources_contact_methods_email" USING btree ("_order");
  CREATE INDEX "versions_resources_contact_methods_email_parent_id_idx" ON "versions_resources_contact_methods_email" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_contact_methods_email_locales_locale_pare" ON "versions_resources_contact_methods_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_contact_methods_fax_order_idx" ON "versions_resources_contact_methods_fax" USING btree ("_order");
  CREATE INDEX "versions_resources_contact_methods_fax_parent_id_idx" ON "versions_resources_contact_methods_fax" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_contact_methods_fax_locales_locale_parent" ON "versions_resources_contact_methods_fax_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_contact_methods_phone_order_idx" ON "versions_resources_contact_methods_phone" USING btree ("_order");
  CREATE INDEX "versions_resources_contact_methods_phone_parent_id_idx" ON "versions_resources_contact_methods_phone" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_contact_methods_phone_locales_locale_pare" ON "versions_resources_contact_methods_phone_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_contact_methods_web_order_idx" ON "versions_resources_contact_methods_web" USING btree ("_order");
  CREATE INDEX "versions_resources_contact_methods_web_parent_id_idx" ON "versions_resources_contact_methods_web" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_contact_methods_web_locales_locale_parent" ON "versions_resources_contact_methods_web_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_recommended_reading_order_idx" ON "versions_resources_recommended_reading" USING btree ("_order");
  CREATE INDEX "versions_resources_recommended_reading_parent_id_idx" ON "versions_resources_recommended_reading" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_recommended_reading_locales_locale_parent" ON "versions_resources_recommended_reading_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "versions_blocks_form_locales" (
  	"label" varchar,
  	"description" varchar,
  	"api_key" varchar,
  	"form_id" varchar,
  	"url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "services_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_blocks_form_online" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_blocks_form_online_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_blocks_form_download" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_blocks_form_download_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_resources_application_support" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_resources_application_support_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_resources_legal" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_resources_legal_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "versions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_texts" CASCADE;
  DROP TABLE "versions_blocks_form_online" CASCADE;
  DROP TABLE "versions_blocks_form_online_locales" CASCADE;
  DROP TABLE "versions_blocks_form_download" CASCADE;
  DROP TABLE "versions_blocks_form_download_locales" CASCADE;
  DROP TABLE "versions_resources_application_support" CASCADE;
  DROP TABLE "versions_resources_application_support_locales" CASCADE;
  DROP TABLE "versions_resources_legal" CASCADE;
  DROP TABLE "versions_resources_legal_locales" CASCADE;
  DROP TABLE "versions_rels" CASCADE;
  ALTER TABLE "versions_resources_contact_methods_address" RENAME TO "versions_contact_methods_address";
  ALTER TABLE "versions_resources_contact_methods_address_locales" RENAME TO "versions_contact_methods_address_locales";
  ALTER TABLE "versions_resources_contact_methods_email" RENAME TO "versions_contact_methods_email";
  ALTER TABLE "versions_resources_contact_methods_email_locales" RENAME TO "versions_contact_methods_email_locales";
  ALTER TABLE "versions_resources_contact_methods_fax" RENAME TO "versions_contact_methods_fax";
  ALTER TABLE "versions_resources_contact_methods_fax_locales" RENAME TO "versions_contact_methods_fax_locales";
  ALTER TABLE "versions_resources_contact_methods_phone" RENAME TO "versions_contact_methods_phone";
  ALTER TABLE "versions_resources_contact_methods_phone_locales" RENAME TO "versions_contact_methods_phone_locales";
  ALTER TABLE "versions_resources_contact_methods_web" RENAME TO "versions_contact_methods_web";
  ALTER TABLE "versions_resources_contact_methods_web_locales" RENAME TO "versions_contact_methods_web_locales";
  ALTER TABLE "versions_resources_recommended_reading" RENAME TO "versions_resources";
  ALTER TABLE "versions_resources_recommended_reading_locales" RENAME TO "versions_resources_locales";
  ALTER TABLE "versions_contact_methods_address" DROP CONSTRAINT "versions_resources_contact_methods_address_parent_id_fk";
  
  ALTER TABLE "versions_contact_methods_address_locales" DROP CONSTRAINT "versions_resources_contact_methods_address_locales_parent_fk";
  
  ALTER TABLE "versions_contact_methods_email" DROP CONSTRAINT "versions_resources_contact_methods_email_parent_id_fk";
  
  ALTER TABLE "versions_contact_methods_email_locales" DROP CONSTRAINT "versions_resources_contact_methods_email_locales_parent_i_fk";
  
  ALTER TABLE "versions_contact_methods_fax" DROP CONSTRAINT "versions_resources_contact_methods_fax_parent_id_fk";
  
  ALTER TABLE "versions_contact_methods_fax_locales" DROP CONSTRAINT "versions_resources_contact_methods_fax_locales_parent_id_fk";
  
  ALTER TABLE "versions_contact_methods_phone" DROP CONSTRAINT "versions_resources_contact_methods_phone_parent_id_fk";
  
  ALTER TABLE "versions_contact_methods_phone_locales" DROP CONSTRAINT "versions_resources_contact_methods_phone_locales_parent_i_fk";
  
  ALTER TABLE "versions_contact_methods_web" DROP CONSTRAINT "versions_resources_contact_methods_web_parent_id_fk";
  
  ALTER TABLE "versions_contact_methods_web_locales" DROP CONSTRAINT "versions_resources_contact_methods_web_locales_parent_id_fk";
  
  ALTER TABLE "versions_resources" DROP CONSTRAINT "versions_resources_recommended_reading_parent_id_fk";
  
  ALTER TABLE "versions_resources_locales" DROP CONSTRAINT "versions_resources_recommended_reading_locales_parent_id_fk";
  
  DROP INDEX "versions_categories_locale_idx";
  DROP INDEX "versions_resources_contact_methods_address_order_idx";
  DROP INDEX "versions_resources_contact_methods_address_parent_id_idx";
  DROP INDEX "versions_resources_contact_methods_address_locales_locale_pa";
  DROP INDEX "versions_resources_contact_methods_email_order_idx";
  DROP INDEX "versions_resources_contact_methods_email_parent_id_idx";
  DROP INDEX "versions_resources_contact_methods_email_locales_locale_pare";
  DROP INDEX "versions_resources_contact_methods_fax_order_idx";
  DROP INDEX "versions_resources_contact_methods_fax_parent_id_idx";
  DROP INDEX "versions_resources_contact_methods_fax_locales_locale_parent";
  DROP INDEX "versions_resources_contact_methods_phone_order_idx";
  DROP INDEX "versions_resources_contact_methods_phone_parent_id_idx";
  DROP INDEX "versions_resources_contact_methods_phone_locales_locale_pare";
  DROP INDEX "versions_resources_contact_methods_web_order_idx";
  DROP INDEX "versions_resources_contact_methods_web_parent_id_idx";
  DROP INDEX "versions_resources_contact_methods_web_locales_locale_parent";
  DROP INDEX "versions_resources_recommended_reading_order_idx";
  DROP INDEX "versions_resources_recommended_reading_parent_id_idx";
  DROP INDEX "versions_resources_recommended_reading_locales_locale_parent";
  ALTER TABLE "versions_blocks_form_locales" ADD CONSTRAINT "versions_blocks_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_blocks_form"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "versions_blocks_form_locales_locale_parent_id_unique" ON "versions_blocks_form_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "versions_contact_methods_address" ADD CONSTRAINT "versions_contact_methods_address_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_address_locales" ADD CONSTRAINT "versions_contact_methods_address_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_contact_methods_address"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_email" ADD CONSTRAINT "versions_contact_methods_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_email_locales" ADD CONSTRAINT "versions_contact_methods_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_contact_methods_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_fax" ADD CONSTRAINT "versions_contact_methods_fax_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_fax_locales" ADD CONSTRAINT "versions_contact_methods_fax_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_contact_methods_fax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_phone" ADD CONSTRAINT "versions_contact_methods_phone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_phone_locales" ADD CONSTRAINT "versions_contact_methods_phone_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_contact_methods_phone"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_web" ADD CONSTRAINT "versions_contact_methods_web_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_web_locales" ADD CONSTRAINT "versions_contact_methods_web_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_contact_methods_web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources" ADD CONSTRAINT "versions_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources_locales" ADD CONSTRAINT "versions_resources_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions_resources"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "versions_contact_methods_address_order_idx" ON "versions_contact_methods_address" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_address_parent_id_idx" ON "versions_contact_methods_address" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_contact_methods_address_locales_locale_parent_id_un" ON "versions_contact_methods_address_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_contact_methods_email_order_idx" ON "versions_contact_methods_email" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_email_parent_id_idx" ON "versions_contact_methods_email" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_contact_methods_email_locales_locale_parent_id_uniq" ON "versions_contact_methods_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_contact_methods_fax_order_idx" ON "versions_contact_methods_fax" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_fax_parent_id_idx" ON "versions_contact_methods_fax" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_contact_methods_fax_locales_locale_parent_id_unique" ON "versions_contact_methods_fax_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_contact_methods_phone_order_idx" ON "versions_contact_methods_phone" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_phone_parent_id_idx" ON "versions_contact_methods_phone" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_contact_methods_phone_locales_locale_parent_id_uniq" ON "versions_contact_methods_phone_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_contact_methods_web_order_idx" ON "versions_contact_methods_web" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_web_parent_id_idx" ON "versions_contact_methods_web" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_contact_methods_web_locales_locale_parent_id_unique" ON "versions_contact_methods_web_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "versions_resources_order_idx" ON "versions_resources" USING btree ("_order");
  CREATE INDEX "versions_resources_parent_id_idx" ON "versions_resources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "versions_resources_locales_locale_parent_id_unique" ON "versions_resources_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "versions_categories" DROP COLUMN "locale";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_age_values_min";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_age_values_max";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_employment_values";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_housing_values";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_income_household_min";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_income_household_max";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_income_personal_min";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_income_personal_max";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_relationship_values";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_residency_values";
  ALTER TABLE "versions_locales" DROP COLUMN "application_description";
  ALTER TABLE "versions_locales" DROP COLUMN "eligibility_criteria_age_description";
  ALTER TABLE "versions_locales" DROP COLUMN "eligibility_criteria_employment_description";
  ALTER TABLE "versions_locales" DROP COLUMN "eligibility_criteria_housing_description";
  ALTER TABLE "versions_locales" DROP COLUMN "eligibility_criteria_income_description";
  ALTER TABLE "versions_locales" DROP COLUMN "eligibility_criteria_relationship_description";
  ALTER TABLE "versions_locales" DROP COLUMN "eligibility_criteria_residency_description";
  DROP TYPE "public"."enum_versions_eligibility_criteria_employment_values";
  DROP TYPE "public"."enum_versions_eligibility_criteria_housing_values";
  DROP TYPE "public"."enum_versions_eligibility_criteria_relationship_values";
  DROP TYPE "public"."enum_versions_eligibility_criteria_residency_values";`)
}
