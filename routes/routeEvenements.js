import { Router } from "express";
import {
  addEvenement,
  deleteEvenement,
  evenementList,
  updateEvenement,
} from "../controllers/evenements.js";
import evenementRules from "../validations/validationEvenement.js";
const router = Router();

router
  .get("/", evenementList)
  .post("/", evenementRules, addEvenement)
  .put("/:id", evenementRules, updateEvenement)
  .delete("/:id", deleteEvenement);

export default router;
