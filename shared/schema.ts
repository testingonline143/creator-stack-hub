import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, index } from "drizzle-orm/pg-core";
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

// Sessions table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Auth users table (primary auth table)
export const authUsers = pgTable("auth_users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Local authentication table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Success stories table
export const successStories = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  revenue: text("revenue"), // e.g., "$30,000"
  timeframe: text("timeframe"), // e.g., "Monthly Revenue"
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Daily case studies table
export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  creatorName: text("creator_name").notNull(),
  creatorId: integer("creator_id"),
  imageUrl: text("image_url"),
  revenue: text("revenue"),
  timeframe: text("timeframe"),
  views: integer("views").default(0),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const creatorsRelations = relations(creators, ({ many }) => ({
  products: many(products),
  emailSubmissions: many(emailSubmissions),
  successStories: many(successStories),
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

export const successStoriesRelations = relations(successStories, ({ one }) => ({
  creator: one(creators, {
    fields: [successStories.creatorId],
    references: [creators.id],
  }),
}));

export const caseStudiesRelations = relations(caseStudies, ({ one }) => ({
  creator: one(creators, {
    fields: [caseStudies.creatorId],
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

export const insertSuccessStorySchema = createInsertSchema(successStories).pick({
  creatorId: true,
  title: true,
  description: true,
  revenue: true,
  timeframe: true,
  imageUrl: true,
  videoUrl: true,
});

export const insertCaseStudySchema = createInsertSchema(caseStudies).pick({
  title: true,
  description: true,
  creatorName: true,
  creatorId: true,
  imageUrl: true,
  revenue: true,
  timeframe: true,
});

export const insertAuthUserSchema = createInsertSchema(authUsers).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  username: true,
  passwordHash: true,
  name: true,
});

export type UpsertUser = typeof authUsers.$inferInsert;
export type User = typeof authUsers.$inferSelect;
export type LocalUser = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SuccessStory = typeof successStories.$inferSelect;
export type InsertSuccessStory = z.infer<typeof insertSuccessStorySchema>;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
