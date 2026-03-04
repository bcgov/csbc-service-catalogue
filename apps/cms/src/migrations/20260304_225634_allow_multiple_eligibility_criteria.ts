import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "versions_eligibility_criteria_employment_values" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_versions_eligibility_criteria_employment_values",
  	"locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "versions_eligibility_criteria_housing_values" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_versions_eligibility_criteria_housing_values",
  	"locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "versions_eligibility_criteria_relationship_values" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_versions_eligibility_criteria_relationship_values",
  	"locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "versions_eligibility_criteria_residency_values" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_versions_eligibility_criteria_residency_values",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  ALTER TABLE "versions_eligibility_criteria_employment_values" ADD CONSTRAINT "versions_eligibility_criteria_employment_values_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_eligibility_criteria_housing_values" ADD CONSTRAINT "versions_eligibility_criteria_housing_values_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_eligibility_criteria_relationship_values" ADD CONSTRAINT "versions_eligibility_criteria_relationship_values_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_eligibility_criteria_residency_values" ADD CONSTRAINT "versions_eligibility_criteria_residency_values_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "versions_eligibility_criteria_employment_values_order_idx" ON "versions_eligibility_criteria_employment_values" USING btree ("order");
  CREATE INDEX "versions_eligibility_criteria_employment_values_parent_idx" ON "versions_eligibility_criteria_employment_values" USING btree ("parent_id");
  CREATE INDEX "versions_eligibility_criteria_employment_values_locale_idx" ON "versions_eligibility_criteria_employment_values" USING btree ("locale");
  CREATE INDEX "versions_eligibility_criteria_housing_values_order_idx" ON "versions_eligibility_criteria_housing_values" USING btree ("order");
  CREATE INDEX "versions_eligibility_criteria_housing_values_parent_idx" ON "versions_eligibility_criteria_housing_values" USING btree ("parent_id");
  CREATE INDEX "versions_eligibility_criteria_housing_values_locale_idx" ON "versions_eligibility_criteria_housing_values" USING btree ("locale");
  CREATE INDEX "versions_eligibility_criteria_relationship_values_order_idx" ON "versions_eligibility_criteria_relationship_values" USING btree ("order");
  CREATE INDEX "versions_eligibility_criteria_relationship_values_parent_idx" ON "versions_eligibility_criteria_relationship_values" USING btree ("parent_id");
  CREATE INDEX "versions_eligibility_criteria_relationship_values_locale_idx" ON "versions_eligibility_criteria_relationship_values" USING btree ("locale");
  CREATE INDEX "versions_eligibility_criteria_residency_values_order_idx" ON "versions_eligibility_criteria_residency_values" USING btree ("order");
  CREATE INDEX "versions_eligibility_criteria_residency_values_parent_idx" ON "versions_eligibility_criteria_residency_values" USING btree ("parent_id");
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_employment_values";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_housing_values";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_relationship_values";
  ALTER TABLE "versions" DROP COLUMN "eligibility_criteria_residency_values";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "versions_eligibility_criteria_employment_values" CASCADE;
  DROP TABLE "versions_eligibility_criteria_housing_values" CASCADE;
  DROP TABLE "versions_eligibility_criteria_relationship_values" CASCADE;
  DROP TABLE "versions_eligibility_criteria_residency_values" CASCADE;
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_employment_values" "enum_versions_eligibility_criteria_employment_values";
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_housing_values" "enum_versions_eligibility_criteria_housing_values";
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_relationship_values" "enum_versions_eligibility_criteria_relationship_values";
  ALTER TABLE "versions" ADD COLUMN "eligibility_criteria_residency_values" "enum_versions_eligibility_criteria_residency_values";`)
}
