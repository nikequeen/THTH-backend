const express = require("express");
const router = express.Router();
const Client = require("../services/utilisateurs/clientService");
const yupValidator = require("../middleware/validate");
const Authmiddleware = require("../middleware/Authmiddleware");
const { inscriptionDto } = require("../dto/authDto");
const { connexionDto } = require("../dto/authDto");

router.post(
  "/inscription",
  yupValidator(inscriptionDto),
  async function (req, res) {
    try {
      console.log(req.body);
      const result = await Client.createClient(req.body);
      if (!result.error) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
      console.log(result);
    } catch (error) {
      console.error("une erreur c'est produit lors de l'inscription", error);
      res.status(500).json("une erreur c'est produit lors de l'inscription");
    }
  }
);
router.post(
  "/connexion",
  yupValidator(connexionDto),
  async function (req, res) {
    try {
      console.log(req.body);
      const user = await Client.getClient(req.body);
      if (!user.error) {
        res.status(201).json(user);
      } else {
        res.status(400).json(user);
      }
      console.log(user);
    } catch (error) {
      console.error("une erreur c'est produit lors de la connxion", error);
      res.status(500).json("une erreur c'est produit lors de la connexion");
    }
  }
);
router.get("/chose", Authmiddleware, (req, res) => {
  console.log(req)
  // async function (req, res) {
  //   try {
  //     console.log(req)
  //     const user = await Client.getClient(req.body);
  //   }catch (error) {
  //     res.status(500).json("une erreur c'est produit lors de la recupération du token");
  //   }
  // }
});

module.exports = router;
