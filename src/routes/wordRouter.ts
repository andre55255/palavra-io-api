import { Router } from "express";
import { wordController } from "../controllers/wordController";
import { validationRequest } from "../middlewares/validation";
import { validationWord } from "../config/validations-endpoints/word/wordValidation";
import { authorize } from "../middlewares/authorize";

const router: Router = Router();

router.post("/word", authorize, validationWord, validationRequest, wordController.create);

router.post("/createManyWord", authorize, wordController.createMany);

router.post("/readFileAndInsertWords", authorize, wordController.readFileAndInsertWords);

router.put("/word/:id", authorize, validationWord, validationRequest, wordController.edit);

router.get("/word", authorize, wordController.getAll);

router.get("/word/:id", authorize, wordController.getById);

router.get("/word/text/:text", authorize, wordController.getByText);

router.delete("/word/:id", authorize, wordController.remove);

export default router;