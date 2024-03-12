import { Department } from "../models/relations.js";
import { validationResult } from "express-validator";

// Lecture de la liste des départements

export const departementList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // page par défaut: 1, limite par défaut: 10
  const offset = (page - 1) * limit;

  try {
    const departments = await Department.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      data: departments.rows,
      totalItems: departments.count,
      totalPages: Math.ceil(departments.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Création d'un département
export const addDepartment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const departement = req.body;

  try {
    await Department.create(departement);
    res.status(200).json({ message: "Département créé avec succès." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mise à jour d'un département
export const updateDepartment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const nouveauDepartement = req.body;

  if (!parseInt(id))
    return res.status(400).json({ message: "Ce département n'existe pas." });

  try {
    const departementCourant = await Department.findByPk(id);
    if (!departementCourant)
      return res.status(404).json({ message: "Ce département n'existe pas." });

    await departementCourant.update(nouveauDepartement);
    res.status(201).json({ message: `Département ${id} mis à jour.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Suppression d'un département
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res.status(404).json({ message: "Ce département n'existe pas." });

  try {
    await Department.destroy({ where: { id } });
    res.status(201).json({ message: "Département supprimé avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
