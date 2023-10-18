require("dotenv").config();
const queryClass = require("../../utils/queryClass");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
// const validateUser = require("../../utils/utils");
class UtilisateurService extends queryClass {
  genererJwt(utilisateur) {
    return jsonwebtoken.sign({ utilisateur }, "mythth", { expiresIn: "48h" });
  }

  decoderJwt(token) {
    try {
      console.log(token);

      var user = "" + token + "";

      const decodedToken = jsonwebtoken.verify(user, "mythth");

      console.log(decodedToken);

      return decodedToken;
    } catch (error) {
      console.error("Erreur lors du décodage du token JWT :", error);
      // return null;
      return { error: true, message: error };
    }
  }

  verifierMotdepasse(motdepasse, hashedmotdepasse) {
    return bcrypt.compare(motdepasse, hashedmotdepasse);
  }

  async createUnCompte(donneInscription) {
    const email = donneInscription.email;
    try {
      const existingUtilisateur = await this.findOne({ email: email });
      console.log(
        "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
      );
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

  async findUserById(id) {
    return await this.findOne({ id: id });
  }

  async getUnCompte(donneConnexion) {
    const email = donneConnexion.email;
    const motdepasse = donneConnexion.motdepasse;

    try {
      const existingUtilisateur = await this.findOne({ email: email });

      if (!existingUtilisateur) {
        return { error: true, message: "Cet utilisateur n'existe pas." };
      }

      const isValidPassword = await this.verifierMotdepasse(
        motdepasse,
        existingUtilisateur.motdepasse
      );

      if (!isValidPassword) {
        return { error: true, message: "Mot de passe incorrect." };
      }
      const gtoken = await this.genererJwt(existingUtilisateur);
      if (!gtoken) {
        return { error: true, message: "Token non génerer" };
      }
      {
        return {
          error: false,
          message: "utilisateur connecté",
          donne: {
            token: gtoken,
            user: existingUtilisateur,
          },
        };
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      // Gérez les erreurs d'accès aux données ici
      return {
        error: true,
        message:
          "Une erreur s'est produite lors de la récupération de l'utilisateur",
      };
    }
  }
  async getUserById(id) {
    try {
      const user = await this.findOne({ id: id });

      if (!user) {
        throw new Error("Utilisateur introuvable pour l'ID : " + id);
      }

      return user;
    } catch (error) {
      throw new Error(
        "Échec de la récupération de l'utilisateur : " + error.message
      );
    }
  }

  async getUser() {
    try {
      return await this.findAll({ where: { type: "agent" } });
    } catch (error) {
      throw new Error("Failed to get the request: " + error.message);
    }
  }

  async updateUser(id, nouvellesDonnees) {
    try {
      if (!nouvellesDonnees || typeof nouvellesDonnees !== "object") {
        throw new Error("Invalid nouvellesDonnees");
      }

      const user = await this.update(nouvellesDonnees, { id: id });
      return user;
    } catch (error) {
      throw new Error(
        "Échec de la mise à jour de la requête: " + error.message
      );
    }
  }

  async deleteUserById(id) {
    try {
      const result = await this.delete({ id: id });
      return result;
    } catch (error) {
      throw new Error(
        "Échec de la suppresion de l'utilisateur: " + error.message
      );
    }
  }
}

module.exports = UtilisateurService;
