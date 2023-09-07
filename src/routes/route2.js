const express = require("express");
const middlecontroller = require("../controller/middlecontroller");

const router2 = express.Router();
router2.get("/protected", middlecontroller);
module.exports = router2;
