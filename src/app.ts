import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import binRoutes from "./api/v1/routes/binRoutes";
import requestRoutes from "./api/v1/routes/requestRoutes";

import { logger } from "./api/v1/middleware/logger";
import { errorHandler } from "./api/v1/middleware/errorHandler";


import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);


app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

app.use("/api/v1/bins", binRoutes);
app.use("/api/v1/requests", requestRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
