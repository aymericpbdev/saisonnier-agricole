import express from "express";
import cors from "cors";

import { pinoHttp } from "pino-http";
import { logger } from "./config/logger.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

// Logging HTTP : log automatique de chaque requête entrante
app.use(pinoHttp({ logger }));

// CORS : autorise les requêtes du client
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parser JSON pour les bodies de requête
app.use(express.json());

// Routes (à monter ici au fur et à mesure)

// Middleware d'erreurs : doit être déclaré en dernier
app.use(errorHandler);

export { app };