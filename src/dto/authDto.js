const { object, string, mixed } = require("yup");
const Enumtype = require("../services/utilisateurs/enumtype");

const typeUtilisateurs = [Enumtype.Admin,Enumtype.Agent]

exports.inscriptionDto = object({
  body: object({
    nom: string().min(8).max(40).required(`Le nom est require`),
    email: string().email().required("Le mail est require ou inalide"),
    motdepasse: string()
      .min(8)
      .max(50)
      .required(`Mot de passe est require ou invalide`),
    // .matches(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/),
  }),
});

exports.ajoutUtilisateurDto = object({
  body: object({
    nom: string().min(8).max(40).required(`Le nom est require`),
    email: string().email().required("Le mail est require ou inalide"),
    motdepasse: string().min(8).max(50).required(`Mot de passe est require ou invalide`),
    // .matches(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/),
    type: string().required("Le type utilisateur est requis").oneOf(typeUtilisateurs,`Le type doit etre compris entre ${typeUtilisateurs}`)
  }),
});

exports.connexionDto = object({
  body: object({
    email: string().email().required("veuillez renseignez le mail"),
    motdepasse: string()
      .min(8)
      .max(50)
      .required(`Mot de passe est require ou invalide`),
    // .matches(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/),
  }),
});
