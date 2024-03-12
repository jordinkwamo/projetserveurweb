import Roles from "../models/Role.js";
import { validationResult } from "express-validator";

export const rolesList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // page par défaut: 1, limite par défaut: 10
  const offset = (page - 1) * limit;

  try {
    const roles = await Roles.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      data: roles.rows,
      totalItems: roles.count,
      totalPages: Math.ceil(roles.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const role = req.body;

  try {
    await Roles.create(role);
    res.status(200).json({ message: "Rôle créé avec succès." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const nouveauRole = req.body;

  if (!parseInt(id))
    return res.status(400).json({ message: "Ce rôle n'existe pas." });

  try {
    const roleCourant = await Roles.findByPk(id);
    if (!roleCourant)
      return res.status(404).json({ message: "Ce rôle n'existe pas." });

    await roleCourant.update(nouveauRole);
    res.status(201).json({ message: `Rôle ${id} mis à jour.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res.status(404).json({ message: "Ce rôle n'existe pas." });

  try {
    await Roles.destroy({ where: { id } });
    res.status(201).json({ message: "Rôle supprimé avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
