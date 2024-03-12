import { Annonce } from "../models/relations.js";
import { validationResult } from "express-validator";

// Liste des annonces
export const annonceList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // page par défaut: 1, limite par défaut: 10
  const offset = (page - 1) * limit;

  try {
    const annonces = await Annonce.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      data: annonces.rows,
      totalItems: annonces.count,
      totalPages: Math.ceil(annonces.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Ajout d'une annonce
export const addAnnonce = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const annonce = req.body;

  try {
    await Annonce.create(annonce);
    res.status(200).json({ message: "Annonce créée avec succès." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mise à jour d'une annonce
export const updateAnnonce = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const nouvelleAnnonce = req.body;

  if (!parseInt(id))
    return res.status(400).json({ message: "Cette annonce n'existe pas." });

  try {
    const annonceCourante = await Annonce.findByPk(id);
    if (!annonceCourante)
      return res.status(404).json({ message: "Cette annonce n'existe pas." });

    await annonceCourante.update(nouvelleAnnonce);
    res.status(201).json({ message: `Annonce ${id} mise à jour.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Suppression d'une annonce
export const deleteAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res.status(404).json({ message: "Cette annonce n'existe pas." });

  try {
    await Annonce.destroy({ where: { id } });
    res.status(201).json({ message: "Annonce supprimée avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
