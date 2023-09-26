const UtilisateurService = require("../services/utilisateurs/userService");
const { Utilisateur } = require("../models");

exports.Authmiddleware = async (req, res, next) => {
  const userService = new UtilisateurService(Utilisateur);
  let authHeader = req.headers.authorization;

  if (authHeader == null) {
    return res.status(401).json({ error: true, message: "entête introuvable" });
  }
  if (
    authHeader.charAt(0) === '"' ||
    authHeader.charAt(authHeader.length - 1) === '"'
  ) {
    authHeader = authHeader.replaceAll('"', "").trim();
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);

  let user = userService.decoderJwt(token);
  user = user.utilisateur;

  const trouveUtilisateur = await userService.findUserById(user.id);

  if (trouveUtilisateur == null) {
    return res
      .status(401)
      .json({ error: true, message: "utilisateur introuvable" });
  }

  req.auth = trouveUtilisateur;

  return next();
};

exports.typeCompteAuthorisation = (types) => (req, res, next) => {
  const { auth } = req;

  if (!types.includes(auth.type)) {
    return res.status(401).json({
      error: true,
      message: "Vous n'est pas authorisé à avoir access ",
    });
  }

  return next();
};

// module.exports = Authmiddleware;
