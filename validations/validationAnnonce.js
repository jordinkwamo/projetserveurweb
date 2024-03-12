import { body, param } from "express-validator";

const annonceRules = [
  body('titre').notEmpty().withMessage("Le titre ne peut pas être vide"),
  body('contenu').optional().isString().withMessage("Le contenu doit être une chaîne de caractères"),
  body('datePublication').optional().isISO8601().withMessage('La date de publication est incorrecte'),
  param('id').optional().isInt({ min: 1 }).withMessage("L'id doit être un entier positif")
];

export default annonceRules;
