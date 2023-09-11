const router = require("express").Router();
const models = require("../models/user");

router.post("/inscription", async (req, res) => {
  const nom = req.body.name;
  const email = req.body.email;
  const motdepasse = req.body.motdepasse;

  try {
    console.log(req.body);
    const newuser = await models.User.createText({ nom, email, motdepasse });
    res.sendstatus(201).json(newuser);
  } catch (err) {
    res.sendStatus(404).json("Imposible de créer l'utilisateur");
  }
});
module.exports = router;
