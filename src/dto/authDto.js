const { object, string, mixed } = require("yup");

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
