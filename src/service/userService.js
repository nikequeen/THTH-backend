const usermodel = require('../models/usermodel')
const QueryClass = require("../utils/dbqueries");
const queryClass2 = new QueryClass(usermodel);

async function createNewUser(req, res) {
  try {
    const newUser = await queryClass2.create({
      nom: req.body.nom,
      email: req.body.email,
      motdepasse: req.body.motdepasse,
    });

    console.log("Created new record:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json("Impossible d'ajouter l'utilisateur");
  }
}

module.exports = { createNewUser };













  
