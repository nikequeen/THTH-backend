const models = require("../models/user");
async function inscriptionUser(nom, email, motdepasse) {
  try {
    const newUser = await models.create({ nom, email, motdepasse });
    return newUser;
  } catch (error) {
    throw new Error("Failed to create text: " + error.message);
  }
}

module.exports = {
  inscriptionUser,
};
