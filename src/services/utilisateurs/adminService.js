const UtilisateurService = require("./userService");
const { Utilisateur } = require("../../models");

class Admin extends UtilisateurService {
  async createAgent(reqBody) {
    return await this.createUnCompte(reqBody);
  }

  async createAdmin(reqBody) {
    return await this.createUnCompte(reqBody);
  }
  async getUtilisateur() {
    return await this.getUser();
  }
}

module.exports = new Admin(Utilisateur);
