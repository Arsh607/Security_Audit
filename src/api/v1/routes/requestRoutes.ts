import { Router } from "express";
import * as controller from "../controllers/requestController";
import { validate } from "../middleware/validate";
import { requestSchema } from "../validation/requestvalidation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Endpoints for managing pickup/issue requests
 */
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(requestSchema), controller.create);
router.put("/:id", validate(requestSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
