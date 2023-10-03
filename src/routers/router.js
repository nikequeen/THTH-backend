const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/admincontolller");
const {
  Authmiddleware,
  typeCompteAuthorisation,
} = require("../middleware/Authmiddleware");
const Enumtype = require("../services/utilisateurs/enumtype");
const requestController = require("../controllers/requestController");
const router = express.Router();

router.use("/authentification", authController);
router.use(
  "/admin",
  Authmiddleware,
  typeCompteAuthorisation([Enumtype.Admin]),
  adminController
);
router.use("/requete", requestController);
module.exports = router;
