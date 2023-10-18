const express = require("express");
const router = express.Router();
const Client = require("../services/utilisateurs/clientService");
const yupValidator = require("../middleware/validate");
const {
  Authmiddleware,
  typeCompteAuthorisation,
} = require("../middleware/Authmiddleware");
const { inscriptionDto } = require("../dto/authDto");
const { connexionDto } = require("../dto/authDto");
const Enumtype = require("../services/utilisateurs/enumtype");

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

router.get(
  "/chose",
  Authmiddleware,
  typeCompteAuthorisation([Enumtype.Admin]),
  (req, res) => {
    console.log(req.auth.type);
    res.status(200).json("hello");
  }
);
router.get("/client/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    const result = await Client.getClienById(clientId);
    res.status(200).json({
      error: false,
      message: "Utilisateur obtenue avec succes",
      result: result,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération de l'utilisateur", error);
    res.status(404).json("Erreur lors de la récupération de l'utilisateur");
  }
});
router.put(
  "/updateclient/:id",
  yupValidator(inscriptionDto),
  async (req, res) => {
    try {
      const clientId = req.params.id;
      const { nom, email, motdepasse } = req.body;

      const existingUtilisateur = await Client.findUserById(clientId);

      if (!existingUtilisateur) {
        res
          .status(404)
          .json({ error: true, message: "L'utilisateur n'a pas été trouvé." });
      } else {
        const result = await Client.updateUser(clientId, {
          nom,
          email,
          motdepasse,
        });

        if (result) {
          res
            .status(200)
            .json({ error: false, message: "L'utilisateur a été modifié" });
        } else {
          res.status(500).json({
            error: true,
            message: "Échec de la mise à jour de l'utilisateur.",
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur", error);
      res.status(500).json({
        error: true,
        message: "Erreur lors de la modification de l'utilisateur",
      });
    }
  }
);

module.exports = router;
