// Import des modèles
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";



// Modèle Cours
const Cours = database.define("Cours", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

export default Cours;
