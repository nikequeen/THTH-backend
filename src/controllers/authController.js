const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const yupValidator = require("../middleware/validate");
const { inscriptionDto } = require("../dto/authDto");
const { connexionDto } = require("../dto/authDto");
router.post("/inscription", yupValidator(inscriptionDto), (req, res) => {
  userService.createUserData();
  console.log("From Controller AUTH User");
  return res.status(200).json({ ok: req.body });
});
router.post("/connexion", yupValidator(connexionDto), (req, res) => {
  userService.getUserData();
  console.log("For user login");
  return res.status(201).json("utilisateur connecté");
});

module.exports = router;
