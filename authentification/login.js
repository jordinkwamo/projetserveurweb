import Etudiant from "../models/Etudiant.js";
import bcryt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  //les information de connexion
  const { email, mot_de_passe } = req.body;
  //verification du mail
  if (!email) return res.status(400).json({ message: "mail est incorrect" });

  //chercher la personne dans la base de donnees

  try {
    const user = await Etudiant.findOne({ where: { email } });
    //verifier la presence de cette personne dans la base de donner
    if (!user)
      return res.status(404).json({ message: "la personne existe pas!" });

    //verification du mot de passe

    const mdpJuste = bcryt.compareSync(mot_de_passe, user.mot_de_passe);

    if (!mdpJuste)
      return res.status(401).json({ message: "mot de passe incorrect" });

    // creation de la cle d<acces

    const payload = { id: user.id };

    const token = jwt.sing(payload, process.env.CODE_SECRET);
    res.status(200).json({ data: user, token });
  } catch (error) {
    res.status(400).json({ message: error.token });
  }
};
