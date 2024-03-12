import { body, param } from "express-validator";

const departmentRules = [
  body('nom').notEmpty().withMessage("Le nom ne peut pas être vide"),
  body('description').optional().isString().withMessage("La description doit être une chaîne de caractères"),
  body('date_creation').optional().isISO8601().withMessage('La date est incorrecte'),
  param('id').optional().isInt({ min: 1 }).withMessage("L'id doit être un entier positif")
];

export default departmentRules;
