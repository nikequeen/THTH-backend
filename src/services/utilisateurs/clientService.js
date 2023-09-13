const Utilisateur = require("./userService");

class Client extends Utilisateur {
  async createUtilisateur(donneInscription) {
    const email = donneInscription.email;
    try {
      const existingUtilisateur = await this.model.findOne({
        attributes: ["email"],
        where: { email: email },
      });
      console.log(existingUtilisateur);
      if (existingUtilisateur) {
        return { success: false, message: "Cet e-mail est déjà utilisé." };
      }
      const newUser = await this.model.create(donneInscription);
      console.log("Created new record:", newUser);
      return { success: true, user: newUser };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: true, error: error };
    }
  }
} 

module.exports = Client;
