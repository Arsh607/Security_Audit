// src/routes/binRoutes.ts (for example)
import express from "express";
import * as bins from "../controllers/binController";
import { insecureDemo } from "../controllers/insecuredemo";

const router = express.Router();

router.get("/bins", bins.getAll);
router.post("/bins", bins.create);

// INTENTIONALLY INSECURE ROUTE FOR DEMO
router.get("/bins/insecure-demo", insecureDemo);

export default router;
