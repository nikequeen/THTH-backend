const queryClass = require("../../utils/queryClass");

class UtilisateurService extends queryClass {
  async createUnCompte(donneInscription) {
    const email = donneInscription.email;
    try {
      const existingUtilisateur = await this.findOne({ email: email });
      console.log(existingUtilisateur);

      if (existingUtilisateur) {
        return { error: true, message: "Cet e-mail est déjà utilisé." };
      }
      const newUser = await this.create(donneInscription);
      console.log("Created new record:", newUser);
      return { error: false, user: newUser };
    } catch (error) {
      console.error("Error creating user:", error);
      return { error: true, error: error };
    }
  }
}

module.exports = UtilisateurService;
