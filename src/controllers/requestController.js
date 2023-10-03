const express = require("express");
const router = express.Router();
const Requete = require("../services/requete/requeteService");

router.post("/ajouterunerequete", async function (req, res) {
  try {
    console.log(req.body);
    const request = await Requete.createRequete(req.body);
    if (!request.error) {
      res.status(201).json(request);
    } else {
      res.status(400).json(request);
    }
    console.log(request);
  } catch (error) {
    onsole.error(
      "une erreur c'est produit lors de l'ajout de la requête",
      error
    );
    res
      .status(500)
      .json("une erreur c'est produit lors de l'ajout de la requête");
  }
});

module.exports = router;
