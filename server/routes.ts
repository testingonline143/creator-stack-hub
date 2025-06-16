import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { login, register, requireAuth } from "./auth";
import session from "express-session";
import { 
  insertCreatorSchema, 
  insertProductSchema, 
  insertResourceSchema,
  insertTagSchema,
  insertEmailSubmissionSchema,
  insertUserSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await login(email, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      req.session.user = user;
      res.json({ user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      console.log("Registration request body:", req.body);
      
      const registerSchema = insertUserSchema.extend({
        password: z.string().min(6, "Password must be at least 6 characters")
      });
      
      const result = registerSchema.safeParse(req.body);
      if (!result.success) {
        console.error("Validation errors:", result.error.errors);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: result.error.errors 
        });
      }

      const { email, username, password, name } = result.data;
      console.log("Attempting to register user:", { email, username, name });
      
      const user = await register(email, username, password, name);
      
      req.session.userId = user.id;
      req.session.user = user;
      res.status(201).json({ user });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ error: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  });

  // Creator routes (protected)
  app.get("/api/creators", requireAuth, async (req, res) => {
    try {
      const creators = await storage.getAllCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch creators" });
    }
  });

  app.get("/api/creators/:id", async (req, res) => {
    try {
      const creator = await storage.getCreator(parseInt(req.params.id));
      if (!creator) {
        return res.status(404).json({ error: "Creator not found" });
      }
      res.json(creator);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch creator" });
    }
  });

  app.get("/api/creators/username/:username", async (req, res) => {
    try {
      const creator = await storage.getCreatorByUsername(req.params.username);
      if (!creator) {
        return res.status(404).json({ error: "Creator not found" });
      }
      
      // Get creator's products
      const products = await storage.getProductsByCreator(creator.id);
      
      res.json({ 
        ...creator, 
        products: products.filter(p => p.status === "approved" || p.status === "draft")
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch creator profile" });
    }
  });

  app.post("/api/creators", async (req, res) => {
    try {
      const validatedData = insertCreatorSchema.parse(req.body);
      const creator = await storage.createCreator(validatedData);
      res.status(201).json(creator);
    } catch (error) {
      res.status(400).json({ error: "Invalid creator data" });
    }
  });

  app.put("/api/creators/:id", async (req, res) => {
    try {
      const updates = insertCreatorSchema.partial().parse(req.body);
      const creator = await storage.updateCreator(parseInt(req.params.id), updates);
      res.json(creator);
    } catch (error) {
      res.status(400).json({ error: "Failed to update creator" });
    }
  });

  // Product routes (protected)
  app.get("/api/products", requireAuth, async (req, res) => {
    try {
      const { status, creatorId } = req.query;
      
      if (creatorId) {
        const products = await storage.getProductsByCreator(parseInt(creatorId as string));
        return res.json(products);
      }
      
      if (status === "approved") {
        const products = await storage.getApprovedProducts();
        return res.json(products);
      }
      
      if (status === "submitted") {
        const products = await storage.getSubmittedProducts();
        return res.json(products);
      }
      
      // Default to approved products for public explore page
      const products = await storage.getApprovedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const updates = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(parseInt(req.params.id), updates);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Failed to update product" });
    }
  });

  app.post("/api/products/:id/submit", async (req, res) => {
    try {
      const product = await storage.submitProductForReview(parseInt(req.params.id));
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Failed to submit product for review" });
    }
  });

  app.post("/api/products/:id/approve", async (req, res) => {
    try {
      const product = await storage.approveProduct(parseInt(req.params.id));
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Failed to approve product" });
    }
  });

  app.post("/api/products/:id/reject", async (req, res) => {
    try {
      const product = await storage.rejectProduct(parseInt(req.params.id));
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Failed to reject product" });
    }
  });

  // Resource routes (Premium content)
  app.get("/api/resources", async (req, res) => {
    try {
      const { visibleTo } = req.query;
      const resources = await storage.getResources(visibleTo as "free" | "premium");
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const validatedData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      res.status(400).json({ error: "Invalid resource data" });
    }
  });

  app.put("/api/resources/:id", async (req, res) => {
    try {
      const updates = insertResourceSchema.partial().parse(req.body);
      const resource = await storage.updateResource(parseInt(req.params.id), updates);
      res.json(resource);
    } catch (error) {
      res.status(400).json({ error: "Failed to update resource" });
    }
  });

  app.delete("/api/resources/:id", async (req, res) => {
    try {
      await storage.deleteResource(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete resource" });
    }
  });

  // Tag routes
  app.get("/api/tags", async (req, res) => {
    try {
      const { type } = req.query;
      if (type) {
        const tags = await storage.getTagsByType(type as "product" | "resource");
        return res.json(tags);
      }
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  app.post("/api/tags", async (req, res) => {
    try {
      const validatedData = insertTagSchema.parse(req.body);
      const tag = await storage.createTag(validatedData);
      res.status(201).json(tag);
    } catch (error) {
      res.status(400).json({ error: "Invalid tag data" });
    }
  });

  // Email submission routes (Lead capture)
  app.post("/api/email-submissions", async (req, res) => {
    try {
      const validatedData = insertEmailSubmissionSchema.parse(req.body);
      const submission = await storage.createEmailSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ error: "Invalid email submission" });
    }
  });

  app.get("/api/email-submissions/:creatorId", async (req, res) => {
    try {
      const submissions = await storage.getEmailSubmissionsByCreator(parseInt(req.params.creatorId));
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch email submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
