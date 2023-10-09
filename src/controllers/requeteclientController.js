const express = require("express");
const router = express.Router();
const RequeteClientService = require("../services/requetclient/requeteClientService");
// const Authmiddleware = require("../middleware/Authmiddleware");


router.post(
  "/:utilisateurId/:formulaireId/ajouterunerequete",
  async (req, res) => {
    try {
      const utilisateurId = req.params.utilisateurId;
      console.log(utilisateurId);
      const formulaireId = req.params.formulaireId;
      console.log(formulaireId);
      const clientRequest = await RequeteClientService.createClientRequest(
        req.body,
        utilisateurId,
        formulaireId
      );
      if (!clientRequest.error) {
        return res.status(201).json({
          error: false,
          message: "La requete a été ajouté avec succès",
          data: clientRequest,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "L'ajout de la requête a échoué",
        });
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la requete",
        error
      );
      return res
        .status(500)
        .json("Une erreur s'est produite lors de l'ajout du la requet");
    }
  }
);

router.get("/requeteclientliste", async (req, res) => {
  try {
    const user = req.auth;
    const result = await RequeteClientService.getClientRequestByUserType(
      user
    );
    res.status(200).json({
      error: false,
      message: "Requete client obtenue avec succes",
      result: result,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération de la requete", error);
    res.status(404).json("Erreur lors de la récupération du de la requete");
  }
});
module.exports = router;
