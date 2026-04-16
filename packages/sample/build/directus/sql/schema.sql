-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Set comment to schema: "public"
COMMENT ON SCHEMA "public" IS 'standard public schema';
-- Add new schema named "tiger"
CREATE SCHEMA "tiger";
-- Add new schema named "topology"
CREATE SCHEMA "topology";
-- Set comment to schema: "topology"
COMMENT ON SCHEMA "topology" IS 'PostGIS Topology schema';
-- Create "directus_relations" table
CREATE TABLE "public"."directus_relations" (
  "id" serial NOT NULL,
  "many_collection" character varying(64) NOT NULL,
  "many_field" character varying(64) NOT NULL,
  "one_collection" character varying(64) NULL,
  "one_field" character varying(64) NULL,
  "one_collection_field" character varying(64) NULL,
  "one_allowed_collections" text NULL,
  "junction_field" character varying(64) NULL,
  "sort_field" character varying(64) NULL,
  "one_deselect_action" character varying(255) NOT NULL DEFAULT 'nullify',
  PRIMARY KEY ("id")
);
-- Create "directus_webhooks" table
CREATE TABLE "public"."directus_webhooks" (
  "id" serial NOT NULL,
  "name" character varying(255) NOT NULL,
  "method" character varying(10) NOT NULL DEFAULT 'POST',
  "url" character varying(255) NOT NULL,
  "status" character varying(10) NOT NULL DEFAULT 'active',
  "data" boolean NOT NULL DEFAULT true,
  "actions" character varying(100) NOT NULL,
  "collections" character varying(255) NOT NULL,
  "headers" json NULL,
  PRIMARY KEY ("id")
);
-- Create "directus_fields" table
CREATE TABLE "public"."directus_fields" (
  "id" serial NOT NULL,
  "collection" character varying(64) NOT NULL,
  "field" character varying(64) NOT NULL,
  "special" character varying(64) NULL,
  "interface" character varying(64) NULL,
  "options" json NULL,
  "display" character varying(64) NULL,
  "display_options" json NULL,
  "readonly" boolean NOT NULL DEFAULT false,
  "hidden" boolean NOT NULL DEFAULT false,
  "sort" integer NULL,
  "width" character varying(30) NULL DEFAULT 'full',
  "translations" json NULL,
  "note" text NULL,
  "conditions" json NULL,
  "required" boolean NULL DEFAULT false,
  "group" character varying(64) NULL,
  "validation" json NULL,
  "validation_message" text NULL,
  PRIMARY KEY ("id")
);
-- Create "directus_migrations" table
CREATE TABLE "public"."directus_migrations" (
  "version" character varying(255) NOT NULL,
  "name" character varying(255) NOT NULL,
  "timestamp" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("version")
);
-- Create "directus_roles" table
CREATE TABLE "public"."directus_roles" (
  "id" uuid NOT NULL,
  "name" character varying(100) NOT NULL,
  "icon" character varying(30) NOT NULL DEFAULT 'supervised_user_circle',
  "description" text NULL,
  "ip_access" text NULL,
  "enforce_tfa" boolean NOT NULL DEFAULT false,
  "admin_access" boolean NOT NULL DEFAULT false,
  "app_access" boolean NOT NULL DEFAULT true,
  PRIMARY KEY ("id")
);
-- Create "directus_users" table
CREATE TABLE "public"."directus_users" (
  "id" uuid NOT NULL,
  "first_name" character varying(50) NULL,
  "last_name" character varying(50) NULL,
  "email" character varying(128) NULL,
  "password" character varying(255) NULL,
  "location" character varying(255) NULL,
  "title" character varying(50) NULL,
  "description" text NULL,
  "tags" json NULL,
  "avatar" uuid NULL,
  "language" character varying(255) NULL DEFAULT NULL::character varying,
  "theme" character varying(20) NULL DEFAULT 'auto',
  "tfa_secret" character varying(255) NULL,
  "status" character varying(16) NOT NULL DEFAULT 'active',
  "role" uuid NULL,
  "token" character varying(255) NULL,
  "last_access" timestamptz NULL,
  "last_page" character varying(255) NULL,
  "provider" character varying(128) NOT NULL DEFAULT 'default',
  "external_identifier" character varying(255) NULL,
  "auth_data" json NULL,
  "email_notifications" boolean NULL DEFAULT true,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_users_email_unique" UNIQUE ("email"),
  CONSTRAINT "directus_users_external_identifier_unique" UNIQUE ("external_identifier"),
  CONSTRAINT "directus_users_token_unique" UNIQUE ("token"),
  CONSTRAINT "directus_users_role_foreign" FOREIGN KEY ("role") REFERENCES "public"."directus_roles" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);
