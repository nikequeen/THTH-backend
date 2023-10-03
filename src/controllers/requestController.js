const express = require("express");
const router = express.Router();
const RequeteService = require("../services/requete/requeteService");

router.post("/ajouterunerequete", async (req, res) => {
  try {
    const request = await RequeteService.createRequete(req.body);
    if (!request.error) {
      res.status(201).json(request);
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
});

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

router.put("/updaterequest", async (req, res) => {
  try {
    
    const requeteId = req.params.id;
    const body = req.body;
    const result = await RequeteService.updateRequete(requeteId, body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("La requête n'a pas été trouvée ou n'a pas été mise à jour.");
    }
  } catch (error) {
    console.log("Erreur lors de la modification de la requête", error);
    res.status(500).json("Erreur lors de la modification de la requête");
  }
});


module.exports = router;
