import { Router } from "express";
import { addEcole, deleteEcole, ecoleList, updateEcole } from "../controllers/ecoles.js";
import ecoleRules from "../validations/validationEcole.js";
const router = Router();

router
    .get("/", ecoleList)
    .post("/",  ecoleRules,addEcole)
    .put("/:id",  ecoleRules,updateEcole)
    .delete("/:id", deleteEcole);

export default router;
