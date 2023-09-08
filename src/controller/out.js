const express = require("express");
const userService = require("../service/userService");
const router = express.Router();

router.post("/register", userService);

module.exports = router;
