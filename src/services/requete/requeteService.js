const queryClass =require("../../utils/queryClass");
const { Requete } = require("../../models")

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
}

module.exports = new RequeteService(Requete);