const user = require("../models/user");

async function createUser() {
  try {
    const newText = await User.create({ });
    return newText;
  } catch (error) {
    throw new Error("Failed to create text: " + error.message);
  }
}

module.exports = {
  createText,
};
