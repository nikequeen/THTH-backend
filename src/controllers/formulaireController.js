const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const FormulaireService = require("../services/formulaire/formulaireService");

router.post(
  "/ajouterunformulaire/:requestId",
  upload.single("piecejointe"),
  async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const fileName = req.file.originalname;
      console.log(requestId);
      console.log(fileName);
      // const fileNameString = JSON.stringify(fileName);
      const informationpersonnelle = req.body.informationpersonnelle;
      const informationpersonnelleString = JSON.stringify(
        informationpersonnelle
      );

      const donneesCreation = {
        informationpersonnelle: informationpersonnelleString,
        piecejointe: fileName,
      };
      console.log(donneesCreation);
      const form = await FormulaireService.createForm(
        donneesCreation,

        requestId
      );
      if (!form.error) {
        return res.status(201).json(form);
      } else {
        return res.status(400).json({
          error: true,
          message: "Le formulaire n'a pas été ajouté avec succès",
        });
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout du formulaire",
        error
      );
      return res.status(500).json({
        error: true,
        message: "Une erreur s'est produite lors de l'ajout du formulaire",
      });
    }
  }
);
router.get("/formliste", async (req, res) => {
  try {
    const result = await FormulaireService.getForm();
    console.log(result);
    res.status(200).json({
      error: false,
      message: "Formulaire obtenue avec succes",
      result: result,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération du formulaire", error);
    res.status(404).json("Erreur lors de la récupération du formulaire");
  }
});

module.exports = router;
