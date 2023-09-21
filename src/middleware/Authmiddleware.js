const UtilisateurService = require("../services/utilisateurs/userService");
const { Utilisateur } = require("../models/utilisateur");
const Authmiddleware = (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader == null) {
    return res.status(401).json({ error: true, message: "entête introuvable" });
  }
  if (authHeader.charAt(0) == '"' && authHeader.charAt(authHeader.length - 1)) {
    authHeader = authHeader.replaceAll('"', '').trim();
  console.log(authHeader);

  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  const User = new UtilisateurService(Utilisateur).decoderJwt(token);
  console.log(User.id);

  const trouveUtilisateur = new UtilisateurService(Utilisateur).findOne({
    id: User.id,
  });
  console.log(trouveUtilisateur);

  if (trouveUtilisateur == null) {
    return res
      .status(401)
      .json({ error: true, message: "utilisateur introuvable" });
  }
  req.user = trouveUtilisateur;

  next();
};
module.exports = Authmiddleware;
