const bcrypt = require("bcrypt");

async function validateUser(motdepasse, hashedPassword) {
  try {
    return await bcrypt.compare(motdepasse, hashedPassword);
  } catch (error) {
    console.error("Erreur lors de la comparaison de hachages :", error);
    throw error;
  }
}

module.exports = validateUser;
