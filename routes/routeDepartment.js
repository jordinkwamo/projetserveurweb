// fonction pour importer les routes
import { Router } from "express";
import {
  addDepartment,
  deleteDepartment,
  departementList,
  updateDepartment,
} from "../controllers/departments.js";
import departmentRules from "../validations/validationDepartement.js";
//importer les regle de validation, ne pas ouubli le .js

// instance de route
const router = Router();

router
  .get("/", departementList)
  .post("/", departmentRules, addDepartment)
  .put("/:id", departmentRules, updateDepartment)
  .delete("/:id", deleteDepartment);
export default router;
