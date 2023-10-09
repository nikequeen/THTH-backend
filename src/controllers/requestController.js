const express = require("express");
const router = express.Router();
const RequeteService = require("../services/requete/requeteService");
const yupValidator = require("../middleware/validate");
const { creationrequeteDto } = require("../dto/validaterequte");

router.post(
  "/ajouterunerequete",
  yupValidator(creationrequeteDto),
  async (req, res) => {
    try {
      const request = await RequeteService.createRequete(req.body);
      if (!request.error) {
        res.status(201).json({
          error: false,
          message: "La requete a ajoutée avec succes",
          request: request,
        });
      } else {
        res.status(400).json(request);
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la requête",
        error
      );
      res
        .status(500)
        .json("Une erreur s'est produite lors de l'ajout de la requête");
    }
  }
);

router.get("/requeteliste", async (req, res) => {
  try {
    const result = await RequeteService.getRequete();
    res.status(200).json(result);
  } catch (error) {
    console.log("Erreur lors de la récupération de toutes les requêtes", error);
    res
      .status(404)
      .json("Erreur lors de la récupération de toutes les requêtes");
  }
});
router.get("/requete/:id", async (req, res) => {
  try {
    const requeteId = req.params.id;
    const result = await RequeteService.getRequeteById(requeteId);
    res.status(200).json({
      error: false,
      message: "Requête obtenue avec succes",
      result: result,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération de la requêtes", error);
    res.status(404).json("Erreur lors de la récupération de les requêtes");
  }
});

router.put("/updaterequest/:id", async (req, res) => {
  try {
    const requeteId = req.params.id;
    const { nom, description, prix, type } = req.body;

    const existingRequete = await RequeteService.findRequestById(requeteId);

    if (!existingRequete) {
      res.status(404).json("La requête n'a pas été trouvée.");
    } else {
      const result = await RequeteService.updateRequete(requeteId, {
        nom,
        description,
        prix,
        type,
      });

      if (result) {
        console.log(result);
        res
          .status(200)
          .json({ error: false, message: "La requete a été modifié" });
      } else {
        res.status(404).json("Échec de la mise à jour de la requête.");
      }
    }
  } catch (error) {
    console.log("Erreur lors de la modification de la requête", error);
    res.status(500).json("Erreur lors de la modification de la requête");
  }
});

module.exports = router;
