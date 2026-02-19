import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_versions_categories" AS ENUM('culture', 'education', 'employment', 'family', 'financial', 'health', 'housing', 'legal', 'personal', 'social');
  CREATE TYPE "public"."enum_versions_blocks_workflow_method" AS ENUM('GET', 'POST');
  CREATE TYPE "public"."enum_versions_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_contributors_role" AS ENUM('owner', 'editor', 'viewer');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'user');
  CREATE TABLE "services_settings_consent" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"organization_id" varchar,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"description" varchar,
  	"published_version_id" uuid,
  	"settings_delegate_access" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "versions_categories" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_versions_categories",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "versions_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"api_key" varchar,
  	"form_id" varchar,
  	"url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "versions_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "versions_blocks_workflow" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"method" "enum_versions_blocks_workflow_method",
  	"url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "versions_contact_methods_address" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"address_one" varchar NOT NULL,
  	"address_two" varchar,
  	"city" varchar NOT NULL,
  	"province" varchar NOT NULL,
  	"country" varchar NOT NULL
  );
  
  CREATE TABLE "versions_contact_methods_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "versions_contact_methods_fax" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "versions_contact_methods_phone" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "versions_contact_methods_web" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "versions_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "versions_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "versions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"service_id" uuid NOT NULL,
  	"status" "enum_versions_status" DEFAULT 'draft',
  	"version" numeric,
  	"description_short" varchar,
  	"description_long" varchar,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"archived_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contributors" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"service_id" uuid NOT NULL,
  	"user_id" varchar NOT NULL,
  	"role" "enum_contributors_role" DEFAULT 'viewer' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'user' NOT NULL,
  	"full_name" varchar,
  	"first_name" varchar,
  	"last_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" uuid,
  	"versions_id" uuid,
  	"contributors_id" uuid,
  	"users_id" varchar
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" varchar
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "services_settings_consent" ADD CONSTRAINT "services_settings_consent_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_published_version_id_versions_id_fk" FOREIGN KEY ("published_version_id") REFERENCES "public"."versions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "versions_categories" ADD CONSTRAINT "versions_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_blocks_form" ADD CONSTRAINT "versions_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_blocks_link" ADD CONSTRAINT "versions_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_blocks_workflow" ADD CONSTRAINT "versions_blocks_workflow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_address" ADD CONSTRAINT "versions_contact_methods_address_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_email" ADD CONSTRAINT "versions_contact_methods_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_fax" ADD CONSTRAINT "versions_contact_methods_fax_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_phone" ADD CONSTRAINT "versions_contact_methods_phone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_contact_methods_web" ADD CONSTRAINT "versions_contact_methods_web_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_faq" ADD CONSTRAINT "versions_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions_resources" ADD CONSTRAINT "versions_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "versions" ADD CONSTRAINT "versions_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contributors" ADD CONSTRAINT "contributors_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contributors" ADD CONSTRAINT "contributors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_versions_fk" FOREIGN KEY ("versions_id") REFERENCES "public"."versions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contributors_fk" FOREIGN KEY ("contributors_id") REFERENCES "public"."contributors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_settings_consent_order_idx" ON "services_settings_consent" USING btree ("_order");
  CREATE INDEX "services_settings_consent_parent_id_idx" ON "services_settings_consent" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_published_version_idx" ON "services" USING btree ("published_version_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "versions_categories_order_idx" ON "versions_categories" USING btree ("order");
  CREATE INDEX "versions_categories_parent_idx" ON "versions_categories" USING btree ("parent_id");
  CREATE INDEX "versions_blocks_form_order_idx" ON "versions_blocks_form" USING btree ("_order");
  CREATE INDEX "versions_blocks_form_parent_id_idx" ON "versions_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "versions_blocks_form_path_idx" ON "versions_blocks_form" USING btree ("_path");
  CREATE INDEX "versions_blocks_link_order_idx" ON "versions_blocks_link" USING btree ("_order");
  CREATE INDEX "versions_blocks_link_parent_id_idx" ON "versions_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "versions_blocks_link_path_idx" ON "versions_blocks_link" USING btree ("_path");
  CREATE INDEX "versions_blocks_workflow_order_idx" ON "versions_blocks_workflow" USING btree ("_order");
  CREATE INDEX "versions_blocks_workflow_parent_id_idx" ON "versions_blocks_workflow" USING btree ("_parent_id");
  CREATE INDEX "versions_blocks_workflow_path_idx" ON "versions_blocks_workflow" USING btree ("_path");
  CREATE INDEX "versions_contact_methods_address_order_idx" ON "versions_contact_methods_address" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_address_parent_id_idx" ON "versions_contact_methods_address" USING btree ("_parent_id");
  CREATE INDEX "versions_contact_methods_email_order_idx" ON "versions_contact_methods_email" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_email_parent_id_idx" ON "versions_contact_methods_email" USING btree ("_parent_id");
  CREATE INDEX "versions_contact_methods_fax_order_idx" ON "versions_contact_methods_fax" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_fax_parent_id_idx" ON "versions_contact_methods_fax" USING btree ("_parent_id");
  CREATE INDEX "versions_contact_methods_phone_order_idx" ON "versions_contact_methods_phone" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_phone_parent_id_idx" ON "versions_contact_methods_phone" USING btree ("_parent_id");
  CREATE INDEX "versions_contact_methods_web_order_idx" ON "versions_contact_methods_web" USING btree ("_order");
  CREATE INDEX "versions_contact_methods_web_parent_id_idx" ON "versions_contact_methods_web" USING btree ("_parent_id");
  CREATE INDEX "versions_faq_order_idx" ON "versions_faq" USING btree ("_order");
  CREATE INDEX "versions_faq_parent_id_idx" ON "versions_faq" USING btree ("_parent_id");
  CREATE INDEX "versions_resources_order_idx" ON "versions_resources" USING btree ("_order");
  CREATE INDEX "versions_resources_parent_id_idx" ON "versions_resources" USING btree ("_parent_id");
  CREATE INDEX "versions_service_idx" ON "versions" USING btree ("service_id");
  CREATE INDEX "versions_updated_at_idx" ON "versions" USING btree ("updated_at");
  CREATE INDEX "versions_created_at_idx" ON "versions" USING btree ("created_at");
  CREATE INDEX "contributors_service_idx" ON "contributors" USING btree ("service_id");
  CREATE INDEX "contributors_user_idx" ON "contributors" USING btree ("user_id");
  CREATE INDEX "contributors_updated_at_idx" ON "contributors" USING btree ("updated_at");
  CREATE INDEX "contributors_created_at_idx" ON "contributors" USING btree ("created_at");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_versions_id_idx" ON "payload_locked_documents_rels" USING btree ("versions_id");
  CREATE INDEX "payload_locked_documents_rels_contributors_id_idx" ON "payload_locked_documents_rels" USING btree ("contributors_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_settings_consent" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "versions_categories" CASCADE;
  DROP TABLE "versions_blocks_form" CASCADE;
  DROP TABLE "versions_blocks_link" CASCADE;
  DROP TABLE "versions_blocks_workflow" CASCADE;
  DROP TABLE "versions_contact_methods_address" CASCADE;
  DROP TABLE "versions_contact_methods_email" CASCADE;
  DROP TABLE "versions_contact_methods_fax" CASCADE;
  DROP TABLE "versions_contact_methods_phone" CASCADE;
  DROP TABLE "versions_contact_methods_web" CASCADE;
  DROP TABLE "versions_faq" CASCADE;
  DROP TABLE "versions_resources" CASCADE;
  DROP TABLE "versions" CASCADE;
  DROP TABLE "contributors" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_versions_categories";
  DROP TYPE "public"."enum_versions_blocks_workflow_method";
  DROP TYPE "public"."enum_versions_status";
  DROP TYPE "public"."enum_contributors_role";
  DROP TYPE "public"."enum_users_role";`)
}
