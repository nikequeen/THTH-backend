const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const validateAuth = require("../middleware/validateAuth");

router.post("/inscription", (req, res) => {
  validateAuth();
  userService.getUserData();
  console.log("Connecté");
  return res.status(200).json({ ok: "connecté" });
});

module.exports = router;
