import { Cours } from "../models/relations.js";
import { validationResult } from "express-validator";

// Liste des cours
export const coursList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // page par défaut: 1, limite par défaut: 10
  const offset = (page - 1) * limit;

  try {
    const cours = await Cours.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      data: cours.rows,
      totalItems: cours.count,
      totalPages: Math.ceil(cours.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ajout d'un cours
export const addCours = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const cours = req.body;

  try {
    await Cours.create(cours);
    res.status(200).json({ message: "Cours créé avec succès." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mise à jour d'un cours
export const updateCours = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const nouveauCours = req.body;

  if (!parseInt(id))
    return res.status(400).json({ message: "Ce cours n'existe pas." });

  try {
    const coursCourant = await Cours.findByPk(id);
    if (!coursCourant)
      return res.status(404).json({ message: "Ce cours n'existe pas." });

    await coursCourant.update(nouveauCours);
    res.status(201).json({ message: `Cours ${id} mis à jour.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Suppression d'un cours
export const deleteCours = async (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res.status(404).json({ message: "Ce cours n'existe pas." });

  try {
    await Cours.destroy({ where: { id } });
    res.status(201).json({ message: "Cours supprimé avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
