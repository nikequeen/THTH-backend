const express = require("express");
const textcontroller = require("../controller/textcontroller");
import { getOneText,createText } from "../service/textservice";

const router3 = express.Router();
router3.get("/text", getOneText);

module.exports = router3;
