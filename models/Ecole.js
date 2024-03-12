// Import des modèles
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";



// Modèle Ecole
const Ecole = database.define("Ecole", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

export default Ecole;
