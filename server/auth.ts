import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    user?: {
      id: number;
      email: string;
      username: string;
      name: string;
    };
  }
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

export async function login(email: string, password: string) {
  const user = await storage.getUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
  };
}

export async function register(email: string, username: string, password: string, name: string) {
  // Check if user already exists
  const existingUser = await storage.getUserByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const existingUsername = await storage.getUserByUsername(username);
  if (existingUsername) {
    throw new Error("Username already taken");
  }

  const passwordHash = await hashPassword(password);
  
  const newUser = await storage.createLocalUser({
    email,
    username,
    passwordHash,
    name,
  });

  return {
    id: newUser.id,
    email: newUser.email,
    username: newUser.username,
    name: newUser.name,
  };
}