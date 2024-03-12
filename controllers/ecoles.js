import { Ecole } from "../models/relations.js";
import { validationResult } from "express-validator";

// Liste des écoles
export const ecoleList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // page par défaut: 1, limite par défaut: 10
    const offset = (page - 1) * limit;
  
    try {
      const ecoles = await Ecole.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      res.status(200).json({
        data: ecoles.rows,
        totalItems: ecoles.count,
        totalPages: Math.ceil(ecoles.count / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Ajout d'une école
export const addEcole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const ecole = req.body;

    try {
        await Ecole.create(ecole);
        res.status(200).json({ message: "École créée avec succès." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mise à jour d'une école
export const updateEcole = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const nouvelleEcole = req.body;

    if (!parseInt(id)) return res.status(400).json({ message: "Cette école n'existe pas." });

    try {
        const ecoleCourante = await Ecole.findByPk(id);
        if (!ecoleCourante) return res.status(404).json({ message: "Cette école n'existe pas." });

        await ecoleCourante.update(nouvelleEcole);
        res.status(201).json({ message: `École ${id} mise à jour.` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Suppression d'une école
export const deleteEcole = async (req, res) => {
    const { id } = req.params;

    if (!parseInt(id)) return res.status(404).json({ message: "Cette école n'existe pas." });

    try {
        await Ecole.destroy({ where: { id } });
        res.status(201).json({ message: "École supprimée avec succès." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
