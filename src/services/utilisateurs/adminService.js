const UtilisateurService = require("./userService");
const { utilisateur } = require("../../models");
const Enumtype = require("../utilisateurs/enumtype");

class Admin extends UtilisateurService {

  async createAgent(reqBody) {
    return await this.createUnCompte(reqBody);
  }

  async createAdmin(reqBody) {
    return await this.createUnCompte(reqBody);
  }
  
}

module.exports = new Admin(utilisateur);
