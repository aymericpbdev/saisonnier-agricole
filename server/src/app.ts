import express from "express";
import cors from "cors";

import { AppError } from "./utils/errors.js";
import { healthRouter } from "./routes/health.routes.js";
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

// Routes
app.use(healthRouter);

// 404 catch-all : aucune route n'a matché, on renvoie une AppError
app.use((req, res, next) => {
  next(new AppError("NOT_FOUND", `Route ${req.method} ${req.path} not found`, 404));
});

// Middleware d'erreurs : doit être déclaré en dernier
app.use(errorHandler);

export { app };