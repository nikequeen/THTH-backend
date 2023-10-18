const express = require("express");
const router = express.Router();
const Admin = require("../services/utilisateurs/adminService");
const yupValidator = require("../middleware/validate");
const { ajoutUtilisateurDto } = require("../dto/authDto");
// const { connexionDto } = require("../dto/authDto");
const Enumtype = require("../services/utilisateurs/enumtype");

router.post(
  "/ajouter-utilisateur",
  yupValidator(ajoutUtilisateurDto),
  async function (req, res) {
    try {
      let result;
      console.log(req.body);

      switch (req.body.type) {
        case Enumtype.Agent:
          result = await Admin.createAgent(req.body);
          break;
        case Enumtype.Admin:
          result = await Admin.createAdmin(req.body);
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
      res
        .status(500)
        .json("une erreur c'est produit lors de l'ajout de l'utilisateur");
    }
  }
);
router.get("/agent-liste", async (req, res) => {
  try {
    const result = await Admin.getUtilisateur();
    res.status(200).json(result);
  } catch (error) {
    console.log("Erreur lors de la récupération de toutes les requêtes", error);
    res
      .status(404)
      .json("Erreur lors de la récupération de toutes les requêtes");
  }
});
router.put("/update-user", async function (req, res) {
  try {
    let result;
    const user = req.auth;
    console.log(user);

    switch (user.type) {
      case Enumtype.Agent:
        result = await Admin.updateAgent(req.body);
        break;
      case Enumtype.Admin:
        result = await Admin.updateAdmin(req.body);
      default:
        break;
    }
    if (!result.error) {
      return res.status(201).json(result);
    }
    console.log(result);

    return res.status(400).json({
      error: false,
      message: "L'utilisateur a été modifier avec succes",
    });
  } catch (error) {
    console.error("Erreur lors de la modification de l'utilisateur", error);
    res.status(400).json({
      error: true,
      message: "Erreur lors de la modification de l'utilisateur",
    });
  }
});
router.delete("/delete-agent/:id", async function (req, res) {
  try {
    const agentId = req.params.id;

    const result = await Admin.deleteAgent(agentId);
    if (result) {
      console.log(result);
      res.status(200).json({
        error: false,
        message: "Suppression de l'agent avec succes",
      });
    } else {
      res.status(404).json({
        error: true,
        message: "Echec de la suppression",
      });
    }
  } catch (error) {
    console.log("Erreur lors de la suppression de l'agent", error);
    res.status(500).json("Erreur lors de la suppression de l'utilisateur");
  }
});
router.get("/get-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Admin.getUtilisateurById(userId);
    res.status(200).json({
      error: false,
      message: "utilisateur obtenue avec succes",
      result: result,
    });
  } catch (error) {
    console.log("Erreur lors de la récupération de l'utilisateur", error);
    res.status(404).json("Erreur lors de la récupération de l'utilisateur");
  }
});

module.exports = router;
