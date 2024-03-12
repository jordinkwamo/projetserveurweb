// Import des modèles
import Annonce from "./Annonce.js";
import Ecole from "./Ecole.js";
import Etudiant from "./Etudiant.js";
import Department from "./Department.js";
import Evenement from "./Evenement.js";
import Cours from "./Cours.js";
import Roles from "./Role.js";

// Relations
// Un département peut avoir plusieurs étudiants
Department.hasMany(Etudiant);
Etudiant.belongsTo(Department);

// Une école peut avoir plusieurs départements
Ecole.hasMany(Department);
Department.belongsTo(Ecole);

// Un département peut avoir plusieurs cours
Department.hasMany(Cours);
Cours.belongsTo(Department);

// Une école peut avoir plusieurs annonces
Ecole.hasMany(Annonce);
Annonce.belongsTo(Ecole);

// Une école peut organiser plusieurs événements
Ecole.hasMany(Evenement);
Evenement.belongsTo(Ecole);

// Un étudiant peut être associé à plusieurs événements
Etudiant.hasMany(Evenement);
Evenement.belongsTo(Etudiant);

Etudiant.belongsToMany(Roles, { through: "EtudiantRoles" });
Roles.belongsToMany(Etudiant, { through: "EtudiantRoles" });

// Export des modèles
export { Annonce, Ecole, Etudiant, Department, Evenement, Cours, Roles };
