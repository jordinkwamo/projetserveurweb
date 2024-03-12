import { Evenement } from "../models/relations.js";
import { validationResult } from "express-validator";

export const evenementList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // page par défaut: 1, limite par défaut: 10
  const offset = (page - 1) * limit;

  try {
    const evenements = await Evenement.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      data: evenements.rows,
      totalItems: evenements.count,
      totalPages: Math.ceil(evenements.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addEvenement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const evenement = req.body;

  try {
    await Evenement.create(evenement);
    res.status(200).json({ message: "Événement créé avec succès." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEvenement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const nouvelEvenement = req.body;

  if (!parseInt(id))
    return res.status(400).json({ message: "Cet événement n'existe pas." });

  try {
    const evenementCourant = await Evenement.findByPk(id);
    if (!evenementCourant)
      return res.status(404).json({ message: "Cet événement n'existe pas." });

    await evenementCourant.update(nouvelEvenement);
    res.status(201).json({ message: `Événement ${id} mis à jour.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEvenement = async (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res.status(404).json({ message: "Cet événement n'existe pas." });

  try {
    await Evenement.destroy({ where: { id } });
    res.status(201).json({ message: "Événement supprimé avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
