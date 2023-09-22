const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/admincontolller");
const {Authmiddleware,typeCompteAuthorisation} = require("../middleware/Authmiddleware");
const Enumtype = require("../services/utilisateurs/enumtype");

const router = express.Router();

router.use("/authentification", authController);
router.use("/admin",Authmiddleware,typeCompteAuthorisation([Enumtype.Admin]), adminController);

module.exports = router;
