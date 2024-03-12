import { body, param } from "express-validator";

const evenementRules = [
  body('titre').notEmpty().withMessage("Le titre ne peut pas être vide"),
  body('dateDebut').optional().isISO8601().withMessage('La date de début est incorrecte'),
  body('lieu').optional().isString().withMessage("Le lieu doit être une chaîne de caractères"),
  param('id').optional().isInt({ min: 1 }).withMessage("L'id doit être un entier positif")
];

export default evenementRules;
