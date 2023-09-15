const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/admincontolller");

const router = express.Router();

router.use("/authentification", authController);
router.use("/authentification", adminController);

module.exports = router;
