import { Router } from "express";
import { configController } from "../controllers/configController";
import { validationRequest } from "../middlewares/validation";
import { validationConfig } from "../config/validations-endpoints/config/configValidation";
import { authorize } from "../middlewares/authorize";

const router: Router = Router();

router.post("/config", authorize, validationConfig, validationRequest, configController.create);

router.put("/config/:id", authorize, validationConfig, validationRequest, configController.edit);

router.get("/config", authorize, configController.getAll);

router.get("/config/:id", authorize, configController.getById);

router.delete("/config/:id", authorize, configController.remove);

export default router;