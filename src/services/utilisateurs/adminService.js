const UtilisateurService = require("./userService");
const { utilisateur } = require("../../models/utilisateur");
const Enumtype = require("../utilisateurs/enumtype");

class Admin extends UtilisateurService {
  async createAgent(reqBody) {
    console.log(reqBody);
    reqBody.type = Enumtype.Agent;
    const createAgent = await this.createUnCompte(reqBody);
    return createAgent;
  }
  async createAdmin(reqBody) {
    console.log(reqBody);
    reqBody.type = Enumtype.Admin;
    const createAdmin = await this.createUnCompte(reqBody);
    return createAdmin;
  }
}
module.exports = new Admin(utilisateur);
