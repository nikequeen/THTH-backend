const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/admincontolller");
const {
  Authmiddleware,
  typeCompteAuthorisation,
} = require("../middleware/Authmiddleware");
const Enumtype = require("../services/utilisateurs/enumtype");
const requestController = require("../controllers/requestController");
const formulaireController = require("../controllers/formulaireController");
const requeteclientController = require("../controllers/requeteclientController");

const router = express.Router();

router.use("/authentification", authController);
router.use(
  "/admin",
  Authmiddleware,
  typeCompteAuthorisation([Enumtype.Admin]),
  adminController
);
router.use("/requete", requestController);
router.use("/formulaire", formulaireController);
router.use("/requeteclient", Authmiddleware, requeteclientController);
module.exports = router;
