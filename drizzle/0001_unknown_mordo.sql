ALTER TABLE "workflows" ADD COLUMN "org_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "workflows" ADD COLUMN "graph" jsonb;