import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

//Creation d'une entite
const Roles = database.define("roles", {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

export default Roles;

