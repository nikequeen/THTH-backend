const router = require("express").Router();
const service = require("../service/service");

router.post("/inscription", async function (req, res) {
  const nom = req.body.nom;
  const email = req.body.email;
  const motdepasse = req.body.motdepasse;
console.log("call route")
  try {
    console.log(req.body);
    const newuser = await service.inscriptionUser({ nom, email, motdepasse });
    res.sendstatus(201).json(newuser);
  } catch (err) {
    res.sendStatus(404).json("Imposible de créer l'utilisateur");
  }
});
module.exports = router;