-- Create "directus_dashboards" table
CREATE TABLE "public"."directus_dashboards" (
  "id" uuid NOT NULL,
  "name" character varying(255) NOT NULL,
  "icon" character varying(30) NOT NULL DEFAULT 'dashboard',
  "note" text NULL,
  "date_created" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  "user_created" uuid NULL,
  "color" character varying(255) NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_dashboards_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);
-- Create "directus_folders" table
CREATE TABLE "public"."directus_folders" (
  "id" uuid NOT NULL,
  "name" character varying(255) NOT NULL,
  "parent" uuid NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_folders_parent_foreign" FOREIGN KEY ("parent") REFERENCES "public"."directus_folders" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- Create "directus_files" table
CREATE TABLE "public"."directus_files" (
  "id" uuid NOT NULL,
  "storage" character varying(255) NOT NULL,
  "filename_disk" character varying(255) NULL,
  "filename_download" character varying(255) NOT NULL,
  "title" character varying(255) NULL,
  "type" character varying(255) NULL,
  "folder" uuid NULL,
  "uploaded_by" uuid NULL,
  "uploaded_on" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "modified_by" uuid NULL,
  "modified_on" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "charset" character varying(50) NULL,
  "filesize" bigint NULL,
  "width" integer NULL,
  "height" integer NULL,
  "duration" integer NULL,
  "embed" character varying(200) NULL,
  "description" text NULL,
  "location" text NULL,
  "tags" text NULL,
  "metadata" json NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_files_folder_foreign" FOREIGN KEY ("folder") REFERENCES "public"."directus_folders" ("id") ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT "directus_files_modified_by_foreign" FOREIGN KEY ("modified_by") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "directus_files_uploaded_by_foreign" FOREIGN KEY ("uploaded_by") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- Create "directus_flows" table
CREATE TABLE "public"."directus_flows" (
  "id" uuid NOT NULL,
  "name" character varying(255) NOT NULL,
  "icon" character varying(30) NULL,
  "color" character varying(255) NULL,
  "description" text NULL,
  "status" character varying(255) NOT NULL DEFAULT 'active',
  "trigger" character varying(255) NULL,
  "accountability" character varying(255) NULL DEFAULT 'all',
  "options" json NULL,
  "operation" uuid NULL,
  "date_created" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  "user_created" uuid NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_flows_operation_unique" UNIQUE ("operation"),
  CONSTRAINT "directus_flows_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);
-- Create "directus_notifications" table
CREATE TABLE "public"."directus_notifications" (
  "id" serial NOT NULL,
  "timestamp" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  "status" character varying(255) NULL DEFAULT 'inbox',
  "recipient" uuid NOT NULL,
  "sender" uuid NULL,
  "subject" character varying(255) NOT NULL,
  "message" text NULL,
  "collection" character varying(64) NULL,
  "item" character varying(255) NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_notifications_recipient_foreign" FOREIGN KEY ("recipient") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_notifications_sender_foreign" FOREIGN KEY ("sender") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- Create "directus_operations" table
CREATE TABLE "public"."directus_operations" (
  "id" uuid NOT NULL,
  "name" character varying(255) NULL,
  "key" character varying(255) NOT NULL,
  "type" character varying(255) NOT NULL,
  "position_x" integer NOT NULL,
  "position_y" integer NOT NULL,
  "options" json NULL,
  "resolve" uuid NULL,
  "reject" uuid NULL,
  "flow" uuid NOT NULL,
  "date_created" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  "user_created" uuid NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_operations_reject_unique" UNIQUE ("reject"),
  CONSTRAINT "directus_operations_resolve_unique" UNIQUE ("resolve"),
  CONSTRAINT "directus_operations_flow_foreign" FOREIGN KEY ("flow") REFERENCES "public"."directus_flows" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_operations_reject_foreign" FOREIGN KEY ("reject") REFERENCES "public"."directus_operations" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "directus_operations_resolve_foreign" FOREIGN KEY ("resolve") REFERENCES "public"."directus_operations" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "directus_operations_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);
-- Create "directus_panels" table
CREATE TABLE "public"."directus_panels" (
  "id" uuid NOT NULL,
  "dashboard" uuid NOT NULL,
  "name" character varying(255) NULL,
  "icon" character varying(30) NULL DEFAULT NULL::character varying,
  "color" character varying(10) NULL,
  "show_header" boolean NOT NULL DEFAULT false,
  "note" text NULL,
  "type" character varying(255) NOT NULL,
  "position_x" integer NOT NULL,
  "position_y" integer NOT NULL,
  "width" integer NOT NULL,
  "height" integer NOT NULL,
  "options" json NULL,
  "date_created" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  "user_created" uuid NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_panels_dashboard_foreign" FOREIGN KEY ("dashboard") REFERENCES "public"."directus_dashboards" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_panels_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);
-- Create "directus_permissions" table
CREATE TABLE "public"."directus_permissions" (
  "id" serial NOT NULL,
  "role" uuid NULL,
  "collection" character varying(64) NOT NULL,
  "action" character varying(10) NOT NULL,
  "permissions" json NULL,
  "validation" json NULL,
  "presets" json NULL,
  "fields" text NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_permissions_role_foreign" FOREIGN KEY ("role") REFERENCES "public"."directus_roles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "directus_presets" table
CREATE TABLE "public"."directus_presets" (
  "id" serial NOT NULL,
  "bookmark" character varying(255) NULL,
  "user" uuid NULL,
  "role" uuid NULL,
  "collection" character varying(64) NULL,
  "search" character varying(100) NULL,
  "layout" character varying(100) NULL DEFAULT 'tabular',
  "layout_query" json NULL,
  "layout_options" json NULL,
  "refresh_interval" integer NULL,
  "filter" json NULL,
  "icon" character varying(30) NULL DEFAULT 'bookmark',
  "color" character varying(255) NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_presets_role_foreign" FOREIGN KEY ("role") REFERENCES "public"."directus_roles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_presets_user_foreign" FOREIGN KEY ("user") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "directus_activity" table
CREATE TABLE "public"."directus_activity" (
  "id" serial NOT NULL,
  "action" character varying(45) NOT NULL,
  "user" uuid NULL,
  "timestamp" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ip" character varying(50) NULL,
  "user_agent" character varying(255) NULL,
  "collection" character varying(64) NOT NULL,
  "item" character varying(255) NOT NULL,
  "comment" text NULL,
  "origin" character varying(255) NULL,
  "session_id" character varying(64) NULL,
  PRIMARY KEY ("id")
);
-- Create "directus_revisions" table
CREATE TABLE "public"."directus_revisions" (
  "id" serial NOT NULL,
  "activity" integer NOT NULL,
  "collection" character varying(64) NOT NULL,
  "item" character varying(255) NOT NULL,
  "data" json NULL,
  "delta" json NULL,
  "parent" integer NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_revisions_activity_foreign" FOREIGN KEY ("activity") REFERENCES "public"."directus_activity" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_revisions_parent_foreign" FOREIGN KEY ("parent") REFERENCES "public"."directus_revisions" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- Create "directus_collections" table
CREATE TABLE "public"."directus_collections" (
  "collection" character varying(64) NOT NULL,
  "icon" character varying(30) NULL,
  "note" text NULL,
  "display_template" character varying(255) NULL,
  "hidden" boolean NOT NULL DEFAULT false,
  "singleton" boolean NOT NULL DEFAULT false,
  "translations" json NULL,
  "archive_field" character varying(64) NULL,
  "archive_app_filter" boolean NOT NULL DEFAULT true,
  "archive_value" character varying(255) NULL,
  "unarchive_value" character varying(255) NULL,
  "sort_field" character varying(64) NULL,
  "accountability" character varying(255) NULL DEFAULT 'all',
  "color" character varying(255) NULL,
  "item_duplication_fields" json NULL,
  "sort" integer NULL,
  "group" character varying(64) NULL,
  "collapse" character varying(255) NOT NULL DEFAULT 'open',
  PRIMARY KEY ("collection"),
  CONSTRAINT "directus_collections_group_foreign" FOREIGN KEY ("group") REFERENCES "public"."directus_collections" ("collection") ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- Create "directus_shares" table
CREATE TABLE "public"."directus_shares" (
  "id" uuid NOT NULL,
  "name" character varying(255) NULL,
  "collection" character varying(64) NULL,
  "item" character varying(255) NULL,
  "role" uuid NULL,
  "password" character varying(255) NULL,
  "user_created" uuid NULL,
  "date_created" timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
  "date_start" timestamptz NULL,
  "date_end" timestamptz NULL,
  "times_used" integer NULL DEFAULT 0,
  "max_uses" integer NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_shares_collection_foreign" FOREIGN KEY ("collection") REFERENCES "public"."directus_collections" ("collection") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_shares_role_foreign" FOREIGN KEY ("role") REFERENCES "public"."directus_roles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_shares_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);
-- Create "directus_sessions" table
CREATE TABLE "public"."directus_sessions" (
  "token" character varying(64) NOT NULL,
  "user" uuid NULL,
  "expires" timestamptz NOT NULL,
  "ip" character varying(255) NULL,
  "user_agent" character varying(255) NULL,
  "share" uuid NULL,
  "origin" character varying(255) NULL,
  "fallback_token" character varying(64) NULL,
  "session_id" character varying(64) NULL,
  PRIMARY KEY ("token"),
  CONSTRAINT "directus_sessions_share_foreign" FOREIGN KEY ("share") REFERENCES "public"."directus_shares" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT "directus_sessions_user_foreign" FOREIGN KEY ("user") REFERENCES "public"."directus_users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);
-- Create "directus_settings" table
CREATE TABLE "public"."directus_settings" (
  "id" serial NOT NULL,
  "project_name" character varying(100) NOT NULL DEFAULT 'Directus',
  "project_url" character varying(255) NULL,
  "project_color" character varying(50) NULL DEFAULT NULL::character varying,
  "project_logo" uuid NULL,
  "public_foreground" uuid NULL,
  "public_background" uuid NULL,
  "public_note" text NULL,
  "auth_login_attempts" integer NULL DEFAULT 25,
  "auth_password_policy" character varying(100) NULL,
  "storage_asset_transform" character varying(7) NULL DEFAULT 'all',
  "storage_asset_presets" json NULL,
  "custom_css" text NULL,
  "storage_default_folder" uuid NULL,
  "basemaps" json NULL,
  "mapbox_key" character varying(255) NULL,
  "module_bar" json NULL,
  "project_descriptor" character varying(100) NULL,
  "translation_strings" json NULL,
  "default_language" character varying(255) NOT NULL DEFAULT 'en-US',
  "custom_aspect_ratios" json NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "directus_settings_project_logo_foreign" FOREIGN KEY ("project_logo") REFERENCES "public"."directus_files" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "directus_settings_public_background_foreign" FOREIGN KEY ("public_background") REFERENCES "public"."directus_files" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "directus_settings_public_foreground_foreign" FOREIGN KEY ("public_foreground") REFERENCES "public"."directus_files" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "directus_settings_storage_default_folder_foreign" FOREIGN KEY ("storage_default_folder") REFERENCES "public"."directus_folders" ("id") ON UPDATE NO ACTION ON DELETE SET NULL
);
