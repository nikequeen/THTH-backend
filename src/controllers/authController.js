const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const validateAuth = require("../authDto/validateAuth");

router.post("/inscription", (req, res) => {
  validateAuth();
  userService.getUserData();
  console.log("From Controller AUTH User");
  return res.status(200).json({ ok: "ok" });
});

module.exports = router;
