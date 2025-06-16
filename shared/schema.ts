import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users/Creators table
export const creators = pgTable("creators", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  socials: json("socials").$type<{
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  }>(),
  emailCaptureEnabled: boolean("email_capture_enabled").default(false),
  isPremium: boolean("is_premium").default(false),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  link: text("link").notNull(),
  tags: json("tags").$type<string[]>().default([]),
  status: text("status").$type<"draft" | "submitted" | "approved" | "rejected">().default("draft"),
  isFeatured: boolean("is_featured").default(false),
  submittedAt: timestamp("submitted_at"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Resources table (Premium content)
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  link: text("link").notNull(),
  type: text("type").$type<"PDF" | "Notion" | "Tool" | "Guide">().notNull(),
  visibleTo: text("visible_to").$type<"free" | "premium">().default("free"),
  tags: json("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tags table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  type: text("type").$type<"product" | "resource">().default("product"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Email submissions table (for lead capture)
export const emailSubmissions = pgTable("email_submissions", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull(),
  email: text("email").notNull(),
  source: text("source").default("profile"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const creatorsRelations = relations(creators, ({ many }) => ({
  products: many(products),
  emailSubmissions: many(emailSubmissions),
}));

export const productsRelations = relations(products, ({ one }) => ({
  creator: one(creators, {
    fields: [products.creatorId],
    references: [creators.id],
  }),
}));

export const emailSubmissionsRelations = relations(emailSubmissions, ({ one }) => ({
  creator: one(creators, {
    fields: [emailSubmissions.creatorId],
    references: [creators.id],
  }),
}));

// Insert schemas
export const insertCreatorSchema = createInsertSchema(creators).pick({
  email: true,
  username: true,
  name: true,
  avatarUrl: true,
  bio: true,
  socials: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  creatorId: true,
  title: true,
  description: true,
  link: true,
  tags: true,
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  link: true,
  type: true,
  visibleTo: true,
  tags: true,
});

export const insertTagSchema = createInsertSchema(tags).pick({
  name: true,
  slug: true,
  type: true,
});

export const insertEmailSubmissionSchema = createInsertSchema(emailSubmissions).pick({
  creatorId: true,
  email: true,
  source: true,
});

// Types
export type Creator = typeof creators.$inferSelect;
export type InsertCreator = z.infer<typeof insertCreatorSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Tag = typeof tags.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;
export type EmailSubmission = typeof emailSubmissions.$inferSelect;
export type InsertEmailSubmission = z.infer<typeof insertEmailSubmissionSchema>;

// Keep legacy users table for backward compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
