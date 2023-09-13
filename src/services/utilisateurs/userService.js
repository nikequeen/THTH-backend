const modelutilisateur = require("../../models/utilisateur");
const queryClass = require("../../utils/queryClass");
const queryInstance = new queryClass(modelutilisateur);

class Utilisateur {
  constructor() {
    this.model = queryInstance;
  }
}

module.exports = Utilisateur;
