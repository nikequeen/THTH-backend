const queryClass = require("../../utils/queryClass");
const { Requeteclient, Formulaire, Requete } = require("../../models");

class RequeteClientService extends queryClass {
  async createClientRequest(donneCreation, utilisateurId, formulaireId) {
    try {
      donneCreation.utilisateurId = utilisateurId;
      donneCreation.formulaireId = formulaireId;
      console.log(donneCreation);
      const newclientRequest = await this.create(donneCreation);
      console.log("Created new record:", newclientRequest);
      return { error: false, formulaire: newclientRequest };
    } catch (error) {
      console.error("Error creating the client request:", error);
      return { error: true, errorMessage: error.message };
    }
  }

  async getClientRequestByUserType(user) {
    try {
      let requete;

      if (user.type === "client") {
        requete = await this.findAll({
          where: { utilisateurId: user.id },
          include: [
            {
              model: Formulaire,
              attributes: ["requeteId"],
              include: [
                {
                  model: Requete,
                  attributes: ["nom"],
                },
              ],
            },
          ],
          attributes: ["status", "createdAt"],
        });
      } else if (user.type === "agent") {
        requete = await this.findAll();
      } else {
        throw new Error("Type d'utilisateur non pris en charge");
      }

      return requete;
    } catch (error) {
      throw new Error("Failed to get the request: " + error.message);
    }
  }
}

module.exports = new RequeteClientService(Requeteclient);
