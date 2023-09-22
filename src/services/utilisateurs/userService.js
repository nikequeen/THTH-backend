require("dotenv").config();
const queryClass = require("../../utils/queryClass");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
// const validateUser = require("../../utils/utils");
class UtilisateurService extends queryClass {
  genererJwt(utilisateur) {
    return jsonwebtoken.sign(
      { utilisateur },
      "process.env.ACCES_TOKEN_SECRET",
      { expiresIn: "48h" }
    );
  }
  decoderJwt(utilisateur) {
    return jsonwebtoken.verify(
      { utilisateur },
      "process.env.ACCES_TOKEN_SECRET "
    );
  }

  verifierMotdepasse(motdepasse, hashedmotdepasse) {
    return bcrypt.compare(motdepasse, hashedmotdepasse);
  }

  async createUnCompte(donneInscription) {
    const email = donneInscription.email;
    try {
      const existingUtilisateur = await this.findOne({ email: email });
      console.log(existingUtilisateur);

      if (existingUtilisateur) {
        return { error: true, message: "Cet e-mail est déjà utilisé." };
      }
      const newUser = await this.create(donneInscription);
      console.log("Created new record:", newUser);
      return { error: false, user: newUser };
    } catch (error) {
      console.error("Error creating user:", error);
      return { error: true, error: error };
    }
  }
  async getUnCompte(donneConnexion) {
    const email = donneConnexion.email;

    try {
      const existingUtilisateur = await this.findOne({
        email: email,
      });

      if (existingUtilisateur) {
        const isValidPassword = this.verifierMotdepasse(
          donneConnexion.motdepasse,
          existingUtilisateur.motdepasse
        );

        if (isValidPassword) {
         
          const gToken = this.genererJwt(
            existingUtilisateur,
            "process.env.ACCES_TOKEN_SECRET"
          );

          if (gToken) {
            return {
              error: false,
              message: "utilisateur connecté",
              token: gToken,
              user: existingUtilisateur,
            };
          } else {
            return { error: true, message: "token non généré" };
          }
        } else {
          return { error: true, message: "Mot de passe incorrect." };
        }
      } else {
        return { error: true, message: "Cet utilisateur n'existe pas." };
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return {
        error: true,
        message:
          "Une erreur s'est produite lors de la récupération de l'utilisateur",
      };
    }
  }
}

module.exports = UtilisateurService;
