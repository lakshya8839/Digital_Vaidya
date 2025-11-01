import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const spots = pgTable("spots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  label: text("label").notNull(),
  category: text("category").notNull(),
  bodyRegion: text("body_region").notNull(),
  positionX: real("position_x").notNull(),
  positionY: real("position_y").notNull(),
  positionZ: real("position_z").notNull(),
  normalX: real("normal_x"),
  normalY: real("normal_y"),
  normalZ: real("normal_z"),
  color: text("color").notNull().default("#ef4444"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSpotSchema = createInsertSchema(spots).omit({
  id: true,
  createdAt: true,
});

export type InsertSpot = z.infer<typeof insertSpotSchema>;
export type Spot = typeof spots.$inferSelect;

export const SPOT_CATEGORIES = [
  "Mole",
  "Birthmark", 
  "Scar",
  "Rash",
  "Lesion",
  "Freckle",
  "Other"
] as const;

export const BODY_REGIONS = [
  "Head",
  "Neck",
  "Chest",
  "Abdomen",
  "Back",
  "Left Arm",
  "Right Arm",
  "Left Hand",
  "Right Hand",
  "Left Leg",
  "Right Leg",
  "Left Foot",
  "Right Foot"
] as const;
