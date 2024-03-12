// Importer les dépendances Express
import { Router } from "express";
import { addRole, deleteRole, rolesList, updateRole } from "../controllers/roles.js";
import roleRules from "../validations/validationRole.js";
// Instance de route pour les rôles
const router = Router();

router
  .get("/", rolesList)
  .post("/", roleRules, addRole)
  .put("/:id", roleRules, updateRole)
  .delete("/:id", deleteRole);

export default router;