const express = require('express');
const router = express.Router();
const userService = require("../services/userService");
const validateauth = require("../middleware/validateauth")

router.post("/inscription", validateauth,  async function (req, res) {
    const nom = req.body.nom;
    const email = req.body.email;
    const motdepasse = req.body.motdepasse;
    try {
      console.log(req.body);
      const newuser = await userService.createUser(nom, email, motdepasse);
      res.status(201).json(newuser);
    } catch (err) {
      res.status(404).json("Impossible de créer l'utilisateur");
    }
  });
module.exports = router;

