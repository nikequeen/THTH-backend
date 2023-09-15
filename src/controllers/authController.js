const express = require("express");
const router = express.Router();
const Client = require("../services/utilisateurs/clientService")
const yupValidator = require("../middleware/validate");
const { inscriptionDto } = require("../dto/authDto");

// const { connexionDto } = require("../dto/authDto");
router.post(
  "/inscription",
  yupValidator(inscriptionDto),
  async function (req, res) {

    try {
      console.log(req.body);
      const result = await Client.createUtilisateur(req.body);
      if (!result.error) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
      console.log(result);
    } catch (error) {
      console.error("une erreur c'est produit lors de l'inscription", error);
      res.status(500).json("une erreur c'est produit lors de l'inscription");
    }
  }
);
// router.post("/connexion", yupValidator(connexionDto), (req, res) => {
//   userService.getUserData();
//   console.log("For user login");
//   return res.status(201).json("utilisateur connecté");
// });

module.exports = router;
// async function createUtilisateur(nom, email, motdepasse) {
//   try {
//     const existingUtilisateur = await queryInstance.findOne({
//       attributes: ["email"],
//       where: { email: email },
//     });

//     if (existingUtilisateur) {
//       return { success: false, message: "Cet e-mail est déjà utilisé." };
//     }

//     const newUser = await queryInstance.create({
//       nom,
//       email,
//       motdepasse: hashedPassword,
//     });
//     console.log("Created new record:", newUser);
//     return { success: true, user: newUser };
//   } catch (error) {
//     console.error("Error creating user:", error);
//   }
// }
