import { body, param } from "express-validator";

const coursRules = [
  body('nom').notEmpty().withMessage("Le nom ne peut pas être vide"),
  body('code').notEmpty().isString().withMessage("Le code doit être une chaîne de caractères"),
  body('description').optional().isString().withMessage("La description doit être une chaîne de caractères"),
  param('id').optional().isInt({ min: 1 }).withMessage("L'id doit être un entier positif")
];

export default coursRules;
