const express = require("express");
const helloController = require("../controller/hellocontroleur");

const router1 = express.Router();

router1.get("/hello", helloController);

module.exports = router1;
