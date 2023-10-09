const express = require("express");
const router = express.Router();
const FormulaireService = require("../services/formulaire/formulaireService");

router.post("/:requestId/ajouterunformulaire", async (req, res) => {
  try {
    const requestId = req.params.requestId;
    console.log(requestId);

    const form = await FormulaireService.createForm(req.body, requestId);

    if (!form.error) {
      return res.status(201).json({
        error: false,
        message: "Le formulaire a été ajouté avec succès",
        result: form,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Le formulaire n'a pas été ajouté avec succès",
        result: form,
      });
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'ajout du formulaire",
      error
    );
    return res
      .status(500)
      .json("Une erreur s'est produite lors de l'ajout du formulaire");
  }
});
router.get("/formliste", async (req, res) => {
  try {
    const result = await FormulaireService.getForm();
    console.log(result)
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
