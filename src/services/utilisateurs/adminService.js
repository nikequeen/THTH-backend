const UtilisateurService = require("./userService");
const { utilisateur } = require("../../models/utilisateur");
const Enumtype = require("../utilisateurs/enumtype")

class Admin extends UtilisateurService {
  async createAgent(reqBody) {
    console.log(reqBody);
    reqBody.type = Enumtype.Agent;
    const createAgent = await this.createUnCompte(reqBody);
    return createAgent;
  }
}
module.exports = new Admin(utilisateur);
