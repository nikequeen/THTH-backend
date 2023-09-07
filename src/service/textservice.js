const Text = require("../models/text");

async function getOneText() {
  try {
    const texts = await Text.findOne();
    return texts;
  } catch (error) {
    throw new Error("Failed to get text: " + error.message);
  }
}

async function createText(text) {
  try {
    const newText = await Task.create({ text: "HELLO WORLD" });
    return newText;
  } catch (error) {
    throw new Error("Failed to create text: " + error.message);
  }
}

module.exports = {
  getOneText,
  createText,
};
