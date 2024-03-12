import { body, param } from "express-validator";

const rolesRules = [
  body("nom").notEmpty().withMessage("Le nom ne peut pas être vide"),
  param("id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("L'id doit être un entier positif"),
];

export default rolesRules;
