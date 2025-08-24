import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { codeValidationSchema, type CodeValidationResponse } from "@shared/schema";
import { googleSheetsService } from "./services/google-sheets";

export async function registerRoutes(app: Express): Promise<Server> {
  // Code validation endpoint
  app.post("/api/validate-code", async (req, res) => {
    try {
      const validationResult = codeValidationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          valid: false,
          message: "Código inválido"
        } as CodeValidationResponse);
      }

      const { code } = validationResult.data;
      const result = await googleSheetsService.validateCode(code);
      
      res.json(result as CodeValidationResponse);
    } catch (error) {
      console.error("Code validation error:", error);
      res.status(500).json({
        valid: false,
        message: "Error interno del servidor"
      } as CodeValidationResponse);
    }
  });

  // Questions endpoint
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await googleSheetsService.getQuestions();
      res.json(questions);
    } catch (error) {
      console.error("Questions fetch error:", error);
      res.status(500).json({
        message: "Error al obtener las preguntas"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
