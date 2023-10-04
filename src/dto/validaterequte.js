const { object, string, number } = require("yup");

exports.creationrequeteDto = object().shape({
  body: object().shape({
    nom: string()
      .min(4, "Le nom doit comporter au moins 4 caractères")
      .max(40, "Le nom ne peut pas dépasser 40 caractères")
      .required("Le nom est requis"),
    description: string()
      .min(2, "La description doit comporter au moins 2 caractères")
      .max(300, "La description ne peut pas dépasser 300 caractères")
      .required("La description est requise"),
    prix: number()
      .positive("Le prix doit être supérieur à zéro")
      .integer("Le prix doit être un nombre entier")
      .required("Le prix est requis"),
  }),
});
