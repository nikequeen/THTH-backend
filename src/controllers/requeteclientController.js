const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const formulaireService = require("../services/formulaire/formulaireService");
const RequeteClientService = require("../services/requetclient/requeteClientService");
const Authmiddleware = require("../middleware/Authmiddleware");

router.post(
  "/ajouterunerequete/:requeteId",
  upload.single("piecejointe"),
  async (req, res) => {
    try {
      const user = req.auth;
      const utilisateurId = user.id;
      const requeteId = req.params.requeteId;
      const fileName = req.file.originalname;
      console.log(requeteId);
      console.log(fileName);
      console.log(utilisateurId);

      const informationpersonnelle = req.body.informationpersonnelle;
      const informationpersonnelleString = JSON.stringify(
        informationpersonnelle
      );

      const donneesCreation = {
        informationpersonnelle: informationpersonnelleString,
        piecejointe: fileName,
      };
      // console.log(donneesCreation);
      const form = await formulaireService.createForm(
        donneesCreation,
        requeteId
      );
      console.log(form);

      const formulaireId = form.dataValues.id;

      console.log(formulaireId);

      const result = await RequeteClientService.createClientRequest(
        donneesCreation,
        utilisateurId,
        formulaireId
      );

      if (!result.error) {
        return res.status(201).json({
          message: "La requête a été ajoutée avec succès",
          data: result,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "L'ajout de la requête a échoué",
        });
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la requête",
        error
      );
      return res.status(500).json({
        error: true,
        message: "Une erreur s'est produite lors de l'ajout de la requête",
      });
    }
  }
);

router.get("/requeteclientliste", async (req, res) => {
  try {
    const user = req.auth;
    console.log(user);
    const result = await RequeteClientService.getClientRequestByUserType(user);
    res.status(200).json({
      error: false,
      message: "Requete client obtenue avec succes",
      result: "result",
    });
  } catch (error) {
    console.log("Erreur lors de la récupération de la requete", error);
    res.status(404).json("Erreur lors de la récupération du de la requete");
  }
});
module.exports = router;
