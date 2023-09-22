const express = require("express");
const router = express.Router();
const Admin = require("../services/utilisateurs/adminService");
const yupValidator = require("../middleware/validate");
const { inscriptionDto,ajoutUtilisateurDto } = require("../dto/authDto");
// const { connexionDto } = require("../dto/authDto");
const Enumtype = require("../services/utilisateurs/enumtype");

router.post("/ajouter-utilisateur", yupValidator(ajoutUtilisateurDto),async function (req, res) {
    try {

      let result;
      console.log(req.body);

      switch (req.body.type) {
        case Enumtype.Agent:
          result = await Admin.createAgent(req.body);
          break;
        case Enumtype.Admin :
          result = await Admin.createAdmin(req.body)
        default:
          break;
      }
      if (!result.error) {
        return res.status(201).json(result);
      }
      console.log(result);

      return res.status(400).json(result);
    } catch (error) {
      console.error("une erreur c'est produit lors de l'inscription", error);
      res.status(500).json("une erreur c'est produit lors de l'ajout de l'utilisateur");
    }
  }
);
<<<<<<< HEAD
module.exports = router;
=======

module.exports = router;
>>>>>>> 64b42855397d49b3154cee04b7ace1462cc3e57d
