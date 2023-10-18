const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const formulaireService = require("../services/formulaire/formulaireService");
const RequeteClientService = require("../services/requetclient/requeteClientService");
const clientService = require("../services/utilisateurs/clientService");
// const Authmiddleware = require("../middleware/Authmiddleware");
// const upload = multer({ dest: "uploads/" });
router.post(
  "/ajouterunerequete/:requeteId",
  upload.single("file"),
  async (req, res) => {
    try {
      const user = req.auth;
      const userId = user.id;
      const requetId = req.params.requeteId;
      // console.log(userId);
      // console.log(requetId);
      const clientRequest = await formulaireService.createForm(
        req.body,
        req.file,
        requetId
      );
      console.log(clientService);
      const formulaireId = clientRequest.id;
      const result = await RequeteClientService.createClientRequest(
        formulaireId,
        userId
      );
      if (!result.error) {
        return res.status(201).json({
          error: false,
          message: "La requete a été ajoutée avec succès",
          data: result,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "L'ajout de la requête a échoué",
        });
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la requête",
        error
      );
      return res.status(500).json({
        error: true,
        message: "Une erreur s'est produite lors de l'ajout de la requête",
      });
    }
  }
);

router.get("/requeteclientliste", async (req, res) => {
  try {
    const user = req.auth;
    console.log(user);
    const result = await RequeteClientService.getClientRequestByUserType(user);
    res.status(200).json({
      error: false,
      message: "Requete client obtenue avec succes",
      result: "result",
    });
  } catch (error) {
    console.log("Erreur lors de la récupération de la requete", error);
    res.status(404).json("Erreur lors de la récupération du de la requete");
  }
});
module.exports = router;
