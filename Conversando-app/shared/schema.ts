import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

// Code validation schema
export const codeValidationSchema = z.object({
  code: z.string().min(1, "El código es requerido").max(50, "El código es demasiado largo"),
});

export type CodeValidationRequest = z.infer<typeof codeValidationSchema>;

export interface CodeValidationResponse {
  valid: boolean;
  message?: string;
}

export interface SheetCode {
  code: string;
  createdDate: string;
  expirationDate: string;
}

export interface ReflectionQuestion {
  question: string;
  category: string;
}
