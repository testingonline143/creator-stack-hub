import { 
  authUsers, creators, products, resources, tags, emailSubmissions,
  type User, type UpsertUser, 
  type Creator, type InsertCreator,
  type Product, type InsertProduct,
  type Resource, type InsertResource,
  type Tag, type InsertTag,
  type EmailSubmission, type InsertEmailSubmission
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, inArray, sql } from "drizzle-orm";

export interface IStorage {
  // Legacy user methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: UpsertUser): Promise<User>;

  // Creator methods
  getCreator(id: number): Promise<Creator | undefined>;
  getCreatorByUsername(username: string): Promise<Creator | undefined>;
  createCreator(creator: InsertCreator): Promise<Creator>;
  updateCreator(id: number, updates: Partial<InsertCreator>): Promise<Creator>;
  getAllCreators(): Promise<Creator[]>;

  // Product methods
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCreator(creatorId: number): Promise<Product[]>;
  getApprovedProducts(): Promise<Product[]>;
  getSubmittedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product>;
  submitProductForReview(id: number): Promise<Product>;
  approveProduct(id: number): Promise<Product>;
  rejectProduct(id: number): Promise<Product>;

  // Resource methods
  getResources(visibleTo?: "free" | "premium"): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, updates: Partial<InsertResource>): Promise<Resource>;
  deleteResource(id: number): Promise<void>;

  // Tag methods
  getAllTags(): Promise<Tag[]>;
  getTagsByType(type: "product" | "resource"): Promise<Tag[]>;
  createTag(tag: InsertTag): Promise<Tag>;

  // Email submission methods
  createEmailSubmission(submission: InsertEmailSubmission): Promise<EmailSubmission>;
  getEmailSubmissionsByCreator(creatorId: number): Promise<EmailSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  // Legacy user methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(authUsers).where(eq(authUsers.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(authUsers).where(eq(authUsers.email, username));
    return user || undefined;
  }

  async createUser(insertUser: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(authUsers)
      .values(insertUser)
      .returning();
    return user;
  }

  // Creator methods
  async getCreator(id: number): Promise<Creator | undefined> {
    const [creator] = await db.select().from(creators).where(eq(creators.id, id));
    return creator || undefined;
  }

  async getCreatorByUsername(username: string): Promise<Creator | undefined> {
    const [creator] = await db.select().from(creators).where(eq(creators.username, username));
    return creator || undefined;
  }

  async createCreator(creator: InsertCreator): Promise<Creator> {
    const [newCreator] = await db
      .insert(creators)
      .values(creator)
      .returning();
    return newCreator;
  }

  async updateCreator(id: number, updates: Partial<InsertCreator>): Promise<Creator> {
    const [updatedCreator] = await db
      .update(creators)
      .set(updates)
      .where(eq(creators.id, id))
      .returning();
    return updatedCreator;
  }

  async getAllCreators(): Promise<Creator[]> {
    return await db.select().from(creators).orderBy(desc(creators.createdAt));
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByCreator(creatorId: number): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.creatorId, creatorId))
      .orderBy(desc(products.createdAt));
  }

  async getApprovedProducts(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.status, "approved"))
      .orderBy(desc(products.approvedAt));
  }

  async getSubmittedProducts(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.status, "submitted"))
      .orderBy(desc(products.submittedAt));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async submitProductForReview(id: number): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({
        status: "submitted",
        submittedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async approveProduct(id: number): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({
        status: "approved",
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async rejectProduct(id: number): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({
        status: "rejected",
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  // Resource methods
  async getResources(visibleTo?: "free" | "premium"): Promise<Resource[]> {
    if (visibleTo) {
      return await db
        .select()
        .from(resources)
        .where(eq(resources.visibleTo, visibleTo))
        .orderBy(desc(resources.createdAt));
    }
    return await db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [newResource] = await db
      .insert(resources)
      .values({
        ...resource,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return newResource;
  }

  async updateResource(id: number, updates: Partial<InsertResource>): Promise<Resource> {
    const [updatedResource] = await db
      .update(resources)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(resources.id, id))
      .returning();
    return updatedResource;
  }

  async deleteResource(id: number): Promise<void> {
    await db.delete(resources).where(eq(resources.id, id));
  }

  // Tag methods
  async getAllTags(): Promise<Tag[]> {
    return await db.select().from(tags).orderBy(tags.name);
  }

  async getTagsByType(type: "product" | "resource"): Promise<Tag[]> {
    return await db
      .select()
      .from(tags)
      .where(eq(tags.type, type))
      .orderBy(tags.name);
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const [newTag] = await db
      .insert(tags)
      .values({
        ...tag,
        createdAt: new Date(),
      })
      .returning();
    return newTag;
  }

  // Email submission methods
  async createEmailSubmission(submission: InsertEmailSubmission): Promise<EmailSubmission> {
    const [newSubmission] = await db
      .insert(emailSubmissions)
      .values({
        ...submission,
        createdAt: new Date(),
      })
      .returning();
    return newSubmission;
  }

  async getEmailSubmissionsByCreator(creatorId: number): Promise<EmailSubmission[]> {
    return await db
      .select()
      .from(emailSubmissions)
      .where(eq(emailSubmissions.creatorId, creatorId))
      .orderBy(desc(emailSubmissions.createdAt));
  }
}

export const storage = new DatabaseStorage();
