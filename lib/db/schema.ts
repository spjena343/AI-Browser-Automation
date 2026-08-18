import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const workflows = pgTable("workflows", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: varchar("org_id", { length: 255 }).notNull(),
  graph: jsonb("graph"),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Workflow = typeof workflows.$inferSelect;
