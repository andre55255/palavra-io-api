import { Router } from "express";
import { todayWordController } from "../controllers/todayWordController";
import { validationRequest } from "../middlewares/validation";
import { validationTodayWord } from "../config/validations-endpoints/todayWord/todayWordValidation";
import { authorize } from "../middlewares/authorize";

const router: Router = Router();

router.post("/todayWord", authorize, validationTodayWord, validationRequest, todayWordController.create);

router.put("/todayWord/:id", authorize, validationTodayWord, validationRequest, todayWordController.edit);

router.get("/todayWord/:date/:numberLetters", authorize, todayWordController.getByDateByNumberLetters);

router.get("/todayWord", authorize, todayWordController.getAll);

export default router;