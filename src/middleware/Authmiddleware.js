const UtilisateurService = require("../services/utilisateurs/userService");
const { Utilisateur } = require("../models/utilisateur");

const Authmiddleware = (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: true, message: "Entête introuvable" });
  }

  if (
    authHeader.charAt(0) === '"' &&
    authHeader.charAt(authHeader.length - 1) === '"'
  ) {
    authHeader = authHeader.replace('"', "").trim();

    console.log(authHeader);
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  const utilisateurService = new UtilisateurService(Utilisateur);
  
  const user = utilisateurService.decoderJwt(token);
  console.log(user.id);

  const trouveUtilisateur = utilisateurService.findOne({ id: user.id });
  console.log(trouveUtilisateur);

  if (!trouveUtilisateur) {
    return res
      .status(401)
      .json({ error: true, message: "Utilisateur introuvable" });
  }

  req.user = trouveUtilisateur;
  next();
};

module.exports = Authmiddleware;
