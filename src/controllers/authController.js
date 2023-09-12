const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const yupValidator = require("../middleware/validate");
const {inscriptionDto} = require("../dto/authDto");

router.post("/inscription",  yupValidator(inscriptionDto) ,(req, res) => {
    userService.getUserData();
    console.log("From Controller AUTH User");
    return res.status(200).json({ ok: req.body });
});

module.exports = router;
