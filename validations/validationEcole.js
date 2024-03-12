import { body, param } from "express-validator";

const ecoleRules = [
  body('nom').notEmpty().withMessage("Le nom ne peut pas être vide"),
  body('adresse').optional().isString().withMessage("L'adresse doit être une chaîne de caractères"),
  body('description').optional().isString().withMessage("La description doit être une chaîne de caractères"),
  param('id').optional().isInt({ min: 1 }).withMessage("L'id doit être un entier positif")
];

export default ecoleRules;
