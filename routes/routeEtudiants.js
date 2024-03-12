import { Router } from "express";
import {
  AjoutEtudiant,
  addEtudiant,
  deleteEtudiant,
  etudiantList,
  updateEtudiant,
} from "../controllers/etudiants.js";
import etudiantRules from "../validations/validationEtudiant.js";
const router = Router();

router
  .get("/", etudiantList)
  .post("/", AjoutEtudiant)
  .post("/", etudiantRules, addEtudiant)
  .put("/:id", etudiantRules, updateEtudiant)
  .delete("/:id", deleteEtudiant);

export default router;
