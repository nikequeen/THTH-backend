const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/admincontolller");
const {Authmiddleware,typeCompteAuthorisation} = require("../middleware/Authmiddleware");

const router = express.Router();

router.use("/authentification", authController);
router.use("/admin", adminController);

module.exports = router;
