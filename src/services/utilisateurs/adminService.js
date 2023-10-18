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
  async updateAgent(reqBody) {
    return await this.updateUser(reqBody);
  }
  async updateAdmin(reqBody) {
    return await this.updateUser(reqBody);
  }
  async deleteAgent(id) {
    return await this.deleteUserById(id);
  }
  async getUtilisateurById(id) {
    return await this.getUserById(id);
  }
}

module.exports = new Admin(Utilisateur);
