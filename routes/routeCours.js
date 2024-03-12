import { Router } from "express";
import {
  addCours,
  deleteCours,
  coursList,
  updateCours,
} from "../controllers/cours.js";
import coursRules from "../validations/validationCours.js";
const router = Router();

router
  .get("/", coursList)
  .post("/", coursRules, addCours)
  .put("/:id", coursRules, updateCours)
  .delete("/:id", deleteCours);

export default router;
