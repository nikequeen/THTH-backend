const Utilisateur = require("./userService");

class Admin extends Utilisateur {

    async createCompteAgent(donneInscription) {
        email = donneInscription.email;
        try {
          const newUser = await  this.model.create(donneInscription);
          console.log("Created new record:", newUser);
          return { success: true, user: newUser };
        } catch (error) {
          console.error("Error creating user:", error);
          return { success: true, error: error };
    
        }
    }
}
module.exports = Admin;