//Importations des modules necessaires
import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

//Creation de notre application

//Voir le contenu de .env
import dotenv from "dotenv";
/*
import { etudiantList } from "./controllers/etudiants.js";
import {
  addDepartment,
  deleteDepartment,
  departementList,
  updateDepartment,
} from "./controllers/departments.js";
*/
const env = dotenv.config().parsed;

console.log("env", env);

//importer la base de donnee

import database from "./config/connexion.js";
import router from "./routes/routeDepartment.js";
import coursRouter from "./routes/routeCours.js";
import evenementRouter from "./routes/routeEvenements.js";
import etudiantRouter from "./routes/routeEtudiants.js";
import ecoleRouter from "./routes/routeEcoles.js";
import annonceRouter from "./routes/routeAnnonces.js";
import rolesRouter from "./routes/routeRoles.js";
import routeAuth from "./routes/routeAuth.js";
database.sync();

const app = express();

//Utilisation des modules importes
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Une route pour tester
/*
const callbackfn = (req, res) => {
  //Un controleur
  const name = req.params.name;
  res.send(`Bonjour ${name}, tout va bien?`);
};
*/
//app.get("/salutation/:name", callbackfn);

//Liste des etudiants
//app.get("/liste-etudiants", etudiantList);

//app.get("/departments", departementList);
//app.post("/departments", addDepartment);
//app.put("/departments/:id", updateDepartment);
//app.delete("/departments/:id", deleteDepartment);

app.use("/departments", router);
app.use("/cours", coursRouter);
app.use("/evenements", evenementRouter);
app.use("/etudiants", etudiantRouter);
app.use("/ecoles", ecoleRouter);
app.use("/annonces", annonceRouter);
app.use("/roles", rolesRouter);
app.use("/login", routeAuth);

const port = 5000;

app.listen(port, () => console.log(`Notre serveur tourne sur le port ${port}`));
