const UtilisateurService = require("./userService");
const { Utilisateur } = require("../../models");
const Enumtype = require("../utilisateurs/enumtype");

class Client extends UtilisateurService {
   async createClient(reqBody) {
    console.log(reqBody);
    reqBody.type = Enumtype.Client;
    const createClient = await this.createUnCompte(reqBody);
    return createClient;
  }
}
module.exports = new Client(Utilisateur);
