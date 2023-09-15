const express = require("express");
const router = express.Router();
const Admin = require("../services/utilisateurs/adminService")
const yupValidator = require("../middleware/validate");
const { inscriptionDto } = require("../dto/authDto");
// const { connexionDto } = require("../dto/authDto");

router.post(
  "/agentinscription",
  yupValidator(inscriptionDto),
  async function (req, res) {
    try {
      console.log(req.body);
      const result = await Admin.createAgent(req.body);
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
module.exports = router;