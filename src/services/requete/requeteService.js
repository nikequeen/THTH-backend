const queryClass = require("../../utils/queryClass");
const { Requete } = require("../../models");

class RequeteService extends queryClass {
  async createRequete(donneCreation) {
    const nom = donneCreation.nom;
    try {
      const existingRequete = await this.findOne({ nom: nom });
      console.log(existingRequete);

      if (existingRequete) {
        return { error: true, message: "Cette requête est déja présente" };
      }
      const newRequest = await this.create(donneCreation);
      console.log("Created new record:", newRequest);
      return { error: false, requete: newRequest };
    } catch (error) {
      console.error("Error creating the request:", error);
      return { error: true, error: error };
    }
  }

  async getRequete() {
    try {
      const Requete = await this.findAll();
      return Requete;
    } catch (error) {
      throw new Error("Failed to get the request" + error.message);
    }
  }
  async findRequestById(id) {
    return await this.findOne({ id: id });
  }
  async updateRequete(id, nouvellesDonnees) {
    try {
      const requete = await this.update({ id: id }, nouvellesDonnees);
      return requete;
    } catch (error) {
      throw new Error(
        "Échec de la mise à jour de la requête: " + error.message
      );
    }
  }
}

module.exports = new RequeteService(Requete);
