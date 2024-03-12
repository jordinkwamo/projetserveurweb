// Import des modèles

import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
const Evenement = database.define("Evenement", {
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateDebut: {
    type: DataTypes.DATE,
  },
  lieu: {
    type: DataTypes.STRING,
  },
})

export default Evenement;
