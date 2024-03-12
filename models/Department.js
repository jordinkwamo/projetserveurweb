//La connexion a la base de donnee
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

//Creation de la table Department

const Department = database.define('department', {
    nom: { type: DataTypes.STRING, allowNull: false }, //NOT NULL
    description: DataTypes.TEXT,
    date_creation: DataTypes.DATEONLY
})

export default Department