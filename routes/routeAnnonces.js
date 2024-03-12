import { Router } from "express";
import {
  addAnnonce,
  deleteAnnonce,
  annonceList,
  updateAnnonce,
} from "../controllers/annonces.js";

import annonceRules from "../validations/validationAnnonce.js";

const router = Router();

router
  .get("/", annonceList)
  .post("/", addAnnonce)
  .put("/:id", annonceRules, updateAnnonce)
  .delete("/:id", annonceRules, deleteAnnonce);

export default router;
