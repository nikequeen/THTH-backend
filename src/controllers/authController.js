const express = require('express');
const router = express.Router();
const userService = require("../services/userService");

router.get('/inscription', (req, res) => {
    userService.getUserData()
    console.log("From Controller AUTH User")
    return res.status(200).json({ok:'ok'})
});  

module.exports = router;
