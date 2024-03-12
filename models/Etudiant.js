// Modele de l'etudiant (entite en base de donnees)

//La connexion a la base de donnee
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

//Creation d'une entite
const Etudiant = database.define("etudiant", {
  nom: DataTypes.STRING,
  prenom: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  mot_de_passe: { type: DataTypes.STRING, allowNull: false },
  date_de_naissance: DataTypes.DATE,
});

export default Etudiant;
