const queryClass = require("../../utils/queryClass");
const { Formulaire } = require("../../models");

class FormulaireService extends queryClass {
  async createForm(donneCreation, requestId) {
    try {
      donneCreation.requestId = requestId;
      console.log(donneCreation);
      const newForm = await this.create(donneCreation);
      console.log("Created new record:", newForm);
      return { error: false, formulaire: newForm };
    } catch (error) {
      console.error("Error creating the Form:", error);
      return { error: true, errorMessage: error.message };
    }
  }
  async getForm() {
    try {
      const Form = await this.findAll({
        attributes: [
          "id",
          "requestId",
          "informationpersonnelle",
          "piecejointe",
          "createdAt",
        ],
      });
      return Form;
    } catch (error) {
      throw new Error("Failed to get the form" + error.message);
    }
  }

 
}

module.exports = new FormulaireService(Formulaire);
