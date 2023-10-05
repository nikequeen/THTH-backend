const queryClass = require("../../utils/queryClass");

const { Formulaire } = require("../../models");

class FormulaireService extends queryClass {
  async createForm(donneCreation) {
    const requestId = donneCreation.id;
    try {
      const existingRequest = await this.findOne({ id: requestId });
      if (!existingRequest) {
        return { error: true, message: "cette requete n'existe pas" };
      }
      const newForm = await this.create(donneCreation);
      console.log("created new record:", newForm);
      return { error: false, formulaire: newForm };
    } catch (error) {
      console.error("Error creating the Form:", error);
      return { error: true, error: error };
    }
  }
}
module.exports = new FormulaireService(Formulaire);
