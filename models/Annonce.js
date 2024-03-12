// Import des modèles
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Annonce = database.define("Annonce", {
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenu: {
    type: DataTypes.TEXT,
  },
  datePublication: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Annonce

