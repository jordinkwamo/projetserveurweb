import { Etudiant } from "../models/relations.js";
import { validationResult } from "express-validator";
//import module hashage
import bcrypt from 'bcryptjs'

export const etudiantList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // page par défaut: 1, limite par défaut: 10
  const offset = (page - 1) * limit;

  try {
    const etudiants = await Etudiant.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      data: etudiants.rows,
      totalItems: etudiants.count,
      totalPages: Math.ceil(etudiants.count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const addEtudiant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const etudiant = req.body;
  try {
    await Etudiant.create(etudiant);
    res.status(200).json({ message: "Étudiant créé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEtudiant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const nouveauEtudiant = req.body;

  if (!parseInt(id))
    return res.status(400).json({ message: "Cet étudiant n'existe pas." });

  try {
    const etudiantCourant = await Etudiant.findByPk(id);
    if (!etudiantCourant)
      return res.status(404).json({ message: "Cet étudiant n'existe pas." });

    await etudiantCourant.update(nouveauEtudiant);
    res.status(201).json({ message: `Étudiant ${id} mis à jour.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEtudiant = async (req, res) => {
  const { id } = req.params;

  if (!parseInt(id))
    return res.status(404).json({ message: "Cet étudiant n'existe pas." });

  try {
    await Etudiant.destroy({ where: { id } });
    res.status(201).json({ message: "Étudiant supprimé avec succès." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//creer un compte

export const AjoutEtudiant=async(req,res)=>{
  //recuperer 
  
  const {nom,
    prenom,
    email,
    mot_de_passe,
    date_de_naissance}= req.body
    //hachage du mot de passe 
    const mdpHacha=bcrypt.hashSync(mot_de_passe,10)
    
    const etudiant ={nom,
      prenom,
      email,
      mot_de_passe:mdpHacha,
      date_de_naissance }

      //sauvegarder dans la base de donner 

      try {
        await Etudiant.create(etudiant)
        res.status(201).json({message:"compte cree avec succes"})
      } catch (error) {
        res.status(400).json({message:error.message})
      }
}