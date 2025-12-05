import { Router } from "express";
import * as controller from "../controllers/binController";
import { validate } from "../middleware/validate";
import { binSchema } from "../validation/binValidation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bins
 *   description: Endpoints for managing waste bins
 */
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(binSchema), controller.create);
router.put("/:id", validate(binSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
